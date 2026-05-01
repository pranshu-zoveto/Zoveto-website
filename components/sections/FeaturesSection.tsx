"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FEATURES_POINTER_HIGHLIGHT_REPLAY_MS,
  FEATURES_SECTION_CLOSING,
} from "@/lib/features-section-closing-copy";

export function FeaturesSection() {
  const reduceMotion = useReducedMotion();
  const outcomesContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
      },
    },
  };
  const outcomeItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="features" className="relative scroll-mt-24 overflow-hidden bg-transparent py-section-mobile md:py-section">
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-12 max-w-3xl md:mb-16">
          <SectionLabel className="mb-6 border-blue/20 bg-blue-dim text-blue">Outcomes</SectionLabel>
          <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            What actually changes when you run on Zoveto
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Not features. Not dashboards. Actual operational impact.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-6 md:gap-x-8 md:gap-y-12"
          variants={outcomesContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={outcomeItem} className="md:col-span-6">
            <TransformationBlock
              title={
                <>
                  You stop guessing. You start <span className="text-blue">knowing</span>.
                </>
              }
              before={["Reports come late", "Meetings are updates"]}
              after={["Numbers are live across teams", "Meetings drive decisions"]}
              bottomLine="One view across revenue, stock, cash, and operations."
              className="px-6 py-8 md:min-h-[348px] md:px-10 md:py-11"
              titleClassName="text-2xl sm:text-3xl md:text-[2.15rem] md:leading-[1.2]"
              listClassName="text-base md:text-[1.02rem]"
            />
          </motion.div>

          <motion.div variants={outcomeItem} className="md:col-span-3">
            <TransformationBlock
              title={
                <>
                  Orders go out <span className="text-blue">right</span>. Every time.
                </>
              }
              before={["Wrong picks, returns, confusion", "Customers keep calling"]}
              after={["Scan → validate → dispatch", "Customers stop calling"]}
              bottomLine="Fewer returns. Predictable fulfillment."
              className="p-6 md:min-h-[300px] md:p-8"
            />
          </motion.div>
          <motion.div variants={outcomeItem} className="md:col-span-3">
            <TransformationBlock
              title={
                <>
                  Month-end stops being a <span className="text-blue">fire</span> drill
                </>
              }
              before={["Reconciliation takes days", "Tax filing is stressful"]}
              after={["Books are always updated", "Compliance filing becomes routine"]}
              bottomLine="Clean books. On time. Every time."
              className="p-6 md:min-h-[300px] md:p-8"
            />
          </motion.div>

          <motion.div variants={outcomeItem} className="md:col-span-6">
            <TransformationBlock
              title={
                <>
                  Work happens without <span className="text-blue">chasing</span> people
                </>
              }
              before={["Follow-ups everywhere", "Channel-by-channel chaos"]}
              after={["Rules handle execution", "Structured workflows"]}
              bottomLine="Hours saved every week across teams."
              className="px-6 py-8 md:min-h-[288px] md:px-9 md:py-9"
            />
          </motion.div>

          <motion.div variants={outcomeItem} className="mt-2 max-w-3xl border-t border-border/80 pt-6 md:col-span-6">
            <p className="max-w-[46ch] text-[1.15rem] font-semibold leading-snug tracking-[-0.012em] text-foreground sm:text-xl sm:leading-[1.45] md:text-2xl">
              {FEATURES_SECTION_CLOSING.before}
              <PointerHighlight
                size="lg"
                autoReplayMs={FEATURES_POINTER_HIGHLIGHT_REPLAY_MS}
                containerClassName="inline-block max-w-full align-baseline"
                rectangleClassName="border-foreground/80"
                pointerClassName="text-blue"
              >
                <span className="relative z-[1]">{FEATURES_SECTION_CLOSING.highlight}</span>
              </PointerHighlight>
              {FEATURES_SECTION_CLOSING.after}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;

interface TransformationBlockProps {
  title: React.ReactNode;
  before: string[];
  after: string[];
  bottomLine: string;
  className?: string;
  titleClassName?: string;
  listClassName?: string;
}

function TransformationBlock({
  title,
  before,
  after,
  bottomLine,
  className = "",
  titleClassName = "",
  listClassName = "",
}: TransformationBlockProps) {
  return (
    <article className={cn("float-card", className)}>
      <h3 className={cn("mb-7 text-xl font-bold tracking-tight text-foreground sm:text-2xl", titleClassName)}>{title}</h3>

      <div className={cn("grid gap-6 md:grid-cols-2 md:gap-8", listClassName)}>
        <div className="flex flex-col">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-2">Before</p>
          <ul className="space-y-2 leading-relaxed text-muted">
            {before.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-blue-600" aria-hidden />
                <p className="max-w-[30ch] text-[14px] leading-[22px] text-gray-600">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-2">After</p>
          <ul className="space-y-2 leading-relaxed text-muted">
            {after.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-blue-600" aria-hidden />
                <p className="max-w-[30ch] text-[14px] leading-[22px] text-gray-600">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-7 border-t border-border pt-5 text-sm font-semibold text-foreground sm:text-base">
        <span className="text-muted-2">Bottom line:</span> {bottomLine}
      </p>
    </article>
  );
}
