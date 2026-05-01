"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

const SIZE_STYLES = {
  default: {
    border: "border",
    pointer: "h-5 w-5",
    pointerOffset: 4,
  },
  lg: {
    border: "border-2",
    pointer: "h-6 w-6 sm:h-7 sm:w-7",
    pointerOffset: 6,
  },
} as const;

export type PointerHighlightSize = keyof typeof SIZE_STYLES;

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  size = "default",
  /** When set, replay draw + cursor animation on this interval (ms). Respects reduced motion. */
  autoReplayMs,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
  size?: PointerHighlightSize;
  autoReplayMs?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [replayKey, setReplayKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const token = SIZE_STYLES[size];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    setDimensions({ width, height });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        setDimensions({ width: w, height: h });
      }
    });

    resizeObserver.observe(el);
    return () => {
      resizeObserver.unobserve(el);
    };
  }, []);

  const bumpReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!autoReplayMs || autoReplayMs < 400 || reduceMotion) return;
    const id = window.setInterval(bumpReplay, autoReplayMs);
    return () => window.clearInterval(id);
  }, [autoReplayMs, bumpReplay, reduceMotion]);

  const off = token.pointerOffset;
  const w = dimensions.width;
  const h = dimensions.height;
  const showOverlay = w > 0 && h > 0;

  return (
    <span className={cn("relative inline-block w-fit", containerClassName)} ref={containerRef}>
      {children}
      {showOverlay && reduceMotion ? (
        <span className="pointer-events-none absolute inset-0 z-0 block" aria-hidden>
          <span
            className={cn(
              "absolute inset-0 box-border border-neutral-800",
              token.border,
              rectangleClassName,
            )}
            style={{ width: w, height: h, display: "block" }}
          />
          <span
            className="pointer-events-none absolute block text-blue-500"
            style={{
              transform: `translate(${w + off}px, ${h + off}px) rotate(-90deg)`,
            }}
          >
            <Pointer className={cn(token.pointer, pointerClassName)} />
          </span>
        </span>
      ) : null}
      {showOverlay && !reduceMotion ? (
        <motion.span
          key={replayKey}
          className="pointer-events-none absolute inset-0 z-0 block"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className={cn(
              "absolute left-0 top-0 box-border border-neutral-800",
              token.border,
              rectangleClassName,
            )}
            initial={{ width: 0, height: 0 }}
            animate={{ width: w, height: h }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "block" }}
          />
          <motion.span
            className="pointer-events-none absolute left-0 top-0 block"
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{
              opacity: 1,
              x: w + off,
              y: h + off,
            }}
            style={{ rotate: -90 }}
            transition={{
              opacity: { duration: 0.15, delay: 0.35, ease: "easeOut" },
              x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <Pointer className={cn(token.pointer, "text-blue-500", pointerClassName)} />
          </motion.span>
        </motion.span>
      ) : null}
    </span>
  );
}

const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  );
};
