/**
 * India-focused SEO landing pages - copy and meta only (rendered by App Router pages).
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
      "For Indian SMEs, warehouse success means bin-level stock truth, dispatch speed, and GST-aligned documents tied to the same ledger, not spreadsheets.\nZoveto is a Company Operating System that runs warehouse execution together with inventory and finance.",
    intro:
      "If you run a warehouse management system in India, you need bin-level accuracy, fast dispatch, and numbers that finance and operations agree on, without spreadsheets as the source of truth.",
    sections: [
      {
        h2: "Who this page is for",
        paragraphs: [
          "Distribution, manufacturing, and trading teams that pick, pack, and ship daily, and feel pain when bins, returns, or gate entry are tracked in chats and Excel.",
        ],
      },
      {
        h2: "What to evaluate in a WMS",
        paragraphs: [
          "Shortlist tools against outcomes you can audit: fewer mis-picks, faster trucks out, traceability from GRN to invoice, and role-based access for contract staff.",
        ],
        bullets: [
          "Putaway and bin moves reflected in real time, not end-of-day uploads.",
          "Wave or batch picking that fits your layout, not a generic template.",
          "Returns (RTO) reopening stock with reason codes tied to customer history.",
          "Integration with inventory and billing so dispatch does not outrun finance.",
        ],
      },
      {
        h2: "India-specific operating context",
        paragraphs: [
          "GST-compliant invoices and credit notes should flow from the same stock truth your warehouse uses. Multi-site businesses need a single ledger with clear ownership per location, especially when HO, branches, and 3PL hubs all move stock.",
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
        a: "Scope varies by sites, integrations, and data cleanliness. We scope honestly on a discovery call and align milestones to your peak seasons, not a generic template.",
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
      "ERP software for small businesses in India: inventory, CRM, finance, and ops on one stack, without duct-taping spreadsheets. Plans, trial, and demo inside.",
    h1: "ERP software for small businesses in India",
    directAnswer:
      "Small businesses in India need one execution stack for orders, stock, GST billing, and collections, not another silo next to WhatsApp and Excel.\nZoveto is a Company Operating System built for that daily operating reality.",
    intro:
      "ERP software for small businesses in India should reduce chaos across inventory, sales, and money, not add another silo. The goal is one place to run the business day-to-day, with GST-aware workflows your team can actually adopt.",
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
          "Role-based access and audit trails, not everyone admin.",
          "Implementation plan tied to your volumes, not a slide deck.",
        ],
      },
      {
        h2: "Pricing and next steps",
        paragraphs: [
          "Transparent plan tiers help you match spend to stage. When you are ready, book a demo; we map your current mess to a phased rollout instead of a big-bang gamble.",
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
        a: "Yes. Migration scope depends on historical depth and chart structure; we assess fidelity and risk up front so finance signs off with confidence.",
      },
      {
        q: "Do you offer a trial?",
        a: "Paid tiers include a trial window; see current plans on the pricing page or ask on a demo call for eligibility.",
      },
      {
        q: "What is the fastest way to judge fit for an Indian SMB?",
        a: "Bring your highest-frequency workflow, usually quote-to-cash or purchase-to-pay, and we walk the exact screens and postings on a demo. Fit is about execution continuity, not brochure checklists.",
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
      "Inventory management software in India should give you one truthful view of stock across branches, in-transit, and returns, before margin leaks into expedite shipping and write-offs.",
    sections: [
      {
        h2: "Signals you have outgrown spreadsheets",
        paragraphs: [
          "When branches disagree on on-hand, finance posts adjustments weekly, or you discover dead stock only during physical counts, the cost is already in motion. Software should make variance visible early, not at audit time.",
        ],
      },
      {
        h2: "Capabilities that matter on the ground",
        paragraphs: ["Prioritize features your ops team will run daily:"],
        bullets: [
          "Multi-location sync with in-transit visibility.",
          "GRN tied to POs and approvals, not orphan receipts.",
          "Batch and expiry (FEFO) when you move dated goods.",
          "Aging and slow-mover views finance can trust.",
        ],
      },
      {
        h2: "Connect inventory to the rest of the business",
        paragraphs: [
          "Inventory should feed CRM commitments, dispatch, and GST invoices from the same numbers. Zoveto treats stock as a core OS surface, not an add-on module floating beside everything else.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do we improve accuracy first?",
        a: "Start with disciplined GRN, cycle count cadence, and low-stock rules based on demand, not gut feel. We help you sequence the habits alongside the software.",
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
        a: "Software exposes bad discipline faster, it does not replace ownership. We pair rollout with clear rules for who owns masters, counts, and exceptions so accuracy sticks.",
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
      "Company Operating System for Indian SMBs: inventory, GST billing, CRM & warehouse on one execution stack. No stitched ERP silos. Zoveto fit guide. Book a demo.",
    h1: "Company Operating System for Indian SMBs",
    directAnswer:
      "A Company Operating System runs your core workflows, quote, stock, pick, dispatch, invoice, collect, on one posted record instead of WhatsApp + Excel bridges.\nZoveto is that OS for operations-heavy Indian SMBs; traditional ERP checklists alone rarely fix execution seams.",
    intro:
      "If you are evaluating a Company Operating System in India, you are really asking whether sales, warehouse, and finance can trust the same numbers before month-end. Zoveto narrows scope to the operating spine SMBs actually run daily, then links modules so handoffs do not become integration projects.",
    sections: [
      {
        h2: "Why “ERP” buying checklists miss the point",
        paragraphs: [
          "ERP evaluations often optimise feature breadth while execution still breaks at the seam between CRM promises, warehouse reality, and GST lines. A Company Operating System optimises continuity of those steps for the industries it targets, not infinite vertical coverage.",
        ],
      },
      {
        h2: "How Zoveto differs from stitched stacks",
        paragraphs: [
          "Zoveto combines inventory, warehouse execution, CRM, finance, and optional AI assistance where teams define rules, aimed at Indian trading, distribution, parts, and manufacturing patterns. Read the FAQ hub for cross-topic answers, then compare plans when you want numbers on the table.",
        ],
        bullets: [
          "Posted movements instead of reconciled extracts every Friday.",
          "Credit and availability enforced where orders are saved, not only in analysis decks.",
          "Branch-aware stock with in-transit states your sales team can quote against.",
        ],
      },
      {
        h2: "Next steps",
        paragraphs: [
          "Start with the product overview, skim the India FAQ hub, and book a demo so we can map your quote-to-cash or inventory chain honestly, without forcing a category label that does not match your pain.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a Company Operating System the same as ERP?",
        a: "ERP is often part of the stack, but the OS framing centres on execution continuity. Buyers should score how orders, stock, dispatch, and billing post, not how long the module menu is.",
      },
      {
        q: "When should an Indian SMB choose an OS-first product?",
        a: "When throughput, branch complexity, or GST reconciliation drag is driven by handoffs, not by missing a single GL report. If seams cost margin weekly, OS-first fit matters.",
      },
      {
        q: "Does Zoveto replace WhatsApp entirely?",
        a: "WhatsApp may remain for external chatter, but operational truth should live in posted records. Zoveto targets teams ready to move approvals, stock, and tasks into the OS instead of informal channels.",
      },
      {
        q: "How does this relate to AI automation?",
        a: "Automation should sit on clean posted events with guardrails, Zoveto applies AI where repeat decisions are policy-bound, not as a black box on money postings.",
      },
      {
        q: "Where can I read broader questions beyond this page?",
        a: "Use the site FAQ hub for grouped answers across GST, inventory, CRM, and automation, then return here for category framing versus traditional ERP buying.",
      },
    ],
    deepLink: { href: "/faq", label: "Browse the FAQ hub" },
  },
  {
    path: "/crm-software-india",
    breadcrumbName: "CRM software India",
    metaTitle: "CRM software India | Zoveto sales CRM",
    metaDescription:
      "CRM software for Indian B2B teams: lead capture, follow-ups, quotes, orders, inventory checks, and collections on one operating record.",
    h1: "CRM software for Indian B2B sales teams",
    directAnswer:
      "Indian B2B teams need CRM that connects follow-ups to stock, quotes, orders, and dues.\nZoveto keeps CRM inside the same operating system as inventory and finance so promises stay executable.",
    intro:
      "CRM software in India should not become another contact database beside WhatsApp, Excel, and billing. For operations-heavy teams, the useful CRM is the one that keeps sales commitments aligned with stock, dispatch, and collections.",
    sections: [
      {
        h2: "What to evaluate",
        paragraphs: [
          "Start with the daily path from enquiry to quotation to order. If sales needs to call the warehouse for every promise, the CRM is not connected deeply enough for a scaling Indian business.",
        ],
        bullets: [
          "Lead capture from web, referral, WhatsApp, email, and field teams.",
          "Quote and order flow that checks stock and credit posture.",
          "Follow-up tasks tied to customer history and receivables.",
          "Owner visibility without asking each salesperson for a separate update.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto CRM is built as part of the Company Operating System. That means sales context sits near inventory, warehouse, billing, and collections instead of living in a separate sales-only universe.",
        ],
      },
      {
        h2: "Best fit",
        paragraphs: [
          "Use this page if you run distribution, trading, manufacturing, or warehouse-led operations where every promise has stock, dispatch, and cash consequences.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Zoveto a standalone CRM?",
        a: "Zoveto includes CRM workflows, but its strongest fit is CRM connected to inventory, orders, and finance. If you only need lightweight contact tracking, a narrower CRM may be enough.",
      },
      {
        q: "Can sales teams follow up from WhatsApp context?",
        a: "Zoveto is designed around multi-channel follow-up discipline. WhatsApp can remain a communication channel, but operational promises should live in structured customer records.",
      },
      {
        q: "How does CRM connect to stock?",
        a: "Quotes and orders should respect posted availability, reservations, and credit posture. That is the difference between a contact tool and an operations-aware CRM.",
      },
      {
        q: "Who should consider Zoveto CRM?",
        a: "Indian SMBs where sales, dispatch, inventory, and finance frequently disagree are better candidates than teams that only need simple pipeline tracking.",
      },
      {
        q: "Where should we start in a demo?",
        a: "Bring one real lead-to-order flow. We can map enquiry capture, quote creation, stock check, order confirmation, dispatch, and collection visibility.",
      },
    ],
    deepLink: { href: "/modules/crm", label: "Explore CRM capabilities" },
  },
  {
    path: "/hr-payroll-software-india",
    breadcrumbName: "HR payroll India",
    metaTitle: "HR payroll software India | Zoveto HRMS",
    metaDescription:
      "HR payroll software for Indian SMBs: attendance, leave, payroll, PF, ESI, PT, TDS context, approvals, and salary slips in one system.",
    h1: "HR payroll software for Indian SMBs",
    directAnswer:
      "Indian SMB payroll needs attendance, leave, approvals, salary calculation, and compliance context to stay connected.\nZoveto HRMS links people operations with the wider operating system so payroll is not rebuilt from sheets.",
    intro:
      "HR payroll software in India should reduce monthly calculation pressure and give owners visibility without asking HR to rebuild attendance, leave, and salary data manually.",
    sections: [
      {
        h2: "Payroll pain to solve first",
        paragraphs: [
          "Most payroll friction starts before payroll day: late attendance corrections, informal leave approvals, unclear employee masters, and salary inputs scattered across messages.",
        ],
        bullets: [
          "Attendance and leave data owned before payroll run.",
          "PF, ESI, PT, and TDS context visible where relevant.",
          "Approval trail for changes that affect salary.",
          "Salary slips and employee communication handled consistently.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto HRMS is part of a wider business operating stack, so people workflows can align with roles, approvals, cost visibility, and operational teams rather than sitting in a disconnected payroll file.",
        ],
      },
      {
        h2: "Implementation note",
        paragraphs: [
          "Compliance outcomes depend on correct masters, policies, and review by your finance or compliance partner. The software should make the process visible and repeatable.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Zoveto calculate statutory payroll automatically?",
        a: "Zoveto is designed to support payroll calculations and compliance context, but configuration, employee masters, and policy review determine final correctness.",
      },
      {
        q: "Can attendance and leave feed payroll?",
        a: "Yes, the goal is to reduce manual monthly reconstruction by tying attendance and leave records to the payroll workflow.",
      },
      {
        q: "Is HRMS included in every plan?",
        a: "Public pricing lists HRMS in higher tiers. Review the current pricing page or discuss your employee count on a demo.",
      },
      {
        q: "Can employees receive salary slips digitally?",
        a: "The people module is designed for structured employee communication, including salary slip delivery where configured for the account.",
      },
      {
        q: "Who should evaluate this page?",
        a: "Owners, HR leads, and finance teams that currently run attendance, leave, and payroll through spreadsheets or disconnected tools.",
      },
    ],
    deepLink: { href: "/modules/hrms", label: "Explore HRMS capabilities" },
  },
  {
    path: "/ai-business-automation-india",
    breadcrumbName: "AI automation India",
    metaTitle: "AI business automation India | Zoveto",
    metaDescription:
      "AI business automation for Indian SMB operations: alerts, exception queues, follow-up nudges, low-stock signals, and controlled workflows.",
    h1: "AI business automation for Indian SMB operations",
    directAnswer:
      "AI automation is useful only when it works on clean operating records and clear rules.\nZoveto applies automation to exception queues, reminders, stock signals, and operational nudges inside one business system.",
    intro:
      "AI business automation in India should not mean black-box posting on money or tax workflows. It should start with low-risk, high-frequency operating loops that teams already understand.",
    sections: [
      {
        h2: "Where automation should start",
        paragraphs: [
          "The safest early wins are nudges and exception queues: overdue follow-ups, low stock, stalled approvals, delayed dispatches, and missing collections tasks.",
        ],
        bullets: [
          "Low-stock and reorder alerts from posted inventory.",
          "Lead and collection follow-up reminders with named owners.",
          "Dispatch and approval exception queues.",
          "Anomaly signals reviewed by humans before risky action.",
        ],
      },
      {
        h2: "Guardrails matter",
        paragraphs: [
          "Automation quality depends on clean masters, ownership, and rules. Zoveto positions AI as assistance on top of the operating record, not as a replacement for controls.",
        ],
      },
      {
        h2: "How to evaluate fit",
        paragraphs: [
          "Bring three repetitive decisions your managers make weekly. A good automation fit has clear inputs, clear owner, clear exception path, and measurable time saved.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Zoveto use AI to post financial transactions automatically?",
        a: "Risky money and tax workflows should keep human-controlled approvals. Zoveto focuses automation on assistance, queues, reminders, and controlled operational signals.",
      },
      {
        q: "What is a safe first automation?",
        a: "Overdue task reminders, low-stock alerts, and stalled lead nudges are safer first steps because they improve action without silently changing records.",
      },
      {
        q: "Do we need clean data before automation?",
        a: "Yes. Dirty item masters, branch rules, or customer records will make automation noisy. Fix ownership before scaling automation.",
      },
      {
        q: "How should we measure automation value?",
        a: "Track response time, missed follow-ups, stockout frequency, and correction rate before and after each automation.",
      },
      {
        q: "Where is automation visible in Zoveto?",
        a: "Automation appears through alerts, exceptions, nudges, and module-level workflows tied to the same operating record.",
      },
    ],
    deepLink: { href: "/modules/analytics", label: "Explore Intelligence capabilities" },
  },
  {
    path: "/gst-billing-software-india",
    breadcrumbName: "GST billing India",
    metaTitle: "GST billing software India | Zoveto",
    metaDescription:
      "GST billing software for Indian operations teams: invoices, credit notes, dispatch context, branch transfers, and ledger visibility.",
    h1: "GST billing software for Indian operations teams",
    directAnswer:
      "GST billing works best when invoice lines inherit from real dispatch and return records.\nZoveto connects orders, stock, billing, and finance so GST work is not recreated from paperwork.",
    intro:
      "GST billing software in India should do more than produce invoice PDFs. For trading, distribution, manufacturing, and warehousing teams, billing must stay connected to what actually moved.",
    sections: [
      {
        h2: "What to validate",
        paragraphs: [
          "Trace one order from confirmation to dispatch to invoice to credit note. If quantities or tax context are retyped, reconciliation risk remains.",
        ],
        bullets: [
          "Invoice lines tied to order and dispatch context.",
          "Credit notes linked to returns and reason codes.",
          "Branch and GST registration structure mapped clearly.",
          "Finance visibility into posted stock and sales events.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto finance is designed to follow operational events. That gives billing teams cleaner source context and reduces the gap between warehouse truth and ledger truth.",
        ],
      },
      {
        h2: "Compliance note",
        paragraphs: [
          "GST settings, rates, registration mapping, and filing review remain business responsibilities. The software should preserve traceability and reduce duplicate entry.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Zoveto a GST invoice generator?",
        a: "Zoveto supports GST-aware billing inside a broader operating system. It is not only a standalone invoice PDF tool.",
      },
      {
        q: "Can invoices inherit from dispatch?",
        a: "That is the intended operating model: dispatch closure should provide quantities and context for billing rather than forcing re-entry.",
      },
      {
        q: "Does Zoveto handle credit notes and returns?",
        a: "Returns and credit notes should link to original operational context so reconciliation is traceable. Bring your scenarios to a demo.",
      },
      {
        q: "Can multiple GST registrations be mapped?",
        a: "Multi-registration setups should be reviewed during onboarding so entities, branches, and ledgers align with your actual structure.",
      },
      {
        q: "Who should read this page?",
        a: "Teams where billing, warehouse, and finance currently reconcile invoices from separate files, slips, or chat messages.",
      },
    ],
    deepLink: { href: "/modules/finance", label: "Explore Finance capabilities" },
  },
  {
    path: "/tally-alternative-india",
    breadcrumbName: "Tally alternative India",
    metaTitle: "Tally alternative India | Zoveto",
    metaDescription:
      "Evaluate Zoveto as a Tally alternative for Indian SMBs that need inventory, warehouse, CRM, GST billing, and operations in one system.",
    h1: "Tally alternative for Indian SMB operations",
    directAnswer:
      "Tally remains strong for accounting-led teams, but many growing SMBs need execution beyond vouchers.\nZoveto is a Tally alternative when sales, warehouse, inventory, and billing need one operating record.",
    intro:
      "A Tally alternative in India should be evaluated honestly. If your pain is only accounting, Tally may be enough. If your pain is warehouse, sales, dispatch, and billing drift, the operating system layer matters.",
    sections: [
      {
        h2: "When to consider a move",
        paragraphs: [
          "Consider a broader system when orders are tracked outside the ledger, inventory is corrected late, dispatch proof is scattered, and customer follow-ups live in personal phones.",
        ],
        bullets: [
          "Sales promises need live stock context.",
          "Warehouse execution needs tasks and scan-ready discipline.",
          "Billing should inherit from dispatch.",
          "Leadership needs current operational visibility, not only month-end books.",
        ],
      },
      {
        h2: "When Tally may remain enough",
        paragraphs: [
          "If your business is finance-led, low complexity, and already disciplined around vouchers with light inventory, staying with Tally can be pragmatic.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto is positioned for teams that need CRM, inventory, warehouse, finance, and automation to work from one operating record.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Zoveto replace Tally for every business?",
        a: "No. Zoveto is a better fit when operations have outgrown voucher-only discipline. Some finance-led businesses can stay with Tally.",
      },
      {
        q: "Can we migrate from Tally gradually?",
        a: "Migration scope depends on masters, opening balances, history depth, and rollout risk. A phased approach is usually safer than a rushed switch.",
      },
      {
        q: "What should we compare first?",
        a: "Compare quote-to-cash, dispatch-to-invoice, branch stock, and collections visibility. Those workflows reveal whether accounting-only tooling is enough.",
      },
      {
        q: "Is Zoveto cloud-based?",
        a: "Zoveto is designed as a web-based operating system for teams that need shared operational visibility across roles and locations.",
      },
      {
        q: "Where can I see the detailed comparison?",
        a: "Read the Tally vs Zoveto comparison page, then book a demo with one real workflow from your business.",
      },
    ],
    deepLink: { href: "/compare/tally-vs-zoveto", label: "Read Tally vs Zoveto" },
  },
  {
    path: "/erp-software-distributors-india",
    breadcrumbName: "Distributor ERP India",
    metaTitle: "ERP software distributors India | Zoveto",
    metaDescription:
      "ERP software for Indian distributors: depot stock, beat sales, credit limits, dispatch, GST billing, collections, and branch visibility.",
    h1: "ERP software for distributors in India",
    directAnswer:
      "Distributors need ERP that connects depot stock, orders, credit, dispatch, billing, and collections.\nZoveto gives Indian distribution teams one operating record instead of branch sheets and delayed reports.",
    intro:
      "ERP software for distributors in India should reduce order tracking gaps, stock mismatch, delayed fulfillment, and credit confusion across depots, branches, and field teams.",
    sections: [
      {
        h2: "Distribution workflows to evaluate",
        paragraphs: [
          "The right system should show what is available, what is committed, what is in transit, what is blocked by credit, and what has actually shipped.",
        ],
        bullets: [
          "Depot and branch inventory with in-transit visibility.",
          "Order release tied to credit and stock rules.",
          "Pick, pack, dispatch, invoice, and collection continuity.",
          "Route, beat, or customer visibility where relevant.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto connects CRM, warehouse, inventory, finance, and analytics so distributors stop rebuilding operational truth at the end of each week.",
        ],
      },
      {
        h2: "Best first demo flow",
        paragraphs: [
          "Use a real high-volume order path: enquiry, availability check, credit decision, pick, dispatch, invoice, and collection task.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can Zoveto support multiple depots?",
        a: "Zoveto is designed for multi-location operating visibility. Your branch and entity structure should be mapped during discovery.",
      },
      {
        q: "How does ERP reduce stock mismatch?",
        a: "Stock improves when transfers, reservations, GRN, picks, dispatches, and returns post as work happens instead of being reconstructed later.",
      },
      {
        q: "Can credit limits affect order release?",
        a: "That is a key distribution workflow. Credit posture should be visible before goods leave, not only after finance reviews aging reports.",
      },
      {
        q: "Does this replace a standalone CRM?",
        a: "For distribution workflows, CRM works best when it is tied to orders, stock, and collections. Zoveto targets that connected use case.",
      },
      {
        q: "Where should distributors read next?",
        a: "Read the distribution industry page, inventory page, and pricing page before booking a workflow-specific demo.",
      },
    ],
    deepLink: { href: "/industries/distribution", label: "Explore distribution workflows" },
  },
  {
    path: "/migrate-from-tally",
    breadcrumbName: "Migrate from Tally",
    metaTitle: "Migrate from Tally to Zoveto | Guide",
    metaDescription:
      "Migration guide for Indian SMBs moving from Tally-led operations to Zoveto: masters, opening balances, inventory, billing, and rollout risk.",
    h1: "Migrate from Tally to an operating system",
    directAnswer:
      "Migrating from Tally should start with scope, not enthusiasm.\nZoveto migration planning focuses on masters, balances, inventory truth, billing continuity, and phased rollout risk.",
    intro:
      "Migrating from Tally in India is safest when finance and operations agree what moves, what stays archived, and which workflow goes live first.",
    sections: [
      {
        h2: "Migration checklist",
        paragraphs: [
          "A disciplined migration starts with masters, chart mapping, opening balances, inventory valuation, customer and vendor cleanup, and transaction history decisions.",
        ],
        bullets: [
          "Decide whether historical transactions migrate or remain archived.",
          "Clean item, customer, vendor, branch, tax, and unit masters.",
          "Validate opening stock and balances before go-live.",
          "Run parallel checks before finance signs off.",
        ],
      },
      {
        h2: "Recommended rollout",
        paragraphs: [
          "Most teams should avoid a rushed big-bang move. Start with the workflow causing the most operational leakage, then phase finance cutover with clear controls.",
        ],
      },
      {
        h2: "How Zoveto supports the move",
        paragraphs: [
          "Zoveto onboarding is qualification-first. The migration plan should reflect your branch structure, SKU hygiene, tax setup, and operational readiness.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can all Tally history be migrated?",
        a: "It depends on data quality, history depth, and the value of carrying every transaction forward. Often, clean masters and opening balances matter more than full history.",
      },
      {
        q: "Should we switch everything at once?",
        a: "Usually no. Phased rollout reduces risk, especially when inventory, billing, and finance teams need training.",
      },
      {
        q: "What data should be cleaned first?",
        a: "Item masters, customer and vendor masters, tax mappings, units, branch names, and duplicate ledgers should be reviewed before migration.",
      },
      {
        q: "Can Tally remain as archive?",
        a: "Yes, many businesses keep prior accounting records archived while new workflows run in the new system after cutover.",
      },
      {
        q: "What should finance validate before go-live?",
        a: "Opening balances, stock valuation, tax configuration, invoice numbering, and reporting expectations should be signed off before launch.",
      },
    ],
    deepLink: { href: "/compare/tally-vs-zoveto", label: "Compare Tally and Zoveto" },
  },
  {
    path: "/migrate-from-zoho",
    breadcrumbName: "Migrate from Zoho",
    metaTitle: "Migrate from Zoho to Zoveto | Guide",
    metaDescription:
      "Migration guide for teams moving from a Zoho app stack to Zoveto: CRM, inventory, finance, integrations, ownership, and rollout phases.",
    h1: "Migrate from a Zoho app stack to Zoveto",
    directAnswer:
      "Moving from Zoho is mostly an integration and ownership decision.\nZoveto helps when teams want CRM, inventory, warehouse, and finance on one operating record instead of many app seams.",
    intro:
      "Migrating from Zoho in India should start by mapping which apps hold customer, item, order, invoice, and task truth today.",
    sections: [
      {
        h2: "Before migration",
        paragraphs: [
          "List every Zoho app and integration involved in lead capture, quotation, inventory, billing, support, and reporting. The risk is usually hidden in handoffs.",
        ],
        bullets: [
          "Map CRM fields and pipeline stages.",
          "Review item, customer, vendor, and price list data.",
          "Identify custom workflows and automations that must be replaced.",
          "Decide which reports are business-critical after cutover.",
        ],
      },
      {
        h2: "When migration makes sense",
        paragraphs: [
          "Migration makes sense when the cost of keeping apps synchronized is greater than the flexibility those separate apps provide.",
        ],
      },
      {
        h2: "How Zoveto differs",
        paragraphs: [
          "Zoveto narrows scope around the operating loop: CRM, inventory, warehouse, billing, and finance continuity for teams that need fewer seams.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should we migrate every Zoho app?",
        a: "No. First identify which apps carry operational truth. Some marketing or support tools may remain separate depending on fit.",
      },
      {
        q: "What is the biggest migration risk?",
        a: "Hidden custom automations and field logic. Document them before deciding what Zoveto should replace.",
      },
      {
        q: "Can CRM data move into Zoveto?",
        a: "CRM migration depends on field quality, pipeline design, duplicates, and whether historical activities are needed after cutover.",
      },
      {
        q: "When should Zoho remain in place?",
        a: "If your team benefits from Zoho's broad app catalog and can govern integrations well, migration may not be necessary.",
      },
      {
        q: "Where can I compare the systems?",
        a: "Read the Zoho vs Zoveto comparison, then bring your current app map to a demo.",
      },
    ],
    deepLink: { href: "/compare/zoho-vs-zoveto", label: "Compare Zoho and Zoveto" },
  },
  {
    path: "/migrate-from-excel",
    breadcrumbName: "Migrate from Excel",
    metaTitle: "Migrate from Excel to ERP | Zoveto",
    metaDescription:
      "Move from Excel operations to Zoveto with cleaner masters, stock control, CRM, dispatch, billing, permissions, and staged rollout.",
    h1: "Migrate from Excel operations to Zoveto",
    directAnswer:
      "Excel migration is not just importing sheets; it is deciding who owns each record after go-live.\nZoveto helps teams move stock, CRM, dispatch, and billing into one controlled operating system.",
    intro:
      "Migrating from Excel in India should focus on record ownership, workflow discipline, and clean master data before importing anything into a new system.",
    sections: [
      {
        h2: "What to clean first",
        paragraphs: [
          "Spreadsheets usually hide duplicates, stale SKUs, inconsistent units, missing GST data, and unofficial process rules. Clean those before treating the sheet as truth.",
        ],
        bullets: [
          "Item, customer, vendor, branch, and unit masters.",
          "Opening stock and location-level balances.",
          "User roles for who can edit what after go-live.",
          "Approval paths that currently happen informally.",
        ],
      },
      {
        h2: "Phased rollout",
        paragraphs: [
          "Start with the highest pain workflow: inventory, quote-to-order, dispatch, or billing. Prove adoption before migrating every spreadsheet.",
        ],
      },
      {
        h2: "How Zoveto fits",
        paragraphs: [
          "Zoveto replaces spreadsheet bridges with posted workflows and permissions so operations stop depending on file versions and tribal memory.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can Zoveto import Excel data?",
        a: "Data import is part of onboarding, but the important work is cleaning masters and deciding ownership before go-live.",
      },
      {
        q: "Should all sheets be migrated?",
        a: "No. Some sheets are reports, some are process notes, and some are broken source data. Only operational records that matter should move.",
      },
      {
        q: "What is the safest first workflow?",
        a: "Choose the workflow causing daily leakage, often stock control, order tracking, dispatch, or collections.",
      },
      {
        q: "How do permissions change after Excel?",
        a: "Role-based access replaces everyone-editing-everything. That reduces accidental changes and makes accountability clearer.",
      },
      {
        q: "How long does an Excel migration take?",
        a: "It depends on data cleanliness, number of users, branches, and workflow scope. A staged rollout is usually safer than a rushed import.",
      },
    ],
    deepLink: { href: "/product", label: "See the Zoveto product overview" },
  },
];

export const SEO_LANDING_PATHS: readonly string[] = landings.map((l) => l.path);

export function getAllSeoLandings(): readonly SeoLanding[] {
  return landings;
}

export function getSeoLandingByPath(path: string): SeoLanding | undefined {
  return landings.find((l) => l.path === path);
}
