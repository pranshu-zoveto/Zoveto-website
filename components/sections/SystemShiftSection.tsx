"use client";

import { motion, useReducedMotion } from "framer-motion";

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
        <p className="mx-auto mt-4 max-w-[62ch] text-pretty text-sm leading-relaxed text-muted md:text-[0.9375rem]">
          Your ERP talks to your warehouse, your warehouse talks to your CRM, your CRM talks to your finance, and
          everything talks to your AI agents.
        </p>
      </div>
    </section>
  );
}

export default SystemShiftSection;
