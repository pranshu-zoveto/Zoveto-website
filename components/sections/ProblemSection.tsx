"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconCard } from "@/components/ui/IconCard";

type FlowStep = "Inbox" | "Sheets" | "Tools" | "Disconnected" | "Chaos";

const FLOW_STEPS: FlowStep[] = ["Inbox", "Sheets", "Tools", "Disconnected", "Chaos"];
const CHIP_SEQUENCE: FlowStep[] = ["Inbox", "Sheets", "Tools", "Disconnected", "Chaos"];

const PAINS = [
  {
    id: "inbox",
    title: "Your inbox is your CRM",
    whatHappens: "Orders, complaints, and follow-ups get lost in threads with no history or accountability.",
    whyItHurts: "Missed revenue and frustrated customers.",
  },
  {
    id: "sheets",
    title: "Your spreadsheet is your ERP",
    whatHappens: "Multiple people edit the same file, versions conflict, and wrong numbers become ground truth.",
    whyItHurts: "Stockouts, overselling, and operational chaos.",
  },
  {
    id: "tools",
    title: "Your reports are always yesterday",
    whatHappens: "By the time you know what happened, you cannot change it. No live visibility and no early warning.",
    whyItHurts: "Decisions made on stale data.",
  },
  {
    id: "disconnected",
    title: "Everything is manual",
    whatHappens: "Invoicing, stock updates, and follow-ups are done by people repeatedly with zero automation.",
    whyItHurts: "Hours wasted daily across the team.",
  },
] as const;

const CARD_INDEX_BY_STEP: Record<Exclude<FlowStep, "Chaos">, number> = {
  Inbox: 0,
  Sheets: 1,
  Tools: 2,
  Disconnected: 3,
};

const CHIP_TO_CARD_ID: Record<Exclude<FlowStep, "Chaos">, string> = {
  Inbox: "inbox",
  Sheets: "sheets",
  Tools: "tools",
  Disconnected: "disconnected",
};

const CARD_Y = [16, 38, 62, 84];

function pathFromNodeToCard(cardIdx: number): string {
  const startX = 8;
  const startY = 50;
  const endX = 95;
  const endY = CARD_Y[cardIdx]!;
  const cp1X = 38;
  const cp1Y = startY + (endY - startY) * 0.22;
  const cp2X = 72;
  const cp2Y = endY - (endY - startY) * 0.2;
  return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
}

