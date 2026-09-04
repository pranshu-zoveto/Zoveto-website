"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DashboardLight } from "@/components/sections/dashboard/DashboardLight";
import { ContentPanel } from "@/components/sections/dashboard/ContentPanel";
import { MODULES } from "@/components/sections/dashboard/moduleData";
import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import {
  HOME_HERO_PRIMARY_CTA_HREF,
  HOME_HERO_PRIMARY_CTA_LABEL,
  HOME_HERO_SCROLL_HINT_DESKTOP,
  HOME_HERO_SUBHEADING,
  HOME_HERO_TRUST_LINE,
  HOME_HERO_VALUE_PROP,
} from "@/lib/home-hero-copy";
import {
  dashboardScrollDistancePx,
  getTileZoomParams,
  heroPanelRailPx,
  MIN_TILE_PX,
} from "@/lib/dashboard-scroll-math";

gsap.registerPlugin(ScrollTrigger);

function ProgressDots({ activeIdx }: { activeIdx: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: "calc((100% - var(--hero-panel-width) - var(--hero-panel-gap) - var(--hero-panel-inset)) / 2)",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 8,
        zIndex: 30,
      }}
    >
      {MODULES.map((mod, i) => (
        <div
          key={mod.id}
          style={{
            height: 8,
            width: activeIdx === i ? 24 : 8,
            borderRadius: 4,
            background: activeIdx === i ? mod.color : "#d2d2d7",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function SectionIntro({ introRef }: { introRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      ref={introRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
      <div style={{ marginBottom: 8, maxWidth: "min(92vw, 720px)", marginLeft: "auto", marginRight: "auto" }}>
        <BrandHeroWordmark as="h2" compact />
      </div>
      <h1
        className="mb-3 max-w-[min(92vw,46rem)] text-balance text-[clamp(2.15rem,5.8vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1d1d1f]"
      >
        {HOME_HERO_VALUE_PROP}
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          color: "#4b5563",
          fontWeight: 500,
          maxWidth: "min(90vw, 40rem)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 0,
          marginBottom: 16,
          letterSpacing: "-0.01em",
        }}
      >
        {HOME_HERO_SUBHEADING}
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 12,
          pointerEvents: "auto",
        }}
      >
        <a
          href={HOME_HERO_PRIMARY_CTA_HREF}
          style={{
            minHeight: 52,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            padding: "0 24px",
            background: "var(--blue)",
            border: "1px solid var(--blue-border)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            boxShadow: "0 8px 24px var(--blue-shadow)",
          }}
        >
          {HOME_HERO_PRIMARY_CTA_LABEL}
        </a>
      </div>
      <p
        style={{
          margin: 0,
          maxWidth: "36ch",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.4,
          color: "#6e6e73",
        }}
      >
        {HOME_HERO_TRUST_LINE}
      </p>
      </div>
      <button
        type="button"
        className="hero-scroll-nudge"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 52,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "#86868b",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          cursor: "pointer",
          pointerEvents: "auto",
          padding: "8px 12px",
          transform: "translateX(-50%)",
        }}
        onClick={() => window.scrollBy({ top: Math.min(window.innerHeight * 0.4, 520), behavior: "smooth" })}
      >
        <span
          className="hero-scroll-arrow"
          style={{ fontSize: 14, lineHeight: 1, animation: "scrollBounce 1.4s ease-in-out infinite" }}
          aria-hidden
        >
          ↓
        </span>
        {HOME_HERO_SCROLL_HINT_DESKTOP}
      </button>
    </div>
  );
}

