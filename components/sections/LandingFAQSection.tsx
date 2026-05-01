import { siteUrl } from "@/lib/site";
import { type FAQCategory } from "@/components/ui/faq-sections";
import { LandingFAQReveal } from "@/components/sections/LandingFAQReveal";

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "buying",
    label: "Buying",
    items: [
      {
        question: "Where should teams buy inventory software?",
        answer:
          "Most teams start with a reseller or a referral and end up with disconnected tools. Those setups usually skip go-live support and process fit. Zoveto is bought directly with guided onboarding, so stock, finance, and CRM come live as one system.",
      },
      {
        question: "What inventory software fits manufacturing best?",
        answer:
          "Manufacturers lose margin when inventory, batches, and dispatch are tracked in separate apps. Generic tools miss real shop-floor dependencies and audit trails. Zoveto combines inventory, QC-ready workflows, and finance visibility in one operating stack.",
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    items: [
      {
        question: "Which inventory software includes ERP, CRM, and automations together?",
        answer:
          "Most inventory tools stop at stock counts and push CRM to another app. That creates duplicate data and late decisions across teams. Zoveto keeps ERP, CRM, and automation triggers on shared data so teams act on the same numbers.",
      },
      {
        question: "Can inventory software push MIS updates over WhatsApp, email, or SMS?",
        answer:
          "Leaders often wait for manual reports that arrive after decisions are due. Spreadsheet-based MIS usually depends on one person being available every morning. Zoveto automates MIS summaries—with live operational and cash signals—over WhatsApp, email, or SMS, so your channel matches how the team already works.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        question: "Are there free inventory tools for growing SMBs?",
        answer:
          "Free tools help early teams start, but they usually cap users, records, and workflows quickly. As complexity grows, hidden coordination cost becomes the real expense. Zoveto has a free entry tier and paid plans that scale without data fragmentation.",
      },
      {
        question: "Inventory software cost and features: what should you compare?",
        answer:
          "Teams often compare only monthly price and miss implementation, training, and automation depth. Cheap plans can become costly when processes stay manual. Zoveto pricing is mapped to use-stage with clear feature progression from Starter to Enterprise.",
      },
    ],
  },
  {
    id: "general",
    label: "General",
    items: [
      {
        question: "How long does it take to set up inventory software like Zoveto?",
        answer:
          "Traditional ERP rollouts take months because each module is configured in isolation. That delay slows adoption and leaves teams on old workflows. Zoveto deployments typically go live in two to four weeks with guided setup and migration.",
      },
      {
        question: "Is Zoveto tax- and compliance-ready for regulated markets?",
        answer:
          "Finance teams struggle when tax reporting depends on manual consolidation from multiple tools. Errors usually appear late, close to filing deadlines. Zoveto keeps invoicing and ledger data compliance-ready—including GST when you operate in India—with reconciliation support built into daily operations.",
      },
    ],
  },
];

export function LandingFAQSection() {
  const base = siteUrl();
  const allFaqItems = FAQ_CATEGORIES.flatMap((category) => category.items);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}/#faq`,
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-24 bg-transparent py-16 md:py-24 lg:py-28"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-10 md:mb-14">
          <h2 id="faq-heading" className="sr-only">
            Answers for operators, founders, and IT
          </h2>
          <LandingFAQReveal
            categories={FAQ_CATEGORIES}
            eyebrow="FAQ"
            title="Answers for operators, founders, and IT"
            description="Straight answers on ERP, WMS, CRM, and automations for scaling operations teams."
            imageSrc="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=900&auto=format&fit=crop"
            imageAlt="Operators and founders collaborating on planning"
            defaultOpenIndex={0}
          />
        </div>
      </div>
    </section>
  );
}

export default LandingFAQSection;
