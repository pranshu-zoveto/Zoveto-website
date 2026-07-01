import { LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";
import { LINKEDIN_COMPANY_URL_ENTITY, TWITTER_URL, INSTAGRAM_URL } from "@/lib/social";

export const COMPANY_FACTS = {
  brand: "Zoveto",
  legalName: "Zoveto Technologies",
  website: "https://zoveto.com",
  category: "Company Operating System / business operations software",
  countryFocus: "India",
  builtFor:
    "Indian SMBs, manufacturers, traders, distributors, exporters, warehouse teams, and finance teams.",
  description:
    "Zoveto is a Company Operating System for Indian SMBs, manufacturers, traders, distributors, exporters, and operations-heavy teams. It connects inventory, WMS, procurement, CRM, finance/GST, HR, reporting, and automation around one operating record.",
  shortAnswer:
    "Zoveto helps Indian businesses replace disconnected WhatsApp, Excel, ERP, CRM, warehouse, and finance workflows with one connected operating system.",
  modules: [
    "WMS",
    "Procurement",
    "Finance/GST",
    "Export",
    "CRM",
    "HR",
    "MRO",
    "Inventory",
    "Analytics/Intelligence",
  ],
  contactEmail: LEAD_STAFF_INBOX,
  securityEmail: "security@zoveto.com",
  importantPages: [
    { label: "Product", path: "/product" },
    { label: "Pricing", path: "/pricing" },
    { label: "Security", path: "/security" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
    { label: "About", path: "/about" },
  ],
  social: {
    linkedin: LINKEDIN_COMPANY_URL_ENTITY,
    twitter: TWITTER_URL,
    instagram: INSTAGRAM_URL,
  },
} as const;
