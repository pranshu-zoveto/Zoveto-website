"use client";

import React from "react";
import { motion } from "framer-motion";
import { Text } from "@/components/ui/Text";
import { Box, CreditCard, Users, LayoutDashboard, Database, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    id: "inventory",
    title: "Inventory & Stock",
    icon: Box,
    desc: "Stock by location updates with each move. Reorder alerts when you breach mins.",
    size: "large",
    metrics: ["4,821 SKUs active", "Zero stockouts"],
  },
  {
    id: "finance",
    title: "Finance & GST",
    icon: CreditCard,
    desc: "Automated CGST/SGST/IGST invoicing and ledger sync.",
    size: "medium",
    metrics: ["GSTR-1 Ready"],
  },
  {
    id: "crm",
    title: "CRM & Sales",
    icon: Users,
    desc: "Lead to quote automation. Unified sales pipeline.",
    size: "small",
    metrics: ["127 Active Leads"],
  },
  {
    id: "mis",
    title: "MIS Dashboard",
    icon: LayoutDashboard,
    desc: "Saved KPI boards for owners and CXOs.",
    size: "small",
    metrics: ["Live Pulse"],
  },
  {
    id: "wms",
    title: "Warehouse (WMS)",
    icon: Database,
    desc: "Pick-pack-ship automation with barcode scanning.",
    size: "medium",
    metrics: ["Zero Dispatch Errors"],
  },
  {
    id: "hr",
    title: "HR & Payroll",
    icon: ShieldCheck,
    desc: "Integrated payroll and PF/ESI calculations.",
    size: "small",
    metrics: ["One-click payroll"],
  },
];

export function ModuleBento() {
  return (
    <motion.section
      id="modules"
      className="bg-background py-20 md:py-28 lg:py-36 relative scroll-mt-24 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container max-w-content mx-auto px-4 sm:px-6 mb-16 flex flex-col items-center text-center">
        <Text variant="label-uppercase" className="mb-3">
          The ecosystem
        </Text>
        <Text variant="display-2" as="h2" className="max-w-3xl text-foreground mb-6">
          One operating record for every <span className="text-blue">team</span> that moves the business.
        </Text>
        <Text variant="body-lg" className="text-muted max-w-xl">
          Modules share customers, stock, and invoices. Turn on what you need first.
        </Text>
      </div>

      <div className="container max-w-content mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[minmax(260px,auto)]">
        {MODULES.map((mod) => (
          <div
            key={mod.id}
            className={cn(
              "group p-8 rounded-2xl border border-border bg-card shadow-sm flex flex-col relative overflow-hidden",
              mod.size === "large"
                ? "md:col-span-6 lg:col-span-8 md:flex-row md:gap-10"
                : mod.size === "medium"
                  ? "md:col-span-3 lg:col-span-4"
                  : "md:col-span-2 lg:col-span-3"
            )}
          >
            <div className="space-y-5 flex-1 relative z-10 flex flex-col justify-between">
              <div>
                <mod.icon
                  className="text-blue mb-6 opacity-80"
                  size={28}
                />
                <Text variant="heading-2" as="h3" className="text-foreground mb-3 tracking-tight">
                  {mod.title}
                </Text>
                <Text variant="body-base" className="text-muted max-w-xs">
                  {mod.desc}
                </Text>
              </div>
              <div className="space-y-2 pt-4">
                {mod.metrics.map((m) => (
                  <div key={m} className="text-xs font-semibold text-teal flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" /> {m}
                  </div>
                ))}
              </div>
            </div>

            {mod.size === "large" && (
              <div className="flex-1 hidden md:flex items-center justify-center relative z-10 p-6">
                <div className="w-full aspect-square max-w-[200px] bg-surface border border-border rounded-xl flex items-center justify-center opacity-80">
                  <div className="space-y-2 w-28">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-1 bg-border rounded-full w-full" />
                    ))}
                    <div className="h-1 bg-blue/40 rounded-full w-2/3" />
                    {[1, 2].map((j) => (
                      <div key={j + 3} className="h-1 bg-border rounded-full w-1/2" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
