import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import {
  SPARE_PARTS_PHASE1_FEATURES,
  SPARE_PARTS_PHASE1_FEATURES_INTRO,
  SPARE_PARTS_PHASE1_FAQS,
  SPARE_PARTS_PHASE1_SECTIONS,
} from "@/lib/phase1-spare-parts-industry";
import { getWhatsAppFloatHref } from "@/lib/whatsapp-float";

const btnOutline =
  "inline-flex min-h-[48px] items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SparePartsPhase1Sections() {
  const waHref = getWhatsAppFloatHref();

  return (
    <div className="mt-12 space-y-16 border-t border-border pt-12 md:mt-16 md:space-y-20 md:pt-16">
      {SPARE_PARTS_PHASE1_SECTIONS.map((section, idx) => (
        <section key={section.h2} aria-labelledby={`sp-p1-s${idx}`}>
          <Text variant="heading-1" as="h2" id={`sp-p1-s${idx}`} className="mb-6 text-xl text-foreground md:text-2xl">
            {section.h2}
          </Text>
          {section.paragraphs.length > 0 ? (
            <div className="max-w-3xl space-y-4">
              {section.paragraphs.map((p, i) => (
                <Text key={i} variant="body-base" className="text-pretty text-muted">
                  {p}
                </Text>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <section aria-labelledby="spare-parts-features">
        <Text variant="heading-1" as="h2" id="spare-parts-features" className="mb-6 text-xl text-foreground md:text-2xl">
          Capabilities to prioritise on this vertical
        </Text>
        <Text variant="body-base" className="mb-6 max-w-3xl text-pretty text-muted">
          {SPARE_PARTS_PHASE1_FEATURES_INTRO}
        </Text>
        <ul className="max-w-3xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-blue md:text-base">
          {SPARE_PARTS_PHASE1_FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="spare-parts-faq">
        <Text variant="heading-1" as="h2" id="spare-parts-faq" className="mb-6 text-xl text-foreground md:text-2xl">
          Frequently asked questions
        </Text>
        <div className="max-w-3xl space-y-8">
          {SPARE_PARTS_PHASE1_FAQS.map((f) => (
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

      <section aria-labelledby="spare-parts-internal">
        <Text variant="heading-1" as="h2" id="spare-parts-internal" className="mb-4 text-xl text-foreground md:text-2xl">
          Related pages
        </Text>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-blue">
          <li>
            <Link href="/compare/tally-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
              Tally vs Zoveto for warehouse-led Indian SMB ERP decisions
            </Link>
          </li>
          <li>
            <Link href="/compare/zoho-vs-zoveto" className="font-medium text-blue underline-offset-4 hover:underline">
              Zoho vs Zoveto for multi-app stack vs one operating record
            </Link>
          </li>
          <li>
            <Link
              href="/case-studies/rock-tear-parts"
              className="font-medium text-blue underline-offset-4 hover:underline"
            >
              Rock Tear Parts case study: before and after execution discipline
            </Link>
          </li>
          <li>
            <Link href="/blog/erp-cost-in-india" className="font-medium text-blue underline-offset-4 hover:underline">
              ERP cost in India: what drives SMB total cost of ownership
            </Link>
          </li>
          <li>
            <Link href="/" className="font-medium text-blue underline-offset-4 hover:underline">
              Zoveto home: Company Operating System for Indian operations businesses
            </Link>
          </li>
        </ul>
      </section>

      <div className="rounded-2xl border border-blue/25 bg-blue/[0.06] p-6 md:p-10">
        <Text variant="heading-1" as="h2" className="mb-4 text-xl text-foreground md:text-2xl">
          Book a 20-minute demo
        </Text>
        <Text variant="body-base" className="mb-6 max-w-2xl text-pretty text-muted">
          Walk spare parts workflows with a Zoveto operator: quote, reserve, pick, dispatch, invoice, and collections
          on one posted record.
        </Text>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/contact#demo">
            <Button variant="primary" size="lg" className="min-h-[48px] w-full sm:w-auto">
              Book a 20-min demo
            </Button>
          </Link>
          <Link href={waHref} target="_blank" rel="noopener noreferrer" className={btnOutline}>
            WhatsApp the team
          </Link>
        </div>
      </div>
    </div>
  );
}
