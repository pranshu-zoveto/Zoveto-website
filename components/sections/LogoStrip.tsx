"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Text } from "@/components/ui/Text";

const CREDIBILITY_HEADING_ID = "onboarding-credibility-heading";

const TRUST_POINTS = [
  "Built on real operations",
  "Compliance-ready finance",
  "Unified multi-module system",
  "Production-ready architecture",
] as const;

const subtextLineClass =
  "text-base font-sans font-normal leading-snug text-muted/85 md:text-lg md:leading-snug";

export function LogoStrip() {
  return (
    <motion.section
      aria-labelledby={CREDIBILITY_HEADING_ID}
      className="relative z-10 overflow-hidden bg-card py-16 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container mx-auto max-w-content px-4 text-center sm:px-6">
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
          <span className="mb-4 inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-2">
            Live platform
          </span>

          <Text
            id={CREDIBILITY_HEADING_ID}
            as="h2"
            variant="heading-1"
            className="text-balance font-bold leading-[1.2] tracking-[-0.02em] text-foreground"
          >
            One operating system for warehouse, finance, and CRM
          </Text>

          <div className="mt-4 w-full max-w-[720px] text-pretty text-balance">
            <p className={subtextLineClass}>
              Designed for daily operations—inventory, orders, money, and people in one coherent stack.
            </p>
            <p className={`mt-1 ${subtextLineClass}`}>No toy dashboards. No pretend data.</p>
          </div>
        </div>

        <ul
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-stretch gap-4 text-left sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6"
          role="list"
        >
          {TRUST_POINTS.map((line) => (
            <li
              key={line}
              className="flex h-full items-start gap-2.5 rounded-xl border border-border/50 bg-background/40 px-5 py-4 md:gap-3"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={2.25} aria-hidden />
              <span className="text-left text-sm font-medium leading-snug text-foreground md:text-[0.9375rem]">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

export default LogoStrip;