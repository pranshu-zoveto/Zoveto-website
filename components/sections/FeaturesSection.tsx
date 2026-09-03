"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SCREENSHOT_WIDTH = 1920;
const SCREENSHOT_HEIGHT = 894;

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
          <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            What actually changes when you run on Zoveto
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Not features. Not dashboards. Actual operational impact.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-12"
          variants={outcomesContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={outcomeItem} className="lg:col-span-6">
            <TransformationBlock
              title={
                <>
                  You stop guessing. You start <span className="text-blue">knowing</span>.
                </>
              }
              before={["Reports come late", "Meetings are updates"]}
              after={["Numbers are live across teams", "Meetings drive decisions"]}
              bottomLine="One view across revenue, stock, cash, and operations."
              className="px-6 py-8 md:px-10 md:py-12"
              titleClassName="text-2xl sm:text-3xl md:text-[2.15rem] md:leading-[1.2]"
              listClassName="text-base md:text-[1.02rem]"
              screenshot={{
                src: "/screenshots/command-center.jpg",
                alt: "Zoveto Command Center with live metrics across sales, warehouse, and finance",
                sizes: "(min-width: 1024px) 32rem, (min-width: 768px) 50vw, 100vw",
              }}
              screenshotBeside
            />
          </motion.div>

          <motion.div variants={outcomeItem} className="lg:col-span-3">
            <TransformationBlock
              divided
              title={
                <>
                  Orders go out <span className="text-blue">right</span>. Every time.
                </>
              }
              before={["Wrong picks, returns, confusion", "Customers keep calling"]}
              after={["Scan → validate → dispatch", "Customers stop calling"]}
              bottomLine="Fewer returns. Predictable fulfillment."
              className="p-6 md:p-8"
              screenshot={{
                src: "/screenshots/warehouse-pick-list.jpg",
                alt: "Zoveto warehouse pick list with orders ready to pick, pack, and dispatch",
                sizes: "(min-width: 1152px) 28rem, (min-width: 768px) 45vw, 100vw",
              }}
            />
          </motion.div>
          <motion.div variants={outcomeItem} className="lg:col-span-3">
            <TransformationBlock
              divided
              title={
                <>
                  Month-end stops being a <span className="text-blue">fire</span> drill
                </>
              }
              before={["Reconciliation takes days", "Tax filing is stressful"]}
              after={["Books are always updated", "Compliance filing becomes routine"]}
              bottomLine="Clean books. On time. Every time."
              className="p-6 md:p-8"
              screenshot={{
                src: "/screenshots/finance-invoices.jpg",
                alt: "Zoveto finance sales-invoice register with posting and GST status",
                sizes: "(min-width: 1152px) 28rem, (min-width: 768px) 45vw, 100vw",
              }}
            />
          </motion.div>

          <motion.div variants={outcomeItem} className="lg:col-span-6">
            <TransformationBlock
              divided
              title={
                <>
                  Work happens without <span className="text-blue">chasing</span> people
                </>
              }
              before={["Follow-ups everywhere", "Channel-by-channel chaos"]}
              after={["Rules handle execution", "Structured workflows"]}
              bottomLine="Hours saved every week across teams."
              className="px-6 py-8 md:px-10 md:py-10"
              screenshot={{
                src: "/screenshots/sales-quotations.jpg",
                alt: "Zoveto sales quotations command lane with blocked decisions, approvals, and unacknowledged tasks",
                sizes: "(min-width: 1024px) 32rem, (min-width: 768px) 50vw, 100vw",
              }}
              screenshotBeside
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;

interface OutcomeScreenshot {
  src: string;
  alt: string;
  sizes: string;
}

interface TransformationBlockProps {
  title: React.ReactNode;
  before: string[];
  after: string[];
  bottomLine: string;
  className?: string;
  titleClassName?: string;
  listClassName?: string;
  screenshot?: OutcomeScreenshot;
  screenshotBeside?: boolean;
  /** Top hairline between blocks. First block omits this. */
  divided?: boolean;
}

function OutcomeScreenshotFrame({ src, alt, sizes }: OutcomeScreenshot) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-background">
      <Image
        src={src}
        alt={alt}
        width={SCREENSHOT_WIDTH}
        height={SCREENSHOT_HEIGHT}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

function TransformationBlock({
  title,
  before,
  after,
  bottomLine,
  className = "",
  titleClassName = "",
  listClassName = "",
  screenshot,
  screenshotBeside = false,
  divided = false,
}: TransformationBlockProps) {
  const beforeAfter = (
    <div
      className={cn(
        "grid gap-6 md:gap-8",
        screenshotBeside ? "md:grid-cols-1" : "md:grid-cols-2",
        listClassName,
      )}
    >
      <div className="flex flex-col">
        <p className="mb-3 text-xs font-semibold uppercase tracking-cap text-muted-2">Before</p>
        <ul className="space-y-2 leading-relaxed text-muted">
          {before.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-[6px] w-[6px] shrink-0 rounded-full bg-blue" aria-hidden />
              <p className="max-w-[30ch] text-[14px] leading-[22px] text-gray-600">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <p className="mb-3 text-xs font-semibold uppercase tracking-cap text-muted-2">After</p>
        <ul className="space-y-2 leading-relaxed text-muted">
          {after.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-[6px] w-[6px] shrink-0 rounded-full bg-blue" aria-hidden />
              <p className="max-w-[30ch] text-[14px] leading-[22px] text-gray-600">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const footer = (
    <p className="mt-8 pt-2 text-sm font-semibold text-foreground sm:text-base">
      <span className="text-muted-2">Bottom line:</span> {bottomLine}
    </p>
  );

  return (
    <article className={cn(className, divided && "pt-8")}>
      <h3 className={cn("mb-8 text-xl font-bold tracking-tight text-foreground sm:text-2xl", titleClassName)}>{title}</h3>

      {screenshot && screenshotBeside ? (
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {beforeAfter}
          <div className="order-first lg:order-none">
            <OutcomeScreenshotFrame {...screenshot} />
          </div>
        </div>
      ) : (
        <>
          {screenshot ? (
            <div className="mb-8">
              <OutcomeScreenshotFrame {...screenshot} />
            </div>
          ) : null}
          {beforeAfter}
        </>
      )}

      {footer}
    </article>
  );
}
