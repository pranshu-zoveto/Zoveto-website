import React from "react";
import { cn } from "@/lib/utils";

type BrandHeroWordmarkProps = {
  as?: "h1" | "h2";
  className?: string;
};

/** Master brand headline: ZOVETO + solid signature blue dot only (no typographic period). */
export function BrandHeroWordmark({ as: Tag = "h2", className }: BrandHeroWordmarkProps) {
  return (
    <Tag
      aria-label="Zoveto"
      className={cn(
        "flex flex-wrap items-baseline justify-center gap-x-[0.14em] gap-y-0 text-center font-extrabold tracking-[-0.045em]",
        "text-[clamp(2.75rem,9.2vw,6rem)] leading-[0.98]",
        className
      )}
    >
      <span className="select-none text-[#000000]">ZOVETO</span>
      <span
        aria-hidden
        className={cn(
          "inline-block shrink-0 rounded-full bg-blue",
          "h-[0.3em] w-[0.3em] min-h-[11px] min-w-[11px] max-h-[22px] max-w-[22px]",
          "translate-y-[0.07em] shadow-[0_0_0_2px_rgba(0,113,227,0.16)]"
        )}
      />
    </Tag>
  );
}
