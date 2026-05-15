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
  title: "Zoveto Pricing — Modular ERP from ₹5,999/mo | WMS, CRM, ERP, HRMS, Intelligence",
  description:
    "Transparent modular pricing for Zoveto's operating system. Buy individual modules from ₹5,999/mo or save with bundles — Operations Suite ₹14,999/mo (WMS+ERP+CRM) or Business OS ₹24,999/mo (all 5 modules). No hidden fees.",
  alternates: { canonical: canonicalUrl("/pricing") },
  openGraph: {
    title: "Zoveto pricing | Modular — pick what you need",
    description:
      "Five independently purchasable modules. Two bundles for better value. One enterprise option. No lock-in until you're sure.",
    url: canonicalUrl("/pricing"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoveto pricing | Modular — pick what you need",
    description: "Buy only the modules you need. Bundle for better rates. Scale without lock-in.",
    images: ["/og-image.png"],
  },
};

export default function PricingPage() {
  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-20 md:pb-24 md:pt-36">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <PricingOfferSchema />
      <FAQPageSchema faqs={PRICING_PAGE_FAQ} url={canonicalUrl("/pricing")} />
      <div className="container relative z-10 mx-auto max-w-[min(100%,88rem)] px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-20">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">Pricing</p>
          <Text variant="display-1" as="h1" className="mb-6 text-balance">
            Buy what you need. <span className="text-blue">Scale when you're ready.</span>
          </Text>
          <Text variant="body-lg" className="mx-auto max-w-2xl text-pretty text-muted">
            Five independently purchasable modules. Bundle them for a better rate or go full stack with Business OS.
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
