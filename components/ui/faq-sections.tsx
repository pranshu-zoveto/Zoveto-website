"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  label: string;
  items: FAQItem[];
};

type FAQSectionsProps = {
  categories: FAQCategory[];
  eyebrow?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  defaultOpenIndex?: number;
  className?: string;
};

export function FAQSections({
  categories,
  eyebrow = "FAQ",
  title = "Questions operators ask before rollout",
  description = "Plain answers about scope, migration, adoption, ownership, and what changes after go-live.",
  imageSrc = "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop",
  imageAlt = "Team collaborating around business operations",
  defaultOpenIndex = 0,
  className,
}: FAQSectionsProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id ?? "");
  const [openByCategory, setOpenByCategory] = useState<Record<string, number | null>>(() =>
    categories.reduce<Record<string, number | null>>((acc, category) => {
      acc[category.id] =
        defaultOpenIndex >= 0 && defaultOpenIndex < category.items.length ? defaultOpenIndex : null;
      return acc;
    }, {})
  );

  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  const openIndex = activeCategory ? openByCategory[activeCategory.id] ?? null : null;

  const toggleItem = (categoryId: string, index: number) => {
    setOpenByCategory((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  return (
    <div className={cn("mx-auto max-w-5xl", className)}>
      <div className="float-card p-5 sm:p-7 md:p-8">
        <div className="mb-6 flex flex-wrap gap-2.5 md:mb-7" role="tablist" aria-label="FAQ categories">
          {categories.map((category) => {
            const isActive = category.id === activeCategory?.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`faq-panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveCategoryId(category.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  isActive
                    ? "border-blue/30 bg-blue-dim text-blue"
                    : "border-border bg-background text-muted hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-start justify-center gap-8 md:flex-row md:gap-10">
        <Image
          className="h-auto w-full max-w-sm shrink-0 rounded-xl border border-border object-cover"
          src={imageSrc}
          alt={imageAlt}
          width={830}
          height={844}
          loading="lazy"
        />

        <div className="w-full">
          <p className="text-sm font-semibold text-blue">{eyebrow}</p>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight text-foreground md:text-[2.1rem] md:leading-tight">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{description}</p>

          <div className="mt-5" id={`faq-panel-${activeCategory?.id}`} role="tabpanel">
            {activeCategory?.items.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="border-b border-border py-5">
                  <button
                    type="button"
                    onClick={() => toggleItem(activeCategory.id, index)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${activeCategory.id}-${index}`}
                  >
                    <span
                      className={cn(
                        "block text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-foreground transition-all duration-300",
                        isOpen ? "translate-x-0 opacity-100" : "-translate-x-0.5 opacity-95"
                      )}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-0.5 size-[18px] shrink-0 text-foreground transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p
                        id={`faq-answer-${activeCategory.id}-${index}`}
                        className="max-w-[68ch] pt-3 text-base leading-relaxed text-muted"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

