"use client";

import React, { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { bandIndexForSection } from "@/lib/marketing-bands";
import { cn } from "@/lib/utils";
import { FAQ_HUB_CATEGORIES, filterFaqHubByQuery, getAllFaqHubItems, type FaqHubCategory } from "@/lib/faq-hub";

function TocBrowseColumn({ categories }: { categories: readonly FaqHubCategory[] }) {
  return (
    <nav className="space-y-0.5" aria-label="FAQ categories">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-2">Browse</p>
      {categories.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-sm font-medium text-foreground/90 transition-[background-color,border-color] hover:border-border hover:bg-surface/80"
        >
          <span className="min-w-0 leading-snug">{c.title}</span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="rounded-md border border-border/80 bg-surface px-2 py-0.5 text-xs font-semibold tabular-nums text-muted-2 transition-colors group-hover:border-blue/20 group-hover:text-foreground">
              {c.items.length}
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-2 opacity-0 transition-opacity group-hover:opacity-100"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </a>
      ))}
    </nav>
  );
}

function TocMobileChips({ categories }: { categories: readonly FaqHubCategory[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 pt-0.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="max-w-[min(14rem,78vw)] shrink-0 truncate rounded-xl border border-border bg-card px-3.5 py-2.5 text-left text-xs font-semibold leading-tight text-foreground shadow-sm transition-colors hover:border-blue/30 hover:bg-blue-light/25"
        >
          {c.title}
        </a>
      ))}
    </div>
  );
}

function FilterStatus({
  query,
  totalFiltered,
  totalAll,
}: {
  query: string;
  totalFiltered: number;
  totalAll: number;
}) {
  if (!query.trim()) return null;
  return (
    <p className="text-xs leading-relaxed text-muted md:text-[13px]" role="status">
      {totalFiltered === 0 ? (
        <span className="text-foreground/90">No matches for that filter.</span>
      ) : (
        <>
          <span className="font-semibold text-foreground">{totalFiltered}</span>
          <span className="text-muted-2"> of </span>
          <span className="tabular-nums text-muted-2">{totalAll}</span>
          <span className="text-muted-2"> answers shown</span>
        </>
      )}
    </p>
  );
}

