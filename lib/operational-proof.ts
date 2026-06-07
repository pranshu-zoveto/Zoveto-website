import type { OperationalProof } from "@/types";

export const operationalProofs: OperationalProof[] = [
  {
    slug: "inventory-chaos",
    industryTag: "Inventory",
    title: "From Inventory Chaos to Structured Warehouse Execution",
    before: ["No SKU tracking", "Manual counting", "Dispatch errors", "Stock mismatch"],
    after: ["Barcode-based tracking", "Zone-level inventory", "Posted movement updates", "Zero mismatch"],
    systemActions: ["SKU mapping", "Zone allocation", "Scan validation", "Dispatch workflow"],
    outcomeMetrics: ["0 stock mismatch", "2x faster dispatch", "80% fewer errors"],
    ctaLabel: "View system flow",
    problemSummary:
      "Stock truth lives in spreadsheets and memory. Dispatch runs on verbal handoffs, so mismatches surface only when customers complain.",
    metaTitle: "Inventory chaos to warehouse execution | Zoveto Operating Pattern",
    metaDescription:
      "Observed SME pattern: no SKU discipline, manual counts, dispatch errors. How barcode, zones, and scan validation redesign the flow, no client names.",
    currentRealitySteps: [
      { label: "Inbound", detail: "GRN on paper or WhatsApp photo; SKU optional" },
      { label: "Storage", detail: "Bin location in someone’s head; recount when disputed" },
      { label: "Pick", detail: "Pick list from Excel; substitutions not logged" },
      { label: "Dispatch", detail: "Gate pass vs system often disagree" },
      { label: "Finance", detail: "Month-end stock journals chase operations" },
    ],
    redesignSteps: [
      { label: "Master SKUs", detail: "Every sellable and raw item mapped once" },
      { label: "Zone + bin", detail: "Putaway rules; pick paths by zone" },
      { label: "Scan gates", detail: "Pick and dispatch require scan confirmation" },
      { label: "Live ledger", detail: "Inventory and dispatch status one source" },
      { label: "Exceptions", detail: "Short picks and variances route to a queue" },
    ],
    insideZoveto: [
      { module: "WMS", note: "Receiving, putaway, pick, pack, dispatch" },
      { module: "ERP", note: "Stock valuation and postings tied to movements" },
    ],
    impactMetrics: [
      { metric: "0 stock mismatch", context: "After scan gates at pick and dispatch vs prior spreadsheet truth" },
      { metric: "2x faster dispatch", context: "Measured cycle from pick release to gate pass in comparable SKU mix" },
      { metric: "80% fewer errors", context: "Wrong SKU and short ship tickets vs prior quarter baseline" },
    ],
  },
  {
    slug: "manual-orders",
    industryTag: "Orders",
    title: "From Manual Orders to Automated Flow Control",
    before: ["WhatsApp orders", "Duplicate entries", "Missing dispatch", "Late invoicing"],
    after: ["Structured order pipeline", "Single source of truth", "Auto warehouse sync", "Instant invoicing"],
    systemActions: [
      "Pipeline stages & validation",
      "Single order record",
      "Warehouse sync on stage change",
      "Invoicing when dispatch-ready",
    ],
    outcomeMetrics: ["65% faster processing", "90% fewer errors"],
    ctaLabel: "View system flow",
    problemSummary:
      "Orders arrive on calls and chats, get retyped into sheets, and lose linkage to stock and billing, so revenue recognition lags and mistakes multiply.",
    metaTitle: "Manual orders to flow control | Zoveto Operating Pattern",
    metaDescription:
      "Pattern: WhatsApp orders, duplicates, missed dispatch, late invoices. One pipeline, one record, warehouse sync, instant invoice trigger, pattern-based, not a client story.",
    currentRealitySteps: [
      { label: "Capture", detail: "Screenshots and voice notes to an order desk" },
      { label: "Entry", detail: "Parallel Excel and Tally entries; version drift" },
      { label: "Credit check", detail: "Ad hoc; often skipped under load" },
      { label: "Warehouse", detail: "No pick until someone forwards the thread" },
      { label: "Invoice", detail: "Raised after follow-ups; revenue timing slips" },
    ],
    redesignSteps: [
      { label: "Structured capture", detail: "Templates and mandatory fields at entry" },
      { label: "Single record", detail: "One order ID from quote to cash" },
      { label: "Stage rules", detail: "Validations and approvals between stages" },
      { label: "Auto sync", detail: "Pick list and availability without retyping" },
      { label: "Invoice trigger", detail: "On dispatch-ready or policy milestone" },
    ],
    insideZoveto: [
      { module: "CRM", note: "Leads, quotes, and order timeline" },
      { module: "WMS", note: "Pick, pack, dispatch driven from the same order" },
      { module: "ERP", note: "Billing and revenue alignment to fulfilment" },
    ],
    impactMetrics: [
      { metric: "65% faster processing", context: "Order entry to dispatch-ready vs prior median for same order types" },
      { metric: "90% fewer errors", context: "Wrong item, duplicate line, and missed dispatch incidents vs baseline" },
    ],
  },
  {
    slug: "excel-tally-unified",
    industryTag: "Finance & ERP",
    title: "From Excel + Tally to Unified Operating System",
    before: ["Split systems", "Manual reconciliation", "No visibility"],
    after: ["Connected teams", "Live financial ops", "Cross-functional visibility"],
    systemActions: ["Master data sync", "Role workflows", "Live postings", "Exception routing"],
    outcomeMetrics: ["50% faster reconciliation", "Single dashboard truth"],
    ctaLabel: "View system flow",
    problemSummary:
      "Sales and ops live in Excel while finance lives in Tally, so nobody sees the same numbers until week-end merges and arguments.",
    metaTitle: "Excel + Tally to one operating system | Zoveto Operating Pattern",
    metaDescription:
      "Split systems and manual reconciliation. How connected teams, live financial ops, and one dashboard replace the merge cycle, pattern-led proof.",
    currentRealitySteps: [
      { label: "Sales sheet", detail: "Prices and schemes edited without version control" },
      { label: "Ops tracker", detail: "Second workbook for orders and dispatch" },
      { label: "Tally", detail: "Posting batch after someone reconciles both" },
      { label: "Management", detail: "Screenshots for reviews; no drill-down" },
    ],
    redesignSteps: [
      { label: "Shared master", detail: "Customers, items, and schemes in one place" },
      { label: "Workflow roles", detail: "Who can move which state; audit trail built in" },
      { label: "Live postings", detail: "Operational events feed finance the same day" },
      { label: "One dashboard", detail: "Order, stock, and cash signals together" },
    ],
    insideZoveto: [
      { module: "ERP", note: "Ledger, AR/AP, and operational postings" },
      { module: "CRM", note: "Commercial truth feeding fulfilment and cash" },
      { module: "WMS", note: "Stock movements reflected without manual bridge" },
      { module: "HRMS", note: "People cost and attendance in the same review cycle" },
    ],
    impactMetrics: [
      { metric: "50% faster reconciliation", context: "Sheet-to-Tally merge time vs single-system close steps" },
      { metric: "Single dashboard truth", context: "One view for owner and HODs instead of three file versions" },
    ],
  },
  {
    slug: "rock-tear-parts",
    industryTag: "Spare Parts",
    title: "From Parts Counter Chaos to Compatibility-Led Spare Parts Flow",
    before: ["Part lookup by memory", "Wrong fitment", "Slow quote follow-up", "Dead stock"],
    after: ["Model-wise compatibility", "Structured counter flow", "Live stock promises", "Aging visibility"],
    systemActions: [
      "Item and model mapping",
      "Counter quote validation",
      "Branch stock visibility",
      "Slow-moving stock alerts",
    ],
    outcomeMetrics: ["Faster counter lookup", "Fewer wrong-part issues", "Cleaner branch stock"],
    ctaLabel: "View system flow",
    problemSummary:
      "Spare-parts teams lose time when item codes, model fitment, branch stock, and customer history sit in separate notebooks, chats, and spreadsheets.",
    metaTitle: "Spare parts counter flow operating pattern | Zoveto",
    metaDescription:
      "Pattern: model-wise spare-parts lookup, counter quotes, branch stock, and aging visibility in one operating flow for Indian dealers and traders.",
    currentRealitySteps: [
      { label: "Enquiry", detail: "Customer describes the machine or part in a call or chat" },
      { label: "Lookup", detail: "Counter staff rely on memory, old invoices, or supplier PDFs" },
      { label: "Stock check", detail: "Branch availability is verified through calls or screenshots" },
      { label: "Quote", detail: "Pricing and substitutes are typed again into a message or sheet" },
      { label: "Dispatch", detail: "Wrong-part returns and dead stock surface after the sale" },
    ],
    redesignSteps: [
      { label: "Compatibility master", detail: "Parts map to machine, model, brand, and substitute rules" },
      { label: "Guided counter search", detail: "Staff search by part, model, customer, or prior sale" },
      { label: "Live branch stock", detail: "Availability, reserved stock, and transfer options show together" },
      { label: "Quote to order", detail: "The same record moves from quote to pick to invoice" },
      { label: "Aging review", detail: "Slow-moving and substitute stock becomes visible before margin is trapped" },
    ],
    insideZoveto: [
      { module: "ERP", note: "Item, substitute, model, and branch-level stock discipline" },
      { module: "CRM", note: "Customer history, quotes, and repeat-purchase context" },
      { module: "WMS", note: "Pick, transfer, dispatch, and return handling" },
      { module: "ERP", note: "Aging, fast movers, dead stock, and branch performance" },
    ],
    impactMetrics: [
      { metric: "Faster counter lookup", context: "Model-wise search replaces memory-led part identification" },
      { metric: "Fewer wrong-part issues", context: "Compatibility and substitute rules are visible before quoting" },
      { metric: "Cleaner branch stock", context: "Transfers, reservations, and aging are reviewed from one stock picture" },
    ],
  },
];

export function getProofBySlug(slug: string): OperationalProof | undefined {
  return operationalProofs.find((p) => p.slug === slug);
}

export function getAllProofSlugs(): string[] {
  return operationalProofs.map((p) => p.slug);
}

const MODULE_TO_PROOF_SLUGS: Record<string, string[]> = {
  inventory: ["inventory-chaos"],
  wms: ["inventory-chaos"],
  crm: ["manual-orders"],
  finance: ["excel-tally-unified"],
  hrms: ["excel-tally-unified"],
  analytics: ["excel-tally-unified", "manual-orders"],
};

export function getProofsForModuleSlug(moduleSlug: string): OperationalProof[] {
  const slugs = MODULE_TO_PROOF_SLUGS[moduleSlug];
  if (!slugs?.length) return [];
  return slugs
    .map((s) => getProofBySlug(s))
    .filter((p): p is OperationalProof => Boolean(p));
}
