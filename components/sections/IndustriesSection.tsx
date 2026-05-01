"use client";

import React from "react";
import { motion } from "framer-motion";
import { Factory, ShoppingCart, Warehouse, Rocket, ArrowRight } from "lucide-react";
import { Text } from "@/components/ui/Text";

const INDUSTRIES = [
  {
    icon: Factory,
    name: "MANUFACTURING",
    tagline: "BOM, production tracking, raw material planning",
    metric: "34% wastage reduction",
    features: ["Production Planning", "BOM Management", "Quality Checks", "Batch Tracking"],
    quote: "Finally know exactly what's on our shop floor in real time.",
  },
  {
    icon: ShoppingCart,
    name: "TRADING & DISTRIBUTION",
    tagline: "Purchase orders, multi-party ledgers, margin tracking",
    metric: "2× order speed",
    features: ["Vendor Management", "Pricing Rules", "Credit Limits", "Multi-ledger"],
    quote: "Replaced 3 tools and 1 ops hire. Margins finally visible.",
  },
  {
    icon: Warehouse,
    name: "WAREHOUSING",
    tagline: "Multi-location tracking, barcode ops, dispatch management",
    metric: "Zero wrong dispatches",
    features: ["Bin Management", "Inward / Outward", "Gate Entry", "Returns"],
    quote: "Barcode scanning removed all our entry errors overnight.",
  },
  {
    icon: Rocket,
    name: "GROWING STARTUPS",
    tagline: "Scale without hiring 5 extra ops people",
    metric: "Replaced 3 tools + 1 hire",
    features: ["Lean ops team", "Fast rollout", "Owner reporting", "Approval controls"],
    quote: "We were live in 10 days. No consultant. No 6-month drama.",
  },
];

export function IndustriesSection() {
  return (
    <motion.section
      id="industries"
      className="relative py-20 md:py-28 lg:py-36 bg-surface border-t border-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Text variant="label-uppercase" className="text-teal mb-4">
            Vertical depth
          </Text>
          <Text variant="display-1" as="h2" className="mb-6">
            Workflows for the places where errors become expensive.
          </Text>
          <Text variant="body-lg" className="text-muted max-w-2xl">
            Each rollout starts with how orders, stock, cash, and people actually move in that business. No borrowed
            template pretending every industry runs the same.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={i}
              className="group p-8 md:p-10 rounded-2xl bg-card border border-border overflow-hidden flex flex-col relative shadow-sm"
            >
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-border gap-4">
                <div className="flex items-center gap-5 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-teal-dim flex items-center justify-center border border-teal/20 shrink-0">
                    <ind.icon className="w-7 h-7 text-teal stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <Text variant="heading-1" as="h3" className="text-foreground mb-1 leading-tight">
                      {ind.name}
                    </Text>
                    <Text variant="body-sm" className="text-muted-2">
                      {ind.tagline}
                    </Text>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted shrink-0">
                  <ArrowRight size={18} />
                </div>
              </div>

              <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-2 uppercase tracking-wide">Core capabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {ind.features.map((feat, j) => (
                      <span
                        key={j}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-surface text-muted border border-border"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-teal-dim border border-teal/15 text-center min-w-[180px]">
                  <div className="text-xs font-semibold text-teal uppercase tracking-wide mb-1">Proven ROI</div>
                  <div className="text-lg font-bold text-teal">{ind.metric}</div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border text-muted">
                <Text variant="body-sm" className="italic leading-relaxed">
                  &quot;{ind.quote}&quot;
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
