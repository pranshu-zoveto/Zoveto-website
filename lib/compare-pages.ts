import type { Phase1CompareContent } from "@/lib/phase1-compare-zoho-tally";
import { TALLY_PHASE1, ZOHO_PHASE1 } from "@/lib/phase1-compare-zoho-tally";
import { EARLY_ACCESS_CTA_HREF, EARLY_ACCESS_CTA_LABEL } from "@/lib/marketing-cta";

export type CompareTableRow = {
  name: string;
  zoveto: string;
  competitor: string;
};

export type CompareCta = {
  label: string;
  href: string;
};

export type CompareSummaryBullet = {
  text: string;
  /** strength = competitor advantage (check); gap = limitation vs your positioning (cross). */
  kind: "strength" | "gap";
};

export type ComparePageFaq = { q: string; a: string };

export type ComparePage = {
  slug: string;
  competitor: string;
  /** Phase-1 long-form SEO + FAQ for selected slugs only. */
  phase1?: Phase1CompareContent;
  /** Two-line AEO lead when `phase1` is absent. */
  aeoLead?: string;
  /** Min 5 when `phase1` is absent - must match visible FAQ + JSON-LD. */
  faqs?: readonly ComparePageFaq[];
  /** Short blurb for /compare index cards and base SEO description. */
  description: string;
  /** Eyebrow on /compare index - frames the angle (not keyword stuffing). */
  hubLens: string;
  /** Distinct index-card copy; never reuse the generic SEO one-liner across competitors. */
  hubTeaser: string;
  keywords: readonly string[];
  hero: {
    subtext: string;
    primaryCta: CompareCta;
    secondaryCta: CompareCta;
  };
  quickSummary: {
    zoveto: readonly string[];
    competitor: readonly CompareSummaryBullet[];
  };
  tableRows: readonly CompareTableRow[];
  whoShouldUse: {
    chooseZoveto: readonly string[];
    chooseCompetitor: readonly string[];
  };
  workflow: {
    zoveto: string;
    competitor: string;
  };
  limitations: readonly string[];
  finalVerdict: readonly string[];
  ctaClosing: {
    headline: string;
    primaryCta: CompareCta;
    secondaryCta: CompareCta;
  };
  workflowImage?: { src: string; alt: string };
};

/** H1 copy is identical across compare pages (per product spec). */
export function comparePageH1(competitor: string): string {
  return `Zoveto vs ${competitor}: Which system is right for your business?`;
}

export const COMPARE_TABLE_ROW_COUNT = 11;

const CTA_DEMO: CompareCta = { label: EARLY_ACCESS_CTA_LABEL, href: EARLY_ACCESS_CTA_HREF };
const CTA_SETUP: CompareCta = { label: EARLY_ACCESS_CTA_LABEL, href: EARLY_ACCESS_CTA_HREF };
const CTA_CLOSE_SETUP: CompareCta = { label: EARLY_ACCESS_CTA_LABEL, href: EARLY_ACCESS_CTA_HREF };
const CTA_CLOSE_DEMO: CompareCta = { label: EARLY_ACCESS_CTA_LABEL, href: EARLY_ACCESS_CTA_HREF };

const STANDARD_HERO_SUBTEXT =
  "Compare features, workflows, and operational capabilities, not just checklists.";

type StandardCompareInput = {
  slug: string;
  competitor: string;
  description: string;
  hubLens: string;
  hubTeaser: string;
  keywords: readonly string[];
  competitorStrength: string;
  competitorBestFor: string;
  competitorGap: string;
  zovetoFit: string;
};

function makeStandardComparePage(input: StandardCompareInput): ComparePage {
  return {
    slug: input.slug,
    competitor: input.competitor,
    description: input.description,
    hubLens: input.hubLens,
    hubTeaser: input.hubTeaser,
    keywords: input.keywords,
    aeoLead: `${input.competitor} can be the better fit for ${input.competitorBestFor}; Zoveto is stronger when ${input.zovetoFit}.\nUse this comparison to judge workflow continuity, inventory depth, finance context, and who owns operational handoffs after go-live.`,
    faqs: [
      {
        q: `When should a team choose Zoveto over ${input.competitor}?`,
        a: `Choose Zoveto when sales, stock, warehouse, billing, and collections need to run on one operating record. ${input.competitor} may still fit when ${input.competitorBestFor}.`,
      },
      { q: `What is ${input.competitor}'s main strength?`, a: input.competitorStrength },
      {
        q: `Where can ${input.competitor} become limiting for operations-heavy teams?`,
        a: input.competitorGap,
      },
      {
        q: "What should SMBs compare first?",
        a: "Compare one live workflow from lead to order to dispatch to invoice. Feature checklists matter less than whether the same record survives the whole chain.",
      },
      {
        q: "Does Zoveto replace every tool in the stack?",
        a: "No. Zoveto focuses on the operating loop it can own well. Some teams may keep specialist tools if they are outside core inventory, CRM, warehouse, or finance execution.",
      },
      {
        q: "How should we evaluate migration risk?",
        a: "Map masters, history, integrations, reports, and user ownership before deciding. The safer plan is phased around one high-value workflow, not a rushed full switch.",
      },
    ],
    hero: {
      subtext: STANDARD_HERO_SUBTEXT,
      primaryCta: CTA_DEMO,
      secondaryCta: CTA_SETUP,
    },
    quickSummary: {
      zoveto: [
        "One operating record for CRM, inventory, warehouse, billing, and finance where Zoveto's modules apply",
        "Guided onboarding for SMB workflows that need daily execution discipline",
        "Fewer app seams for the core operating loop compared with stitched tools",
      ],
      competitor: [
        { text: input.competitorStrength, kind: "strength" },
        { text: input.competitorGap, kind: "gap" },
        {
          text: `Often best when the business priority is ${input.competitorBestFor}, not a full operating spine.`,
          kind: "strength",
        },
      ],
    },
    tableRows: [
      { name: "Core positioning", zoveto: "Company Operating System for SMB operations", competitor: `${input.competitor} is usually evaluated for ${input.competitorBestFor}` },
      { name: "Inventory management", zoveto: "Inventory connects to orders, dispatch, billing, and finance", competitor: "Inventory depth depends on product scope, add-ons, or adjacent tools" },
      { name: "Warehouse workflows", zoveto: "Pick, pack, dispatch, and exception handling are treated as operating workflows", competitor: "Warehouse execution may require separate configuration or companion systems" },
      { name: "CRM integration", zoveto: "CRM sits near stock, orders, and receivables", competitor: "CRM strength varies by product focus and how sales data connects downstream" },
      { name: "Billing and finance", zoveto: "Finance follows operational events where the Zoveto stack owns the workflow", competitor: "Finance context may sit in a separate app or require exports and reconciliation" },
      { name: "Implementation model", zoveto: "Qualification-led onboarding with workflow scoping", competitor: "May be faster to start, but operations depth depends on setup quality" },
      { name: "Custom workflows", zoveto: "Focused workflows for trading, distribution, manufacturing, and warehouse-heavy SMBs", competitor: "May offer flexibility, but the business owns more process design and upkeep" },
      { name: "Real-time visibility", zoveto: "Leadership views current stock, order, dispatch, and cash signals together", competitor: "Visibility depends on how well data is synchronized across tools" },
      { name: "Regional context", zoveto: "Designed around SMB operating reality, GST context, and branch discipline", competitor: "Regional fit depends on localization depth, partners, and configuration" },
      { name: "Best fit", zoveto: input.zovetoFit, competitor: input.competitorBestFor },
      { name: "Ongoing ownership", zoveto: "Zoveto owns more of the operating loop inside one product direction", competitor: "Internal admins or partners may own more integration and governance work" },
    ],
    whoShouldUse: {
      chooseZoveto: [
        input.zovetoFit,
        "You need inventory, CRM, warehouse, and finance to agree during the day, not after exports",
        "You prefer guided rollout over assembling and governing multiple tools yourself",
      ],
      chooseCompetitor: [
        input.competitorBestFor,
        "You already have a stable implementation and only need incremental improvements",
        "You have internal ownership for integrations, reporting, and process governance",
      ],
    },
    workflow: {
      zoveto:
        "Zoveto aims to keep the workflow linear: enquiry, quote, stock check, order, warehouse task, dispatch, invoice, and collection visibility stay on one operating record where modules apply.",
      competitor:
        `${input.competitor} can work well in its core use case, but operations-heavy teams should check whether sales, stock, billing, and reporting remain synchronized without manual bridges.`,
    },
    limitations: [
      "Not ideal if your requirement is outside Zoveto's current SMB operations footprint.",
      "Not an instant self-serve replacement for every possible app; onboarding and scope agreement matter.",
    ],
    finalVerdict: [
      `Choose Zoveto when ${input.zovetoFit}.`,
      `Choose ${input.competitor} when your priority is ${input.competitorBestFor} and your current operating handoffs are already under control.`,
    ],
    ctaClosing: {
      headline: "Compare your workflow with Zoveto",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: CTA_CLOSE_DEMO,
    },
  };
}

