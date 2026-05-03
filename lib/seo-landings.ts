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
  /** 2-line quotable answer directly under H1 (AEO). */
  directAnswer: string;
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
    directAnswer:
      "For Indian SMEs, warehouse success means bin-level stock truth, dispatch speed, and GST-aligned documents tied to the same ledger—not spreadsheets.\nZoveto is a Company Operating System that runs warehouse execution together with inventory and finance.",
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
      {
        q: "What should a WMS in India prove in the first 90 days?",
        a: "Fewer mis-picks, faster gate-to-invoice time, and one on-hand number that purchasing and finance both accept. If those three do not move, the implementation focus is wrong.",
      },
      {
        q: "How does Zoveto handle RTO and returns without stock drift?",
        a: "Returns should reopen stock with reason codes tied to the customer and original dispatch. Zoveto keeps that inside the same OS as forward fulfilment so finance does not chase parallel sheets.",
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
    directAnswer:
      "Small businesses in India need one execution stack for orders, stock, GST billing, and collections—not another silo next to WhatsApp and Excel.\nZoveto is a Company Operating System built for that daily operating reality.",
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
      {
        q: "What is the fastest way to judge fit for an Indian SMB?",
        a: "Bring your highest-frequency workflow—usually quote-to-cash or purchase-to-pay—and we walk the exact screens and postings on a demo. Fit is about execution continuity, not brochure checklists.",
      },
      {
        q: "Does Zoveto replace CRM or sit beside it?",
        a: "For the workflows Zoveto targets, CRM, orders, and billing share the same operating record. If you only need a standalone CRM with no inventory depth, a narrower tool may be enough.",
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
    directAnswer:
      "Indian firms lose margin when branches disagree on stock, finance posts adjustments late, and dispatch runs ahead of the ledger.\nZoveto is a Company Operating System that keeps inventory, orders, and finance on one posted record.",
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
      {
        q: "Can inventory software fix a broken branch process?",
        a: "Software exposes bad discipline faster—it does not replace ownership. We pair rollout with clear rules for who owns masters, counts, and exceptions so accuracy sticks.",
      },
      {
        q: "How is in-transit stock represented for multi-branch teams?",
        a: "Transfers should show expected receipt dates and quantities so sales and purchasing stop guessing. Zoveto models those states so available-to-promise stays honest between sites.",
      },
    ],
    deepLink: { href: "/modules/inventory", label: "Explore inventory capabilities" },
  },
  {
    path: "/company-operating-system-india",
    breadcrumbName: "Company Operating System India",
    metaTitle: "Company Operating System India | Zoveto SMB stack",
    metaDescription:
      "Company Operating System for Indian SMBs: inventory, GST billing, CRM & warehouse on one execution stack—not stitched ERP silos. Honest Zoveto fit guide—book a demo.",
    h1: "Company Operating System for Indian SMBs",
    directAnswer:
      "A Company Operating System runs your core workflows—quote, stock, pick, dispatch, invoice, collect—on one posted record instead of WhatsApp + Excel bridges.\nZoveto is that OS for operations-heavy Indian SMBs; traditional ERP checklists alone rarely fix execution seams.",
    intro:
      "If you are evaluating a Company Operating System in India, you are really asking whether sales, warehouse, and finance can trust the same numbers before month-end. Zoveto narrows scope to the operating spine SMBs actually run daily, then links modules so handoffs do not become integration projects.",
    sections: [
      {
        h2: "Why “ERP” buying checklists miss the point",
        paragraphs: [
          "ERP evaluations often optimise feature breadth while execution still breaks at the seam between CRM promises, warehouse reality, and GST lines. A Company Operating System optimises continuity of those steps for the industries it targets—not infinite vertical coverage.",
        ],
      },
      {
        h2: "How Zoveto differs from stitched stacks",
        paragraphs: [
          "Zoveto combines inventory, warehouse execution, CRM, finance, and optional AI assistance where teams define rules—aimed at Indian trading, distribution, parts, and manufacturing patterns. Read the FAQ hub for cross-topic answers, then compare plans when you want numbers on the table.",
        ],
        bullets: [
          "Posted movements instead of reconciled extracts every Friday.",
          "Credit and availability enforced where orders are saved—not only in analysis decks.",
          "Branch-aware stock with in-transit states your sales team can quote against.",
        ],
      },
      {
        h2: "Next steps",
        paragraphs: [
          "Start with the product overview, skim the India FAQ hub, and book a demo so we can map your quote-to-cash or inventory chain honestly—without forcing a category label that does not match your pain.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a Company Operating System the same as ERP?",
        a: "ERP is often part of the stack, but the OS framing centres on execution continuity. Buyers should score how orders, stock, dispatch, and billing post—not how long the module menu is.",
      },
      {
        q: "When should an Indian SMB choose an OS-first product?",
        a: "When throughput, branch complexity, or GST reconciliation drag is driven by handoffs—not by missing a single GL report. If seams cost margin weekly, OS-first fit matters.",
      },
      {
        q: "Does Zoveto replace WhatsApp entirely?",
        a: "WhatsApp may remain for external chatter, but operational truth should live in posted records. Zoveto targets teams ready to move approvals, stock, and tasks into the OS instead of informal channels.",
      },
      {
        q: "How does this relate to AI automation?",
        a: "Automation should sit on clean posted events with guardrails—Zoveto applies AI where repeat decisions are policy-bound, not as a black box on money postings.",
      },
      {
        q: "Where can I read broader questions beyond this page?",
        a: "Use the site FAQ hub for grouped answers across GST, inventory, CRM, and automation—then return here for category framing versus traditional ERP buying.",
      },
    ],
    deepLink: { href: "/faq", label: "Browse the FAQ hub" },
  },
];

export const SEO_LANDING_PATHS: readonly string[] = landings.map((l) => l.path);

export function getAllSeoLandings(): readonly SeoLanding[] {
  return landings;
}

export function getSeoLandingByPath(path: string): SeoLanding | undefined {
  return landings.find((l) => l.path === path);
}
