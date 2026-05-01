type FaqItem = { q: string; a: string };

/** FAQPage JSON-LD — keep answers factual; match visible FAQ copy. */
export function FAQPageSchema({ faqs }: { faqs: readonly FaqItem[] }) {
  if (faqs.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
