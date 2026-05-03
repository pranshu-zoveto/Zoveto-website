"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { getPublicIndustries } from "@/lib/industries";

export function IndustriesSection() {
  const publicIndustries = getPublicIndustries();

  return (
    <motion.section
      id="industries"
      className="relative border-t border-border bg-surface py-20 md:py-28 lg:py-36 overflow-hidden"
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
          {publicIndustries.map((ind) => {
            const href = `/industries/${ind.slug}`;
            const Icon = ind.icon;
            return (
              <Link
                key={ind.slug}
                href={href}
                className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-colors hover:border-teal/35 md:p-10"
              >
                <div className="mb-8 flex items-start justify-between gap-4 border-b border-border pb-6">
                  <div className="flex min-w-0 items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-teal/20 bg-teal-dim">
                      <Icon className="h-7 w-7 stroke-[1.5] text-teal" />
                    </div>
                    <div className="min-w-0">
                      <Text variant="heading-1" as="h3" className="mb-1 leading-tight text-foreground">
                        {ind.name.toUpperCase()}
                      </Text>
                      <Text variant="body-sm" className="text-muted-2">
                        {ind.headline}
                      </Text>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors group-hover:border-teal/30 group-hover:text-teal">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-2">Core capabilities</div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {ind.homepageFeatures.map((feat) => (
                    <span
                      key={feat}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <p className="mt-auto text-sm font-semibold text-teal">Read operational fit →</p>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-muted">
          Other business models (startups, D2C, pharma, and more) are onboarded with the same manual setup process—
          <Link href="/signup" className="font-medium text-teal underline-offset-2 hover:underline">
            request setup
          </Link>{" "}
          and we map your workflow first.
        </p>
      </div>
    </motion.section>
  );
}
