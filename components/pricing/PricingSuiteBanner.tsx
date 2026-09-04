"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { formatInr } from "@/lib/pricing-display";
import { BUNDLES, MODULES, type PricingBundleId } from "@/lib/pricing-modules";
import { cn } from "@/lib/utils";

type PricingSuiteBannerProps = {
  className?: string;
  bundleId?: PricingBundleId;
  /** Featured = tinted recommended stack. Quiet = sibling bundle under it. */
  variant?: "featured" | "quiet";
};

export function PricingSuiteBanner({
  className,
  bundleId = "operations-suite",
  variant,
}: PricingSuiteBannerProps) {
  const bundle = BUNDLES.find((b) => b.id === bundleId);
  if (!bundle) return null;

  const featured = variant === "featured" || (variant == null && bundleId === "operations-suite");
  const chips = bundle.moduleIds.map((id) => MODULES.find((m) => m.id === id)?.name ?? id);
  const titleId = `${bundle.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "grid gap-6 rounded-xl p-6 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_auto_auto] lg:items-center lg:gap-10 lg:p-8",
        featured
          ? "border border-[var(--blue-border)] bg-[var(--blue-dim)]"
          : "border border-border bg-card",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 id={titleId} className="text-2xl font-bold tracking-tight text-foreground md:text-[1.75rem]">
          {bundle.name}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Included modules">
          {chips.map((chip) => (
            <li
              key={chip}
              className={cn(
                "rounded-md border bg-card px-2.5 py-1 text-xs font-semibold tracking-wide",
                featured
                  ? "border-[var(--blue-border)] text-blue"
                  : "border-border text-muted",
              )}
            >
              {chip}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">{bundle.tagline}</p>
      </div>

      <div className="lg:text-right">
        <p className="font-mono-geist text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
          {formatInr(bundle.monthlyPrice)}
        </p>
        <p className="mt-1 text-sm text-muted">/mo excl. GST</p>
        <p className="mt-2 text-sm font-medium text-blue">
          Save {formatInr(bundle.savingsVsSeparate)}/mo vs separate modules
        </p>
      </div>

      <div className="lg:justify-self-end">
        <Link
          href={bundle.ctaHref}
          className={cn(
            buttonVariants({ variant: featured ? "primary" : "blue-outline", size: "lg" }),
            "h-12 w-full min-w-[13.5rem] lg:w-auto",
          )}
        >
          Start 15-day free trial
        </Link>
      </div>
    </article>
  );
}

/** Operations Suite, then Business OS. Two SKUs, stacked. Not a subtitle on the first. */
export function PricingBundleStack({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <PricingSuiteBanner bundleId="operations-suite" variant="featured" />
      <PricingSuiteBanner bundleId="business-os" variant="quiet" />
    </div>
  );
}
