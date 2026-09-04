"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ENTERPRISE_POINTS = [
  "All Business OS modules",
  "Custom SLAs and uptime commitments",
  "Dedicated success partner",
] as const;

export function PricingQuietOffers({ className }: { className?: string }) {
  return (
    <article
      aria-labelledby="enterprise-title"
      className={cn(
        "grid gap-6 rounded-xl border border-border bg-card p-6 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_auto_auto] lg:items-center lg:gap-10 lg:p-8",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 id="enterprise-title" className="text-2xl font-bold tracking-tight text-foreground md:text-[1.75rem]">
          Enterprise
        </h3>
        <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
          Large teams, custom SLAs, on-site options, and procurement-friendly contracts.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {ENTERPRISE_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" strokeWidth={2.5} aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:text-right">
        <p className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Custom</p>
        <p className="mt-1 text-sm text-muted">Quoted after discovery</p>
      </div>

      <div className="lg:justify-self-end">
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "blue-outline", size: "lg" }), "h-12 w-full min-w-[13.5rem] lg:w-auto")}
        >
          Contact us
        </Link>
      </div>
    </article>
  );
}
