import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { DirectAnswerLead } from "@/components/aeo/DirectAnswerLead";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import type { ComparePage } from "@/lib/compare-pages";
import { comparePageH1, getComparePageAeoLead, getComparePageFaqs } from "@/lib/compare-pages";
import type { Phase1CompareContent } from "@/lib/phase1-compare-zoho-tally";
import { getWhatsAppFloatHref } from "@/lib/whatsapp-float";

const btnPrimary =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const btnOutline =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const RELATED_COMPARE = [
  { slug: "zoho-vs-zoveto", label: "Zoho vs Zoveto" },
  { slug: "tally-vs-zoveto", label: "Tally vs Zoveto" },
  { slug: "odoo-vs-zoveto", label: "Odoo vs Zoveto" },
] as const;

function CompareCrossLinks({ currentSlug }: { currentSlug: string }) {
  const currentLabel = RELATED_COMPARE.find((l) => l.slug === currentSlug)?.label ?? "this comparison";
  const others = RELATED_COMPARE.filter((l) => l.slug !== currentSlug);
  return (
    <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
      <p>
        Unlike traditional accounting tools like{" "}
        <Link href="/compare/tally-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
          Tally
        </Link>
        , modular suites like{" "}
        <Link href="/compare/odoo-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
          Odoo
        </Link>
        , or CRM-led stacks like{" "}
        <Link href="/compare/zoho-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
          Zoho
        </Link>
        , Zoveto is positioned as one operating record for execution — not a single app silo.
      </p>
      <p>
        You are reading <span className="font-medium text-foreground">{currentLabel}</span>. Also see{" "}
        {others.map((item, i) => (
          <span key={item.slug}>
            {i > 0 && (i === others.length - 1 ? " and " : ", ")}
            <Link href={`/compare/${item.slug}`} className="font-medium text-blue underline-offset-4 hover:underline">
              {item.label}
            </Link>
          </span>
        ))}{" "}
        or the full{" "}
        <Link href="/compare" className="font-medium text-blue underline-offset-4 hover:underline">
          compare hub
        </Link>
        .
      </p>
    </div>
  );
}