export function ProblemSection() {
  const [activeStep, setActiveStep] = useState<FlowStep>("Inbox");
  const [isSectionHovering, setIsSectionHovering] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [mobileOpenCard, setMobileOpenCard] = useState<number>(0);
  const [mobileExpandAll, setMobileExpandAll] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isSectionHovering || hasUserInteracted) return;
    const id = window.setInterval(() => {
      setActiveStep((current) => {
        const idx = CHIP_SEQUENCE.indexOf(current);
        return CHIP_SEQUENCE[(idx + 1) % CHIP_SEQUENCE.length]!;
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, [isSectionHovering, hasUserInteracted]);

  useEffect(() => {
    if (activeStep === "Chaos") {
      setMobileExpandAll(true);
      return;
    }
    setMobileExpandAll(false);
    setMobileOpenCard(CARD_INDEX_BY_STEP[activeStep]);
  }, [activeStep]);

  const activeCards = useMemo(() => {
    if (activeStep === "Chaos") return [0, 1, 2, 3];
    return [CARD_INDEX_BY_STEP[activeStep]];
  }, [activeStep]);

  const handleChipActivate = (step: FlowStep, interacted = false) => {
    setActiveStep(step);
    if (interacted) setHasUserInteracted(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024 && step !== "Chaos") {
      const targetId = CHIP_TO_CARD_ID[step as Exclude<FlowStep, "Chaos">];
      const el = mobileCardRefs.current[targetId];
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="problem"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white to-[#f7f9fc] py-section-mobile md:py-section"
      onMouseEnter={() => setIsSectionHovering(true)}
      onMouseLeave={() => setIsSectionHovering(false)}
    >
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-[56px]">
          <div className="lg:col-span-5">
            <SectionLabel className="mb-6 border-red/20 bg-red/10 text-red lg:mb-4">The reality</SectionLabel>
            <h2 className="max-w-xl text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
              Your business is <span className="text-red">bleeding.</span>
            </h2>
            <div className="mt-6 max-w-[480px] space-y-4 lg:mt-6 lg:space-y-3">
              <p className="text-base leading-[1.6] text-[#666] md:text-lg">
                Not dramatically. Slowly. Every day.
                <br />
                In the cracks between tools that don&apos;t talk to each other.
              </p>
              <p className="text-base leading-[1.6] text-[#666] md:text-lg">
                Small misses pile up across teams
                <br />
                until your day is spent fixing avoidable issues.
              </p>
            </div>
            <div className="mt-6 max-w-[520px] rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 md:px-6 lg:mt-4">
              <div className="hidden flex-wrap items-center gap-y-2 text-xs font-medium tracking-wide text-[#6b7280] sm:text-[0.8rem] lg:flex">
                {FLOW_STEPS.map((step) => {
                  const isActive = activeStep === step;
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => handleChipActivate(step, true)}
                      onMouseEnter={() => handleChipActivate(step, true)}
                      className={`relative mr-2 mb-2 inline-flex items-center rounded-full border px-3 py-2 transition-all duration-300 ${
                        isActive
                          ? "border-red/40 bg-red/10 text-red shadow-[0_6px_18px_rgba(239,68,68,0.15)]"
                          : "border-[#d6d9df] bg-white/90 text-[#6b7280] hover:scale-[1.05] hover:border-red/25 hover:bg-red/5 hover:text-foreground"
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          className="mr-2 h-1.5 w-1.5 rounded-full bg-red"
                          animate={{ scale: [1, 1.35, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      ) : null}
                      {step}
                    </button>
                  );
                })}
              </div>

              <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex lg:hidden">
                {FLOW_STEPS.map((step) => {
                  const isActive = activeStep === step;
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => handleChipActivate(step, true)}
                      className={`shrink-0 rounded-full border px-3 py-2 text-xs font-medium tracking-wide transition-all ${
                        isActive ? "border-red/40 bg-red/10 text-red" : "border-[#d6d9df] bg-white text-[#6b7280]"
                      }`}
                    >
                      {step}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 max-w-[520px] text-left text-[clamp(1rem,1.1vw,1.125rem)] leading-[1.5] lg:mt-4">
              <span className="font-medium text-foreground/65">
                Your spreadsheet is your assistant.
                <br />
                Your inbox is your CRM.
              </span>
              <br />
              <span className="font-semibold text-foreground">
                Neither is your <span className="text-red">operating system</span>.
              </span>
            </p>
          </div>

          <div className="relative hidden lg:col-span-7 lg:grid lg:grid-cols-[74px_minmax(0,1fr)] lg:gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
              className="relative h-full min-h-[28rem]"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="problemFlow" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="rgba(148,163,184,0.2)" />
                    <stop offset="100%" stopColor="rgba(239,68,68,0.65)" />
                  </linearGradient>
                </defs>

                {PAINS.map((_, idx) => {
                  const isActive = activeCards.includes(idx);
                  return (
                    <motion.path
                      key={`path-${idx}`}
                      d={pathFromNodeToCard(idx)}
                      stroke="url(#problemFlow)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        opacity: isActive ? 1 : 0.2,
                        filter: isActive ? "drop-shadow(0 0 4px rgba(239,68,68,.35))" : "none",
                        strokeDashoffset: 0,
                      }}
                      strokeDasharray={isActive ? "8 8" : "none"}
                      animate={isActive ? { strokeDashoffset: [0, -32] } : undefined}
                      transition={isActive ? { duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : { duration: 0.2 }}
                    />
                  );
                })}
              </svg>

              <motion.span
                className="absolute left-[2px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-red"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: activeStep === "Chaos"
                    ? ["0 0 0px rgba(239,68,68,0.35)", "0 0 14px rgba(239,68,68,0.65)", "0 0 0px rgba(239,68,68,0.35)"]
                    : ["0 0 0px rgba(239,68,68,0.2)", "0 0 10px rgba(239,68,68,0.45)", "0 0 0px rgba(239,68,68,0.2)"],
                }}
                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="relative z-10">
              {PAINS.map((pain, i) => {
                const isActive = activeCards.includes(i);
                return (
                  <motion.article
                    key={pain.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                    className={`origin-left transition-all duration-300 ease-out ${
                      isActive ? "scale-[1.02] opacity-100" : "opacity-40"
                    } hover:opacity-100`}
                  >
                    <IconCard
                      as="div"
                      index={i + 1}
                      divided={i > 0}
                      className="py-4"
                      label={pain.title}
                      labelClassName="text-[1rem] font-semibold leading-snug tracking-[-0.01em]"
                      description={<p className="mt-2 text-sm leading-[1.5] text-[#666]">{pain.whatHappens}</p>}
                    >
                      <p className="mt-2 text-[0.8125rem] font-medium leading-[1.45] text-blue">
                        <span className="mr-1" aria-hidden>
                          →
                        </span>
                        {pain.whyItHurts}
                      </p>
                    </IconCard>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 lg:hidden">
            {PAINS.map((pain, i) => {
              const open = mobileExpandAll || mobileOpenCard === i;
              const isActive = activeCards.includes(i);
              const index = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={pain.title}
                  ref={(el) => {
                    mobileCardRefs.current[pain.id] = el;
                  }}
                  className={`origin-left transition-all duration-300 ease-out ${
                    i > 0 ? "border-t border-border" : ""
                  } ${isActive ? "scale-[1.02] opacity-100" : "opacity-40"}`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileExpandAll(false);
                      setMobileOpenCard((prev) => (prev === i ? -1 : i));
                      setHasUserInteracted(true);
                    }}
                    aria-expanded={open}
                    className="flex w-full items-start gap-4 py-4 text-left"
                  >
                    <span className="mt-1 shrink-0 font-mono-geist text-xs tabular-nums text-muted">{index}</span>
                    <span className="text-lg font-semibold leading-snug text-foreground">{pain.title}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                        animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                        exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="grid"
                      >
                        <div className="overflow-hidden pb-4 pl-8">
                          <p className="text-base leading-relaxed text-[#666]">{pain.whatHappens}</p>
                          <p className="mt-2 text-[0.8125rem] font-medium leading-[1.45] text-blue">
                            <span className="mr-1" aria-hidden>
                              →
                            </span>
                            {pain.whyItHurts}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

export default ProblemSection;
