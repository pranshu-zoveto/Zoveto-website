"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqAccordionItem =
  | { question: string; answer: string }
  | { q: string; a: string };

function normalize(item: FaqAccordionItem): { question: string; answer: string } {
  if ("q" in item) return { question: item.q, answer: item.a };
  return { question: item.question, answer: item.answer };
}

export type FaqAccordionProps = {
  items: readonly FaqAccordionItem[];
  /** Unique prefix for `id` / `aria-controls` (e.g. `compare-vyapar` or `seo-gst-billing`). */
  idPrefix: string;
  /** Which panel is open initially; `-1` = none. Default `0` (first open). */
  defaultOpenIndex?: number;
  className?: string;
};

export function FaqAccordion({ items, idPrefix, defaultOpenIndex = 0, className }: FaqAccordionProps) {
  const entries = items.map(normalize);

  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    if (entries.length === 0) return null;
    if (defaultOpenIndex === -1) return null;
    if (defaultOpenIndex >= 0 && defaultOpenIndex < entries.length) return defaultOpenIndex;
    return 0;
  });

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  if (entries.length === 0) return null;

  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-card", className)}>
      {entries.map((entry, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${idPrefix}-faq-${index}-trigger`;
        const panelId = `${idPrefix}-faq-${index}-panel`;

        return (
          <div key={`${idPrefix}-${index}-${entry.question.slice(0, 24)}`} className="px-4 py-1 md:px-5">
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-base">
                {entry.question}
              </span>
              <ChevronDown
                className={cn(
                  "mt-0.5 size-5 shrink-0 text-muted-2 transition-transform duration-200 ease-out",
                  isOpen && "rotate-180 text-foreground"
                )}
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="prose-justify pb-4 pr-1 text-sm leading-relaxed text-muted md:text-[15px] md:leading-[1.65]">
                  {entry.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