function FeatureComparisonTable({ page }: { page: ComparePage }) {
  return (
    <section className="mb-12 md:mb-16" aria-labelledby="compare-table-heading">
      <Text variant="heading-1" as="h2" id="compare-table-heading" className="mb-6 text-xl text-foreground md:text-2xl">
        Feature comparison
      </Text>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_var(--border)]">
            <tr className="border-b border-border bg-card">
              <th
                scope="col"
                className="bg-card px-4 py-3 text-left text-sm font-semibold text-foreground md:px-5 md:py-4"
              >
                Feature
              </th>
              <th
                scope="col"
                className="bg-blue-light/40 px-4 py-3 text-left text-sm font-semibold text-blue md:px-5 md:py-4"
              >
                Zoveto
              </th>
              <th
                scope="col"
                className="bg-card px-4 py-3 text-left text-sm font-semibold text-muted-2 md:px-5 md:py-4"
              >
                {page.competitor}
              </th>
            </tr>
          </thead>
          <tbody>
            {page.tableRows.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-foreground md:px-5 md:py-4">{row.name}</td>
                <td
                  className={cn("px-4 py-3 text-sm leading-relaxed text-foreground md:px-5 md:py-4", "bg-blue-light/20")}
                >
                  {row.zoveto}
                </td>
                <td className="px-4 py-3 text-sm leading-relaxed text-muted md:px-5 md:py-4">{row.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Phase1InternalLinks({ slug }: { slug: string }) {
  const otherCompare =
    slug === "tally-vs-zoveto"
      ? { href: "/compare/zoho-vs-zoveto", label: "Zoho vs Zoveto comparison for Indian SMB app stacks" }
      : { href: "/compare/tally-vs-zoveto", label: "Tally vs Zoveto comparison for warehouse-led Indian SMBs" };
  return (
    <section className="mb-12 md:mb-16" aria-labelledby="phase1-internal-links">
      <Text variant="heading-1" as="h2" id="phase1-internal-links" className="mb-4 text-xl text-foreground md:text-2xl">
        Related pages
      </Text>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-blue">
        <li>
          <Link href={otherCompare.href} className="font-medium text-blue underline-offset-4 hover:underline">
            {otherCompare.label}
          </Link>
        </li>
        <li>
          <Link
            href="/industries/spare-parts-trading"
            className="font-medium text-blue underline-offset-4 hover:underline"
          >
            Spare parts trading ERP software for Indian distributors
          </Link>
        </li>
        <li>
          <Link href="/blog/erp-cost-in-india" className="font-medium text-blue underline-offset-4 hover:underline">
            ERP cost in India: what drives price for SMBs
          </Link>
        </li>
        <li>
          <Link href="/" className="font-medium text-blue underline-offset-4 hover:underline">
            Zoveto Company Operating System for Indian SMB operations
          </Link>
        </li>
        <li>
          <Link
            href="/case-studies/rock-tear-parts"
            className="font-medium text-blue underline-offset-4 hover:underline"
          >
            Rock Tear Parts case study: spare parts execution on one system
          </Link>
        </li>
      </ul>
    </section>
  );
}

function CompareDetailPagePhase1({ page, p1 }: { page: ComparePage; p1: Phase1CompareContent }) {
  const demoHref = "/contact#demo";
  const waHref = getWhatsAppFloatHref();

  return (
    <div className="relative">
      <article className="mx-auto max-w-4xl pb-28 lg:max-w-4xl lg:pb-10">
        <header className="mb-10 md:mb-14">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Comparison
          </Text>
          <Text variant="display-2" as="h1" className="mb-5 text-balance text-foreground">
            {p1.h1}
          </Text>
          <DirectAnswerLead text={p1.aeoUnderH1} />
          <Text variant="body-lg" className="mb-8 max-w-3xl text-pretty text-muted">
            {p1.directAnswer}
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={demoHref} className={btnPrimary}>
              Book a 20-min demo
            </Link>
            <Link href={waHref} className={btnOutline} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </Link>
          </div>
        </header>

        <section className="mb-12 md:mb-16" aria-labelledby="problem-india-heading">
          <Text variant="heading-1" as="h2" id="problem-india-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            {p1.problemIndiaHeadline}
          </Text>
          <div className="space-y-4">
            {p1.problemIndiaParagraphs.map((para, i) => (
              <Text key={`p-india-${i}`} variant="body-base" className="max-w-3xl text-pretty text-muted">
                {para}
              </Text>
            ))}
          </div>
        </section>

        <section className="mb-12 md:mb-16" aria-labelledby="solution-heading">
          <Text variant="heading-1" as="h2" id="solution-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            {p1.solutionHeadline}
          </Text>
          <div className="space-y-4">
            {p1.solutionParagraphs.map((para, i) => (
              <Text key={`p-sol-${i}`} variant="body-base" className="max-w-3xl text-pretty text-muted">
                {para}
              </Text>
            ))}
          </div>
        </section>

        <FeatureComparisonTable page={page} />

        <section className="mb-12 md:mb-16" aria-labelledby="use-case-heading">
          <Text variant="heading-1" as="h2" id="use-case-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            {p1.useCaseHeadline}
          </Text>
          <div className="space-y-4">
            {p1.useCaseParagraphs.map((para, i) => (
              <Text key={`p-uc-${i}`} variant="body-base" className="max-w-3xl text-pretty text-muted">
                {para}
              </Text>
            ))}
          </div>
        </section>

        <section className="mb-12 md:mb-16" aria-labelledby="features-heading">
          <Text variant="heading-1" as="h2" id="features-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            {p1.featuresHeadline}
          </Text>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-blue md:text-base">
            {p1.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12 md:mb-16" aria-labelledby="faq-heading">
          <Text variant="heading-1" as="h2" id="faq-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Frequently asked questions
          </Text>
          <div className="space-y-8">
            {p1.faqs.map((f) => (
              <div key={f.question}>
                <Text variant="heading-1" as="h3" className="mb-2 text-base font-semibold text-foreground md:text-lg">
                  {f.question}
                </Text>
                <Text variant="body-base" className="text-pretty text-muted">
                  {f.answer}
                </Text>
              </div>
            ))}
          </div>
        </section>

        <Phase1InternalLinks slug={page.slug} />

        <section
          className="rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 md:p-10"
          aria-labelledby="phase1-cta-heading"
        >
          <Text variant="heading-1" as="h2" id="phase1-cta-heading" className="mb-4 text-xl text-foreground md:text-2xl">
            Book a 20-minute demo
          </Text>
          <Text variant="body-base" className="mb-6 max-w-2xl text-pretty text-muted">
            Walk through quote-to-cash, inventory, and dispatch on one posted record with a Zoveto operator—not a
            generic sales deck.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={demoHref} className={btnPrimary}>
              Book a 20-min demo
            </Link>
            <Link href={waHref} className={btnOutline} target="_blank" rel="noopener noreferrer">
              WhatsApp the team
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">
            <Link href="/pricing" className="font-medium text-blue underline-offset-4 hover:underline">
              View pricing
            </Link>{" "}
            when you are ready to compare plans.
          </p>
        </section>
      </article>

      <aside
        className="pointer-events-none fixed right-6 top-[32%] z-20 hidden w-[min(17rem,calc(100vw-2rem))] lg:block"
        aria-label="Quick actions"
      >
        <div className="pointer-events-auto rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-2">High intent?</p>
          <p className="mb-4 text-sm font-semibold text-foreground">Book a short demo</p>
          <div className="flex flex-col gap-2">
            <Link href={demoHref} className={cn(btnPrimary, "w-full justify-center text-center")}>
              Book 20-min demo
            </Link>
            <Link
              href={waHref}
              className={cn(btnOutline, "w-full justify-center text-center")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </aside>

      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <Link href={demoHref} className={cn(btnPrimary, "min-h-[48px] flex-1 justify-center text-center text-xs sm:text-sm")}>
            Book demo
          </Link>
          <Link
            href={waHref}
            className={cn(btnOutline, "min-h-[48px] flex-1 justify-center text-center text-xs sm:text-sm")}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}

type Props = {
  page: ComparePage;
};

export function CompareDetailPage({ page }: Props) {
  if (page.phase1) {
    return <CompareDetailPagePhase1 page={page} p1={page.phase1} />;
  }

  const h1 = comparePageH1(page.competitor);
  const demoHref = page.hero.primaryCta.href;
  const setupHref = page.hero.secondaryCta.href;

  return (
    <div className="relative">
      <article className="mx-auto max-w-4xl pb-28 lg:max-w-4xl lg:pb-10">
        {/* 1. Hero */}
        <header className="mb-10 md:mb-14">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Comparison
          </Text>
          <Text variant="display-2" as="h1" className="mb-5 text-balance text-foreground">
            {h1}
          </Text>
          <DirectAnswerLead text={getComparePageAeoLead(page)} />
          <Text variant="body-lg" className="mb-8 max-w-3xl text-pretty text-muted">
            {page.hero.subtext}
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={page.hero.primaryCta.href} className={btnPrimary}>
              {page.hero.primaryCta.label}
            </Link>
            <Link href={page.hero.secondaryCta.href} className={btnOutline}>
              {page.hero.secondaryCta.label}
            </Link>
          </div>
        </header>

        {/* 2. Quick summary */}
        <section className="mb-12 md:mb-16" aria-labelledby="quick-summary-heading">
          <Text variant="heading-1" as="h2" id="quick-summary-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Quick summary
          </Text>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-2xl border border-blue/25 bg-blue-light/30 p-6 md:p-8">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-blue">Zoveto</div>
              <ul className="space-y-3">
                {page.quickSummary.zoveto.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-2">{page.competitor}</div>
              <ul className="space-y-3">
                {page.quickSummary.competitor.map((line) => (
                  <li key={line.text} className="flex gap-3 text-sm leading-relaxed text-muted">
                    {line.kind === "strength" ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-2" aria-hidden />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red/60" aria-hidden />
                    )}
                    <span className={line.kind === "strength" ? "text-foreground" : ""}>{line.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FeatureComparisonTable page={page} />

        {/* 4. Who should use what */}
        <section className="mb-12 md:mb-16" aria-labelledby="who-should-use-heading">
          <Text variant="heading-1" as="h2" id="who-should-use-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Who should use what
          </Text>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 md:p-8">
              <Text variant="heading-1" as="h3" className="mb-4 text-lg text-foreground">
                Choose Zoveto if:
              </Text>
              <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-blue">
                {page.whoShouldUse.chooseZoveto.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
              <Text variant="heading-1" as="h3" className="mb-4 text-lg text-foreground">
                Choose {page.competitor} if:
              </Text>
              <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-muted-2">
                {page.whoShouldUse.chooseCompetitor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Real workflow difference */}
        <section className="mb-12 md:mb-16" aria-labelledby="workflow-heading">
          <Text variant="heading-1" as="h2" id="workflow-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Real workflow difference
          </Text>
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue">Zoveto</div>
              <Text variant="body-base" className="text-pretty text-muted">
                {page.workflow.zoveto}
              </Text>
              <p className="mt-3 font-mono text-xs text-muted-2">
                Order → Inventory → Warehouse → Dispatch → Invoice → tracking (single system)
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-2">{page.competitor}</div>
              <Text variant="body-base" className="text-pretty text-muted">
                {page.workflow.competitor}
              </Text>
              <p className="mt-3 font-mono text-xs text-muted-2">
                Often multiple steps, apps, or modules — coordination is your responsibility
              </p>
            </div>
          </div>
          {page.workflowImage ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <Image
                src={page.workflowImage.src}
                alt={page.workflowImage.alt}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}
          <CompareCrossLinks currentSlug={page.slug} />
        </section>

        {/* 6. Limitations */}
        <section className="mb-12 md:mb-16" aria-labelledby="limitations-heading">
          <Text variant="heading-1" as="h2" id="limitations-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Where Zoveto is not the best fit (yet)
          </Text>
          <ul className="list-disc space-y-3 rounded-2xl border border-border bg-muted/20 p-6 pl-9 text-sm leading-relaxed text-muted md:p-8 md:pl-10 marker:text-foreground">
            {page.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 7. Built and running (proof) */}
        <section className="mb-12 md:mb-16" aria-labelledby="proof-heading">
          <Text variant="heading-1" as="h2" id="proof-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Built and running
          </Text>
          <div className="rounded-2xl border border-teal/25 bg-teal-dim/25 p-6 md:p-8">
            <Text variant="body-base" className="text-pretty text-muted">
              Zoveto is already deployed as a full operations system — not a slide-deck concept. Live workspaces use it
              for day-to-day execution across stock, orders, and fulfilment.
            </Text>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-medium text-foreground marker:text-teal">
              <li>Inventory tracking</li>
              <li>Order execution</li>
              <li>Dispatch workflows</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-foreground">This is not a conceptual product.</p>
          </div>
        </section>

        {/* 8. Final verdict */}
        <section className="mb-12 md:mb-16" aria-labelledby="verdict-heading">
          <Text variant="heading-1" as="h2" id="verdict-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Final verdict
          </Text>
          <div className="space-y-4 text-pretty">
            {page.finalVerdict.map((para) => (
              <Text key={para} variant="body-lg" className="text-muted">
                {para}
              </Text>
            ))}
          </div>
        </section>

        <section className="mb-12 md:mb-16" aria-labelledby="compare-faq-heading">
          <Text variant="heading-1" as="h2" id="compare-faq-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Frequently asked questions
          </Text>
          <dl className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            {getComparePageFaqs(page).map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 9. Switch trigger */}
        <section className="mb-12 md:mb-16" aria-labelledby="switch-trigger-heading">
          <Text variant="heading-1" as="h2" id="switch-trigger-heading" className="mb-6 text-xl text-foreground md:text-2xl">
            Why businesses switch from {page.competitor} to Zoveto
          </Text>
          <ul className="space-y-3 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-muted md:p-8">
            <li className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">Disconnected tools</span> → one unified system
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">Manual workflows</span> → structured execution
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">Limited visibility</span> → real-time operations tracking
              </span>
            </li>
          </ul>
        </section>

        {/* 10. CTA */}
        <section
          className="rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 md:p-10"
          aria-labelledby="compare-cta-heading"
        >
          <Text variant="heading-1" as="h2" id="compare-cta-heading" className="mb-4 text-xl text-foreground md:text-2xl">
            {page.ctaClosing.headline}
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={page.ctaClosing.primaryCta.href} className={btnPrimary}>
              {page.ctaClosing.primaryCta.label}
            </Link>
            <Link href={page.ctaClosing.secondaryCta.href} className={btnOutline}>
              {page.ctaClosing.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">
            <Link href="/pricing" className="font-medium text-blue underline-offset-4 hover:underline">
              View pricing
            </Link>{" "}
            when you are ready to compare plans.
          </p>
        </section>
      </article>

      {/* Desktop: floating CTA */}
      <aside
        className="pointer-events-none fixed right-6 top-[32%] z-20 hidden w-[min(17rem,calc(100vw-2rem))] lg:block"
        aria-label="Quick actions"
      >
        <div className="pointer-events-auto rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-2">High intent?</p>
          <p className="mb-4 text-sm font-semibold text-foreground">See Zoveto in action</p>
          <div className="flex flex-col gap-2">
            <Link href={demoHref} className={cn(btnPrimary, "w-full justify-center text-center")}>
              See Zoveto in Action
            </Link>
            <Link href={setupHref} className={cn(btnOutline, "w-full justify-center text-center")}>
              Request Setup
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile: sticky bottom CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <Link href={demoHref} className={cn(btnPrimary, "min-h-[48px] flex-1 justify-center text-center text-xs sm:text-sm")}>
            See Zoveto in action
          </Link>
          <Link href={setupHref} className={cn(btnOutline, "min-h-[48px] flex-1 justify-center text-center text-xs sm:text-sm")}>
            Request setup
          </Link>
        </div>
      </div>
    </div>
  );
}
