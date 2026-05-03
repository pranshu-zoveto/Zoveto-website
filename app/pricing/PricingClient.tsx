"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Factory, Scale } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { PricingBillingToggle } from "@/components/pricing/PricingBillingToggle";
import { PricingFeatureComparison } from "@/components/pricing/PricingFeatureComparison";
import { PricingPlanGrid } from "@/components/pricing/PricingPlanGrid";
import BackgroundComponents from "@/components/ui/background-components";
import { DEFAULT_BILLING_CYCLE, type BillingCycle } from "@/lib/pricing-display";
import { getPublicIndustries } from "@/lib/industries";
import { cn } from "@/lib/utils";

const linkRowFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/45 focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const COMPARE_LINKS = [
  { href: "/compare", label: "All comparisons" },
  { href: "/compare/zoho-vs-zoveto", label: "Zoho vs Zoveto" },
  { href: "/compare/tally-vs-zoveto", label: "Tally vs Zoveto" },
  { href: "/compare/odoo-vs-zoveto", label: "Odoo vs Zoveto" },
] as const;

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

      <div className="mx-auto mb-12 grid max-w-5xl gap-4 sm:gap-5 md:mb-14 md:grid-cols-2 md:gap-6">
        <section
          aria-labelledby="pricing-industry-fit-heading"
          className="float-card flex flex-col rounded-2xl border border-border/90 bg-card p-5 shadow-[var(--shadow-float)] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-blue-light text-blue"
              aria-hidden
            >
              <Factory className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">Explore</p>
              <h2 id="pricing-industry-fit-heading" className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
                Industry fit
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
            Pricing is shaped after we understand your workflow. Pick the vertical closest to how you operate — we map
            modules and rollout from there.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-1.5" role="list">
            {getPublicIndustries().map((ind) => {
              const Icon = ind.icon;
              return (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className={cn(
                      "group flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface-2/40 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors",
                      "hover:border-blue/25 hover:bg-blue-light/60 active:bg-surface-2",
                      linkRowFocus,
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card text-blue">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="truncate">{ind.name}</span>
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="pricing-compare-heading"
          className="float-card flex flex-col rounded-2xl border border-border/90 bg-card p-5 shadow-[var(--shadow-float)] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-blue-light text-blue"
              aria-hidden
            >
              <Scale className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">Evaluate</p>
              <h2 id="pricing-compare-heading" className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
                Compare platforms
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
            Evaluating Zoho, Tally, or Odoo? Read workflow-level comparisons, then book a demo or request access when
            you are ready.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-1.5" role="list">
            {COMPARE_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface-2/40 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors",
                    "hover:border-blue/25 hover:bg-blue-light/60 active:bg-surface-2",
                    linkRowFocus,
                  )}
                >
                  <span className="min-w-0 truncate">{label}</span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

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
