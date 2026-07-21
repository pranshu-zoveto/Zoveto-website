# Modular Billing — Website Implementation Prompt

## Context

You are working on the **Zoveto website** (`/Users/gourvanshraina/Zoveto-website`), a Next.js 14 App Router project. Razorpay Subscriptions with a 15-day trial are already wired up for two bundle plans (`operations-suite` → `plan_TG4U3e1WaCS7Z2`, `business-os` → `plan_TG4U3eHKvf6EW`).

We need to extend the signup and billing flow to support **individual module selection** (pick any 1–5 modules, pay only for those). This is a critical billing feature — implement it with zero mismapping, no edge-case leaks, and full type safety.

---

## Modules Available for Billing

```typescript
// lib/modular-billing-config.ts  ← CREATE THIS FILE
export const BILLING_MODULES = [
  {
    key: 'WMS',
    guardCode: 'WMS',
    label: 'WMS',
    description: 'Warehouse & Dispatch Operations',
    icon: '🏭',
    monthlyPrice: 7999,
    highlights: ['Barcode & QR scanning', 'Pick-pack-ship automation', 'Multi-bin locations', 'Stock movements & GRN'],
  },
  {
    key: 'CRM',
    guardCode: 'CRM',
    label: 'CRM',
    description: 'WhatsApp-first Sales Pipeline',
    icon: '📊',
    monthlyPrice: 6999,
    highlights: ['Lead to invoice in one flow', 'WhatsApp follow-ups', 'Pipeline board', 'Activity logs'],
  },
  {
    key: 'ERP',
    guardCode: 'ERP',
    label: 'ERP',
    description: 'Finance, Invoicing & Collections',
    icon: '💰',
    monthlyPrice: 9999,
    highlights: ['GST-ready invoicing', 'Multi-site inventory', 'P&L, cash & dues live', 'Purchase & sales orders'],
  },
  {
    key: 'HRMS',
    guardCode: 'HR',
    label: 'HRMS',
    description: 'HR & Payroll',
    icon: '👥',
    monthlyPrice: 5999,
    highlights: ['App attendance & leave', 'PF / ESI / TDS auto-calc', 'One-click payslips', 'Employee document store'],
  },
  {
    key: 'INTELLIGENCE',
    guardCode: 'AI_STUDIO',
    label: 'Intelligence',
    description: 'AI Agents & Automation',
    icon: '🤖',
    monthlyPrice: 5999,
    requires: ['ERP'], // auto-include ERP if Intelligence is selected
    highlights: ['AI nudges on stalled leads', 'Low-stock & overdue alerts', 'WhatsApp automation', 'MIS dashboards'],
  },
] as const;

export type BillingModuleKey = (typeof BILLING_MODULES)[number]['key'];

// Bundle combos shown as "or choose a bundle" shortcut
export const BILLING_BUNDLES = [
  {
    key: 'operations-suite',
    razorpayPlanId: process.env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY!,
    label: 'Operations Suite',
    tagline: 'WMS + ERP + CRM',
    monthlyPrice: 14999,
    modules: ['WMS', 'ERP', 'CRM'] as BillingModuleKey[],
  },
  {
    key: 'business-os',
    razorpayPlanId: process.env.RAZORPAY_PLAN_BUSINESS_OS_MONTHLY!,
    label: 'Business OS',
    tagline: 'All 5 modules',
    monthlyPrice: 24999,
    modules: ['WMS', 'CRM', 'ERP', 'HRMS', 'INTELLIGENCE'] as BillingModuleKey[],
    popular: true,
  },
] as const;

/** Resolve dependencies: Intelligence requires ERP. Returns sorted unique keys. */
export function resolveModulesWithDeps(selected: BillingModuleKey[]): BillingModuleKey[] {
  const set = new Set(selected);
  for (const mod of BILLING_MODULES) {
    if (set.has(mod.key as BillingModuleKey) && 'requires' in mod) {
      for (const dep of mod.requires as BillingModuleKey[]) {
        set.add(dep);
      }
    }
  }
  return BILLING_MODULES.map((m) => m.key as BillingModuleKey).filter((k) => set.has(k));
}

/** Compute total monthly price for a set of module keys (after dependency resolution). */
export function computeModularTotal(moduleKeys: BillingModuleKey[]): number {
  const resolved = resolveModulesWithDeps(moduleKeys);
  return resolved.reduce((sum, key) => {
    const mod = BILLING_MODULES.find((m) => m.key === key)!;
    return sum + mod.monthlyPrice;
  }, 0);
}
```

