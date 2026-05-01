"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BrandProduct } from "@/lib/brand-products";

const accentRing: Record<BrandProduct["accent"], string> = {
  blue: "hover:border-blue/50 hover:shadow-[0_0_0_1px_rgba(0,113,227,0.25)] focus-visible:border-blue/60",
  violet:
    "hover:border-blue/40 hover:shadow-[0_0_0_1px_rgba(0,119,237,0.22)] focus-visible:border-blue/50",
  cyan: "hover:border-blue/40 hover:shadow-[0_0_0_1px_rgba(0,119,237,0.22)] focus-visible:border-blue/50",
};

const dotColor: Record<BrandProduct["accent"], string> = {
  blue: "bg-blue",
  violet: "bg-teal",
  cyan: "bg-teal",
};

type Props = {
  product: BrandProduct;
  className?: string;
};

export function SystemModuleCard({ product, className }: Props) {
  const reduceMotion = useReducedMotion();
  const href = `/#${product.anchor}`;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn("min-w-0 flex-1", className)}
    >
      <Link
        href={href}
        scroll
        className={cn(
          "group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-6 sm:py-8 text-center transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          accentRing[product.accent]
        )}
      >
        <span className="sr-only">
          {product.productLine}: {product.role}. Open layer.
        </span>

        <span className="flex items-center justify-center gap-1.5 h-8" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={cn("h-1.5 w-1.5 rounded-full", dotColor[product.accent])}
              animate={
                reduceMotion
                  ? { y: 0, opacity: 0.75 }
                  : { y: [0, -3, 0], opacity: [0.45, 1, 0.45] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 1.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.12,
                    }
              }
            />
          ))}
        </span>

        <div className="relative w-full min-h-[2.5rem] flex items-center justify-center">
          <span
            className={cn(
              "absolute inset-x-0 flex items-center justify-center font-mono text-[0.7rem] sm:text-xs tracking-[0.2em] text-muted-2 transition-all duration-200",
              "group-hover:opacity-0 group-hover:translate-y-1 group-focus-visible:opacity-0"
            )}
          >
            {product.dotPrefix}
          </span>
          <span
            className={cn(
              "text-xl sm:text-2xl font-bold tracking-[0.14em] text-foreground transition-all duration-200 translate-y-0.5 opacity-90",
              "group-hover:translate-y-0 group-hover:opacity-100 group-hover:tracking-[0.22em]",
              "group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            )}
          >
            {product.label}
          </span>
        </div>

        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-muted-2 group-hover:text-muted transition-colors max-w-[12rem] leading-snug">
          {product.role}
        </span>
      </Link>
    </motion.div>
  );
}
