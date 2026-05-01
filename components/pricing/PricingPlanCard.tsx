"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { MarketingPricingPlan } from "@/lib/pricing-plans";
import { PlanPriceBlock } from "@/components/pricing/PlanPriceBlock";
import type { BillingCycle } from "@/lib/pricing-display";

type PricingPlanCardProps = {
  plan: MarketingPricingPlan;
  billing: BillingCycle;
  currency: "inr" | "usd";
  onToggleCurrency: () => void;
  className?: string;
};

export function PricingPlanCard({ plan, billing, currency, onToggleCurrency, className }: PricingPlanCardProps) {
  const isGrowth = plan.popular;
  const ctaPrimary = isGrowth;
  const headingId = `plan-${plan.id}-title`;

  return (
    <div
      role="article"
      aria-labelledby={headingId}
      className={cn(
        "relative flex min-h-0 w-full min-w-0 flex-col rounded-2xl border bg-card px-6 pb-7 pt-7 sm:px-7 sm:pb-8 sm:pt-8 xl:h-full xl:px-7 xl:pb-8 xl:pt-8",
        "transition-[border-color,box-shadow] duration-300",
        isGrowth
          ? "z-[1] border-blue/30 bg-blue-light/[0.12] shadow-md ring-1 ring-blue/25"
          : "border-border shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="mb-4 flex h-8 shrink-0 items-center justify-center px-1">
        {isGrowth ? (
          <span className="max-w-full whitespace-normal rounded-full bg-blue px-3 py-1.5 text-center text-[10px] font-bold uppercase leading-tight tracking-widest text-white">
            Most Popular
          </span>
        ) : null}
      </div>

      <div className="min-h-[4.25rem] shrink-0">
        <h3 id={headingId} className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-2">
          {plan.name}
        </h3>
        {plan.subtitle ? (
          <p className="mt-2 max-w-[26ch] text-pretty text-sm leading-snug text-muted">{plan.subtitle}</p>
        ) : (
          <div className="mt-2 min-h-[2.5rem]" aria-hidden />
        )}
      </div>

      <div className="mt-5 flex min-h-[12.25rem] shrink-0 flex-col sm:mt-6">
        <PlanPriceBlock
          billing={billing}
          pricing={plan.pricing}
          currency={currency}
          onToggleCurrency={onToggleCurrency}
          segmentLine={plan.segmentTagline}
          className="flex min-h-0 flex-col"
        />
      </div>

      <div className="mt-7 shrink-0">
        <Link
          href={plan.ctaHref}
          className={cn(
            buttonVariants({ variant: ctaPrimary ? "primary" : "outline", size: "lg" }),
            "h-12 w-full rounded-xl text-base font-semibold active:scale-[0.98]",
          )}
        >
          {plan.ctaLabel}
        </Link>
      </div>

      <div className="my-7 shrink-0 border-t border-border" />

      <ul className="mt-1 flex min-h-0 flex-col gap-3 xl:flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3">
            <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-blue-600 shrink-0" aria-hidden />
            <p className="min-w-0 max-w-[28ch] break-words text-[14px] leading-[22px] text-gray-600">{feat}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 min-h-0 shrink-0 border-t border-border/80 pt-5 xl:mt-auto">
        {plan.id === "free" ? (
          <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-widest text-muted-2">
            Limited scope · no AI or advanced automation · upgrade anytime
          </p>
        ) : (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-2">GST as applicable</p>
        )}
      </div>
    </div>
  );
}
