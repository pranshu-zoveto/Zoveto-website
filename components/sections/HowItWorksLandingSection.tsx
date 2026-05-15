"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Layers, LineChart, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

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
          <h2 className="mb-5 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            From signup to <span className="text-blue">full operations</span> in three moves
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            You keep running the business. Zoveto adds control without a twelve-month science project.
          </p>
        </div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <article
                key={step.title}
                className={`float-card reveal-item relative flex flex-col p-5 sm:p-6 md:p-8${i === STEPS.length - 1 ? " hidden sm:flex" : ""}`}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-blue-light text-blue sm:h-12 sm:w-12">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-2">Step {i + 1}</span>
                </div>
                <h3 className="mb-3 min-h-[3.5rem] text-lg font-semibold tracking-tight text-foreground md:min-h-[4rem]">{step.title}</h3>
                <div className="flex flex-1 flex-col justify-between gap-6">
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                  <p className="border-t border-border pt-4 text-xs font-semibold text-blue">{step.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default HowItWorksLandingSection;
