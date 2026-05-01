"use client";

import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

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
    <section className="bg-transparent py-12 md:py-16">
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
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" role="list">
            {PAIN_PROOF_CARDS.map((item) => (
              <li key={item.quote} className="float-card reveal-item p-5 md:p-6">
                <p className="text-xl font-medium leading-snug text-foreground md:text-2xl">{item.quote}</p>
                <div className="my-4 h-px w-full bg-border" />
                <p className="text-lg font-semibold leading-snug text-blue">{item.proof}</p>
              </li>
            ))}
          </ul>

          <div className="reveal-item mt-8 overflow-hidden rounded-[var(--float-radius)] border border-border/90 bg-card/70 shadow-[var(--shadow-float)]">
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {PROOF_STRIP_METRICS.map((metric) => (
                <div key={metric.value} className="px-5 py-4 md:px-6 md:py-5">
                  <p className="text-sm leading-relaxed text-foreground md:text-base">
                    <span className="font-bold text-blue">{metric.value}</span> {"\u2014"} {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default HeardThisBeforeSection;
