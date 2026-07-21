# Cursor Implementation Prompt — Razorpay Integration (Zoveto-website)

> **Reference**: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/

---

## ⚠️ Credentials (TEST MODE — switch to live keys before production)

```
RAZORPAY_KEY_ID=rzp_test_XXXX
RAZORPAY_KEY_SECRET=XXXX
```

- `KEY_SECRET` must **never** appear in any frontend file, browser bundle, or git commit.
- The public-facing key (`KEY_ID`) is safe for the frontend, prefixed as `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
- Add `.env.local` to `.gitignore` immediately — verify it is already listed before writing credentials.

---

## How the Two Checkout Flows Work (Read This First)

This codebase uses **two distinct Razorpay flows** — they share the same checkout modal but differ in what opens it:

### Flow A — Standard Web Checkout (one-time order)
Used if you ever need to charge a fixed one-time amount (e.g. setup fee, upgrade).

```
Backend: POST /api/razorpay/create-order
  → Call https://api.razorpay.com/v1/orders
  → Body: { amount (paise, min 100), currency: "INR", receipt }
  → Returns: { id: "order_XXXX", amount, currency }

Frontend: open Razorpay modal with { key, order_id, amount, ... }
  → On success: { razorpay_payment_id, razorpay_order_id, razorpay_signature }

Backend: POST /api/razorpay/verify-payment
  → HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
  → Compare with razorpay_signature — return 400 if mismatch, never mark paid
```

### Flow B — Subscription Checkout (recurring, 15-day trial) ← PRIMARY FLOW
Used for the signup trial. The modal opens with `subscription_id` instead of `order_id`.

```
Backend: POST /api/razorpay/create-subscription
  → Call https://api.razorpay.com/v1/subscriptions
  → Body: { plan_id, total_count, start_at (unix = now+15days), customer_notify: 1 }
  → Returns: { id: "sub_XXXX", status }

Frontend: open Razorpay modal with { key, subscription_id, ... }
  → On success: { razorpay_payment_id, razorpay_subscription_id, razorpay_signature }

Backend: POST /api/razorpay/confirm
  → HMAC-SHA256(payment_id + "|" + subscription_id, KEY_SECRET)  ← NOTE: order differs from Flow A
  → Compare with razorpay_signature — return 400 if mismatch
```

**Signature algorithm differs between the two flows:**
- Order (Flow A): `HMAC-SHA256( order_id + "|" + payment_id, KEY_SECRET )`
- Subscription (Flow B): `HMAC-SHA256( payment_id + "|" + subscription_id, KEY_SECRET )`

---

## Context & Goal

This is the **Zoveto-website** codebase (Next.js 14, TypeScript, Prisma + PostgreSQL, Tailwind CSS).

We are adding a **15-day free trial with Razorpay Subscription** to the signup flow. The current signup (`app/(marketing)/signup/_SignupClient.tsx`) is a lead-capture form that just sends an email. We need to transform it into a proper **plan selection + payment flow** that:

1. Lets the user pick a plan (Operations Suite ₹14,999/mo or Business OS ₹24,999/mo)
2. Creates a Razorpay Subscription with `start_at` = 15 days from now (so first charge is after trial)
3. Opens Razorpay Checkout to collect card details + charge ₹1 as authentication
4. On success, stores the subscription in DB and calls the Zoveto backend to provision the tenant
5. Shows a success screen

---

## Pricing Reference (from `lib/pricing-display.ts`)

```ts
// Operations Suite: ₹14,999/mo flat
// Business OS: ₹24,999/mo flat
```

Plans in `lib/pricing-plans.ts`:
- `"operations-suite"` → `ctaHref: "/contact"` (needs to change to `"/signup"`)
- `"business-os"` → `ctaHref: "/contact"` (needs to change to `"/signup"`)

---

## Step 1 — Install Dependencies

```bash
npm install razorpay
npm install @types/razorpay --save-dev
```

---

## Step 2 — Environment Variables

**First**: confirm `.env.local` is in `.gitignore`. If not, add it before writing any credentials.

Create `.env.local` (never commit this file):

```bash
# Razorpay — TEST keys (replace with live keys before going live)
RAZORPAY_KEY_ID=rzp_test_XXXX
RAZORPAY_KEY_SECRET=XXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXX
RAZORPAY_WEBHOOK_SECRET=XXXX   # Get from Razorpay Dashboard → Webhooks → Secret

# Razorpay Plan IDs — create in Razorpay Dashboard → Subscriptions → Plans
# Operations Suite: ₹14,999/mo → create plan, paste ID here
RAZORPAY_PLAN_OPS_SUITE_MONTHLY=plan_XXXX
# Business OS: ₹24,999/mo → create plan, paste ID here
RAZORPAY_PLAN_BUSINESS_OS_MONTHLY=plan_XXXX

