"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import type { TourSceneId } from "@/components/sections/home/ProductTourLiveScenes";

const ProductStage = dynamic(() => import("@/components/sections/home/ProductStage"), {
  loading: () => <ProductStageFallback />,
});

function ProductStageFallback() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background" aria-hidden>
      <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-2" />
          <span className="h-2 w-2 rounded-full bg-muted-2" />
          <span className="h-2 w-2 rounded-full bg-muted-2" />
        </div>
        <p className="truncate text-[11px] font-medium tracking-wide text-muted-2">Zoveto</p>
      </div>
      <div className="aspect-[1120/640] bg-surface" />
    </div>
  );
}

const CHAPTERS: {
  scene: TourSceneId;
  alt: string;
  title: React.ReactNode;
  line: string;
}[] = [
  {
    scene: "command-center",
    alt: "Zoveto Command Center with live metrics across sales, warehouse, and finance",
    title: (
      <>
        You stop guessing. You start <span className="text-blue">knowing</span>.
      </>
    ),
    line: "Execution clarity across revenue, stock, cash, and operations.",
  },
  {
    scene: "warehouse",
    alt: "Zoveto warehouse pick list with orders ready to pick, pack, and dispatch",
    title: (
      <>
        Orders go out <span className="text-blue">right</span>. Every time.
      </>
    ),
    line: "Scan, validate, dispatch. Fewer returns.",
  },
  {
    scene: "finance",
    alt: "Zoveto finance sales-invoice register with posting and GST status",
    title: (
      <>
        Month-end stops being a <span className="text-blue">fire</span> drill.
      </>
    ),
    line: "GST and books from the same posted order.",
  },
  {
    scene: "sales-crm",
    alt: "Zoveto sales quotations command lane with blocked decisions, approvals, and unacknowledged tasks",
    title: (
      <>
        Work happens without <span className="text-blue">chasing</span> people.
      </>
    ),
    line: "Quote to order on one register, not a thread.",
  },
];

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
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
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
      <div className="container relative z-10 mx-auto max-w-content px-5 sm:px-6">
        <div className="mb-12 max-w-[40rem] md:mb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Outcomes</p>
          <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            What actually changes when you run on Zoveto
          </h2>
        </div>

        <motion.div
          className="flex flex-col gap-16 md:gap-24"
          variants={outcomesContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {CHAPTERS.map((chapter) => (
            <motion.article
              key={chapter.scene}
              variants={outcomeItem}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="order-2 max-w-[36ch] lg:order-1 lg:col-span-4">
                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.85rem] sm:leading-[1.2]">
                  {chapter.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{chapter.line}</p>
              </div>
              <div className="order-1 min-w-0 lg:order-2 lg:col-span-8">
                <ProductStage scene={chapter.scene} alt={chapter.alt} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
