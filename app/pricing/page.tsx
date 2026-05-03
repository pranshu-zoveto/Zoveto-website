import React from "react";
import { Metadata } from "next";
import { Text } from "@/components/ui/Text";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { PricingOfferSchema } from "@/components/seo/PricingOfferSchema";
import { canonicalUrl } from "@/lib/site";
import { PRICING_PAGE_FAQ } from "@/lib/pricing-page-faq";
import { PricingClient } from "./PricingClient";
import { PricingFAQSection } from "./PricingFAQSection";

/** ISR: pricing copy and schema refresh on a daily cadence without per-request compute. */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Zoveto Pricing — ERP Software from ₹5,999/mo effective (Starter) | Plans",
  description:
    "Transparent pricing for Zoveto's Company Operating System. Starter ₹7,999/mo monthly or ₹5,999/mo effective on yearly billing (10 users). Growth from ₹14,999/mo effective (15 users + HRMS + AI). No hidden fees. Cancel anytime.",
  alternates: { canonical: canonicalUrl("/pricing") },
  openGraph: {
    title: "Zoveto pricing | Free to Enterprise",
    description:
      "Explore transparent plans from free to enterprise and choose a setup that matches your operational growth stage.",
    url: canonicalUrl("/pricing"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoveto pricing | Free to Enterprise",
    description: "Transparent pricing designed for scaling operations teams.",
    images: ["/og-image.png"],
  },
};

export default function PricingPage() {
  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-28 md:pb-24 md:pt-36">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <PricingOfferSchema />
      <FAQPageSchema faqs={PRICING_PAGE_FAQ} url={canonicalUrl("/pricing")} />
      <div className="container relative z-10 mx-auto max-w-[min(100%,88rem)] px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">Pricing</p>
          <Text variant="display-1" as="h1" className="mb-6 text-balance">
            Pricing that follows <span className="text-blue">operating volume.</span>
          </Text>
          <Text variant="body-lg" className="mx-auto max-w-2xl text-pretty text-muted">
            Start fast. Scale when volume grows. One subscription covers inventory, CRM, ops, finance, and AI agents.
          </Text>
        </div>

        <PricingClient />

        <div className="mx-auto mt-20 max-w-[min(100%,80rem)] md:mt-28">
          <PricingFAQSection faqData={PRICING_PAGE_FAQ} />
        </div>
      </div>
    </main>
  );
}