# Zoveto backend provisioning (set after backend is deployed)
COS_INTERNAL_PROVISION_URL=https://app.zoveto.com/api/internal/provision-trial
COS_INTERNAL_SECRET=XXXX
```

Create `.env.example` (safe to commit — values are placeholders only):

```bash
RAZORPAY_KEY_ID=rzp_test_XXXX
RAZORPAY_KEY_SECRET=XXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXX
RAZORPAY_WEBHOOK_SECRET=XXXX
RAZORPAY_PLAN_OPS_SUITE_MONTHLY=plan_XXXX
RAZORPAY_PLAN_BUSINESS_OS_MONTHLY=plan_XXXX
COS_INTERNAL_PROVISION_URL=https://app.zoveto.com/api/internal/provision-trial
COS_INTERNAL_SECRET=XXXX
```

**Rules that must never be violated:**
- `RAZORPAY_KEY_SECRET` must never appear in any file under `app/`, `components/`, `hooks/`, or `lib/` that is imported by client components.
- Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` may be used in client-side code.
- Verify with `grep -r "RAZORPAY_KEY_SECRET=.[^X]" .env.example PROMPT_*` before every commit — secrets must only live in `.env.local`.

---

## Step 3 — Prisma Schema (`prisma/schema.prisma`)

Append these models **after** the existing `Integration` model. Do not modify any existing models.

```prisma
model BillingCustomer {
  id                 String         @id @default(cuid())
  email              String         @unique
  name               String
  companyName        String?
  phone              String?
  razorpayCustomerId String?        @unique

  subscriptions      BillingSubscription[]

  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @updatedAt
}

model BillingSubscription {
  id                     String    @id @default(cuid())
  customerId             String
  customer               BillingCustomer @relation(fields: [customerId], references: [id])

  razorpaySubscriptionId String    @unique
  razorpayPlanId         String
  planKey                String    // "operations-suite" | "business-os"
  billingCycle           String    @default("monthly")

  // Status mirrors Razorpay: created | authenticated | active | pending | halted | cancelled | completed | expired
  status                 String    @default("created")

  // Trial window
  trialStartAt           DateTime?
  trialEndAt             DateTime?

  // Recurring billing window
  currentPeriodStart     DateTime?
  currentPeriodEnd       DateTime?

  // Auth charge (₹1 = 100 paise)
  authAmountPaise        Int       @default(100)
  lastPaymentAt          DateTime?

  // Zoveto app link
  zovetoClaimed          Boolean   @default(false)
  zovetoCompanyId        String?   // UUID of provisioned CompanyMaster in Zoveto backend

  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt

  payments               BillingPaymentEvent[]
}

model BillingPaymentEvent {
  id                  String              @id @default(cuid())
  subscriptionId      String
  subscription        BillingSubscription @relation(fields: [subscriptionId], references: [id])

  razorpayPaymentId   String              @unique
  amountPaise         Int
  status              String              // captured | failed | refunded
  paidAt              DateTime?

  createdAt           DateTime            @default(now())
}
```

After adding, run:
```bash
npx prisma migrate dev --name add_razorpay_billing
npx prisma generate
```

---

## Step 4 — Razorpay SDK Singleton (`lib/razorpay.ts`)

Create `lib/razorpay.ts`:

```ts
import Razorpay from "razorpay";

let instance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!instance) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
    }
    instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  return instance;
}

export const RAZORPAY_PLAN_MAP: Record<string, string> = {
  "operations-suite": process.env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY ?? "",
  "business-os": process.env.RAZORPAY_PLAN_BUSINESS_OS_MONTHLY ?? "",
};

export const PLAN_DISPLAY: Record<string, { name: string; amountInr: number }> = {
  "operations-suite": { name: "Operations Suite", amountInr: 14999 },
  "business-os": { name: "Business OS", amountInr: 24999 },
};
```

---

## Step 5 — API Routes

### 5a. `app/api/razorpay/create-order/route.ts` (NEW FILE — Standard Checkout, Flow A)

This is the **Standard Web Checkout** order creation endpoint. It creates a one-time Razorpay Order.
Use this if you ever need to charge a fixed amount outside of subscriptions (e.g. upgrade, addon).

```ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Invalid body" }, { status: 400 });

    const { amount, currency = "INR", receipt } = body as {
      amount?: number;
      currency?: string;
      receipt?: string;
    };

    // Validate: minimum 100 paise (₹1)
    if (!amount || amount < 100) {
      return NextResponse.json({ message: "amount must be at least 100 paise" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json({ message: "Razorpay not configured" }, { status: 500 });
    }

    const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: (receipt ?? `rcpt_${Date.now()}`).slice(0, 40),
        payment_capture: 1,
      }),
    });

    const data = (await rzpRes.json().catch(() => ({}))) as Record<string, unknown>;

    if (!rzpRes.ok || !data.id) {
      const msg = (data as any)?.error?.description ?? rzpRes.statusText;
      console.error("[create-order] Razorpay error:", msg);
      return NextResponse.json({ message: `Razorpay error: ${msg}` }, { status: 500 });
    }

    return NextResponse.json({
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error("[create-order]", err);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}
```

### 5b. `app/api/razorpay/verify-payment/route.ts` (NEW FILE — Standard Checkout verify, Flow A)

```ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Invalid body" }, { status: 400 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body as Record<string, string>;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { message: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are required" },
        { status: 400 },
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
    }

    // Flow A signature: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const generated = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Use timing-safe comparison to prevent timing attacks
    let valid = false;
    try {
      const a = Buffer.from(generated, "utf8");
      const b = Buffer.from(razorpay_signature.trim(), "utf8");
      valid = a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      valid = false;
    }

    if (!valid) {
      // Signature mismatch — do NOT mark as paid
      return NextResponse.json({ message: "Signature verification failed" }, { status: 400 });
    }

    // Payment verified — mark as paid in your DB here if needed
    return NextResponse.json({ ok: true, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error("[verify-payment]", err);
    return NextResponse.json({ message: "Verification failed" }, { status: 500 });
  }
}
```

### 5c. `app/api/razorpay/create-subscription/route.ts` (NEW FILE — Subscription flow, Flow B)

```ts
import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, RAZORPAY_PLAN_MAP, PLAN_DISPLAY } from "@/lib/razorpay";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Invalid body" }, { status: 400 });

    const { email, name, companyName, phone, planKey } = body as {
      email?: string;
      name?: string;
      companyName?: string;
      phone?: string;
      planKey?: string;
    };

    if (!email || !name || !planKey) {
      return NextResponse.json({ message: "email, name, and planKey are required" }, { status: 400 });
    }

    const rzpPlanId = RAZORPAY_PLAN_MAP[planKey];
    if (!rzpPlanId) {
      return NextResponse.json({ message: `Unknown plan: ${planKey}` }, { status: 400 });
    }

    const rzp = getRazorpay();

    // Create or fetch Razorpay customer
    let razorpayCustomerId: string;
    const existing = await db.billingCustomer.findUnique({ where: { email } });
    if (existing?.razorpayCustomerId) {
      razorpayCustomerId = existing.razorpayCustomerId;
    } else {
      const rzpCustomer = await (rzp.customers as any).create({
        name,
        email,
        contact: phone ?? "",
      });
      razorpayCustomerId = rzpCustomer.id as string;
    }

    // Save or update BillingCustomer
    const customer = await db.billingCustomer.upsert({
      where: { email },
      create: { email, name, companyName: companyName ?? null, phone: phone ?? null, razorpayCustomerId },
      update: { razorpayCustomerId, name, companyName: companyName ?? null, phone: phone ?? null },
    });

    // Trial ends 15 days from now — first actual charge happens at start_at
    const trialEndAt = new Date();
    trialEndAt.setDate(trialEndAt.getDate() + 15);
    const startAtUnix = Math.floor(trialEndAt.getTime() / 1000);

    // Create Razorpay Subscription
    const rzpSub = await (rzp.subscriptions as any).create({
      plan_id: rzpPlanId,
      customer_notify: 1,
      total_count: 12,        // 12 billing cycles
      quantity: 1,
      start_at: startAtUnix, // First charge 15 days from now
      notes: {
        customer_email: email,
        plan_key: planKey,
        company_name: companyName ?? "",
      },
    });

    // Persist subscription in DB
    await db.billingSubscription.create({
      data: {
        customerId: customer.id,
        razorpaySubscriptionId: rzpSub.id as string,
        razorpayPlanId: rzpPlanId,
        planKey,
        billingCycle: "monthly",
        status: "created",
        trialStartAt: new Date(),
        trialEndAt,
        authAmountPaise: 100,
      },
    });

    return NextResponse.json({
      subscriptionId: rzpSub.id,
      rzpKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      planName: PLAN_DISPLAY[planKey]?.name ?? planKey,
      trialEndAt: trialEndAt.toISOString(),
    });
  } catch (err) {
    console.error("[razorpay/create-subscription]", err);
    return NextResponse.json({ message: "Failed to create subscription" }, { status: 500 });
  }
}
```

