"use client";

import React from "react";

const ROWS = [
  { sku: "Part / SKU", bin: "Zone · Bin", qty: "On hand", status: "Status" },
  { sku: "—", bin: "A · 12-04", qty: "Posted", status: "Available" },
  { sku: "—", bin: "B · 03-11", qty: "Reserved", status: "Allocated" },
  { sku: "—", bin: "C · 08-02", qty: "Posted", status: "QC hold" },
];

/** Table chrome only — no fabricated quantities or savings claims. */
export function InventoryLedgerPreview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elevated)] md:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-2">Stock ledger</p>
        <span className="text-[11px] font-medium text-muted">Live view</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid grid-cols-[1.1fr_1fr_0.7fr_0.75fr] gap-2 border-b border-border bg-surface-2/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-muted-2">
          {ROWS[0] && (
            <>
              <span>{ROWS[0].sku}</span>
              <span>{ROWS[0].bin}</span>
              <span>{ROWS[0].qty}</span>
              <span>{ROWS[0].status}</span>
            </>
          )}
        </div>
        <div className="divide-y divide-border">
          {ROWS.slice(1).map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.1fr_1fr_0.7fr_0.75fr] gap-2 px-3 py-2.5 text-xs text-muted"
            >
              <span className="font-mono text-[11px] text-foreground/90">{row.sku}</span>
              <span>{row.bin}</span>
              <span>{row.qty}</span>
              <span className="text-foreground/80">{row.status}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-2">
        Illustrative layout. Your live ledger is driven by GRN, moves, reservations, and dispatch postings in Zoveto.
      </p>
    </div>
  );
}
