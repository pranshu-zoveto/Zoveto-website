/** Rupee amounts (integer INR). Professional + Business annual clarity. */
export type BillingCycle = "monthly" | "yearly";
export const DEFAULT_BILLING_CYCLE: BillingCycle = "yearly";

export type PaidPlanPricing = {
  listMonthly: number;
  effectiveMonthlyAnnual: number;
  annualTotal: number;
  savingsPerYear: number;
};

/** Canonical INR pricing source for paid tiers. */
export const PAID_PLAN_PRICING = {
  starter: {
    monthly: 7999,
    yearlyEffective: 5999,
  },
  growth: {
    monthly: 17999,
    yearlyEffective: 14999,
  },
} as const;

/** ₹0 marketing tier — annual/monthly display the same. */
export const PRICING_FREE: PaidPlanPricing = {
  listMonthly: 0,
  effectiveMonthlyAnnual: 0,
  annualTotal: 0,
  savingsPerYear: 0,
};

export const PRICING_PROFESSIONAL: PaidPlanPricing = {
  listMonthly: PAID_PLAN_PRICING.starter.monthly,
  effectiveMonthlyAnnual: PAID_PLAN_PRICING.starter.yearlyEffective,
  annualTotal: PAID_PLAN_PRICING.starter.yearlyEffective * 12,
  savingsPerYear: PAID_PLAN_PRICING.starter.monthly * 12 - PAID_PLAN_PRICING.starter.yearlyEffective * 12,
};

export const PRICING_BUSINESS: PaidPlanPricing = {
  listMonthly: PAID_PLAN_PRICING.growth.monthly,
  effectiveMonthlyAnnual: PAID_PLAN_PRICING.growth.yearlyEffective,
  annualTotal: PAID_PLAN_PRICING.growth.yearlyEffective * 12,
  savingsPerYear: PAID_PLAN_PRICING.growth.monthly * 12 - PAID_PLAN_PRICING.growth.yearlyEffective * 12,
};

export const USD_RATE_INR = 85;

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUsd(amountInInr: number): string {
  const usdAmount = Math.round(amountInInr / USD_RATE_INR);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usdAmount);
}
