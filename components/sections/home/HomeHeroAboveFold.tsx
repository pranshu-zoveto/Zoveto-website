import Link from "next/link";
import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import { Button } from "@/components/ui/Button";
import {
  HOME_HERO_PRIMARY_CTA_HREF,
  HOME_HERO_PRIMARY_CTA_LABEL,
  HOME_HERO_SUBHEADING,
  HOME_HERO_VALUE_PROP,
} from "@/lib/home-hero-copy";
import { cn } from "@/lib/utils";

const PILLS = [
  "Execution clarity",
  "Unified business system",
  "Qualified onboarding",
  "Compliance-ready",
] as const;

type HomeHeroAboveFoldProps = {
  showPills?: boolean;
  pillsWrapperClassName?: string;
  showScrollHint?: boolean;
  scrollHintClassName?: string;
  showPreviewCard?: boolean;
};

export function HomeHeroAboveFold({
  showPills = true,
  pillsWrapperClassName,
  showScrollHint = true,
  scrollHintClassName,
  showPreviewCard = false,
}: HomeHeroAboveFoldProps) {
  return (
    <>
      {showPills ? (
        <div
          className={cn(
            "mb-3 flex max-w-[min(92vw,40rem)] flex-wrap justify-center gap-1.5 sm:mb-4",
            pillsWrapperClassName,
          )}
        >
          {PILLS.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.08em] text-muted-2 whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mb-2 w-full max-w-[min(92vw,720px)]" aria-hidden>
        <BrandHeroWordmark compact />
      </div>

      <h1
        className="mb-3 max-w-[min(92vw,46rem)] text-balance text-[clamp(2.15rem,5.8vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1d1d1f]"
      >
        {HOME_HERO_VALUE_PROP}
      </h1>

      <p className="mb-6 max-w-[min(90vw,40rem)] text-base font-medium leading-relaxed tracking-[-0.01em] text-[#4b5563] sm:mb-7 sm:text-lg">
        {HOME_HERO_SUBHEADING}
      </p>

      <div className="mb-5 flex w-full max-w-sm justify-center sm:max-w-none">
        <Link href={HOME_HERO_PRIMARY_CTA_HREF} className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="min-h-[52px] w-full gap-2 sm:w-auto">
            {HOME_HERO_PRIMARY_CTA_LABEL}
          </Button>
        </Link>
      </div>

      {showPreviewCard ? (
        <div
          className="mb-5 hidden w-full max-w-[21rem] rounded-2xl border border-[rgba(29,29,31,0.12)] bg-white p-3 text-left shadow-[0_14px_45px_rgba(15,23,42,0.10)] sm:block"
          aria-label="Zoveto product workflow preview"
        >
          <div className="mb-3 flex items-center justify-between border-b border-[#e5e5ea] pb-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#86868b]">Today</p>
              <p className="text-sm font-semibold text-[#1d1d1f]">Operating pulse</p>
            </div>
            <span className="rounded-full bg-blue-dim px-2.5 py-1 text-[10px] font-semibold text-blue">Live</span>
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
      ) : null}

      {showScrollHint ? (
        <a
          href="#product-deep-dive"
          className={cn(
            "flex flex-col items-center gap-1 border-0 bg-transparent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#86868b] outline-none focus-visible:ring-2 focus-visible:ring-blue/40 sm:gap-2 sm:py-2 sm:tracking-[0.22em]",
            scrollHintClassName,
          )}
        >
          <span className="text-sm leading-none motion-safe:animate-[scrollBounce_1.4s_ease-in-out_infinite]" aria-hidden>
            ↓
          </span>
          Scroll to explore modules
        </a>
      ) : null}
    </>
  );
}
