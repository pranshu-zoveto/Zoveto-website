"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  RefreshCcw,
} from "lucide-react";
import { trackMarketingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type DimensionKey =
  | "pricing"
  | "approvals"
  | "knowledge"
  | "decisions"
  | "relationships"
  | "succession";

type Option = {
  label: string;
  description: string;
  value: number;
};

type Question = {
  id: string;
  dimension: DimensionKey;
  label: string;
  options: Option[];
};

type Band = {
  min: number;
  max: number;
  label: string;
  tone: string;
  summary: string;
  cta: string;
};

const DIMENSIONS: Record<
  DimensionKey,
  {
    label: string;
    weight: number;
    help: string;
    zoveto: string;
  }
> = {
  pricing: {
    label: "Pricing authority",
    weight: 20,
    help: "Can sales quote prices, give discounts, and approve normal deals without the owner?",
    zoveto: "Set pricing rules, sales playbooks, quote limits, and approval levels.",
  },
  approvals: {
    label: "Approval bottlenecks",
    weight: 20,
    help: "How many daily decisions still wait for the owner to approve?",
    zoveto: "Use approval rules, auto-routing, escalation paths, and ownership dashboards.",
  },
  knowledge: {
    label: "Institutional knowledge",
    weight: 20,
    help: "Is important process knowledge written down and easy for the team to find?",
    zoveto: "Keep SOPs, shared records, checklists, and role-based views in one place.",
  },
  decisions: {
    label: "Decision latency",
    weight: 15,
    help: "When the owner is unavailable, how long do key decisions get delayed?",
    zoveto: "Use live dashboards, alerts, target tracking, and clear decision triggers.",
  },
  relationships: {
    label: "Customer and vendor concentration",
    weight: 15,
    help: "Do key customers and suppliers still depend mainly on direct access to the owner?",
    zoveto: "Track CRM history, vendor records, handoff notes, ownership, and communication logs.",
  },
  succession: {
    label: "Succession readiness",
    weight: 10,
    help: "Can a manager run daily operations without needing the owner to explain everything?",
    zoveto: "Build second-line leadership workflows, onboarding paths, SOPs, and scorecards.",
  },
};

const INDEPENDENCE_OPTIONS: Option[] = [
  { label: "Fully independent", description: "The team handles this well with a clear system.", value: 100 },
  { label: "Mostly independent", description: "The team handles most cases. Only unusual issues come to you.", value: 75 },
  { label: "Partly dependent", description: "The team can start, but often checks with you before moving.", value: 50 },
  { label: "Highly dependent", description: "The team waits for you in most important cases.", value: 25 },
  { label: "Owner controlled", description: "This cannot move unless you decide or explain it.", value: 0 },
];

const QUESTIONS: Question[] = [
  {
    id: "pricing_quote",
    dimension: "pricing",
    label: "Can your sales team quote standard prices without checking with you?",
    options: INDEPENDENCE_OPTIONS,
  },
  {
    id: "pricing_discount",
    dimension: "pricing",
    label: "Can your team handle discounts, credit terms, and exceptions using clear rules?",
    options: INDEPENDENCE_OPTIONS,
  },
  {
    id: "approval_count",
    dimension: "approvals",
    label: "How often does the team need your approval before work can move forward?",
    options: [
      { label: "Rarely", description: "Only real exceptions come to me.", value: 100 },
      { label: "A few times a week", description: "Most daily work moves without me.", value: 75 },
      { label: "Almost every day", description: "A few decisions still wait for me each day.", value: 50 },
      { label: "Many times a day", description: "The team often pauses for my approval.", value: 25 },
      { label: "At most critical steps", description: "Work cannot move without me.", value: 0 },
    ],
  },
  {
    id: "approval_escalations",
    dimension: "approvals",
    label: "Can someone else handle escalations without coming to you?",
    options: INDEPENDENCE_OPTIONS,
  },
  {
    id: "knowledge_week",
    dimension: "knowledge",
    label: "If you were away for a week, could the team run day-to-day operations without you?",
    options: [
      { label: "Yes, fully", description: "Daily work is documented and the team can follow it.", value: 100 },
      { label: "Mostly yes", description: "Only rare edge cases would wait for me.", value: 75 },
      { label: "Partly", description: "Core work continues, but some teams would slow down.", value: 50 },
      { label: "Not really", description: "Several important workflows would pause or get stuck.", value: 25 },
      { label: "No", description: "The business would need me every day to stay on track.", value: 0 },
    ],
  },
  {
    id: "knowledge_processes",
    dimension: "knowledge",
    label: "Are your main processes written down in a way your team actually uses?",
    options: [
      { label: "Written and used", description: "Processes are up to date, easy to find, and followed.", value: 100 },
      { label: "Mostly written", description: "Key workflows exist, but a few gaps remain.", value: 75 },
      { label: "Partly written", description: "Some notes exist, but people still ask for context.", value: 50 },
      { label: "Mostly verbal", description: "The team relies on memory, messages, or my explanation.", value: 25 },
      { label: "Not written", description: "Most process knowledge is still in my head.", value: 0 },
    ],
  },
  {
    id: "decision_delay",
    dimension: "decisions",
    label: "When you are away, how long do important decisions wait?",
    options: [
      { label: "No delay", description: "The team has the data and authority to decide.", value: 100 },
      { label: "Same day", description: "Small delay, but decisions still close quickly.", value: 75 },
      { label: "1 to 2 days", description: "Some decisions wait for my review.", value: 50 },
      { label: "3 to 5 days", description: "Work often stalls while people wait.", value: 25 },
      { label: "More than a week", description: "Major decisions do not move without me.", value: 0 },
    ],
  },
  {
    id: "decision_targets",
    dimension: "decisions",
    label: "When targets are missed, does your team know what to do next?",
    options: INDEPENDENCE_OPTIONS,
  },
  {
    id: "relationship_owner",
    dimension: "relationships",
    label: "How much of your key customer or vendor work still goes through you personally?",
    options: [
      { label: "Under 10%", description: "The team owns relationships and records are in the system.", value: 100 },
      { label: "10% to 25%", description: "Some major accounts still prefer me.", value: 75 },
      { label: "26% to 50%", description: "Many important relationships still go through me.", value: 50 },
      { label: "51% to 75%", description: "Most critical relationships depend on me.", value: 25 },
      { label: "Over 75%", description: "Most key relationships are owner-led.", value: 0 },
    ],
  },
  {
    id: "relationship_history",
    dimension: "relationships",
    label: "Can your team see customer and vendor history without asking you?",
    options: INDEPENDENCE_OPTIONS,
  },
  {
    id: "succession_onboarding",
    dimension: "succession",
    label: "Can a manager onboard a new hire without needing you?",
    options: INDEPENDENCE_OPTIONS,
  },
  {
    id: "succession_month",
    dimension: "succession",
    label: "Could the business run for a month without you getting involved every day?",
    options: [
      { label: "Yes", description: "Managers, systems, and reviews can run without daily input from me.", value: 100 },
      { label: "Mostly", description: "The team can run with a weekly check-in from me.", value: 75 },
      { label: "Partly", description: "Routine work continues, but key decisions wait for me.", value: 50 },
      { label: "Unlikely", description: "Operations would slow down quickly.", value: 25 },
      { label: "No", description: "I need to be involved every day.", value: 0 },
    ],
  },
];

const BANDS: Band[] = [
  {
    min: 0,
    max: 40,
    label: "Critical dependency",
    tone: "text-red",
    summary:
      "The business still runs mainly through the owner. Growth will keep creating bottlenecks until decision rights, SOPs, and live visibility are set up.",
    cta: "Start with approval routing, core SOPs, and dashboards that work without owner input.",
  },
  {
    min: 41,
    max: 60,
    label: "High dependency",
    tone: "text-orange-700",
    summary:
      "The team can execute some work, but major decisions, customer context, pricing, and escalations still need the owner.",
    cta: "Build a 90-day owner-independence plan around the weakest areas.",
  },
  {
    min: 61,
    max: 75,
    label: "Moderate dependency",
    tone: "text-amber-700",
    summary:
      "The business has structure, but some key workflows still depend on memory, manual follow-ups, or owner judgment.",
    cta: "Turn repeated owner decisions into rules, dashboards, and team ownership.",
  },
  {
    min: 76,
    max: 90,
    label: "Low dependency",
    tone: "text-blue",
    summary:
      "Most operations can run without daily owner involvement. Next, tighten measurement and remove remaining exception bottlenecks.",
    cta: "Use Zoveto to unify reporting, alerts, and accountability across teams.",
  },
  {
    min: 91,
    max: 100,
    label: "Independent operating system",
    tone: "text-green",
    summary:
      "The business has strong operating independence. The owner can focus on strategy while daily work stays visible and accountable.",
    cta: "Keep improving with leadership dashboards, automation, and quarterly re-scoring.",
  },
];

const bandBg = [
  "bg-red/10 text-red",
  "bg-orange-50 text-orange-700",
  "bg-amber-50 text-amber-700",
  "bg-blue-light text-blue",
  "bg-green/10 text-green",
];

const emptyAnswers = Object.fromEntries(QUESTIONS.map((q) => [q.id, undefined])) as Record<string, number | undefined>;

function getBand(score: number): Band {
  return BANDS.find((band) => score >= band.min && score <= band.max) ?? BANDS[0];
}

function scoreTone(score: number): string {
  if (score <= 40) return "text-red";
  if (score <= 60) return "text-orange-700";
  if (score <= 75) return "text-amber-700";
  if (score <= 90) return "text-blue";
  return "text-green";
}

export function OwnerDependencyScoreClient() {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>(emptyAnswers);
  const [showResult, setShowResult] = useState(false);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [hasTrackedUse, setHasTrackedUse] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const result = useMemo(() => {
    const answered = Object.values(answers).filter((value): value is number => typeof value === "number").length;
    const dimensionScores = (Object.keys(DIMENSIONS) as DimensionKey[]).map((key) => {
      const questions = QUESTIONS.filter((q) => q.dimension === key);
      const values = questions
        .map((q) => answers[q.id])
        .filter((value): value is number => typeof value === "number");
      const score = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
      return {
        key,
        label: DIMENSIONS[key].label,
        weight: DIMENSIONS[key].weight,
        score,
        weighted: (score * DIMENSIONS[key].weight) / 100,
        complete: values.length === questions.length,
      };
    });
    const score = Math.round(dimensionScores.reduce((sum, item) => sum + item.weighted, 0));
    const weakest = [...dimensionScores].sort((a, b) => a.score - b.score).slice(0, 3);
    return {
      answered,
      progress: Math.round((answered / QUESTIONS.length) * 100),
      complete: answered === QUESTIONS.length,
      score,
      band: getBand(score),
      dimensions: dimensionScores,
      weakest,
    };
  }, [answers]);

  function selectAnswer(question: Question, option: Option) {
    setAnswers((current) => ({ ...current, [question.id]: option.value }));
    setShowResult(false);
    setScoreError(null);
    if (!hasTrackedUse) {
      trackMarketingEvent("calculator_used", {
        calculator: "owner_dependency_score",
        first_question: question.id,
      });
      setHasTrackedUse(true);
    }
  }

  function reset() {
    setAnswers({ ...emptyAnswers });
    setShowResult(false);
    setScoreError(null);
    setHasTrackedUse(false);
  }

  function revealScore() {
    if (!result.complete) {
      setScoreError(`Answer all ${QUESTIONS.length} questions to get your final score.`);
      return;
    }
    setScoreError(null);
    setShowResult(true);
    trackMarketingEvent("calculator_export_request", {
      calculator: "owner_dependency_score",
      score: result.score,
      band: result.band.label,
      weakest_area: result.weakest[0]?.key,
    });
    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="mx-auto max-w-content space-y-8">
      <section className="overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-[0_18px_60px_rgba(15,23,42,0.06)]" aria-labelledby="odi-questions-heading">
        <div className="border-b border-border bg-[#fbfbf8] px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[0.75rem] font-semibold uppercase leading-none tracking-[0.16em] text-blue">12-question assessment</p>
              <h2 id="odi-questions-heading" className="mt-3 text-[1.65rem] font-semibold leading-tight tracking-[-0.025em] text-foreground md:text-[2rem]">
                Choose what is closest to your real situation.
              </h2>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 tracking-[0] text-muted">
                Pick the option that best matches how your business runs today. At the end, you will get your score and a Zoveto action plan.
              </p>
            </div>
            <Button type="button" variant="outline" size="md" className="gap-2 self-start rounded-lg" onClick={reset}>
              <RefreshCcw className="h-4 w-4" aria-hidden />
              Reset
            </Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-[0.78rem] font-medium text-muted">
              <span>{result.answered} of {QUESTIONS.length} answered</span>
              <span>{result.progress}% complete</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-blue transition-[width] duration-300"
                style={{ width: `${result.progress}%` }}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {QUESTIONS.map((question, index) => {
            const selected = answers[question.id];
            const titleId = `odi-question-${question.id}`;
            return (
              <div
                key={question.id}
                role="group"
                aria-labelledby={titleId}
                className="min-w-0 px-5 py-7 sm:px-8 sm:py-8"
              >
                <div className="mb-5 block w-full">
                  <span className="mb-2 block text-[0.75rem] font-semibold uppercase leading-none tracking-[0.15em] text-muted-2">
                    {String(index + 1).padStart(2, "0")} / {DIMENSIONS[question.dimension].label}
                  </span>
                  <h3 id={titleId} className="block max-w-5xl text-[1.15rem] font-semibold leading-snug tracking-[-0.015em] text-foreground md:text-[1.35rem]">
                    {question.label}
                  </h3>
                </div>
                <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {question.options.map((option) => {
                    const active = selected === option.value;
                    return (
                      <button
                        key={`${question.id}-${option.value}`}
                        type="button"
                        onClick={() => selectAnswer(question, option)}
                        className={cn(
                          "group flex min-h-[5.75rem] flex-col rounded-xl border p-4 text-left transition-[background-color,border-color,transform,box-shadow] duration-200 sm:min-h-[9.25rem]",
                          "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/35 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                          active
                            ? "border-blue bg-[#f3f8ff] shadow-[inset_0_0_0_1px_rgba(0,113,227,0.12)]"
                            : "border-border bg-white hover:border-[#b8b8be] hover:bg-[#fbfbfd]",
                        )}
                        aria-pressed={active}
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-[0.98rem] font-semibold leading-6 tracking-[-0.01em] text-foreground">{option.label}</span>
                          {active ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden /> : null}
                        </span>
                        <span className="mt-3 block text-[0.88rem] leading-6 tracking-[0] text-muted">{option.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border bg-[#fbfbf8] px-5 py-5 sm:px-8">
          {scoreError ? (
            <div className="mb-4 rounded-xl border border-red/25 bg-red/10 px-4 py-3 text-sm font-medium text-red" role="alert">
              {scoreError}
            </div>
          ) : null}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.95rem] leading-6 text-muted">
              {result.complete
                ? "All questions are answered. Click below to get your final Owner Dependency Score."
                : `${QUESTIONS.length - result.answered} questions left before your final score is ready.`}
            </p>
            <Button type="button" variant="primary" size="lg" className="w-full gap-2 rounded-lg sm:w-auto" onClick={revealScore}>
              Get final score
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </section>

      {showResult ? (
        <section
          ref={resultRef}
          className="scroll-mt-24 overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
          aria-labelledby="odi-result-heading"
        >
          <div className="grid gap-0 lg:grid-cols-[0.8fr_1fr]">
            <div className="bg-[#20252d] p-6 text-white sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-label text-white/65">Your final score</p>
                  <h2 id="odi-result-heading" className="mt-4 text-7xl font-semibold tracking-[-0.06em] text-white">
                    {result.score}
                  </h2>
                  <p className="mt-3 text-xl font-semibold text-white/85">
                    {result.band.label}
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                  <Gauge className="h-8 w-8 text-white" aria-hidden />
                </div>
              </div>
              <p className="mt-6 text-[0.98rem] leading-7 tracking-[0] text-white/75">{result.band.summary}</p>
            </div>

            <div className="p-5 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-cap text-blue">Score bands</p>
              <div className="mt-4 overflow-hidden rounded-xl border border-border">
                <div className="grid grid-cols-1 sm:grid-cols-5">
                {BANDS.map((band, index) => (
                  <div key={band.label} className={cn("min-h-[3.5rem] border-b border-border p-3 last:border-b-0 sm:min-h-[4.5rem] sm:border-b-0 sm:border-r sm:p-2.5 sm:last:border-r-0", bandBg[index])}>
                    <p className="text-[0.72rem] font-bold leading-none">{band.min}-{band.max}</p>
                    <p className="mt-2 text-[0.68rem] font-medium leading-4">{band.label}</p>
                  </div>
                ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-blue/20 bg-blue/[0.06] p-5">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-blue" aria-hidden />
                  <p className="text-base font-semibold text-foreground">How Zoveto can improve this</p>
                </div>
                <p className="mt-3 text-[0.92rem] leading-6 text-muted">{result.band.cta}</p>
                <div className="mt-5 grid gap-3">
                  {result.weakest.map((item) => (
                    <div key={item.key} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className={cn("text-sm font-semibold", scoreTone(item.score))}>{item.score}/100</p>
                      </div>
                      <p className="mt-2 text-[0.88rem] leading-6 text-muted">{DIMENSIONS[item.key].zoveto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border p-5 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue" aria-hidden />
                <p className="text-sm font-semibold text-foreground">Dimension breakdown</p>
              </div>
              <div className="space-y-3">
                {result.dimensions.map((dimension) => (
                  <div key={dimension.key}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                      <span className="font-medium text-foreground">{dimension.label}</span>
                      <span className={cn("font-semibold", scoreTone(dimension.score))}>{dimension.score}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-blue transition-[width] duration-300"
                        style={{ width: `${dimension.score}%` }}
                        aria-hidden
                      />
                    </div>
                    <p className="mt-1 text-[0.72rem] leading-4 text-muted">{DIMENSIONS[dimension.key].help}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/signup"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-hover"
                onClick={() =>
                  trackMarketingEvent("cta_button_click", {
                    cta: "book_system_audit_from_owner_dependency_score",
                    score: result.score,
                  })
                }
              >
                Improve this score with Zoveto
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default OwnerDependencyScoreClient;
