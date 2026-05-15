import type { PaidPlanPricing } from "@/lib/pricing-display";
import { PRICING_OPERATIONS_SUITE, PRICING_BUSINESS_OS } from "@/lib/pricing-display";

export type PlanCtaHref = "/signup" | "/contact";

export type MarketingPlanId = "operations-suite" | "business-os" | "enterprise";

export type MarketingPricingPlan = {
  id: MarketingPlanId;
  name: string;
  /** Optional muted line directly under the plan name (e.g. audience). */
  subtitle: string | null;
  /** One line max, shown in billing stack (muted). */
  segmentTagline: string | null;
  pricing: PaidPlanPricing | null;
  /** At most 7 strings (enforced in tests). */
  features: readonly string[];
  ctaHref: PlanCtaHref;
  ctaLabel: string;
  popular: boolean;
};

const MAX_FEATURES = 7;

function assertMaxFeatures(features: readonly string[], planId: string): void {
  if (features.length > MAX_FEATURES) {
    throw new Error(`Plan "${planId}" has ${features.length} features; max is ${MAX_FEATURES}.`);
  }
}

const operationsSuiteFeatures = [
  "WMS — warehouse, scanning, dispatch",
  "ERP — inventory, orders, GST finance",
  "CRM — leads, pipeline, follow-ups",
  "Up to 25 users",
  "Priority onboarding support",
  "GST invoice on purchase",
] as const;

const businessOsFeatures = [
  "Everything in Operations Suite",
  "HRMS — attendance, payroll, PF/ESI",
  "Intelligence — AI agents & MIS",
  "Unlimited users (fair use)",
  "Dedicated success partner",
  "Custom integrations available",
] as const;

const enterpriseFeatures = [
  "All modules in Business OS",
  "Custom SLAs & uptime commitments",
  "Dedicated success partner",
  "On-site training options",
  "Custom integrations",
  "Procurement-friendly terms",
] as const;

const plans: MarketingPricingPlan[] = [
  {
    id: "operations-suite",
    name: "Operations Suite",
    subtitle: "WMS + ERP + CRM. The core stack for operations-led businesses.",
    segmentTagline: "Manufacturers · distributors · traders",
    pricing: PRICING_OPERATIONS_SUITE,
    features: operationsSuiteFeatures,
    ctaHref: "/contact",
    ctaLabel: "Book a demo",
    popular: false,
  },
  {
    id: "business-os",
    name: "Business OS",
    subtitle: "All five modules. Your complete operating infrastructure.",
    segmentTagline: "All 5 modules · unlimited users",
    pricing: PRICING_BUSINESS_OS,
    features: businessOsFeatures,
    ctaHref: "/contact",
    ctaLabel: "Book a demo",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: null,
    segmentTagline: "Custom SLAs · large team · bespoke integration",
    pricing: null,
    features: enterpriseFeatures,
    ctaHref: "/contact",
    ctaLabel: "Book a demo",
    popular: false,
  },
];

for (const p of plans) {
  assertMaxFeatures(p.features, p.id);
}

/** Marketing pricing plans for home + /pricing overview widget. Order: Operations Suite → Business OS → Enterprise. */
export const MARKETING_PRICING_PLANS: readonly MarketingPricingPlan[] = plans;

export function annualSavingsPercent(pricing: PaidPlanPricing): number {
  if (pricing.listMonthly <= 0) return 0;
  return Math.round((1 - pricing.effectiveMonthlyAnnual / pricing.listMonthly) * 100);
}
