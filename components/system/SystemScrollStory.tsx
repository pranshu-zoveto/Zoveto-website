"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const SystemVisualCanvas = dynamic(
  () => import("@/components/system/SystemVisualCanvas").then((mod) => mod.SystemVisualCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-gradient-to-br from-blue/[0.04] to-transparent" aria-hidden />
    ),
  }
);

type SectionVariant = "core" | "erp" | "crm" | "ai";

type StorySection = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  support?: string;
  answer: string;
  bullets: string[];
  seoHint: string;
  variant: SectionVariant;
};

const SECTIONS: StorySection[] = [
  {
    id: "zoveto-core",
    kicker: "System overview",
    title: "Run your entire company on one system.",
    description:
      "Zoveto brings ERP, CRM, and AI into one operating layer, so teams work from the same posted records.",
    support: "Replace exports and status chasing with shared operational context.",
    answer:
      "What is Zoveto? Zoveto is a company operating system that connects ERP, CRM, and AI agents around posted work.",
    bullets: [
      "One posted record across teams",
      "Live context from lead to ledger",
      "More volume without another tool chain",
    ],
    seoHint: "ERP + CRM + AI platform",
    variant: "core",
  },
  {
    id: "zoveto-erp",
    kicker: "Zoveto ERP",
    title: "Core business engine",
    description:
      "Run finance, inventory, tax, procurement, and operations from the same transaction trail.",
    answer:
      "Zoveto ERP is compliance-ready ERP software with current inventory, finance, and operations control.",
    bullets: [
      "Current inventory and financial tracking",
      "Tax-ready and compliance-friendly",
      "No manual reconciliation across tools",
      "Operational status by record, owner, and exception",
    ],
    seoHint: "ERP software, tax-ready ERP, inventory system",
    variant: "erp",
  },
  {
    id: "zoveto-crm",
    kicker: "Zoveto CRM",
    title: "Customer relationship system",
    description:
      "Track leads, manage deals, and move customers through the pipeline-inside the same system where execution happens.",
    support: "Most CRMs track work. Zoveto CRM helps you close it.",
    answer:
      "Zoveto CRM is pipeline management software that connects sales activity directly to operations and outcomes.",
    bullets: [
      "Pipeline with current deal movement",
      "Complete customer lifecycle tracking",
      "Sales connected directly to operations",
      "Faster follow-ups with workflow triggers",
    ],
    seoHint: "CRM software, sales CRM, pipeline management",
    variant: "crm",
  },
  {
    id: "zoveto-ai",
    kicker: "Zoveto AI",
    title: "Intelligence layer",
    description:
      "Automate decisions and surface insights using AI built directly into your business workflows-not as a separate tool.",
    answer:
      "Zoveto AI delivers context-aware automation and insights from real business data across ERP and CRM workflows.",
    bullets: [
      "AI insights from real operational data",
      "Automation across sales and finance",
      "Context-aware recommendations",
      "Improves as your data grows",
    ],
    seoHint: "AI business automation, AI ERP, AI CRM",
    variant: "ai",
  },
];

function StoryPanel({ section }: { section: StorySection }) {
  const targetRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 240 : 120,
    damping: reduceMotion ? 38 : 26,
    mass: 0.32,
  });

  const textOpacity = useTransform(progress, [0.06, 0.25, 0.78, 0.95], [0, 1, 1, 0.3]);
  const textY = useTransform(progress, [0, 0.35, 1], [34, 0, -28]);
  const visualOpacity = useTransform(progress, [0.1, 0.28, 0.88], [0.35, 1, 0.6]);
  const visualScale = useTransform(progress, [0.1, 0.5, 0.9], [0.95, 1, 1.02]);

  return (
    <section
      ref={targetRef}
      id={section.id}
      className="relative min-h-[180vh] md:min-h-[210vh] snap-start"
      aria-labelledby={`${section.id}-title`}
    >
      <div className="sticky top-0 h-[100dvh] flex items-center">
        <div className="container max-w-content mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 items-center">
            <motion.article
              style={{ opacity: textOpacity, y: textY }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.55 }}
              className="space-y-5 lg:pr-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">{section.kicker}</p>
              <h1
                id={`${section.id}-title`}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[0.98] font-semibold tracking-tight text-foreground"
              >
                {section.title}
              </h1>
              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">{section.description}</p>
              {section.support ? <p className="text-sm sm:text-base text-muted-2">{section.support}</p> : null}
              <p className="text-sm text-foreground/85 leading-relaxed max-w-xl">{section.answer}</p>
              <ul className="space-y-2.5 pt-2">
                {section.bullets.map((point) => (
                  <li key={point} className="flex gap-3 text-sm sm:text-base text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue shrink-0" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-2 pt-1">{section.seoHint}</p>
            </motion.article>

            <motion.div
              style={{ opacity: visualOpacity, scale: visualScale }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.55 }}
              className="w-full"
            >
              <div className="relative h-[300px] sm:h-[380px] lg:h-[540px] rounded-[28px] border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
                <SystemVisualCanvas variant={section.variant} progress={progress} reducedMotion={Boolean(reduceMotion)} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SystemScrollStory() {
  return (
    <main className="bg-background">
      <div className="snap-y snap-proximity">
        {SECTIONS.map((section) => (
          <StoryPanel key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}
