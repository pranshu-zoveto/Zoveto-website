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

function resolvePlanId(envValue: string | undefined): string {
  const id = envValue?.trim() ?? "";
  if (!id || id.includes("XXXX") || !id.startsWith("plan_")) return "";
  return id;
}

/** Resolved at call time so Next.js runtime env is always current. */
export function getRazorpayPlanId(planKey: string): string {
  const map: Record<string, string | undefined> = {
    "operations-suite": process.env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY,
    "business-os": process.env.RAZORPAY_PLAN_BUSINESS_OS_MONTHLY,
  };
  return resolvePlanId(map[planKey]);
}

export const PLAN_DISPLAY: Record<string, { name: string; amountInr: number }> = {
  "operations-suite": { name: "Operations Suite", amountInr: 14999 },
  "business-os": { name: "Business OS", amountInr: 24999 },
};
