"use client";

import { MODULES } from "@/lib/pricing-modules";
import { PricingModuleCard } from "@/components/pricing/PricingModuleCard";
import { cn } from "@/lib/utils";

type PricingModuleGridProps = {
  className?: string;
  /** Optional id for aria-labelledby on parent sections */
  headingId?: string;
};

/**
 * Five module price cards — shared by homepage pricing and /pricing.
 * Mobile: horizontal scroll with snap; tablet+: responsive grid.
 */
export function PricingModuleGrid({ className }: PricingModuleGridProps) {
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
