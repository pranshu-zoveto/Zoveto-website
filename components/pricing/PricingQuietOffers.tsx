"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { formatInr } from "@/lib/pricing-display";
import { BUNDLES, type PricingBundle } from "@/lib/pricing-modules";
import { cn } from "@/lib/utils";

const BUSINESS_OS = BUNDLES.find((b) => b.id === "business-os") as PricingBundle;

const ENTERPRISE_POINTS = [
  "All Business OS modules",
  "Custom SLAs and uptime commitments",
  "Dedicated success partner",
] as const;

export function PricingQuietOffers({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 md:items-stretch", className)}>
      <article className="flex flex-col rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-bold tracking-tight text-foreground">{BUSINESS_OS.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{BUSINESS_OS.tagline}</p>
        <p className="mt-4 font-mono-geist text-3xl font-bold tabular-nums tracking-tight text-foreground">
          {formatInr(BUSINESS_OS.monthlyPrice)}
          <span className="ml-1 text-base font-semibold text-muted">/mo</span>
        </p>
        <p className="mt-1 text-sm font-medium text-blue">
          Save {formatInr(BUSINESS_OS.savingsVsSeparate)}/mo vs separate modules
        </p>
        <div className="mt-auto pt-5">
          <Link
            href={BUSINESS_OS.ctaHref}
            className={cn(buttonVariants({ variant: "outline", size: "md" }), "h-11 w-full")}
          >
            Start 15-day free trial
          </Link>
        </div>
      </article>

      <article className="flex flex-col rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-bold tracking-tight text-foreground">Enterprise</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Large teams, custom SLAs, on-site options, and procurement-friendly contracts.
        </p>
        <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">Custom</p>
        <ul className="mt-4 flex flex-col gap-2">
          {ENTERPRISE_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" strokeWidth={2.5} aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "md" }), "h-11 w-full")}>
            Contact us
          </Link>
        </div>
      </article>
    </div>
  );
}
