"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { formatInr } from "@/lib/pricing-display";
import type { PricingModule } from "@/lib/pricing-modules";
import { cn } from "@/lib/utils";

type PricingModuleCardProps = {
  mod: PricingModule;
  className?: string;
};

export function PricingModuleCard({ mod, className }: PricingModuleCardProps) {
  const features = mod.features.slice(0, 3);

  return (
    <article
      aria-labelledby={`module-${mod.id}-title`}
      className={cn(
        "flex h-full min-w-0 flex-col rounded-xl border border-border bg-card p-5 transition-[border-color,background-color,box-shadow] duration-150 ease-out sm:p-6",
        "hover:border-[var(--blue-border)]",
        className,
      )}
    >
      <div>
        <h3 id={`module-${mod.id}-title`} className="text-lg font-bold tracking-tight text-foreground">
          {mod.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-muted">{mod.tagline}</p>
      </div>

      <div className="mt-5">
        <p className="whitespace-nowrap font-mono-geist text-3xl font-bold tabular-nums tracking-tight text-foreground">
          {formatInr(mod.monthlyPrice)}
          <span className="ml-1 text-sm font-semibold text-muted">/mo</span>
        </p>
        <p className="mt-0.5 text-xs text-muted">excl. GST</p>
      </div>

      <Link
        href={`/signup?module=${mod.id.toUpperCase()}`}
        className={cn(buttonVariants({ variant: "blue-outline", size: "md" }), "mt-5 h-11 w-full")}
      >
        Start 15-day free trial
      </Link>

      <ul className="mt-5 flex flex-col gap-2">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" strokeWidth={2.5} aria-hidden />
            <span className="text-[13px] leading-snug text-muted">{feat}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
