"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CircleDot,
  ClipboardCheck,
  Layers,
  PackageCheck,
  Radar,
  ScanLine,
  ShieldCheck,
  Warehouse,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { modules } from "@/lib/modules";
import { ModuleOperationalProofs } from "@/components/operational-proof/ModuleOperationalProofs";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { ModuleScreenshotMockup, MODULE_SCREENSHOT_SLUGS } from "@/components/modules/ModuleScreenshotMockup";
import { IconCard } from "@/components/ui/IconCard";
import { bandIndexForSection } from "@/lib/marketing-bands";

type SurfaceTone = "green" | "amber" | "red" | "blue";
type ModulePulse = { label: string; value: string; icon: typeof ClipboardCheck };
type SurfaceRow = { code: string; item: string; context: string; status: string; tone: SurfaceTone };
type SurfaceMetric = { label: string; value: string; progress: string };
type ModuleShowcase = {
  chip: string;
  headline: string;
  flowHeadline: string;
  flowCopy: string;
  architectureLabel: string;
  connectionCopy: string;
  controlHeadline?: string;
  controlCopy?: string;
  controlPoints?: string[];
  pulse: ModulePulse[];
  surface: {
    label: string;
    sublabel: string;
    status: string;
    primaryTitle: string;
    secondaryTitle: string;
    assuranceTitle: string;
    assuranceCopy: string;
    metrics: SurfaceMetric[];
    rows: SurfaceRow[];
  };
};