### 5d. `app/api/razorpay/confirm/route.ts` (NEW FILE — Subscription verify, Flow B)

```ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Invalid body" }, { status: 400 });

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      email,
      name,
      companyName,
      phone,
      planKey,
      teamSize,
      role,
      useCase,
    } = body as Record<string, string>;

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return NextResponse.json({ message: "Missing Razorpay fields" }, { status: 400 });
    }

    // 1. Verify signature
    // Flow B signature: HMAC-SHA256(payment_id + "|" + subscription_id, KEY_SECRET)
    // NOTE: this is the REVERSE order compared to the Order flow (Flow A)
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    // Use timing-safe comparison
    let sigValid = false;
    try {
      const a = Buffer.from(generatedSignature, "utf8");
      const b = Buffer.from(razorpay_signature.trim(), "utf8");
      sigValid = a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      sigValid = false;
    }

    if (!sigValid) {
      // Signature mismatch — do NOT activate subscription
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // 2. Update subscription status
    const sub = await db.billingSubscription.findUnique({
      where: { razorpaySubscriptionId: razorpay_subscription_id },
      include: { customer: true },
    });

    if (!sub) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    await db.billingSubscription.update({
      where: { id: sub.id },
      data: {
        status: "authenticated",
        lastPaymentAt: new Date(),
      },
    });

    // 3. Record the ₹1 auth payment
    await db.billingPaymentEvent.create({
      data: {
        subscriptionId: sub.id,
        razorpayPaymentId: razorpay_payment_id,
        amountPaise: 100,
        status: "captured",
        paidAt: new Date(),
      },
    });

    // 4. Provision Zoveto tenant
    let zovetoCompanyId: string | null = null;
    const provisionUrl = process.env.COS_INTERNAL_PROVISION_URL;
    const provisionSecret = process.env.COS_INTERNAL_SECRET;

    if (provisionUrl && provisionSecret) {
      try {
        const provRes = await fetch(provisionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-secret": provisionSecret,
          },
          body: JSON.stringify({
            email: sub.customer.email,
            name: sub.customer.name,
            companyName: sub.customer.companyName ?? companyName ?? "",
            phone: sub.customer.phone ?? phone ?? "",
            planKey: sub.planKey,
            razorpaySubscriptionId: razorpay_subscription_id,
            teamSize: teamSize ?? "",
            role: role ?? "",
            useCase: useCase ?? "",
          }),
        });
        if (provRes.ok) {
          const provData = (await provRes.json()) as { companyId?: string };
          zovetoCompanyId = provData.companyId ?? null;
          if (zovetoCompanyId) {
            await db.billingSubscription.update({
              where: { id: sub.id },
              data: { zovetoClaimed: true, zovetoCompanyId },
            });
          }
        } else {
          console.error("[razorpay/confirm] Provision failed", await provRes.text());
        }
      } catch (err) {
        console.error("[razorpay/confirm] Provision error", err);
        // Non-fatal — subscription confirmed, provisioning can be retried
      }
    }

    return NextResponse.json({
      ok: true,
      zovetoCompanyId,
    });
  } catch (err) {
    console.error("[razorpay/confirm]", err);
    return NextResponse.json({ message: "Confirmation failed" }, { status: 500 });
  }
}
```

### 5e. `app/api/razorpay/webhook/route.ts` (NEW FILE)

**IMPORTANT**: This route must receive the **raw body** as a Buffer/string — do NOT use `req.json()` before signature verification. Use `req.text()` to get the raw body.

```ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Disable Next.js body parsing so we get raw bytes for HMAC verification
export const config = { api: { bodyParser: false } };

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
    // Return 200 to prevent Razorpay from retrying — log the error instead
    return NextResponse.json({ ok: false, error: "internal" });
  }

  return NextResponse.json({ ok: true });
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

  // Map Razorpay subscription lifecycle events to internal status
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
    const sub = await db.billingSubscription.findUnique({
      where: { razorpaySubscriptionId: razorpaySubId },
    });
    if (!sub) {
      console.warn(`[webhook] No subscription found for ${razorpaySubId}`);
      return;
    }

    const newStatus = STATUS_MAP[eventType];
    const updateData: Parameters<typeof db.billingSubscription.update>[0]["data"] = {
      status: newStatus,
    };

    if (eventType === "subscription.charged" && payEntity) {
      const paidAtRaw = payEntity.created_at;
      updateData.lastPaymentAt = new Date();
      const subCurrentEnd = subEntity?.current_end;
      if (typeof subCurrentEnd === "number") {
        updateData.currentPeriodEnd = new Date(subCurrentEnd * 1000);
      }
      const subCurrentStart = subEntity?.current_start;
      if (typeof subCurrentStart === "number") {
        updateData.currentPeriodStart = new Date(subCurrentStart * 1000);
      }

      // Record payment
      if (razorpayPayId) {
        const amountRaw = payEntity.amount;
        await db.billingPaymentEvent.upsert({
          where: { razorpayPaymentId: razorpayPayId },
          create: {
            subscriptionId: sub.id,
            razorpayPaymentId: razorpayPayId,
            amountPaise: typeof amountRaw === "number" ? amountRaw : 0,
            status: "captured",
            paidAt: typeof paidAtRaw === "number" ? new Date(paidAtRaw * 1000) : new Date(),
          },
          update: { status: "captured" },
        });
      }
    }

    await db.billingSubscription.update({
      where: { id: sub.id },
      data: updateData,
    });

    console.log(`[webhook] ${eventType} → subscription ${sub.id} status = ${newStatus}`);
  }

  if (eventType === "payment.failed" && razorpayPayId) {
    const orderIdRaw = payEntity?.order_id;
    // Log failed payment — the subscription status will be updated by subscription.halted
    console.warn(`[webhook] payment.failed payId=${razorpayPayId} orderId=${orderIdRaw}`);
  }
}
```

