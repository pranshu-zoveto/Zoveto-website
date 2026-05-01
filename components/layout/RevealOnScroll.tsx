"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  disabled?: boolean;
};

/**
 * Wraps stagger children (`.reveal-item`) and toggles `is-revealed` when scrolled into view.
 */
export function RevealOnScroll({ children, className, as: Tag = "div", disabled }: Props) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>({ disabled });
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={cn("reveal-stagger", (disabled || revealed) && "is-revealed", className)}>
      {children}
    </Tag>
  );
}
