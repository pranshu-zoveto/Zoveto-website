"use client";

import React from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { X, Check } from "lucide-react";
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
    <section className="relative overflow-hidden bg-transparent py-20 md:py-28 lg:py-32">
      <div className="container relative z-10 mx-auto grid max-w-content items-start gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20">
        <div className="space-y-6 lg:col-span-5">
          <Text variant="label-uppercase" className="text-muted-2">
            The gap
          </Text>
          <Text variant="display-2" as="h2" className="text-foreground">
            Excel is your assistant. Zoveto is your assistant&apos;s{" "}
            <span className="text-blue">operating system.</span>
          </Text>
          <Text variant="body-lg" className="text-muted">
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
          <div className="reveal-item space-y-0">
            <div className="mb-2 grid grid-cols-2 gap-px">
              <div className="p-6 pb-3 text-center">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-2">Legacy friction</div>
                <div className="text-base font-semibold italic text-muted">The old way</div>
              </div>
              <div className="rounded-t-[var(--float-radius)] border border-b-0 border-border bg-blue-light/80 p-6 pb-3 text-center">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue">The Zoveto standard</div>
                <div className="text-base font-semibold text-foreground">The new way</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-[var(--float-radius)] border border-border bg-border">
              <div className="space-y-8 bg-card p-6 md:space-y-10 md:p-8">
                {COMPARISON.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 rounded-full border border-border bg-surface p-1">
                      <X size={12} className="text-red/70" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-2">{item.feature}</div>
                      <div className="text-sm font-medium leading-snug text-muted">{item.old}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative bg-blue-light/40 p-6 md:p-8">
                <div className="relative z-10 space-y-8 md:space-y-10">
                  {COMPARISON.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 rounded-full border border-blue/20 bg-card p-1">
                        <Check size={12} className="text-blue" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="text-xs font-semibold uppercase tracking-wide text-blue">{item.feature}</div>
                        <div className="text-sm font-semibold leading-snug text-foreground">{item.zoveto}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-px">
              <div className="p-6 text-center text-xs font-medium uppercase tracking-wide text-muted-2">
                Missing 30% operational data
              </div>
              <div className="float-card reveal-item rounded-[var(--float-radius)] p-6 text-center text-xs font-semibold uppercase tracking-wide text-teal">
                Zero revenue leakage architecture
              </div>
            </div>
            <p className="mt-3 px-1 text-center text-xs text-muted-2">
              Comparative percentages reflect anonymized implementation observations and vary by workflow maturity.
            </p>
            <p className="mt-4 px-1 text-center text-xs text-muted">
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
