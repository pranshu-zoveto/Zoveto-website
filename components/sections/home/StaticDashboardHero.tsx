import { HomeHeroAboveFold } from "@/components/sections/home/HomeHeroAboveFold";

/**
 * Mobile-only static hero - no GSAP / ScrollTrigger / canvas.
 */
export function StaticDashboardHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative z-[1] flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center bg-[#f5f5f7] px-4 py-8 text-center scroll-mt-[56px] sm:min-h-[calc(100dvh-56px)] sm:px-6 sm:py-10 lg:hidden"
    >
      <HomeHeroAboveFold showPills showPreviewCard showScrollHint />
    </section>
  );
}
