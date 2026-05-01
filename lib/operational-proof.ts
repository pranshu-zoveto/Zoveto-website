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
      "Observed SME pattern: no SKU discipline, manual counts, dispatch errors. How barcode, zones, and scan validation redesign the flow—no client names.",
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
      "Orders arrive on calls and chats, get retyped into sheets, and lose linkage to stock and billing—so revenue recognition lags and mistakes multiply.",
    metaTitle: "Manual orders to flow control | Zoveto Operating Pattern",
    metaDescription:
      "Pattern: WhatsApp orders, duplicates, missed dispatch, late invoices. One pipeline, one record, warehouse sync, instant invoice trigger—pattern-based, not a client story.",
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
      "Sales and ops live in Excel while finance lives in Tally—so nobody sees the same numbers until week-end merges and arguments.",
    metaTitle: "Excel + Tally to one operating system | Zoveto Operating Pattern",
    metaDescription:
      "Split systems and manual reconciliation. How connected teams, live financial ops, and one dashboard replace the merge cycle—pattern-led proof.",
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
