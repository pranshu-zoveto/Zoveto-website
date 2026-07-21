import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getRazorpay } from "@/lib/razorpay";
import {
  BILLING_MODULES,
  BILLING_BUNDLES,
  resolveModulesWithDeps,
  computeModularTotal,
  type BillingModuleKey,
} from "@/lib/modular-billing-config";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      email: string;
      name: string;
      companyName: string;
      phone?: string;
      bundleKey?: string;
      selectedModules?: string[];
    };

    const { email, name, companyName, phone } = body;
    if (!email || !name || !companyName) {
      return NextResponse.json({ message: "email, name, and companyName are required" }, { status: 400 });
    }

    let razorpayPlanId: string;
    let totalAmountPaise: number;
    let billingType: "bundle" | "modular";
    let resolvedModuleKeys: BillingModuleKey[];

    if (body.bundleKey) {
      const bundle = BILLING_BUNDLES.find((b) => b.key === body.bundleKey);
      if (!bundle) {
        return NextResponse.json({ message: `Unknown bundle: ${body.bundleKey}` }, { status: 400 });
      }
      if (!bundle.razorpayPlanId) {
        return NextResponse.json({ message: "Bundle plan is not configured" }, { status: 500 });
      }

      razorpayPlanId = bundle.razorpayPlanId;
      totalAmountPaise = bundle.monthlyPrice * 100;
      billingType = "bundle";
      resolvedModuleKeys = bundle.modules as BillingModuleKey[];
    } else if (body.selectedModules && body.selectedModules.length > 0) {
      const validKeys = new Set(BILLING_MODULES.map((m) => m.key));
      const invalid = body.selectedModules.filter((k) => !validKeys.has(k as BillingModuleKey));
      if (invalid.length > 0) {
        return NextResponse.json({ message: `Unknown module keys: ${invalid.join(", ")}` }, { status: 400 });
      }

      resolvedModuleKeys = resolveModulesWithDeps(body.selectedModules as BillingModuleKey[]);
      const totalMonthly = computeModularTotal(resolvedModuleKeys);
      totalAmountPaise = totalMonthly * 100;
      billingType = "modular";

      const moduleLabel = resolvedModuleKeys.join(" + ");
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keyId || !keySecret) {
        return NextResponse.json({ message: "Razorpay credentials are missing" }, { status: 500 });
      }

      const planResponse = await fetch("https://api.razorpay.com/v1/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        },
        body: JSON.stringify({
          period: "monthly",
          interval: 1,
          item: {
            name: `Zoveto ${moduleLabel}`,
            amount: totalAmountPaise,
            currency: "INR",
            description: `Monthly subscription: ${moduleLabel}`,
          },
          notes: {
            modules: resolvedModuleKeys.join(","),
            billing_type: "modular",
          },
        }),
      });

      if (!planResponse.ok) {
        const err = await planResponse.text();
        console.error("[create-subscription] Razorpay plan creation failed:", err);
        return NextResponse.json({ message: "Failed to create billing plan. Please try again." }, { status: 502 });
      }

      const plan = (await planResponse.json()) as { id: string };
      razorpayPlanId = plan.id;
    } else {
      return NextResponse.json(
        { message: "Provide either bundleKey or selectedModules (at least 1)" },
        { status: 400 },
      );
    }

    const rzp = getRazorpay() as any;
    let customer = await prisma.billingCustomer.findUnique({ where: { email } });
    let razorpayCustomerId = customer?.razorpayCustomerId ?? null;

    if (!razorpayCustomerId) {
      const rzpCustomer = (await rzp.customers.create({
        name,
        email,
        contact: phone ?? undefined,
        notes: { companyName },
      })) as { id: string };
      razorpayCustomerId = rzpCustomer.id;
    }

    customer = await prisma.billingCustomer.upsert({
      where: { email },
      create: { email, name, companyName, phone, razorpayCustomerId },
      update: { name, companyName, phone, razorpayCustomerId },
    });

    const startAt = Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60;
    const rzpSub = (await rzp.subscriptions.create({
      plan_id: razorpayPlanId,
      customer_notify: 1,
      quantity: 1,
      total_count: 120,
      addons: [],
      start_at: startAt,
      notes: {
        email,
        companyName,
        billing_type: billingType,
        modules: resolvedModuleKeys.join(","),
      },
    })) as { id: string };

    const trialStart = new Date();
    const trialEnd = new Date(startAt * 1000);

    const dbSub = await prisma.billingSubscription.create({
      data: {
        customerId: customer.id,
        razorpaySubscriptionId: rzpSub.id,
        razorpayPlanId,
        planKey: body.bundleKey ?? "modular",
        billingType,
        selectedModules: resolvedModuleKeys,
        status: "created",
        trialStartAt: trialStart,
        trialEndAt: trialEnd,
        authAmountPaise: 100,
      },
    });

    return NextResponse.json({
      ok: true,
      subscriptionId: rzpSub.id,
      dbSubscriptionId: dbSub.id,
      totalAmountPaise,
      resolvedModules: resolvedModuleKeys,
      billingType,
      rzpKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("[create-subscription]", err);
    return NextResponse.json({ message: "Subscription creation failed. Please try again." }, { status: 500 });
  }
}
