"use client";

import { useMemo, useState } from "react";

const AGENTS = {
  Operations: ["Inventory Reorder AI", "Dead Stock AI", "Vendor Match AI", "Warehouse Route AI"],
  Business: ["Lead Follow-up AI", "Quote Follow-up AI", "Collection Reminder AI", "Dormant Customer AI"],
  Corporate: ["7:45 MIS AI", "GST Reminder AI", "Payroll Run AI", "Finance Reconciliation AI"],
};

export function AgentGrid() {
  const tabs = useMemo(() => Object.keys(AGENTS) as Array<keyof typeof AGENTS>, []);
  const [active, setActive] = useState<keyof typeof AGENTS>(tabs[0]);

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container max-w-content mx-auto px-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue mb-3">Zoveto AI</p>
        <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-4">
          23 Agents. Running your business while you sleep.
        </h2>
        <div className="flex gap-2 overflow-auto no-scrollbar mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`px-4 min-h-[44px] rounded-[56px] border text-sm font-semibold ${
                active === tab ? "bg-blue text-white border-blue" : "bg-card text-muted border-border"
              }`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {AGENTS[active].map((name) => (
            <article key={name} className="rounded-[18px] border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-foreground">{name}</div>
                <span className="h-2.5 w-2.5 rounded-full bg-green animate-pulse" />
              </div>
              <p className="text-xs text-muted">Runs every 30 minutes · Autonomous mode active</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
