import type { ReactNode } from "react";
import type { BillingCycle, PaidPlanPricing } from "@/lib/pricing-display";
import { formatInr, formatUsd } from "@/lib/pricing-display";
import { annualSavingsPercent } from "@/lib/pricing-plans";
import { cn } from "@/lib/utils";

type PlanPriceBlockProps = {
  billing: BillingCycle;
  pricing: PaidPlanPricing | null;
  currency: "inr" | "usd";
  onToggleCurrency: () => void;
  /** One muted line at end of billing stack (e.g. segment). */
  segmentLine?: string | null;
  className?: string;
};

/** Keeps currency-toggle row height when toggle is hidden (aligns segment lines across plans). */
function CurrencyRowPlaceholder() {
  return <div className="mt-3 min-h-[1.25rem]" aria-hidden />;
}

function isFreePricing(pricing: PaidPlanPricing): boolean {
  return pricing.listMonthly <= 0 && pricing.effectiveMonthlyAnnual <= 0;
}

/** Fills the card price region: main stack on top, optional segment pinned to bottom for row alignment. */
function PriceRegion({
  className,
  main,
  segmentLine,
}: {
  className?: string;
  main: ReactNode;
  segmentLine?: string | null;
}) {
  return (
    <div className={cn("flex h-full min-h-0 flex-1 flex-col", className)}>
      <div className="shrink-0">{main}</div>
      <div className="min-h-0 flex-1" aria-hidden />
      {segmentLine ? (
        <p className="w-full max-w-[30ch] shrink-0 pt-2 text-pretty text-xs leading-relaxed text-muted">{segmentLine}</p>
      ) : null}
    </div>
  );
}

export function PlanPriceBlock({
  billing,
  pricing,
  currency,
  onToggleCurrency,
  segmentLine,
  className,
}: PlanPriceBlockProps) {
  const yearly = billing === "yearly";
  /** No overflow-wrap:anywhere — it can split "/mo" and misalign cards vs Starter. */
  const priceSize =
    "text-3xl font-bold tracking-tight text-foreground sm:text-4xl xl:text-[3rem] xl:leading-[1.05]";
  const moSuffix = "text-lg font-semibold sm:text-xl xl:text-[2rem]";
  const formatMoney = currency === "usd" ? formatUsd : formatInr;
  const toggleLabel = currency === "inr" ? "View in USD" : "View in INR";

  if (!pricing) {
    return (
      <PriceRegion
        className={className}
        segmentLine={segmentLine}
        main={
          <>
            <div className={priceSize}>Custom</div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-2">
              {yearly ? "Volume & SLA pricing" : "Talk to us for a quote"}
            </p>
            <CurrencyRowPlaceholder />
          </>
        }
      />
    );
  }

  if (isFreePricing(pricing)) {
    return (
      <PriceRegion
        className={className}
        segmentLine={segmentLine}
        main={
          <>
            <div className={priceSize}>{formatMoney(0)}</div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-2">Reviewed access</p>
            <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-muted">Not for running a business</p>
            <CurrencyRowPlaceholder />
          </>
        }
      />
    );
  }

  if (!yearly) {
    return (
      <PriceRegion
        className={className}
        segmentLine={segmentLine}
        main={
          <>
            <div className={priceSize}>
              <span className="whitespace-nowrap">
                {formatMoney(pricing.listMonthly)}
                <span className={moSuffix}>/mo</span>
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-2">Per month</p>
            <div className="mt-3 min-h-[1.25rem]">
              <button
                type="button"
                onClick={onToggleCurrency}
                className="text-xs text-muted underline-offset-2 transition-colors hover:underline"
              >
                {toggleLabel}
              </button>
            </div>
          </>
        }
      />
    );
  }

  const pct = annualSavingsPercent(pricing);

  return (
    <PriceRegion
      className={className}
      segmentLine={segmentLine}
      main={
        <>
          <div className={priceSize}>
            <span className="whitespace-nowrap">
              {formatMoney(pricing.effectiveMonthlyAnnual)}
              <span className={moSuffix}>/mo</span>
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">Billed annually</p>
          {pricing.savingsPerYear > 0 ? (
            <div className="mt-2 flex min-h-[2rem] flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-teal/20 bg-teal-dim px-2.5 py-1 text-xs font-medium text-teal">
                Save {pct}%
              </span>
            </div>
          ) : (
            <div className="mt-2 min-h-[2rem]" aria-hidden />
          )}
          <p className="mt-2 text-sm text-muted line-through">
            <span className="whitespace-nowrap">{formatMoney(pricing.listMonthly)}/mo</span>
          </p>
          <div className="mt-2 min-h-[1.25rem]">
            <button
              type="button"
              onClick={onToggleCurrency}
              className="text-xs text-muted underline-offset-2 transition-colors hover:underline"
            >
              {toggleLabel}
            </button>
          </div>
        </>
      }
    />
  );
}