---

## 1. Prisma Schema — Add `selectedModules` to `BillingSubscription`

File: `prisma/schema.prisma`

Add a new column to `BillingSubscription` (after `billingCycle`):

```prisma
  selectedModules        String[]  @default([])  // e.g. ["WMS","CRM","ERP"]
  billingType            String    @default("bundle") // "bundle" | "modular"
```

After editing, run:
```bash
npx prisma migrate dev --name add_modular_billing
npx prisma generate
```

---

## 2. New API Route — `POST /api/razorpay/create-subscription` (REPLACE existing)

**File**: `app/api/razorpay/create-subscription/route.ts`

This route now handles BOTH bundle plans (existing) and modular plans (new). For modular, it creates a Razorpay plan on-the-fly via `POST /v1/plans`.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import {
  BILLING_MODULES,
  BILLING_BUNDLES,
  resolveModulesWithDeps,
  computeModularTotal,
  type BillingModuleKey,
} from "@/lib/modular-billing-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      email: string;
      name: string;
      companyName: string;
      phone?: string;
      // EITHER bundle:
      bundleKey?: string;
      // OR modular:
      selectedModules?: string[];
    };

    const { email, name, companyName, phone } = body;
    if (!email || !name || !companyName) {
      return NextResponse.json({ message: "email, name, and companyName are required" }, { status: 400 });
    }

    // ── Determine billing mode ─────────────────────────────────────────────
    let razorpayPlanId: string;
    let totalAmountPaise: number;
    let billingType: "bundle" | "modular";
    let resolvedModuleKeys: BillingModuleKey[];

    if (body.bundleKey) {
      // Bundle flow — use pre-created Razorpay plan
      const bundle = BILLING_BUNDLES.find((b) => b.key === body.bundleKey);
      if (!bundle) {
        return NextResponse.json({ message: `Unknown bundle: ${body.bundleKey}` }, { status: 400 });
      }
      razorpayPlanId = bundle.razorpayPlanId;
      totalAmountPaise = bundle.monthlyPrice * 100;
      billingType = "bundle";
      resolvedModuleKeys = bundle.modules as BillingModuleKey[];

    } else if (body.selectedModules && body.selectedModules.length > 0) {
      // Modular flow — validate modules, resolve deps, create Razorpay plan on-the-fly
      const validKeys = new Set(BILLING_MODULES.map((m) => m.key));
      const invalid = body.selectedModules.filter((k) => !validKeys.has(k as BillingModuleKey));
      if (invalid.length > 0) {
        return NextResponse.json({ message: `Unknown module keys: ${invalid.join(", ")}` }, { status: 400 });
      }

      resolvedModuleKeys = resolveModulesWithDeps(body.selectedModules as BillingModuleKey[]);
      const totalMonthly = computeModularTotal(resolvedModuleKeys);
      totalAmountPaise = totalMonthly * 100;
      billingType = "modular";

      // Create a Razorpay plan dynamically for this exact combination
      const moduleLabel = resolvedModuleKeys.join(" + ");
      const planResponse = await fetch("https://api.razorpay.com/v1/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
          ).toString("base64")}`,
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

      const plan = await planResponse.json() as { id: string };
      razorpayPlanId = plan.id;

    } else {
      return NextResponse.json(
        { message: "Provide either bundleKey or selectedModules (at least 1)" },
        { status: 400 }
      );
    }

    // ── Upsert BillingCustomer ────────────────────────────────────────────
    let customer = await prisma.billingCustomer.findUnique({ where: { email } });
    let razorpayCustomerId = customer?.razorpayCustomerId ?? null;

    if (!razorpayCustomerId) {
      const rzpCustomer = await (razorpay as any).customers.create({
        name,
        email,
        contact: phone ?? undefined,
        notes: { companyName },
      }) as { id: string };
      razorpayCustomerId = rzpCustomer.id;
    }

    customer = await prisma.billingCustomer.upsert({
      where: { email },
      create: { email, name, companyName, phone, razorpayCustomerId },
      update: { name, companyName, phone, razorpayCustomerId },
    });

    // ── Create Razorpay Subscription (trial starts in 15 days) ───────────
    const startAt = Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60;

    const rzpSub = await (razorpay as any).subscriptions.create({
      plan_id: razorpayPlanId,
      customer_notify: 1,
      quantity: 1,
      total_count: 120, // 10 years max
      addons: [],
      start_at: startAt,
      // ₹1 auth charge for card verification
      offer_id: undefined,
      notes: {
        email,
        companyName,
        billing_type: billingType,
        modules: resolvedModuleKeys.join(","),
      },
    }) as { id: string; short_url: string };

    // ── Persist BillingSubscription ───────────────────────────────────────
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
    });

  } catch (err) {
    console.error("[create-subscription]", err);
    return NextResponse.json({ message: "Subscription creation failed. Please try again." }, { status: 500 });
  }
}
```

