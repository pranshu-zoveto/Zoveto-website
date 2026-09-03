"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SCREENSHOT_WIDTH = 1920;
const SCREENSHOT_HEIGHT = 894;
const AUTOPLAY_MS = 5000;

type TourSlide = {
  id: string;
  label: string;
  src: string;
  alt: string;
  kicker: string;
  numbers: string;
};

const SLIDES: readonly TourSlide[] = [
  {
    id: "command-center",
    label: "Command Center",
    src: "/screenshots/command-center.jpg",
    alt: "Zoveto Command Center with live metrics across sales, warehouse, and finance",
    kicker: "today's work. one screen.",
    numbers: "Revenue recovered ₹0, cost saved ₹750, time saved 3h, leads processed 0",
  },
  {
    id: "sales-crm",
    label: "Sales & CRM",
    src: "/screenshots/sales-quotations.jpg",
    alt: "Zoveto sales quotations command lane with blocked decisions, approvals, and unacknowledged tasks",
    kicker: "lead to quote to order.",
    numbers: "18 ship-ready packs, 3 aged rework, 1 pending approval, 1 unacknowledged task",
  },
  {
    id: "warehouse",
    label: "Warehouse",
    src: "/screenshots/warehouse-pick-list.jpg",
    alt: "Zoveto warehouse pick list with orders ready to pick, pack, and dispatch",
    kicker: "pick. scan. ship.",
    numbers: "Ready orders 53, units to pick 317, picking 20, packing 13, ready to dispatch 33, blocked 1",
  },
  {
    id: "finance",
    label: "Finance",
    src: "/screenshots/finance-invoices.jpg",
    alt: "Zoveto finance sales-invoice register with posting and GST status",
    kicker: "GST from the same order.",
    numbers: "100 invoices, 96 posted, 3 draft",
  },
] as const;

export default function ProductTourInteractive() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const interactedRef = useRef(false);
  const inViewRef = useRef(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const slide = SLIDES[index];

  const select = useCallback((next: number, fromKeyboard: boolean) => {
    const bounded = (next + SLIDES.length) % SLIDES.length;
    setIndex(bounded);
    if (fromKeyboard) {
      requestAnimationFrame(() => tabRefs.current[bounded]?.focus());
    }
  }, []);

  const onManualSelect = useCallback(
    (next: number) => {
      interactedRef.current = true;
      setInteracted(true);
      select(next, false);
    },
    [select],
  );

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "120px 0px" },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Wait until reduced-motion is known; never cycle for that preference.
    if (reduceMotion !== false || interacted) return;

    const tick = () => {
      if (document.hidden || interactedRef.current || !inViewRef.current) return;
      setIndex((current) => (current + 1) % SLIDES.length);
    };

    const intervalId = window.setInterval(tick, AUTOPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [interacted, reduceMotion]);

  const onTabListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      interactedRef.current = true;
      setInteracted(true);
      select(index + 1, true);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      interactedRef.current = true;
      setInteracted(true);
      select(index - 1, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      interactedRef.current = true;
      setInteracted(true);
      select(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      interactedRef.current = true;
      setInteracted(true);
      select(SLIDES.length - 1, true);
    }
  };

  const tablistId = `${baseId}-tablist`;
  const panelId = `${baseId}-panel`;

  return (
    <div ref={rootRef} className="mx-auto mt-10 w-full max-w-content px-4 sm:mt-12 sm:px-6">
      <p id={`${baseId}-prompt`} className="mb-4 text-base font-medium leading-snug text-muted sm:text-lg">
        Or click through it yourself.
      </p>

      <figure aria-labelledby={`${baseId}-prompt`}>
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          <div className="flex items-center gap-3 border-b border-border px-3 py-2.5 sm:px-4" aria-hidden>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-2" />
              <span className="h-2 w-2 rounded-full bg-muted-2" />
              <span className="h-2 w-2 rounded-full bg-muted-2" />
            </div>
            <p className="truncate text-[11px] font-medium tracking-wide text-muted-2">{slide.label}</p>
          </div>

          <div
            id={tablistId}
            role="tablist"
            aria-label="Zoveto product screens"
            onKeyDown={onTabListKeyDown}
            className="grid grid-cols-2 gap-2 border-b border-border px-3 py-3 sm:flex sm:flex-wrap sm:px-4"
          >
            {SLIDES.map((item, itemIndex) => {
              const selected = itemIndex === index;
              const tabId = `${baseId}-tab-${item.id}`;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[itemIndex] = node;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => onManualSelect(itemIndex)}
                  className={cn(
                    "min-h-11 cursor-pointer rounded-full border px-3 py-2 text-center text-[13px] font-medium leading-none transition-colors duration-200 motion-reduce:transition-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "border-blue bg-blue text-white"
                      : "border-border bg-card text-foreground hover:border-blue hover:bg-blue-light",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${slide.id}`}
            className="relative aspect-[16/10] overflow-hidden bg-surface sm:aspect-[1920/894]"
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={SCREENSHOT_WIDTH}
                  height={SCREENSHOT_HEIGHT}
                  sizes="(min-width: 1152px) 72rem, 100vw"
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <figcaption className="mt-4 min-h-[4.75rem] max-w-[65ch] sm:min-h-[3.5rem]">
          <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">{slide.kicker}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{slide.numbers}</p>
        </figcaption>
      </figure>
    </div>
  );
}
