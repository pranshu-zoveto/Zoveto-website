"use client";

import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { FAQSections, type FAQCategory } from "@/components/ui/faq-sections";

type Props = {
  categories: FAQCategory[];
  eyebrow?: string;
  title: string;
  description: string;
  defaultOpenIndex?: number;
};

export function LandingFAQReveal({
  categories,
  eyebrow,
  title,
  description,
  defaultOpenIndex,
}: Props) {
  return (
    <RevealOnScroll>
      <div className="reveal-item">
        <FAQSections
          categories={categories}
          eyebrow={eyebrow}
          title={title}
          description={description}
          defaultOpenIndex={defaultOpenIndex}
        />
      </div>
    </RevealOnScroll>
  );
}
