"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SceneErrorBoundary } from "@/components/3d/SceneErrorBoundary";

const OSNetworkCanvas = dynamic(() => import("@/components/3d/OSNetworkCanvas").then((m) => m.OSNetworkCanvas), {
  ssr: false,
});

export function OSNetworkSection() {
  return (
    <motion.section
      className="bg-background border-y border-border py-section-mobile md:py-section scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container max-w-content mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue">The OS network</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            One system. Everything connected.
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted max-w-xl">
            CRM, inventory, warehouse, finance, and operations run on one shared data model. Every team works from the
            same live signal.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["CRM", "Inventory", "Warehouse", "Finance", "HR", "Reports"].map((item) => (
              <span key={item} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 md:p-6 min-h-[320px] md:min-h-[420px]">
          <SceneErrorBoundary>
            <OSNetworkCanvas />
          </SceneErrorBoundary>
          <p className="mt-4 text-xs text-muted-2 uppercase tracking-wide">System topology</p>
        </div>
      </div>
    </motion.section>
  );
}
