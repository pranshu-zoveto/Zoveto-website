import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { Text } from "@/components/ui/Text";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { bandIndexForSection } from "@/lib/marketing-bands";
import {
  ROCK_TEAR_FEATURES,
  ROCK_TEAR_FEATURES_INTRO,
  ROCK_TEAR_FAQS,
  ROCK_TEAR_H1,
  ROCK_TEAR_HERO_SUB,
  ROCK_TEAR_META,
  ROCK_TEAR_SECTIONS,
} from "@/lib/phase1-case-rock-tear";
import { canonicalUrl } from "@/lib/site";
import { getWhatsAppFloatHref } from "@/lib/whatsapp-float";
import { cn } from "@/lib/utils";

const btnPrimary =
  "inline-flex min-h-[48px] items-center justify-center rounded-lg bg-blue px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const btnOutline =
  "inline-flex min-h-[48px] items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const path = "/case-studies/rock-tear-parts";

export const metadata: Metadata = {
  title: ROCK_TEAR_META.metaTitle,
  description: ROCK_TEAR_META.metaDescription,
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    type: "website",
    title: ROCK_TEAR_META.metaTitle,
    description: ROCK_TEAR_META.metaDescription,
    url: canonicalUrl(path),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: ROCK_TEAR_META.metaTitle,
    description: ROCK_TEAR_META.metaDescription,
    images: ["/og-image.png"],
  },
};

export default function RockTearCaseStudyPage() {
  const waHref = getWhatsAppFloatHref();
  const url = canonicalUrl(path);

  return (
    <main className="relative overflow-hidden bg-background pt-32 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/case-studies" },
          { name: "Rock Tear Parts", path },
        ]}
      />
      <FAQPageSchema faqs={ROCK_TEAR_FAQS} url={url} />
      <div className="absolute top-0 left-1/2 h-[28rem] w-[min(100vw,75rem)] -translate-x-1/2 rounded-full bg-blue-light/35 blur-3xl -z-0" />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6 pb-24 md:pb-32">
        <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
          <div className="max-w-3xl space-y-6 pb-10 md:pb-14">
            <Text variant="label-uppercase" className="text-blue">
              Case study
            </Text>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
              {ROCK_TEAR_H1}
            </h1>
            <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">{ROCK_TEAR_HERO_SUB}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Link href="/contact#demo" className={cn(btnPrimary, "text-center")}>
                Book a 20-min demo
              </Link>
              <Link href={waHref} className={cn(btnOutline, "text-center")} target="_blank" rel="noopener noreferrer">
                WhatsApp the team
              </Link>
            </div>
          </div>
        </FluidMarketingSection>

        {ROCK_TEAR_SECTIONS.map((section, i) => (
          <FluidMarketingSection key={section.h2} band={bandIndexForSection(i + 1)} overlapTop stackBase>
            <Text variant="heading-1" as="h2" className="mb-6 text-xl text-foreground md:text-2xl">
              {section.h2}
            </Text>
            <div className="max-w-3xl space-y-4">
              {section.paragraphs.map((p, j) => (
                <Text key={j} variant="body-base" className="text-pretty text-muted">
                  {p}
                </Text>
              ))}
            </div>
          </FluidMarketingSection>
        ))}

        <FluidMarketingSection band={bandIndexForSection(ROCK_TEAR_SECTIONS.length + 1)} overlapTop stackBase>
          <Text variant="heading-1" as="h2" className="mb-6 text-xl text-foreground md:text-2xl">
            Capabilities that mattered
          </Text>
          <Text variant="body-base" className="mb-6 max-w-3xl text-pretty text-muted">
            {ROCK_TEAR_FEATURES_INTRO}
          </Text>
          <ul className="max-w-3xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-blue md:text-base">
            {ROCK_TEAR_FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </FluidMarketingSection>

        <FluidMarketingSection band={bandIndexForSection(ROCK_TEAR_SECTIONS.length + 2)} overlapTop stackBase>
          <Text variant="heading-1" as="h2" className="mb-6 text-xl text-foreground md:text-2xl">
            Frequently asked questions
          </Text>
          <div className="max-w-3xl space-y-8">
            {ROCK_TEAR_FAQS.map((f) => (
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
        </FluidMarketingSection>

        <FluidMarketingSection band={bandIndexForSection(ROCK_TEAR_SECTIONS.length + 3)} overlapTop stackBase>
          <Text variant="heading-1" as="h2" className="mb-4 text-xl text-foreground md:text-2xl">
            Related pages
          </Text>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-blue">
            <li>
              <Link href="/industries/spare-parts-trading" className="font-medium text-blue underline-offset-4 hover:underline">
                Spare parts trading ERP software for Indian distributors
              </Link>
            </li>
            <li>
              <Link href="/compare/tally-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
                Tally vs Zoveto comparison for warehouse-led Indian SMBs
              </Link>
            </li>
            <li>
              <Link href="/compare/zoho-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
                Zoho vs Zoveto comparison for unified operations vs app stack
              </Link>
            </li>
            <li>
              <Link href="/blog/erp-cost-in-india" className="font-medium text-blue underline-offset-4 hover:underline">
                ERP cost in India: SMB total cost of ownership guide
              </Link>
            </li>
            <li>
              <Link href="/" className="font-medium text-blue underline-offset-4 hover:underline">
                Zoveto Company Operating System home
              </Link>
            </li>
          </ul>
        </FluidMarketingSection>

        <FluidMarketingSection band={bandIndexForSection(ROCK_TEAR_SECTIONS.length + 4)} overlapTop stackBase>
          <div className="mx-auto max-w-3xl rounded-2xl border border-blue/25 bg-blue/[0.06] px-8 py-12 text-center md:px-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Book a 20-minute demo</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              Walk quote-to-cash and dispatch with a Zoveto operator using your own scenario questions—not a canned
              slide deck.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact#demo" className={btnPrimary}>
                Book a 20-min demo
              </Link>
              <Link href={waHref} className={btnOutline} target="_blank" rel="noopener noreferrer">
                WhatsApp the team
              </Link>
            </div>
          </div>
        </FluidMarketingSection>
      </div>
    </main>
  );
}