Register this webhook URL in Razorpay Dashboard → Webhooks:
- URL: `https://www.zoveto.com/api/razorpay/webhook`
- Subscribe to: `subscription.activated`, `subscription.charged`, `subscription.halted`, `subscription.cancelled`, `subscription.completed`, `subscription.pending`, `payment.failed`

---

## Step 6 — Update Signup Client (`app/(marketing)/signup/_SignupClient.tsx`)

**Completely replace** the file with the following. This is a 3-phase flow:
- Phase `"form"` — existing lead fields + plan picker
- Phase `"payment"` — opens Razorpay popup (no UI, triggers automatically)
- Phase `"success"` — confirmation screen

Key rules:
- Use `window.Razorpay` (loaded via Script tag)
- Do NOT import Razorpay on client — it's loaded via CDN script
- Preserve all existing Tailwind classes and animation style
- Keep all existing form fields (fullName, email, companyName, role, teamSize, useCase, phone)
- Add a **plan selector step** BEFORE the existing form — user picks plan first, then fills details

```tsx
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, ShieldCheck, Sparkles, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent, trackMarketingEvent } from "@/lib/tracking";
import { FormToast } from "@/components/ui/FormToast";
import { formatCosApiErrorMessage } from "@/lib/http-json";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

const BULLETS = [
  "15-day free trial — no charge until day 15",
  "₹1 card verification to ensure your card is valid",
  "Cancel anytime before trial ends — no questions asked",
] as const;

const WHAT_NEXT_STEPS = [
  "Pick your plan and fill in your details",
  "Verify your card with a ₹1 authentication charge",
  "Get instant access — your workspace is ready in minutes",
] as const;

const TEAM_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "200+"] as const;

const PRIORITY_OPTIONS = [
  "Inventory and warehouse control",
  "Sales, CRM, and follow-up discipline",
  "Finance, billing, and collections",
  "Multi-module operating system rollout",
] as const;

const PLANS = [
  {
    key: "operations-suite",
    name: "Operations Suite",
    desc: "WMS + ERP + CRM",
    price: "₹14,999/mo",
    features: ["Warehouse & dispatch", "Inventory & GST billing", "CRM & lead pipeline", "Up to 25 users"],
  },
  {
    key: "business-os",
    name: "Business OS",
    desc: "All 5 modules",
    price: "₹24,999/mo",
    popular: true,
    features: ["Everything in Operations Suite", "HRMS — payroll, PF/ESI", "Intelligence & AI agents", "Unlimited users"],
  },
] as const;

type PlanKey = "operations-suite" | "business-os";
type Phase = "plan" | "form" | "submitting" | "processing" | "success";
type ToastState =
  | { open: false }
  | { open: true; tone: "success" | "error"; title: string; message: string };

export default function SignupClient() {
  // Plan selection
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | "">("");

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");
  const [phone, setPhone] = useState("");

  const [phase, setPhase] = useState<Phase>("plan");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<ToastState>({ open: false });

  function showError(msg: string) {
    setError(msg);
    setToast({ open: true, tone: "error", title: "Error", message: msg });
    setPhase("form");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    if (!selectedPlan) {
      showError("Please select a plan.");
      return;
    }
    setError("");
    setPhase("submitting");

    try {
      // 1. Create Razorpay subscription on backend
      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: fullName, companyName, phone, planKey: selectedPlan }),
      });

      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (!res.ok) {
        showError((data.message as string) ?? "Could not create subscription. Please try again.");
        return;
      }

      const { subscriptionId, rzpKeyId, planName, trialEndAt } = data as {
        subscriptionId: string;
        rzpKeyId: string;
        planName: string;
        trialEndAt: string;
      };

      setPhase("processing");

      // 2. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: rzpKeyId,
        subscription_id: subscriptionId,
        name: "Zoveto",
        description: `${planName} — 15-day free trial · ₹1 card verification`,
        image: "https://www.zoveto.com/logo.png",
        prefill: { name: fullName, email, contact: phone },
        theme: { color: "#2563EB" },
        notes: { plan: selectedPlan, company: companyName },
        // Handler called after successful payment (₹1 auth)
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_subscription_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const confirmRes = await fetch("/api/razorpay/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                email,
                name: fullName,
                companyName,
                phone,
                planKey: selectedPlan,
                teamSize,
                role,
                useCase,
              }),
            });

            if (!confirmRes.ok) {
              showError("Payment confirmed but activation failed. Email us at info@zoveto.com with your payment ID: " + response.razorpay_payment_id);
              return;
            }

            setPhase("success");
            trackMarketingEvent("trial_started", {
              plan: selectedPlan,
              subscription_id: response.razorpay_subscription_id,
            });
            trackEvent("purchase", { method: "razorpay_subscription", plan: selectedPlan });
          } catch {
            showError("Payment confirmed but we could not activate your account. Email info@zoveto.com with payment ID: " + response.razorpay_payment_id);
          }
        },
        modal: {
          ondismiss: () => {
            setPhase("form");
          },
        },
      });

      rzp.open();
    } catch {
      showError("Something went wrong. Please try again.");
    }
  }

  const inputClass = cn(
    "w-full min-h-[48px] rounded-xl border border-border bg-surface px-4 py-3.5 text-base text-foreground shadow-sm",
    "placeholder:text-muted-2",
    "transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus:border-blue/40 focus:ring-2 focus:ring-blue/15",
    "disabled:opacity-60 disabled:cursor-not-allowed",
  );

  const isSubmitting = phase === "submitting" || phase === "processing";

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-background">
      <FormToast
        open={toast.open}
        tone={toast.open ? toast.tone : "success"}
        title={toast.open ? toast.title : ""}
        message={toast.open ? toast.message : ""}
        onClose={() => setToast({ open: false })}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[20rem] w-[min(100vw,56rem)] -translate-x-1/2 rounded-full bg-blue-light/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-teal-dim opacity-60 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-content px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:pb-20 lg:pt-32">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left column — value props */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue-light/80 px-3 py-1.5 text-xs font-semibold text-blue">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              15-day free trial
            </div>
            <h1 className="mb-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
              Start your free trial
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              Pick your plan, verify your card with ₹1, and get 15 days free. After the trial,
              you&apos;re automatically charged only if you choose to continue.
            </p>
            <ul className="mx-auto max-w-xl space-y-3.5 text-left sm:space-y-4 lg:mx-0">
              {BULLETS.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/20 bg-teal-dim">
                    <Check className="h-3.5 w-3.5 text-teal" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="pt-0.5 text-sm font-medium leading-snug text-foreground sm:text-base">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-surface-2/50 p-5 text-left shadow-sm ring-1 ring-black/[0.03] sm:p-6 lg:mx-0">
              <p className="text-sm font-semibold text-foreground">What happens next:</p>
              <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted marker:font-semibold marker:text-foreground">
                {WHAT_NEXT_STEPS.map((step) => (
                  <li key={step} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right column — form card */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className={cn(
              "w-full max-w-[480px] rounded-2xl border border-border/80 bg-card/75 shadow-lg shadow-blue/10 backdrop-blur-xl",
              "ring-1 ring-border",
            )}>
              <div className="p-6 sm:p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {/* ── SUCCESS ── */}
                  {phase === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="py-4 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal/25 bg-teal-dim">
                        <ShieldCheck className="h-8 w-8 text-teal" strokeWidth={2} aria-hidden />
                      </div>
                      <h2 className="mb-2 text-xl font-semibold text-foreground">
                        Trial started — you&apos;re in!
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed text-muted">
                        Your 15-day trial is active. We&apos;ll send login credentials to{" "}
                        <strong className="text-foreground">{email}</strong> within a few minutes.
                        Your card will only be charged after the trial ends.
                      </p>
                      <div className="rounded-xl border border-border bg-surface px-4 py-3 text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">
                          What to expect
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                          Check your inbox for your workspace URL and login details.
                          Your trial ends in 15 days — after that you&apos;re automatically billed for the plan you selected.
                        </p>
                      </div>
                    </motion.div>

                  /* ── PLAN PICKER ── */
                  ) : phase === "plan" ? (
                    <motion.div
                      key="plan"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-6">
                        <h2 className="mb-1 text-lg font-semibold text-foreground">Choose your plan</h2>
                        <p className="text-sm text-muted-2">Both plans include a 15-day free trial.</p>
                      </div>
                      <div className="space-y-3">
                        {PLANS.map((plan) => (
                          <button
                            key={plan.key}
                            type="button"
                            onClick={() => {
                              setSelectedPlan(plan.key as PlanKey);
                              setPhase("form");
                            }}
                            className={cn(
                              "relative w-full rounded-xl border p-4 text-left transition-all",
                              "hover:border-blue/40 hover:bg-blue-light/30",
                              selectedPlan === plan.key
                                ? "border-blue bg-blue-light/40 ring-1 ring-blue/30"
                                : "border-border bg-surface",
                            )}
                          >
                            {plan.popular && (
                              <span className="absolute right-3 top-3 rounded-full bg-blue px-2 py-0.5 text-[10px] font-semibold text-white">
                                Most popular
                              </span>
                            )}
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                                <p className="text-xs text-muted-2">{plan.desc}</p>
                              </div>
                              <p className="shrink-0 text-sm font-bold text-foreground">{plan.price}</p>
                            </div>
                            <ul className="mt-3 space-y-1">
                              {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-xs text-muted">
                                  <Check className="h-3 w-3 shrink-0 text-teal" strokeWidth={2.5} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </button>
                        ))}
                      </div>
                      <p className="mt-4 text-center text-xs text-muted-2">
                        ₹1 card verification · Cancel before day 15 to avoid charge
                      </p>
                    </motion.div>

                  /* ── FORM ── */
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <h2 className="mb-1 text-lg font-semibold text-foreground">Your details</h2>
                          <p className="text-sm text-muted-2">
                            Plan: <strong className="text-foreground">
                              {PLANS.find((p) => p.key === selectedPlan)?.name}
                            </strong>
                            {" · "}
                            <button
                              type="button"
                              onClick={() => setPhase("plan")}
                              className="text-blue underline-offset-2 hover:underline"
                            >
                              Change
                            </button>
                          </p>
                        </div>
                        <CreditCard className="h-5 w-5 text-muted-2" aria-hidden />
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-foreground">
                            Full name <span className="text-red">*</span>
                          </label>
                          <input
                            id="fullName" name="fullName" type="text" required autoComplete="name"
                            disabled={isSubmitting} className={inputClass} value={fullName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                            placeholder="Rajesh Kumar"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                            Work email <span className="text-red">*</span>
                          </label>
                          <input
                            id="email" name="email" type="email" required autoComplete="email" inputMode="email"
                            disabled={isSubmitting} className={inputClass} value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-foreground">
                            Company name <span className="text-red">*</span>
                          </label>
                          <input
                            id="companyName" name="companyName" type="text" required autoComplete="organization"
                            disabled={isSubmitting} className={inputClass} value={companyName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                            placeholder="Acme Industries Pvt. Ltd."
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="role" className="mb-2 block text-sm font-medium text-foreground">
                              Your role <span className="text-red">*</span>
                            </label>
                            <input
                              id="role" name="role" type="text" required autoComplete="organization-title"
                              disabled={isSubmitting} className={inputClass} value={role}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                              placeholder="Founder / Ops head"
                            />
                          </div>
                          <div>
                            <label htmlFor="teamSize" className="mb-2 block text-sm font-medium text-foreground">
                              Team size <span className="text-red">*</span>
                            </label>
                            <select
                              id="teamSize" name="teamSize" required
                              disabled={isSubmitting} className={inputClass} value={teamSize}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTeamSize(e.target.value)}
                            >
                              <option value="">Select size</option>
                              {TEAM_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="useCase" className="mb-2 block text-sm font-medium text-foreground">
                            Operating priority <span className="text-red">*</span>
                          </label>
                          <select
                            id="useCase" name="useCase" required
                            disabled={isSubmitting} className={inputClass} value={useCase}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setUseCase(e.target.value)}
                          >
                            <option value="">Select the biggest pain</option>
                            {PRIORITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                            Phone / WhatsApp <span className="text-muted-2">(optional)</span>
                          </label>
                          <input
                            id="phone" name="phone" type="tel" autoComplete="tel"
                            disabled={isSubmitting} className={inputClass} value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        {error ? (
                          <div role="alert" className="rounded-xl border border-red/20 bg-red/5 px-4 py-3 text-sm text-red">
                            {error}
                          </div>
                        ) : null}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "relative flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-blue px-4 py-3.5 text-sm font-semibold text-white",
                            "shadow-md shadow-blue/25 transition-colors hover:bg-blue-hover",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            "disabled:cursor-not-allowed disabled:opacity-70",
                          )}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                              <span>{phase === "submitting" ? "Setting up subscription..." : "Opening payment..."}</span>
                            </>
                          ) : (
                            "Start Free Trial →"
                          )}
                        </button>

                        <p className="pt-1 text-center text-xs leading-relaxed text-muted-2">
                          ₹1 verification charge now · Plan charge starts after 15-day trial
                          <span className="my-2 block h-px w-full max-w-[16rem] mx-auto bg-border/80" aria-hidden />
                          By starting a trial you agree to our{" "}
                          <Link href="/terms" className="text-blue underline-offset-2 hover:underline">Terms</Link>
                          {" · "}
                          <Link href="/privacy" className="text-blue underline-offset-2 hover:underline">Privacy</Link>
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## Step 7 — Add Razorpay Script to Layout (`app/layout.tsx`)

In the root layout, add the Razorpay checkout script. Import `Script` from `"next/script"` and add inside `<body>`:

```tsx
import Script from "next/script";

