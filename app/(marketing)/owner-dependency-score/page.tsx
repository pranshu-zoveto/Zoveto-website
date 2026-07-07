import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Text } from "@/components/ui/Text";
import { canonicalUrl } from "@/lib/site";
import { OwnerDependencyScoreClient } from "./OwnerDependencyScoreClient";

const PATH = "/owner-dependency-score";

const faqs = [
  {
    q: "What is an Owner Dependency Score?",
    a: "It is a 0 to 100 score that shows how well your business can run when the owner is unavailable. A higher score means fewer owner bottlenecks.",
  },
  {
    q: "How is the score calculated?",
    a: "The score is based on weighted answers across pricing authority, approvals, process knowledge, decision speed, relationship dependence, and succession readiness.",
  },
  {
    q: "Is this a financial audit?",
    a: "No. This is an operations assessment for owner dependency. It helps you spot where systems, dashboards, delegation, and process documents can reduce daily owner involvement.",
  },
  {
    q: "Who should use this calculator?",
    a: "Founder-led SMBs, distributors, manufacturers, trading businesses, service companies, and growing teams where the owner is still involved in daily decisions.",
  },
  {
    q: "How can Zoveto help improve the score?",
    a: "Zoveto helps centralize workflows, dashboards, approvals, SOPs, customer records, inventory, sales, finance, HR, and alerts so decisions move through the business, not only through the owner.",
  },
];

export const metadata: Metadata = {
  title: "Owner Dependency Score Calculator | Zoveto",
  description:
    "Calculate how dependent your business is on the owner. Get an instant Owner Dependency Score, weak areas, and a Zoveto action plan.",
  alternates: { canonical: canonicalUrl(PATH) },
  openGraph: {
    title: "Owner Dependency Score Calculator | Zoveto",
    description:
      "A 3-minute diagnostic for owner-led businesses. Find bottlenecks in approvals, pricing, dashboards, process knowledge, and succession readiness.",
    url: canonicalUrl(PATH),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owner Dependency Score Calculator | Zoveto",
    description: "Find out how much your business depends on you and what to fix first.",
    images: ["/og-image.png"],
  },
};

export default function OwnerDependencyScorePage() {
  return (
    <main
      data-owner-dependency-score="true"
      className="relative overflow-hidden bg-[#f7f7f4] pb-16 pt-28 md:pb-24 md:pt-36"
    >
      <style>{`
        body:has(main[data-owner-dependency-score="true"]) .footer-mega-wordmark {
          display: none;
        }
      `}</style>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Owner dependency score", path: PATH },
        ]}
      />
      <FAQPageSchema faqs={faqs} url={canonicalUrl(PATH)} />

      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <header className="mx-auto max-w-4xl text-center">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Free assessment for founder-led businesses
          </Text>
          <h1 className="mx-auto max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-[4rem] md:text-[4.8rem]">
            Owner Dependency Score Calculator
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-[1.125rem] leading-8 tracking-[0] text-muted md:text-[1.25rem] md:leading-9">
            Answer 12 questions to see where pricing, approvals, decisions, relationships, dashboards, and process
            knowledge still rely on the owner.
          </p>
        </header>

        <section className="mt-10 md:mt-12" aria-label="Owner dependency calculator">
          <OwnerDependencyScoreClient />
        </section>

        <section className="mx-auto mt-16 max-w-3xl space-y-6 md:mt-20" aria-labelledby="owner-dependency-faq-heading">
          <Text variant="heading-1" as="h2" id="owner-dependency-faq-heading" className="text-center text-3xl text-foreground">
            Frequently asked questions
          </Text>
          <FaqAccordion items={faqs} idPrefix="owner-dependency-score" />
          <p className="text-sm text-muted">
            Want to connect this score to your live operating data?{" "}
            <Link href="/contact#demo" className="font-medium text-blue underline-offset-4 hover:underline">
              Book a Zoveto system audit
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
