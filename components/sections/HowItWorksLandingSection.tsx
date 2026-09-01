"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Layers, LineChart, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Layers,
    title: "Connect your business in one workspace",
    body: "Sign up, invite the team, load inventory, sales, and finance into one workspace. Stop chasing numbers across sheets and chats.",
    outcome: "One dashboard. One version of the truth.",
  },
  {
    icon: LineChart,
    title: "Run daily operations on live data",
    body: "Quotes, dispatches, stock movements, and GST-ready invoices flow through the same system. Everyone sees what matters now, not last week.",
    outcome: "Fewer errors. Faster fulfilment.",
  },
  {
    icon: Sparkles,
    title: "Let AI handle the busywork",
    body: "Automations flag stalled leads, low stock, and overdue collections. You decide. The system nudges.",
    outcome: "Scale without adding chaos.",
  },
];

export function HowItWorksLandingSection() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden bg-transparent py-section-mobile md:py-section"
    >
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-14 max-w-3xl md:mb-16">
          <SectionLabel className="mb-6 hidden border-blue/20 bg-blue-dim text-blue sm:inline-block">How it works</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            From signup to <span className="text-blue">full operations</span> in three moves
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            You keep running the business. Zoveto adds control without a twelve-month science project.
          </p>
        </div>

        <RevealOnScroll>
          <ol className="divide-y divide-border border-y border-border">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className={cn(
                    "reveal-item py-8 md:py-10",
                    i === STEPS.length - 1 && "hidden sm:list-item",
                  )}
                >
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-2">
                      Step {i + 1}
                    </span>
                    <Icon className="h-5 w-5 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
                    <span>{step.title}</span>
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{step.body}</p>
                  <p className="mt-4 text-xs font-semibold text-blue">{step.outcome}</p>
                </li>
              );
            })}
          </ol>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default HowItWorksLandingSection;
