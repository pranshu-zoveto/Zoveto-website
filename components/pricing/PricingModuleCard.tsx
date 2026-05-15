"use client";

import Link from "next/link";
import { Check, Layers, Sparkles, UserCheck, Users, Warehouse, type LucideIcon } from "lucide-react";
import { formatInr } from "@/lib/pricing-display";
import type { PricingModule } from "@/lib/pricing-modules";
import { cn } from "@/lib/utils";

const MODULE_ICON_MAP: Record<string, LucideIcon> = {
  wms: Warehouse,
  crm: Users,
  erp: Layers,
  hrms: UserCheck,
  intelligence: Sparkles,
};

type PricingModuleCardProps = {
  mod: PricingModule;
  className?: string;
};

export function PricingModuleCard({ mod, className }: PricingModuleCardProps) {
  const Icon = MODULE_ICON_MAP[mod.id] ?? Layers;
  const isTeal = mod.accentColor === "teal";

  return (
    <div
      className={cn(
        "relative flex min-h-0 w-full min-w-0 flex-col rounded-xl border bg-card px-5 pb-6 pt-5 shadow-[var(--shadow-card)] sm:px-6 sm:pb-7 sm:pt-6",
        isTeal ? "border-teal/20" : "border-blue/20",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
            isTeal ? "border-teal/25 bg-teal/8 text-teal" : "border-blue/25 bg-blue-light text-blue",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </div>
        <div className="min-w-0">
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.16em]",
              isTeal ? "text-teal" : "text-blue",
            )}
          >
            Module
          </p>
          <h3 className="text-base font-bold tracking-tight text-foreground">{mod.name}</h3>
        </div>
      </div>

      <p className="mb-4 text-sm leading-snug text-muted">{mod.tagline}</p>

      <div className="mb-5">
        <span className="text-3xl font-bold tracking-tight text-foreground">{formatInr(mod.monthlyPrice)}</span>
        <span className="ml-1 text-base font-semibold text-muted">/mo</span>
        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-2">Excl. GST</p>
      </div>

      <Link
        href="/contact"
        className={cn(
          "mb-5 flex h-10 w-full items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
          isTeal
            ? "border-teal/30 bg-teal/8 text-teal hover:bg-teal hover:text-white"
            : "border-blue/30 bg-blue-light text-blue hover:bg-blue hover:text-white",
        )}
      >
        Book a demo
      </Link>

      <ul className="flex flex-col gap-2">
        {mod.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2">
            <Check
              className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", isTeal ? "text-teal" : "text-blue")}
              strokeWidth={2.5}
              aria-hidden
            />
            <span className="text-[13px] leading-snug text-muted">{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
