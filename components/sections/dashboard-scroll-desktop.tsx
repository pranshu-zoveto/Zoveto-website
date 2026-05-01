"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DashboardLight } from "@/components/sections/dashboard/DashboardLight";
import { ContentPanel } from "@/components/sections/dashboard/ContentPanel";
import { MODULES } from "@/components/sections/dashboard/moduleData";
import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import { dashboardScrollDistancePx, getTileZoomParams, MIN_TILE_PX } from "@/lib/dashboard-scroll-math";

gsap.registerPlugin(ScrollTrigger);

function ProgressDots({ activeIdx }: { activeIdx: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        pointerEvents: "none",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
        {["Founder-reviewed access", "No instant account", "Qualified onboarding", "Compliance-ready"].map((item) => (
          <span
            key={item}
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#1d1d1f",
              padding: "10px 18px",
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(29,29,31,0.12)",
              borderRadius: 56,
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#86868b",
          marginBottom: 14,
        }}
      >
        Master brand
      </div>
      <div style={{ marginBottom: 8, maxWidth: "min(92vw, 720px)", marginLeft: "auto", marginRight: "auto" }}>
        <BrandHeroWordmark as="h2" />
      </div>
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
          marginBottom: 32,
          letterSpacing: "-0.01em",
        }}
      >
        Your business doesn&apos;t need more tools.
        <br aria-hidden />
        It needs one system that runs everything.
      </p>
      <button
        type="button"
        className="hero-scroll-nudge"
        style={{
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
        Scroll to zoom modules
      </button>
    </div>
  );
}

/** Desktop pinned scroll-zoom hero — GSAP + ScrollTrigger in a standalone chunk (`next/dynamic` + `ssr:false` from homepage). */
export function DashboardScrollDesktop() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const dashRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const readabilityRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeIdx, setActiveIdx] = useState(-1);
  const initRef = useRef(false);

  useLayoutEffect(() => {
    if (initRef.current) return;
    if (!sectionRef.current || !stickyRef.current || !dashRef.current || !introRef.current || !readabilityRef.current) return;

    let cancelled = false;
    let ctx: gsap.Context | null = null;
    const root = sectionRef.current;
    let rafOuter = 0;
    let rafInner = 0;
    let bootTimer = 0;

    const runSetup = () => {
      if (cancelled || initRef.current) return;

      ScrollTrigger.normalizeScroll(true);

      const vw = window.innerWidth;
      const vh = window.innerHeight;

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
            filter: "none",
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
          gsap.set(panel, { opacity: 0, x: mod.panelSide === "right" ? 50 : -50 });
        });
        gsap.set(dashRef.current, {
          willChange: "transform",
          transformOrigin: "center center",
          opacity: 0.72,
          scale: 1,
          filter: "blur(7px)",
        });
        gsap.set(readabilityRef.current, { opacity: 1 });

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
              const idx = Math.floor((self.progress - 0.14) / 0.14);
              setActiveIdx(Math.max(-1, Math.min(4, idx)));
            },
          },
        });

        tl.to(dashRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power2.out" }, 0.08);
        tl.to(readabilityRef.current, { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.12);
        tl.to(introRef.current, { opacity: 0, y: -20, duration: 0.35 }, 0.2);

        MODULES.forEach((mod, i) => {
          const t = 1 + i;
          const tile = root.querySelector(`[data-module="${mod.id}"]`) as HTMLElement | null;
          const panel = panelRefs.current[mod.id];
          if (!tile || !panel || !tileRects[mod.id]) return;
          const params = getTileZoomParams(tileRects[mod.id], dashRect, vw, vh);
          if (!params) return;

          tl.to(dashRef.current, { ...params, duration: 0.7, ease: "power3.inOut" }, t);
          tl.to(
            tile,
            {
              boxShadow: "0 0 0 3px rgba(0,71,255,0.25), 0 8px 32px rgba(0,71,255,0.15)",
              borderColor: "#0047FF",
              duration: 0.25,
            },
            t + 0.3
          );
          tl.to(panel, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, t + 0.35);
          tl.to(panel, { opacity: 0, x: mod.panelSide === "right" ? 50 : -50, duration: 0.35, ease: "power2.in" }, t + 0.8);
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
      ctx?.revert();
      ctx = null;
      ScrollTrigger.normalizeScroll(false);
      initRef.current = false;
    };
  }, []);

  return (
    <section ref={sectionRef} id="product-deep-dive" style={{ height: "650vh" }} className="hidden lg:block">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "#f5f5f7" }}>
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
          <DashboardLight />
        </div>
        <div
          ref={readabilityRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.28)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
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