---

## 3. Update `POST /api/razorpay/confirm/route.ts`

The `/confirm` route verifies the Razorpay subscription payment and calls the backend to provision the tenant. Update it to pass `selectedModules` to the backend.

**File**: `app/api/razorpay/confirm/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const COS_INTERNAL_SECRET = process.env.COS_INTERNAL_SECRET!;
const COS_API_BASE_URL = process.env.COS_API_BASE_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
      // User details
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

    // ── Verify HMAC — Subscription flow: payment_id | subscription_id ────
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    const sig = Buffer.from(razorpay_signature, "hex");
    const exp = Buffer.from(expected, "hex");
    if (sig.length !== exp.length || !crypto.timingSafeEqual(sig, exp)) {
      return NextResponse.json({ message: "Payment signature verification failed" }, { status: 400 });
    }

    // ── Load BillingSubscription to get selectedModules ───────────────────
    const dbSub = await prisma.billingSubscription.findUnique({
      where: { razorpaySubscriptionId: razorpay_subscription_id },
    });

    if (!dbSub) {
      return NextResponse.json({ message: "Subscription record not found" }, { status: 404 });
    }

    // ── Record payment event ──────────────────────────────────────────────
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

    // ── Update subscription status to authenticated ───────────────────────
    await prisma.billingSubscription.update({
      where: { id: dbSub.id },
      data: { status: "authenticated" },
    });

    // ── Call backend to provision tenant ──────────────────────────────────
    if (!COS_API_BASE_URL) {
      console.warn("[confirm] COS_API_BASE_URL not set — skipping provisioning");
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

    // Pass selectedModules for modular billing; planKey for bundle billing
    if (dbSub.billingType === "modular" && dbSub.selectedModules.length > 0) {
      provisionPayload.selectedModules = dbSub.selectedModules;
    } else {
      provisionPayload.planKey = dbSub.planKey; // "operations-suite" | "business-os"
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
      // Don't return error to user — payment succeeded, provisioning can be retried
      await prisma.billingSubscription.update({
        where: { id: dbSub.id },
        data: { status: "authenticated" }, // Keep as authenticated, ops team can retry
      });
      return NextResponse.json({
        ok: true,
        status: "payment_verified_provision_pending",
        warning: "Payment captured. Workspace is being set up — check email in a few minutes.",
      });
    }

    const provisionData = await provisionRes.json() as { companyId?: string };

    // ── Update with Zoveto company ID ─────────────────────────────────────
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
```

---

## 4. Update Prisma Schema for `billingType` and `selectedModules`

The `BillingSubscription` model in `prisma/schema.prisma` needs two new fields. Add after `billingCycle`:

```prisma
  billingType            String    @default("bundle")   // "bundle" | "modular"
  selectedModules        String[]  @default([])          // module guard codes e.g. ["WMS","CRM"]
```

---

## 5. Replace `_SignupClient.tsx` — Full 3-Phase Modular UI

**File**: `app/(marketing)/signup/_SignupClient.tsx`

Complete replacement. The new UI has THREE modes on the first screen:
- **Module picker** (default): checkboxes for each module, running total
- **Bundle picker** (shortcut): shows bundle cards as before
- Toggle between them

