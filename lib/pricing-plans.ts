import type { PaidPlanPricing } from "@/lib/pricing-display";
import { PRICING_BUSINESS, PRICING_FREE, PRICING_PROFESSIONAL } from "@/lib/pricing-display";

export type PlanCtaHref = "/signup" | "/contact";

export type MarketingPlanId = "free" | "starter" | "growth" | "enterprise";

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

const freeFeatures = [
  "Core ERP access (Inventory + Orders)",
  "Basic CRM (Leads only)",
  "1 user",
  "Limited transactions (50/month)",
  "Basic dashboard",
  "Community support",
] as const;

const starterFeatures = [
  "Everything in Free",
  "Full ERP (Inventory + Orders + Finance)",
  "CRM (Leads + Pipeline)",
  "Up to 10 users",
  "500 AI agent runs/mo",
  "500 WhatsApp messages",
  "Email support, 48h SLA · 10GB storage",
] as const;

const growthFeatures = [
  "Everything in Starter",
  "HRMS (employees + payroll)",
  "15 users",
  "2,000 AI agent runs/mo",
  "2,000 WhatsApp messages",
  "Chat support, 24h SLA",
  "100GB storage",
] as const;

const enterpriseFeatures = [
  "Everything in Growth",
  "Unlimited users (fair use)",
  "Custom integrations",
  "Dedicated success partner",
  "On-site training options",
  "Uptime & SLA commitments",
] as const;

const plans: MarketingPricingPlan[] = [
  {
    id: "free",
    name: "Free",
    subtitle: "Best for testing the system",
    segmentTagline: "Single user only",
    pricing: PRICING_FREE,
    features: freeFeatures,
    ctaHref: "/signup",
    ctaLabel: "Get started",
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    subtitle: "Run your daily operations in one system",
    segmentTagline: "Focused teams · up to 10 users",
    pricing: PRICING_PROFESSIONAL,
    features: starterFeatures,
    ctaHref: "/signup",
    ctaLabel: "Request access",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Automate workflows and scale your team",
    segmentTagline: "Scaling operations · up to 15 users",
    pricing: PRICING_BUSINESS,
    features: growthFeatures,
    ctaHref: "/signup",
    ctaLabel: "Request access",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: null,
    segmentTagline: "30+ users · custom SLAs",
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

/** Marketing pricing tiers (home + /pricing). Order: Free → Starter → Growth → Enterprise. */
export const MARKETING_PRICING_PLANS: readonly MarketingPricingPlan[] = plans;

export function annualSavingsPercent(pricing: PaidPlanPricing): number {
  if (pricing.listMonthly <= 0) return 0;
  return Math.round((1 - pricing.effectiveMonthlyAnnual / pricing.listMonthly) * 100);
}
