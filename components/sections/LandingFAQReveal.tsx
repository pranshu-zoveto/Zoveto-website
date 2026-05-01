"use client";

import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { FAQSections, type FAQCategory } from "@/components/ui/faq-sections";

type Props = {
  categories: FAQCategory[];
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  defaultOpenIndex?: number;
};

export function LandingFAQReveal({
  categories,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
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
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          defaultOpenIndex={defaultOpenIndex}
        />
      </div>
    </RevealOnScroll>
  );
}
