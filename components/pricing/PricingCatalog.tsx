"use client";

import { PricingBundleStack } from "@/components/pricing/PricingSuiteBanner";
import { PricingQuietOffers } from "@/components/pricing/PricingQuietOffers";
import { PricingModuleGrid } from "@/components/pricing/PricingModuleGrid";

type PricingCatalogProps = {
  /** Extra line above the five cards (used on /pricing). */
  modulesLabel?: string;
  showQuietOffers?: boolean;
};

export function PricingCatalog({ modulesLabel, showQuietOffers = false }: PricingCatalogProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <PricingBundleStack />

      <div>
        {modulesLabel ? (
          <p className="mb-4 text-sm font-medium text-foreground md:mb-5">{modulesLabel}</p>
        ) : null}
        <PricingModuleGrid />
      </div>

      {showQuietOffers ? <PricingQuietOffers /> : null}
    </div>
  );
}
