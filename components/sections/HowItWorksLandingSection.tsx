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
          <SectionLabel className="mb-6 border-blue/20 bg-blue-dim text-blue">How it works</SectionLabel>
          <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
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
                className="float-card reveal-item relative flex flex-col p-8"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-blue-light text-blue">
                    <step.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-2">Step {i + 1}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{step.body}</p>
                <p className="border-t border-border pt-4 text-xs font-semibold text-blue">{step.outcome}</p>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default HowItWorksLandingSection;
