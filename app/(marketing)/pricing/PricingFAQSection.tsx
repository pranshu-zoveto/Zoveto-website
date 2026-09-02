"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { EARLY_ACCESS_CTA_HREF, EARLY_ACCESS_CTA_LABEL, VIEW_PRICING_CTA_HREF, VIEW_PRICING_CTA_LABEL } from "@/lib/marketing-cta";

type PricingFAQItem = {
  question: string;
  answer: string;
};

type PricingFAQSectionProps = {
  faqData: PricingFAQItem[];
};

export function PricingFAQSection({ faqData }: PricingFAQSectionProps) {
  return (
    <>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6">
          <Text variant="label-uppercase">ROI &amp; Transparency</Text>
          <Text variant="display-2" as="h2" className="text-foreground">
            Frequently asked questions
          </Text>
          <Text variant="body-lg" className="max-w-lg text-muted">
            Clear answers before you commit. Built for scaling operations teams.
          </Text>
          <div className="pt-2">
            <Link href={EARLY_ACCESS_CTA_HREF}>
              <Button variant="outline" size="lg" className="gap-2 px-8">
                {EARLY_ACCESS_CTA_LABEL}
              </Button>
            </Link>
          </div>
        </div>

        <FaqAccordion items={faqData} idPrefix="pricing" />
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Text variant="heading-2" as="h3" className="text-foreground">
            Still have questions?
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={EARLY_ACCESS_CTA_HREF}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                {EARLY_ACCESS_CTA_LABEL}
              </Button>
            </Link>
            <Link href={VIEW_PRICING_CTA_HREF}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {VIEW_PRICING_CTA_LABEL}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingFAQSection;