export const COMPARE_PAGES: readonly ComparePage[] = [
  {
    slug: "zoho-vs-zoveto",
    competitor: "Zoho",
    phase1: ZOHO_PHASE1,
    description:
      "Compare Zoveto vs Zoho. See differences in inventory, operations, CRM, and accounting. Choose the right system for your business.",
    hubLens: "Suite breadth vs one record",
    hubTeaser:
      "Zoho wins when you want CRM-first automation and a huge app catalog you can grow into. Zoveto wins when inventory, warehouse, and billing must stay on one posted chain, this guide names where the integration tax shows up.",
    keywords: [
      "Zoveto vs Zoho",
      "Zoho alternative",
      "Zoho One alternative",
      "unified ERP CRM",
      "inventory and warehouse software",
    ],
    hero: {
      subtext: STANDARD_HERO_SUBTEXT,
      primaryCta: CTA_DEMO,
      secondaryCta: CTA_SETUP,
    },
    quickSummary: {
      zoveto: [
        "Unified operations (inventory, warehouse, sales, finance) on one operating record",
        "Built for execution workflows across teams, not only front-office apps",
        "Guided onboarding aligned to how goods and money actually move",
      ],
      competitor: [
        { text: "Strong breadth across CRM, finance, HR, and many other apps, pick what you need", kind: "strength" },
        {
          text: "Operational depth often depends on which Zoho apps you subscribe to and how tightly you integrate them",
          kind: "gap",
        },
        {
          text: "Warehouse and inventory-heavy flows may span multiple products and configuration work",
          kind: "gap",
        },
      ],
    },
    tableRows: [
      {
        name: "Core positioning",
        zoveto: "Company Operating System: one stack for execution across ops, sales, and finance",
        competitor: "Large suite of products; teams often assemble CRM + Books + Inventory + other apps",
      },
      {
        name: "Inventory management",
        zoveto: "Native inventory tied to orders, warehouse moves, and financial outcomes",
        competitor: "Capable inventory features where enabled; scope varies by product line and setup",
      },
      {
        name: "Warehouse workflows",
        zoveto: "Warehouse execution treated as a first-class workflow surface",
        competitor: "Depends on modules and implementation; may need add-ons or custom flows for deep WMS scenarios",
      },
      {
        name: "Order processing",
        zoveto: "Quote-to-cash and fulfilment steps designed to stay on one posted record",
        competitor: "Flexible when apps are wired well; otherwise handoffs and exports between apps",
      },
      {
        name: "CRM integration",
        zoveto: "CRM is part of the same system as inventory and billing, no separate “integration project” for basics",
        competitor: "Zoho CRM is a major strength: mature sales pipelines, automation, and ecosystem breadth",
      },
      {
        name: "Finance / accounting",
        zoveto: "Finance follows operational events (ship, receive, invoice) with controls suited to growing teams",
        competitor: "Zoho Books and related apps are well established for bookkeeping and compliance-oriented workflows",
      },
      {
        name: "Multi-module system",
        zoveto: "Opinionated modules aimed at consistent execution, not infinite DIY composition",
        competitor: "Very modular: you can start small and expand, with flexibility traded for integration discipline",
      },
      {
        name: "Real-time operations visibility",
        zoveto: "Leadership sees current stock, orders, and fulfilment status in one place",
        competitor: "Achievable with the right app mix and reporting; otherwise dashboards reflect subsets per app",
      },
      {
        name: "Setup & onboarding",
        zoveto: "Founder-led, qualification-first onboarding, not instant self-serve tenant creation",
        competitor: "Often faster to start a trial; mature operations still need process design across apps",
      },
      {
        name: "Custom workflows",
        zoveto: "Workflows tuned for trading, distribution, and light manufacturing patterns Zoveto targets",
        competitor: "Strong automation options (Deluge, rules, integrations) for teams that can maintain them",
      },
      {
        name: "Integrations required",
        zoveto: "Fewer moving parts when you stay inside the Zoveto module set",
        competitor: "More integrations when you span many Zoho apps or third-party tools, flexible but operationally heavier",
      },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You need full operational control across inventory, warehouse, and finance without stitching many apps",
        "You run trading, distribution, or light manufacturing where execution speed matters as much as CRM",
        "You want one system and a guided rollout instead of designing your own integration map",
      ],
      chooseCompetitor: [
        "You want CRM-first workflows with deep sales automation and a huge app catalog (Zoho’s core strength)",
        "You prefer buying best-of-breed Zoho apps over time and accepting integration work between them",
        "You already standardized on Zoho and only need light inventory or finance add-ons",
      ],
    },
    workflow: {
      zoveto:
        "On Zoveto, a typical fulfilment path stays on one chain: order confirmation updates available stock, warehouse picks and dispatches post back to the same record, billing follows shipment or service delivery, and customer service sees the same timeline, fewer spreadsheets and fewer “which system is true?” debates.",
      competitor:
        "With Zoho, the same story is absolutely possible, but teams often route steps through the CRM case, inventory or order app, accounting app, and sometimes spreadsheets or middleware in between. The difference is how much architecture and governance you invest to keep those steps synchronized as volume grows.",
    },
    limitations: [
      "Not ideal if you only need lightweight CRM plus minimal inventory, a narrower Zoho stack can be simpler to adopt.",
      "Requires onboarding and qualification, Zoveto does not promise instant self-serve provisioning for every visitor.",
    ],
    finalVerdict: [
      "If you are looking for a unified system to run operations end to end with one operating record, Zoveto is usually the better fit for inventory- and warehouse-led teams.",
      "If you only need CRM-led sales automation with selective finance or inventory apps, Zoho may be sufficient, especially when you already have admin capacity to manage multi-app setups.",
    ],
    ctaClosing: {
      headline: "See how Zoveto runs your operations",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: CTA_CLOSE_DEMO,
    },
  },
  {
    slug: "tally-vs-zoveto",
    competitor: "Tally",
    phase1: TALLY_PHASE1,
    description:
      "Compare Zoveto vs Tally. See differences in inventory, operations, CRM, and accounting. Choose the right system for your business.",
    hubLens: "Vouchers vs warehouse truth",
    hubTeaser:
      "Tally is the ledger teams trust for GST, audits, and statutory discipline. Zoveto targets the gap after that, when picks, dispatch proof, and CRM still live in spreadsheets beside the books. Read where each stack stops being enough.",
    keywords: [
      "Zoveto vs Tally",
      "Tally alternative",
      "Tally ERP alternative",
      "inventory with accounting",
      "operations software beyond Tally",
    ],
    hero: {
      subtext: STANDARD_HERO_SUBTEXT,
      primaryCta: CTA_DEMO,
      secondaryCta: CTA_SETUP,
    },
    quickSummary: {
      zoveto: [
        "Unified operations: WMS-style execution plus ERP and CRM on one model",
        "Built for workflows from quote to dispatch to invoice, not only vouchers",
        "Guided onboarding for teams outgrowing voucher-only discipline",
      ],
      competitor: [
        {
          text: "Very strong at statutory accounting, auditing workflows, and familiar compliance patterns",
          kind: "strength",
        },
        { text: "Mature installed base and training ecosystem for finance-led teams", kind: "strength" },
        {
          text: "Native CRM, deep warehouse, and full omnichannel sales are outside Tally’s traditional core",
          kind: "gap",
        },
      ],
    },
    tableRows: [
      {
        name: "Core positioning",
        zoveto: "Company Operating System spanning sales, stock, warehouse, and finance",
        competitor: "Accounting-first platform; operations teams often layer spreadsheets or other tools around it",
      },
      {
        name: "Inventory management",
        zoveto: "Inventory movements tied directly to orders, reservations, and financial postings",
        competitor: "Inventory features exist for many businesses, but heavy omnichannel ops often need extensions or companion systems",
      },
      {
        name: "Warehouse workflows",
        zoveto: "Designed around pick, pack, dispatch, and exception handling as operational workflows",
        competitor: "Warehouse-heavy scenarios frequently rely on partner add-ons or separate WMS products",
      },
      {
        name: "Order processing",
        zoveto: "Sales, fulfilment, and billing continuity on one record where Zoveto’s modules apply",
        competitor: "Strong at financial vouchers and compliance trails; operational orchestration depends on setup and add-ons",
      },
      {
        name: "CRM integration",
        zoveto: "CRM included as part of the same stack as inventory and billing",
        competitor: "CRM is not Tally’s historical centre of gravity, sales teams often maintain parallel tools",
      },
      {
        name: "Finance / accounting",
        zoveto: "Finance built to follow operational truth (receipts, shipments, invoices)",
        competitor: "Major strength: deep accounting culture, auditor-friendly workflows, and long-standing local practice",
      },
      {
        name: "Multi-module system",
        zoveto: "Modules intentionally connected for execution outcomes",
        competitor: "Modular extensions available; breadth depends on versions, partners, and what you license",
      },
      {
        name: "Real-time operations visibility",
        zoveto: "Ops and finance leadership share current fulfilment and stock posture",
        competitor: "Excellent for ledger-centric views; live warehouse KPIs may need complementary tooling",
      },
      {
        name: "Setup & onboarding",
        zoveto: "Structured onboarding with Zoveto’s early-access process",
        competitor: "Often quicker for a skilled accountant to start vouchers; cross-team rollout still needs change management",
      },
      {
        name: "Custom workflows",
        zoveto: "Workflow patterns aimed at growing distributors and manufacturers Zoveto serves",
        competitor: "Flexible with TDL and partners; deep customization implies specialist skills and maintenance",
      },
      {
        name: "Integrations required",
        zoveto: "Aim to reduce bolt-ons for the core operating loop",
        competitor: "Frequently integrates with banks, GST, and payroll tools; broader ops may need more integrations",
      },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You need full operational control across warehouse, trading floor, and finance in one place",
        "You run warehouse, trading, or light manufacturing where Tally alone cannot own the execution story",
        "You want one system instead of Tally plus CRM plus WMS spreadsheets",
      ],
      chooseCompetitor: [
        "You only need accounting, GST returns, and auditor-ready books with minimal operational modules",
        "Your team is already highly proficient in Tally and your operations are finance-led, not warehouse-led",
        "You prefer extending Tally through partners rather than replacing the accounting core",
      ],
    },
    workflow: {
      zoveto:
        "Zoveto keeps the story linear: a sales order or delivery schedule drives reservations, warehouse tasks update pick/pack status, dispatch confirms what left the building, invoicing follows the agreed trigger, and finance posts from those events, customer service references the same timeline instead of reconciling vouchers after the fact.",
      competitor:
        "Many Tally-led teams still bridge operations in spreadsheets, WhatsApp, or a separate CRM/WMS. Tally remains the ledger of truth, but operational steps may be captured late or in parallel systems, workable, but higher manual load as throughput rises.",
    },
    limitations: [
      "Not the best fit for very small businesses that only need vouchers and statutory reports with no warehouse complexity.",
      "Requires onboarding, if you expect instant DIY provisioning across every module on day one, Zoveto’s current access model may not match.",
    ],
    finalVerdict: [
      "If you need inventory, warehouse, and customer-facing fulfilment coordinated with finance in one operating system, Zoveto is the better fit than Tally alone for most scaling ops teams.",
      "If you only need accounting and compliance with minimal operational modules, Tally may remain sufficient, especially when led by a strong in-house finance function.",
    ],
    ctaClosing: {
      headline: "See how Zoveto runs your operations",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: CTA_CLOSE_DEMO,
    },
  },
  {
    slug: "odoo-vs-zoveto",
    competitor: "Odoo",
    description:
      "Compare Zoveto vs Odoo. See differences in inventory, operations, CRM, and accounting. Choose the right system for your business.",
    hubLens: "DIY modules vs guided OS",
    hubTeaser:
      "Odoo rewards teams with time to configure, host, and upgrade a broad module set. Zoveto trades infinite flexibility for a narrower, vendor-coherent execution path, use this when you are sizing who owns the seams after go-live.",
    keywords: [
      "Odoo vs Zoveto",
      "Zoveto vs Odoo",
      "Odoo alternative",
      "unified ERP SMB",
      "inventory ERP comparison",
    ],
    aeoLead:
      "Odoo wins on modular breadth and DIY flexibility; Zoveto wins when SMBs need one vendor-coherent execution chain without owning every integration seam.\nUse this comparison for inventory-led fit, GST reality, and who maintains configuration after go-live.",
    faqs: [
      {
        q: "Zoveto vs Odoo for a distributor, which is simpler day to day?",
        a: "Odoo is powerful when you staff configuration and upgrades. Zoveto targets teams that want fewer moving parts for quote-to-cash, warehouse, and billing on one operating record.",
      },
      {
        q: "Can Odoo match Zoveto’s warehouse-first posture?",
        a: "Yes with the right modules, scans, and governance, but you design and maintain that stack. Zoveto ships warehouse execution as part of its core OS narrative for covered industries.",
      },
      {
        q: "Is Odoo cheaper than Zoveto for SMBs?",
        a: "License lines rarely equal total cost. Factor partner days, custom apps, hosting, and upgrade tax. Compare three-year TCO against outcomes like pick accuracy and DSO, not menu price alone.",
      },
      {
        q: "Who should still choose Odoo?",
        a: "Teams that need niche community apps, self-host control, or deep studio/Python extensions Zoveto does not aim to replicate should often stay Odoo-led.",
      },
      {
        q: "Does Zoveto replace every Odoo app?",
        a: "No. Zoveto is narrower by design. If your requirement map spans exotic verticals outside Zoveto’s footprint, Odoo’s catalog may still win on coverage.",
      },
      {
        q: "How should we evaluate GST posting discipline?",
        a: "Trace one return from dispatch closure to invoice lines in each finalist. The better fit shows fewer manual bridges for credit notes and branch transfers under GST patterns.",
      },
    ],
    hero: {
      subtext: STANDARD_HERO_SUBTEXT,
      primaryCta: CTA_DEMO,
      secondaryCta: CTA_SETUP,
    },
    quickSummary: {
      zoveto: [
        "Unified Company Operating System, not a pick-and-mix of loosely coupled community modules",
        "Execution workflows for inventory, warehouse, and order fulfilment are first-class",
        "Guided onboarding with clear scope for trading and manufacturing patterns",
      ],
      competitor: [
        { text: "Mature open-source / commercial ERP with a huge module catalog and strong DIY appeal", kind: "strength" },
        {
          text: "Highly flexible when you have technical or partner resources to configure and maintain it",
          kind: "strength",
        },
        {
          text: "Operational consistency depends heavily on which modules you install and how integrations are governed",
          kind: "gap",
        },
      ],
    },
    tableRows: [
      {
        name: "Core positioning",
        zoveto: "Opinionated operating system for SMB execution quality",
        competitor: "Modular ERP + CRM + website + more, breadth is a deliberate strength",
      },
      {
        name: "Inventory management",
        zoveto: "Inventory tied to the same execution model as sales and warehouse tasks",
        competitor: "Capable Stock app with broad features; edge cases often need custom development or apps from the store",
      },
      {
        name: "Warehouse workflows",
        zoveto: "Warehouse flows integrated with the rest of Zoveto’s targeted module set",
        competitor: "Barcode apps and community modules vary; deep WMS scenarios may require extra modules or custom work",
      },
      {
        name: "Order processing",
        zoveto: "Designed to keep sales, fulfilment, and billing aligned on one record",
        competitor: "Flexible pipelines; teams must enforce their own process discipline across installed apps",
      },
      {
        name: "CRM integration",
        zoveto: "CRM shares the same backbone as fulfilment and billing for covered workflows",
        competitor: "Odoo CRM is capable and extensible; integration quality follows your configuration choices",
      },
      {
        name: "Finance / accounting",
        zoveto: "Finance follows operational postings for the workflows Zoveto covers",
        competitor: "Accounting module is broad; localisation and compliance depth vary by region and partner",
      },
      {
        name: "Multi-module system",
        zoveto: "Fewer modules by design, less surface area for accidental inconsistency",
        competitor: "Many modules available, powerful, but configuration and upgrade paths need active ownership",
      },
      {
        name: "Real-time operations visibility",
        zoveto: "Dashboards reflect the unified model Zoveto enforces",
        competitor: "Reporting is strong when data models are clean; messy customisations show up as reporting gaps",
      },
      {
        name: "Setup & onboarding",
        zoveto: "Zoveto-led onboarding with staged access",
        competitor: "You can self-host or cloud-subscribe quickly; realising value still depends on implementation depth",
      },
      {
        name: "Custom workflows",
        zoveto: "Workflows aligned to Zoveto’s target industries and use cases",
        competitor: "Studio and Python extensions offer deep flexibility, also ongoing maintenance responsibility",
      },
      {
        name: "Integrations required",
        zoveto: "Fewer third-party bridges for the core loop Zoveto ships",
        competitor: "Often integrates with payment gateways, marketplaces, and niche tools via apps or custom code",
      },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You want one disciplined operating record instead of assembling Odoo apps yourself",
        "You run warehouse, trading, or manufacturing scenarios Zoveto explicitly productises",
        "You prefer vendor-guided execution over owning the entire configuration matrix",
      ],
      chooseCompetitor: [
        "You prefer modular DIY setup and have technical or partner capacity to maintain Odoo",
        "You need niche modules or community apps that Zoveto does not aim to replicate",
        "You want open-source flexibility (self-host, fork, extend) beyond what a single-vendor SaaS offers",
      ],
    },
    workflow: {
      zoveto:
        "Under Zoveto, order intake, inventory allocation, warehouse execution, dispatch proof, invoicing, and customer visibility are chained on one system so teams do not reconcile Odoo documents against spreadsheets at month end.",
      competitor:
        "Odoo can model the same end-to-end story, but teams frequently implement it module by module, sales may go live before warehouse barcoding is ready, or finance may lag operations, which is normal in DIY ERP programmes and requires strong internal governance.",
    },
    limitations: [
      "Not ideal if your priority is maximum open-source control or exotic community modules Zoveto does not ship.",
      "Requires onboarding and scope agreement, not a blank canvas for infinite ungoverned experimentation.",
    ],
    finalVerdict: [
      "If you want a unified, vendor-coherent operating system for SMB execution, Zoveto is usually easier to run than a heavily customised Odoo footprint.",
      "If you need maximum modularity and are staffed to configure, host, and upgrade Odoo, Odoo may remain the better engineering playground, at the cost of owning that complexity.",
    ],
    ctaClosing: {
      headline: "See how Zoveto runs your operations",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: CTA_CLOSE_DEMO,
    },
  },
  {
    slug: "quickbooks-vs-zoveto",
    competitor: "QuickBooks",
    description:
      "Compare Zoveto vs QuickBooks. See differences in inventory, operations, CRM, and accounting. Choose the right system for your business.",
    hubLens: "Bookkeeping vs branch ops",
    hubTeaser:
      "QuickBooks is built for approachable cloud accounting and accountant-friendly flows. Zoveto is for ops teams who outgrew finance-only tools, when branch stock, dispatch, and receivables need the same spine, not another export.",
    keywords: [
      "Zoveto vs QuickBooks",
      "QuickBooks alternative",
      "operations ERP",
      "inventory software with accounting",
    ],
    aeoLead:
      "QuickBooks is strong for cloud bookkeeping and accountant-friendly flows; Zoveto is the Company Operating System when ops teams outgrow finance-only tools for inventory and dispatch.\nCompare on warehouse depth, branch stock, and quote-to-cash, not only ledger features.",
    faqs: [
      {
        q: "QuickBooks vs Zoveto for inventory-heavy SMBs?",
        a: "If picks, bins, and dispatch proof drive margin, evaluate execution systems. QuickBooks handles lighter product inventory; deep WMS scenarios usually need companion tools or a different spine.",
      },
      {
        q: "Can we use QuickBooks for accounting and Zoveto for operations?",
        a: "Architecture is project-specific. Zoveto’s value is collapsing operational truth into one posted chain, discuss cutover and coexistence with onboarding instead of assuming a permanent split.",
      },
      {
        q: "Is QuickBooks enough for multi-branch trading?",
        a: "It can be when volumes and branch complexity stay modest. When branches disagree on stock daily, you are past the comfort zone of finance-first stacks without operational modules.",
      },
      {
        q: "Does Zoveto replace my accountant’s QuickBooks workflow?",
        a: "No. Zoveto targets operating teams. Finance partners still matter for filings, masters, and controls, the product reduces retyping between what shipped and what got invoiced.",
      },
      {
        q: "What signal means we should leave QuickBooks for ops?",
        a: "Rising expedite freight, wrong picks, and receivables tracked in WhatsApp instead of tied tasks to customers. Those are execution signals, not GL feature gaps.",
      },
      {
        q: "Where can I see Zoveto pricing vs QuickBooks plans?",
        a: "Use the pricing page for Zoveto tiers, then model three-year TCO including warehouse add-ons you already pay for beside QuickBooks.",
      },
    ],
    hero: {
      subtext: STANDARD_HERO_SUBTEXT,
      primaryCta: CTA_DEMO,
      secondaryCta: CTA_SETUP,
    },
    quickSummary: {
      zoveto: [
        "Unified operations for inventory, warehouse, CRM, and finance in one SMB-focused stack",
        "Execution workflows from quote through dispatch and billing",
        "Guided onboarding for teams outgrowing finance-only tooling",
      ],
      competitor: [
        {
          text: "Strong at bookkeeping, banking feeds, and small-business financial reporting in its target markets",
          kind: "strength",
        },
        { text: "Large ecosystem of accountants familiar with QuickBooks Online workflows", kind: "strength" },
        {
          text: "Deep warehouse, manufacturing, and omnichannel retail are not QuickBooks’ primary centre of gravity",
          kind: "gap",
        },
      ],
    },
    tableRows: [
      {
        name: "Core positioning",
        zoveto: "Company Operating System for growing operations teams",
        competitor: "Cloud accounting platform for SMB bookkeeping and finances",
      },
      {
        name: "Inventory management",
        zoveto: "Inventory and order fulfilment are native to the operating model",
        competitor: "Basic inventory exists for simpler retail or product businesses; complex multi-location WMS scenarios usually need add-ons or other systems",
      },
      {
        name: "Warehouse workflows",
        zoveto: "Warehouse execution workflows included where Zoveto targets those industries",
        competitor: "Not a dedicated WMS; warehouse-heavy teams typically adopt specialised tools alongside QuickBooks",
      },
      {
        name: "Order processing",
        zoveto: "Sales-to-cash continuity on one record for supported flows",
        competitor: "Invoicing and payments are strong; operational orchestration may sit outside QuickBooks",
      },
      {
        name: "CRM integration",
        zoveto: "CRM integrated with fulfilment and billing in the same product direction",
        competitor: "Light CRM features or integrations; deep pipeline automation often means a separate CRM product",
      },
      {
        name: "Finance / accounting",
        zoveto: "Finance built around operational events relevant to Zoveto’s markets",
        competitor: "Major strength: approachable accounting, banking, and financial statements for SMBs",
      },
      {
        name: "Multi-module system",
        zoveto: "Opinionated modules for execution-heavy SMBs",
        competitor: "Modular accounting-centric apps; broader ERP scope requires the QuickBooks ecosystem or third parties",
      },
      {
        name: "Real-time operations visibility",
        zoveto: "Operations and finance leaders align on live fulfilment and stock signals",
        competitor: "Excellent financial snapshots; operational metrics depend on what you capture inside QuickBooks vs elsewhere",
      },
      {
        name: "Setup & onboarding",
        zoveto: "Zoveto qualification-led onboarding",
        competitor: "Often fast to begin bookkeeping; broader ops rollout is a separate project",
      },
      {
        name: "Custom workflows",
        zoveto: "Workflow templates tuned to distribution and manufacturing patterns Zoveto pursues",
        competitor: "Rules and integrations available; complex manufacturing may need niche integrations or other ERPs",
      },
      {
        name: "Integrations required",
        zoveto: "Fewer systems for the core operating loop Zoveto covers",
        competitor: "More integrations when inventory, CRM, or WMS live outside QuickBooks",
      },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You run distribution or manufacturing with real warehouse and fulfilment pressure",
        "You have outgrown finance-only tools but do not want a global enterprise suite",
        "You want inventory, CRM, and finance decisions tied to the same operating record",
      ],
      chooseCompetitor: [
        "You primarily need cloud bookkeeping, contractor payments, and simple product-based inventory",
        "Your accountant already standardised on QuickBooks and operations stay lightweight",
        "You are US-centric with workflows QuickBooks intentionally optimises for",
      ],
    },
    workflow: {
      zoveto:
        "Zoveto keeps fulfilment and finance on one chain: operational events drive stock and billing, so leadership chases exceptions instead of reconciling spreadsheets after month-end close.",
      competitor:
        "QuickBooks remains the financial ledger while inventory spreadsheets, warehouse apps, or a separate CRM carry operational truth, workable for smaller volumes, heavier as coordination needs grow.",
    },
    limitations: [
      "Not aimed at global enterprises needing SAP-grade multi-entity consolidation on day one.",
      "Requires onboarding, not an instant unlimited self-serve trial for every module.",
    ],
    finalVerdict: [
      "If you need SMB operations orchestrated end to end, Zoveto is usually the better fit than QuickBooks alone.",
      "If you only need bookkeeping and light inventory with a finance-first team, QuickBooks may remain sufficient.",
    ],
    ctaClosing: {
      headline: "See how Zoveto runs your operations",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: CTA_CLOSE_DEMO,
    },
  },
  {
    slug: "sap-vs-zoveto",
    competitor: "SAP",
    description:
      "Compare Zoveto vs SAP. See differences in inventory, operations, CRM, and accounting. Choose the right system for your business.",
    hubLens: "Programme ERP vs SMB spine",
    hubTeaser:
      "SAP is the reference class for governance, templates, and global scale. Zoveto is the pragmatic bet when you need the core operating loop live without a multi-year blueprint, honest framing on footprint, budget, and who owns data migration.",
    keywords: [
      "Zoveto vs SAP",
      "SAP alternative SMB",
      "mid-market ERP",
      "lighter ERP implementation",
    ],
    aeoLead:
      "SAP is the global enterprise standard for depth, templates, and governance at scale; Zoveto is the pragmatic Company Operating System for SMBs that need live ops in months, not a multi-year blueprint programme.\nChoose based on footprint, budget, and who owns data migration.",
    faqs: [
      {
        q: "SAP vs Zoveto for a ₹50–200 crore manufacturer?",
        a: "If you need PLM, global multi-entity, or plant MRP at SAP depth, SAP remains the incumbent class. If you need unified branch inventory, dispatch, and GST billing without enterprise programme overhead, Zoveto is the leaner fit.",
      },
      {
        q: "Does Zoveto compete with S/4HANA feature-for-feature?",
        a: "No. Zoveto does not claim parity with decades of SAP industry templates. It targets a narrower SMB and lower mid-market slice with faster time-to-value for the core operating loop.",
      },
      {
        q: "When is SAP still the right answer?",
        a: "Large regulated enterprises, global template rollouts, and teams that already invested in SAP skills, hosting, and integration factories should usually extend SAP rather than replace it with SMB tooling.",
      },
      {
        q: "What does Zoveto win on versus SAP for smaller teams?",
        a: "Shorter adoption path for inventory, warehouse, CRM, and finance coherence when programme governance and hypercare budgets do not match company size.",
      },
      {
        q: "Can we migrate from SAP to Zoveto?",
        a: "Downgrades are rarer than parallel carve-outs for a subsidiary. Bring entity scope and compliance needs to a discovery call, fit matters more than brand slogans.",
      },
      {
        q: "How do implementation timelines compare?",
        a: "Major SAP programmes are commonly multi-year. Zoveto scopes qualification-first onboarding for qualifying SMBs, still not a weekend flip, but materially shorter than global template programmes by design.",
      },
    ],
    hero: {
      subtext: STANDARD_HERO_SUBTEXT,
      primaryCta: CTA_DEMO,
      secondaryCta: CTA_SETUP,
    },
    quickSummary: {
      zoveto: [
        "Practical Company Operating System sized for SMB and mid-market adoption speed",
        "Unified inventory, warehouse, CRM, and finance without enterprise-suite overhead",
        "Guided onboarding with a shorter path to live operations for qualifying teams",
      ],
      competitor: [
        {
          text: "Global-standard ERP depth, multi-entity finance, and industry templates at true enterprise scale",
          kind: "strength",
        },
        { text: "Massive partner ecosystem and decades of large-company references", kind: "strength" },
        {
          text: "Implementation, licensing, and governance costs reflect that enterprise ambition",
          kind: "gap",
        },
      ],
    },
    tableRows: [
      {
        name: "Core positioning",
        zoveto: "Focused operating system for growing operations businesses",
        competitor: "Enterprise ERP platform family covering global corporations and complex supply chains",
      },
      {
        name: "Inventory management",
        zoveto: "Inventory aligned to Zoveto’s target workflows and industries",
        competitor: "Extremely deep MRP, global supply chain, and plant scenarios for customers who need that breadth",
      },
      {
        name: "Warehouse workflows",
        zoveto: "Warehouse execution for SMB-scale complexity Zoveto is built around",
        competitor: "Advanced logistics capabilities for large distribution networks, often overkill for smaller teams",
      },
      {
        name: "Order processing",
        zoveto: "Streamlined quote-to-cash for mid-market throughput",
        competitor: "Highly configurable enterprise order management, powerful with significant setup",
      },
      {
        name: "CRM integration",
        zoveto: "CRM included in the same product direction as operations modules",
        competitor: "SAP CX and related suites are world-class for global enterprises with budget and timeline",
      },
      {
        name: "Finance / accounting",
        zoveto: "Finance tied to operational events for Zoveto’s scope",
        competitor: "SAP S/4HANA Finance and related products lead global enterprise finance transformation programmes",
      },
      {
        name: "Multi-module system",
        zoveto: "Lean module footprint to reduce adoption drag",
        competitor: "Broad module catalog, strength for enterprises, complexity for smaller teams",
      },
      {
        name: "Real-time operations visibility",
        zoveto: "Operational dashboards for SMB leadership teams",
        competitor: "Enterprise analytics when data lakes and governance programmes are in place",
      },
      {
        name: "Setup & onboarding",
        zoveto: "Months-scale onboarding for qualifying SMBs (not years-scale transformation by default)",
        competitor: "Major SAP programmes are commonly multi-year with large partner teams",
      },
      {
        name: "Custom workflows",
        zoveto: "Practical workflow patterns without unlimited bespoke enterprise scope by default",
        competitor: "Nearly unlimited configurability, demands specialised skills and budget",
      },
      {
        name: "Integrations required",
        zoveto: "Fewer enterprise middleware layers for Zoveto’s intended footprint",
        competitor: "Often integrates with banks, tax engines, PLM, MES, and legacy stacks via mature SAP tooling",
      },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You are an SMB or lower mid-market team that needs operational control without a multi-year SAP programme",
        "You want faster time-to-value on inventory, warehouse, and finance than a full enterprise rollout",
        "You prefer a single vendor operating narrative over assembling SAP modules piecemeal on a small budget",
      ],
      chooseCompetitor: [
        "You are a large or highly regulated enterprise with global template and audit requirements SAP is built for",
        "You already invested in SAP skills, hosting, and governance and are expanding footprint",
        "You need capabilities (multi-plant MRP, global tax, PLM integration) outside Zoveto’s current positioning",
      ],
    },
    workflow: {
      zoveto:
        "Zoveto keeps growing teams on one pragmatic chain: operational events in inventory and warehouse drive billing and finance views without waiting for a full enterprise template programme to finish.",
      competitor:
        "SAP programmes typically model every edge case upfront, powerful, but smaller teams often feel the weight of blueprinting, data migration, and hypercare before daily operators see benefits.",
    },
    limitations: [
      "Not a replacement for global SAP programmes that require multi-entity consolidation, PLM, or advanced MRP on day one.",
      "Zoveto does not claim parity with decades of SAP industry templates, it targets a narrower SMB/mid-market slice.",
    ],
    finalVerdict: [
      "If you need enterprise-grade global complexity and have the budget and team, SAP remains the incumbent class of solutions.",
      "If you need unified SMB operations with a leaner adoption path, Zoveto is usually the more pragmatic fit than standing up SAP for a smaller footprint.",
    ],
    ctaClosing: {
      headline: "See how Zoveto runs your operations",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: CTA_CLOSE_DEMO,
    },
  },
  {
    slug: "vyapar-vs-zoveto",
    competitor: "Vyapar",
    description:
      "Compare Zoveto vs Vyapar for SMBs that need billing, inventory, warehouse, CRM, and finance workflows beyond lightweight business apps.",
    hubLens: "Billing app vs operating spine",
    hubTeaser:
      "Vyapar is a practical fit for small businesses that mainly need billing and basic inventory. Zoveto is the next step when branches, dispatch, CRM, credit, and warehouse work need one operating record instead of side sheets.",
    keywords: ["Vyapar vs Zoveto", "Vyapar alternative", "billing app alternative", "ERP for growing SMB"],
    aeoLead:
      "Vyapar is usually the better fit for a single counter or small shop that lives on GST invoices and basic stock. Zoveto is stronger when the same invoice has to survive warehouse picks, branch transfers, credit limits, and collections without a side spreadsheet.\nUse this comparison to judge what happens after the bill is printed: stock, dispatch, CRM, and cash.",
    faqs: [
      {
        q: "When should a team choose Zoveto over Vyapar?",
        a: "Choose Zoveto when billing is no longer the hard part. If purchase orders, GRN, pick lists, dealer credit, and GST still live in chats or Excel after the invoice is cut, you have outgrown a billing-first app.",
      },
      {
        q: "What is Vyapar's main strength?",
        a: "Vyapar is quick to start for GST billing, e-invoicing basics, and lightweight item stock. Owners who mainly need to print invoices and see a simple item balance often get value without a rollout project.",
      },
      {
        q: "Where does Vyapar get limiting for operations-heavy teams?",
        a: "Warehouse waves, bin-level picks, multi-branch stock truth, CRM follow-ups tied to available quantity, and finance that posts from dispatch (not from a retyped invoice) are not Vyapar's center of gravity. Teams add sheets and WhatsApp to cover those gaps.",
      },
      {
        q: "Can we keep Vyapar for billing and add Zoveto later?",
        a: "You can, but dual billing systems recreate the same leak: which invoice is posted, which stock moved, who collected. The cleaner path is one posted record from order through GST invoice.",
      },
      {
        q: "How should we evaluate migration risk from Vyapar?",
        a: "Export item masters, opening stock, party ledgers, and a month of invoices first. Map which documents today are 'real' versus adjusted in Excel. Then move one high-volume SKU family or one branch, not the whole catalogue on day one.",
      },
    ],
    hero: {
      subtext:
        "Vyapar is built around the invoice. Zoveto is built around the operating record that the invoice should already be sitting on.",
      primaryCta: CTA_DEMO,
      secondaryCta: { label: "View pricing", href: "/pricing" },
    },
    quickSummary: {
      zoveto: [
        "GST invoices post from the same stock, dispatch, and credit record the warehouse already used",
        "CRM, inventory, WMS, and finance share one item and party master instead of a billing export",
        "Guided onboarding for teams that already feel the limits of a billing-first app",
      ],
      competitor: [
        { text: "Fast to start for GST billing, e-way basics, and simple item stock at a counter or small store", kind: "strength" },
        { text: "Warehouse execution, dealer CRM, and multi-branch stock usually sit outside the core Vyapar loop", kind: "gap" },
        { text: "Often best when the job is printing invoices and keeping a lightweight item list, not running dispatch", kind: "strength" },
      ],
    },
    tableRows: [
      { name: "Core positioning", zoveto: "Company operating system for inventory, warehouse, CRM, billing, and finance", competitor: "Billing-first business app for GST invoices and basic stock" },
      { name: "Inventory management", zoveto: "Stock connects to PO, GRN, picks, transfers, and invoices on one ledger", competitor: "Item stock is useful at invoice time; deeper warehouse and batch control is limited" },
      { name: "Warehouse workflows", zoveto: "Pick, pack, bin, and gate scans are operating workflows, not an afterthought", competitor: "Not a WMS; packing and dispatch usually live in paper, WhatsApp, or another tool" },
      { name: "CRM integration", zoveto: "Party, credit, quote, and order sit next to live available stock", competitor: "Customer records support billing; pipeline and follow-up discipline is thin" },
      { name: "Billing and finance", zoveto: "GST invoices follow posted dispatch and receipts, not a retyped bill", competitor: "Invoicing and GST are the product's strongest everyday loop" },
      { name: "Implementation model", zoveto: "Qualification-led onboarding with masters, opening stock, and workflow scoping", competitor: "Self-serve setup is faster when the scope is invoices and a short item list" },
      { name: "Custom workflows", zoveto: "Trading, distribution, and light manufacturing patterns Zoveto already runs", competitor: "Flexible for small-shop billing; operations design is mostly on the owner" },
      { name: "Real-time visibility", zoveto: "Owners see stock, open orders, dispatch, and collections together", competitor: "Visibility is strongest on today's invoices and item balances" },
      { name: "Regional context", zoveto: "GST, branches, and dealer credit as operating constraints, not add-ons", competitor: "Strong GST billing familiarity for Indian micro and small businesses" },
      { name: "Best fit", zoveto: "Teams that have outgrown billing-only workflows and need one operating record", competitor: "Small teams that mainly need GST invoices and lightweight stock" },
      { name: "Ongoing ownership", zoveto: "Zoveto owns more of the order-to-cash and stock loop inside one product", competitor: "Owners often stitch warehouse, CRM, and reports beside Vyapar as they grow" },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You invoice from Vyapar (or similar) but still reconcile stock and dispatch in Excel every night",
        "Dealers, branches, or a warehouse now need credit limits, picks, and GST to share one item master",
        "You want one vendor for the operating loop instead of a billing app plus three side systems",
      ],
      chooseCompetitor: [
        "You run a single counter or small shop and the daily job is GST invoices plus a short item list",
        "You do not yet need warehouse waves, bin stock, or CRM that checks live quantity",
        "You want to start today without a scoped onboarding conversation",
      ],
    },
    workflow: {
      zoveto:
        "On Zoveto, a typical day keeps the invoice on the same chain as the work: confirmed order reserves or issues stock, warehouse picks post back to that order, GST invoice follows what actually left the gate, and collections see the same party and document. The spreadsheet is not the second source of truth.",
      competitor:
        "With Vyapar, the invoice is usually the system of record. Stock is adjusted at bill time. As soon as goods move through a store, a van, or a second location, teams add WhatsApp photos, a dispatch sheet, and a Tally or Excel file so finance can catch up. That is fine until volume makes the night reconciliation the real job.",
    },
    limitations: [
      "Not the faster choice if you only need GST billing and a simple item list with no warehouse or CRM load.",
      "Zoveto onboarding is qualification-led. It is not an instant self-serve billing app.",
    ],
    finalVerdict: [
      "If billing and lightweight stock are the whole job, Vyapar is usually enough and faster to start.",
      "If the invoice is already the easy part and stock, dispatch, credit, and collections are the hard part, Zoveto is the more complete operating fit.",
    ],
    ctaClosing: {
      headline: "See how Zoveto runs billing on the same record as stock",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: { label: "View pricing", href: "/pricing" },
    },
  },
  {
    slug: "freshsales-vs-zoveto",
    competitor: "Freshsales",
    description:
      "Compare Zoveto vs Freshsales for teams choosing between CRM-led sales automation and a connected operations system.",
    hubLens: "CRM depth vs execution loop",
    hubTeaser:
      "Freshsales is strong when the buying problem is pipeline, sales engagement, and CRM automation. Zoveto is built for teams where every sale also needs stock, dispatch, billing, and collection visibility.",
    keywords: ["Freshsales vs Zoveto", "Freshsales alternative", "CRM with inventory", "operations CRM"],
    aeoLead:
      "Freshsales is usually the better fit for a sales team that lives in pipeline, sequences, and CRM reports. Zoveto is stronger when a won deal still has to check stock, create a warehouse wave, raise a GST invoice, and collect against the same party.\nUse this comparison to judge whether CRM is the product or only the first step of the operating loop.",
    faqs: [
      {
        q: "When should a team choose Zoveto over Freshsales?",
        a: "Choose Zoveto when sales already promises dates and quantities that warehouse and finance cannot see. If quotes are won in CRM and then retyped into inventory, dispatch, and billing, the leak is operational, not a missing email sequence.",
      },
      {
        q: "What is Freshsales's main strength?",
        a: "Freshsales is a dedicated CRM: pipeline stages, sales engagement, phone and email context, and automation aimed at converting leads. Sales-led teams that do not run a warehouse get a focused tool instead of an operations suite.",
      },
      {
        q: "Where does Freshsales get limiting for operations-heavy teams?",
        a: "Available-to-promise stock, pick/pack, GST invoices from dispatch, and receivables against the same SKU and party are not why teams buy Freshsales. Those steps land in ERP, Excel, or WhatsApp after the deal is marked won.",
      },
      {
        q: "Can we keep Freshsales and connect Zoveto for stock?",
        a: "Two systems can be wired, but the quote still has two truths unless stock and credit live in the same record the salesperson sees. Zoveto's CRM is intentionally near inventory and billing so that check is not an integration project.",
      },
      {
        q: "How should we evaluate a CRM-only stack versus Zoveto?",
        a: "Walk one real deal from first call to money in the bank. Count the handoffs after 'won'. If those handoffs are the painful part, a deeper CRM will not fix them.",
      },
    ],
    hero: {
      subtext:
        "Freshsales optimizes the pipeline. Zoveto keeps the won deal attached to stock, dispatch, GST, and collections.",
      primaryCta: CTA_DEMO,
      secondaryCta: { label: "View pricing", href: "/pricing" },
    },
    quickSummary: {
      zoveto: [
        "Quotes can see live stock, price lists, and credit before the customer is promised a date",
        "Won deals become orders, warehouse work, and invoices without retyping the line items",
        "Sales, stores, and finance share party and SKU masters instead of a CRM export",
      ],
      competitor: [
        { text: "Strong CRM for pipeline, sales engagement, and converting leads with sequences and activity history", kind: "strength" },
        { text: "Inventory, warehouse, GST billing, and collections are not the product's operating core", kind: "gap" },
        { text: "Often best when the team is sales-led and fulfilment is simple or handled in another system", kind: "strength" },
      ],
    },
    tableRows: [
      { name: "Core positioning", zoveto: "Operating system where CRM is one surface on inventory, warehouse, and finance", competitor: "CRM-first sales engagement and pipeline automation" },
      { name: "Inventory management", zoveto: "Quotes and orders read the same stock ledger as the warehouse", competitor: "Stock is typically another product or a field, not a live warehouse ledger" },
      { name: "Warehouse workflows", zoveto: "Picks and dispatch post back to the sales order", competitor: "Fulfilment is outside Freshsales; ops teams run a separate process" },
      { name: "CRM integration", zoveto: "CRM is built next to stock, orders, and receivables, not bolted on later", competitor: "CRM is the product: stages, activities, sequences, and sales reporting" },
      { name: "Billing and finance", zoveto: "Invoices and collections follow posted operational events", competitor: "Billing usually sits in Freshworks or a separate accounts tool" },
      { name: "Implementation model", zoveto: "Workflow scoping across sales and operations, not CRM fields alone", competitor: "Faster to launch a sales pipeline; operations wiring is extra work" },
      { name: "Custom workflows", zoveto: "Quote-to-cash patterns for trading and distribution teams", competitor: "Sales automation and CRM workflows are the mature surface" },
      { name: "Real-time visibility", zoveto: "Leadership sees pipeline together with stock and dispatch risk", competitor: "Leadership sees pipeline health; stock and cash sit in other dashboards" },
      { name: "Regional context", zoveto: "GST, dealer credit, and branch stock as part of the sales promise", competitor: "Global CRM patterns; Indian GST and warehouse depth depend on other tools" },
      { name: "Best fit", zoveto: "Sales promises must be executable against stock, warehouse, and finance", competitor: "CRM-first teams with light or outsourced fulfilment" },
      { name: "Ongoing ownership", zoveto: "One product direction for the operating loop after the deal is won", competitor: "Sales owns CRM; operations and finance own whatever sits downstream" },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "Your sales team already uses a CRM, but warehouse and accounts still re-enter every won deal",
        "Quotes fail because available stock and credit are not visible in the same screen as the pipeline",
        "You want CRM as part of operations, not as a reporting layer above disconnected fulfilment",
      ],
      chooseCompetitor: [
        "You are building a sales machine (sequences, calling, pipeline hygiene) and fulfilment is simple or outsourced",
        "You already standardized on Freshworks and only need CRM depth, not WMS or GST operations",
        "Inventory is someone else's system and you do not want to change that boundary yet",
      ],
    },
    workflow: {
      zoveto:
        "A Zoveto quote checks price and stock, converts to an order, drives a warehouse pick, and bills what shipped. The salesperson, store, and accounts clerk are looking at versions of the same document, not three exports of the same promise.",
      competitor:
        "A Freshsales deal can be run tightly through stages and tasks. When the deal is won, someone still has to create the order, check stock, plan dispatch, and raise the invoice elsewhere. That handoff is normal for CRM-only stacks. It becomes expensive when SKUs, credit, and GST are the daily constraint.",
    },
    limitations: [
      "Not a replacement for a dedicated CRM if you only need sequences, dialer workflows, and sales engagement.",
      "Zoveto's CRM is intentionally narrower than a full Freshworks-style engagement suite.",
    ],
    finalVerdict: [
      "If the job is filling and running a pipeline, Freshsales is usually the more focused CRM.",
      "If the job is making a won deal executable against stock, warehouse, GST, and collections, Zoveto is the better operating fit.",
    ],
    ctaClosing: {
      headline: "See a quote that can see stock before you promise it",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: { label: "View pricing", href: "/pricing" },
    },
  },
  {
    slug: "gohighlevel-vs-zoveto",
    competitor: "GoHighLevel",
    description:
      "Compare Zoveto vs GoHighLevel for agencies and SMBs choosing between marketing automation and operations software.",
    hubLens: "Marketing suite vs business ops",
    hubTeaser:
      "GoHighLevel is useful for agencies that need funnels, campaigns, and client marketing workflows. Zoveto is a different category: inventory, CRM, warehouse, finance, and operating control for businesses that move goods and money.",
    keywords: ["GoHighLevel vs Zoveto", "GoHighLevel alternative", "agency CRM", "operations software"],
    aeoLead:
      "GoHighLevel is usually the better fit for an agency running funnels, calendars, and client marketing under one white-label CRM. Zoveto is a different category: stock, warehouse, GST billing, and collections for businesses that move goods.\nUse this comparison to avoid buying a marketing OS when the pain is inventory and dispatch, or an operations OS when the pain is campaigns.",
    faqs: [
      {
        q: "When should a team choose Zoveto over GoHighLevel?",
        a: "Choose Zoveto when the broken work is SKUs, bins, GST invoices, and cash, not landing pages and appointment funnels. If the team is a distributor, manufacturer, or spare-parts trader, GoHighLevel will not become a warehouse or accounts system.",
      },
      {
        q: "What is GoHighLevel's main strength?",
        a: "GoHighLevel is built for agencies: funnels, campaigns, pipelines, calendars, and client sub-accounts. Marketing operators can run lead capture and follow-up without assembling a dozen consumer SaaS tools.",
      },
      {
        q: "Where does GoHighLevel get limiting for product businesses?",
        a: "There is no native WMS, GST tax engine, GRN, or pick/pack loop. Inventory and finance for physical goods are outside its purpose. Teams that sell products still need an operations system underneath the funnel.",
      },
      {
        q: "Can an agency use both?",
        a: "Yes, as different layers. GoHighLevel can own campaign and appointment flow. Zoveto can own what happens after an order is real: stock, dispatch, invoice, and collection. Do not expect either product to replace the other.",
      },
      {
        q: "How should we decide which category we are actually buying?",
        a: "Write down the last painful week. If it was ads, funnels, and no-shows, you are in GoHighLevel territory. If it was stockouts, wrong dispatches, and GST mismatches, you are in Zoveto territory.",
      },
    ],
    hero: {
      subtext:
        "GoHighLevel runs marketing and appointments. Zoveto runs inventory, warehouse, GST, and collections for businesses that ship goods.",
      primaryCta: CTA_DEMO,
      secondaryCta: { label: "View pricing", href: "/pricing" },
    },
    quickSummary: {
      zoveto: [
        "Inventory, warehouse, CRM, billing, and finance on one posted operating record",
        "Built for teams that buy, store, pick, and invoice physical goods in India",
        "Automation is attached to operational events, not campaign sequences",
      ],
      competitor: [
        { text: "Strong agency OS for funnels, campaigns, calendars, pipelines, and client sub-accounts", kind: "strength" },
        { text: "No native warehouse, GST inventory ledger, or finance posting from dispatch", kind: "gap" },
        { text: "Often best when the customer is an agency or a services business, not a goods operator", kind: "strength" },
      ],
    },
    tableRows: [
      { name: "Core positioning", zoveto: "Company operating system for goods, stock, warehouse, and GST operations", competitor: "Marketing and agency operating system for funnels, CRM, and campaigns" },
      { name: "Inventory management", zoveto: "Stock ledger tied to PO, GRN, picks, and invoices", competitor: "Not an inventory product; product businesses keep stock elsewhere" },
      { name: "Warehouse workflows", zoveto: "Scan-first picks, packing, and dispatch as core workflows", competitor: "No WMS; physical fulfilment is out of scope" },
      { name: "CRM integration", zoveto: "CRM sits next to stock and receivables for operators who sell goods", competitor: "CRM, pipelines, and conversations are the product for agencies and local services" },
      { name: "Billing and finance", zoveto: "GST invoices and collections follow posted operational events", competitor: "Payments and invoices support marketing and appointments, not GST inventory accounting" },
      { name: "Implementation model", zoveto: "Founder-led operational onboarding for masters and workflows", competitor: "Agency snapshot and funnel setup; client accounts can go live quickly" },
      { name: "Custom workflows", zoveto: "Trading, distribution, manufacturing, and warehouse patterns", competitor: "Funnels, automations, calendars, and white-label client delivery" },
      { name: "Real-time visibility", zoveto: "Owners see stock, orders, dispatch, and cash together", competitor: "Operators see pipeline, campaign, and appointment performance" },
      { name: "Regional context", zoveto: "Indian SMB GST, branches, and dealer ops as first-class constraints", competitor: "Global agency SaaS; India GST and warehouse depth are not the design center" },
      { name: "Best fit", zoveto: "Businesses that move goods and need one operating record", competitor: "Agencies and marketing teams running funnels and client campaigns" },
      { name: "Ongoing ownership", zoveto: "Operations and finance own the system of record for goods", competitor: "Marketing or agency operators own campaigns and client sub-accounts" },
    ],
    whoShouldUse: {
      chooseZoveto: [
        "You manufacture, distribute, or trade goods and the pain is stock, dispatch, GST, and collections",
        "A funnel already produces orders, but warehouse and accounts cannot trust the record",
        "You need an operations system, not another marketing CRM",
      ],
      chooseCompetitor: [
        "You run an agency and need funnels, calendars, pipelines, and client sub-accounts in one place",
        "You sell services or appointments more than SKUs, bins, and GST inventory",
        "Your primary job is campaigns and lead conversion, not warehouse execution",
      ],
    },
    workflow: {
      zoveto:
        "Zoveto starts when an order is real: stock is promised, a pick happens, a gate pass posts, a GST invoice follows, and collections see the same party. Marketing can sit upstream. It is not the ledger.",
      competitor:
        "GoHighLevel starts when a lead hits a funnel: tags, sequences, appointments, and a pipeline card. That loop is excellent for agencies. When the 'customer' is actually buying cartons from a warehouse, the work after the form submit still needs an operations system.",
    },
    limitations: [
      "Not an agency marketing OS. Zoveto will not replace funnels, snapshots, or white-label client accounts.",
      "If you only need campaigns and calendars, GoHighLevel is the more honest category match.",
    ],
    finalVerdict: [
      "If you run an agency or a marketing-led services book, GoHighLevel is usually the right category.",
      "If you run inventory, warehouse, and GST for physical goods, Zoveto is the operating system and GoHighLevel is at most a funnel on top.",
    ],
    ctaClosing: {
      headline: "See the operations system, not another marketing CRM",
      primaryCta: CTA_CLOSE_SETUP,
      secondaryCta: { label: "View pricing", href: "/pricing" },
    },
  },
];

export function getComparePageBySlug(slug: string): ComparePage | undefined {
  return COMPARE_PAGES.find((item) => item.slug === slug);
}

/** AEO lead: phase1 uses `aeoUnderH1`; legacy pages use `aeoLead`. */
export function getComparePageAeoLead(page: ComparePage): string {
  if (page.phase1) return page.phase1.aeoUnderH1;
  if (!page.aeoLead) throw new Error(`Compare page ${page.slug} missing aeoLead`);
  return page.aeoLead;
}

/** FAQs for schema + visible block - always from phase1 or `faqs`. */
export function getComparePageFaqs(page: ComparePage): readonly ComparePageFaq[] {
  if (page.phase1) {
    return page.phase1.faqs.map((f) => ({ q: f.question, a: f.answer }));
  }
  if (!page.faqs || page.faqs.length < 5) throw new Error(`Compare page ${page.slug} needs at least 5 faqs`);
  return page.faqs;
}
