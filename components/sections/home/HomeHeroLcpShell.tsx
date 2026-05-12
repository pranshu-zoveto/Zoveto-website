import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";
import { StaticDashboardHero } from "@/components/sections/home/StaticDashboardHero";
import { cn } from "@/lib/utils";

const PILLS = [
  "Execution clarity",
  "Unified business system",
  "Qualified onboarding",
  "Compliance-ready",
] as const;

type Variant = "mobile" | "desktop";

type HomeHeroLcpShellProps = {
  variant: Variant;
};

/**
 * SSR-first viewport hero - no GSAP/framer/client JS.
 * Same core copy as dashboard SectionIntro so LCP is text/wordmark instead of blocked JS painting.
 */
export function HomeHeroLcpShell({ variant }: HomeHeroLcpShellProps) {
  if (variant === "mobile") {
    return <StaticDashboardHero />;
  }

  return (
    <section
      aria-label="Introduction"
      className={cn(
        "relative z-[1] flex flex-col items-center justify-center bg-[#f5f5f7] px-5 text-center",
        "hidden min-h-[calc(100dvh-4.5rem)] scroll-mt-[4.5rem] py-10 lg:flex"
      )}
    >
      <div className="mb-5 flex max-w-[min(92vw,40rem)] flex-wrap justify-center gap-2">
        {PILLS.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86868b]">Master brand</p>
      <div className="mb-2 w-full max-w-[min(92vw,720px)]">
        <BrandHeroWordmark as="h1" />
      </div>
      <p className="mb-8 max-w-[min(90vw,40rem)] text-lg font-medium leading-relaxed tracking-[-0.01em] text-[#4b5563]">
        Your business doesn&apos;t need more tools.
        <br aria-hidden />
        It needs one system that runs everything.
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
  );
}

export default HomeHeroLcpShell;