```typescript
"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Info, Loader2, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormToast } from "@/components/ui/FormToast";
import { trackEvent } from "@/lib/tracking";
import {
  BILLING_MODULES,
  BILLING_BUNDLES,
  resolveModulesWithDeps,
  computeModularTotal,
  type BillingModuleKey,
} from "@/lib/modular-billing-config";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

// ── Types ────────────────────────────────────────────────────────────────────

type Phase = "picker" | "form" | "submitting" | "processing" | "success";
type PickerMode = "modular" | "bundle";
type ToastState = { type: "error" | "success"; message: string } | null;

const TEAM_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "200+"] as const;
const PRIORITY_OPTIONS = [
  "Inventory and warehouse control",
  "Sales, CRM, and follow-up discipline",
  "Finance, billing, and collections",
  "HR, payroll, and compliance",
  "AI automation and intelligence",
] as const;

const formatInr = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  /** Pre-select a module when navigating from the pricing page (e.g. ?module=WMS) */
  preSelectedModule?: BillingModuleKey | null;
}

export function SignupClient({ preSelectedModule }: Props = {}) {
  // ── State ──────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("picker");
  const [pickerMode, setPickerMode] = useState<PickerMode>("modular");
  const [selectedModules, setSelectedModules] = useState<Set<BillingModuleKey>>(
    preSelectedModule ? new Set([preSelectedModule]) : new Set()
  );
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");

  // ── Derived ────────────────────────────────────────────────────────────
  const resolvedModules = resolveModulesWithDeps([...selectedModules]);
  const modularTotal = computeModularTotal([...selectedModules]);
  const selectedBundleObj = BILLING_BUNDLES.find((b) => b.key === selectedBundle);
  const displayTotal = pickerMode === "bundle" && selectedBundleObj
    ? selectedBundleObj.monthlyPrice
    : modularTotal;
  const hasSelection = pickerMode === "bundle" ? !!selectedBundle : selectedModules.size > 0;

  // ── Handlers ───────────────────────────────────────────────────────────

  const toggleModule = useCallback((key: BillingModuleKey) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const autoDepMessage = (): string | null => {
    const deps = resolvedModules.filter((k) => !selectedModules.has(k));
    if (deps.length === 0) return null;
    return `Auto-included: ${deps.join(", ")} (required dependency)`;
  };

  const handleContinue = () => {
    if (!hasSelection) {
      setToast({ type: "error", message: "Please select at least one module to continue." });
      return;
    }
    setToast(null);
    setPhase("form");
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !companyName.trim()) {
      setToast({ type: "error", message: "Name, email, and company name are required." });
      return;
    }
    if (!teamSize) {
      setToast({ type: "error", message: "Please select your team size." });
      return;
    }

    setPhase("submitting");
    setToast(null);

    try {
      // 1. Create subscription (either bundle or modular)
      const subPayload: Record<string, unknown> = {
        email: email.trim(),
        name: name.trim(),
        companyName: companyName.trim(),
        phone: phone.trim() || undefined,
      };

      if (pickerMode === "bundle" && selectedBundle) {
        subPayload.bundleKey = selectedBundle;
      } else {
        subPayload.selectedModules = resolvedModules; // includes auto-resolved deps
      }

      const subRes = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subPayload),
      });

      if (!subRes.ok) {
        const errData = await subRes.json() as { message?: string };
        throw new Error(errData.message ?? "Failed to create subscription.");
      }

      const subData = await subRes.json() as {
        subscriptionId: string;
        totalAmountPaise: number;
        resolvedModules: string[];
      };

      trackEvent("razorpay_subscription_created", {
        subscriptionId: subData.subscriptionId,
        billingMode: pickerMode,
        modules: subData.resolvedModules.join(","),
        totalInr: subData.totalAmountPaise / 100,
      });

      // 2. Open Razorpay modal
      setPhase("processing");

      const Razorpay = window.Razorpay;
      if (!Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh and try again.");
      }

      const handler = (response: {
        razorpay_payment_id: string;
        razorpay_subscription_id: string;
        razorpay_signature: string;
      }) => {
        (async () => {
          try {
            const confirmRes = await fetch("/api/razorpay/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                email: email.trim(),
                name: name.trim(),
                companyName: companyName.trim(),
                phone: phone.trim() || undefined,
                teamSize,
                useCase,
              }),
            });

            if (!confirmRes.ok) {
              const errData = await confirmRes.json() as { message?: string };
              setPhase("form");
              setToast({ type: "error", message: errData.message ?? "Payment verification failed. Contact support." });
              return;
            }

            trackEvent("razorpay_subscription_confirmed", {
              subscriptionId: subData.subscriptionId,
              billingMode: pickerMode,
            });

            setPhase("success");
          } catch {
            setPhase("form");
            setToast({ type: "error", message: "Verification failed. Contact support@zoveto.com." });
          }
        })();
      };

      const moduleLabel = pickerMode === "bundle"
        ? selectedBundleObj!.label
        : resolvedModules.join(" + ");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subData.subscriptionId,
        name: "Zoveto",
        description: `${moduleLabel} — 15-day free trial`,
        image: "/logo.png",
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim() || undefined,
        },
        notes: {
          billing_mode: pickerMode,
          modules: subData.resolvedModules.join(","),
        },
        theme: { color: "#2563EB" },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setPhase("form");
          },
        },
        handler,
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (err) {
      setPhase("form");
      setToast({ type: "error", message: (err as Error).message ?? "Something went wrong. Please try again." });
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="signup-container">
      {/* Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      {toast && (
        <FormToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <AnimatePresence mode="wait">

        {/* ── Phase: Picker ─────────────────────────────────────────────── */}
        {phase === "picker" && (
          <motion.div key="picker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <div className="signup-picker">
              <h2 className="signup-picker__title">Choose your modules</h2>
              <p className="signup-picker__subtitle">Select what your business needs. Pay only for those. 15 days free.</p>

              {/* ── Mode toggle ── */}
              <div className="signup-picker__mode-toggle">
                <button
                  type="button"
                  className={cn("toggle-btn", pickerMode === "modular" && "toggle-btn--active")}
                  onClick={() => { setPickerMode("modular"); setSelectedBundle(null); }}
                >
                  Individual modules
                </button>
                <button
                  type="button"
                  className={cn("toggle-btn", pickerMode === "bundle" && "toggle-btn--active")}
                  onClick={() => { setPickerMode("bundle"); setSelectedModules(new Set()); }}
                >
                  Bundle plans
                </button>
              </div>

              {pickerMode === "modular" && (
                <>
                  <div className="module-grid">
                    {BILLING_MODULES.map((mod) => {
                      const isSelected = selectedModules.has(mod.key as BillingModuleKey);
                      const isAutoDep =
                        !isSelected && resolvedModules.includes(mod.key as BillingModuleKey);
                      return (
                        <button
                          key={mod.key}
                          type="button"
                          role="checkbox"
                          aria-checked={isSelected || isAutoDep}
                          onClick={() => toggleModule(mod.key as BillingModuleKey)}
                          className={cn(
                            "module-card",
                            isSelected && "module-card--selected",
                            isAutoDep && "module-card--auto-dep"
                          )}
                        >
                          <div className="module-card__header">
                            <span className="module-card__icon">{mod.icon}</span>
                            <div>
                              <div className="module-card__label">{mod.label}</div>
                              <div className="module-card__desc">{mod.description}</div>
                            </div>
                            <div className={cn("module-card__check", (isSelected || isAutoDep) && "module-card__check--on")}>
                              <Check size={14} strokeWidth={3} />
                            </div>
                          </div>
                          <ul className="module-card__features">
                            {mod.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                          <div className="module-card__price">
                            {formatInr(mod.monthlyPrice)}<span>/mo</span>
                            {isAutoDep && <span className="module-card__auto-tag">auto-included</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dependency note */}
                  {autoDepMessage() && (
                    <div className="dep-notice">
                      <Info size={14} /> {autoDepMessage()}
                    </div>
                  )}

                  {/* Running total */}
                  <div className="modular-total">
                    {selectedModules.size === 0 ? (
                      <span className="modular-total__empty">Select modules above to see your price</span>
                    ) : (
                      <>
                        <span className="modular-total__label">Your plan:</span>
                        <span className="modular-total__amount">{formatInr(modularTotal)}/month</span>
                        <span className="modular-total__note">after 15-day free trial · ₹1 card verification now</span>
                      </>
                    )}
                  </div>
                </>
              )}

              {pickerMode === "bundle" && (
                <div className="bundle-grid">
                  {BILLING_BUNDLES.map((bundle) => (
                    <button
                      key={bundle.key}
                      type="button"
                      onClick={() => setSelectedBundle(bundle.key)}
                      className={cn("bundle-card", selectedBundle === bundle.key && "bundle-card--selected", bundle.popular && "bundle-card--popular")}
                    >
                      {bundle.popular && <span className="bundle-card__badge">Most popular</span>}
                      <div className="bundle-card__name">{bundle.label}</div>
                      <div className="bundle-card__tagline">{bundle.tagline}</div>
                      <div className="bundle-card__price">{formatInr(bundle.monthlyPrice)}<span>/mo</span></div>
                      <ul className="bundle-card__modules">
                        {bundle.modules.map((m) => (
                          <li key={m}>
                            <Check size={12} /> {BILLING_MODULES.find((mod) => mod.key === m)?.label ?? m}
                          </li>
                        ))}
                      </ul>
                      <p className="bundle-card__note">15 days free · ₹1 card check now</p>
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleContinue}
                disabled={!hasSelection}
                className="signup-btn signup-btn--primary"
              >
                Continue <ChevronRight size={16} />
              </button>

              <div className="signup-trust">
                <Lock size={12} /> <span>Secure checkout · Cancel before 15 days — no charge</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Phase: Form ───────────────────────────────────────────────── */}
        {phase === "form" && (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <form onSubmit={handleFormSubmit} className="signup-form" noValidate>
              <button
                type="button"
                className="signup-form__back"
                onClick={() => setPhase("picker")}
              >
                <ArrowLeft size={14} /> Back to modules
              </button>

              {/* Plan summary */}
              <div className="form-plan-summary">
                <div className="form-plan-summary__modules">
                  {pickerMode === "bundle"
                    ? selectedBundleObj?.label
                    : resolvedModules.join(" + ")}
                </div>
                <div className="form-plan-summary__price">
                  {formatInr(displayTotal)}/mo after trial
                </div>
              </div>

              <div className="signup-form__fields">
                <label className="form-field">
                  <span>Full name *</span>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required autoComplete="name" />
                </label>
                <label className="form-field">
                  <span>Work email *</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@acme.com" required autoComplete="email" />
                </label>
                <label className="form-field">
                  <span>Company name *</span>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" required autoComplete="organization" />
                </label>
                <label className="form-field">
                  <span>Phone (optional)</span>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" />
                </label>
                <label className="form-field">
                  <span>Team size *</span>
                  <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} required>
                    <option value="">Select team size</option>
                    {TEAM_SIZE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="form-field">
                  <span>Primary use case (optional)</span>
                  <select value={useCase} onChange={(e) => setUseCase(e.target.value)}>
                    <option value="">Select…</option>
                    {PRIORITY_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="signup-btn signup-btn--primary">
                Start free trial — ₹1 card check <ShieldCheck size={14} />
              </button>
              <p className="signup-form__fine-print">
                ₹1 is charged now to verify your card. Your first bill of {formatInr(displayTotal)} is on day 16. Cancel anytime before day 15 and pay nothing.
              </p>
            </form>
          </motion.div>
        )}

        {/* ── Phase: Submitting / Processing ────────────────────────────── */}
        {(phase === "submitting" || phase === "processing") && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="signup-processing">
              <Loader2 className="signup-processing__spinner" size={32} />
              <p>{phase === "submitting" ? "Setting up your billing…" : "Complete the payment in the popup…"}</p>
            </div>
          </motion.div>
        )}

        {/* ── Phase: Success ────────────────────────────────────────────── */}
        {phase === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="signup-success">
              <div className="signup-success__icon">✅</div>
              <h2>Your workspace is being set up!</h2>
              <p>Check <strong>{email}</strong> for your login credentials. Your 15-day free trial starts now.</p>
              <p className="signup-success__modules">
                Modules activated: <strong>
                  {pickerMode === "bundle"
                    ? selectedBundleObj?.label
                    : resolvedModules.join(", ")}
                </strong>
              </p>
              <p className="signup-success__note">
                Your card will be charged {formatInr(displayTotal)}/month on day 16. Cancel anytime before then.
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
```

