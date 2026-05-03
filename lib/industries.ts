import type { Industry } from "@/types";
import { SPARE_PARTS_PHASE1_FAQS } from "@/lib/phase1-spare-parts-industry";
import { Factory, ShoppingCart, Package, Warehouse, type LucideIcon } from "lucide-react";

export interface IndustryWithIcon extends Industry {
  icon: LucideIcon;
}

/** Shipped industry URLs — single source for SSG, sitemap, and internal links. */
export const PUBLIC_INDUSTRY_SLUGS = [
  "manufacturing",
  "distribution",
  "spare-parts-trading",
  "warehousing",
] as const;

export type PublicIndustrySlug = (typeof PUBLIC_INDUSTRY_SLUGS)[number];

export function isPublicIndustrySlug(slug: string): slug is PublicIndustrySlug {
  return (PUBLIC_INDUSTRY_SLUGS as readonly string[]).includes(slug);
}

export function getIndustryBySlug(slug: string): IndustryWithIcon | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getPublicIndustries(): IndustryWithIcon[] {
  return PUBLIC_INDUSTRY_SLUGS.map((slug) => industries.find((i) => i.slug === slug)).filter(
    (x): x is IndustryWithIcon => x !== undefined,
  );
}

/** Concatenated marketing copy for word-count tests (no JSX). */
export function industryCopyPlainText(data: Industry): string {
  const play = data.modulePlaybooks.map((p) => `${p.title} ${p.body}`).join(" ");
  const flow = data.systemFlowSteps.map((s) => `${s.title} ${s.detail}`).join(" ");
  const pains = data.painPoints.map((p) => `${p.title} ${p.description}`).join(" ");
  const wf = data.workflow.map((w) => `${w.stage} ${w.before} ${w.after}`).join(" ");
  const rel = Object.values(data.moduleRelevance).join(" ");
  const faqText = data.faqs.map((f) => `${f.q} ${f.a}`).join(" ");
  return [
    data.headline,
    data.heroSub,
    data.directAnswer,
    faqText,
    pains,
    wf,
    rel,
    play,
    flow,
    ...data.outcomes,
    ...data.proofPoints,
  ].join(" ");
}

