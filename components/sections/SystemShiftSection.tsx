"use client";

import { motion, useReducedMotion } from "framer-motion";

const SUPPORTING_LINES = [
  "Your ERP talks to your warehouse.",
  "Your warehouse talks to your CRM.",
  "Your CRM talks to your finance.",
  "Everything talks to your AI agents.",
] as const;

export function SystemShiftSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="system-shift-heading"
      className="bg-transparent py-section-tight-mobile text-center md:py-section-tight"
    >
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <motion.h2
          id="system-shift-heading"
          className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          One operating system for warehouse, finance, and CRM
        </motion.h2>
        <ul
          className="mt-4 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-2 text-sm leading-snug text-muted md:text-[0.9375rem]"
          role="list"
        >
          {SUPPORTING_LINES.map((line) => (
            <li key={line} className="max-w-[22ch]">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SystemShiftSection;
