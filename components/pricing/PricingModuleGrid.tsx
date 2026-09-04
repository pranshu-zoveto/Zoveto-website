"use client";

import { MODULES } from "@/lib/pricing-modules";
import { PricingModuleCard } from "@/components/pricing/PricingModuleCard";
import { cn } from "@/lib/utils";

type PricingModuleGridProps = {
  className?: string;
};

/**
 * Five independently priced modules. Equal visual weight; no featured SKU.
 */
export function PricingModuleGrid({ className }: PricingModuleGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)} role="list">
      {MODULES.map((mod) => (
        <div key={mod.id} role="listitem" className="min-w-0">
          <PricingModuleCard mod={mod} />
        </div>
      ))}
    </div>
  );
}
