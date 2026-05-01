"use client";

import React from "react";
import { cn } from "@/lib/utils";

const GLOW_VARIANTS = {
  violet: "radial-gradient(circle at 50% 24%, rgba(167, 139, 250, 0.24) 0%, rgba(167, 139, 250, 0.1) 38%, transparent 72%)",
  cool: "radial-gradient(circle at 80% 15%, rgba(56, 193, 182, 0.2) 0%, rgba(96, 165, 250, 0.14) 44%, transparent 74%)",
  warm: "radial-gradient(circle at 22% 18%, rgba(251, 191, 36, 0.18) 0%, rgba(251, 146, 60, 0.1) 42%, transparent 74%)",
  rose: "radial-gradient(circle at 48% 20%, rgba(251, 113, 133, 0.17) 0%, rgba(244, 114, 182, 0.1) 40%, transparent 72%)",
  editorial: "radial-gradient(circle at 50% 12%, rgba(148, 163, 184, 0.16) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 74%)",
} as const;

type GlowVariant = keyof typeof GLOW_VARIANTS;
type GlowIntensity = "subtle" | "normal" | "strong";

type BackgroundComponentsProps = {
  variant?: GlowVariant;
  intensity?: GlowIntensity;
  className?: string;
};

const INTENSITY_STYLES: Record<GlowIntensity, { opacity: number; blur: string }> = {
  subtle: { opacity: 0.42, blur: "blur(34px)" },
  normal: { opacity: 0.56, blur: "blur(52px)" },
  strong: { opacity: 0.66, blur: "blur(64px)" },
};

function BackgroundComponents({ variant = "violet", intensity = "normal", className }: BackgroundComponentsProps) {
  const tone = INTENSITY_STYLES[intensity];

  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none", className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GLOW_VARIANTS[variant],
          opacity: tone.opacity,
          filter: tone.blur,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

export { BackgroundComponents };
export default BackgroundComponents;

