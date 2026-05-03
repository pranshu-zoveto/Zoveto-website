import Link from "next/link";
import { ArrowUpRight, BookOpen, ListChecks, Scale } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { buttonVariants } from "@/components/ui/button-variants";
import { COMPARE_PAGES, COMPARE_TABLE_ROW_COUNT, type ComparePage } from "@/lib/compare-pages";
import { cn } from "@/lib/utils";

function competitorAccent(competitor: string): { chip: string; ring: string; foot: string } {
  const c = competitor.toLowerCase();
  if (c.includes("zoho"))
    return {
      chip: "border-teal/25 bg-teal-dim text-teal",
      ring: "hover:border-teal/35",
      foot: "group-hover:text-teal",
    };
  if (c.includes("tally"))
    return {
      chip: "border-blue/25 bg-blue-light text-blue",
      ring: "hover:border-blue/40",
      foot: "group-hover:text-blue",
    };
  if (c.includes("odoo"))
    return {
      chip: "border-border bg-surface-2 text-foreground",
      ring: "hover:border-foreground/25",
      foot: "group-hover:text-foreground",
    };
  if (c.includes("quickbooks"))
    return {
      chip: "border-emerald-800/20 bg-emerald-50 text-emerald-950",
      ring: "hover:border-emerald-800/35",
      foot: "group-hover:text-emerald-900",
    };
  if (c.includes("sap"))
    return {
      chip: "border-amber-900/20 bg-amber-50 text-amber-950",
      ring: "hover:border-amber-900/35",
      foot: "group-hover:text-amber-950",
    };
  return {
    chip: "border-border bg-surface text-muted",
    ring: "hover:border-border",
    foot: "group-hover:text-muted",
  };
}

function CompareCard({ page }: { page: ComparePage }) {
  const { chip, ring, foot } = competitorAccent(page.competitor);
  const deep = Boolean(page.phase1);

  return (
    <li className="h-full min-h-0">
      <Link
        href={`/compare/${page.slug}`}
        className={cn(
          "group flex h-full min-h-[17rem] flex-col rounded-2xl border border-border/90 bg-card/95 p-6 transition-[box-shadow,border-color,transform] duration-200 ease-out md:min-h-0 md:p-7",
          "hover:-translate-y-px hover:shadow-md motion-reduce:transform-none",
          ring
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">{page.hubLens}</p>
            <span
              className={cn(
                "inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                deep ? "border-blue/25 bg-blue-light/90 text-blue" : "border-border bg-surface text-muted-2"
              )}
            >
              {deep ? "Long-form guide" : "Matrix + verdict"}
            </span>
          </div>
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold tabular-nums tracking-tight",
              chip
            )}
            aria-hidden
          >
            {page.competitor.slice(0, 1)}
          </span>
        </div>

        <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
          <span className="text-muted">Zoveto vs</span>{" "}
          <span className="text-foreground transition-colors group-hover:text-blue">{page.competitor}</span>
        </h3>

        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted">{page.hubTeaser}</p>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2 border-t border-border/60 pt-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-muted-2">
            <ListChecks className="size-3.5 shrink-0 text-muted" aria-hidden />
            {COMPARE_TABLE_ROW_COUNT} decision rows
          </span>
          <span className={cn("inline-flex items-center gap-1 font-medium text-muted transition-colors", foot)}>
            Read {page.competitor} guide
            <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function CompareIndexHub() {
  const count = COMPARE_PAGES.length;

  return (
    <div className="relative z-10">
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <header className="grid gap-10 pb-14 md:pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-24">
          <div className="lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-medium text-muted shadow-sm">
                <Scale className="size-3.5 text-blue" aria-hidden />
                Vendor-neutral framing
              </span>
              <span className="text-xs font-medium tabular-nums text-muted-2">{count} guides</span>
            </div>

            <Text variant="label-uppercase" className="mb-3 text-muted-2">
              Compare
            </Text>
            <Text variant="display-2" as="h1" className="mb-5 max-w-[20ch] text-balance text-foreground lg:max-w-none">
              Choose the right operations stack
            </Text>
            <Text variant="body-lg" as="p" className="max-w-prose text-pretty text-muted md:text-[17px] md:leading-relaxed">
              Side-by-side guides for teams who cannot afford vague “ERP vs ERP” marketing. Each page states where the
              alternative is legitimately strong—and where execution, inventory, and handoffs diverge from how Zoveto
              is built.
            </Text>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="rounded-2xl border border-border/80 bg-surface/70 p-6 md:p-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-2">
                <BookOpen className="size-3.5 text-blue" aria-hidden />
                How to read these
              </div>
              <ul className="space-y-2.5 text-sm leading-snug text-muted">
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-blue/80" aria-hidden />
                  <span>Start with positioning and the decision matrix—same row names on every guide so you can scan.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-blue/80" aria-hidden />
                  <span>Then read workflow and “who should choose which”—we credit competitor strengths, not only gaps.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-blue/80" aria-hidden />
                  <span>Long-form guides add FAQs and structured answers for search and buying committees.</span>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl" aria-labelledby="compare-platforms-heading">
          <div className="mb-8 flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Text
                id="compare-platforms-heading"
                variant="heading-2"
                as="h2"
                className="text-lg font-semibold tracking-tight text-foreground md:text-xl"
              >
                Pick a platform
              </Text>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                Every tile below opens a full comparison. Copy is written per vendor so you are not reading the same
                paragraph with a different logo.
              </p>
            </div>
          </div>

          <ul className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3">
            {COMPARE_PAGES.map((page) => (
              <CompareCard key={page.slug} page={page} />
            ))}
          </ul>
        </section>

        <aside className="mx-auto mt-16 max-w-3xl rounded-2xl border border-dashed border-border/90 bg-surface/40 px-6 py-8 md:mt-20 md:px-10 md:py-10">
          <Text variant="heading-2" as="h2" className="mb-2 text-lg text-foreground">
            Evaluating something else?
          </Text>
          <p className="mb-6 max-w-prose text-sm leading-relaxed text-muted md:text-[15px]">
            If your stack is not listed, we still map Zoveto to how you move stock, cash, and orders today. Send what
            you run—we reply with fit notes, not a generic deck.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "min-h-[48px] w-full justify-center sm:w-auto")}
            >
              Talk to us about your stack
            </Link>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-[48px] w-full justify-center sm:w-auto")}
            >
              View pricing
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