// Inside <body>, before closing tag:
<Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
```

---

## Step 8 — Update Pricing Plans CTAs (`lib/pricing-plans.ts`)

Change both paid plan CTAs from `"/contact"` to `"/signup"` and update labels:

```ts
// operations-suite
ctaHref: "/signup",
ctaLabel: "Start free trial",

// business-os
ctaHref: "/signup",
ctaLabel: "Start free trial",
```

---

## How to Test (After Implementation)

1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000/signup`
3. Pick a plan → fill form → click "Start Free Trial"
4. Razorpay modal opens — use Razorpay test card:
   - Card: `4111 1111 1111 1111` · Expiry: any future date · CVV: any 3 digits
   - Or UPI: `success@razorpay`
5. On success, the confirm endpoint fires and the success screen shows
6. Verify in Razorpay Dashboard (Test Mode) → Subscriptions — you should see the subscription created

**To test Standard Checkout (Flow A) separately:**
```bash
# Create order
curl -X POST http://localhost:3000/api/razorpay/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR", "receipt": "test_1"}'
# Returns: {"order_id":"order_XXXX","amount":100,"currency":"INR"}

# Verify payment (replace with real IDs from modal response)
curl -X POST http://localhost:3000/api/razorpay/verify-payment \
  -H "Content-Type: application/json" \
  -d '{"razorpay_order_id":"order_XXXX","razorpay_payment_id":"pay_XXXX","razorpay_signature":"XXXX"}'
```

