"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ProductTourScene,
  TOUR_REST,
  type TourPlayState,
  type TourSceneId,
} from "./ProductTourLiveScenes";

const EASE = [0.22, 1, 0.36, 1] as const;
const IDLE_RESUME_MS = 12000;

type Step = {
  scene: TourSceneId;
  target: string;
  hold: number;
  kicker: string;
  numbers: string;
  play: Partial<TourPlayState>;
};

const SCENES: { id: TourSceneId; label: string }[] = [
  { id: "command-center", label: "Command Center" },
  { id: "sales-crm", label: "Sales & CRM" },
  { id: "warehouse", label: "Warehouse" },
  { id: "finance", label: "Finance" },
];

const STEPS: Step[] = [
  {
    scene: "command-center",
    target: "cc-overview",
    hold: 1400,
    kicker: "today's work. one screen.",
    numbers: "Owner overview, connected surfaces, live attention queue",
    play: { ccTab: "overview", viewAs: "Owner" },
  },
  {
    scene: "command-center",
    target: "cc-view-warehouse",
    hold: 1500,
    kicker: "today's work. one screen.",
    numbers: "View as Warehouse, same Command Center, different queue",
    play: { viewAs: "Warehouse" },
  },
  {
    scene: "command-center",
    target: "cc-roi-cost",
    hold: 1800,
    kicker: "today's work. one screen.",
    numbers: "Revenue recovered ₹0, cost saved ₹750, time saved 3h, leads processed 0",
    play: { viewAs: "Owner", roiFocus: "cost" },
  },
  {
    scene: "sales-crm",
    target: "sales-lane-ship",
    hold: 1700,
    kicker: "lead to quote to order.",
    numbers: "18 ship-ready packs, 3 aged rework, 1 pending approval, 1 unacknowledged task",
    play: { salesLane: "ship" },
  },
  {
    scene: "sales-crm",
    target: "sales-row-critical",
    hold: 1700,
    kicker: "lead to quote to order.",
    numbers: "Price Health CRITICAL on a live quotation row",
    play: { salesLane: "rework", salesRow: 0 },
  },
  {
    scene: "warehouse",
    target: "wh-ready",
    hold: 1400,
    kicker: "pick. scan. ship.",
    numbers: "Ready orders 53, units to pick 317, picking 20, packing 13, ready to dispatch 33, blocked 1",
    play: { whStat: "ready" },
  },
  {
    scene: "warehouse",
    target: "wh-order",
    hold: 1200,
    kicker: "pick. scan. ship.",
    numbers: "Select the order, then pick against inbound lots",
    play: { orderOpen: true, whStat: null },
  },
  {
    scene: "warehouse",
    target: "wh-order-option",
    hold: 1200,
    kicker: "pick. scan. ship.",
    numbers: "DEMO-SO-T-2026-0314, picking, 2 lines",
    play: { orderOpen: true, selectedOrderId: "DEMO-SO-T-2026-0314" },
  },
  {
    scene: "warehouse",
    target: "wh-scan",
    hold: 1600,
    kicker: "pick. scan. ship.",
    numbers: "Scan the rack, then the lot. Stock leaves at dispatch.",
    play: { orderOpen: false, pickMarked: 1 },
  },
  {
    scene: "warehouse",
    target: "wh-blocked",
    hold: 1600,
    kicker: "pick. scan. ship.",
    numbers: "Blocked 1: DEMOZOVETO/26-27/SO/00004, 1 shortage line",
    play: { whStat: "blocked" },
  },
  {
    scene: "finance",
    target: "fin-posted",
    hold: 1500,
    kicker: "GST from the same order.",
    numbers: "100 invoices, 96 posted, 3 draft",
    play: { finFilter: "posted" },
  },
  {
    scene: "finance",
    target: "fin-row-0",
    hold: 1800,
    kicker: "GST from the same order.",
    numbers: "GST and e-way-bill status on every posted invoice",
    play: { finFilter: "posted", financeRow: 0, invoiceOpen: true },
  },
];

function firstStepFor(scene: TourSceneId) {
  return Math.max(0, STEPS.findIndex((step) => step.scene === scene));
}

function playFrom(stepIndex: number): TourPlayState {
  const next = { ...TOUR_REST };
  const scene = STEPS[stepIndex]?.scene;
  for (let i = 0; i <= stepIndex; i += 1) {
    const step = STEPS[i];
    if (step.scene !== scene) continue;
    Object.assign(next, step.play);
  }
  return next;
}