---

## 6. Update Website Pricing Page CTAs

**File**: `app/(marketing)/pricing/page.tsx` (or wherever the pricing module cards are rendered)

Find the `"Request early access"` CTA on each individual module card and update it to link to the signup page with a pre-selected module:

```typescript
// For each module card, the CTA should be:
<Link href={`/signup?module=${mod.key}`}>
  Start 15-day free trial
</Link>
```

**File**: `app/(marketing)/signup/page.tsx` (or `layout.tsx`)

Read the `?module=` query param and pass it to `SignupClient`:

```typescript
import { SignupClient } from "./_SignupClient";
import type { BillingModuleKey } from "@/lib/modular-billing-config";
import { BILLING_MODULES } from "@/lib/modular-billing-config";

const VALID_MODULE_KEYS = new Set(BILLING_MODULES.map((m) => m.key));

export default function SignupPage({ searchParams }: { searchParams: { module?: string } }) {
  const rawModule = searchParams.module?.toUpperCase();
  const preSelected = rawModule && VALID_MODULE_KEYS.has(rawModule as BillingModuleKey)
    ? (rawModule as BillingModuleKey)
    : null;

  return <SignupClient preSelectedModule={preSelected} />;
}
```

---

## 7. Environment Variables (website `.env.local` / Vercel)

