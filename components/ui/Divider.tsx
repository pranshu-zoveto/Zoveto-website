import React from 'react';
import { cn } from "@/lib/utils";

export const Divider = ({ className }: { className?: string }) => (
  <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-border to-transparent", className)} />
);