export function FaqHubClient() {
  const [rawQuery, setRawQuery] = useState("");
  const query = useDeferredValue(rawQuery);
  const filtered = useMemo(() => filterFaqHubByQuery(query), [query]);
  const totalAll = getAllFaqHubItems().length;
  const totalFiltered = filtered.reduce((n, c) => n + c.items.length, 0);
  const navCategories = query.trim() ? filtered : FAQ_HUB_CATEGORIES.map((c) => ({ ...c, items: [...c.items] }));
  const topicCount = query.trim() ? filtered.length : FAQ_HUB_CATEGORIES.length;

  return (
    <div className="relative z-10">
      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <div className="container mx-auto max-w-content px-4 pb-14 pt-8 sm:px-6 md:pb-20 md:pt-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_min(17.5rem,34%)] lg:items-start lg:gap-14">
            <div className="rounded-2xl border border-border/90 bg-card p-8 shadow-[var(--shadow-float)] md:p-10 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-2">Help center</p>
              <h1 className="mt-4">
                <span className="block text-[clamp(1.65rem,3.2vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-foreground">
                  Frequently asked
                </span>
                <span className="mt-1 block text-[clamp(1.85rem,3.8vw,2.85rem)] font-semibold leading-[1.08] tracking-tight text-blue">
                  questions
                </span>
              </h1>
              <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-[17px] md:leading-relaxed">
                Answers for finance, ops, and commercial leads evaluating Zoveto in India—same wording we ship in FAQ
                structured data.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">Topics</p>
                  <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-foreground">{topicCount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">Answers</p>
                  <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                    {query.trim() ? totalFiltered : totalAll}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">Scope</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground">India · SMB ops</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:pt-2">
              <div>
                <label htmlFor="faq-hub-search" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-2">
                  Search
                </label>
                <div className="relative mt-2 rounded-xl border border-border bg-surface/60 p-1 shadow-sm transition-shadow focus-within:border-blue/35 focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--blue)_12%,transparent)]">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" aria-hidden />
                  <input
                    id="faq-hub-search"
                    type="search"
                    value={rawQuery}
                    onChange={(e) => setRawQuery(e.target.value)}
                    placeholder="GST, stock, CRM, payroll…"
                    aria-label="Filter FAQ questions and answers"
                    className={cn(
                      "h-12 w-full rounded-lg border-0 bg-card pl-11 pr-11 text-[15px] text-foreground shadow-none outline-none ring-0",
                      "placeholder:text-muted-2",
                    )}
                  />
                  {rawQuery ? (
                    <button
                      type="button"
                      onClick={() => setRawQuery("")}
                      className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-2 transition-colors hover:bg-surface hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" strokeWidth={2} />
                    </button>
                  ) : null}
                </div>
                <div className="mt-3">
                  <FilterStatus query={query} totalFiltered={totalFiltered} totalAll={totalAll} />
                </div>
              </div>

              <div className="hidden rounded-2xl border border-border/90 bg-card/80 p-5 shadow-sm lg:block">
                <TocBrowseColumn categories={navCategories} />
              </div>
            </div>
          </div>
        </div>
      </FluidMarketingSection>

      <div
        className={cn(
          "sticky top-[4.25rem] z-30 border-y border-border bg-background/96 py-3 backdrop-blur-md md:top-[4.5rem] lg:hidden",
        )}
      >
        <div className="container mx-auto max-w-content px-4 sm:px-6">
          <div className="mb-2 flex items-end justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-2">Sections</p>
            <FilterStatus query={query} totalFiltered={totalFiltered} totalAll={totalAll} />
          </div>
          <TocMobileChips categories={navCategories} />
        </div>
      </div>

      <div className="pb-24 md:pb-32">
        {totalFiltered === 0 ? (
          <div className="container mx-auto max-w-content px-4 pt-14 sm:px-6">
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-surface/50 px-8 py-12 text-center">
              <p className="text-base font-semibold text-foreground">Nothing matched</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">Try a shorter keyword or clear the search field.</p>
              <Button type="button" variant="outline" size="default" className="mt-8 min-h-11" onClick={() => setRawQuery("")}>
                Clear search
              </Button>
            </div>
          </div>
        ) : (
          filtered.map((cat, catIndex) => (
            <FluidMarketingSection key={cat.id} band={bandIndexForSection(catIndex + 1)} stackBase>
              <div className="container mx-auto max-w-content px-4 py-14 sm:px-6 md:py-16">
                <section
                  id={cat.id}
                  className="mx-auto max-w-[52rem] scroll-mt-[calc(5.75rem+env(safe-area-inset-top,0px))] lg:max-w-4xl"
                  aria-labelledby={`${cat.id}-heading`}
                >
                  <header className="mb-6 md:mb-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-2">
                      Section {String(catIndex + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`${cat.id}-heading`}
                      className="mt-2 text-pretty text-xl font-semibold tracking-tight text-foreground md:text-2xl md:leading-snug"
                    >
                      {cat.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{cat.items.length} answers</p>
                  </header>

                  <div className="overflow-hidden rounded-2xl border border-border/90 bg-card shadow-[var(--shadow-float)]">
                    <div className="divide-y divide-border">
                      {cat.items.map((item, idx) => (
                        <details key={item.question} className="group">
                          <summary
                            className={cn(
                              "flex cursor-pointer list-none items-start gap-4 px-4 py-4 md:gap-5 md:px-6 md:py-5",
                              "[&::-webkit-details-marker]:hidden",
                              "hover:bg-surface/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue/30",
                            )}
                          >
                            <span className="w-9 shrink-0 pt-0.5 text-right text-[11px] font-bold tabular-nums text-muted-2 md:w-10 md:text-xs">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1 text-left text-[15px] font-semibold leading-snug text-foreground md:text-base">
                              {item.question}
                            </span>
                            <ChevronDown
                              className={cn(
                                "mt-0.5 h-5 w-5 shrink-0 text-muted-2 transition-transform duration-200 ease-out motion-reduce:transition-none",
                                "group-open:rotate-180 group-open:text-blue",
                              )}
                              strokeWidth={2}
                              aria-hidden
                            />
                          </summary>
                          <div className="border-t border-border/70 bg-surface/35 px-4 pb-6 pt-4 md:px-6 md:pb-7 md:pl-[4.5rem] md:pr-8">
                            <p className="max-w-[62ch] text-sm leading-[1.65] text-muted md:text-[15px]">{item.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </FluidMarketingSection>
          ))
        )}

        <div className="container mx-auto max-w-content px-4 pt-14 sm:px-6 md:pt-16">
          <div className="mx-auto max-w-[52rem] rounded-2xl border border-border/90 bg-blue-light/45 p-8 md:p-10 lg:max-w-4xl">
            <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">Talk to the team</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted md:text-base">
              Book a demo mapped to your branches and SKUs, or compare plans once you know the operating fit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full min-h-12 min-w-[11rem] sm:w-auto">
                  Book a demo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full min-h-12 min-w-[11rem] sm:w-auto">
                  View pricing
                </Button>
              </Link>
              <Link
                href="/company-operating-system-india"
                className="text-sm font-semibold text-blue underline-offset-4 hover:underline sm:ml-1"
              >
                What is a Company Operating System?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
