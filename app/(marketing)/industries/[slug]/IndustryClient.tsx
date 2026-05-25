"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Cpu, ListOrdered, ShieldAlert, Sparkles, Check } from "lucide-react";
import { DirectAnswerLead } from "@/components/aeo/DirectAnswerLead";
import { getIndustryBySlug } from "@/lib/industries";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { DashboardLight } from "@/components/sections/dashboard/DashboardLight";
import { OperationalFlowPreview } from "@/components/operational-proof/OperationalFlowPreview";
import { InventoryLedgerPreview } from "@/components/industry/InventoryLedgerPreview";
import { SparePartsPhase1Sections } from "@/components/industry/SparePartsPhase1Sections";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function IndustryClient({ slug }: { slug: string }) {
  const data = getIndustryBySlug(slug);
  if (!data) return null;

  const h1 = `Run your entire ${data.h1IndustryPhrase} operations on one system`;

  return (
    <article className="mx-auto max-w-4xl pb-28 lg:max-w-4xl lg:pb-10">
      <header className="mb-10 md:mb-14">
        <Text variant="label-uppercase" className="mb-4 text-muted-2">
          Industry
        </Text>
        <Text variant="display-2" as="h1" className="mb-5 text-balance text-foreground">
          {h1}
        </Text>
        <DirectAnswerLead text={data.directAnswer} />
        <Text variant="body-lg" className="prose-justify mb-8 max-w-3xl text-pretty text-muted">
          {data.heroSub}
        </Text>
        <div className="flex flex-wrap gap-3">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="min-h-[48px] w-full sm:w-auto px-5">
              Request Setup
            </Button>
          </Link>
          <Link href="/product">
            <Button variant="outline" size="lg" className="min-h-[48px] w-full sm:w-auto px-5">
              See It In Action
            </Button>
          </Link>
        </div>
      </header>

      {slug === "spare-parts-trading" ? <SparePartsPhase1Sections /> : null}

      <RevealOnScroll>
        <section className="mb-12 md:mb-16 mt-12 md:mt-16" aria-labelledby="pain-points-heading">
          <Text variant="heading-1" as="h2" id="pain-points-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Where operations break today
          </Text>
          <Text variant="body-base" className="mb-8 max-w-prose text-pretty text-muted">
            Specific failure modes for {data.name.toLowerCase()} teams, not generic “efficiency” language.
          </Text>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {data.painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 md:p-8 transition-colors group/pain hover:border-teal/35 shadow-sm"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition-colors group-hover/pain:border-teal/25 group-hover/pain:bg-teal-dim">
                  <ShieldAlert
                    size={20}
                    className="text-teal opacity-80 transition-opacity group-hover/pain:opacity-100"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="prose-justify text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <section className="mb-12 md:mb-16" aria-labelledby="workflow-mapping-heading">
        <Text variant="heading-1" as="h2" id="workflow-mapping-heading" className="mb-6 text-xl text-foreground md:text-2xl">
          How Zoveto maps to your workflows
        </Text>
        <Text variant="body-base" className="mb-8 max-w-prose text-pretty text-muted">
          {data.name} operations on the Zoveto Company Operating System stay coherent when Command Center, Operations,
          Inventory, CRM, and Finance read the same posted events, not parallel spreadsheets or siloed “ERP vs CRM vs
          WMS” stacks.
        </Text>
        <div className="grid gap-6 md:grid-cols-2">
          {data.modulePlaybooks.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col gap-4 shadow-sm">
              <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
              <p className="prose-justify flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
              <Link
                href={p.href}
                className="text-sm font-semibold text-teal underline-offset-4 hover:text-foreground hover:underline mt-2"
              >
                Explore {p.title.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 md:mb-16" aria-labelledby="real-workflow-heading">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface shadow-sm">
            <ListOrdered size={20} className="text-blue" />
          </div>
          <div>
            <Text variant="heading-1" as="h2" id="real-workflow-heading" className="mb-2 text-xl text-foreground md:text-2xl">
              Real system workflow
            </Text>
            <Text variant="body-base" className="max-w-prose text-pretty text-muted">
              One chain from commercial demand to posted dispatch and finance, executed inside Zoveto without retyping
              the same facts into a second “system of record.”
            </Text>
          </div>
        </div>
        <ol className="space-y-4">
          {data.systemFlowSteps.map((step, idx) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col sm:flex-row gap-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-light text-sm font-bold text-blue border border-blue/10">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="prose-justify mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12 md:mb-16" aria-labelledby="inside-product-heading">
        <div className="mb-8 max-w-2xl space-y-4">
          <Text variant="label-uppercase" className="text-muted-2">Inside the product</Text>
          <Text variant="heading-1" as="h2" id="inside-product-heading" className="text-xl text-foreground md:text-2xl">
            Command surface, execution flow, and stock structure
          </Text>
          <Text variant="body-base" className="text-pretty text-muted">
            Representative UI from the same product surface your teams would run day to day, not decorative mockups.
          </Text>
        </div>
        <div className="grid gap-6 lg:grid-cols-3 md:gap-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Dashboard</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-[#f5f5f7] shadow-[var(--shadow-card)]">
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
      </section>

      <section className="mb-12 md:mb-16" aria-labelledby="legacy-vs-zoveto-heading">
        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 border-b border-border bg-teal-dim/30 p-6 md:p-8">
            <Cpu size={20} className="text-teal" />
            <Text variant="heading-1" as="h2" id="legacy-vs-zoveto-heading" className="text-lg text-foreground md:text-xl">
              Legacy vs Zoveto by stage
            </Text>
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
      </section>

      <section className="mb-12 md:mb-16" aria-labelledby="outcomes-heading">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <Text variant="heading-1" as="h2" id="outcomes-heading" className="text-xl text-foreground md:text-2xl">
              Outcomes you can stand behind
            </Text>
            <Text variant="body-base" className="text-pretty text-muted">
              We do not quote fabricated percentages or rupee savings. Below is the qualitative impact shape teams
              target when execution is posted in one system.
            </Text>
            <ul className="space-y-4">
              {data.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-teal/25 bg-teal-dim/25 p-6 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-teal">
              <Sparkles size={18} />
              <span className="text-xs font-semibold uppercase tracking-wide">Proof of system</span>
            </div>
            <Text variant="heading-1" as="h3" className="text-lg text-foreground md:text-xl">
              Not a concept. A working system.
            </Text>
            <ul className="space-y-3 list-disc pl-5 text-sm leading-relaxed text-muted marker:text-teal">
              {data.proofPoints.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-foreground pt-4 border-t border-teal/20">
              Modular ERP + WMS + CRM, deployed as one operating architecture, not a slide deck.
            </p>
          </div>
        </div>
      </section>

      {slug !== "spare-parts-trading" ? (
        <section className="mb-12 md:mb-16" aria-labelledby="industry-faq-heading">
          <Text variant="heading-1" as="h2" id="industry-faq-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Industry FAQs
          </Text>
          <FaqAccordion items={data.faqs} idPrefix={`industry-${slug}`} />
        </section>
      ) : null}

      <section className="rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 md:p-10" aria-labelledby="cta-heading">
        <Text variant="heading-1" as="h2" id="cta-heading" className="mb-4 text-xl text-foreground md:text-2xl">
          Get your operations set up on Zoveto
        </Text>
        <Text variant="body-base" className="prose-justify mb-6 max-w-2xl text-pretty text-muted">
          We onboard every business manually, configuration, data cutover, and training are part of the rollout, not
          an afterthought.
        </Text>
        <div className="flex flex-wrap gap-3">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="min-h-[48px] px-8">
              Request Setup
            </Button>
          </Link>
          <Link href="/product">
            <Button variant="outline" size="lg" className="min-h-[48px] px-8">
              See It In Action
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
