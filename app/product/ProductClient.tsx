"use client";

import React from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { ArrowRight, Database, Activity, Share2 } from "lucide-react";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { getPublicIndustries } from "@/lib/industries";

const ARCHITECTURE_LAYERS = [
  {
    id: "layer-1",
    title: "The data foundation",
    icon: Database,
    desc: "One operating record for sales, inventory, warehouse, and finance events. Less reconciliation. Fewer arguments.",
    features: ["Shared transaction record", "Role-level audit trail", "GSTR-1 validation"],
  },
  {
    id: "layer-2",
    title: "Operational handoffs",
    icon: Share2,
    desc: "A quote can check stock, a pick list can trigger billing, and finance can see the source movement.",
    features: ["Cross-module rules", "Exception queues", "Event-driven workflows"],
  },
  {
    id: "layer-3",
    title: "Executive intelligence",
    icon: Activity,
    desc: "Owner dashboards read posted work, not exported files. Every number can be drilled back to the source action.",
    features: ["Margin movement", "Stock aging", "Cash visibility"],
  },
];

export function ProductClient() {
  const industries = getPublicIndustries();

  return (
    <RevealOnScroll>
      <div className="flex flex-col gap-14 md:gap-20">
      <div className="grid auto-rows-fr gap-8 py-20 md:grid-cols-3 md:items-stretch md:py-28">
        {ARCHITECTURE_LAYERS.map((layer) => (
          <article
            key={layer.id}
            className="float-card reveal-item group flex h-full min-h-0 flex-col gap-6 p-8 transition-shadow hover:shadow-[var(--shadow-hover)] md:gap-7 md:p-10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface transition-colors group-hover:border-blue/30">
              <layer.icon className="text-blue" size={22} />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3">
              <Text variant="heading-2" as="h3" className="text-lg text-foreground">
                {layer.title}
              </Text>
              <Text variant="body-base" className="leading-relaxed text-muted">
                {layer.desc}
              </Text>
            </div>
            <ul className="shrink-0 space-y-3 border-t border-border pt-7">
              {layer.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" /> {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section
        aria-labelledby="product-industry-heading"
        className="reveal-item float-card mx-auto w-full max-w-5xl overflow-hidden"
      >
        <div className="grid divide-y divide-border md:grid-cols-12 md:divide-x md:divide-y-0 md:items-stretch">
          <div className="flex flex-col justify-center gap-4 p-8 md:col-span-5 md:p-10 lg:p-12">
            <Text variant="label-uppercase" className="text-muted-2">
              By industry
            </Text>
            <Text
              id="product-industry-heading"
              variant="heading-2"
              as="h2"
              className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl"
            >
              Operational landings for how you actually run
            </Text>
            <Text variant="body-sm" className="max-w-prose leading-relaxed text-muted">
              Deep-dive pages for manufacturing, distribution, spare parts trading, and warehousing—same product
              record, written for each operating context.
            </Text>
          </div>

          <div className="flex flex-col bg-surface/60 p-6 sm:p-8 md:col-span-7 md:p-10">
            <p className="mb-4 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-2">Jump to a vertical</p>
            <nav
              aria-label="Industry pages"
              className="grid flex-1 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
            >
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Link
                    key={ind.slug}
                    href={`/industries/${ind.slug}`}
                    className="group flex h-full min-h-[5.5rem] flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-[border-color,box-shadow,background-color] duration-200 hover:border-teal/35 hover:shadow-[var(--shadow-hover)] sm:min-h-0 sm:flex-row sm:items-stretch sm:gap-4 sm:p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-teal/20 bg-teal-dim sm:mt-0.5">
                      <Icon className="h-5 w-5 stroke-[1.5] text-teal" aria-hidden />
                    </div>
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                      <div className="text-sm font-semibold text-foreground transition-colors group-hover:text-teal">
                        {ind.name}
                      </div>
                      <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">{ind.headline}</p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 self-end text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-teal sm:mt-0 sm:self-center"
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </section>
      </div>
    </RevealOnScroll>
  );
}
