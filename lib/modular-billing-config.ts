export const BILLING_MODULES = [
  {
    key: "WMS",
    guardCode: "WMS",
    label: "WMS",
    description: "Warehouse & Dispatch Operations",
    icon: "🏭",
    monthlyPrice: 7999,
    highlights: [
      "Barcode & QR scanning",
      "Pick-pack-ship automation",
      "Multi-bin locations",
      "Stock movements & GRN",
    ],
  },
  {
    key: "CRM",
    guardCode: "CRM",
    label: "CRM",
    description: "WhatsApp-first Sales Pipeline",
    icon: "📊",
    monthlyPrice: 6999,
    highlights: [
      "Lead to invoice in one flow",
      "WhatsApp follow-ups",
      "Pipeline board",
      "Activity logs",
    ],
  },
  {
    key: "ERP",
    guardCode: "ERP",
    label: "ERP",
    description: "Finance, Invoicing & Collections",
    icon: "💰",
    monthlyPrice: 9999,
    highlights: [
      "GST-ready invoicing",
      "Multi-site inventory",
      "P&L, cash & dues live",
      "Purchase & sales orders",
    ],
  },
  {
    key: "HRMS",
    guardCode: "HR",
    label: "HRMS",
    description: "HR & Payroll",
    icon: "👥",
    monthlyPrice: 5999,
    highlights: [
      "App attendance & leave",
      "PF / ESI / TDS auto-calc",
      "One-click payslips",
      "Employee document store",
    ],
  },
  {
    key: "INTELLIGENCE",
    guardCode: "AI_STUDIO",
    label: "Intelligence",
    description: "AI Agents & Automation",
    icon: "🤖",
    monthlyPrice: 5999,
    requires: ["ERP"],
    highlights: [
      "AI nudges on stalled leads",
      "Low-stock & overdue alerts",
      "WhatsApp automation",
      "MIS dashboards",
    ],
  },
] as const;

export type BillingModuleKey = (typeof BILLING_MODULES)[number]["key"];

export const BILLING_BUNDLES = [
  {
    key: "operations-suite",
    razorpayPlanId: process.env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY ?? "",
    label: "Operations Suite",
    tagline: "WMS + ERP + CRM",
    monthlyPrice: 14999,
    modules: ["WMS", "ERP", "CRM"] as BillingModuleKey[],
  },
  {
    key: "business-os",
    razorpayPlanId: process.env.RAZORPAY_PLAN_BUSINESS_OS_MONTHLY ?? "",
    label: "Business OS",
    tagline: "All 5 modules",
    monthlyPrice: 24999,
    modules: ["WMS", "CRM", "ERP", "HRMS", "INTELLIGENCE"] as BillingModuleKey[],
    popular: true,
  },
] as const;

/** Resolve dependencies: Intelligence requires ERP. Returns sorted unique keys. */
export function resolveModulesWithDeps(selected: BillingModuleKey[]): BillingModuleKey[] {
  const set = new Set(selected);
  for (const mod of BILLING_MODULES) {
    if (set.has(mod.key as BillingModuleKey) && "requires" in mod) {
      for (const dep of mod.requires as BillingModuleKey[]) {
        set.add(dep);
      }
    }
  }
  return BILLING_MODULES.map((m) => m.key as BillingModuleKey).filter((k) => set.has(k));
}

/** Compute total monthly price for a set of module keys (after dependency resolution). */
export function computeModularTotal(moduleKeys: BillingModuleKey[]): number {
  const resolved = resolveModulesWithDeps(moduleKeys);
  return resolved.reduce((sum, key) => {
    const mod = BILLING_MODULES.find((m) => m.key === key);
    if (!mod) return sum;
    return sum + mod.monthlyPrice;
  }, 0);
}
