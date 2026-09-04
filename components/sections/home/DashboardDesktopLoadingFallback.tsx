"use client";

import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import {
  HOME_HERO_PRIMARY_CTA_HREF,
  HOME_HERO_PRIMARY_CTA_LABEL,
  HOME_HERO_SCROLL_HINT_DESKTOP,
  HOME_HERO_SUBHEADING,
  HOME_HERO_TRUST_LINE,
  HOME_HERO_VALUE_PROP,
} from "@/lib/home-hero-copy";

/** Client-only fallback while `dashboard-scroll-desktop` chunk loads (`next/dynamic` cannot use Server Components here). */
export function DashboardDesktopLoadingFallback() {
  return (
    <div className="relative z-[1] hidden lg:block" style={{ height: "650vh", background: "#f5f5f7" }}>
      <section
        aria-label="Introduction"
        className="relative sticky top-0 flex h-[100dvh] min-h-screen flex-col items-center justify-center px-5 text-center"
        style={{ background: "#f5f5f7" }}
      >
        <div className="mb-2 w-full max-w-[min(92vw,720px)]">
          <BrandHeroWordmark compact />
        </div>
        <h1 className="mb-3 max-w-[min(92vw,46rem)] text-balance text-[clamp(2.15rem,5.8vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1d1d1f]">
          {HOME_HERO_VALUE_PROP}
        </h1>
        <p className="mb-8 max-w-[min(90vw,40rem)] text-base font-medium leading-relaxed tracking-[-0.01em] text-[#4b5563] sm:text-lg">
          {HOME_HERO_SUBHEADING}
        </p>
        <a
          href={HOME_HERO_PRIMARY_CTA_HREF}
          className="mb-3 inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[var(--blue-border)] bg-[var(--blue)] px-6 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_8px_24px_var(--blue-shadow)]"
        >
          {HOME_HERO_PRIMARY_CTA_LABEL}
        </a>
        <p className="mb-5 max-w-[36ch] text-sm font-medium leading-snug text-[#6e6e73]">{HOME_HERO_TRUST_LINE}</p>
        <a
          href="#product-deep-dive"
          className="absolute bottom-[52px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 border-0 bg-transparent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#86868b] outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
        >
          <span className="text-sm leading-none motion-safe:animate-[scrollBounce_1.4s_ease-in-out_infinite]" aria-hidden>
            ↓
          </span>
          {HOME_HERO_SCROLL_HINT_DESKTOP}
        </a>
      </section>
    </div>
  );
}