/** Desktop pinned scroll-zoom hero - GSAP + ScrollTrigger in a standalone chunk (`next/dynamic` + `ssr:false` from homepage). */
export function DashboardScrollDesktop() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const dashClipRef = useRef<HTMLDivElement | null>(null);
  const dashRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const readabilityRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeIdx, setActiveIdx] = useState(-1);
  const initRef = useRef(false);
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    if (initRef.current) return;
    if (!sectionRef.current || !stickyRef.current || !dashClipRef.current || !dashRef.current || !introRef.current || !readabilityRef.current) return;

    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let mm: gsap.MatchMedia | null = null;
    const root = sectionRef.current;
    let rafOuter = 0;
    let rafInner = 0;
    let bootTimer = 0;

    const runSetup = () => {
      if (cancelled || initRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(dashRef.current, {
          willChange: "auto",
          transformOrigin: "center center",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
        gsap.set(readabilityRef.current, { opacity: 0 });
        MODULES.forEach((mod) => {
          const panel = panelRefs.current[mod.id];
          if (!panel) return;
          gsap.set(panel, { opacity: 0, x: 0 });
        });
        initRef.current = true;
        return;
      }

      mm = gsap.matchMedia(root);
      mm.add("(min-width: 1024px)", () => {
        ctx = gsap.context(() => {
        const tileRects: Record<string, DOMRect> = {};
        MODULES.forEach((mod) => {
          const el = root.querySelector(`[data-module="${mod.id}"]`);
          if (el) tileRects[mod.id] = el.getBoundingClientRect();
        });
        const dashRect = root.querySelector(".dash-wrapper")?.getBoundingClientRect();

        const showStaticDashboard = () => {
          if (!dashRef.current || !readabilityRef.current) return;
          gsap.set(dashRef.current, {
            willChange: "auto",
            transformOrigin: "center center",
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          });
          gsap.set(readabilityRef.current, { opacity: 0 });
        };

        if (!dashRect || dashRect.width < MIN_TILE_PX || dashRect.height < MIN_TILE_PX) {
          showStaticDashboard();
          initRef.current = true;
          return;
        }

        const zoomStepsOk = MODULES.every((mod) => {
          const r = tileRects[mod.id];
          return r && getTileZoomParams(r, dashRect, vw, vh) !== null;
        });

        MODULES.forEach((mod) => {
          const panel = panelRefs.current[mod.id];
          if (!panel) return;
          gsap.set(panel, { opacity: 0, x: 28 });
        });
        gsap.set(dashRef.current, {
          willChange: "transform",
          transformOrigin: "center center",
          opacity: 0.72,
          scale: 1,
        });
        gsap.set(root.querySelectorAll(".dash-tile-sub"), { opacity: 0 });
        gsap.set(readabilityRef.current, { opacity: 0.95 });
        gsap.set(stickyRef.current, { "--hero-clip-right": "0px" });

        if (!zoomStepsOk) {
          showStaticDashboard();
          MODULES.forEach((mod) => {
            const panel = panelRefs.current[mod.id];
            if (!panel) return;
            gsap.set(panel, { opacity: 1, x: 0 });
          });
          initRef.current = true;
          return;
        }

        const railPx = heroPanelRailPx(vw);
        const focusCenterX = (vw - railPx) / 2;
        const scrollPx = dashboardScrollDistancePx(window.innerHeight);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollPx}`,
            scrub: 1.2,
            pin: stickyRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!mountedRef.current) return;
              const idx = Math.floor((self.progress - 0.14) / 0.14);
              setActiveIdx(Math.max(-1, Math.min(4, idx)));
            },
          },
        });

        tl.to(dashRef.current, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0.08);
        tl.to(readabilityRef.current, { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.12);
        tl.to(introRef.current, { opacity: 0, y: -20, duration: 0.35 }, 0.2);
        tl.to(stickyRef.current, { "--hero-clip-right": `${railPx}px`, duration: 0.45, ease: "power2.out" } as gsap.TweenVars, 0.2);

        MODULES.forEach((mod, i) => {
          const t = 1 + i;
          const tile = root.querySelector(`[data-module="${mod.id}"]`) as HTMLElement | null;
          const panel = panelRefs.current[mod.id];
          if (!tile || !panel || !tileRects[mod.id]) return;
          const params = getTileZoomParams(tileRects[mod.id], dashRect, vw, vh, focusCenterX);
          if (!params) return;

          tl.to(dashRef.current, { ...params, duration: 0.7, ease: "power3.inOut" }, t);
          tl.to(
            tile,
            {
              boxShadow: "0 0 0 3px var(--blue-border), 0 8px 32px var(--blue-dim-hover)",
              borderColor: "var(--blue)",
              duration: 0.25,
            },
            t + 0.3
          );
          const tileSub = tile.querySelector(".dash-tile-sub");
          if (tileSub) {
            tl.to(tileSub, { opacity: 1, duration: 0.25 }, t + 0.3);
            tl.to(tileSub, { opacity: 0, duration: 0.2 }, t + 0.8);
          }
          tl.to(panel, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, t + 0.35);
          tl.to(panel, { opacity: 0, x: 28, duration: 0.35, ease: "power2.in" }, t + 0.8);
          tl.to(tile, { boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderColor: "#e5e5ea", duration: 0.2 }, t + 0.8);
        });

        tl.to(dashRef.current, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "power3.inOut" }, 6.1);
        tl.to(stickyRef.current, { opacity: 0, duration: 0.35 }, 6.5);

        const syncScrubToScroll = () => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          const st = tl.scrollTrigger;
          if (!st) return;
          st.refresh();
          if (window.scrollY < 40 && st.progress > 0.12) {
            ScrollTrigger.clearScrollMemory();
            st.scroll(0);
            ScrollTrigger.refresh();
          }
        };
        requestAnimationFrame(() => {
          requestAnimationFrame(syncScrubToScroll);
        });

          initRef.current = true;
        }, root);

        return () => {
          ctx?.revert();
          ctx = null;
        };
      });
    };

    const boot = () => {
      if (cancelled || initRef.current) return;
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      void fontsReady.then(() => {
        if (cancelled || initRef.current) return;
        rafOuter = requestAnimationFrame(() => {
          if (cancelled || initRef.current) return;
          rafInner = requestAnimationFrame(() => {
            if (cancelled || initRef.current) return;
            runSetup();
          });
        });
      });
    };

    bootTimer = window.setTimeout(boot, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(bootTimer);
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      mm?.revert();
      mm = null;
      ctx?.revert();
      ctx = null;
      initRef.current = false;
      mountedRef.current = false;
    };
  }, []);

  return (
    <section ref={sectionRef} id="product-deep-dive" style={{ height: "650vh" }} className="hidden lg:block">
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100dvh] min-h-screen w-full overflow-hidden"
        style={
          {
            background: "#f5f5f7",
            "--hero-panel-width": "clamp(280px, 32vw, 400px)",
            "--hero-panel-gap": "20px",
            "--hero-panel-inset": "16px",
            "--hero-clip-right": "0px",
          } as CSSProperties
        }
      >
        <div
          ref={dashClipRef}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            clipPath: "inset(0 var(--hero-clip-right) 0 0)",
          }}
        >
          <div
            ref={dashRef}
            style={{
              position: "absolute",
              inset: 0,
              willChange: "transform",
              transformOrigin: "center center",
              opacity: 0,
            }}
          >
            <DashboardLight hideTileSubsUntilFocus />
          </div>
        </div>
        <div
          ref={readabilityRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(245, 245, 247, 0.62)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 12,
          }}
        />

        <SectionIntro introRef={introRef} />

        {MODULES.map((mod) => (
          <ContentPanel
            key={mod.id}
            module={mod}
            ref={(el) => {
              panelRefs.current[mod.id] = el;
            }}
          />
        ))}

        <ProgressDots activeIdx={activeIdx} />
      </div>
    </section>
  );
}

export default DashboardScrollDesktop;
