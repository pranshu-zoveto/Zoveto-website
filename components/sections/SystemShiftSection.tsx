"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

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
      className="relative isolate overflow-hidden border-t border-border/40 bg-[linear-gradient(180deg,#f8fafc_0%,#f4f8fc_38%,#eef4fb_100%)] py-[clamp(4.5rem,10vw,8rem)] text-center"
    >
      {/* Decorative layer only — kept behind content, low contrast, no blur */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(68%_52%_at_50%_28%,rgba(59,130,246,0.08),transparent_62%)]"
          animate={reduceMotion ? undefined : { opacity: [0.55, 0.72, 0.58] }}
          transition={reduceMotion ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(50%_42%_at_50%_72%,rgba(37,99,235,0.06),transparent_70%)]"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.68, 0.52] }}
          transition={reduceMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </div>

      <motion.svg
        aria-hidden
        viewBox="0 0 1200 500"
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full opacity-[0.1] md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 0.12 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.path
          d="M 130 130 C 410 130, 620 190, 1050 190"
          stroke="rgba(96,165,250,0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5 11"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -120] }}
          transition={reduceMotion ? undefined : { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.path
          d="M 145 250 C 390 250, 660 300, 1040 300"
          stroke="rgba(125,211,252,0.14)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 12"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -160] }}
          transition={reduceMotion ? undefined : { duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.path
          d="M 170 370 C 420 370, 640 345, 1020 360"
          stroke="rgba(147,197,253,0.12)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3 12"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -140] }}
          transition={reduceMotion ? undefined : { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.svg>

      <div className="relative z-10 container mx-auto max-w-content px-4 sm:px-6">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 md:gap-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <SectionLabel className="border-blue/20 bg-blue-dim text-blue">System Shift</SectionLabel>
          </motion.div>

          <motion.h2
            id="system-shift-heading"
            className="max-w-[20ch] text-balance text-[clamp(2.05rem,2.8vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Zoveto replaces all of them -{" "}
            <span className="text-blue">one operating record your teams can trust.</span>
          </motion.h2>

          <motion.div
            className="mt-2 w-full max-w-[36rem] rounded-2xl border border-border/80 bg-white px-4 py-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)] sm:px-6 sm:py-6"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-3 text-[clamp(1rem,0.76vw,1.14rem)] font-normal leading-[1.55] text-muted-foreground">
              {SUPPORTING_LINES.map((line, index) => (
                <motion.p
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.75 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 0.4, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="text-center"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.p
            className="mt-2 max-w-[52ch] text-pretty text-[clamp(0.92rem,0.68vw,1.03rem)] font-medium leading-[1.55] text-muted-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          >
            For manufacturers, distributors, traders, warehouses, and service teams that cannot run on guesswork.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default SystemShiftSection;
