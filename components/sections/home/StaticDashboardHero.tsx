import Link from "next/link";
import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import { Button } from "@/components/ui/Button";

const PILLS = [
  "Execution clarity",
  "Unified business system",
  "Qualified onboarding",
  "Compliance-ready",
] as const;

/**
 * Mobile-only static hero - no GSAP / ScrollTrigger / canvas.
 * LCP target: typography + tiny raster/SVG well under 150KB (logo-icon.svg ~20KB).
 */
export function StaticDashboardHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative z-[1] flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center bg-[#f5f5f7] px-4 py-8 text-center scroll-mt-[4.5rem] sm:px-5 sm:py-10 lg:hidden"
    >
      <div className="mb-4 flex max-w-[min(92vw,40rem)] flex-wrap justify-center gap-2">
        {PILLS.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[rgba(29,29,31,0.12)] bg-white/95 px-[18px] py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1d1d1f]"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86868b]">Master brand</p>
      <div className="mb-2 w-full max-w-[min(92vw,720px)]">
        <BrandHeroWordmark as="h1" />
      </div>
      <p className="mb-5 max-w-[min(90vw,40rem)] text-base font-medium leading-relaxed text-[#4b5563] sm:text-lg">
        Your business runs on WhatsApp and spreadsheets. Zoveto replaces both with one operating system built for how
        Indian businesses actually work.
      </p>
      <div className="mb-5 flex w-full max-w-sm flex-col gap-2 sm:max-w-none sm:flex-row sm:justify-center">
        <Link href="/contact">
          <Button variant="primary" size="lg" className="min-h-[52px] w-full gap-2 sm:w-auto">
            Book a 20-min demo
          </Button>
        </Link>
        <Link href="/implementation">
          <Button variant="outline" size="lg" className="min-h-[52px] w-full sm:w-auto">
            See setup path
          </Button>
        </Link>
      </div>
      <div
        className="mb-5 w-full max-w-[21rem] rounded-2xl border border-[rgba(29,29,31,0.12)] bg-white p-3 text-left shadow-[0_14px_45px_rgba(15,23,42,0.10)]"
        aria-label="Zoveto product workflow preview"
      >
        <div className="mb-3 flex items-center justify-between border-b border-[#e5e5ea] pb-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#86868b]">Today</p>
            <p className="text-sm font-semibold text-[#1d1d1f]">Operating pulse</p>
          </div>
          <span className="rounded-full bg-[#eaf2ff] px-2.5 py-1 text-[10px] font-bold text-[#0047ff]">Live</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Orders", "42 open"],
            ["Stock risk", "7 SKUs"],
            ["Dispatch", "18 picks"],
            ["Receivables", "12 tasks"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[#e5e5ea] bg-[#f5f5f7] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">{label}</p>
              <p className="mt-1 text-sm font-bold text-[#1d1d1f]">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <a
        href="#product-deep-dive"
        className="flex flex-col items-center gap-1 border-0 bg-transparent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b] outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
      >
        <span className="text-sm leading-none motion-safe:animate-[scrollBounce_1.4s_ease-in-out_infinite]" aria-hidden>
          ↓
        </span>
        Scroll to explore modules
      </a>
    </section>
  );
}

export default StaticDashboardHero;
