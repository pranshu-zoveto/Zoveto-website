/**
 * India-focused SEO landing pages — copy and meta only (rendered by App Router pages).
 * Keep titles distinct from /modules/* pages to limit cannibalization.
 */

export type SeoLandingSection = {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoLandingFaq = { q: string; a: string };

export type SeoLanding = {
  /** URL pathname, e.g. /warehouse-management-system-india */
  path: string;
  /** Short label for JSON-LD breadcrumbs */
  breadcrumbName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: SeoLandingSection[];
  faqs: SeoLandingFaq[];
  /** Contextual deep link (module or product overview) */
  deepLink: { href: string; label: string };
};

const landings: SeoLanding[] = [
  {
    path: "/warehouse-management-system-india",
    breadcrumbName: "Warehouse management India",
    metaTitle: "Warehouse management system India | Zoveto WMS",
    metaDescription:
      "Evaluate warehouse management software for Indian SMEs: bin tracking, GST-ready flows, multi-site stock, and scan-first ops. Book a demo with Zoveto.",
    h1: "Warehouse management system in India",
    intro:
      "If you run a warehouse management system in India, you need bin-level accuracy, fast dispatch, and numbers that finance and operations agree on—without spreadsheets as the source of truth.",
    sections: [
      {
        h2: "Who this page is for",
        paragraphs: [
          "Distribution, manufacturing, and trading teams that pick, pack, and ship daily—and feel pain when bins, returns, or gate entry are tracked in chats and Excel.",
        ],
      },
      {
        h2: "What to evaluate in a WMS",
        paragraphs: [
          "Shortlist tools against outcomes you can audit: fewer mis-picks, faster trucks out, traceability from GRN to invoice, and role-based access for contract staff.",
        ],
        bullets: [
          "Putaway and bin moves reflected in real time—not end-of-day uploads.",
          "Wave or batch picking that fits your layout, not a generic template.",
          "Returns (RTO) reopening stock with reason codes tied to customer history.",
          "Integration with inventory and billing so dispatch does not outrun finance.",
        ],
      },
      {
        h2: "India-specific operating context",
        paragraphs: [
          "GST-compliant invoices and credit notes should flow from the same stock truth your warehouse uses. Multi-site businesses need a single ledger with clear ownership per location—especially when HO, branches, and 3PL hubs all move stock.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto combines warehouse execution with inventory and finance on one OS so dispatch, stock, and billing stay aligned. See capability detail on the WMS module page, then talk to us about your sites, SKUs, and rollout timeline.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need a separate WMS if we already use ERP inventory?",
        a: "Many teams outgrow basic stock modules when bin accuracy, wave picking, and gate workflows matter. The right choice depends on pick volume, error cost, and how often stock truth disagrees with finance.",
      },
      {
        q: "How long does a typical rollout take?",
        a: "Scope varies by sites, integrations, and data cleanliness. We scope honestly on a discovery call and align milestones to your peak seasons—not a generic template.",
      },
      {
        q: "Can we start with one warehouse?",
        a: "Yes. Many customers prove value at a hub first, then extend putaway and picking standards to branches once the playbook is stable.",
      },
    ],
    deepLink: { href: "/modules/wms", label: "Explore WMS capabilities" },
  },
  {
    path: "/erp-software-small-business-india",
    breadcrumbName: "ERP for SMB India",
    metaTitle: "ERP software for small business India | Zoveto",
    metaDescription:
      "ERP software for small businesses in India: inventory, CRM, finance, and ops on one stack—without duct-taping spreadsheets. Plans, trial, and demo inside.",
    h1: "ERP software for small businesses in India",
    intro:
      "ERP software for small businesses in India should reduce chaos across inventory, sales, and money—not add another silo. The goal is one place to run the business day-to-day, with GST-aware workflows your team can actually adopt.",
    sections: [
      {
        h2: "What SMB teams need most",
        paragraphs: [
          "Small and mid-sized firms rarely fail for lack of features; they fail when data is fragmented across WhatsApp, Excel, and legacy tools. A practical ERP stack centralizes orders, stock, collections, and reporting so owners get clarity without waiting for month-end merges.",
        ],
      },
      {
        h2: "Buyer's checklist (keep it short)",
        paragraphs: ["Use this as a sanity pass before you sign:"],
        bullets: [
          "Single stock ledger across branches with clear ownership.",
          "CRM-to-order-to-invoice path without retyping.",
          "Role-based access and audit trails—not everyone admin.",
          "Implementation plan tied to your volumes, not a slide deck.",
        ],
      },
      {
        h2: "Pricing and next steps",
        paragraphs: [
          "Transparent plan tiers help you match spend to stage. When you are ready, book a demo—we map your current mess to a phased rollout instead of a big-bang gamble.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Zoveto only for manufacturing?",
        a: "No. Trading, distribution, and light manufacturing teams use Zoveto when inventory, sales, and finance need to stay aligned. We tailor the conversation to your industry on the call.",
      },
      {
        q: "Can we migrate from Tally or Excel?",
        a: "Yes. Migration scope depends on historical depth and chart structure—we assess fidelity and risk up front so finance signs off with confidence.",
      },
      {
        q: "Do you offer a trial?",
        a: "Paid tiers include a trial window; see current plans on the pricing page or ask on a demo call for eligibility.",
      },
    ],
    deepLink: { href: "/product", label: "See how the Zoveto OS fits together" },
  },
  {
    path: "/inventory-management-software-india",
    breadcrumbName: "Inventory software India",
    metaTitle: "Inventory management software India | Zoveto",
    metaDescription:
      "Inventory management software for Indian businesses: multi-location stock, GRN, expiry, and finance-aligned ledgers. Compare plans and book a Zoveto demo.",
    h1: "Inventory management software in India",
    intro:
      "Inventory management software in India should give you one truthful view of stock across branches, in-transit, and returns—before margin leaks into expedite shipping and write-offs.",
    sections: [
      {
        h2: "Signals you have outgrown spreadsheets",
        paragraphs: [
          "When branches disagree on on-hand, finance posts adjustments weekly, or you discover dead stock only during physical counts, the cost is already in motion. Software should make variance visible early—not at audit time.",
        ],
      },
      {
        h2: "Capabilities that matter on the ground",
        paragraphs: ["Prioritize features your ops team will run daily:"],
        bullets: [
          "Multi-location sync with in-transit visibility.",
          "GRN tied to POs and approvals—not orphan receipts.",
          "Batch and expiry (FEFO) when you move dated goods.",
          "Aging and slow-mover views finance can trust.",
        ],
      },
      {
        h2: "Connect inventory to the rest of the business",
        paragraphs: [
          "Inventory should feed CRM commitments, dispatch, and GST invoices from the same numbers. Zoveto treats stock as a core OS surface—not an add-on module floating beside everything else.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do we improve accuracy first?",
        a: "Start with disciplined GRN, cycle count cadence, and low-stock rules based on demand—not gut feel. We help you sequence the habits alongside the software.",
      },
      {
        q: "Does Zoveto support multiple GST registrations?",
        a: "Multi-entity setups are common in Indian groups. Bring your structure to the demo and we map how ledgers, branches, and tax profiles should align.",
      },
      {
        q: "Where can I see pricing?",
        a: "Public plans and GST notes are on the pricing page. Enterprise volumes are scoped with sales.",
      },
    ],
    deepLink: { href: "/modules/inventory", label: "Explore inventory capabilities" },
  },
];

export const SEO_LANDING_PATHS: readonly string[] = landings.map((l) => l.path);

export function getAllSeoLandings(): readonly SeoLanding[] {
  return landings;
}

export function getSeoLandingByPath(path: string): SeoLanding | undefined {
  return landings.find((l) => l.path === path);
}
