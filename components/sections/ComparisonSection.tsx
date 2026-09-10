"use client";

import React from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

const COMPARISON = [
  { feature: "Records", old: "Disconnected tools and chat threads", zoveto: "One posted operating record" },
  { feature: "Visibility", old: "Delayed manual reporting", zoveto: "Current stock, cash, and order state" },
  { feature: "Tax & Compliance", old: "Post-facto manual entry", zoveto: "Ledger entries tied to source events" },
  { feature: "Scale", old: "Dependent on who remembers the process", zoveto: "Rules that survive busy days" },
  { feature: "Accountability", old: "Opaque handoffs", zoveto: "User, timestamp, status, and next action" },
];

export function ComparisonSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-section-mobile md:py-section">
      <div className="container relative z-10 mx-auto grid max-w-content items-start gap-10 px-5 sm:px-6 md:gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="space-y-6 lg:col-span-5">
          <Text variant="label-uppercase" className="text-muted-2">
            The gap
          </Text>
          <Text variant="display-2" as="h2" className="text-foreground">
            Excel is your assistant. Zoveto is your assistant&apos;s{" "}
            <span className="text-blue">operating system.</span>
          </Text>
          <Text variant="body-lg" className="prose-justify text-muted">
            Most operating leaks start between tools: quote to stock, pick to invoice, receipt to ledger. Zoveto closes
            those gaps at the record level.
          </Text>
          <Text variant="body-lg" as="p" className="text-muted">
            Your{" "}
            <AnimatedTextCycle
              words={["business", "team", "workflow", "stock", "cash", "orders", "ledger", "dispatch"]}
              interval={3000}
              className="font-semibold text-foreground"
            />{" "}
            deserves better tools.
          </Text>
        </div>

        <RevealOnScroll className="lg:col-span-7">
          <div className="reveal-item">
            <div className="flex flex-col gap-5 md:hidden">
              {COMPARISON.map((item) => (
                <div key={item.feature} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">{item.feature}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{item.old}</p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-foreground">{item.zoveto}</p>
                </div>
              ))}
            </div>

            <div className="hidden flex-col gap-6 md:flex">
              {COMPARISON.map((item) => (
                <div key={item.feature} className="grid grid-cols-2 gap-x-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">{item.feature}</p>
                    <p className="mt-1 text-sm font-medium leading-snug text-muted">{item.old}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground">{item.feature}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{item.zoveto}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
                Missing <span className="font-mono-geist font-semibold text-blue">30%</span> operational data
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
                <span className="font-mono-geist font-semibold text-blue">Zero</span> revenue leakage architecture
              </p>
            </div>
            <p className="mt-3 text-xs text-muted-2">
              Comparative percentages reflect anonymized implementation observations and vary by workflow maturity.
            </p>
            <p className="mt-4 text-xs text-muted">
              Evaluating named vendors? See{" "}
              <Link href="/compare" className="font-medium text-blue underline-offset-4 hover:underline">
                Zoveto vs Zoho, Tally, Odoo, and more
              </Link>
              .
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default ComparisonSection;
