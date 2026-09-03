import { StaticDashboardHero } from "@/components/sections/home/StaticDashboardHero";
import { HomeHeroAboveFold } from "@/components/sections/home/HomeHeroAboveFold";
import { cn } from "@/lib/utils";

type Variant = "mobile" | "desktop";

type HomeHeroLcpShellProps = {
  variant: Variant;
};

/**
 * SSR-first viewport hero - no GSAP/framer/client JS.
 */
export function HomeHeroLcpShell({ variant }: HomeHeroLcpShellProps) {
  if (variant === "mobile") {
    return <StaticDashboardHero />;
  }

  return (
    <section
      aria-label="Introduction"
      className={cn(
        "relative z-[1] flex flex-col items-center justify-center bg-[#f5f5f7] px-6 text-center",
        "hidden min-h-[calc(100dvh-60px)] scroll-mt-[60px] py-10 lg:flex",
      )}
    >
      <HomeHeroAboveFold showPills showScrollHint />
    </section>
  );
}

export default HomeHeroLcpShell;
