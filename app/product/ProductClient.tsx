"use client";

import React from "react";
import { Text } from "@/components/ui/Text";
import { Database, Activity, Share2 } from "lucide-react";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

const ARCHITECTURE_LAYERS = [
  {
    id: "layer-1",
    title: "The data foundation",
    icon: Database,
    desc: "One operating record for sales, inventory, warehouse, and finance events. Less reconciliation. Fewer arguments.",
    features: ["Shared transaction record", "Role-level audit trail", "GSTR-1 validation"],
  },
  {
    id: "layer-2",
    title: "Operational handoffs",
    icon: Share2,
    desc: "A quote can check stock, a pick list can trigger billing, and finance can see the source movement.",
    features: ["Cross-module rules", "Exception queues", "Event-driven workflows"],
  },
  {
    id: "layer-3",
    title: "Executive intelligence",
    icon: Activity,
    desc: "Owner dashboards read posted work, not exported files. Every number can be drilled back to the source action.",
    features: ["Margin movement", "Stock aging", "Cash visibility"],
  },
];

export function ProductClient() {
  return (
    <RevealOnScroll>
      <div className="grid gap-8 py-20 md:grid-cols-3 md:py-28">
        {ARCHITECTURE_LAYERS.map((layer) => (
          <article
            key={layer.id}
            className="float-card reveal-item group space-y-8 p-8 transition-shadow hover:shadow-[var(--shadow-hover)] md:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface transition-colors group-hover:border-blue/30">
              <layer.icon className="text-blue" size={22} />
            </div>
            <div className="space-y-3">
              <Text variant="heading-2" as="h3" className="text-lg text-foreground">
                {layer.title}
              </Text>
              <Text variant="body-base" className="leading-relaxed text-muted">
                {layer.desc}
              </Text>
            </div>
            <ul className="space-y-3 border-t border-border pt-8">
              {layer.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" /> {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </RevealOnScroll>
  );
}
