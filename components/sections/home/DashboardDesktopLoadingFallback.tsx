"use client";

import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";

/** Client-only fallback while `dashboard-scroll-desktop` chunk loads (`next/dynamic` cannot use Server Components here). */
export function DashboardDesktopLoadingFallback() {
  return (
    <div className="relative z-[1] hidden lg:block" style={{ height: "650vh", background: "#f5f5f7" }}>
      <div
        className="relative sticky top-0 flex h-[100dvh] min-h-screen flex-col items-center justify-center px-5 text-center"
        style={{ background: "#f5f5f7" }}
        aria-hidden
      >
        <div className="w-full max-w-[min(92vw,720px)]">
          <BrandHeroWordmark compact />
        </div>
      </div>
    </div>
  );
}
