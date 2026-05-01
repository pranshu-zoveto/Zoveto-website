"use client";

import React from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Wake up knowing everything.",
    body: "Your AI checks revenue vs target, cash position, overdue payments, low stock alerts, and pending orders before office hours.",
    cta: "See what your morning looks like →",
  },
  {
    title: "Your best salesperson never sleeps.",
    body: "A lead comes in Friday evening. By Monday morning the AI has followed up, logged touchpoints, and flagged priority action.",
    cta: "See AI follow-up flow →",
  },
  {
    title: "Your warehouse thinks for itself.",
    body: "Stock drops below threshold and the system raises a purchase action, tags the best vendor, and updates your morning brief.",
    cta: "See autonomous reorder logic →",
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-content mx-auto px-5 sm:px-6 space-y-8 md:space-y-12">
        {FEATURES.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center rounded-[18px] border border-border bg-card p-5 md:p-8"
          >
            <div className={`${index % 2 === 1 ? "lg:order-2" : ""} space-y-3`}>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{feature.title}</h3>
              <p className="text-base text-muted leading-relaxed">{feature.body}</p>
              <p className="text-sm font-semibold text-blue">{feature.cta}</p>
            </div>
            <div className={`${index % 2 === 1 ? "lg:order-1" : ""} min-h-[220px] rounded-[18px] border border-border bg-surface`} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
