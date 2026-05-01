"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    num: "01",
    title: "LEAD CAPTURED",
    what: "Customer sends WhatsApp / fills web form / sales rep logs call",
    zoveto: "Auto-creates lead, assigns representative, sets follow-up",
  },
  {
    num: "02",
    title: "QUOTE IN 60 SECONDS",
    what: "Sales rep selects products, applies pricing, checks stock",
    zoveto: "Generates PDF quote, sends via WhatsApp/email instantly",
  },
  {
    num: "03",
    title: "ORDER CONFIRMED",
    what: "Customer approves, order confirmed in system",
    zoveto: "Reserves stock, creates WMS picking task automatically",
  },
  {
    num: "04",
    title: "WAREHOUSE PICKS & PACKS",
    what: "WMS sends picking list, team scans barcodes",
    zoveto: "Barcode confirms pick, packing list auto-generated",
  },
  {
    num: "05",
    title: "DISPATCHED",
    what: "Goods leave warehouse",
    zoveto: "Gate pass + invoice auto-generated, customer notified",
  },
  {
    num: "06",
    title: "PAYMENT & REPORTS LIVE",
    what: "Payment received",
    zoveto: "GST ledger, P&L, and dashboard refresh on the payment post",
  },
];

export function HowItWorksSection() {
  return (
    <motion.section
      id="hiw"
      className="relative py-section bg-background overflow-hidden border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          <div className="lg:w-[40%] sticky top-32 h-fit">
            <SectionLabel className="bg-blue/10 border-blue/20 text-blue mb-8">
              The Flow
            </SectionLabel>
            <h2 className="text-6xl md:text-[5.5rem] font-display leading-[0.9] mb-10 uppercase">
              Inquiry to <br /><span className="text-blue">Invoice.</span>
            </h2>
            <p className="text-xl text-muted-2 font-light leading-relaxed max-w-sm">
              One flow from first touch to payment. Each step posts to the next module. Everyone sees the same status.
            </p>
          </div>

          <div className="lg:w-[60%] space-y-0">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="group relative grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-8 md:gap-16 pb-16 md:pb-24"
              >
                {/* Connector Line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute top-[64px] md:top-[80px] left-[32px] md:left-[40px] w-px h-[calc(100%-64px)] md:h-[calc(100%-80px)] bg-gradient-to-b from-blue/20 to-transparent" />
                )}

                <div className="relative">
                  <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] rounded-full bg-card border border-border flex items-center justify-center font-display text-2xl md:text-3xl text-blue">
                    {step.num}
                  </div>
                </div>

                <div className="pt-2 md:pt-4">
                  <h3 className="text-2xl md:text-3xl font-display text-foreground mb-6 uppercase tracking-[0.1em]">
                    {step.title}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-bold text-muted-2 tracking-[0.2em] uppercase mb-2">Process</div>
                      <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                        {step.what}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-blue/5 border border-blue/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue" />
                        <span className="text-[10px] font-bold text-blue tracking-[0.2em] uppercase">Zoveto Action</span>
                      </div>
                      <p className="text-sm text-blue/90 font-medium">
                        {step.zoveto}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
