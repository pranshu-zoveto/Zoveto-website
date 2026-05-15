"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Factory, Scale, Warehouse, Users, Layers, UserCheck, Sparkles, Check, type LucideIcon } from "lucide-react";
import { PricingModuleGrid } from "@/components/pricing/PricingModuleGrid";
import { Text } from "@/components/ui/Text";
import { PricingFeatureComparison } from "@/components/pricing/PricingFeatureComparison";
import BackgroundComponents from "@/components/ui/background-components";
import { MarketingPageView } from "@/components/tracking/MarketingPageView";
import { ZeroClientTrustSection } from "@/components/sections/ZeroClientTrustSection";
import { formatInr } from "@/lib/pricing-display";
import { MODULES, BUNDLES, type PricingBundle } from "@/lib/pricing-modules";
import { getPublicIndustries } from "@/lib/industries";
import { cn } from "@/lib/utils";

const linkRowFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/45 focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const COMPARE_LINKS = [
  { href: "/compare", label: "All comparisons" },
  { href: "/compare/zoho-vs-zoveto", label: "Zoho vs Zoveto" },
  { href: "/compare/tally-vs-zoveto", label: "Tally vs Zoveto" },
  { href: "/compare/odoo-vs-zoveto", label: "Odoo vs Zoveto" },
  { href: "/compare/vyapar-vs-zoveto", label: "Vyapar vs Zoveto" },
  { href: "/compare/freshsales-vs-zoveto", label: "Freshsales vs Zoveto" },
  { href: "/compare/gohighlevel-vs-zoveto", label: "GoHighLevel vs Zoveto" },
] as const;

const MODULE_ICON_MAP: Record<string, LucideIcon> = {
  wms: Warehouse,
  crm: Users,
  erp: Layers,
  hrms: UserCheck,
  intelligence: Sparkles,
};


// ─── Bundle card ─────────────────────────────────────────────────────────────

