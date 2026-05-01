"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { BRAND_LOGO_ICON } from "@/lib/branding";

export function OSSchematic() {
  return (
    <motion.section
      className="bg-surface py-24 md:py-32 lg:py-40 relative overflow-hidden border-y border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="space-y-8">
          <Text variant="label-uppercase" className="mb-2">
            The concept
          </Text>
          <Text variant="display-2" as="h2" className="max-w-xl text-foreground">
            One architectural layer that unifies your entire <span className="text-blue">company logic.</span>
          </Text>
          <Text variant="body-lg" className="text-muted max-w-lg">
            The Zoveto OS establishes a single source of truth for your business. CRM feeds Inventory. Warehouse feeds
            Finance. Global data flows into one automated ledger.
          </Text>
          <div className="pt-4">
            <Button variant="outline" className="gap-2 group">
              Explore the OS architecture{" "}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="relative aspect-square lg:aspect-auto min-h-[420px] lg:h-[520px] bg-card border border-border rounded-2xl p-8 md:p-12 overflow-hidden flex items-center justify-center shadow-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-border rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] border border-border rounded-full opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] border border-border/50 rounded-full opacity-40" />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="w-14 h-14 md:w-16 md:h-16 relative shrink-0">
              <Image
                src={BRAND_LOGO_ICON}
                alt=""
                width={64}
                height={64}
                className="object-contain w-full h-full"
                sizes="64px"
                unoptimized
                aria-hidden
              />
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 md:gap-x-20 md:gap-y-10">
              {["CRM", "STOCK", "WMS", "FINANCE"].map((node) => (
                <div
                  key={node}
                  className="p-5 bg-surface border border-border rounded-xl min-w-[120px] md:min-w-[140px] text-center space-y-1.5 group hover:border-blue/40 transition-colors shadow-sm"
                >
                  <div className="text-xs font-semibold text-muted-2">{node}</div>
                  <div className="text-xs text-muted group-hover:text-foreground transition-colors">Active node</div>
                </div>
              ))}
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue/15 fill-none" viewBox="0 0 100 100">
            <motion.path
              d="M50 50 L15 15"
              strokeDasharray="100"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M50 50 L85 15"
              strokeDasharray="100"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M50 50 L15 85"
              strokeDasharray="100"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M50 50 L85 85"
              strokeDasharray="100"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
