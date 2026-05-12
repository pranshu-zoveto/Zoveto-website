"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * One unified type scale for content typography.
 *
 *   display-*  → hero + section headlines (largest, tightest tracking)
 *   heading-*  → component / subsection titles
 *   body-*     → paragraphs, descriptions, prose
 *   ui-*       → labels, badges, captions, small uppercase chrome
 *
 * Backwards-compatible aliases (`display-1/2/3`, `heading-1/2`, `headline-md`,
 * `label-uppercase`) are kept so existing call sites do not need to change.
 */
type TextVariant =
  // ── Display ──
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "display-1" // alias → display-lg (kept for backwards compat)
  | "display-2" // alias → display-md
  | "display-3" // alias → display-sm
  // ── Heading ──
  | "heading-2xl"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "heading-xs"
  | "heading-1" // alias → heading-2xl
  | "heading-2" // alias → heading-xl
  | "headline-md" // alias → heading-lg (existing usage in sections)
  // ── Body ──
  | "body-xl"
  | "body-lg"
  | "body-md"
  | "body-base"
  | "body-sm"
  | "body-xs"
  // ── UI / labels ──
  | "ui-md"
  | "ui-base"
  | "ui-sm"
  | "ui-xs"
  | "label-uppercase"; // alias → ui-xs (existing eyebrow-label usage)

type TextAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  as?: TextAs;
  variant?: TextVariant;
  className?: string;
}

/**
 * Class string per variant. Color is intentionally OMITTED from `display-*`,
 * `heading-*`, and `body-md/lg/xl` variants so callers can choose semantic
 * color (`text-foreground` vs `text-muted`) per context. The legacy aliases
 * (`body-base/sm`, `label-uppercase`) keep their historical colors to avoid
 * regressing existing pages.
 */
const variantClasses: Record<TextVariant, string> = {
  // ── Display ──────────────────────────────────────────────────────────
  "display-xl":
    "text-[2.25rem] leading-[1.1] tracking-[-0.04em] font-semibold text-foreground sm:text-[2.75rem] md:text-[3.5rem] lg:text-[clamp(3.5rem,4.5vw,4.5rem)]",
  "display-lg":
    "text-[2rem] leading-[1.1] tracking-[-0.035em] font-semibold text-foreground sm:text-[2.5rem] md:text-[3rem] lg:text-[clamp(3rem,3.8vw,3.5rem)]",
  "display-md":
    "text-[1.75rem] leading-[1.12] tracking-[-0.03em] font-semibold text-foreground sm:text-[2.25rem] md:text-[2.75rem] lg:text-[clamp(2.5rem,3vw,2.75rem)]",
  "display-sm":
    "text-[1.5rem] leading-[1.15] tracking-[-0.025em] font-semibold text-foreground sm:text-[1.875rem] md:text-[2.25rem] lg:text-[clamp(2rem,2.5vw,2.25rem)]",

  // Aliases (point at the canonical display variants above)
  "display-1":
    "text-[2rem] leading-[1.1] tracking-[-0.035em] font-semibold text-foreground sm:text-[2.5rem] md:text-[3rem] lg:text-[clamp(3rem,3.8vw,3.5rem)]",
  "display-2":
    "text-[1.75rem] leading-[1.12] tracking-[-0.03em] font-semibold text-foreground sm:text-[2.25rem] md:text-[2.75rem] lg:text-[clamp(2.5rem,3vw,2.75rem)]",
  "display-3":
    "text-[1.5rem] leading-[1.15] tracking-[-0.025em] font-semibold text-foreground sm:text-[1.875rem] md:text-[2.25rem] lg:text-[clamp(2rem,2.5vw,2.25rem)]",

  // ── Headings ─────────────────────────────────────────────────────────
  "heading-2xl":
    "text-[1.75rem] leading-[1.18] tracking-[-0.025em] font-semibold text-foreground sm:text-[2rem]",
  "heading-xl":
    "text-[1.5rem] leading-[1.22] tracking-[-0.02em] font-semibold text-foreground sm:text-[1.75rem]",
  "heading-lg":
    "text-[1.25rem] leading-[1.28] tracking-[-0.015em] font-semibold text-foreground sm:text-[1.5rem]",
  "heading-md":
    "text-[1.125rem] leading-[1.32] tracking-[-0.01em] font-semibold text-foreground",
  "heading-sm":
    "text-[1rem] leading-[1.4] tracking-[-0.005em] font-semibold text-foreground",
  "heading-xs":
    "text-[0.875rem] leading-[1.4] tracking-[0] font-semibold text-foreground",

  // Aliases
  "heading-1":
    "text-[1.75rem] leading-[1.18] tracking-[-0.025em] font-semibold text-foreground sm:text-[2rem]",
  "heading-2":
    "text-[1.5rem] leading-[1.22] tracking-[-0.02em] font-semibold text-foreground sm:text-[1.75rem]",
  "headline-md":
    "text-[1.25rem] leading-[1.28] tracking-[-0.015em] font-semibold text-foreground sm:text-[1.5rem]",

  // ── Body ─────────────────────────────────────────────────────────────
  "body-xl": "text-[1.125rem] leading-[1.65] tracking-[0] font-normal",
  "body-lg": "text-[1.0625rem] leading-[1.65] tracking-[0] font-normal text-muted",
  "body-md": "text-[1rem] leading-[1.6] tracking-[0] font-normal",
  "body-base": "text-[0.9375rem] leading-[1.6] tracking-[0] font-normal text-muted",
  "body-sm": "text-[0.8125rem] leading-[1.55] tracking-[0] font-normal text-muted-2",
  "body-xs": "text-[0.75rem] leading-[1.5] tracking-[0] font-normal",

  // ── UI / labels ──────────────────────────────────────────────────────
  "ui-md": "text-[0.875rem] leading-[1.25] tracking-[0] font-medium",
  "ui-base": "text-[0.8125rem] leading-[1.2] tracking-[0.01em] font-medium",
  "ui-sm": "text-[0.75rem] leading-[1.2] tracking-[0.02em] font-medium",
  "ui-xs": "text-[0.6875rem] leading-[1] tracking-[0.04em] font-medium uppercase",

  // Alias: original eyebrow label variant (blue tint)
  "label-uppercase":
    "text-[0.6875rem] leading-[1] tracking-[0.08em] font-semibold uppercase text-blue",
};

/** Default HTML tag per variant when `as` is not provided. */
const defaultTag: Record<TextVariant, TextAs> = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h1",
  "display-sm": "h2",
  "display-1": "h1",
  "display-2": "h2",
  "display-3": "h2",
  "heading-2xl": "h2",
  "heading-xl": "h2",
  "heading-lg": "h3",
  "heading-md": "h3",
  "heading-sm": "h4",
  "heading-xs": "h5",
  "heading-1": "h2",
  "heading-2": "h3",
  "headline-md": "h3",
  "body-xl": "p",
  "body-lg": "p",
  "body-md": "p",
  "body-base": "p",
  "body-sm": "p",
  "body-xs": "p",
  "ui-md": "span",
  "ui-base": "span",
  "ui-sm": "span",
  "ui-xs": "span",
  "label-uppercase": "span",
};

export function Text({
  children,
  id,
  as,
  variant = "body-base",
  className,
  ...rest
}: TextProps) {
  const Component = (as ?? defaultTag[variant]) as React.ElementType;
  return (
    <Component id={id} className={cn(variantClasses[variant], className)} {...rest}>
      {children}
    </Component>
  );
}

export default Text;