No new env vars needed for modular billing — the same Razorpay credentials are used to create plans dynamically. Verify these are set:

```bash
RAZORPAY_KEY_ID=rzp_live_XXXX           # used in plan/subscription creation (server-side)
RAZORPAY_KEY_SECRET=XXXX                # NEVER in frontend
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXX  # used in checkout modal (client-side)
RAZORPAY_PLAN_OPS_SUITE_MONTHLY=plan_TG4U3e1WaCS7Z2
RAZORPAY_PLAN_BUSINESS_OS_MONTHLY=plan_TG4U3eHKvf6EW
RAZORPAY_WEBHOOK_SECRET=XXXX
COS_API_BASE_URL=https://your-backend.com
COS_INTERNAL_SECRET=XXXX
```

---

## 8. Webhook Route — Handle Modular Subscriptions

**File**: `app/api/razorpay/webhook/route.ts`

The existing webhook already handles `subscription.charged` and `subscription.halted` events. No change needed — it looks up `BillingSubscription` by `razorpaySubscriptionId` which works for both bundle and modular subscriptions.

Only add this: when `subscription.charged` fires (Razorpay charges after trial ends), update the `BillingSubscription` status to `"active"` and log a `BillingPaymentEvent`. This should already exist in the webhook handler — verify it does.

