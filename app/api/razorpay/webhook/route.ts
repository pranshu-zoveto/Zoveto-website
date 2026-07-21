import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

const SUSPEND_EVENTS = new Set([
  "subscription.halted",
  "subscription.cancelled",
  "subscription.completed",
]);

const ACTIVATE_EVENTS = new Set([
  "subscription.charged",
  "subscription.activated",
  "subscription.resumed",
]);

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");

  let sigValid = false;
  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature.trim(), "utf8");
    sigValid = a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    sigValid = false;
  }

  if (!sigValid) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const eventType = typeof event.event === "string" ? event.event : "unknown";
  const payload = event.payload as Record<string, unknown> | undefined;

  try {
    await handleWebhookEvent(eventType, payload ?? {});
  } catch (err) {
    console.error(`[webhook] Error handling ${eventType}`, err);
    // Still 200 — Razorpay retries on non-200; local handling errors must not loop forever.
    return NextResponse.json({ ok: false, error: "internal" });
  }

  return NextResponse.json({ ok: true });
}

async function syncBackendBillingStatus(params: {
  action: "suspend" | "activate";
  eventType: string;
  razorpaySubId: string;
  zovetoCompanyId: string;
}): Promise<void> {
  const COS_API_BASE_URL = process.env.COS_API_BASE_URL;
  const COS_INTERNAL_SECRET = process.env.COS_INTERNAL_SECRET;

  if (!COS_API_BASE_URL || !COS_INTERNAL_SECRET) {
    console.warn(
      "[webhook] COS_API_BASE_URL or COS_INTERNAL_SECRET not set - skipping backend billing sync",
    );
    return;
  }

  try {
    const syncRes = await fetch(`${COS_API_BASE_URL}/api/internal/sync-billing-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": COS_INTERNAL_SECRET,
      },
      body: JSON.stringify({
        razorpaySubscriptionId: params.razorpaySubId,
        zovetoCompanyId: params.zovetoCompanyId,
        action: params.action,
        razorpayEvent: params.eventType,
      }),
    });

    if (!syncRes.ok) {
      const errText = await syncRes.text();
      console.error(
        `[webhook] Backend billing sync failed (${params.action}): ${errText}`,
      );
      return;
    }

    console.log(
      `[webhook] Backend billing sync OK: ${params.action} for company ${params.zovetoCompanyId}`,
    );
  } catch (err) {
    console.error(`[webhook] Backend billing sync error (${params.action})`, err);
  }
}

async function handleWebhookEvent(
  eventType: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const subWrap = payload.subscription as { entity?: Record<string, unknown> } | undefined;
  const subEntity = subWrap?.entity;
  const razorpaySubId = typeof subEntity?.id === "string" ? subEntity.id : null;

  const payWrap = payload.payment as { entity?: Record<string, unknown> } | undefined;
  const payEntity = payWrap?.entity;
  const razorpayPayId = typeof payEntity?.id === "string" ? payEntity.id : null;

  const STATUS_MAP: Record<string, string> = {
    "subscription.activated": "active",
    "subscription.charged": "active",
    "subscription.halted": "halted",
    "subscription.cancelled": "cancelled",
    "subscription.completed": "completed",
    "subscription.pending": "pending",
    "subscription.paused": "paused",
    "subscription.resumed": "active",
  };

  if (razorpaySubId && STATUS_MAP[eventType]) {
    const sub = await prisma.billingSubscription.findUnique({
      where: { razorpaySubscriptionId: razorpaySubId },
    });
    if (!sub) {
      console.warn(`[webhook] No subscription found for ${razorpaySubId}`);
      return;
    }

    const newStatus = STATUS_MAP[eventType];
    const updateData: Parameters<typeof prisma.billingSubscription.update>[0]["data"] = {
      status: newStatus,
    };

    if (eventType === "subscription.charged" && payEntity) {
      updateData.lastPaymentAt = new Date();
      const subCurrentEnd = subEntity?.current_end;
      if (typeof subCurrentEnd === "number") {
        updateData.currentPeriodEnd = new Date(subCurrentEnd * 1000);
      }
      const subCurrentStart = subEntity?.current_start;
      if (typeof subCurrentStart === "number") {
        updateData.currentPeriodStart = new Date(subCurrentStart * 1000);
      }

      if (razorpayPayId) {
        const amountRaw = payEntity.amount;
        await prisma.billingPaymentEvent.upsert({
          where: { razorpayPaymentId: razorpayPayId },
          create: {
            subscriptionId: sub.id,
            razorpayPaymentId: razorpayPayId,
            amountPaise: typeof amountRaw === "number" ? amountRaw : 0,
            status: "captured",
            paidAt: typeof payEntity.created_at === "number" ? new Date(payEntity.created_at * 1000) : new Date(),
          },
          update: { status: "captured" },
        });
      }
    }

    await prisma.billingSubscription.update({
      where: { id: sub.id },
      data: updateData,
    });

    const shouldSuspend = SUSPEND_EVENTS.has(eventType);
    const shouldActivate = ACTIVATE_EVENTS.has(eventType);

    if ((shouldSuspend || shouldActivate) && sub.zovetoCompanyId) {
      await syncBackendBillingStatus({
        action: shouldSuspend ? "suspend" : "activate",
        eventType,
        razorpaySubId,
        zovetoCompanyId: sub.zovetoCompanyId,
      });
    }

    console.log(`[webhook] ${eventType} → subscription ${sub.id} status = ${newStatus}`);
  }

  if (eventType === "payment.failed" && razorpayPayId) {
    const orderIdRaw = payEntity?.order_id;
    console.warn(`[webhook] payment.failed payId=${razorpayPayId} orderId=${orderIdRaw}`);
  }
}
