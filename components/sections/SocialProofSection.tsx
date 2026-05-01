"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { Quote, Factory, Truck, Store, Cpu } from "lucide-react";

const METRICS = [
  { label: "Companies Onboarded", val: "500+" },
  { label: "Faster Operations", val: "30%" },
  { label: "Revenue Tracked Daily", val: "$10M+" },
  { label: "Implementation Days", val: "10" },
];

const TESTIMONIALS = [
  {
    quote:
      "We had four spreadsheets, two group chats, and zero visibility. In two weeks on Zoveto I can see the whole operation from my phone.",
    name: "Alex R.",
    role: "Managing Director · Regional manufacturer",
    industry: "Manufacturing",
    initials: "AR",
    color: "bg-blue",
  },
  {
    quote: "Dispatch errors went to zero. Barcode scanning and auto-invoicing saves my team three hours every day.",
    name: "Jordan M.",
    role: "Head of Operations · Distribution",
    industry: "Distribution",
    initials: "JM",
    color: "bg-teal",
  },
  {
    quote:
      "I've tried three ERPs before. All needed six months and a consultant. Zoveto was live in ten days—I set it up myself.",
    name: "Sam T.",
    role: "Founder · Trading",
    industry: "Trading",
    initials: "ST",
    color: "bg-blue",
  },
];

const INDUSTRY_MARQUEE = [
  { label: "Manufacturing", Icon: Factory },
  { label: "Distribution", Icon: Truck },
  { label: "Retail & wholesale", Icon: Store },
  { label: "Industrial & MRO", Icon: Cpu },
] as const;

export function SocialProofSection() {
  const doubled = [...INDUSTRY_MARQUEE, ...INDUSTRY_MARQUEE, ...INDUSTRY_MARQUEE];

  return (
    <motion.section
      id="proof"
      className="relative overflow-hidden border-t border-border bg-background py-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-24 max-w-4xl">
          <SectionLabel className="mb-8 border-blue/20 bg-blue/10 text-blue">Social Proof</SectionLabel>
          <h2 className="mb-10 font-display text-6xl uppercase leading-[0.9] md:text-[5.5rem]">
            Trusted by <br />
            <span className="text-blue">operations-led teams</span>
          </h2>
          <p className="max-w-2xl text-xl font-light leading-relaxed text-muted-2">
            From plants to distribution hubs, Zoveto is the engine behind teams that outgrew inbox-and-sheet workflows.
          </p>
        </div>

        <div className="mb-32 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>

        <div className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-border bg-surface p-10">
              <div className="mb-8">
                <Quote className="h-8 w-8 scale-x-[-1] text-blue/30" />
              </div>

              <p className="mb-10 h-32 text-lg font-light italic leading-relaxed text-foreground">
                {"\u201C"}
                {t.quote}
                {"\u201D"}
              </p>

              <div className="mt-auto flex items-center gap-4 border-t border-border pt-8">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full font-display text-lg text-card",
                    t.color
                  )}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-foreground">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-2">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden border-y border-border py-12">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-70 md:gap-x-24">
            {doubled.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 font-display text-lg tracking-wide text-foreground md:text-xl"
              >
                <item.Icon className="h-6 w-6 shrink-0 text-muted-2" strokeWidth={1.25} aria-hidden />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

interface MetricItem {
  label: string;
  val: string;
}

function MetricCard({ metric }: { metric: MetricItem }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
      <div className="mb-2 font-display text-5xl tracking-wider text-foreground md:text-6xl">{metric.val}</div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-2">{metric.label}</div>
    </div>
  );
}
