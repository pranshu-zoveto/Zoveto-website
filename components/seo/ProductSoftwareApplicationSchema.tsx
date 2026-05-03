import React from "react";
import { ZOVETO_ORGANIZATION_DESCRIPTION } from "@/lib/brand-entity";
import { PAID_PLAN_PRICING } from "@/lib/pricing-display";
import { siteUrl } from "@/lib/site";

/** SoftwareApplication JSON-LD for the product marketing page. */
export function ProductSoftwareApplicationSchema() {
  const base = siteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zoveto",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: ZOVETO_ORGANIZATION_DESCRIPTION,
    url: `${base}/product`,
    image: `${base}/og-image.png`,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: String(PAID_PLAN_PRICING.starter.yearlyEffective),
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(PAID_PLAN_PRICING.starter.yearlyEffective),
          priceCurrency: "INR",
          unitText: "MONTH",
          billingDuration: "P1Y",
        },
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: String(PAID_PLAN_PRICING.growth.yearlyEffective),
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(PAID_PLAN_PRICING.growth.yearlyEffective),
          priceCurrency: "INR",
          unitText: "MONTH",
          billingDuration: "P1Y",
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
