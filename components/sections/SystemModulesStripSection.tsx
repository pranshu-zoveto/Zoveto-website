"use client";

import { type CSSProperties, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calculator,
  Layers,
  Sparkles,
  TrendingUp,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  STRIP_INDEX,
  STRIP_MODULES,
  type StripModuleIcon,
  type SystemStripModule,
} from "@/components/sections/system-modules/stripModules";

const iconMap: Record<StripModuleIcon, LucideIcon> = {
  Layers,
  Warehouse,
  TrendingUp,
  Calculator,
  Users,
  Sparkles,
};

const LEGACY_HASH_IDS = new Set(["zoveto-erp", "zoveto-crm", "zoveto-ai"]);

function scrollHashIntoView(behavior: ScrollBehavior) {
  if (typeof window === "undefined") return;
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || !LEGACY_HASH_IDS.has(raw)) return;
  document.getElementById(raw)?.scrollIntoView({ behavior, block: "start" });
}

function StripPanel({
  mod,
  index,
  reduceMotion,
}: {
  mod: SystemStripModule;
  index: number;
  reduceMotion: boolean | null;
}) {
  const Icon = iconMap[mod.icon];
  const { heading, subtext, accent, glow } = mod.palette;

  return (
    <motion.article
      id={mod.fragmentId}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px", amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "gradient-surface relative isolate flex h-full w-full min-h-[270px] flex-col sm:min-h-[290px] lg:min-h-[320px]",
        "transition-[transform,filter] duration-300 ease-out",
        "group-hover:brightness-[1.04] group-hover:[transform:translateY(-2px)]",
        "group-focus-within:brightness-[1.04] group-focus-within:[transform:translateY(-2px)]",
        mod.fragmentId && "scroll-mt-28"
      )}
      style={
        {
          "--tile-accent": accent,
          "--tile-glow": glow,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,var(--tile-glow),transparent_48%)] opacity-90" />
      <div className="relative z-10 flex h-full min-h-0 flex-col px-5 pb-7 pt-6 sm:px-6 sm:pb-8 sm:pt-7 md:px-8 md:pb-10 md:pt-8">
        <header className="flex shrink-0 items-start justify-between gap-4">
          <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-white/80 backdrop-blur-[2px] sm:h-10 sm:w-10">
            <Icon
              className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5"
              strokeWidth={1.5}
              stroke="var(--tile-accent)"
              fill="none"
              aria-hidden
            />
          </div>
          <span
            className="font-semibold tabular-nums tracking-tight text-xs sm:text-sm"
            style={{ color: STRIP_INDEX }}
            aria-hidden
          >
            {mod.index}
          </span>
        </header>
        <div className="mt-4 inline-flex w-fit rounded-full border border-border/80 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          Module
        </div>
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="shrink-0 pt-4 sm:pt-5">
          <h3
            className="max-w-[20ch] text-balance font-semibold tracking-tight"
            style={{
              color: heading,
              fontSize: "clamp(1.2rem, 1.3vw + 0.9rem, 1.95rem)",
              lineHeight: 1.14,
            }}
          >
            {mod.title}
          </h3>
          <p
            className="mt-2.5 max-w-[34ch] text-pretty leading-relaxed sm:mt-3"
            style={{
              color: subtext,
              fontSize: "clamp(0.82rem, 0.33vw + 0.78rem, 1.02rem)",
            }}
          >
            {mod.tagline}
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition duration-300 group-hover:text-foreground group-focus-within:text-foreground">
            Explore module <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SystemModulesStripSection() {
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    requestAnimationFrame(() => scrollHashIntoView("instant"));
  }, []);

  useEffect(() => {
    const onHash = () => scrollHashIntoView("smooth");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="bg-background">
      {/* Omit pb-section below the grid: it exposed bg-background as a grey band above LogoStrip (bg-card). */}
      <div className="container max-w-content mx-auto px-4 sm:px-6 pt-section-mobile md:pt-section pb-8 md:pb-10">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">System modules</p>
          <h2
            id="system-modules-heading"
            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight"
          >
            One system. Six modules your company runs on.
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-xl">
            Each module is deeply connected, so your business runs without gaps or manual work.
          </p>
        </motion.header>
      </div>

      <div
        role="region"
        aria-label="Six Zoveto system modules in two rows of three."
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip"
      >
        <div className="grid grid-cols-1 gap-px bg-border/70 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:auto-rows-fr">
          {STRIP_MODULES.map((mod, index) => (
            <Link
              key={mod.id}
              href={mod.href}
              className={cn(
                "group block h-full min-h-0 bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue/60"
              )}
              aria-label={`${mod.title}. ${mod.tagline}`}
            >
              <StripPanel mod={mod} index={index} reduceMotion={reduceMotion} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
