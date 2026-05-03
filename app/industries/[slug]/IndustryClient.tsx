"use client";

import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Cpu, ListOrdered, ShieldAlert, Sparkles } from "lucide-react";
import { DirectAnswerLead } from "@/components/aeo/DirectAnswerLead";
import { getIndustryBySlug } from "@/lib/industries";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { bandIndexForSection } from "@/lib/marketing-bands";
import { DashboardLight } from "@/components/sections/dashboard/DashboardLight";
import { OperationalFlowPreview } from "@/components/operational-proof/OperationalFlowPreview";
import { InventoryLedgerPreview } from "@/components/industry/InventoryLedgerPreview";
import { SparePartsPhase1Sections } from "@/components/industry/SparePartsPhase1Sections";

export function IndustryClient({ slug }: { slug: string }) {
  const data = getIndustryBySlug(slug);
  if (!data) return null;

  const h1 = `Run your entire ${data.h1IndustryPhrase} operations on one system`;

  return (
    <div className="relative z-10 space-y-0 pb-24 md:pb-32">
      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <div className="max-w-3xl space-y-6 pb-10 md:pb-14">
          <Text variant="label-uppercase" className="text-blue">
            Industry
          </Text>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
            {h1}
          </h1>
          <DirectAnswerLead text={data.directAnswer} />
          <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">{data.heroSub}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Link href="/signup">
              <Button variant="primary" size="lg" className="min-h-[48px] w-full sm:w-auto">
                Request Setup
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" size="lg" className="min-h-[48px] w-full sm:w-auto">
                See It In Action
              </Button>
            </Link>
          </div>
        </div>

        {slug === "spare-parts-trading" ? <SparePartsPhase1Sections /> : null}

        <RevealOnScroll>
          <div className="mb-4 max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              Where operations break today
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Specific failure modes for {data.name.toLowerCase()} teams—not generic “efficiency” language.
            </p>
          </div>
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
                  <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
        <div className="space-y-6 pb-6 md:pb-10">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How Zoveto maps to your workflows
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-muted md:text-base">
            {data.name} operations on the Zoveto Company Operating System stay coherent when Command Center, Operations,
            Inventory, CRM, and Finance read the same posted events—not parallel spreadsheets or siloed “ERP vs CRM vs
            WMS” stacks.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.modulePlaybooks.map((p) => (
            <article key={p.id} className="float-card flex flex-col gap-4 p-8 md:p-9">
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
              <Link
                href={p.href}
                className="text-sm font-semibold text-teal underline-offset-4 hover:text-foreground hover:underline"
              >
                Explore {p.title.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <div className="mb-8 flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
            <ListOrdered size={18} className="text-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Real system workflow
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted md:text-base">
              One chain from commercial demand to posted dispatch and finance—executed inside Zoveto without retyping
              the same facts into a second “system of record.”
            </p>
          </div>
        </div>
        <ol className="space-y-5">
          {data.systemFlowSteps.map((step, idx) => (
            <li key={step.title} className="float-card flex gap-5 p-6 md:p-8">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-light text-sm font-bold text-blue">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(0)} overlapTop stackBase>
        <div className="mb-8 max-w-2xl space-y-2">
          <SectionLabel className="mb-0 border-none bg-transparent p-0 text-muted-2">Inside the product</SectionLabel>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Command surface, execution flow, and stock structure
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Representative UI from the same product surface your teams would run day to day—not decorative mockups.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Dashboard</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-[#f5f5f7] shadow-[var(--shadow-elevated)]">
              <div className="max-h-[min(420px,55vh)] overflow-auto">
                <div className="min-h-[360px] min-w-[520px] scale-[0.72] origin-top-left md:min-h-[400px] md:min-w-[720px] md:scale-[0.78]">
                  <DashboardLight />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Operations</p>
            <OperationalFlowPreview />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Inventory</p>
            <InventoryLedgerPreview />
          </div>
        </div>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
        <div className="float-card overflow-hidden pt-6 md:pt-8">
          <div className="flex items-center gap-3 border-b border-border bg-teal-dim/30 p-6 md:p-8">
            <Cpu size={18} className="text-teal" />
            <SectionLabel className="mb-0 border-none bg-transparent p-0">Legacy vs Zoveto by stage</SectionLabel>
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
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Outcomes you can stand behind</h2>
            <p className="text-sm leading-relaxed text-muted">
              We do not quote fabricated percentages or rupee savings. Below is the qualitative impact shape teams
              target when execution is posted in one system.
            </p>
            <ul className="space-y-3">
              {data.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="float-card space-y-5 p-8 md:p-10">
            <div className="flex items-center gap-2 text-teal">
              <Sparkles size={18} />
              <span className="text-xs font-semibold uppercase tracking-wide">Proof of system</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">Not a concept. A working system.</h2>
            <ul className="space-y-4">
              {data.proofPoints.map((line) => (
                <li key={line} className="text-sm leading-relaxed text-muted">
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-foreground">
              Modular ERP + WMS + CRM, deployed as one operating architecture—not a slide deck.
            </p>
          </div>
        </div>
      </FluidMarketingSection>

      {slug !== "spare-parts-trading" ? (
        <FluidMarketingSection band={bandIndexForSection(0)} overlapTop stackBase>
          <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-border bg-card px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">Industry FAQs</h2>
            <dl className="space-y-6 text-left">
              {data.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-foreground">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FluidMarketingSection>
      ) : null}

      <FluidMarketingSection band={bandIndexForSection(0)} overlapTop stackBase>
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card px-8 py-12 text-center md:px-12 md:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Get your operations set up on Zoveto
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            We onboard every business manually—configuration, data cutover, and training are part of the rollout, not
            an afterthought.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup">
              <Button variant="primary" size="lg" className="min-h-[48px] px-10">
                Request Setup
              </Button>
            </Link>
          </div>
        </div>
      </FluidMarketingSection>
    </div>
  );
}