const moduleShowcases: Record<string, ModuleShowcase> = {
  inventory: {
    chip: "Inventory command layer",
    headline: "Stock truth, without the daily chase.",
    flowHeadline: "From dock scan to owner dashboard.",
    flowCopy:
      "Each stock event is posted once, then reused across warehouse, finance, and reporting. No duplicate entry.",
    architectureLabel: "Live ledger architecture",
    connectionCopy: "Inventory stops drifting when warehouse, finance, and reporting read the same movement record.",
    controlHeadline: "The inventory screen should feel like control, not clerical work.",
    controlCopy:
      "Zoveto shows the exception, the responsible team, and the next action. Owners see what needs attention without opening five sheets.",
    controlPoints: [
      "One stock ledger for stores, warehouses, and in-transit movement",
      "Barcode inwarding, FEFO batches, and cycle counts in the same flow",
      "Reorder rules and aging views before stock turns into trapped cash",
    ],
    pulse: [
      { label: "GRN posted", value: "12 min", icon: ClipboardCheck },
      { label: "Stock variance", value: "0.8%", icon: Radar },
      { label: "Pick queue", value: "42 lines", icon: ScanLine },
    ],
    surface: {
      label: "Live stock ledger",
      sublabel: "Inventory command queue",
      status: "Synced",
      primaryTitle: "Stock pulse",
      secondaryTitle: "Exceptions queue",
      assuranceTitle: "Audit ready",
      assuranceCopy: "Every stock move keeps user, time, and source document.",
      metrics: [
        { label: "On hand accuracy", value: "99.2%", progress: "72%" },
        { label: "Aging exposure", value: "Rs 8.4L", progress: "46%" },
        { label: "Open cycle count", value: "18 bins", progress: "58%" },
      ],
      rows: [
        { code: "RM-2048", item: "Printed cartons", context: "BLR WH-02", status: "Reorder in 3 days", tone: "amber" },
        { code: "FG-1182", item: "Retail pack A", context: "MUM Dispatch", status: "Ready to pick", tone: "green" },
        { code: "BX-4401", item: "Batch X4401", context: "QA hold", status: "Expiry flagged", tone: "red" },
      ],
    },
  },
  crm: {
    chip: "Revenue command layer",
    headline: "Sales control, without follow-up chaos.",
    flowHeadline: "From lead capture to invoice-ready order.",
    flowCopy:
      "Every lead, quote, price rule, stock check, and order handoff stays on one accountable timeline.",
    architectureLabel: "Lead-to-invoice architecture",
    connectionCopy: "Sales stops waiting when quotes can see stock, approved prices, and finance status before the customer calls twice.",
    controlHeadline: "The CRM screen should show who needs action now.",
    controlCopy:
      "Zoveto turns scattered leads, stale quotes, and manual order checks into a ranked command queue for sales leaders.",
    controlPoints: [
      "Every lead is captured with source, owner, stage, and next action",
      "Quotes pull approved price lists and live stock before customers wait",
      "Won deals create orders and billing handoffs without retyping",
    ],
    pulse: [
      { label: "Quote pending", value: "31", icon: ClipboardCheck },
      { label: "Stale leads", value: "6", icon: Radar },
      { label: "Won today", value: "14", icon: ScanLine },
    ],
    surface: {
      label: "Sales command queue",
      sublabel: "Lead-to-invoice control",
      status: "Live",
      primaryTitle: "Revenue pulse",
      secondaryTitle: "Priority queue",
      assuranceTitle: "No orphan leads",
      assuranceCopy: "Every opportunity keeps owner, stage, activity age, and conversion path.",
      metrics: [
        { label: "Quote cycle", value: "60% faster", progress: "76%" },
        { label: "Pipeline coverage", value: "100%", progress: "100%" },
        { label: "Conversion lift", value: "28%", progress: "64%" },
      ],
      rows: [
        { code: "LD-7712", item: "Distributor quote", context: "North region", status: "Price approved", tone: "green" },
        { code: "OP-4209", item: "Bulk reorder", context: "Stock check", status: "Needs call", tone: "amber" },
        { code: "QT-1180", item: "Retail chain RFQ", context: "Awaiting margin", status: "Risk of delay", tone: "red" },
      ],
    },
  },
  wms: {
    chip: "Warehouse execution layer",
    headline: "Warehouse movement, without blind spots.",
    flowHeadline: "From putaway to gate pass, every scan is accountable.",
    flowCopy:
      "Every bin, picker, packer, and dispatch event stays tied to the same order and stock record.",
    architectureLabel: "Scan-to-dispatch architecture",
    connectionCopy: "Warehouse execution stops leaking time when orders, stock, gates, and reports read the same scan trail.",
    controlHeadline: "The warehouse screen should show work in motion, not idle stock.",
    controlCopy:
      "Zoveto turns bins, waves, pickers, packing, returns, and gate movement into one controlled execution board.",
    controlPoints: [
      "Putaway rules assign SKUs to zones and bins before stock disappears into the warehouse",
      "Wave picks group work by route, priority, and order readiness",
      "Packing and gate scans prevent wrong SKU, short ship, and unposted dispatch",
    ],
    pulse: [
      { label: "Pick waves", value: "8 active", icon: ClipboardCheck },
      { label: "Mis-pick risk", value: "Low", icon: Radar },
      { label: "Gate queue", value: "11 orders", icon: ScanLine },
    ],
    surface: {
      label: "Warehouse dispatch board",
      sublabel: "Scan-first fulfillment",
      status: "Scanning",
      primaryTitle: "Fulfillment pulse",
      secondaryTitle: "Execution queue",
      assuranceTitle: "Scan validated",
      assuranceCopy: "Every pick, pack, and dispatch event carries SKU, bin, user, and timestamp.",
      metrics: [
        { label: "Dispatch velocity", value: "45% faster", progress: "74%" },
        { label: "Bin accuracy", value: "99.9%", progress: "98%" },
        { label: "Open returns", value: "7 RTO", progress: "34%" },
      ],
      rows: [
        { code: "WV-1204", item: "North zone wave", context: "42 lines", status: "Picking", tone: "blue" },
        { code: "PK-8810", item: "Priority dispatch", context: "Gate 02", status: "Pack check", tone: "amber" },
        { code: "RT-3391", item: "Return intake", context: "Reason pending", status: "Hold", tone: "red" },
      ],
    },
  },
  finance: {
    chip: "Finance operating layer",
    headline: "Finance truth, without month-end firefighting.",
    flowHeadline: "From operational event to same-day ledger.",
    flowCopy:
      "Sales, purchases, stock movement, receipts, and payouts post into finance as the business runs.",
    architectureLabel: "Ops-to-ledger architecture",
    connectionCopy: "Finance stops chasing exports when sales, stock, payroll, and bank movement post into the same ledger trail.",
    controlHeadline: "The finance screen should show cash, margin, and compliance before the close.",
    controlCopy:
      "Zoveto gives owners and finance teams live operating numbers instead of delayed exports and reconciliation arguments.",
    controlPoints: [
      "Operational events create finance-ready postings without waiting for manual exports",
      "Receivables, payables, bank matching, and GST work from the same source trail",
      "Daily P&L pulse and cash visibility replace week-end spreadsheet merges",
    ],
    pulse: [
      { label: "P&L freshness", value: "Today", icon: ClipboardCheck },
      { label: "Unmatched bank", value: "12 lines", icon: Radar },
      { label: "GST pack", value: "Ready", icon: ScanLine },
    ],
    surface: {
      label: "Finance control ledger",
      sublabel: "Cash, margin, compliance",
      status: "Posted",
      primaryTitle: "Finance pulse",
      secondaryTitle: "Close queue",
      assuranceTitle: "Audit trail",
      assuranceCopy: "Every posting keeps the source order, stock movement, receipt, or payout that created it.",
      metrics: [
        { label: "Month-end close", value: "80% faster", progress: "80%" },
        { label: "Ledger freshness", value: "Daily", progress: "92%" },
        { label: "Compliance posture", value: "Audit ready", progress: "88%" },
      ],
      rows: [
        { code: "AR-3308", item: "Overdue receivable", context: "Distributor ledger", status: "Escalate", tone: "amber" },
        { code: "BNK-1182", item: "Bank match", context: "UPI receipts", status: "Auto matched", tone: "green" },
        { code: "GST-042", item: "Tax variance", context: "Purchase return", status: "Review", tone: "red" },
      ],
    },
  },
  hrms: {
    chip: "People execution layer",
    headline: "Payroll and attendance, without spreadsheet loops.",
    flowHeadline: "From attendance signal to compliant payroll run.",
    flowCopy:
      "Attendance, shifts, leave, deductions, payslips, and finance postings stay connected in one people workflow.",
    architectureLabel: "Attendance-to-payroll architecture",
    connectionCopy: "Payroll stops becoming a month-end scramble when attendance, deductions, approvals, and finance stay linked.",
    controlHeadline: "The HRMS screen should make people operations predictable.",
    controlCopy:
      "Zoveto turns punches, leave, deductions, statutory rules, and payslips into a controlled run instead of a monthly scramble.",
    controlPoints: [
      "Attendance syncs from device, face, or geo check-in into payroll-ready records",
      "PF, ESI, TDS, leave, and deductions calculate with a traceable rule path",
      "Payslips, bank files, and finance postings come from one approved payroll run",
    ],
    pulse: [
      { label: "Attendance sync", value: "Live", icon: ClipboardCheck },
      { label: "Payroll exceptions", value: "9", icon: Radar },
      { label: "Payslips ready", value: "186", icon: ScanLine },
    ],
    surface: {
      label: "People operations board",
      sublabel: "Attendance to payroll",
      status: "Running",
      primaryTitle: "People pulse",
      secondaryTitle: "Payroll queue",
      assuranceTitle: "Rule checked",
      assuranceCopy: "Every salary line keeps attendance, leave, deduction, and approval context.",
      metrics: [
        { label: "Payroll errors", value: "Zero target", progress: "86%" },
        { label: "Employees on portal", value: "200+", progress: "72%" },
        { label: "Compliance load", value: "Automated", progress: "82%" },
      ],
      rows: [
        { code: "ATT-1801", item: "Late punch cluster", context: "Factory shift B", status: "Review", tone: "amber" },
        { code: "PAY-042", item: "Salary run", context: "April payroll", status: "Ready", tone: "green" },
        { code: "DED-291", item: "PF variance", context: "New joiners", status: "Check rule", tone: "red" },
      ],
    },
  },
  analytics: {
    chip: "Decision intelligence layer",
    headline: "Business truth, without morning exports.",
    flowHeadline: "From posted data to boardroom answers.",
    flowCopy:
      "Dashboards read the same events your teams operate on, then drill every KPI back to the voucher that moved it.",
    architectureLabel: "Source-to-KPI architecture",
    connectionCopy: "BI stops becoming a reporting project when dashboards read posted events instead of rebuilt spreadsheets.",
    controlHeadline: "The BI screen should answer the next question before the meeting starts.",
    controlCopy:
      "Zoveto turns raw operational postings into owner-ready answers with drilldowns, alerts, and scheduled packs.",
    controlPoints: [
      "KPIs come from posted source data, not rebuilt spreadsheet logic",
      "Every chart can drill down to branch, customer, item, or voucher",
      "Alerts push variance before leaders wait for a weekly report",
    ],
    pulse: [
      { label: "KPI refresh", value: "Hourly", icon: ClipboardCheck },
      { label: "Variance flags", value: "9", icon: Radar },
      { label: "Packs sent", value: "18", icon: ScanLine },
    ],
    surface: {
      label: "BI control room",
      sublabel: "Source-linked dashboards",
      status: "Refreshed",
      primaryTitle: "Decision pulse",
      secondaryTitle: "Variance queue",
      assuranceTitle: "Drill to source",
      assuranceCopy: "Every metric keeps a path back to the transaction, branch, customer, or item behind it.",
      metrics: [
        { label: "Data coverage", value: "All modules", progress: "100%" },
        { label: "Report cadence", value: "Daily", progress: "82%" },
        { label: "Source confidence", value: "Posted data", progress: "94%" },
      ],
      rows: [
        { code: "KPI-042", item: "Gross margin dip", context: "West branch", status: "Drill ready", tone: "amber" },
        { code: "REV-118", item: "Revenue ahead", context: "B2B channel", status: "On plan", tone: "green" },
        { code: "STK-902", item: "Stock value spike", context: "Aging > 60 days", status: "Needs review", tone: "red" },
      ],
    },
  },
  procurement: {
    chip: "Buying command layer",
    headline: "Purchase control, without lost quotes and late GRNs.",
    flowHeadline: "From request to GRN on one buying record.",
    flowCopy:
      "Purchase requests, vendor quotes, approvals, POs, and incoming material stay on the same trail so stores and finance are not catching up after the truck arrives.",
    architectureLabel: "Request-to-receive architecture",
    connectionCopy: "Buying stops leaking when inventory, warehouse, and finance read the same PO and GRN instead of a chat thread.",
    controlHeadline: "The procurement screen should show what is waiting on you, not a pile of emails.",
    controlCopy:
      "Zoveto ranks open requests, pending approvals, overdue POs, and unmatched receipts so spend is visible before the bill arrives.",
    controlPoints: [
      "Teams raise purchase requests from reorder points or operating need, not a side WhatsApp",
      "Owners approve vendors, prices, and quantities with role-based controls before the PO goes out",
      "GRN, bills, and stock updates stay connected to the PO line instead of three separate files",
    ],
    pulse: [
      { label: "Open PRs", value: "24", icon: ClipboardCheck },
      { label: "Awaiting approval", value: "7", icon: Radar },
      { label: "GRN due today", value: "11", icon: ScanLine },
    ],
    surface: {
      label: "Procurement command queue",
      sublabel: "Request to receive",
      status: "Live",
      primaryTitle: "Buying pulse",
      secondaryTitle: "Approval queue",
      assuranceTitle: "PO-tied",
      assuranceCopy: "Every receipt and bill keeps the PO line, vendor, quantity, and receiver.",
      metrics: [
        { label: "Approval visibility", value: "100%", progress: "100%" },
        { label: "Purchase leakage", value: "Caught earlier", progress: "72%" },
        { label: "Vendor follow-up", value: "On record", progress: "84%" },
      ],
      rows: [
        { code: "PR-1882", item: "Printed cartons reorder", context: "BLR WH-02", status: "Quote compare", tone: "amber" },
        { code: "PO-4409", item: "Vendor PO released", context: "Expected Thu", status: "In transit", tone: "blue" },
        { code: "GRN-091", item: "Short receipt", context: "PO line 4", status: "Hold bill", tone: "red" },
      ],
    },
  },
  export: {
    chip: "Export execution layer",
    headline: "Shipment control, without email and Excel as the file.",
    flowHeadline: "Capture, prepare, dispatch, close.",
    flowCopy:
      "Export orders, documentation tasks, packing stages, and finance handoffs stay on one row so customer updates are not a separate spreadsheet.",
    architectureLabel: "Order-to-shipment architecture",
    connectionCopy: "Export work stops fragmenting when CRM, inventory, and finance read the same dispatch evidence.",
    controlHeadline: "The export screen should show document readiness and the next milestone.",
    controlCopy:
      "Zoveto turns packing lists, missing papers, and shipment stages into a tracked queue instead of a thread of forwarding emails.",
    controlPoints: [
      "Export orders are logged with customer, item, destination, and promise dates",
      "Documentation tasks are assigned and closed per shipment instead of living in inboxes",
      "Packing, dispatch, receivables, and customer updates stay tied to the same order",
    ],
    pulse: [
      { label: "Docs pending", value: "9", icon: ClipboardCheck },
      { label: "Ready to pack", value: "6", icon: Radar },
      { label: "In transit", value: "14", icon: ScanLine },
    ],
    surface: {
      label: "Export operations board",
      sublabel: "Capture to close",
      status: "Tracking",
      primaryTitle: "Shipment pulse",
      secondaryTitle: "Document queue",
      assuranceTitle: "Order-tied",
      assuranceCopy: "Every document task and dispatch stage keeps the export order, destination, and owner.",
      metrics: [
        { label: "Document readiness", value: "Tracked", progress: "78%" },
        { label: "Dispatch visibility", value: "Live", progress: "88%" },
        { label: "Follow-up coverage", value: "Complete", progress: "92%" },
      ],
      rows: [
        { code: "EXP-3301", item: "Gulf consignment", context: "Jebel Ali", status: "Docs in review", tone: "amber" },
        { code: "PKG-118", item: "Packing complete", context: "ICD 04", status: "Ready to dispatch", tone: "green" },
        { code: "DOC-044", item: "COO pending", context: "Shipment 12", status: "Blocked", tone: "red" },
      ],
    },
  },
  mro: {
    chip: "Maintenance execution layer",
    headline: "Plant work, without downtime hiding in chats.",
    flowHeadline: "Report, assign, consume, review.",
    flowCopy:
      "Maintenance requests, owners, spare consumption, and downtime stay on one job so repeat failures are visible before the line stops again.",
    architectureLabel: "Request-to-review architecture",
    connectionCopy: "MRO stops being informal when inventory and analytics can read the same job, spare, and downtime record.",
    controlHeadline: "The MRO screen should show which asset is waiting and which spare left the bin.",
    controlCopy:
      "Zoveto turns reported faults, assigned jobs, spare issues, and lost hours into a maintenance queue instead of a WhatsApp group.",
    controlPoints: [
      "Teams log maintenance requests with asset, location, and urgency instead of a verbal report",
      "Owners and due dates attach to each job before spares are pulled",
      "Spare parts usage links back to inventory, and downtime and repeat issues become reviewable",
    ],
    pulse: [
      { label: "Open jobs", value: "18", icon: ClipboardCheck },
      { label: "Spares issued", value: "31", icon: Radar },
      { label: "Downtime today", value: "2.4h", icon: ScanLine },
    ],
    surface: {
      label: "MRO work board",
      sublabel: "Report to review",
      status: "Open",
      primaryTitle: "Plant pulse",
      secondaryTitle: "Job queue",
      assuranceTitle: "Spare-linked",
      assuranceCopy: "Every job keeps asset, assignee, spare issue, and downtime hours.",
      metrics: [
        { label: "Maintenance visibility", value: "Central", progress: "86%" },
        { label: "Spare traceability", value: "Linked", progress: "80%" },
        { label: "Downtime follow-up", value: "Tracked", progress: "74%" },
      ],
      rows: [
        { code: "WO-2104", item: "Mixer bearing noise", context: "Line 2", status: "Assigned", tone: "amber" },
        { code: "SPR-881", item: "Seal kit issued", context: "Bin M-14", status: "Consumed", tone: "green" },
        { code: "DTN-019", item: "Repeat trip", context: "Compressor 3", status: "Review", tone: "red" },
      ],
    },
  },
};

