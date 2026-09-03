"use client";

import { MODULES, FEATURED_MODULE_ID, type PricingModuleId } from "@/lib/pricing-modules";
import { PricingModuleCard } from "@/components/pricing/PricingModuleCard";
import { cn } from "@/lib/utils";

type PricingModuleGridProps = {
  className?: string;
  featuredId?: PricingModuleId;
};

/**
 * Five independently priced modules as a commercial catalog.
 * ERP is featured by default (tint, ring, filled CTA).
 */
export function PricingModuleGrid({
  className,
  featuredId = FEATURED_MODULE_ID,
}: PricingModuleGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)} role="list">
      {MODULES.map((mod) => (
        <div key={mod.id} role="listitem" className="min-w-0">
          <PricingModuleCard mod={mod} featured={mod.id === featuredId} />
        </div>
      ))}
    </div>
  );
}
