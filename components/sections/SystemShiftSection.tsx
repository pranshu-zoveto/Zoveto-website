"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SUPPORTING_LINES = [
  "Your ERP talks to your warehouse.",
  "Your warehouse talks to your CRM.",
  "Your CRM talks to your finance.",
  "Everything talks to your AI agents.",
] as const;

export function SystemShiftSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.6, 0.75, 0.75, 0.5]);
  const headingOpacity = useTransform(scrollYProgress, [0.06, 0.2, 0.86, 1], [0, 1, 1, 0.2]);
  const headingScale = useTransform(scrollYProgress, [0.06, 0.24, 1], [0.975, 1, 0.995]);
  const headingGlow = useTransform(scrollYProgress, [0.2, 0.45, 0.7], [0, 0.55, 0]);
  const headingGlowShadow = useMotionTemplate`0 0 22px rgba(59,130,246,${headingGlow})`;
  const supportOpacity = useTransform(scrollYProgress, [0.16, 0.3, 0.9, 1], [0.25, 1, 1, 0.55]);
  const supportY = useTransform(scrollYProgress, [0.1, 0.36, 1], [8, 0, -5]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="system-shift-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fbfcff_0%,#f6f9ff_46%,#f1f5fb_100%)] py-[6.5rem] text-center md:py-[8rem]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7ff_58%,#eef3fb_100%)]"
        style={{ opacity: reduceMotion ? 1 : overlayOpacity }}
      />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(72%_58%_at_50%_34%,rgba(2,132,199,0.14),transparent_64%)]"
          animate={reduceMotion ? undefined : { opacity: [0.75, 1, 0.78], scale: [1, 1.03, 1] }}
          transition={reduceMotion ? undefined : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(58%_48%_at_52%_56%,rgba(37,99,235,0.11),transparent_72%)]"
          animate={reduceMotion ? undefined : { opacity: [0.65, 0.95, 0.68], x: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#edf3fd]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#ecf2fb]/80 to-[#e8effa]" />
      </div>

      <motion.svg
        aria-hidden
        viewBox="0 0 1200 500"
        className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-[0.12] md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 0.16 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.path
          d="M 130 130 C 410 130, 620 190, 1050 190"
          stroke="rgba(96,165,250,0.2)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5 11"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -120] }}
          transition={reduceMotion ? undefined : { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.path
          d="M 145 250 C 390 250, 660 300, 1040 300"
          stroke="rgba(125,211,252,0.16)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 12"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -160] }}
          transition={reduceMotion ? undefined : { duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.path
          d="M 170 370 C 420 370, 640 345, 1020 360"
          stroke="rgba(147,197,253,0.14)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3 12"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -140] }}
          transition={reduceMotion ? undefined : { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.circle
          r="2.2"
          fill="rgba(125,211,252,0.68)"
          animate={reduceMotion ? undefined : { cx: [130, 1050], cy: [130, 190], opacity: [0.16, 0.48, 0.16] }}
          transition={reduceMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.circle
          r="2"
          fill="rgba(96,165,250,0.62)"
          animate={reduceMotion ? undefined : { cx: [145, 1040], cy: [250, 300], opacity: [0.14, 0.44, 0.14] }}
          transition={reduceMotion ? undefined : { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.5 }}
        />
        <motion.circle
          r="1.9"
          fill="rgba(147,197,253,0.58)"
          animate={reduceMotion ? undefined : { cx: [170, 1020], cy: [370, 360], opacity: [0.14, 0.4, 0.14] }}
          transition={reduceMotion ? undefined : { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
        />
      </motion.svg>

      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-3 md:gap-4">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <SectionLabel className="border-blue/20 bg-blue-dim text-blue">System Shift</SectionLabel>
          </motion.div>

          <motion.h2
            id="system-shift-heading"
            className="max-w-[18ch] text-balance text-[clamp(2.05rem,2.8vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              opacity: reduceMotion ? 1 : headingOpacity,
              scale: reduceMotion ? 1 : headingScale,
            }}
          >
            Zoveto replaces all of them -{" "}
            <motion.span
              className="text-blue"
              style={{ textShadow: reduceMotion ? "none" : headingGlowShadow }}
            >
              one operating record your teams can trust.
            </motion.span>
          </motion.h2>

          <motion.div
            className="mt-4 w-full max-w-[36rem] rounded-2xl border border-border/70 bg-white/85 px-4 py-4 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.22)] backdrop-blur-[1px] sm:px-5"
            style={{ opacity: reduceMotion ? 1 : supportOpacity, y: reduceMotion ? 0 : supportY }}
          >
            <div className="flex flex-col items-center gap-2.5 text-[clamp(1rem,0.76vw,1.14rem)] font-normal leading-[1.55] text-muted">
            {SUPPORTING_LINES.map((line, index) => (
              <motion.p
                key={line}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={reduceMotion ? undefined : { duration: 0.42, delay: 0.12 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {line}
              </motion.p>
            ))}
            </div>
          </motion.div>

          <motion.p
            className="mt-5 max-w-[52ch] text-pretty text-[clamp(0.92rem,0.68vw,1.03rem)] font-medium leading-[1.55] text-muted"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
          >
            For manufacturers, distributors, traders, warehouses, and service teams that cannot run on guesswork.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default SystemShiftSection;
