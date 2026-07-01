// lib/modules.ts
import { Module } from "@/types";
import { Package, Users, Warehouse, Calculator, Fingerprint, PieChart, ShoppingCart, Globe, Wrench, LucideIcon } from "lucide-react";

export interface ModuleWithIcon extends Module {
  icon: LucideIcon;
}

export const modules: ModuleWithIcon[] = [
  {
    slug: "inventory",
    name: "Inventory Intelligence",
    icon: Package,
    tagline: "Every SKU traced from GRN to dispatch.",
    metaTitle: "Inventory Management Software | Stock Ledger, Reorder Alerts, Barcode | Zoveto",
    metaDescription:
      "Inventory across warehouses with reorder alerts, barcode and QR scanning, batch and expiry tracking, and stock movements tied to one operating record.",
    problem:
      "Excel and WhatsApp hide true on-hand stock. Stores and warehouses disagree. Stockouts and dead stock pile up while margin leaks.",
    howItWorks: [
      { step: "Centralize", description: "Stores and hubs write to one stock ledger." },
      { step: "Scan", description: "Barcode inwarding cuts typing mistakes at the dock." },
      { step: "Automate", description: "Low-stock rules fire off past demand, not gut feel." },
      { step: "Audit", description: "Cycle counts sync digitally so audits finish faster." },
    ],
    keyFeatures: [
      { title: "Multi-location sync", description: "See on-hand and in-transit by site without a merge sheet." },
      { title: "Aging analytics", description: "Flag slow movers before they tie up cash." },
      { title: "Batch and expiry", description: "Pick by FEFO so expiry write-offs drop." },
      { title: "Automated GRN", description: "Raise GRN from approved POs in one click." },
      { title: "BOM link", description: "Manufacturing BOM pulls raw usage straight from stock." },
    ],
    integrations: ["wms", "finance", "analytics"],
    metrics: [
      { label: "Dead stock reduction", value: "34%" },
      { label: "Inventory accuracy", value: "99.2%" },
      { label: "Audit speed", value: "3x faster" },
    ],
    targetRoles: ["Operations Manager", "Warehouse Head", "CFO"],
  },
  {
    slug: "crm",
    name: "Sales Command Centre",
    icon: Users,
    tagline: "Leads, quotes, and orders on one timeline.",
    metaTitle: "Sales CRM Software for SMB Operations | Lead, Quote, Order in One Flow | Zoveto",
    metaDescription:
      "Zoveto Sales Command Centre connects leads, follow-ups, quotation builder, order lifecycle, customer history, live inventory, and finance handoffs in one CRM for operations teams.",
    problem:
      "Leads live in chats and sheets. Follow-ups slip. Quotes take days because stock and price checks are manual.",
    howItWorks: [
      { step: "Capture", description: "Web, phone, and partner leads land in one queue." },
      { step: "Prioritize", description: "Rank by value and age so reps call the right name first." },
      { step: "Automate", description: "Approved price lists build PDF quotes in one click." },
      { step: "Convert", description: "Wins post orders to stock and billing automatically." },
    ],
    keyFeatures: [
      { title: "Pipeline view", description: "Stage every deal from first touch to invoice." },
      { title: "WhatsApp logging", description: "File customer replies next to the deal record." },
      { title: "Price lists", description: "Tier and volume rules stop rogue discounts." },
      { title: "Field sales", description: "Geo check-ins and routes for reps on the road." },
      { title: "Direct invoicing", description: "Turn a signed quote into a GST invoice in seconds." },
    ],
    integrations: ["inventory", "finance", "analytics"],
    metrics: [
      { label: "Conversion lift", value: "28%" },
      { label: "Quote speed", value: "60% faster" },
      { label: "Pipeline coverage", value: "100%" },
    ],
    targetRoles: ["Sales Director", "Managing Director", "Regional Manager"],
  },
  {
    slug: "wms",
    name: "Warehouse Management System",
    icon: Warehouse,
    tagline: "Scan-first picking and packing you can audit.",
    metaTitle: "Warehouse Management System | WMS, Bin Tracking, Dispatch | Zoveto",
    metaDescription:
      "Zoveto WMS connects bin tracking, wave picking, scan validation, packing, returns, dispatch, gate logs, inventory, billing, and analytics in one warehouse execution system.",
    problem:
      "Bins move without system updates. Pickers guess. Dispatch lags and finance learns stock truth too late.",
    howItWorks: [
      { step: "Binning", description: "Putaway tasks assign a home bin per SKU." },
      { step: "Picking", description: "Waves batch orders so pickers walk shorter paths." },
      { step: "Packing", description: "Scan checks cut wrong SKU in the box." },
      { step: "Shipping", description: "Carrier events flow back to the customer record." },
    ],
    keyFeatures: [
      { title: "Bin tracking", description: "Shelf and bin IDs stay current after each move." },
      { title: "Wave picking", description: "Group picks to lift units per hour." },
      { title: "Gate entry", description: "Truck logs tie to GRN before stock is released." },
      { title: "Returns", description: "RTO lines reopen stock with reason codes." },
      { title: "Labor view", description: "Picker and packer throughput by shift." },
    ],
    integrations: ["inventory", "logistics", "analytics"],
    metrics: [
      { label: "Dispatch speed", value: "45% faster" },
      { label: "Mis-picks", value: "Near zero" },
      { label: "Bin accuracy", value: "99.9%" },
    ],
    targetRoles: ["Warehouse Manager", "Logistics Head", "Managing Director"],
  },
  {
    slug: "finance",
    name: "Finance OS",
    icon: Calculator,
    tagline: "Operational postings feed the ledger the same day.",
    metaTitle: "Finance OS for SMBs | GST, Ledger, Cash, Reconciliation | Zoveto",
    metaDescription:
      "Zoveto Finance OS connects sales, stock, purchases, receipts, payouts, bank reconciliation, GST, P&L, cash visibility, and compliance workflows in one operating ledger.",
    problem:
      "Tally lags ops. Owners ask for cash and margin mid-month and still wait on exports and fixes.",
    howItWorks: [
      { step: "Post", description: "Sales and purchases write vouchers as they happen." },
      { step: "Reconcile", description: "Bank feeds match to receipts and payouts." },
      { step: "Analyze", description: "Dashboards show margin and cash daily, not only month-end." },
      { step: "File", description: "GSTR packs pull from the same ledger you operate." },
    ],
    keyFeatures: [
      { title: "Operating ledger", description: "One chart for sales, stock, and cash." },
      { title: "Auto reconciliation", description: "Match bank lines to invoices with rules." },
      { title: "P&L pulse", description: "Daily gross margin and overhead view for owners." },
      { title: "GST automation", description: "Tax lines follow invoice types you already use." },
      { title: "Cost centers", description: "Tag spend by branch, project, or team." },
    ],
    integrations: ["crm", "inventory", "hrms", "analytics"],
    metrics: [
      { label: "P&L freshness", value: "Daily" },
      { label: "Month-end close", value: "80% faster" },
      { label: "Compliance posture", value: "Audit ready" },
    ],
    targetRoles: ["CFO", "Accountant", "Business Owner"],
  },
  {
    slug: "hrms",
    name: "People & Payroll",
    icon: Fingerprint,
    tagline: "Attendance, statutory deductions, and payslips in one run.",
    metaTitle: "HRMS and Payroll Software | Attendance, PF, ESI, Payslips | Zoveto",
    metaDescription:
      "Zoveto HRMS connects attendance, shifts, leave, PF, ESI, TDS, payroll runs, payslips, employee self-service, and finance postings for shop and office teams.",
    problem:
      "Attendance sits in devices or books. Payroll rounds trip through spreadsheets. Statutory errors risk penalties.",
    howItWorks: [
      { step: "Track", description: "Face or geo attendance posts to payroll nightly." },
      { step: "Compute", description: "Salary, PF, ESI, and TDS calculate in one engine." },
      { step: "Disburse", description: "Bank upload files match your house format." },
      { step: "Access", description: "Staff pull payslips and leave on mobile." },
    ],
    keyFeatures: [
      { title: "Biometric sync", description: "Hardware punches land in payroll without CSV hacks." },
      { title: "PF and ESI", description: "Rules update with current slabs." },
      { title: "Self-service", description: "Employees download forms and request leave." },
      { title: "Hiring", description: "Candidates and interviews live beside headcount." },
      { title: "Productivity MIS", description: "Compare attendance to output targets." },
    ],
    integrations: ["finance", "analytics"],
    metrics: [
      { label: "Payroll errors", value: "Zero target" },
      { label: "Compliance load", value: "Automated" },
      { label: "Employees on portal", value: "200+" },
    ],
    targetRoles: ["HR Head", "Admin Manager", "Business Owner"],
  },
  {
    slug: "analytics",
    name: "Business Intelligence Layer",
    icon: PieChart,
    tagline: "KPIs drilled down to the voucher that moved the number.",
    metaTitle: "Business Intelligence Dashboard for SMBs | ERP KPI Drilldowns | Zoveto",
    metaDescription:
      "Zoveto Business Intelligence Layer gives SMB leaders ERP, CRM, inventory, finance, and HR dashboards with KPI alerts, source drilldowns, and scheduled reporting packs.",
    problem:
      "Leaders open five tools and still export to Excel. No one trusts one version of revenue or stock value.",
    howItWorks: [
      { step: "Extract", description: "Pull facts from each live module nightly or hourly." },
      { step: "Process", description: "Roll up to KPIs your leadership team already names." },
      { step: "Visualize", description: "Charts flag variance versus plan." },
      { step: "Prompt", description: "Email or WhatsApp digests on a fixed cadence." },
    ],
    keyFeatures: [
      { title: "Cross-module view", description: "Sales, stock, and cash on one canvas." },
      { title: "KPI builder", description: "Save ratios that match how you judge the business." },
      { title: "Alerts", description: "Notify when stock or cash crosses a band you set." },
      { title: "Multi-unit compare", description: "Stack branches or plants side by side." },
      { title: "Drill to source", description: "Click a bar and open the underlying voucher." },
    ],
    integrations: ["all"],
    metrics: [
      { label: "Coverage", value: "All modules" },
      { label: "Report cadence", value: "Daily" },
      { label: "Decision basis", value: "Posted data" },
    ],
    targetRoles: ["MD", "CEO", "CFO", "Founders"],
  },
  {
    slug: "procurement",
    name: "Procurement",
    icon: ShoppingCart,
    tagline: "Purchase requests, vendors, approvals, and incoming material in one flow.",
    metaTitle: "Procurement Software for Indian SMBs | Purchase Orders, Vendors, Approvals | Zoveto",
    metaDescription:
      "Zoveto Procurement connects purchase requests, vendor follow-ups, approvals, GRN, bills, and inventory so buying decisions stay tied to live business needs.",
    problem:
      "Purchase requests move through chats, vendor quotes get lost, and incoming material reaches stores before finance and inventory have the same truth.",
    howItWorks: [
      { step: "Request", description: "Teams raise purchase requests from reorder points or operating need." },
      { step: "Approve", description: "Owners approve vendors, prices, and quantities with role-based controls." },
      { step: "Order", description: "Purchase orders carry terms, expected dates, and linked items." },
      { step: "Receive", description: "GRN, bills, and stock updates stay connected." },
    ],
    keyFeatures: [
      { title: "Purchase requests", description: "Raise needs from stock signals or manual requests." },
      { title: "Vendor comparison", description: "Compare quotes and terms before approval." },
      { title: "Approval workflows", description: "Route spend by amount, category, or role." },
      { title: "PO to GRN tracking", description: "Follow incoming material against the PO line." },
      { title: "Purchase bill handoff", description: "Finance receives bills tied to received stock." },
    ],
    integrations: ["inventory", "finance", "wms"],
    metrics: [
      { label: "Purchase leakage caught", value: "Earlier" },
      { label: "Approval visibility", value: "100%" },
      { label: "Vendor follow-up", value: "On record" },
    ],
    targetRoles: ["Procurement Head", "Operations Manager", "CFO"],
  },
  {
    slug: "export",
    name: "Export Operations",
    icon: Globe,
    tagline: "Export orders, documents, dispatch stages, and customer communication tracked together.",
    metaTitle: "Export Management Software | Export Orders, Documents, Dispatch Tracking | Zoveto",
    metaDescription:
      "Zoveto Export Operations helps Indian exporters track export orders, documentation, dispatch stages, customer updates, and finance handoffs from one operating record.",
    problem:
      "Export orders need documents, status updates, dispatch coordination, and finance follow-up, but teams often track them across email, Excel, and chats.",
    howItWorks: [
      { step: "Capture", description: "Export orders are logged with customer, item, destination, and promise dates." },
      { step: "Prepare", description: "Documentation tasks are assigned and tracked." },
      { step: "Dispatch", description: "Packing, dispatch, and shipment stages stay visible." },
      { step: "Close", description: "Finance, receivables, and customer updates stay tied to the order." },
    ],
    keyFeatures: [
      { title: "Export order tracker", description: "One row per export order with live status." },
      { title: "Documentation checklist", description: "Assign and close document tasks per shipment." },
      { title: "Dispatch milestone tracking", description: "Packing and dispatch stages stay visible." },
      { title: "Customer communication", description: "Log updates without losing order context." },
      { title: "Finance handoff", description: "Receivables follow posted dispatch evidence." },
    ],
    integrations: ["crm", "inventory", "finance"],
    metrics: [
      { label: "Document readiness", value: "Tracked" },
      { label: "Dispatch visibility", value: "Live" },
      { label: "Follow-up coverage", value: "Complete" },
    ],
    targetRoles: ["Export Manager", "Operations Head", "Finance Controller"],
  },
  {
    slug: "mro",
    name: "MRO",
    icon: Wrench,
    tagline: "Maintenance requests, spares, service schedules, and downtime visible in one place.",
    metaTitle: "MRO Software | Maintenance, Spares, Service Scheduling | Zoveto",
    metaDescription:
      "Zoveto MRO helps teams track maintenance requests, spare parts, service schedules, downtime, and operational follow-ups without losing work in chats.",
    problem:
      "Maintenance work gets reported informally, spare parts are hard to trace, and downtime becomes visible only after operations are already affected.",
    howItWorks: [
      { step: "Report", description: "Teams log maintenance requests with asset, location, and urgency." },
      { step: "Assign", description: "Owners and due dates are attached to each job." },
      { step: "Consume", description: "Spare parts usage is linked to inventory." },
      { step: "Review", description: "Downtime and repeat issues become visible." },
    ],
    keyFeatures: [
      { title: "Maintenance request log", description: "Capture jobs with asset and urgency." },
      { title: "Asset and location tracking", description: "Know where work is needed." },
      { title: "Spare parts consumption", description: "Link usage back to inventory." },
      { title: "Preventive schedules", description: "Plan service before breakdowns." },
      { title: "Downtime visibility", description: "See repeat issues and lost hours." },
    ],
    integrations: ["inventory", "analytics"],
    metrics: [
      { label: "Maintenance visibility", value: "Central" },
      { label: "Spare traceability", value: "Linked" },
      { label: "Downtime follow-up", value: "Tracked" },
    ],
    targetRoles: ["Plant Manager", "Maintenance Head", "Operations Director"],
  },
];
