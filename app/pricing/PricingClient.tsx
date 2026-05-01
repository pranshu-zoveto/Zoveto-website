"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { PricingBillingToggle } from "@/components/pricing/PricingBillingToggle";
import { PricingFeatureComparison } from "@/components/pricing/PricingFeatureComparison";
import { PricingPlanGrid } from "@/components/pricing/PricingPlanGrid";
import BackgroundComponents from "@/components/ui/background-components";
import { DEFAULT_BILLING_CYCLE, type BillingCycle } from "@/lib/pricing-display";

export function PricingClient() {
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
    <>
      <section
        aria-labelledby="pricing-plans-heading"
        className="space-y-8 md:space-y-10"
      >
        <div className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center">
          <h2 id="pricing-plans-heading" className="sr-only">
            Subscription plans and billing options
          </h2>
          <PricingBillingToggle billing={billing} onChange={setBilling} />
          <p className="text-pretty text-sm leading-relaxed text-muted">
            Yearly is the default and shows your effective monthly rate. Monthly removes savings and billed-annually labels.
          </p>
        </div>

        <PricingPlanGrid billing={billing} currency={currency} onToggleCurrency={toggleCurrency} animated />
      </section>

      <aside
        className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-card/80 px-4 py-3 text-center text-xs leading-relaxed text-muted shadow-sm sm:px-5 sm:text-sm md:mt-12"
        aria-label="Billing and compliance information"
      >
        <p className="font-medium text-foreground">Billing &amp; compliance</p>
        <p className="mt-1">Early access is reviewed before onboarding. No instant workspace is created.</p>
        <p className="mt-1">All prices shown exclude applicable taxes.</p>
        <p className="mt-1">GST (18%) is applied for India billing (SAC code 998314).</p>
        <p className="mt-1">USD pricing is available for international billing.</p>
        <p className="mt-1">GST invoices are issued for all Indian entity payments.</p>
        <p className="mt-1">Annual plans include a pro-rated refund if cancelled within 30 days.</p>
        <p className="mt-1">Data export is available for 30 days after cancellation.</p>
        <p className="mt-2 text-muted-2">
          By requesting access, you agree to our{" "}
          <Link href="/terms" className="font-medium text-teal underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-teal underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </aside>

      <PricingFeatureComparison />

      <section className="relative mx-auto mb-20 max-w-4xl overflow-hidden rounded-2xl border border-[#EAEAEA] bg-gradient-to-b from-card to-[#FAFBFF] p-6 text-left shadow-[0_10px_35px_rgba(15,23,42,0.06)] md:p-8">
        <BackgroundComponents variant="cool" intensity="subtle" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Text variant="label-uppercase" className="mb-2">
            ROI snapshot
          </Text>
          <Text variant="heading-1" as="h2" className="text-[clamp(1.75rem,2.4vw,2.375rem)] leading-tight text-foreground">
            Where your money comes back
          </Text>

          <div className="mt-6 grid gap-3 md:gap-3.5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-card/90 px-4 py-3">
              <p className="text-sm font-medium text-foreground md:text-base">Reduce stockouts</p>
              <p className="text-sm font-semibold text-blue md:text-base">save ₹2–3L/year</p>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-card/90 px-4 py-3">
              <p className="text-sm font-medium text-foreground md:text-base">Faster lead follow-ups</p>
              <p className="text-sm font-semibold text-blue md:text-base">+20–30% conversions</p>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-card/90 px-4 py-3">
              <p className="text-sm font-medium text-foreground md:text-base">Automated reconciliation</p>
              <p className="text-sm font-semibold text-blue md:text-base">save 40+ hrs/month</p>
            </div>
          </div>

          <Text variant="body-sm" className="mt-5 text-muted">
            Most teams recover the cost within the first few months of operations.
          </Text>
          <Text variant="body-sm" className="mt-2 text-muted-2">
            Illustrative ROI estimates based on observed implementation patterns; actual outcomes vary by process maturity,
            team adoption, and baseline operational metrics.
          </Text>
        </div>
      </section>
    </>
  );
}

export default PricingClient;
