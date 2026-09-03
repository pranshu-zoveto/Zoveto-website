"use client";

import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { IconCard } from "@/components/ui/IconCard";

const PAIN_PROOF_CARDS = [
  {
    quote: "I still have to check everything myself.",
    proof: "89% fewer approval escalations",
  },
  {
    quote: "We spend more time collecting data than using it.",
    proof: "Export-ready reports in 2 clicks",
  },
  {
    quote: "We know the process is broken. Nobody has time to fix it.",
    proof: "94% fewer dispatch errors",
  },
];

const PROOF_STRIP_METRICS = [
  { value: "92%", label: "Revenue signals visible in real time" },
  { value: "-4 hrs", label: "Saved per manager per week" },
  { value: "Day 1", label: "Teams stopped using Excel manually" },
];

export function HeardThisBeforeSection() {
  return (
    <section className="bg-transparent py-section-mobile md:py-section">
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">WE&apos;VE HEARD THIS BEFORE</p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Every founder we talk to says this
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted md:text-lg">
            These are real conversations before businesses switch to Zoveto.
          </p>
        </div>

        <RevealOnScroll>
          <ul className="reveal-item" role="list">
            {PAIN_PROOF_CARDS.map((item, i) => (
              <IconCard
                key={item.quote}
                divided={i > 0}
                className="md:items-baseline"
                label={item.quote}
                labelClassName="text-xl font-medium leading-snug md:text-2xl"
                aside={<p className="font-mono-geist text-sm font-semibold text-blue">{item.proof}</p>}
              />
            ))}
          </ul>

          <div className="reveal-item mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {PROOF_STRIP_METRICS.map((metric) => (
              <div key={metric.value}>
                <p className="font-mono-geist text-lg font-semibold tabular-nums text-blue">{metric.value}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default HeardThisBeforeSection;
