"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_SUFFIXES = ["ERP", "WMS", "CRM", "HRMS", "AI"] as const;
/** Width reference — longest token in default set */
const WIDTH_REF = "HRMS";

const INTERVAL_MS = 2000;
const TRANSITION_S = 0.35;
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;
const LG_MEDIA = "(min-width: 1024px)";

const staticWordClasses =
  "inline-block align-middle leading-none font-semibold tracking-[0.08em] text-[1.45rem]";
const suffixClasses =
  "inline-block align-middle leading-none font-medium tracking-[0.08em] text-[1.45rem] text-foreground";

const motionTransition = {
  duration: TRANSITION_S,
  ease: EASE_IN_OUT,
} as const;

export type NavbarWordmarkProps = {
  suffixes?: readonly string[];
  className?: string;
  /** When true, freezes auto-rotation (e.g. hover on parent brand link including icon). */
  freeze?: boolean;
};

export function NavbarWordmark({
  suffixes = DEFAULT_SUFFIXES,
  className,
  freeze = false,
}: NavbarWordmarkProps) {
  const reducedMotion = useReducedMotion() === true;
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [index, setIndex] = useState(0);
  const freezeRef = useRef(freeze);
  freezeRef.current = freeze;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(LG_MEDIA);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const shouldRotate = mounted && isDesktop && !reducedMotion;
  const suffixLen = suffixes.length;
  const widthToken =
    suffixLen > 0
      ? suffixes.reduce((a, b) => (a.length >= b.length ? a : b), "")
      : WIDTH_REF;

  const prevRotateRef = useRef(false);
  useEffect(() => {
    if (shouldRotate && !prevRotateRef.current) {
      setIndex(0);
    }
    prevRotateRef.current = shouldRotate;
  }, [shouldRotate]);

  useEffect(() => {
    if (!shouldRotate || suffixLen < 1) return;
    const tick = () => {
      if (freezeRef.current) return;
      setIndex((i) => (i + 1) % suffixLen);
    };
    const id = window.setInterval(tick, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [shouldRotate, suffixLen]);

  const current = suffixes[index % suffixLen] ?? "ERP";

  return (
    <span className={cn("inline-flex items-baseline gap-[0.12em] overflow-visible", className)}>
      <span className={cn(staticWordClasses, "inline-flex items-baseline gap-[0.08em] text-[#000000]")} aria-hidden>
        <span>ZOVETO</span>
        <span
          className="inline-block shrink-0 rounded-full bg-blue shadow-[0_0_0_1.5px_rgba(0,113,227,0.18)]"
          style={{
            width: "0.26em",
            height: "0.26em",
            minWidth: 5,
            minHeight: 5,
            transform: "translateY(0.06em)",
          }}
        />
      </span>

      <span
        className="relative inline-grid shrink-0 grid-cols-1 grid-rows-1 justify-items-start overflow-visible"
        aria-hidden
      >
        <span
          className={cn(suffixClasses, "invisible col-start-1 row-start-1")}
          aria-hidden
        >
          {widthToken}
        </span>

        <span className="col-start-1 row-start-1 overflow-visible">
          {shouldRotate ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current}
                className={cn(suffixClasses, "block will-change-[transform,opacity,filter]")}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={motionTransition}
              >
                {current}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className={suffixClasses}>ERP</span>
          )}
        </span>
      </span>
    </span>
  );
}
