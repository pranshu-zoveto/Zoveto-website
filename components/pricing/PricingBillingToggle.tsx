"use client";

import { cn } from "@/lib/utils";
import type { BillingCycle } from "@/lib/pricing-display";

type PricingBillingToggleProps = {
  billing: BillingCycle;
  onChange: (next: BillingCycle) => void;
  className?: string;
};

export function PricingBillingToggle({ billing, onChange, className }: PricingBillingToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-full border border-border bg-muted/30 p-1 shadow-sm",
        className
      )}
      role="group"
      aria-label="Billing period"
    >
      <button
        type="button"
        aria-pressed={billing === "monthly"}
        onClick={() => onChange("monthly")}
        className={cn(
          "px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          billing === "monthly" ? "bg-blue text-white" : "text-muted hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        aria-pressed={billing === "yearly"}
        onClick={() => onChange("yearly")}
        className={cn(
          "px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          billing === "yearly" ? "bg-blue text-white" : "text-muted hover:text-foreground"
        )}
      >
        Yearly
      </button>
    </div>
  );
}
