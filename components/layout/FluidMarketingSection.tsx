import React from "react";
import { cn } from "@/lib/utils";
import type { MarketingBand } from "@/lib/marketing-bands";

const bandClass: Record<MarketingBand, string> = {
  0: "marketing-band-0",
  1: "marketing-band-1",
  2: "marketing-band-2",
  3: "marketing-band-3",
};

type Props = {
  band: MarketingBand;
  featherTop?: boolean;
  featherBottom?: boolean;
  /** Pull section up over previous (post–ScrollTrigger only on home). */
  overlapTop?: boolean;
  /** Lower stacking for section underlap when next uses overlapTop. */
  stackBase?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Full-bleed marketing band wrapper. Does not use `<section>` to avoid nesting issues;
 * keep semantic sections inside `children`.
 */
export function FluidMarketingSection({
  band,
  featherTop,
  featherBottom,
  overlapTop,
  stackBase,
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "w-full",
        bandClass[band],
        overlapTop && "marketing-overlap-top",
        stackBase && "marketing-stack-base",
        className
      )}
    >
      {featherTop ? <div className="marketing-feather-top" aria-hidden /> : null}
      {children}
      {featherBottom ? <div className="marketing-feather-bottom" aria-hidden /> : null}
    </div>
  );
}

/** In-flow gradient after GSAP hero — do not use negative margins (ScrollTrigger safe). */
export function MarketingHeroFeather() {
  return <div className="marketing-feather-hero-tail" aria-hidden />;
}
