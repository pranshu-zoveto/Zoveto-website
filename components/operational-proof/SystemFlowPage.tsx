"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, CircleDot, GitBranch, Layers, RadioTower, Route, ShieldCheck } from "lucide-react";
import type { OperationalProof } from "@/types";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { bandIndexForSection } from "@/lib/marketing-bands";

const easeOut = [0.22, 1, 0.36, 1] as const;

const proofAccent: Record<string, { eyebrow: string; commandLabel: string; signal: string }> = {
  "inventory-chaos": {
    eyebrow: "Inventory operating proof",
    commandLabel: "Warehouse execution room",
    signal: "Stock variance contained",
  },
  "manual-orders": {
    eyebrow: "Order operating proof",
    commandLabel: "Order flow control",
    signal: "Dispatch-ready pipeline",
  },
  "excel-tally-unified": {
    eyebrow: "Finance + ERP operating proof",
    commandLabel: "Unified operating system",
    signal: "Single dashboard truth",
  },
};

function FlowRail({
  title,
  description,
  steps,
  mode,
}: {
  title: string;
  description: string;
  steps: OperationalProof["currentRealitySteps"];
  mode: "current" | "redesign";
}) {
  return (
    <section
      className={
        mode === "current"
          ? "rounded-[1.5rem] border border-border bg-surface-2 p-6 md:p-8"
          : "rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_14px_50px_rgba(15,23,42,0.08)] md:p-8"
      }
      aria-labelledby={`${mode}-flow-heading`}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 id={`${mode}-flow-heading`} className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-6 text-muted">{description}</p>
        </div>
        <span
          className={
            mode === "current"
              ? "hidden rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-muted sm:inline-flex"
              : "hidden rounded-full border border-blue/15 bg-blue-light px-3 py-1 text-[11px] font-semibold text-blue sm:inline-flex"
          }
        >
          {mode === "current" ? "Fragmented" : "Controlled"}
        </span>
      </div>

      <ol className="mt-7 grid gap-3">
        {steps.map((s, i) => (
          <li
            key={s.label}
            className={
              mode === "current"
                ? "grid gap-3 rounded-2xl border border-dashed border-border bg-white/70 p-4 sm:grid-cols-[2.5rem_minmax(0,1fr)]"
                : "grid gap-3 rounded-2xl border border-border bg-surface-2 p-4 sm:grid-cols-[2.5rem_minmax(0,1fr)]"
            }
          >
            <span
              className={
                mode === "current"
                  ? "flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-sm font-semibold text-muted"
                  : "flex h-10 w-10 items-center justify-center rounded-xl border border-blue/15 bg-blue-light text-sm font-semibold text-blue"
              }
            >
              {i + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">{s.label}</span>
              {s.detail ? <span className="mt-1 block text-sm leading-6 text-muted">{s.detail}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SystemFlowPage({ proof }: { proof: OperationalProof }) {
  const reduceMotion = useReducedMotion();
  const contactHref = `/contact?intent=operational-proof&slug=${encodeURIComponent(proof.slug)}`;
  const accent = proofAccent[proof.slug] ?? {
    eyebrow: "Operating pattern",
    commandLabel: "System flow control",
    signal: "Execution redesigned",
  };

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  return (
    <div className="space-y-0 pb-20 md:pb-24">
      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <motion.header
          className="grid gap-8 pb-8 md:pb-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div className="flex flex-col justify-center" variants={reveal}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">{accent.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-foreground md:text-5xl md:leading-[1.04]">
              {proof.title}
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted md:text-lg">{proof.problemSummary}</p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
            variants={reveal}
          >
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-white">
                  <Route size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{accent.commandLabel}</div>
                  <div className="text-[11px] font-medium text-muted-2">Pattern-led, no client names</div>
                </div>
              </div>
              <span className="rounded-full border border-blue/15 bg-blue-light px-3 py-1 text-[11px] font-semibold text-blue">
                {proof.industryTag}
              </span>
            </div>

            <div className="grid gap-px bg-border sm:grid-cols-2">
              <div className="bg-card p-5">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-2">
                  <CircleDot size={13} />
                  Before
                </div>
                <ul className="space-y-2">
                  {proof.before.map((item) => (
                    <li key={item} className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm font-medium text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-5">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-2">
                  <CheckCircle2 size={13} className="text-blue" />
                  After
                </div>
                <ul className="space-y-2">
                  {proof.after.map((item) => (
                    <li key={item} className="rounded-xl border border-blue/15 bg-blue-light px-3 py-2 text-sm font-semibold text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue">
                <RadioTower size={14} />
                {accent.signal}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                The page shows a repeatable operating pattern, not a vanity case study. Every claim is framed as a
                workflow change with measurable control.
              </p>
            </div>
          </motion.div>
        </motion.header>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
        <div className="grid gap-6 pt-6 md:pt-8 lg:grid-cols-2">
          <FlowRail
            title="Current reality"
            description="How work moves before system discipline: fragmented handoffs, weak ownership, delayed truth."
            steps={proof.currentRealitySteps}
            mode="current"
          />
          <FlowRail
            title="System redesign"
            description="The same business flow rebuilt with validation, source records, and visible accountability."
            steps={proof.redesignSteps}
            mode="redesign"
          />
        </div>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <section className="pt-6 md:pt-8" aria-labelledby="inside-heading">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[1.5rem] border border-border bg-foreground p-7 text-white md:p-9">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/62">
                <Layers size={15} />
                Inside Zoveto
              </div>
              <h2 id="inside-heading" className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">
                Modules carry the pattern end-to-end.
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/70">
                A pattern is useful only when every handoff is owned by a system, not another status meeting.
              </p>
            </div>

            <ul className="grid gap-3 md:grid-cols-2">
              {proof.insideZoveto.map((row) => (
                <li key={`${row.module}-${row.note}`} className="rounded-[1.25rem] border border-border bg-card p-5 shadow-[0_12px_44px_rgba(15,23,42,0.06)]">
                  <span className="inline-flex rounded-full border border-blue/15 bg-blue-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue">
                    {row.module}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-muted">{row.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(3)} overlapTop stackBase>
        <section className="pt-6 md:pt-8" aria-labelledby="impact-heading">
          <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-10">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-2">Measured impact</p>
                <h2 id="impact-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">
                  What changes after the flow is controlled.
                </h2>
              </div>
              <ShieldCheck className="hidden text-blue sm:block" size={28} />
            </div>

            <ul className="grid gap-3 md:grid-cols-2">
              {proof.impactMetrics.map((row) => (
                <li key={row.metric} className="rounded-2xl border border-border bg-surface-2 p-5">
                  <p className="text-xl font-semibold tracking-[-0.03em] text-foreground">{row.metric}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{row.context}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(4)} overlapTop stackBase>
        <section className="pt-6 md:pt-8">
          <div className="rounded-[1.75rem] border border-border bg-blue-light p-7 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                  <GitBranch size={14} />
                  Apply this flow
                </div>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">
                  See where this operating pattern fits your business.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[360px]">
                <Link
                  href={contactHref}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border border-border bg-white px-6 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-blue/30"
                >
                  See this in your business
                </Link>
                <Link
                  href="/contact#demo"
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,113,227,0.25)] transition-colors hover:bg-blue-hover"
                >
                  Book demo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FluidMarketingSection>
    </div>
  );
}
