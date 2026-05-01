export type BrandProductId = "erp" | "os" | "ai";

export type BrandProduct = {
  id: BrandProductId;
  anchor: string;
  /** Namespace-style prefix shown before hover (e.g. ".erp"). */
  dotPrefix: string;
  /** Full product line. */
  productLine: string;
  /** Short label in hero blocks. */
  label: string;
  role: string;
  description: string;
  bullets: string[];
  accent: "blue" | "violet" | "cyan";
};

export const BRAND_PRODUCTS: readonly BrandProduct[] = [
  {
    id: "erp",
    anchor: "zoveto-erp",
    dotPrefix: ".erp",
    productLine: "ZOVETO ERP",
    label: "ERP",
    role: "Core business engine",
    description:
      "Finance, inventory, tax-aware procurement, and the ledger you run daily. Not a read-only accounting export.",
    bullets: [
      "Single source of truth for stock, orders, and money",
      "Regional compliance without slowing teams down",
      "Structured for audit-ready operations from day one",
    ],
    accent: "blue",
  },
  {
    id: "os",
    anchor: "zoveto-crm",
    dotPrefix: ".crm",
    productLine: "ZOVETO CRM",
    label: "CRM",
    role: "Customer relationship system",
    description:
      "Pipeline and deals sit on the same customer record as orders and cash. No orphan CRM silo.",
    bullets: [
      "Pipeline management with workflow-driven deal movement",
      "Deal stages visible to sales, ops, and finance in one board",
      "Customer lifecycle fully connected to execution",
    ],
    accent: "violet",
  },
  {
    id: "ai",
    anchor: "zoveto-ai",
    dotPrefix: ".ai",
    productLine: "ZOVETO AI",
    label: "AI",
    role: "Intelligence layer",
    description:
      "Automations read your ERP and OS data first. Alerts cite stock, dues, or SLA facts, not generic chat fluff.",
    bullets: [
      "Automations grounded in ERP and OS context",
      "Insights when they matter, not noise dashboards",
      "Designed to compound as your data matures",
    ],
    accent: "cyan",
  },
] as const;

export function getBrandProduct(id: BrandProductId): BrandProduct {
  const p = BRAND_PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown brand product: ${id}`);
  return p;
}
