"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import {
  ProductTourScene,
  TOUR_REST,
  type TourPlayState,
  type TourSceneId,
} from "./ProductTourLiveScenes";

const EASE = [0.22, 1, 0.36, 1] as const;
const IDLE_RESUME_MS = 12000;
const DESIGN_WIDTH = 1120;
const DESIGN_HEIGHT = 640;

type ScriptStep = {
  target: string;
  hold: number;
  play: Partial<TourPlayState>;
};

const SCENE_LABEL: Record<TourSceneId, string> = {
  "command-center": "Command Center",
  "sales-crm": "Sales & CRM",
  warehouse: "Warehouse",
  finance: "Finance",
};

const SCENE_SCRIPT: Record<TourSceneId, ScriptStep[]> = {
  "command-center": [
    { target: "cc-view-warehouse", hold: 1600, play: { viewAs: "Warehouse" } },
    { target: "cc-roi-cost", hold: 2000, play: { viewAs: "Owner", roiFocus: "cost" } },
  ],
  warehouse: [
    { target: "wh-ready", hold: 1500, play: { whStat: "ready" } },
    { target: "wh-scan", hold: 1800, play: { pickMarked: 1, whStat: null } },
    { target: "wh-blocked", hold: 1800, play: { whStat: "blocked" } },
  ],
  finance: [
    { target: "fin-posted", hold: 1600, play: { finFilter: "posted" } },
    {
      target: "fin-row-0",
      hold: 2000,
      play: { finFilter: "posted", financeRow: 0, invoiceOpen: true },
    },
  ],
  "sales-crm": [
    { target: "sales-lane-ship", hold: 1600, play: { salesLane: "ship" } },
    { target: "sales-row-critical", hold: 1800, play: { salesLane: "rework", salesRow: 0 } },
  ],
};

function playFrom(scene: TourSceneId, stepIndex: number): TourPlayState {
  const next = { ...TOUR_REST };
  const steps = SCENE_SCRIPT[scene];
  for (let i = 0; i <= stepIndex; i += 1) {
    Object.assign(next, steps[i]?.play);
  }
  return next;
}

export function ProductStageSkeleton({ label }: { label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background" aria-hidden>
      <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-2" />
          <span className="h-2 w-2 rounded-full bg-muted-2" />
          <span className="h-2 w-2 rounded-full bg-muted-2" />
        </div>
        <p className="truncate text-[11px] font-medium tracking-wide text-muted-2">{label}</p>
      </div>
      <div className="aspect-[1120/640] bg-surface" />
    </div>
  );
}

type ProductStageProps = {
  scene: TourSceneId;
  alt: string;
};

export default function ProductStage({ scene, alt }: ProductStageProps) {
  const reduceMotion = useReducedMotion();
  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [manual, setManual] = useState(false);
  const [userPlay, setUserPlay] = useState<TourPlayState>(TOUR_REST);
  const [pointer, setPointer] = useState({ x: 72, y: 64, w: 72, h: 28 });
  const [clickKey, setClickKey] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef(false);
  const idleRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);

  const steps = SCENE_SCRIPT[scene];
  const step = steps[stepIndex] ?? steps[0];
  const live = near && mounted;
  const playing = live && reduceMotion === false && !manual;
  const play = manual ? userPlay : playFrom(scene, stepIndex);
  const label = SCENE_LABEL[scene];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNear(true);
      },
      { threshold: 0.05, rootMargin: "120px 0px" },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
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
    if (!stage || !step) return;
    const target = stage.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
    if (!target) return;
    const box = stage.getBoundingClientRect();
    const hit = target.getBoundingClientRect();
    setPointer({
      x: hit.left - box.left,
      y: hit.top - box.top,
      w: hit.width,
      h: hit.height,
    });
  }, [step]);

  useLayoutEffect(() => {
    const frame = stageRef.current;
    if (!frame || !live) return;
    const update = () => {
      const width = frame.clientWidth;
      if (width > 0) setScale(width / DESIGN_WIDTH);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [live]);

  useLayoutEffect(() => {
    if (!playing) return;
    const id = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(id);
  }, [measure, playing, play]);

  useEffect(() => {
    if (!playing || !isActive || !step) return;
    const travel = window.setTimeout(() => setClickKey((current) => current + 1), 480);
    const advance = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % steps.length);
    }, step.hold);
    return () => {
      window.clearTimeout(travel);
      window.clearTimeout(advance);
    };
  }, [playing, isActive, step, steps.length]);

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
      setUserPlay((current) => ({ ...(manual ? current : playFrom(scene, stepIndex)), ...patch }));
      setManual(true);
      armResume();
    },
    [armResume, manual, scene, stepIndex],
  );

  const pointerX = pointer.x + pointer.w / 2;
  const pointerY = pointer.y + pointer.h / 2;

  return (
    <div ref={rootRef}>
      {!live ? (
        <ProductStageSkeleton label={label} />
      ) : (
        <div
          className="overflow-hidden rounded-lg border border-border bg-background"
          aria-label={alt}
        >
          <p className="sr-only">{alt}</p>
          <div className="flex items-center gap-3 border-b border-border px-3 py-2.5" aria-hidden>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-2" />
              <span className="h-2 w-2 rounded-full bg-muted-2" />
              <span className="h-2 w-2 rounded-full bg-muted-2" />
            </div>
            <p className="truncate text-[11px] font-medium tracking-wide text-muted-2">{label}</p>
          </div>
          <div
            ref={stageRef}
            className="relative aspect-[1120/640] overflow-hidden bg-surface"
          >
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: DESIGN_WIDTH,
                height: DESIGN_HEIGHT,
                transform: `scale(${scale})`,
              }}
            >
              <ProductTourScene scene={scene} play={play} onInteract={onInteract} />
            </div>
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
      )}
    </div>
  );
}