---

## 9. Testing Checklist

After implementation, test these flows end-to-end:

1. **Single module**: Select only CRM → total = ₹6,999 → Razorpay creates plan dynamically → ₹1 charge → backend provisions CRM + PLATFORM_CORE + INTEGRATION_OS only
2. **Multi-module**: Select WMS + ERP → total = ₹17,998 → same flow
3. **Dependency**: Select Intelligence only → ERP auto-added → total = ₹9,999 + ₹5,999 = ₹15,998 → UI shows "ERP auto-included"
4. **Bundle**: Switch to "Bundle plans" tab → select Operations Suite → uses pre-created plan `plan_TG4U3e1WaCS7Z2` → ₹14,999
5. **Pre-selection**: Visit `/signup?module=WMS` → WMS should be pre-checked
6. **Success flow**: After payment → check email for login credentials → login to Zoveto → only selected modules should be visible

---

## Critical Rules (Do Not Violate)

1. **NEVER** put `RAZORPAY_KEY_SECRET` in any client component or `NEXT_PUBLIC_` variable
2. **ALWAYS** use `crypto.timingSafeEqual` for HMAC comparison (never `===`)
3. **ALWAYS** use `req.text()` (not `req.json()`) in the webhook route to preserve raw body for signature verification
4. Dependency resolution (`resolveModulesWithDeps`) must run on BOTH client (for display) and server (for plan creation) — the server is authoritative
5. The `selectedModules` stored in `BillingSubscription.selectedModules` must be the **resolved** list (after dep expansion), not the raw user selection, so the backend knows exactly what to provision
6. If `COS_API_BASE_URL` is not set, the confirm route must still return `ok: true` (don't block the user — ops team can provision manually)
