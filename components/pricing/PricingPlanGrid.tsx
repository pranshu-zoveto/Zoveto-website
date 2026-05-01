"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MARKETING_PRICING_PLANS } from "@/lib/pricing-plans";
import { PricingPlanCard } from "@/components/pricing/PricingPlanCard";
import type { BillingCycle } from "@/lib/pricing-display";

type PricingPlanGridProps = {
  billing: BillingCycle;
  currency: "inr" | "usd";
  onToggleCurrency: () => void;
  /** Staggered entrance on /pricing. */
  animated?: boolean;
  className?: string;
};

export function PricingPlanGrid({ billing, currency, onToggleCurrency, animated, className }: PricingPlanGridProps) {
  return (
    <div
      className={cn(
        "grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 md:gap-7 xl:grid-cols-4 xl:items-stretch xl:gap-5 2xl:gap-6",
        className
      )}
    >
      {MARKETING_PRICING_PLANS.map((plan, idx) => {
        const card = (
          <PricingPlanCard
            plan={plan}
            billing={billing}
            currency={currency}
            onToggleCurrency={onToggleCurrency}
            className="min-h-0 w-full min-w-0 xl:h-full"
          />
        );

        if (animated) {
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.45 }}
              className="flex min-h-0 w-full min-w-0 flex-col xl:h-full"
            >
              {card}
            </motion.div>
          );
        }

        return (
          <div key={plan.id} className="flex min-h-0 w-full min-w-0 flex-col xl:h-full">
            {card}
          </div>
        );
      })}
    </div>
  );
}