const defaultShowcase: ModuleShowcase = {
  chip: "Module architecture",
  headline: "Accountable execution, without the manual chase.",
  flowHeadline: "From first signal to accountable action.",
  flowCopy:
    "Each operational event is posted once, then reused across the modules that need it. No duplicate entry.",
  architectureLabel: "Connected module architecture",
  connectionCopy: "This module stops becoming another silo when surrounding teams can read and act on its records.",
  pulse: [
    { label: "Actions posted", value: "Live", icon: ClipboardCheck },
    { label: "Exceptions", value: "Ranked", icon: Radar },
    { label: "Handoffs", value: "Tracked", icon: ScanLine },
  ],
  surface: {
    label: "Module command queue",
    sublabel: "Operational control",
    status: "Connected",
    primaryTitle: "Operating pulse",
    secondaryTitle: "Priority queue",
    assuranceTitle: "Traceable",
    assuranceCopy: "Every action keeps user, time, module, and source context.",
    metrics: [
      { label: "System freshness", value: "Live", progress: "88%" },
      { label: "Manual follow-up", value: "Lower", progress: "64%" },
      { label: "Data confidence", value: "High", progress: "78%" },
    ],
    rows: [
      { code: "ACT-104", item: "Pending action", context: "Module queue", status: "Assigned", tone: "blue" },
      { code: "EXC-218", item: "Exception raised", context: "Owner view", status: "In review", tone: "amber" },
      { code: "SYN-009", item: "Cross-module sync", context: "System event", status: "Complete", tone: "green" },
    ],
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ModuleClient({ slug }: { slug: string }) {
  const data = modules.find((m) => m.slug === slug) || modules[0];
  const reduceMotion = useReducedMotion();
  const showcase = moduleShowcases[data.slug] ?? defaultShowcase;
  const hasControlSection = Boolean(showcase.controlPoints?.length);

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  return (
    <div className="relative z-10 space-y-0">
      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <section className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-elevated">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              background:
                "radial-gradient(circle at 20% 10%, rgba(0,113,227,0.12), transparent 34%), radial-gradient(circle at 86% 14%, rgba(52,199,89,0.10), transparent 32%)",
            }}
          />
          <motion.div
            className="relative grid gap-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
          >
            <motion.div className="space-y-8 p-7 sm:p-10 md:p-12" variants={reveal}>
              <SectionLabel className="mb-0 border-blue/15 bg-white/80 text-blue">Operational friction</SectionLabel>
              <div className="max-w-2xl space-y-5">
                <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground md:text-5xl">
                  {showcase.headline}
                </h2>
                <p className="max-w-[64ch] text-base leading-7 text-muted md:text-lg">{data.problem}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {data.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-border bg-white/75 p-4 shadow-sm">
                    <div className="text-2xl font-semibold tracking-[-0.03em] text-foreground tabular-nums">{m.value}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-cap text-muted-2">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative p-4 sm:p-6 lg:pl-8"
              variants={reveal}
            >
              <ModuleCommandSurface moduleName={data.name} showcase={showcase} />
            </motion.div>
          </motion.div>
        </section>
      </FluidMarketingSection>

      {MODULE_SCREENSHOT_SLUGS.includes(data.slug) ? (
        <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
          <RevealOnScroll>
            <div className="mx-auto max-w-2xl">
              <ModuleScreenshotMockup moduleSlug={data.slug} moduleName={data.name} />
            </div>
          </RevealOnScroll>
        </FluidMarketingSection>
      ) : null}

      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <RevealOnScroll>
          <div className="grid gap-6 pt-6 md:pt-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8">
            <div className="rounded-[1.5rem] border border-border bg-foreground p-7 text-white shadow-[0_20px_70px_rgba(15,23,42,0.18)] md:p-10">
              <SectionLabel className="mb-8 border-white/10 bg-white/10 text-white">Zoveto flow</SectionLabel>
              <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-4xl">
                {showcase.flowHeadline}
              </h2>
              <p className="mt-5 max-w-[54ch] text-sm leading-6 text-white/70 md:text-base">
                {showcase.flowCopy}
              </p>

              <div className="mt-9 grid gap-3">
                {showcase.pulse.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={17} className="text-white/75" />
                      <span className="text-sm font-medium text-white/70">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="rounded-[1.5rem] border border-border bg-card p-7 shadow-float md:p-10"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
            >
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <SectionLabel className="mb-4 border-none bg-transparent p-0 text-muted-2">Execution sequence</SectionLabel>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
                    Four movements. One record trail.
                  </h3>
                </div>
                <div className="hidden rounded-full border border-blue/15 bg-blue-light px-4 py-2 text-xs font-semibold text-blue sm:block">
                  {showcase.architectureLabel}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {data.howItWorks.map((step, i) => (
                  <motion.div
                    key={step.step}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-5 transition-colors hover:border-blue/25 hover:bg-white"
                    variants={reveal}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue/15 bg-blue-light text-sm font-semibold text-blue">
                        0{i + 1}
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue motion-reduce:transform-none"
                      />
                    </div>
                    <div className="text-base font-semibold text-foreground">{step.step}</div>
                    <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </RevealOnScroll>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <motion.div
          className="grid gap-8 pt-6 md:pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
        >
          <motion.div
            className="rounded-[1.5rem] border border-border bg-card p-7 shadow-float md:p-10"
            variants={reveal}
          >
            <SectionLabel className="mb-7 border-none bg-transparent p-0 text-muted-2">System capabilities</SectionLabel>
            <div className="grid gap-0">
              {data.keyFeatures.map((f, i) => (
                <IconCard
                  key={f.title}
                  variant="list"
                  as="article"
                  index={i + 1}
                  label={f.title}
                  description={f.description}
                  divided={i > 0}
                />
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={reveal}>
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-float md:p-9">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-blue" />
                <SectionLabel className="mb-0 border-none bg-transparent p-0 text-muted-2">Connected records</SectionLabel>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                {showcase.connectionCopy}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.integrations.map((m) => (
                  <div
                    key={m}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-blue/35 hover:text-foreground"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-blue-light p-7 md:p-9">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-blue" />
                <SectionLabel className="mb-0 border-none bg-transparent p-0 text-muted-2">Target roles</SectionLabel>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.targetRoles.map((role) => (
                  <div
                    key={role}
                    className="flex items-center gap-2 rounded-full border border-blue/15 bg-white px-4 py-2 shadow-sm"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue" />
                    <span className="text-xs font-semibold text-foreground">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </FluidMarketingSection>

      {hasControlSection ? (
        <FluidMarketingSection band={bandIndexForSection(3)} overlapTop stackBase>
          <section className="pt-6 md:pt-8">
            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-elevated md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <SectionLabel className="mb-6 border-none bg-transparent p-0 text-muted-2">Control points</SectionLabel>
                  <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground md:text-4xl">
                    {showcase.controlHeadline}
                  </h2>
                  <p className="mt-5 max-w-[58ch] text-base leading-7 text-muted">
                    {showcase.controlCopy}
                  </p>
                </div>

                <div className="grid gap-3">
                  {showcase.controlPoints?.map((point, i) => (
                    <div key={point} className="flex items-start gap-4 rounded-2xl border border-border bg-surface-2 p-5">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium leading-6 text-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FluidMarketingSection>
      ) : null}

      <FluidMarketingSection band={bandIndexForSection(hasControlSection ? 4 : 3)} overlapTop stackBase>
        <div className="pt-6 md:pt-8">
          <ModuleOperationalProofs moduleSlug={slug} />
        </div>
      </FluidMarketingSection>
    </div>
  );
}

function ModuleCommandSurface({ moduleName, showcase }: { moduleName: string; showcase: ModuleShowcase }) {
  const reduceMotion = useReducedMotion();
  const { surface } = showcase;

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-border bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue text-white">
            <PackageCheck size={16} />
          </span>
          <div>
            <div className="text-sm font-semibold text-foreground">{moduleName}</div>
            <div className="text-[11px] font-medium text-muted-2">{surface.label}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-green/20 bg-green/10 px-3 py-1.5 text-[11px] font-semibold text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          {surface.status}
        </div>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-[0.78fr_1.22fr]">
        <div className="bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-cap text-muted-2">{surface.primaryTitle}</div>
            <BarChart3 size={16} className="text-blue" />
          </div>
          <div className="space-y-3">
            {surface.metrics.map((metric) => (
              <MiniPulse key={metric.label} label={metric.label} value={metric.value} progress={metric.progress} />
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-blue/15 bg-blue-light p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue">
              <ShieldCheck size={14} />
              {surface.assuranceTitle}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">{surface.assuranceCopy}</p>
          </div>
        </div>

        <div className="relative bg-card p-4">
          {!reduceMotion ? (
            <motion.div
              className="pointer-events-none absolute left-4 right-4 top-[4.3rem] h-px bg-blue/70"
              animate={{ opacity: [0.25, 1, 0.25], scaleX: [0.15, 1, 0.15] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          ) : null}

          <div className="mb-4 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-cap text-muted-2">{surface.secondaryTitle}</div>
            <Warehouse size={16} className="text-blue" />
          </div>
          <div className="space-y-2">
            {surface.rows.map((row) => (
              <div key={row.code} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-2xl border border-border bg-surface-2 p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <CircleDot
                      size={12}
                      className={row.tone === "green" ? "text-green" : row.tone === "red" ? "text-red" : "text-amber"}
                    />
                    <span className="truncate text-sm font-semibold text-foreground">{row.item}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-2">
                    {row.code} · {row.context}
                  </div>
                </div>
                <div className="self-center rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-muted">
                  {row.status}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {showcase.pulse.map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-white p-3">
                <item.icon size={14} className="text-blue" />
                <div className="mt-2 text-sm font-semibold text-foreground">{item.value}</div>
                <div className="mt-0.5 text-[10px] font-medium leading-4 text-muted-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPulse({ label, value, progress }: { label: string; value: string; progress: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-2 p-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span className="text-sm font-semibold text-foreground tabular-nums">{value}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-blue" style={{ width: progress }} />
      </div>
    </div>
  );
}
