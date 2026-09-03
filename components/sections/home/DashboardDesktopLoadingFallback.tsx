"use client";

import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import { HOME_HERO_SUBHEADING, HOME_HERO_VALUE_PROP } from "@/lib/home-hero-copy";

const PILLS = [
  "Execution clarity",
  "Unified business system",
  "Qualified onboarding",
  "Compliance-ready",
] as const;

/** Client-only fallback while `dashboard-scroll-desktop` chunk loads (`next/dynamic` cannot use Server Components here). */
export function DashboardDesktopLoadingFallback() {
  return (
    <div className="relative z-[1] hidden lg:block" style={{ height: "650vh", background: "#f5f5f7" }}>
      <section
        aria-label="Introduction"
        className="sticky top-0 flex h-[100dvh] min-h-screen flex-col items-center justify-center px-5 py-10 text-center"
        style={{ background: "#f5f5f7" }}
      >
      <div className="mb-4 flex max-w-[min(92vw,40rem)] flex-wrap justify-center gap-1.5">
        {PILLS.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[rgba(29,29,31,0.12)] bg-white/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#86868b]"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">Master brand</p>
      <div className="mb-2 w-full max-w-[min(92vw,720px)]">
        <BrandHeroWordmark compact />
      </div>
      <h1 className="mb-3 max-w-[min(92vw,46rem)] text-balance text-[clamp(2.15rem,5.8vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1d1d1f]">
        {HOME_HERO_VALUE_PROP}
      </h1>
      <p className="mb-8 max-w-[min(90vw,40rem)] text-base font-medium leading-relaxed tracking-[-0.01em] text-[#4b5563]">
        {HOME_HERO_SUBHEADING}
      </p>
      <a
        href="#product-deep-dive"
        className="flex flex-col items-center gap-2 border-0 bg-transparent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#86868b] outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
      >
        <span className="text-sm leading-none motion-safe:animate-[scrollBounce_1.4s_ease-in-out_infinite]" aria-hidden>
          ↓
        </span>
        Scroll to explore modules
      </a>
      </section>
    </div>
  );
}
