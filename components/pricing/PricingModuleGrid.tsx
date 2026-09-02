"use client";

import Link from "next/link";
import { MODULES } from "@/lib/pricing-modules";
import { formatInr } from "@/lib/pricing-display";
import { PricingModuleCard } from "@/components/pricing/PricingModuleCard";
import { cn } from "@/lib/utils";
import { IconCard } from "@/components/ui/IconCard";

type PricingModuleGridProps = {
  className?: string;
  /** Optional id for aria-labelledby on parent sections */
  headingId?: string;
  /** `cards` is the /pricing grid. Homepage passes `list`. */
  variant?: "cards" | "list";
};

/**
 * Five module prices — shared by homepage pricing and /pricing.
 * Default `cards`: icon-box grid (horizontal snap on mobile).
 * Pass `variant="list"` for the homepage hairline rows.
 */
export function PricingModuleGrid({
  className,
  variant = "cards",
}: PricingModuleGridProps) {
  if (variant === "list") {
    return (
      <div className={cn("w-full", className)} role="list">
        {MODULES.map((mod, i) => (
          <IconCard
            key={mod.id}
            as="article"
            divided={i > 0}
            className="md:items-center"
            label={mod.name}
            description={mod.tagline}
            body={mod.features.slice(0, 3).join(", ")}
            aside={
              <div className="flex items-end justify-between gap-4 md:block">
                <div>
                  <p className="font-mono-plex text-base font-bold tabular-nums tracking-tight text-foreground">
                    {formatInr(mod.monthlyPrice)}
                  </p>
                  <p className="mt-0.5 text-xs font-normal text-muted">/mo excl. GST</p>
                </div>
                <Link
                  href={`/signup?module=${mod.id.toUpperCase()}`}
                  className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap text-sm font-medium text-blue transition-colors hover:text-blue-hover"
                >
                  Start 15-day free trial
                </Link>
              </div>
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-5",
        className,
      )}
      role="list"
    >
      {MODULES.map((mod) => (
        <div
          key={mod.id}
          role="listitem"
          className="w-[min(85vw,17.5rem)] shrink-0 snap-center sm:w-auto sm:shrink"
        >
          <PricingModuleCard mod={mod} className="h-full" />
        </div>
      ))}
    </div>
  );
}