export const industries: IndustryWithIcon[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    h1IndustryPhrase: "manufacturing",
    icon: Factory,
    headline: "Shop orders, BOM, and stock on one posted record",
    heroSub:
      "When purchase, production, QC, warehouse, and finance each live in a different file, you get production delays from disconnected systems, no trustworthy real-time inventory picture, and dispatch coordination that still runs on calls. Zoveto is built so a shop-floor event, a stock move, and a finance voucher trace back to the same transaction—not three versions of the truth.",
    metaTitle: "Manufacturing ERP Software | Zoveto",
    metaDescription:
      "Run your entire manufacturing operations on one system. Inventory, orders, dispatch, and finance in one platform.",
    painPoints: [
      {
        title: "Production delays from disconnected systems",
        description:
          "Planning lives in a sheet, execution on the floor, and inventory in another tool. When something slips, nobody sees the same bottleneck at the same time.",
      },
      {
        title: "No real-time inventory visibility",
        description:
          "Raw, WIP, and finished goods drift apart from what purchasing thinks is on hand. You reorder off stale numbers or stop a line because a part “should” be there.",
      },
      {
        title: "Manual dispatch coordination",
        description:
          "FG readiness, pick instructions, and transport handoffs are coordinated in chats. One missed message becomes a missed slot or a wrong shipment.",
      },
      {
        title: "BOM drift and rework",
        description:
          "Bills of material do not match what was actually issued. Rework and scrap show up late, and costing never lines up with reality.",
      },
      {
        title: "Weak QC and batch trace",
        description:
          "When a batch fails, tracing material back to supplier lots and forward to customers is slow. Audit questions turn into archaeology.",
      },
      {
        title: "Financial posting lags operations",
        description:
          "Vouchers are typed again after the plant already moved stock. Margin and WIP visibility arrive days after decisions were already made.",
      },
      {
        title: "Dispatch without a single execution queue",
        description:
          "Orders, priorities, and dock capacity are not one list. Teams improvise who ships first, and exceptions hide until a customer escalates.",
      },
    ],
    workflow: [
      {
        stage: "PO and raw material",
        before: "Manual entry and delayed stock checks before someone releases material.",
        after: "GRN tied to approved PO, QC at gate, and stock posted before issue to production.",
      },
      {
        stage: "Work in progress",
        before: "Whiteboards and side spreadsheets for what each line is running.",
        after: "Work orders and consumption visible to planning, stores, and finance from the same run.",
      },
      {
        stage: "BOM consumption",
        before: "Month-end true-up between issued material and what the BOM “should” have used.",
        after: "Issue and return movements post against the BOM so variance is visible while the shift is still warm.",
      },
      {
        stage: "Finished goods and dispatch",
        before: "FG exists in someone’s head until paperwork catches up tomorrow.",
        after: "FG posts when pallets close, and pick and dispatch tasks are issued from posted availability.",
      },
      {
        stage: "Invoicing and compliance",
        before: "Billing re-keyed from dispatch notes; GST lines rebuilt under pressure.",
        after: "Invoice and e-way context pulled from the same dispatch record the warehouse already closed.",
      },
    ],
    relevantModules: ["inventory", "wms", "crm", "finance", "analytics"],
    moduleRelevance: {
      inventory:
        "Multi-location raw, WIP, and FG with movements tied to production and dispatch—not a parallel sheet.",
      wms: "Directed putaway, pick, pack, and gate discipline so dispatch is executed, not negotiated in chat.",
      crm: "Customer commitments and delivery promises stay next to order history so sales does not over-promise capacity.",
      finance: "GST-aligned vouchers and costing that inherit quantities and values from posted operations work.",
      analytics: "Throughput, exceptions, and stock aging built from the same ledger operations already posted.",
    },
    modulePlaybooks: [
      {
        id: "command-center",
        title: "Command Center",
        href: "/modules/analytics",
        body: "Manufacturing leadership needs one place where orders, material risk, dock pressure, and cash signals read from the same operational spine—not a Friday pack of screenshots. Command Center in Zoveto is the control view over posted work: what is late, what is blocked, where inventory is breaching rules, and which customer commitments are riding on today’s run. Because the underlying data is shared with execution modules, the view is not a second model you have to reconcile; it is the same movements your teams already captured when they received, issued, produced, and shipped.",
      },
      {
        id: "operations",
        title: "Operations",
        href: "/modules/wms",
        body: "Operations for a plant is the chain from work order release to FG ready to ship: staging, picking, packing, gate control, and handoff to transport. Zoveto treats that as an accountable queue rather than a set of heroic habits. Tasks are issued from posted stock, exceptions surface when scans or checks fail, and dispatch is not “someone called the transporter.” That is how you reduce coordination drag without pretending software replaces judgment—judgment gets cleaner inputs and an audit trail.",
      },
      {
        id: "inventory",
        title: "Inventory",
        href: "/modules/inventory",
        body: "Manufacturing inventory is not only “how many boxes.” It is batches, locations, reservations against orders, and the integrity of BOM consumption. Zoveto inventory is written by operational events: GRN, issue to WO, return from production, FG receipt, transfer, dispatch. When purchasing looks at on-hand, they are looking at what operations already proved—not a number that was true last Sunday after a wall count.",
      },
      {
        id: "crm",
        title: "CRM",
        href: "/modules/crm",
        body: "Even in manufacturing, revenue still starts as a promise: delivery date, configuration, and credit posture. CRM in Zoveto keeps customer truth adjacent to operational truth so a salesperson cannot confirm a ship date that the plant and warehouse cannot support. Quotes and orders inherit the same item, price, and tax discipline you expect downstream, which shortens the path from verbal win to a clean posted order.",
      },
      {
        id: "finance",
        title: "Finance",
        href: "/modules/finance",
        body: "Finance should post what operations already decided in weight, quantity, and value—not rebuild it from PDFs. Zoveto finance is designed around vouchers that trace to source movements: purchase, production, dispatch, and returns. That is how you get faster reconciliation, cleaner GST treatment, and less month-end rescue work—because the operational story and the ledger story are the same story told once.",
      },
    ],
    systemFlowSteps: [
      {
        title: "Order or work order confirmed",
        detail: "Demand enters as a sales order or internal work order with priorities your plant already recognizes.",
      },
      {
        title: "Automatic inventory reservation",
        detail: "Available and planned stock is checked against rules; reservations reduce double-promising the same lot.",
      },
      {
        title: "Issue and production posting",
        detail: "Material issues and receipts post against work orders so WIP and variance are visible during the run.",
      },
      {
        title: "FG receipt and warehouse allocation",
        detail: "Finished goods land in bin strategy you defined; dispatch picks are generated from posted FG, not guesses.",
      },
      {
        title: "Dispatch execution and scan gates",
        detail: "Pick, pack, and gate checks write the same dispatch record finance will invoice from.",
      },
      {
        title: "Invoice, GST context, and tracking handoff",
        detail: "Billing pulls from dispatch; customer tracking information stays tied to the same order thread.",
      },
    ],
    outcomes: [
      "Reduced operational delays from fewer handoffs between disconnected tools",
      "Faster order-to-dispatch cycles when picking and billing read the same execution record",
      "Improved inventory accuracy because movements post at the time of work, not after the fact",
      "Better visibility across teams when planning, plant, warehouse, and accounts share one spine",
    ],
    proofPoints: [
      "Not a concept. A working system architecture built for Indian operating reality—GST, multi-site, and high-touch dispatch.",
      "Real workflows across ERP, WMS, and CRM—not a dashboard that decorates spreadsheets still living underneath.",
      "Modular by design so you can tighten one execution layer without re-buying the whole stack.",
    ],
    homepageFeatures: [
      "BOM and shop-floor alignment",
      "Live stock tied to production",
      "Dispatch and gate discipline",
      "GST-ready finance chain",
    ],
    directAnswer:
      "Manufacturing teams lose margin when shop-floor moves, WIP, and finance vouchers describe three different truths.\nZoveto is a Company Operating System that posts production, stock, and billing on one chain for Indian plants scaling past spreadsheet bridges.",
    faqs: [
      {
        q: "What should manufacturing SMBs validate first in Zoveto?",
        a: "BOM issue to GL impact, batch trace forward and back, and whether dispatch closure drives invoicing without re-keying. If those three are weak, dashboards will not save you.",
      },
      {
        q: "How does Zoveto help with production delays from disconnected systems?",
        a: "By tying planning signals to posted availability and shop-floor events so purchasing and plant see the same bottleneck at the same time—not three reconciled versions on Monday.",
      },
      {
        q: "Can Zoveto handle GST for job work and returns in manufacturing?",
        a: "GST flows should inherit from posted material and dispatch context. Bring your scenarios to a demo so credit notes, job work, and branch transfers map cleanly to how you actually operate.",
      },
      {
        q: "When is Zoveto not the right fit for a plant?",
        a: "When you need deep global MRP, PLM, or multi-country consolidation on day one beyond Zoveto’s current SMB-focused footprint—be honest about template depth versus team size.",
      },
      {
        q: "How do we onboard without stopping the line?",
        a: "Phased cutover by workflow—raw issue, production posting, dispatch—so training tracks real daily screens instead of big-bang go-live roulette.",
      },
    ],
  },
  {
    slug: "distribution",
    name: "Distribution",
    h1IndustryPhrase: "distribution",
    icon: ShoppingCart,
    headline: "Depot, van, credit, and GST on one thread",
    heroSub:
      "Distribution and high-volume trading share the same failure mode: order tracking gaps, stock mismatches across locations, and delayed fulfillment because secondary sales, transfers, and billing are not one continuous workflow. Zoveto connects beat coverage, depot balances, credit discipline, and posted dispatch so your team stops rebuilding reality at the end of the week.",
    metaTitle: "Distribution ERP Software | Zoveto",
    metaDescription:
      "Run your entire distribution operations on one system. Inventory, orders, dispatch, and finance in one platform.",
    painPoints: [
      {
        title: "Order tracking gaps",
        description:
          "A van beat, a depot pick, and an invoice can describe three different states of the same order. Customer service learns the truth last.",
      },
      {
        title: "Stock mismatches across locations",
        description:
          "Hub A thinks it can fulfill while Hub B already committed the same pool. Transfers become emergency trucks instead of planned moves.",
      },
      {
        title: "Delayed fulfillment",
        description:
          "Cutoffs slip because picking waves, credit blocks, and transport booking are not driven off one priority queue.",
      },
      {
        title: "Margin blind spots on schemes",
        description:
          "Discounts and schemes live in inboxes and side sheets. You discover margin leakage after the goods already moved.",
      },
      {
        title: "Credit and collections disconnected from sales",
        description:
          "Sales does not see the same aging and limit posture as finance. Holds are either too late or too blunt.",
      },
      {
        title: "Secondary sales visibility lag",
        description:
          "Sell-through shows up days late, so replenishment chases old news and expiry risk grows in slow lanes.",
      },
      {
        title: "GST and line matching noise",
        description:
          "Purchase, transfer, and sales lines are hard to tie cleanly when the operational record is fragmented.",
      },
    ],
    workflow: [
      {
        stage: "Beat and secondary capture",
        before: "Delayed sheets and partial WhatsApp pictures of what moved at outlets.",
        after: "Structured capture at visit close so sell-through is posted into the same model as depot stock.",
      },
      {
        stage: "Depot transfers",
        before: "Phone requests and reactive shuttles between cities.",
        after: "Suggested transfers from cover days and posted in-transit so both sides agree on the move.",
      },
      {
        stage: "Picking and dispatch",
        before: "Static routes and night-batch invoicing that hide what actually shipped.",
        after: "Wave-friendly picking with dispatch scans that become the billing anchor the same day.",
      },
      {
        stage: "Credit control",
        before: "Excel aging that sales argues with instead of following.",
        after: "Limits and holds enforced at order confirmation so exceptions are explicit, not accidental.",
      },
      {
        stage: "Ledger discipline",
        before: "Multi-day matching marathons after month close.",
        after: "Matched lines from posted operational events so recon is tracing, not reconstruction.",
      },
    ],
    relevantModules: ["crm", "wms", "inventory", "finance", "analytics"],
    moduleRelevance: {
      crm: "Beats, visits, and outlet history tied to orders so field teams sell with the same truth as the back office.",
      wms: "Pick waves and dispatch execution that do not depend on tribal route memory.",
      inventory: "Depot, van, and in-transit visibility with FEFO discipline where shelf life matters.",
      finance: "Invoices, credit notes, and party ledgers aligned to posted dispatch and returns.",
      analytics: "Route and depot scorecards from posted sales—not a parallel MIS rebuild.",
    },
    modulePlaybooks: [
      {
        id: "command-center",
        title: "Command Center",
        href: "/modules/analytics",
        body: "Distribution control is coverage, stock posture, and cash risk at once. Command Center pulls those signals from posted beats, transfers, picks, and collections so you can steer daily—not after the damage is already in the depot. Because it reads the same transactions your teams already captured, it avoids the classic “dashboard vs reality” split that makes leadership stop trusting software.",
      },
      {
        id: "operations",
        title: "Operations",
        href: "/modules/wms",
        body: "Operations here is the disciplined path from order release to truck out: allocation, pick tasks, pack checks, and gate evidence. Zoveto issues work from availability and rules, so fulfillment delays show up as explicit queue problems rather than mysterious “someone forgot.” That is the operational backbone that closes order tracking gaps without adding another chat channel.",
      },
      {
        id: "inventory",
        title: "Inventory",
        href: "/modules/inventory",
        body: "Multi-location inventory for distributors is only useful if transfers, reservations, and van stock are first-class citizens. Zoveto ties stock to movements your hubs already perform, which is how you stop mismatches between what the system says and what the floor can actually ship. When expiry matters, FEFO is an execution rule—not a sticker on a process document.",
      },
      {
        id: "crm",
        title: "CRM",
        href: "/modules/crm",
        body: "Distribution revenue is relationship-heavy: schemes, credit, delivery promises, and dispute history. CRM in Zoveto keeps that context next to operational constraints so reps do not win a deal your warehouse cannot honor. From lead to order, the thread stays continuous, which tightens quotation cycles and reduces rework from mis-set expectations.",
      },
      {
        id: "finance",
        title: "Finance",
        href: "/modules/finance",
        body: "Finance for distributors is GST lines, credit exposure, returns, and settlement discipline tied to what actually moved. Zoveto finance inherits dispatch and return postings so invoices are not a second project after the truck left. That is how you reduce filing-week rescue work: fewer mismatched lines because fewer duplicate entry paths.",
      },
    ],
    systemFlowSteps: [
      { title: "Order received", detail: "Credit, price, and availability checks run before the order is treated as firm demand." },
      { title: "Automatic entry into operations queue", detail: "Eligible orders become pick waves and tasks without retyping into a warehouse tool." },
      { title: "Inventory check and allocation", detail: "Stock is reserved from posted balances at the right depot or van location." },
      { title: "Warehouse allocation and pick execution", detail: "Pickers follow scan-backed tasks; exceptions are recorded, not silently overwritten." },
      { title: "Dispatch and proof of handoff", detail: "Gate and carrier context posts to the same record customer service can read." },
      { title: "Invoice and GST context", detail: "Finance issues billing from dispatch truth, not a parallel spreadsheet version." },
      { title: "Tracking and collections cadence", detail: "Customer-facing status and internal aging follow the same order thread." },
    ],
    outcomes: [
      "Fewer fulfillment surprises when picking and billing share one dispatch anchor",
      "Tighter credit execution when limits are enforced at order time, not after shipment",
      "Better cross-location accuracy when transfers and reservations post as operations happen",
      "Clearer leadership visibility when route and depot performance read from posted activity",
    ],
    proofPoints: [
      "Built as a modular operating system—add discipline to WMS without abandoning your commercial workflow.",
      "Deployed architecture meant for real Indian distribution: beats, depots, GST, and high SKU counts.",
      "Workflow-first: the product is judged by posted movements, not by how pretty an empty dashboard looks.",
    ],
    homepageFeatures: [
      "Beat-to-depot visibility",
      "Credit-aware order flow",
      "Wave picking and dispatch",
      "GST-tied invoicing",
    ],
    directAnswer:
      "Distribution breaks when beats, depots, and HO disagree on stock while credit ships anyway.\nZoveto is a Company Operating System that keeps route sales, transfers, dispatch, and GST billing on one posted record for Indian high-volume distributors.",
    faqs: [
      {
        q: "How does Zoveto reduce depot stock mismatch for distributors?",
        a: "Posted transfers, reservations at quote time, and dispatch closure that finance reads—fewer shadow sheets at branches when everyone pulls from the same ledger.",
      },
      {
        q: "What credit controls should distributors expect?",
        a: "Limits enforced when orders are saved, overdue tasks tied to customers, and visibility for leadership before trucks leave—not only after month-end aging reports.",
      },
      {
        q: "Can van sales and HO run on the same OS?",
        a: "Yes for the workflows Zoveto targets—mobile usability and branch governance still need process owners; software exposes violations faster when rules exist.",
      },
      {
        q: "How is GST handled across depots?",
        a: "Invoices and credit notes should trace to posted movements per entity rules. Multi-registration setups should be mapped in discovery, not assumed from a brochure.",
      },
      {
        q: "Where should a distributor read next?",
        a: "Compare warehouse and inventory India pages, the FAQ hub, then book a demo with your SKU and branch counts so scope stays honest.",
      },
    ],
  },
  {
    slug: "spare-parts-trading",
    name: "Spare parts trading",
    h1IndustryPhrase: "spare parts trading",
    icon: Package,
    headline: "Dense SKUs, quotes, picks, and dues without tribal memory",
    heroSub:
      "Spare parts trading is SKU chaos at scale: thousands of near-identical lines, branch rules that drift, slow quotation cycles because nobody trusts stock without calling the warehouse, and demand visibility that disappears into personal WhatsApp threads. Zoveto treats catalog, availability, quote-to-order, pick verification, and receivables as one system so a parts business runs on rules instead of hero clerks.",
    metaTitle: "Spare Parts Trading ERP Software | Zoveto",
    metaDescription:
      "Run your entire spare parts trading operations on one system. Inventory, orders, dispatch, and finance in one platform.",
    painPoints: [
      {
        title: "SKU chaos at thousands of lines",
        description:
          "Look-alike codes, supersessions, and pack sizes create wrong picks and expensive credits when verification is weak.",
      },
      {
        title: "No demand visibility across branches",
        description:
          "One branch starves while another holds slow stock, because transfers are reactive and demand signals are not posted.",
      },
      {
        title: "Slow quotation cycles",
        description:
          "Dealers wait while someone manually checks stock, price lists, and fitment notes scattered across tools.",
      },
      {
        title: "Branch drift on price and policy",
        description:
          "Each location improvises discounts and credit posture because there is no single enforced commercial spine.",
      },
      {
        title: "Pick accuracy without scan discipline",
        description:
          "Bench memory replaces scan gates; wrong-part shipments erode trust faster than margin can absorb.",
      },
      {
        title: "Collections living outside the system",
        description:
          "Aging and follow-ups sit in personal phones, so cash risk is invisible until it is painful.",
      },
      {
        title: "GST and returns complexity on high line counts",
        description:
          "Credits and returns multiply lines; without clean linkage to original dispatch, recon becomes a project.",
      },
    ],
    workflow: [
      {
        stage: "Lead and enquiry",
        before: "WhatsApp-only threads with no durable history tied to parts fitment.",
        after: "CRM captures enquiry with part history so the next quote starts from facts, not memory.",
      },
      {
        stage: "Quotation",
        before: "Manual lookup across branch sheets and phone calls to the store.",
        after: "Live availability and price rules in the quoting flow so turnaround is bounded by policy, not chaos.",
      },
      {
        stage: "Pick and dispatch",
        before: "Memory pick and handwritten gate notes.",
        after: "Scan-backed pick and pack with mismatch checks before the carton leaves.",
      },
      {
        stage: "Invoicing",
        before: "Late billing keyed from paper slips.",
        after: "GST-aware invoice lines generated from the dispatch record the warehouse closed.",
      },
      {
        stage: "Receivables",
        before: "Random follow-up cadence depending on who is available.",
        after: "Aging-driven tasks tied to the customer ledger so collections stay operational, not personal.",
      },
    ],
    relevantModules: ["crm", "inventory", "wms", "finance", "analytics"],
    moduleRelevance: {
      crm: "Dealer relationships, quote history, and fitment notes in one row—no more losing context between wins.",
      inventory: "Normalize SKUs, show branch on-hand, and reserve stock when a quote becomes an order.",
      wms: "Dense rack operations with scan gates that reduce wrong-part exits at the bench.",
      finance: "Receivables, limits, and GST lines tied to posted sales and returns—not parallel ledgers.",
      analytics: "Slow movers, branch skew, and margin pressure visible from posted transactions.",
    },
    modulePlaybooks: [
      {
        id: "command-center",
        title: "Command Center",
        href: "/modules/analytics",
        body: "Parts trading leadership needs visibility into quote backlog, pick errors, branch skew, and overdue receivables without waiting for a monthly pack. Command Center reads posted CRM, inventory, dispatch, and finance activity so you can intervene when the pattern is forming—not after the quarter already absorbed the damage. The point is operational signal density: what is stuck, what is drifting, and what is about to breach a rule you already decided matters.",
      },
      {
        id: "operations",
        title: "Operations",
        href: "/modules/wms",
        body: "Operations for parts traders is the bench-and-gate reality: pick accuracy, pack verification, and dispatch evidence. Zoveto issues tasks from posted availability and closes them with scans so “almost right” does not become a credit note. That is how you reduce wrong-part incidents without pretending you can eliminate human judgment—you give humans a system that catches slips before they leave the building.",
      },
      {
        id: "inventory",
        title: "Inventory",
        href: "/modules/inventory",
        body: "Spare parts inventory is a catalog problem and a movement problem at the same time. Zoveto keeps branch balances honest through GRN, transfers, reservations, and dispatch postings so a quote is not a phone call to the warehouse. When supersession and pack-size rules exist, they belong in the same system that issues picks—otherwise the warehouse becomes the catalog, and scale breaks.",
      },
      {
        id: "crm",
        title: "CRM",
        href: "/modules/crm",
        body: "CRM is where demand first becomes structured: enquiries, dealer tiers, follow-ups, and quote-to-order conversion. Zoveto keeps that thread continuous with stock checks and pricing rules so sales stops being a separate universe from fulfillment. Faster quotation cycles come from fewer round trips, not from yelling louder at the back office.",
      },
      {
        id: "finance",
        title: "Finance",
        href: "/modules/finance",
        body: "Parts businesses live on tight working capital. Finance in Zoveto is built to enforce credit posture at save time and to tie GST invoices and credit notes to operational reality. When returns happen, they link back to dispatch context so reconciliation is tracing, not a forensic rebuild of what shipped three weeks ago.",
      },
    ],
    systemFlowSteps: [
      { title: "Enquiry captured with part context", detail: "Fitment notes and customer history start as structured data, not lost chat." },
      { title: "Quote with live stock and price rules", detail: "Availability and commercial rules come from the same system that will fulfill the order." },
      { title: "Order confirmation reserves stock", detail: "Reservation reduces double-selling the same physical line across channels." },
      { title: "Warehouse pick with scan checks", detail: "Mismatch gates prevent silent wrong-part shipments." },
      { title: "Dispatch closes operational record", detail: "Handoff evidence posts once; customer service and finance read the same closure." },
      { title: "Invoice from dispatch", detail: "GST lines inherit quantities and values from posted execution." },
      { title: "Collections tasks from aging", detail: "Follow-ups become a system cadence tied to the ledger, not individual habit." },
    ],
    outcomes: [
      "Tighter quote-to-ship behavior when stock and rules live next to the quoting workflow",
      "Lower wrong-part exposure when scan discipline is part of the default path",
      "Cleaner receivables operations when aging and tasks are tied to posted invoices",
      "Better branch control when transfers and pricing policy are enforced centrally",
    ],
    proofPoints: [
      "A working modular system—ERP, WMS, and CRM connected by design, not duct-taped integrations.",
      "Built for high-line-count trading realities: GST, returns, and branch operations included.",
      "Not a slide-deck OS—measured by whether daily posting actually happens.",
    ],
    homepageFeatures: [
      "SKU and branch discipline",
      "Faster dealer quotes",
      "Scan-first picking",
      "Credit and GST alignment",
    ],
    directAnswer:
      "Spare parts trading dies when dense SKUs, branch rules, and dealer WhatsApp promises diverge from bin truth.\nZoveto is a Company Operating System for quotes, picks, dispatch proof, and dues on one chain—so hero clerks are not your architecture.",
    faqs: SPARE_PARTS_PHASE1_FAQS.map((f) => ({ q: f.question, a: f.answer })),
  },
  {
    slug: "warehousing",
    name: "Warehousing",
    h1IndustryPhrase: "warehousing",
    icon: Warehouse,
    headline: "Bins, waves, gate, and dispatch without spreadsheet recon",
    heroSub:
      "Warehousing breaks when you lack zone-level tracking, when picking stays inefficient because tasks are not sequenced, and when dispatch errors slip through because pack-out lacks verification. Zoveto is built for scan-first inwarding, directed putaway, wave-friendly picking, and dispatch closure that finance can invoice from—inside one operating record shared with inventory and order teams.",
    metaTitle: "Warehousing ERP Software | Zoveto",
    metaDescription:
      "Run your entire warehousing operations on one system. Inventory, orders, dispatch, and finance in one platform.",
    painPoints: [
      {
        title: "No zone-level tracking",
        description:
          "You know total on-hand but not where pallets actually live, so pick paths are long and new hires take weeks to become productive.",
      },
      {
        title: "Picking inefficiencies",
        description:
          "Waves and cutoffs are not operational objects—so the floor improvises and dock windows get missed.",
      },
      {
        title: "Dispatch errors at pack-out",
        description:
          "Wrong carton exits when verification is eyeball-based; credits and returns eat margin and trust.",
      },
      {
        title: "Gate backlog and slow inwarding",
        description:
          "Trucks queue while GRNs are retyped; the morning is lost before picking even starts.",
      },
      {
        title: "Inventory true-ups that hide problems",
        description:
          "Nightly adjustments mask leakage; root causes never become repeatable fixes.",
      },
      {
        title: "Disconnected billing from dock reality",
        description:
          "Finance invoices from a different version of what shipped, creating mismatch and delay.",
      },
      {
        title: "RTO and returns handling without clean restock paths",
        description:
          "Returns land as chaos: unclear QC disposition, unclear bin putaway, unclear credit linkage.",
      },
    ],
    workflow: [
      {
        stage: "Vehicle and gate",
        before: "Paper registers and retyped vehicle details.",
        after: "Structured gate entry tied to expected ASN and PO bundle for faster dock starts.",
      },
      {
        stage: "Unload and GRN",
        before: "Clipboards and delayed posting that makes stock “appear” tomorrow.",
        after: "Live GRN posting so available-to-pick updates as counts are confirmed.",
      },
      {
        stage: "Putaway",
        before: "Picker chooses bins from habit.",
        after: "Directed bin from rule set so fast movers land where the plan expects them.",
      },
      {
        stage: "Pick and pack",
        before: "Sheet picks and pack-out by memory.",
        after: "Handheld pathing with scan checks before seal and label.",
      },
      {
        stage: "Dispatch handoff",
        before: "Label eyeballing and disputed proof when something goes wrong.",
        after: "Final scan match and posted dispatch closure tied to carrier context.",
      },
    ],
    relevantModules: ["wms", "inventory", "finance", "analytics", "crm"],
    moduleRelevance: {
      wms: "Putaway, pick, pack, gate, and dispatch as first-class tasks—not a PDF SOP.",
      inventory: "Bin-level stock and movements that finance and customer service can trust.",
      finance: "Invoices and credit notes aligned to posted dispatch and returns.",
      analytics: "Units per hour, dock turns, and error classes from posted work—not anecdote.",
      crm: "Customer promise dates and exceptions visible next to operational queues when service gets involved.",
    },
    modulePlaybooks: [
      {
        id: "command-center",
        title: "Command Center",
        href: "/modules/analytics",
        body: "Warehouse leadership needs to see dock pressure, pick productivity, backlog age, and exception volume in one place. Command Center reads posted WMS and inventory events so the morning meeting is about decisions, not about reconciling three tabs. When something is red, it should be red because a rule was breached in data—not because someone’s gut says the floor “feels busy.”",
      },
      {
        id: "operations",
        title: "Operations",
        href: "/modules/wms",
        body: "Operations in warehousing is the full execution chain: inwarding tasks, putaway directives, replenishment, wave release, pick pathing, pack verification, and gate closure. Zoveto WMS is designed so tasks are issued, consumed, and audited—so picking efficiency improves because work is sequenced and visible, not because you hired a louder supervisor. Dispatch errors drop when pack-out becomes a checkpoint, not a hope.",
      },
      {
        id: "inventory",
        title: "Inventory",
        href: "/modules/inventory",
        body: "Zone-level tracking is inventory done honestly: bins, pallets, statuses, and reservations that reflect what the floor actually did. Zoveto ties inventory postings to scans and task completions so “system stock” is not a parallel universe from physical stock. That is the foundation for better fulfillment predictability and fewer emergency corrections.",
      },
      {
        id: "crm",
        title: "CRM",
        href: "/modules/crm",
        body: "Even pure warehousing touches customers when promises slip or exceptions need authorization. CRM keeps customer communication and commitments adjacent to operational status so service does not invent a story that contradicts the dock. The goal is fewer circular calls: everyone reads the same dispatch and return thread.",
      },
      {
        id: "finance",
        title: "Finance",
        href: "/modules/finance",
        body: "Finance cares that dispatch is defensible: quantities, tax context, and credit treatment tied to what actually left the gate. Zoveto finance inherits posted dispatch and return events so billing is not a second project after the truck pulled out. That reduces operational delay at month end because the ledger story is already aligned with warehouse truth.",
      },
    ],
    systemFlowSteps: [
      { title: "Inbound expected and gate booked", detail: "Dock planning starts from structured arrival, not ad hoc queues." },
      { title: "GRN posts as counts confirm", detail: "Stock becomes available for allocation on posted evidence, not tomorrow’s sheet." },
      { title: "Directed putaway to zone and bin", detail: "Fast movers land in planned locations to shorten pick paths." },
      { title: "Order allocation creates pick tasks", detail: "Waves and priorities become executable work objects." },
      { title: "Pick path and scan verification", detail: "Mismatch gates reduce wrong-carton exits before seal." },
      { title: "Dispatch closure and carrier context", detail: "One record becomes the customer and finance anchor." },
      { title: "Invoice and tracking from same closure", detail: "No re-keying a second “truth” for billing and customer updates." },
    ],
    outcomes: [
      "Reduced operational delays when inwarding, picking, and dispatch share one task spine",
      "Faster processing cycles when waves and cutoffs are operational objects, not tribal knowledge",
      "Improved inventory accuracy at bin level through scan-backed movements",
      "Better visibility across warehouse, sales, and finance when dispatch closure is posted once",
    ],
    proofPoints: [
      "Not a concept—a deployed modular architecture for warehouse execution tied to ERP inventory and finance.",
      "Workflow-first WMS thinking: tasks, scans, and exceptions—not a pretty map with no enforcement.",
      "Designed for Indian operating load: GST, returns, multi-site, and noisy dock realities.",
    ],
    homepageFeatures: [
      "Zone and bin discipline",
      "Wave picking and cutoffs",
      "Gate and GRN speed",
      "Dispatch-to-invoice chain",
    ],
    directAnswer:
      "Warehouses fail when bins, waves, and gate proof do not post to the same stock ledger finance uses.\nZoveto is a Company Operating System for scan-first inwarding, directed tasks, and dispatch closure that billing inherits—without spreadsheet recon.",
    faqs: [
      {
        q: "What warehouse KPIs should Zoveto improve first?",
        a: "Mis-pick rate, dock-to-invoice time, and variance size after cycle counts—if those are flat, fix process and master data before blaming hardware.",
      },
      {
        q: "How does Zoveto support wave picking and cutoffs?",
        a: "Waves and cutoffs become operational objects your floor runs against posted demand—not tribal knowledge in a supervisor’s notebook alone.",
      },
      {
        q: "Can contract staff get limited access?",
        a: "Role-based access is part of disciplined ops—define who can move bins, post GRN, or close dispatch so audits stay explainable.",
      },
      {
        q: "What about 3PL or multi-site hubs?",
        a: "Map ownership per site and how transfers post in discovery. Zoveto targets SMB complexity; exotic 3PL contracts may still need partner-specific design.",
      },
      {
        q: "How does dispatch tie to GST invoices?",
        a: "Closure quantities should drive invoice lines with traceable links for returns—reducing Friday-night reconciliation between gate reality and vouchers.",
      },
    ],
  },
];
