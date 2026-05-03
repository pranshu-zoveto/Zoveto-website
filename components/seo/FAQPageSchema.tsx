type FaqItem = { q: string; a: string };
type FaqQuestionAnswer = { question: string; answer: string };
export type FaqSchemaInput = FaqItem | FaqQuestionAnswer;

function normalizeFaq(f: FaqSchemaInput): FaqItem {
  return "question" in f ? { q: f.question, a: f.answer } : f;
}

/** FAQPage JSON-LD — keep answers factual; match visible FAQ copy. Optional `url` helps validators associate markup with the page. */
export function FAQPageSchema({
  faqs,
  url,
}: {
  faqs: readonly FaqSchemaInput[];
  /** Canonical URL of the page that contains these FAQs (recommended for Rich Results). */
  url?: string;
}) {
  if (faqs.length === 0) return null;
  const normalized = faqs.map(normalizeFaq);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(url ? { url } : {}),
    mainEntity: normalized.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