function BundleCard({ bundle }: { bundle: PricingBundle }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border bg-card px-6 pb-7 pt-6 shadow-[var(--shadow-card)] sm:px-7 sm:pb-8 sm:pt-7",
        bundle.popular
          ? "z-[1] border-blue/30 bg-blue-light/[0.10] ring-1 ring-blue/20"
          : "border-border"
      )}
    >
      {/* Popular badge */}
      <div className="mb-3 flex h-7 items-center">
        {bundle.popular ? (
          <span className="inline-flex rounded-full bg-blue px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Most Popular
          </span>
        ) : null}
      </div>

      {/* Name + tagline */}
      <h3 className="text-lg font-bold tracking-tight text-foreground">{bundle.name}</h3>
      <p className="mt-1 text-sm leading-snug text-muted">{bundle.tagline}</p>

      {/* Module label */}
      <div className="mt-3 inline-flex w-fit rounded-full border border-border/80 bg-surface-2/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted">
        {bundle.moduleLabel}
      </div>

      {/* Price */}
      <div className="mt-5 mb-1">
        <span className="text-4xl font-bold tracking-tight text-foreground">
          {formatInr(bundle.monthlyPrice)}
        </span>
        <span className="ml-1 text-xl font-semibold text-muted">/mo</span>
        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-2">
          Excl. GST · flat rate
        </p>
      </div>

      {/* Savings badge */}
      <div className="mb-5 mt-2">
        <span className="inline-flex rounded-full border border-teal/20 bg-teal-dim px-2.5 py-1 text-xs font-medium text-teal">
          Save {formatInr(bundle.savingsVsSeparate)}/mo vs separate modules
        </span>
      </div>

      {/* CTA */}
      <Link
        href={bundle.ctaHref}
        className={cn(
          "mb-6 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors",
          bundle.popular
            ? "bg-blue text-white hover:bg-blue/90"
            : "border border-border bg-card text-foreground hover:border-blue/30 hover:bg-blue-light"
        )}
      >
        {bundle.ctaLabel}
      </Link>

      {/* Module list */}
      <div className="border-t border-border pt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">
          Included modules
        </p>
        <ul className="flex flex-col gap-2">
          {bundle.moduleIds.map((mid) => {
            const mod = MODULES.find((m) => m.id === mid);
            if (!mod) return null;
            const Icon = MODULE_ICON_MAP[mid] ?? Layers;
            return (
              <li key={mid} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 shrink-0 text-blue" strokeWidth={2.5} />
                <span className="text-[13px] font-medium text-foreground">
                  {mod.name}
                </span>
                <span className="text-[12px] text-muted">— {mod.tagline}</span>
                <Icon className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-2" strokeWidth={1.5} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ─── Enterprise card ──────────────────────────────────────────────────────────

function EnterpriseCard() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card px-6 pb-7 pt-6 shadow-[var(--shadow-card)] sm:px-7 sm:pb-8 sm:pt-7">
      <div className="mb-3 flex h-7 items-center">
        <span className="inline-flex rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-2">
          Enterprise
        </span>
      </div>

      <h3 className="text-lg font-bold tracking-tight text-foreground">Custom scope</h3>
      <p className="mt-1 text-sm leading-snug text-muted">
        Large teams, custom SLAs, on-premise options, and procurement-friendly contracts.
      </p>

      <div className="mt-3 inline-flex w-fit rounded-full border border-border/80 bg-surface-2/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted">
        30+ users · bespoke
      </div>

      <div className="mt-5 mb-1">
        <div className="text-4xl font-bold tracking-tight text-foreground">Custom</div>
        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-2">
          Scoped after discovery
        </p>
      </div>

      <div className="mb-5 mt-2 min-h-[1.75rem]" aria-hidden />

      <Link
        href="/contact"
        className="mb-6 flex h-11 w-full items-center justify-center rounded-xl border border-border bg-card text-sm font-semibold text-foreground transition-colors hover:border-blue/30 hover:bg-blue-light"
      >
        Contact us
      </Link>

      <div className="border-t border-border pt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">
          What's included
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "All Business OS modules",
            "Custom SLAs & uptime commitments",
            "Dedicated success partner",
            "On-site training options",
            "Custom integrations",
          ].map((feat) => (
            <li key={feat} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 shrink-0 text-muted-2" strokeWidth={2.5} />
              <span className="text-[13px] font-medium text-foreground">{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function PricingClient() {
  return (
    <>
      <MarketingPageView eventName="pricing_view" />

      {/* ── 1. Individual modules ─────────────────────────────────────────── */}
      <section aria-labelledby="modules-heading" className="space-y-6 md:space-y-8">
        <div className="text-center">
          <h2 id="modules-heading" className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Pick exactly what you need
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Each module is independently purchasable. No bundle required.
          </p>
        </div>

        <PricingModuleGrid />
      </section>

      {/* ── 2. Bundles + Enterprise ───────────────────────────────────────── */}
      <section aria-labelledby="bundles-heading" className="space-y-6 md:space-y-8">
        <div className="text-center">
          <h2 id="bundles-heading" className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Or save with a bundle
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Pre-packaged combinations at a better effective rate than buying separately.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
          <EnterpriseCard />
        </div>

        {/* Extra-users note */}
        <p className="text-center text-xs font-medium leading-relaxed text-muted-2">
          Additional users, locations, and integrations available on all plans.{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-foreground">
            Talk to us
          </Link>{" "}
          for a custom quote.
        </p>
      </section>

      {/* ── 3. Billing note ───────────────────────────────────────────────── */}
      <aside
        className="mx-auto mt-2 max-w-3xl rounded-xl border border-border bg-card/80 px-4 py-3 text-center text-xs leading-relaxed text-muted shadow-sm sm:px-5 sm:text-sm"
        aria-label="Billing and compliance information"
      >
        <p className="font-medium text-foreground">Billing &amp; compliance</p>
        <p className="mt-1">All prices exclude GST. GST (18%) applied for India billing (SAC 998314).</p>
        <p className="mt-1 hidden sm:block">Annual plans include a pro-rated refund if cancelled within 30 days.</p>
        <p className="mt-1 hidden sm:block">Data export is available for 30 days after cancellation.</p>
        <p className="mt-2 text-muted-2">
          By booking a demo or creating an account, you agree to our{" "}
          <Link href="/terms" className="font-medium text-teal underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-teal underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </aside>

      {/* ── 4. Trust signals ──────────────────────────────────────────────── */}
      <ZeroClientTrustSection context="pricing" className="mx-auto mt-10 max-w-5xl md:mt-12" />

      {/* ── 5. Feature comparison table (desktop only) ────────────────────── */}
      <div className="hidden md:block">
        <PricingFeatureComparison />
      </div>

      {/* ── 6. Industry fit + Compare ─────────────────────────────────────── */}
      <div className="mx-auto mb-12 grid max-w-5xl gap-4 sm:gap-5 md:mb-14 md:grid-cols-2 md:gap-6">
        <section
          aria-labelledby="pricing-industry-fit-heading"
          className="float-card flex flex-col rounded-2xl border border-border/90 bg-card p-5 shadow-[var(--shadow-float)] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-blue-light text-blue"
              aria-hidden
            >
              <Factory className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">Explore</p>
              <h2 id="pricing-industry-fit-heading" className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
                Industry fit
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
            The right module mix depends on how your business operates. Pick the vertical closest to yours — we map
            modules and rollout scope from there.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-1.5" role="list">
            {getPublicIndustries().map((ind) => {
              const Icon = ind.icon;
              return (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className={cn(
                      "group flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface-2/40 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors",
                      "hover:border-blue/25 hover:bg-blue-light/60 active:bg-surface-2",
                      linkRowFocus,
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card text-blue">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="truncate">{ind.name}</span>
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="pricing-compare-heading"
          className="float-card flex flex-col rounded-2xl border border-border/90 bg-card p-5 shadow-[var(--shadow-float)] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-blue-light text-blue"
              aria-hidden
            >
              <Scale className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">Evaluate</p>
              <h2 id="pricing-compare-heading" className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
                Compare platforms
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
            Evaluating Zoho, Tally, Odoo, or lightweight business apps? Read workflow-level comparisons, then book a demo when
            you are ready.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-1.5" role="list">
            {COMPARE_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface-2/40 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors",
                    "hover:border-blue/25 hover:bg-blue-light/60 active:bg-surface-2",
                    linkRowFocus,
                  )}
                >
                  <span className="min-w-0 truncate">{label}</span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ── 7. ROI snapshot ───────────────────────────────────────────────── */}
      <section className="relative mx-auto mb-20 max-w-4xl overflow-hidden rounded-2xl border border-[#EAEAEA] bg-gradient-to-b from-card to-[#FAFBFF] p-6 text-left shadow-[0_10px_35px_rgba(15,23,42,0.06)] md:p-8">
        <BackgroundComponents variant="cool" intensity="subtle" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Text variant="label-uppercase" className="mb-2">
            ROI snapshot
          </Text>
          <Text variant="heading-1" as="h2" className="text-[clamp(1.75rem,2.4vw,2.375rem)] leading-tight text-foreground">
            Where your money comes back
          </Text>

          <div className="mt-6 grid gap-3 md:gap-3.5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-card/90 px-4 py-3">
              <p className="text-sm font-medium text-foreground md:text-base">Reduce stockouts</p>
              <p className="text-sm font-semibold text-blue md:text-base">save ₹2–3L/year</p>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-card/90 px-4 py-3">
              <p className="text-sm font-medium text-foreground md:text-base">Faster lead follow-ups</p>
              <p className="text-sm font-semibold text-blue md:text-base">+20–30% conversions</p>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-card/90 px-4 py-3">
              <p className="text-sm font-medium text-foreground md:text-base">Automated reconciliation</p>
              <p className="text-sm font-semibold text-blue md:text-base">save 40+ hrs/month</p>
            </div>
          </div>

          <Text variant="body-sm" className="mt-5 text-muted">
            Most teams recover the cost within the first few months of operations.
          </Text>
          <Text variant="body-sm" className="mt-2 text-muted-2">
            Illustrative ROI estimates based on observed implementation patterns; actual outcomes vary by process maturity,
            team adoption, and baseline operational metrics.
          </Text>
        </div>
      </section>
    </>
  );
}

export default PricingClient;
