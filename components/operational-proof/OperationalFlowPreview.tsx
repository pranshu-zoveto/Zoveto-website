"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const DEMO_STEPS = ["Capture", "Validate", "Sync", "Dispatch", "Post"];

export function OperationalFlowPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [6, -6]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % DEMO_STEPS.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y: translateY }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elevated)] md:p-6"
    >
      <div className="rounded-xl border border-border bg-surface-2/80 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-2">Flow preview</p>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue/40 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
            </span>
            Live
          </span>
        </div>
        <p className="text-sm font-semibold text-foreground">Order → warehouse → finance</p>
        <div className="mt-4 space-y-2">
          {DEMO_STEPS.map((step, idx) => {
            const isOn = !reduceMotion && idx === active;
            return (
              <motion.div
                key={step}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        opacity: isOn ? 1 : 0.55,
                        scale: isOn ? 1.01 : 1,
                      }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between rounded-lg border border-border/90 bg-card px-3 py-2 text-xs font-medium text-muted"
              >
                <span className={isOn ? "text-foreground" : undefined}>{step}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${isOn ? "bg-blue" : "bg-border"}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-border/80 bg-surface p-3.5">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-2">
          <span>Pipeline health</span>
          <span className="text-foreground">Stable</span>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-blue/80"
            initial={false}
            animate={{ width: reduceMotion ? "78%" : `${55 + (active + 1) * 8}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
