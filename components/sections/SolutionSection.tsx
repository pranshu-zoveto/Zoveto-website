"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Package, ShieldCheck, CreditCard, Users, BarChart3, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    icon: Package,
    title: "INVENTORY MANAGEMENT",
    desc: "Stock by site updates when goods move. Reorder alerts. Batch and expiry tracking. Fewer stockouts.",
    color: "teal",
  },
  {
    icon: ShieldCheck,
    title: "CRM & SALES PIPELINE",
    desc: "Lead to invoice in one flow. Pipeline board. Reminders on stalled deals. Rep numbers in one view.",
    color: "blue",
  },
  {
    icon: CreditCard,
    title: "FINANCE & GST",
    desc: "GST invoices from orders. GSTR-ready data. P&L, cash, and dues refresh when postings land.",
    color: "teal",
  },
  {
    icon: Users,
    title: "HR & PAYROLL",
    desc: "App attendance. Leave management. Payroll with PF/ESI/TDS auto-calculation. One-click payslips.",
    color: "blue",
  },
  {
    icon: Workflow,
    title: "WAREHOUSE (WMS)",
    desc: "Barcode & QR scanning. Pick-pack-ship automation. Multi-bin locations. Zero wrong dispatches.",
    color: "teal",
  },
  {
    icon: BarChart3,
    title: "MIS DASHBOARDS",
    desc: "Daily KPI tiles. Saved reports. Scheduled email packs. Target vs actual. CSV export anytime.",
    color: "blue",
  },
];

export function SolutionSection() {
  return (
    <motion.section
      id="solution"
      className="relative py-section-mobile md:py-section bg-background overflow-hidden scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mb-16 md:mb-20">
          <SectionLabel className="bg-teal-dim border-teal/25 text-teal mb-8">The solution</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground tracking-tight">
            One system. <span className="text-teal">Entire company.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            Zoveto ties inventory, CRM, warehouse, finance, HR, and automations to one ledger. Teams stop reconciling
            the same facts in five tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-card border border-border shadow-sm overflow-hidden relative"
            >
              <div className="mb-6 p-3 w-fit rounded-xl bg-surface border border-border group-hover:bg-teal group-hover:border-teal group-hover:text-white transition-all duration-300 text-foreground">
                <mod.icon className="w-6 h-6 opacity-90" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight group-hover:text-teal transition-colors">
                {mod.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed mb-6">{mod.desc}</p>

              <div className="pt-5 border-t border-border flex items-center gap-3 group-hover:border-teal/20 transition-colors">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    mod.color === "teal" ? "bg-teal" : "bg-blue"
                  )}
                />
                <span className="text-xs font-semibold text-muted-2 uppercase tracking-wide">Module live</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
