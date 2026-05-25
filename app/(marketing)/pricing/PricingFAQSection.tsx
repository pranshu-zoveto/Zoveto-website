"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type PricingFAQItem = {
  question: string;
  answer: string;
};

type PricingFAQSectionProps = {
  faqData: PricingFAQItem[];
};

export function PricingFAQSection({ faqData }: PricingFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqIds = useMemo(
    () =>
      faqData.map((_, index) => ({
        triggerId: `pricing-faq-trigger-${index}`,
        panelId: `pricing-faq-panel-${index}`,
      })),
    [faqData]
  );

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
            <Link href="/contact">
              <Button variant="outline" size="lg" className="gap-2 px-8">
                Talk to implementation expert
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const ids = faqIds[index];

            return (
              <article
                key={item.question}
                className={`rounded-2xl border bg-white p-5 transition-[transform,box-shadow,border-color] duration-200 ease-out md:p-6 ${
                  isOpen ? "border-blue/45 shadow-sm" : "border-[#E5E7EB]"
                } hover:-translate-y-0.5 hover:border-[#D1D5DB] hover:shadow-sm`}
              >
                <button
                  id={ids.triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={ids.panelId}
                  onClick={() => setOpenIndex(index)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="text-[16px] font-semibold leading-snug text-foreground md:text-[18px]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center text-foreground"
                  >
                    <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                    <span
                      className={`absolute h-3.5 w-[1.5px] rounded-full bg-current transition-all transition-duration-[250ms] ease-out ${
                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={ids.panelId}
                  role="region"
                  aria-labelledby={ids.triggerId}
                  className={`grid overflow-hidden transition-[grid-template-rows] transition-duration-[250ms] ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`pt-3 text-[14px] leading-relaxed text-gray-600 transition-all transition-duration-[250ms] ease-out md:text-[15px] ${
                        isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Text variant="heading-2" as="h3" className="text-foreground">
            Still have questions?
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Talk to expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingFAQSection;
