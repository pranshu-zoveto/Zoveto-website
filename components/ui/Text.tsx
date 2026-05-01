"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: React.ReactNode;
  id?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  variant?:
    | "display-1"
    | "display-2"
    | "heading-1"
    | "heading-2"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "label-uppercase";
  className?: string;
}

export function Text({
  children,
  id,
  as: Component = "p",
  variant = "body-base",
  className,
}: TextProps) {
  const variants = {
    "display-1":
      "text-[clamp(2.25rem,5vw,3.75rem)] md:text-[3.75rem] font-sans font-bold leading-[1.08] tracking-tight text-foreground",
    "display-2":
      "text-3xl md:text-5xl font-sans font-semibold leading-tight tracking-tight text-foreground",
    "heading-1": "text-2xl md:text-4xl font-sans font-semibold tracking-tight text-foreground",
    "heading-2": "text-xl md:text-2xl font-sans font-semibold tracking-tight text-foreground",
    "body-lg": "text-lg md:text-xl font-sans font-normal leading-relaxed text-muted",
    "body-base": "text-base font-sans font-normal leading-relaxed text-muted",
    "body-sm": "text-sm font-sans font-normal leading-relaxed text-muted-2",
    "label-uppercase": "text-xs font-semibold tracking-wide uppercase text-blue",
  };

  return (
    <Component id={id} className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
}
