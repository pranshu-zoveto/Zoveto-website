import React from "react";
import { ZOVETO_ORGANIZATION_DESCRIPTION } from "@/lib/brand-entity";
import { BRAND_LOGO_ICON } from "@/lib/branding";
import { LINKEDIN_COMPANY_URL_ENTITY } from "@/lib/social";
import { siteUrl } from "@/lib/site";

/** Organization JSON-LD — use on the homepage (or wherever brand entity should be declared). */
export function OrganizationSchema() {
  const base = siteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Zoveto",
    legalName: "Zoveto Technologies Private Limited",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}${BRAND_LOGO_ICON}`,
      width: 512,
      height: 512,
    },
    sameAs: [
      LINKEDIN_COMPANY_URL_ENTITY,
      "https://twitter.com/zoveto",
      "https://www.g2.com/products/zoveto",
    ],
    description: ZOVETO_ORGANIZATION_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@zoveto.com",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
