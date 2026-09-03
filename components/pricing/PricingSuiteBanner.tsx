"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { formatInr } from "@/lib/pricing-display";
import { BUNDLES, MODULES, type PricingBundle } from "@/lib/pricing-modules";
import { cn } from "@/lib/utils";

const OPERATIONS_SUITE = BUNDLES.find((b) => b.id === "operations-suite") as PricingBundle;

export function PricingSuiteBanner({ className }: { className?: string }) {
  const chips = OPERATIONS_SUITE.moduleIds.map((id) => MODULES.find((m) => m.id === id)?.name ?? id);

  return (
    <article
      aria-labelledby="operations-suite-title"
      className={cn(
        "grid gap-6 rounded-xl border border-[var(--blue-border)] bg-[var(--blue-dim)] p-6 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_auto_auto] lg:items-center lg:gap-10 lg:p-8",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 id="operations-suite-title" className="text-2xl font-bold tracking-tight text-foreground md:text-[1.75rem]">
          {OPERATIONS_SUITE.name}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Included modules">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-md border border-[var(--blue-border)] bg-card px-2.5 py-1 text-xs font-semibold tracking-wide text-blue"
            >
              {chip}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">{OPERATIONS_SUITE.tagline}</p>
      </div>

      <div className="lg:text-right">
        <p className="font-mono-geist text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
          {formatInr(OPERATIONS_SUITE.monthlyPrice)}
        </p>
        <p className="mt-1 text-sm text-muted">/mo excl. GST</p>
        <p className="mt-2 text-sm font-medium text-blue">
          Save {formatInr(OPERATIONS_SUITE.savingsVsSeparate)}/mo vs separate modules
        </p>
      </div>

      <div className="lg:justify-self-end">
        <Link
          href={OPERATIONS_SUITE.ctaHref}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "h-12 w-full min-w-[13.5rem] lg:w-auto")}
        >
          Start 15-day free trial
        </Link>
      </div>
    </article>
  );
}
