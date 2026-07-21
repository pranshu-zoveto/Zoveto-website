import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { getRazorpay } from "@/lib/razorpay";

export const RAZORPAY_PLAN_SPECS = {
  "operations-suite": {
    envKey: "RAZORPAY_PLAN_OPS_SUITE_MONTHLY",
    itemName: "zoveto-operations-suite-monthly",
    name: "Operations Suite",
    amountPaise: 1499900,
  },
  "business-os": {
    envKey: "RAZORPAY_PLAN_BUSINESS_OS_MONTHLY",
    itemName: "zoveto-business-os-monthly",
    name: "Business OS",
    amountPaise: 2499900,
  },
} as const;

function isPlaceholderPlanId(id: string | undefined): boolean {
  const value = id?.trim() ?? "";
  return !value || value.includes("XXXX") || !value.startsWith("plan_");
}

export function readPlanIdFromEnv(envKey: string): string {
  const id = process.env[envKey]?.trim() ?? "";
  return isPlaceholderPlanId(id) ? "" : id;
}

async function findOrCreatePlan(spec: (typeof RAZORPAY_PLAN_SPECS)[keyof typeof RAZORPAY_PLAN_SPECS]): Promise<string> {
  const rzp = getRazorpay();
  const list = await rzp.plans.all({ count: 100 });
  const existing = (list.items ?? []).find(
    (p) => p.item?.name === spec.itemName && p.item?.amount === spec.amountPaise,
  );
  if (existing?.id) return existing.id;

  const created = await rzp.plans.create({
    period: "monthly",
    interval: 1,
    item: {
      name: spec.itemName,
      amount: spec.amountPaise,
      currency: "INR",
      description: spec.name,
    },
    notes: { plan_key: spec.itemName },
  });
  return created.id;
}

function persistPlanIdsToEnvLocal(updates: Record<string, string>) {
  if (process.env.NODE_ENV === "production") return;
  const envLocalPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envLocalPath)) return;

  let content = readFileSync(envLocalPath, "utf8");
  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}=${value}`;
    const re = new RegExp(`^${key}=.*$`, "m");
    content = re.test(content) ? content.replace(re, line) : `${content.trimEnd()}\n${line}\n`;
  }
  writeFileSync(envLocalPath, content.endsWith("\n") ? content : `${content}\n`);
}

/** Validates Razorpay keys with a lightweight API call. */
export async function validateRazorpayKeys(): Promise<{ ok: true } | { ok: false; message: string }> {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!keyId || !keySecret || keyId.includes("XXXX") || keySecret === "XXXX") {
    return {
      ok: false,
      message:
        "Razorpay API keys are missing. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local from Dashboard → Account & Settings → API Keys (Test Mode).",
    };
  }

  try {
    const auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100, currency: "INR", receipt: `ping_${Date.now()}` }),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: { description?: string } };
    const msg = data.error?.description ?? res.statusText;
    if (msg.toLowerCase().includes("authentication")) {
      return {
        ok: false,
        message:
          "Razorpay API keys are invalid. Generate fresh Test Mode keys in Dashboard → Account & Settings → API Keys, update .env.local, then restart the dev server.",
      };
    }
    return { ok: false, message: `Razorpay error: ${msg}` };
  } catch {
    return { ok: false, message: "Could not reach Razorpay API. Check your network connection." };
  }
}

/**
 * Ensures subscription plans exist in Razorpay and writes IDs into process.env for this process.
 * Safe to call on each request in development when plan env vars are still placeholders.
 */
export async function ensureRazorpayPlans(): Promise<{ ok: true } | { ok: false; message: string }> {
  const keyCheck = await validateRazorpayKeys();
  if (!keyCheck.ok) return keyCheck;

  try {
    const written: Record<string, string> = {};
    for (const spec of Object.values(RAZORPAY_PLAN_SPECS)) {
      if (!isPlaceholderPlanId(process.env[spec.envKey])) continue;
      const planId = await findOrCreatePlan(spec);
      process.env[spec.envKey] = planId;
      written[spec.envKey] = planId;
    }
    if (Object.keys(written).length > 0) {
      persistPlanIdsToEnvLocal(written);
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create Razorpay plans";
    return { ok: false, message };
  }
}
