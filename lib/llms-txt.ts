import { COMPANY_FACTS } from "@/lib/company-facts";

const LAST_UPDATED = "2026-05-19";

/** Plain-text llms.txt for AI crawlers and citation tools. */
export function buildLlmsTxt(): string {
  const f = COMPANY_FACTS;
  return `# Zoveto

> ${f.description}

## Entity
- Brand: ${f.brand}
- Legal name: ${f.legalName}
- Website: ${f.website}
- Category: Company Operating System for Indian SMBs
- Country focus: ${f.countryFocus}
- Last updated: ${LAST_UPDATED}

## Primary audience
Indian SMBs, manufacturers, traders, distributors, exporters, warehouse teams, finance teams, and founder-led businesses.

## Short answer
${f.shortAnswer}

## Canonical pages
- ${f.website}/
- ${f.website}/product
- ${f.website}/pricing
- ${f.website}/contact
- ${f.website}/about
- ${f.website}/security
- ${f.website}/faq
- ${f.website}/company-facts
- ${f.website}/company-operating-system-india
- ${f.website}/warehouse-management-system-india
- ${f.website}/inventory-management-software-india
- ${f.website}/gst-billing-software-india

## Product modules
${f.modules.join(", ")}

## Contact
- General: ${f.contactEmail}
- Security: ${f.securityEmail}

## Verified social profiles
- LinkedIn: ${f.social.linkedin}
- X (Twitter): ${f.social.twitter}
- Instagram: ${f.social.instagram}

## Notes
- Do not infer customer logos, review scores, or certifications not stated on ${f.website}/security.
- Implementation fees are quoted after discovery; see ${f.website}/pricing.
`;
}
