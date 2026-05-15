/** Modular pricing data — 5 independently purchasable modules + 2 bundles. */

export type PricingModuleId = "wms" | "crm" | "erp" | "hrms" | "intelligence";

export type PricingModule = {
  id: PricingModuleId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  features: readonly string[];
  accentColor: "blue" | "teal";
};

export type PricingBundleId = "operations-suite" | "business-os";

export type PricingBundle = {
  id: PricingBundleId;
  name: string;
  tagline: string;
  moduleLabel: string;
  monthlyPrice: number;
  moduleIds: readonly PricingModuleId[];
  savingsVsSeparate: number;
  popular: boolean;
  ctaHref: string;
  ctaLabel: string;
};

// Individual module prices (monthly, INR, excl. GST)
export const MODULES: readonly PricingModule[] = [
  {
    id: "wms",
    name: "WMS",
    tagline: "Warehouse Management",
    monthlyPrice: 7999,
    accentColor: "teal",
    features: [
      "Barcode & QR scanning",
      "Pick-pack-ship automation",
      "Multi-bin locations",
      "Stock movements & GRN",
      "Zero dispatch errors",
    ],
  },
  {
    id: "crm",
    name: "CRM",
    tagline: "Sales & Customer Management",
    monthlyPrice: 6999,
    accentColor: "blue",
    features: [
      "Lead to invoice in one flow",
      "Pipeline board & reminders",
      "WhatsApp & email follow-ups",
      "Rep performance dashboard",
      "Activity logs & notes",
    ],
  },
  {
    id: "erp",
    name: "ERP",
    tagline: "Inventory, Orders & Finance",
    monthlyPrice: 9999,
    accentColor: "teal",
    features: [
      "Multi-site inventory",
      "Purchase & sales orders",
      "GST-ready invoicing",
      "P&L, cash & dues live",
      "GSTR-ready data export",
    ],
  },
  {
    id: "hrms",
    name: "HRMS",
    tagline: "HR & Payroll",
    monthlyPrice: 5999,
    accentColor: "blue",
    features: [
      "App attendance & leave",
      "PF / ESI / TDS auto-calc",
      "One-click payslips",
      "Payroll compliance reports",
      "Employee document store",
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    tagline: "AI Agents & Automation",
    monthlyPrice: 5999,
    accentColor: "teal",
    features: [
      "AI nudges on stalled leads",
      "Low-stock & overdue alerts",
      "WhatsApp automation",
      "MIS dashboards & KPI tiles",
      "Scheduled report packs",
    ],
  },
] as const;

// Bundle savings math:
// Operations Suite = WMS + ERP + CRM = 7999 + 9999 + 6999 = 24,997 → bundle 14,999 → saves 9,998
// Business OS = all 5 = 24,997 + 5999 + 5999 = 36,995 → bundle 24,999 → saves 11,996
export const BUNDLES: readonly PricingBundle[] = [
  {
    id: "operations-suite",
    name: "Operations Suite",
    tagline: "The core stack for distributors and manufacturers",
    moduleLabel: "WMS + ERP + CRM",
    monthlyPrice: 14999,
    moduleIds: ["wms", "erp", "crm"],
    savingsVsSeparate: 24997 - 14999, // ₹9,998
    popular: true,
    ctaHref: "/contact",
    ctaLabel: "Book a demo",
  },
  {
    id: "business-os",
    name: "Business OS",
    tagline: "All five modules. Complete operating infrastructure.",
    moduleLabel: "All 5 modules",
    monthlyPrice: 24999,
    moduleIds: ["wms", "erp", "crm", "hrms", "intelligence"],
    savingsVsSeparate: 36995 - 24999, // ₹11,996
    popular: false,
    ctaHref: "/contact",
    ctaLabel: "Book a demo",
  },
] as const;

/** Lowest module price — used for "starting from" copy. */
export const MODULE_STARTING_PRICE = Math.min(...MODULES.map((m) => m.monthlyPrice));
