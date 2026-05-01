"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "teal" | "amber" | "outline";
}

export function Badge({ children, className, variant = "blue" }: BadgeProps) {
  const variants = {
    blue: "bg-blue-light border-blue/20 text-blue",
    teal: "bg-teal-dim border-teal/25 text-teal",
    amber: "bg-amber/10 border-amber/25 text-amber",
    outline: "bg-card border-border text-muted",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
