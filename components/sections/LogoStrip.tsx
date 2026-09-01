"use client";

import React from "react";
import { motion } from "framer-motion";

const CREDIBILITY_HEADING_ID = "onboarding-credibility-heading";

const TRUST_POINTS = [
  "Built on real operations",
  "Compliance-ready finance",
  "Unified multi-module system",
  "Production-ready architecture",
] as const;

export function LogoStrip() {
  return (
    <motion.section
      aria-labelledby={CREDIBILITY_HEADING_ID}
      className="relative z-10 bg-transparent py-section-tight-mobile md:py-section-tight"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col gap-3 border-y border-border py-5 lg:flex-row lg:items-baseline lg:gap-8 lg:py-6">
          <h2
            id={CREDIBILITY_HEADING_ID}
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"
          >
            Live platform
          </h2>
          <ul
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2 lg:flex lg:flex-1 lg:items-baseline lg:gap-0 lg:divide-x lg:divide-border"
            role="list"
          >
            {TRUST_POINTS.map((line) => (
              <li
                key={line}
                className="text-sm font-medium leading-snug text-foreground lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

export default LogoStrip;
