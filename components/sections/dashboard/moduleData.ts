export type DashboardModule = {
  id: "operations" | "purchase" | "sales-crm" | "people" | "finance";
  label: string;
  /** Short label in the content panel ribbon (defaults to `label` in UI). */
  eyebrow?: string;
  sub: string;
  icon: "Layers" | "ShoppingCart" | "TrendingUp" | "Users" | "DollarSign";
  color: string;
  panelSide: "left" | "right";
  headline: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
  bullets: string[];
};

export const MODULES: DashboardModule[] = [
  {
    id: "operations",
    label: "Operations",
    eyebrow: "Warehousing",
    sub: "WMS, inventory, and dispatch",
    icon: "Layers",
    color: "#0047FF",
    panelSide: "right",
    headline: "Run your warehouse like a machine.",
    body: "Current stock by location. Structured pick, pack, and dispatch workflows. Lot tracking with FIFO/FEFO. Barcode-driven operations. Your team stops reacting and starts executing.",
    stats: [
      { value: "40%", label: "Fewer stockouts" },
      { value: "3×", label: "Faster dispatch" },
      { value: "Zero", label: "Excel runbooks" },
    ],
    bullets: [
      "Multi-warehouse inventory with posted movement sync",
      "Automated reorder triggers and stock alerts",
      "GRN, QC, and putaway workflows",
      "Barcode and QR scanning, mobile-ready",
    ],
  },
  {
    id: "purchase",
    label: "Purchase",
    sub: "Procurement and suppliers",
    icon: "ShoppingCart",
    color: "#0047FF",
    panelSide: "left",
    headline: "Procurement that runs on logic, not follow-ups.",
    body: "Auto-generate purchase orders from stock levels. Compare suppliers in one place. Full 3-way matching before payments are released.",
    stats: [
      { value: "~8%", label: "Procurement leakage caught" },
      { value: "100%", label: "GRN-PO matching" },
      { value: "2 days", label: "PO cycle time" },
    ],
    bullets: [
      "Auto purchase requests from reorder points",
      "Supplier comparison and price tracking",
      "3-way matching: PO to GRN to Invoice",
      "Tax-aligned purchase bills and debit notes",
    ],
  },
  {
    id: "sales-crm",
    label: "Sales & CRM",
    sub: "Pipeline, orders, and customers",
    icon: "TrendingUp",
    color: "#00A896",
    panelSide: "right",
    headline: "Close deals. Never lose a follow-up.",
    body: "Track your full sales pipeline from lead to payment. Follow up on WhatsApp, email, or SMS. Every order syncs with inventory and finance. No missed revenue.",
    stats: [
      { value: "23%", label: "Higher conversion" },
      { value: "Zero", label: "Revenue leakage (target)" },
      { value: "4 min", label: "Avg. quotation time" },
    ],
    bullets: [
      "Lead capture from WhatsApp, email, SMS, web, and referrals",
      "Sales pipeline with deal stages and probability",
      "One-click quotation to sales order conversion",
      "GST invoices, e-invoices, and e-way bills",
    ],
  },
  {
    id: "people",
    label: "People",
    sub: "HR and people hub",
    icon: "Users",
    color: "#0047FF",
    panelSide: "left",
    headline: "HR that actually works for your team.",
    body: "Attendance, payroll, and compliance in one place.Automated calculations. No manual work.",
    stats: [
      { value: "100%", label: "Payroll accuracy" },
      { value: "8 hrs", label: "Saved/month on payroll" },
      { value: "Zero", label: "Compliance penalties" },
    ],
    bullets: [
      "Biometric / mobile attendance integration",
      "Leave management with approval workflows",
      "Payroll with PF, ESI, PT, TDS auto-calculation",
      "Salary slips delivered via email, SMS, or WhatsApp",
    ],
  },
  {
    id: "finance",
    label: "Finance",
    sub: "Invoices, ledgers, cash",
    icon: "DollarSign",
    color: "#00A896",
    panelSide: "right",
    headline: "Your books. Always accurate. Always live.",
    body: "Daily P&L, Balance Sheet, and Cash Flow. GST returns auto-prepared. Every sale, purchase, and payment posts automatically to your ledger.",
    stats: [
      { value: "Live", label: "P&L and cash flow" },
      { value: "100%", label: "GST compliance" },
      { value: "1 click", label: "GST return filing" },
    ],
    bullets: [
      "Double-entry accounting - auto-posted",
      "GSTR-1, GSTR-3B, and e-invoice reconciliation",
      "Multi-branch consolidated P&L",
      "Bank reconciliation and payment matching",
    ],
  },
];