export default function ProductTourInteractive() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [manual, setManual] = useState(false);
  const [userPlay, setUserPlay] = useState<TourPlayState>(TOUR_REST);
  const [pointer, setPointer] = useState({ x: 72, y: 64, w: 72, h: 28 });
  const [clickKey, setClickKey] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inViewRef = useRef(false);
  const idleRef = useRef<number | null>(null);
  const baseId = useId();

  const step = STEPS[stepIndex];
  const playing = mounted && reduceMotion === false && !manual;
  const sceneIndex = SCENES.findIndex((item) => item.id === step.scene);
  const play = manual ? userPlay : playFrom(stepIndex);
  const scene = step.scene;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const sync = () => setIsActive(!document.hidden && inViewRef.current);
    const observer = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0.2, rootMargin: "40px 0px" },
    );
    observer.observe(rootRef.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const target = stage.querySelector<HTMLElement>(`[data-tour="${STEPS[stepIndex].target}"]`);
    if (!target) return;
    const box = stage.getBoundingClientRect();
    const hit = target.getBoundingClientRect();
    setPointer({
      x: hit.left - box.left,
      y: hit.top - box.top,
      w: hit.width,
      h: hit.height,
    });
  }, [stepIndex]);

  useLayoutEffect(() => {
    if (!playing) return;
    const id = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(id);
  }, [measure, playing, play, step.scene]);

  useEffect(() => {
    if (!playing || !isActive) return;
    const travel = window.setTimeout(() => setClickKey((current) => current + 1), 480);
    const advance = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.hold);
    return () => {
      window.clearTimeout(travel);
      window.clearTimeout(advance);
    };
  }, [playing, isActive, stepIndex, step.hold]);

  const armResume = useCallback(() => {
    if (idleRef.current) window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => {
      setManual(false);
    }, IDLE_RESUME_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (idleRef.current) window.clearTimeout(idleRef.current);
    };
  }, []);

  const onInteract = useCallback(
    (patch: Partial<TourPlayState>) => {
      setUserPlay((current) => ({ ...(manual ? current : playFrom(stepIndex)), ...patch }));
      setManual(true);
      armResume();
    },
    [armResume, manual, stepIndex],
  );

  const jumpToScene = (next: number, fromKeyboard: boolean) => {
    const index = firstStepFor(SCENES[next].id);
    setStepIndex(index);
    setUserPlay(playFrom(index));
    setManual(false);
    if (fromKeyboard) {
      requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  };

  const onTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      jumpToScene((sceneIndex + 1) % SCENES.length, true);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      jumpToScene((sceneIndex - 1 + SCENES.length) % SCENES.length, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      jumpToScene(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      jumpToScene(SCENES.length - 1, true);
    }
  };

  const tablistId = `${baseId}-tablist`;
  const panelId = `${baseId}-panel`;
  const pointerX = pointer.x + pointer.w / 2;
  const pointerY = pointer.y + pointer.h / 2;

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[88rem] px-4 sm:px-6">
      <p id={`${baseId}-prompt`} className="mb-4 text-base font-medium leading-snug text-muted sm:text-lg">
        Watch it work, or click inside and use it.
      </p>

      <figure aria-labelledby={`${baseId}-prompt`}>
        <p className="sr-only">
          Working replica of Zoveto: Command Center, Sales quotations, warehouse pick list, and finance invoices. Click
          filters, rows, scan, and create records the same way the product does.
        </p>
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          <div className="flex items-center gap-3 border-b border-border px-3 py-2.5 sm:px-4" aria-hidden>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-2" />
              <span className="h-2 w-2 rounded-full bg-muted-2" />
              <span className="h-2 w-2 rounded-full bg-muted-2" />
            </div>
            <p className="truncate text-[11px] font-medium tracking-wide text-muted-2">{SCENES[sceneIndex].label}</p>
          </div>

          <div
            id={tablistId}
            role="tablist"
            aria-label="Zoveto product screens"
            onKeyDown={onTabListKeyDown}
            className="grid grid-cols-2 gap-2 border-b border-border px-3 py-3 sm:flex sm:flex-wrap sm:px-4"
          >
            {SCENES.map((item, itemIndex) => {
              const selected = item.id === scene;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[itemIndex] = node;
                  }}
                  id={`${baseId}-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => jumpToScene(itemIndex, false)}
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
            ref={stageRef}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${scene}`}
            className="relative aspect-[16/10] overflow-hidden bg-surface sm:aspect-[1920/894]"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={scene}
                className="absolute inset-0"
                initial={playing ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={playing ? { opacity: 0 } : undefined}
                transition={{ duration: playing ? 0.22 : 0, ease: EASE }}
              >
                <ProductTourScene scene={scene} play={play} onInteract={onInteract} />
              </motion.div>
            </AnimatePresence>

            {playing ? (
              <>
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-[1] rounded-md border-2 border-blue bg-blue/10"
                  initial={false}
                  animate={{ x: pointer.x, y: pointer.y }}
                  transition={{ duration: 0.45, ease: EASE }}
                  style={{ width: pointer.w, height: pointer.h }}
                />
                <motion.span
                  key={clickKey}
                  aria-hidden
                  className="pointer-events-none absolute z-[2] h-7 w-7 rounded-full border-2 border-blue"
                  initial={{ opacity: 0.45, scale: 0.4, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 0, scale: 2.1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  style={{ left: pointerX, top: pointerY }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-[3]"
                  initial={false}
                  animate={{ x: pointerX, y: pointerY }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <MousePointer2
                    className="h-5 w-5 -translate-x-[18%] -translate-y-[12%] fill-foreground text-foreground drop-shadow-[0_1px_2px_rgba(10,10,12,0.4)]"
                    strokeWidth={1.75}
                  />
                </motion.div>
              </>
            ) : null}
          </div>
        </div>

        <figcaption className="mt-4 min-h-[4.75rem] max-w-[65ch] sm:min-h-[3.5rem]">
          <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {manual ? "You are in the product." : step.kicker}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {manual
              ? "Filter lanes, open rows, scan a pick, or post a draft. The walkthrough resumes if you pause."
              : step.numbers}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