---

## Error Handling Reference

| Scenario | Expected behaviour |
|----------|-------------------|
| User dismisses the modal | `modal.ondismiss` fires → reset to `"form"` phase — show no error |
| `payment.failed` event | Show toast: "Payment failed. Please try a different card." |
| Create subscription fails (400/500) | Show inline error — do NOT open modal |
| Confirm endpoint returns 400 (bad sig) | Show error: "Payment could not be verified. Contact support." — do NOT grant access |
| Webhook signature invalid | Return 401 — log the attempt |
| Webhook internal error | Return 200 (not 5xx) — log error — Razorpay must not retry |
| `amount < 100 paise` in create-order | Return 400 immediately |
| Missing fields in verify-payment | Return 400 — never mark as paid |

---

## Critical Rules for Cursor

1. **Two different HMAC formulas** — never mix them:
   - Flow A (order): `HMAC-SHA256( order_id + "|" + payment_id, KEY_SECRET )`
   - Flow B (subscription): `HMAC-SHA256( payment_id + "|" + subscription_id, KEY_SECRET )`
2. **Never parse `req.json()` in the webhook route** — use `req.text()` first, then `JSON.parse()`.
3. **Always use `crypto.timingSafeEqual`** for every HMAC comparison — never use `===`.
4. **The `db` import** is from `@/lib/db` — check whether it exports as `db` or `prisma` and use the correct name throughout.
5. **Never expose `RAZORPAY_KEY_SECRET`** to any client file — only `NEXT_PUBLIC_RAZORPAY_KEY_ID` is frontend-safe.
6. **The webhook route** must return HTTP 200 even on internal errors (log, don't throw) — Razorpay retries on non-200.
7. **Run `npx prisma generate`** after every schema change before running the app.
8. **Modal dismiss is not an error** — when `ondismiss` fires, reset phase to `"form"` silently.
9. **Signature mismatch = 400, never mark paid** — if signatures don't match, return 400 and abort. Never grant access.
10. **Minimum amount**: create-order must validate `amount >= 100` (paise) before calling Razorpay API.
