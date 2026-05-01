"use client";

import React, { useEffect, useState } from "react";
import { PricingBillingToggle } from "@/components/pricing/PricingBillingToggle";
import { PricingPlanGrid } from "@/components/pricing/PricingPlanGrid";
import { DEFAULT_BILLING_CYCLE, type BillingCycle } from "@/lib/pricing-display";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>(DEFAULT_BILLING_CYCLE);
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");

  useEffect(() => {
    const savedCurrency = window.localStorage.getItem("pricingCurrency");
    if (savedCurrency === "inr" || savedCurrency === "usd") {
      setCurrency(savedCurrency);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pricingCurrency", currency);
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "inr" ? "usd" : "inr"));
  };

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden bg-transparent py-section-mobile md:py-section"
    >
      <div className="container relative z-10 mx-auto max-w-[min(100%,80rem)] px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">Pricing</p>
          <h2 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-tight">
            Pricing that follows operating volume, not seat-count theatre.
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Start fast. Scale as your operations grow.
          </p>
        </div>

        <RevealOnScroll>
          <div className="reveal-item mb-14 flex justify-center md:mb-16">
            <PricingBillingToggle billing={billing} onChange={setBilling} />
          </div>

          <div className="reveal-item pt-8">
            <PricingPlanGrid
              billing={billing}
              currency={currency}
              onToggleCurrency={toggleCurrency}
              animated={false}
            />
          </div>
        </RevealOnScroll>

        <p className="mx-auto mt-14 max-w-2xl text-center text-xs font-medium uppercase leading-relaxed tracking-wide text-muted-2 md:mt-16">
          Controlled onboarding · GST invoice on purchase · Migration assistance available
        </p>
      </div>
    </section>
  );
}

export default PricingSection;
