"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_SUFFIXES = ["ERP", "WMS", "CRM", "HRMS", "AI"] as const;
/** Width reference — longest token in default set */
const WIDTH_REF = "HRMS";

const INTERVAL_MS = 2000;
const LG_MEDIA = "(min-width: 1024px)";

const staticWordClasses =
  "inline-block align-middle leading-none font-semibold tracking-[0.08em] text-[1.45rem]";
const suffixClasses =
  "inline-block align-middle leading-none font-medium tracking-[0.08em] text-[1.45rem] text-foreground";

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
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [index, setIndex] = useState(0);
  const freezeRef = useRef(freeze);
  freezeRef.current = freeze;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
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
    suffixLen > 0 ? suffixes.reduce((a, b) => (a.length >= b.length ? a : b), "") : WIDTH_REF;

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
        <span className={cn(suffixClasses, "invisible col-start-1 row-start-1")} aria-hidden>
          {widthToken}
        </span>

        <span className="col-start-1 row-start-1 overflow-visible">
          {shouldRotate ? (
            <span
              key={current}
              className={cn(
                suffixClasses,
                "block motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300",
              )}
            >
              {current}
            </span>
          ) : (
            <span className={suffixClasses}>ERP</span>
          )}
        </span>
      </span>
    </span>
  );
}
