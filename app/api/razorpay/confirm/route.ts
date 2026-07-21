import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
      email: string;
      name: string;
      companyName: string;
      phone?: string;
      teamSize?: string;
      role?: string;
      useCase?: string;
    };

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = body;

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return NextResponse.json({ message: "Missing payment verification fields" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    if (!keySecret) {
      return NextResponse.json({ message: "RAZORPAY_KEY_SECRET is not configured" }, { status: 500 });
    }

    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    const sig = Buffer.from(razorpay_signature, "hex");
    const exp = Buffer.from(expected, "hex");
    if (sig.length !== exp.length || !crypto.timingSafeEqual(sig, exp)) {
      return NextResponse.json({ message: "Payment signature verification failed" }, { status: 400 });
    }

    const dbSub = await prisma.billingSubscription.findUnique({
      where: { razorpaySubscriptionId: razorpay_subscription_id },
    });

    if (!dbSub) {
      return NextResponse.json({ message: "Subscription record not found" }, { status: 404 });
    }

    await prisma.billingPaymentEvent.upsert({
      where: { razorpayPaymentId: razorpay_payment_id },
      create: {
        subscriptionId: dbSub.id,
        razorpayPaymentId: razorpay_payment_id,
        amountPaise: dbSub.authAmountPaise,
        status: "captured",
        paidAt: new Date(),
      },
      update: { status: "captured", paidAt: new Date() },
    });

    await prisma.billingSubscription.update({
      where: { id: dbSub.id },
      data: {
        status: "authenticated",
        lastPaymentAt: new Date(),
      },
    });

    const COS_INTERNAL_SECRET = process.env.COS_INTERNAL_SECRET;
    const COS_API_BASE_URL = process.env.COS_API_BASE_URL;

    if (!COS_API_BASE_URL || !COS_INTERNAL_SECRET) {
      console.warn("[confirm] COS_API_BASE_URL or COS_INTERNAL_SECRET not set - skipping provisioning");
      return NextResponse.json({ ok: true, status: "payment_verified_no_provision" });
    }

    const provisionPayload: Record<string, unknown> = {
      email: body.email,
      name: body.name,
      companyName: body.companyName,
      phone: body.phone,
      razorpaySubscriptionId: razorpay_subscription_id,
      teamSize: body.teamSize,
      role: body.role,
      useCase: body.useCase,
    };

    if (dbSub.billingType === "modular" && dbSub.selectedModules.length > 0) {
      provisionPayload.selectedModules = dbSub.selectedModules;
    } else {
      provisionPayload.planKey = dbSub.planKey;
    }

    const provisionRes = await fetch(`${COS_API_BASE_URL}/api/internal/provision-trial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": COS_INTERNAL_SECRET,
      },
      body: JSON.stringify(provisionPayload),
    });

    if (!provisionRes.ok) {
      const errText = await provisionRes.text();
      console.error("[confirm] Provisioning failed", errText);
      await prisma.billingSubscription.update({
        where: { id: dbSub.id },
        data: { status: "authenticated" },
      });
      return NextResponse.json({
        ok: true,
        status: "payment_verified_provision_pending",
        warning: "Payment captured. Workspace is being set up - check email in a few minutes.",
      });
    }

    const provisionData = (await provisionRes.json()) as { companyId?: string };
    if (provisionData.companyId) {
      await prisma.billingSubscription.update({
        where: { id: dbSub.id },
        data: {
          status: "active",
          zovetoClaimed: true,
          zovetoCompanyId: provisionData.companyId,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      status: "provisioned",
      companyId: provisionData.companyId ?? null,
    });
  } catch (err) {
    console.error("[confirm]", err);
    return NextResponse.json({ message: "Confirmation failed. Contact support@zoveto.com." }, { status: 500 });
  }
}
