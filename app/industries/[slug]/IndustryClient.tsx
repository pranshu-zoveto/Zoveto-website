"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MetricCard } from "@/components/ui/MetricCard";
import { ShieldAlert, Cpu, TrendingUp } from "lucide-react";
import { industries } from "@/lib/industries";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { bandIndexForSection } from "@/lib/marketing-bands";

export function IndustryClient({ slug }: { slug: string }) {
  const data = industries.find((i) => i.slug === slug) || industries[0];

  return (
    <div className="relative z-10 space-y-0">
      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <div className="max-w-2xl pb-8 text-2xl font-bold leading-tight tracking-tight text-foreground md:pb-10 md:text-4xl">
          {data.headline}
        </div>

        <RevealOnScroll>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {data.painPoints.map((p) => (
              <article
                key={p.title}
                className="float-card reveal-item space-y-4 p-8 transition-colors group/pain hover:border-teal/35 md:p-10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition-colors group-hover/pain:border-teal/25 group-hover/pain:bg-teal-dim">
                  <ShieldAlert
                    size={20}
                    className="text-teal opacity-80 transition-opacity group-hover/pain:opacity-100"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground">{p.title}</div>
                  <div className="text-sm leading-relaxed text-muted">{p.description}</div>
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
        <div className="float-card overflow-hidden pt-6 md:pt-8">
          <div className="flex items-center gap-3 border-b border-border bg-teal-dim/30 p-6 md:p-8">
            <Cpu size={18} className="text-teal" />
            <SectionLabel className="mb-0 border-none bg-transparent p-0">Transformation workflow</SectionLabel>
          </div>
          <div className="divide-y divide-border">
            {data.workflow.map((stage, i) => (
              <div key={stage.stage} className="group/row grid items-stretch gap-0 bg-background lg:grid-cols-12">
                <div className="border-b border-border bg-card p-6 md:p-8 lg:col-span-3 lg:border-b-0 lg:border-r">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal">Stage {i + 1}</div>
                  <div className="text-sm font-semibold text-foreground">{stage.stage}</div>
                </div>
                <div className="border-b border-border bg-surface/50 p-6 md:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-2">Legacy</div>
                  <div className="text-sm italic text-muted">{stage.before}</div>
                </div>
                <div className="bg-teal-dim/20 p-6 transition-colors group-hover/row:bg-teal-dim/35 md:p-8 lg:col-span-5">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">With Zoveto</div>
                  <div className="text-sm font-medium text-foreground">{stage.after}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <div className="grid gap-8 pt-6 md:pt-8 lg:grid-cols-12">
          <div className="float-card space-y-8 p-10 md:col-span-7 md:p-12">
            <SectionLabel className="mb-0 border-none bg-transparent p-0 text-muted-2">System synergies</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {data.relevantModules.map((m) => (
                <div
                  key={m}
                  className="cursor-default rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-teal/35 hover:text-foreground"
                >
                  {m} module
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 rounded-[var(--float-radius)] border border-teal/20 bg-teal-dim/40 p-10 md:col-span-5 md:p-12">
            <SectionLabel className="mb-0 border-none bg-transparent p-0 text-teal">Vertical ROI</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              {data.metrics.map((m) => (
                <MetricCard key={m.label} label={m.label} value={m.value} icon={TrendingUp} />
              ))}
            </div>
          </div>
        </div>
      </FluidMarketingSection>
    </div>
  );
}
