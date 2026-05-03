import React from "react";

const ROWS = [
  ["Lead follow-ups", "Manual", "Automated reminders"],
  ["Stock alerts", "End of day (Excel)", "Every 30 min"],
  ["GST filing", "CA dependency", "One-click, built-in"],
  ["MIS reports", "Hours every Monday", "7:45 AM, on WhatsApp"],
  ["Payment reminders", "Awkward calls", "AI-sent, automated"],
  ["Data security", "Files on hard drives", "Bank-grade, cloud"],
  ["Cost", "₹50K+ fragmented", "From ₹7,999/mo (Starter, monthly)"],
];

export function ComparisonTable() {
  return (
    <section className="border border-border rounded-[18px] overflow-auto bg-card">
      <table className="w-full min-w-[680px] text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-4 text-xs uppercase tracking-wide text-muted-2">Capability</th>
            <th className="px-5 py-4 text-xs uppercase tracking-wide text-muted-2">Excel/WhatsApp/Tally</th>
            <th className="px-5 py-4 text-xs uppercase tracking-wide text-blue">ZOVETO</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row[0]} className="border-b border-border last:border-0">
              <td className="px-5 py-4 text-sm font-medium text-foreground">{row[0]}</td>
              <td className="px-5 py-4 text-sm text-muted">{row[1]}</td>
              <td className="px-5 py-4 text-sm font-semibold bg-blue-dim/80 text-foreground">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
