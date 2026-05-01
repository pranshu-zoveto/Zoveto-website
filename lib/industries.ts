import type { Industry } from "@/types";
import { Factory, ShoppingCart, Rocket, Warehouse, LucideIcon } from "lucide-react";

export interface IndustryWithIcon extends Industry {
  icon: LucideIcon;
}

export const industries: IndustryWithIcon[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    headline: "Quit running the plant on WhatsApp and paper",
    metaTitle: "ERP for manufacturing companies India | Zoveto",
    metaDescription:
      "BOM, shop orders, stock, and GST on one stack. Cut raw material waste and see floor output without walking every line.",
    painPoints: [
      {
        title: "BOM drift",
        description:
          "Bills of material do not match stock. Lines stop while someone rebuilds a sheet.",
      },
      {
        title: "Floor blind spots",
        description:
          "Downtime and output live in memory. Owners tour the plant to learn what already happened.",
      },
      {
        title: "Late schedules",
        description:
          "Plans sit in Excel with yesterday’s numbers. Bottlenecks surface after the shift ends.",
      },
      {
        title: "Weak QC trail",
        description:
          "Batch rejects lack a clean history. Scrap stays high because causes never get coded.",
      },
    ],
    workflow: [
      { stage: "PO & raw material", before: "Manual entry, two-day stock check", after: "GRN from PO, QC at gate" },
      { stage: "Work in progress", before: "Whiteboard", after: "Work orders sync to floor tablets" },
      { stage: "BOM consumption", before: "True-up at month end", after: "Auto-deduct per machine post" },
      { stage: "Finished goods", before: "Stock next day", after: "FG posts when pallets close" },
      { stage: "Financial post", before: "Retype into Tally", after: "Margin posts from same vouchers" },
    ],
    relevantModules: ["inventory", "wms", "analytics", "finance"],
    moduleRelevance: {
      inventory: "Age raw stock and block builds when critical parts dip.",
      wms: "Bins for fast movers and FG bays on one map.",
      analytics: "OEE and throughput by line without a side spreadsheet.",
      finance: "Job costing from issued materials and labor time.",
    },
    metrics: [
      { label: "Wastage reduction", value: "34%" },
      { label: "Production speed", value: "22% faster" },
      { label: "Audit accuracy", value: "99.9%" },
    ],
    testimonialQuote:
      "We finally see what is on the floor before we plan the week. Three tools and two data clerks came out of the budget.",
  },
  {
    slug: "trading",
    name: "Trading",
    icon: ShoppingCart,
    headline: "One thread from supplier PO to customer ledger",
    metaTitle: "Business software for trading companies India | Zoveto",
    metaDescription:
      "Margin rules, credit holds, and stock checks in one place for high-SKU traders and import houses.",
    painPoints: [
      {
        title: "Margin blind spots",
        description: "Schemes and discounts sit in inboxes. You ship at a loss before finance flags it.",
      },
      {
        title: "Slow collections",
        description: "Sales does not see the same aging ledger as accounts. Follow-ups stall.",
      },
      {
        title: "Vendor mismatch",
        description: "Four hundred party ledgers reconciled by hand. Credit limits slip.",
      },
      {
        title: "GST noise",
        description: "Purchase and sales lines do not tie. Filing week becomes rescue week.",
      },
    ],
    workflow: [
      { stage: "Purchase order", before: "WhatsApp price quotes", after: "Signed price list in the PO" },
      { stage: "Inventory sync", before: "Monthly wall counts", after: "Site balances after each GRN" },
      { stage: "Quotations", before: "Calls to the back office", after: "Rep app with live stock" },
      { stage: "Credit control", before: "Excel aging", after: "Auto block past due" },
      { stage: "Ledger close", before: "Five-day match", after: "Matched lines nightly" },
    ],
    relevantModules: ["crm", "inventory", "finance"],
    moduleRelevance: {
      crm: "High-volume accounts with quote history in one row.",
      inventory: "Sell only what the hub holds. Reserve on order confirm.",
      finance: "Party ledger and limits enforced on invoice save.",
    },
    metrics: [
      { label: "Fulfilment speed", value: "2x" },
      { label: "Margin lift", value: "12%" },
      { label: "GSTR mismatch", value: "Zero target" },
    ],
    testimonialQuote: "Five thousand SKUs, one margin sheet. We stopped hand-calculating every deal.",
  },
  {
    slug: "distribution",
    name: "Distribution",
    icon: Rocket,
    headline: "Match demand and stock across depots",
    metaTitle: "Distribution management software India | Zoveto",
    metaDescription:
      "Secondary sales, transfers, and van stock on mobile. Fewer expiry hits and fewer emergency trucks.",
    painPoints: [
      {
        title: "Late secondary data",
        description: "Retail sell-through shows up days late. You reorder on old news.",
      },
      {
        title: "Expiry hits",
        description: "FEFO not enforced. Fresh cartons ship while old lots age in the back.",
      },
      {
        title: "Weak beats",
        description: "Routes follow habit, not outlet priority. Coverage maps are guesses.",
      },
      {
        title: "Depot skew",
        description: "One hub floods while another stockouts. Capital sits in the wrong city.",
      },
    ],
    workflow: [
      { stage: "Secondary sales", before: "Two-day delay", after: "Van sync on close of beat" },
      { stage: "Depot transfers", before: "Phone requests", after: "Suggested moves from cover days" },
      { stage: "Picking route", before: "Static path", after: "Wave batch by cutoff" },
      { stage: "Invoicing", before: "Night batch", after: "Invoice at handover scan" },
      { stage: "Reporting", before: "Sunday PDF", after: "Scheduled morning pack" },
    ],
    relevantModules: ["wms", "inventory", "analytics", "crm"],
    moduleRelevance: {
      wms: "Pick waves so regional orders clear before noon.",
      inventory: "Expiry alerts and FEFO pick lists cut write-offs.",
      analytics: "Route and depot scorecards from posted sales.",
      crm: "Geo beats and visit proof for field teams.",
    },
    metrics: [
      { label: "Order cycle", value: "40% faster" },
      { label: "Expiry reduction", value: "28%" },
      { label: "Secondary visibility", value: "100%" },
    ],
    testimonialQuote: "RTO and expiry finally shrank. Twelve districts, same back-office headcount.",
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: Warehouse,
    headline: "Throughput for busy 3PL and hub warehouses",
    metaTitle: "Logistics management system India | Zoveto",
    metaDescription:
      "Gate logs, scan picks, and RTO flows tied to billing. Fewer wrong-carton exits and faster truck turns.",
    painPoints: [
      {
        title: "Bin guesswork",
        description: "Pickers memorize aisles. New hires need weeks before they hit rate.",
      },
      {
        title: "Gate backlog",
        description: "Trucks queue while clerks retype GRNs. The dock loses the morning.",
      },
      {
        title: "Wrong batch out",
        description: "No scan at pack-out. Returns and credits eat margin.",
      },
      {
        title: "Idle gear",
        description: "Forklifts wait because tasks are not sequenced in the WMS.",
      },
    ],
    workflow: [
      { stage: "Vehicle entry", before: "Paper register", after: "Scan vehicle and PO bundle" },
      { stage: "Unload", before: "Clipboards", after: "Count posts to GRN live" },
      { stage: "Putaway", before: "Picker choice", after: "Directed bin from rule set" },
      { stage: "Dispatch pick", before: "Sheet pick", after: "Handheld wave path" },
      { stage: "Courier handoff", before: "Eyeball labels", after: "Final scan match" },
    ],
    relevantModules: ["wms", "inventory", "analytics"],
    moduleRelevance: {
      wms: "Putaway and pick tasks issued from the system, not tribal map.",
      inventory: "Bin accuracy for large hubs without nightly true-ups.",
      analytics: "Units per hour and truck turn metrics by dock.",
    },
    metrics: [
      { label: "Dispatch fidelity", value: "99.9%" },
      { label: "Inwarding time", value: "70% faster" },
      { label: "Labor efficiency", value: "15% lift" },
    ],
    testimonialQuote: "Barcode-first cut our mis-picks. Throughput rose about 45% with the same crew.",
  },
  {
    slug: "pharma",
    name: "Pharma",
    icon: Warehouse,
    headline: "Batch-safe pharma distribution without spreadsheet recon",
    metaTitle: "Pharma ERP software India | Zoveto",
    metaDescription: "Batch, expiry, GST, and collections on one workflow. Alerts before lots expire.",
    painPoints: [
      { title: "Expiry risk", description: "FEFO slips cause write-offs you cannot reclaim." },
      { title: "Compliance drag", description: "Manual steps delay month-end sign-off." },
      { title: "Wrong batch ship", description: "Trust drops when the wrong lot leaves the hub." },
      { title: "Patchy collections", description: "Reminders depend on who remembered to call." },
    ],
    workflow: [
      { stage: "PO to GRN", before: "Paper inward", after: "Batch receipt in system" },
      { stage: "Storage", before: "Loose FEFO", after: "Pick lists enforce oldest lot first" },
      { stage: "Order fulfilment", before: "Sheet picks", after: "Scan check at pack" },
      { stage: "Billing", before: "Split entries", after: "GST line from same dispatch" },
      { stage: "Collections", before: "Late nudges", after: "Scheduled reminder cadence" },
    ],
    relevantModules: ["inventory", "wms", "finance", "analytics"],
    moduleRelevance: {
      inventory: "Batch and expiry rules on every move.",
      wms: "Scan in and out across branches.",
      finance: "GST invoices tied to lot movement.",
      analytics: "Slow and expiring stock on a morning board.",
    },
    metrics: [
      { label: "Expiry loss cut", value: "31%" },
      { label: "Dispatch accuracy", value: "99.8%" },
      { label: "Collection cycle", value: "22% faster" },
    ],
    testimonialQuote: "We run pharma stock with rules, not panic spreadsheets.",
  },
  {
    slug: "fmcg",
    name: "FMCG",
    icon: Rocket,
    headline: "High-turn FMCG on one live stack",
    metaTitle: "FMCG distribution software India | Zoveto",
    metaDescription: "Beat coverage, depot balance, and cash collection tied to posted sales.",
    painPoints: [
      { title: "Route blind spots", description: "Secondary moves hide until the week closes." },
      { title: "Depot imbalance", description: "One city floods while another runs out." },
      { title: "Scheme leakage", description: "Claims are hard to prove against actual lifts." },
      { title: "Stale MIS", description: "Leadership reads Friday numbers on Monday." },
    ],
    workflow: [
      { stage: "Secondary sales", before: "Delayed sheets", after: "Rep app sync at visit" },
      { stage: "Transfers", before: "Reactive trucks", after: "Suggested moves from cover days" },
      { stage: "Invoicing", before: "Back-office queue", after: "Post on dispatch scan" },
      { stage: "Collections", before: "Ad hoc calls", after: "Reminder rules by aging band" },
      { stage: "Leadership MIS", before: "Weekly pack", after: "Morning digest to WhatsApp" },
    ],
    relevantModules: ["crm", "inventory", "analytics"],
    moduleRelevance: {
      crm: "Beat plans and follow-ups on one map.",
      inventory: "Fast stock rotation with transfer logic.",
      analytics: "Outlet and route scorecards from posted data.",
    },
    metrics: [
      { label: "Route productivity", value: "26% higher" },
      { label: "Stockout cut", value: "29%" },
      { label: "Reporting speed", value: "Same day" },
    ],
    testimonialQuote: "One posted record for every outlet, route, and stock move.",
  },
  {
    slug: "auto-parts",
    name: "Auto Parts",
    icon: Factory,
    headline: "Dense SKU auto parts without pick chaos",
    metaTitle: "Auto parts ERP India | Zoveto",
    metaDescription: "SKU lookup, branch price, pick scan, and GST invoice in one flow for parts distributors.",
    painPoints: [
      { title: "SKU look-alikes", description: "Near identical codes cause wrong picks and credits." },
      { title: "Branch drift", description: "Price and stock rules differ by city without control." },
      { title: "Slow quotes", description: "Dealers wait; they buy elsewhere." },
      { title: "Aging debt", description: "Follow-up lists live in personal phones." },
    ],
    workflow: [
      { stage: "Lead capture", before: "WhatsApp only", after: "CRM with part history" },
      { stage: "Quote", before: "Manual lookup", after: "Catalog price in seconds" },
      { stage: "Pick and dispatch", before: "Memory pick", after: "Scan verify at bench" },
      { stage: "Invoicing", before: "Late entry", after: "GST line on handoff" },
      { stage: "Collections", before: "Random calls", after: "Cadence from aging rules" },
    ],
    relevantModules: ["crm", "inventory", "wms", "finance"],
    moduleRelevance: {
      crm: "Dealer quotes with fitment notes on file.",
      inventory: "Normalize SKUs and show branch on-hand.",
      wms: "Dense rack pick with scan gates.",
      finance: "Receivables aging tied to sales visits.",
    },
    metrics: [
      { label: "Quote speed", value: "58% faster" },
      { label: "Pick accuracy", value: "99.7%" },
      { label: "Overdue cut", value: "24%" },
    ],
    testimonialQuote: "Parts chaos dropped once pick, bill, and collect used one record.",
  },
  {
    slug: "cosmetics",
    name: "Cosmetics",
    icon: ShoppingCart,
    headline: "Margin and batch control for cosmetics",
    metaTitle: "Cosmetics business software India | Zoveto",
    metaDescription: "Expiry-first stock, channel sales, and GST books aligned for beauty brands and distributors.",
    painPoints: [
      { title: "Short shelf life", description: "Promos spike demand without batch cover." },
      { title: "Channel fog", description: "Distributor stock and schemes do not tie to sell-out." },
      { title: "Heavy month-end", description: "Finance rebuilds numbers leadership already saw wrong." },
      { title: "Volatile promos", description: "Spikes hit supply with no forward cover plan." },
    ],
    workflow: [
      { stage: "Batch intake", before: "Loose forms", after: "Register lot on receipt" },
      { stage: "Stock move", before: "Loose FEFO", after: "Oldest lot first on pick" },
      { stage: "Sales follow-up", before: "Inconsistent", after: "Task rules by channel" },
      { stage: "Finance close", before: "Late pack", after: "Ledger follows dispatch same day" },
      { stage: "Leadership review", before: "Weekly lag", after: "Morning KPI pack" },
    ],
    relevantModules: ["inventory", "crm", "finance", "analytics"],
    moduleRelevance: {
      inventory: "Expiry-aware picks for cosmetic SKUs.",
      crm: "Channel visits and promo uptake in one row.",
      finance: "GST-ready invoices and returns.",
      analytics: "Margin by channel after promos land.",
    },
    metrics: [
      { label: "Expiry waste", value: "27% lower" },
      { label: "Channel visibility", value: "100%" },
      { label: "Reporting time", value: "70% lower" },
    ],
    testimonialQuote: "We stopped fighting expiry and started steering growth.",
  },
  {
    slug: "d2c",
    name: "D2C",
    icon: Rocket,
    headline: "D2C orders, stock, and cash on one ledger",
    metaTitle: "D2C operations software India | Zoveto",
    metaDescription: "Marketplace and site orders flow to one inventory and finance core with clear returns.",
    painPoints: [
      { title: "Split order inbox", description: "Each channel has its own tool and export habit." },
      { title: "Stock lag", description: "Oversells when counts update nightly." },
      { title: "Return blind spots", description: "Reverse moves miss margin math." },
      { title: "Status tickets", description: "Team retypes tracking answers all day." },
    ],
    workflow: [
      { stage: "Order intake", before: "Many logins", after: "Single intake queue" },
      { stage: "Inventory sync", before: "Batch jobs", after: "Reserve on capture" },
      { stage: "Fulfilment", before: "Manual queue", after: "Rule-based wave release" },
      { stage: "Returns", before: "Loose notes", after: "RMA with reason and restock path" },
      { stage: "MIS", before: "Export Friday", after: "Daily brief from posted orders" },
    ],
    relevantModules: ["crm", "inventory", "wms", "analytics"],
    moduleRelevance: {
      crm: "Customer and order history in one view.",
      inventory: "Channel stock without double booking.",
      wms: "Pick-pack SLAs from the same queue.",
      analytics: "Margin after shipping and returns.",
    },
    metrics: [
      { label: "Order processing", value: "33% faster" },
      { label: "Cancellation rate", value: "19% lower" },
      { label: "Support load", value: "25% lower" },
    ],
    testimonialQuote: "Growth got predictable when ops stopped living in five tabs.",
  },
];
