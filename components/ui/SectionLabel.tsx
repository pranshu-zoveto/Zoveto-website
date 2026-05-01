import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel = ({ children, className }: SectionLabelProps) => (
  <div
    className={cn(
      "inline-block px-3 py-1 rounded-full border border-blue/20 bg-blue-light text-blue text-xs font-semibold tracking-wide mb-10",
      className
    )}
  >
    {children}
  </div>
);
