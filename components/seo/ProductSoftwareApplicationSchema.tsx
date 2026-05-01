import React from "react";
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
    description:
      "Web-based AI operating system unifying inventory, warehouse, sales, operations, and finance for scaling enterprises.",
    url: `${base}/product`,
    image: `${base}/og-image.png`,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "4999",
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "4999",
          priceCurrency: "INR",
          unitText: "MONTH",
          billingDuration: "P1Y",
        },
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "14999",
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "14999",
          priceCurrency: "INR",
          unitText: "MONTH",
          billingDuration: "P1Y",
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
