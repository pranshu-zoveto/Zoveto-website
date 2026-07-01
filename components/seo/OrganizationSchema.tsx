import React from "react";
import { ZOVETO_ORGANIZATION_DESCRIPTION } from "@/lib/brand-entity";
import { BRAND_LOGO_ICON } from "@/lib/branding";
import { LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";
import { VERIFIED_SAME_AS } from "@/lib/social";
import { siteUrl } from "@/lib/site";

/** Organization JSON-LD - use on the homepage (or wherever brand entity should be declared). */
export function OrganizationSchema() {
  const base = siteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Zoveto",
    legalName: "Zoveto Technologies",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}${BRAND_LOGO_ICON}`,
      width: 512,
      height: 512,
    },
    sameAs: [...VERIFIED_SAME_AS],
    description: ZOVETO_ORGANIZATION_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Company Operating System",
      "ERP software",
      "warehouse management system",
      "inventory management software",
      "procurement software",
      "CRM software",
      "GST billing software",
      "HRMS",
      "MRO",
      "export workflows",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: LEAD_STAFF_INBOX,
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
