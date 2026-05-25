"use client";

/**
 * LeadsCrmClient — the entire interactive layer for the Leads CRM page.
 *
 * Responsibilities:
 *  - Search/filter bar (name, email, company, status, source)
 *  - CSV export
 *  - Bulk select + bulk delete
 *  - Inline status editing via LeadStatusSelect
 *  - Row click → open LeadDrawer
 *  - Funnel metrics bar
 */

import { useState, useMemo, useTransition } from "react";
import { Search, Download, Trash2, Filter, ChevronDown, X } from "lucide-react";
import { LeadStatusSelect, StatusBadge } from "./LeadStatusSelect";
import { LeadDrawer } from "./LeadDrawer";
import type { LeadRow, LeadForDrawer, FunnelMetrics } from "../types";
import { LEAD_STATUSES } from "../types";
import type { LeadStatus } from "../types";
import { deleteLead } from "../actions";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function relativetime(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

function scoreColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-zinc-500";
}

function toCSV(leads: LeadRow[]): string {
  const headers = ["Name", "Email", "Company", "Phone", "Status", "Score", "Source", "Medium", "Campaign", "Created"];
  const rows = leads.map((l) =>
    [
      l.name, l.email, l.company ?? "", l.phone ?? "",
      l.status, l.score, l.utmSource ?? "", l.utmMedium ?? "", l.utmCampaign ?? "",
      new Date(l.createdAt).toISOString(),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function downloadCSV(data: string, filename = "zoveto-leads.csv") {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Funnel Bar ───────────────────────────────────────────────────────────────

function FunnelBar({ metrics }: { metrics: FunnelMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {[
        { label: "Total Leads", value: metrics.totalLeads, color: "text-zinc-100" },
        { label: "New", value: metrics.byStatus.NEW ?? 0, color: "text-blue-400" },
        { label: "Contacted", value: metrics.byStatus.CONTACTED ?? 0, color: "text-yellow-400" },
        { label: "Qualified", value: metrics.byStatus.QUALIFIED ?? 0, color: "text-purple-400" },
        { label: "Won", value: metrics.byStatus.WON ?? 0, color: "text-green-400" },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className={`text-2xl font-bold tabular-nums ${item.color}`}>{item.value}</p>
          <p className="mt-0.5 text-xs text-zinc-600">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Conversion metrics bar ───────────────────────────────────────────────────

function ConversionBar({ metrics }: { metrics: FunnelMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        {
          label: "Win Rate",
          value: metrics.totalLeads > 0
            ? `${Math.round(((metrics.byStatus.WON ?? 0) / metrics.totalLeads) * 100)}%`
            : "—",
          sub: `${metrics.byStatus.WON ?? 0} won of ${metrics.totalLeads}`,
          color: "text-green-400",
        },
        {
          label: "Avg Response Time",
          value: metrics.avgResponseTimeMinutes
            ? metrics.avgResponseTimeMinutes < 60
              ? `${metrics.avgResponseTimeMinutes}m`
              : `${Math.round(metrics.avgResponseTimeMinutes / 60)}h`
            : "—",
          sub: "from NEW to first action",
          color: "text-teal-400",
        },
        {
          label: "Avg Lead Score",
          value: metrics.avgScore > 0 ? metrics.avgScore.toFixed(0) : "—",
          sub: "quality score 0–100",
          color: "text-yellow-400",
        },
        {
          label: "Lost",
          value: metrics.byStatus.LOST ?? 0,
          sub: "closed as lost",
          color: "text-zinc-500",
        },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className={`text-xl font-bold tabular-nums ${item.color}`}>{item.value}</p>
          <p className="mt-0.5 text-xs font-medium text-zinc-400">{item.label}</p>
          <p className="mt-0.5 text-[10px] text-zinc-700">{item.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

interface Props {
  leads: LeadRow[];
  metrics: FunnelMetrics;
}

export function LeadsCrmClient({ leads, metrics }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
  const [sourceFilter, setSourceFilter] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawerLead, setDrawerLead] = useState<LeadForDrawer | null>(null);
  const [isBulkDeleting, startBulkDelete] = useTransition();
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) => {
      if (q && !l.name.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q) && !(l.company ?? "").toLowerCase().includes(q)) return false;
      if (statusFilter !== "ALL" && l.status !== statusFilter) return false;
      if (sourceFilter && (l.utmSource ?? "").toLowerCase() !== sourceFilter.toLowerCase()) return false;
      return true;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  const sources = useMemo(() => {
    const s = new Set(leads.map((l) => l.utmSource).filter(Boolean) as string[]);
    return Array.from(s);
  }, [leads]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((l) => l.id)));
    }
  }

  function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} lead(s)? This cannot be undone.`)) return;
    startBulkDelete(async () => {
      for (const id of selected) {
        const fd = new FormData();
        fd.set("leadId", id);
        await deleteLead(fd);
      }
      setSelected(new Set());
    });
  }

  function openDrawer(lead: LeadRow) {
    setDrawerLead(lead as LeadForDrawer);
  }

  return (
    <div className="space-y-6">
      {/* Funnel KPIs */}
      <FunnelBar metrics={metrics} />
      <ConversionBar metrics={metrics} />

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
            <input
              type="text"
              placeholder="Search name, email, company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-zinc-300 placeholder-zinc-700 focus:border-zinc-600 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-colors ${
              showFilters ? "border-zinc-600 bg-zinc-800 text-zinc-200" : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button
              onClick={bulkDelete}
              disabled={isBulkDeleting}
              className="flex items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/20 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-950/40 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete {selected.size}
            </button>
          )}
          <button
            onClick={() => downloadCSV(toCSV(filtered))}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div>
            <label className="mb-1 block text-[10px] text-zinc-600">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "ALL")}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-zinc-600 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          {sources.length > 0 && (
            <div>
              <label className="mb-1 block text-[10px] text-zinc-600">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300 focus:border-zinc-600 focus:outline-none"
              >
                <option value="">All Sources</option>
                {sources.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
          {(statusFilter !== "ALL" || sourceFilter) && (
            <button
              onClick={() => { setStatusFilter("ALL"); setSourceFilter(""); }}
              className="mt-4 flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between text-xs text-zinc-600">
        <span>
          {filtered.length === leads.length
            ? `${leads.length} lead${leads.length !== 1 ? "s" : ""}`
            : `${filtered.length} of ${leads.length} leads`}
        </span>
        {selected.size > 0 && (
          <span className="text-blue-400">{selected.size} selected</span>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 text-center">
          <p className="text-sm font-medium text-zinc-500">No leads found</p>
          <p className="mt-1 text-xs text-zinc-700">
            {search || statusFilter !== "ALL" ? "Try adjusting your search or filters." : "Leads submitted via the website will appear here."}
          </p>
          {(search || statusFilter !== "ALL") && (
            <button
              onClick={() => { setSearch(""); setStatusFilter("ALL"); }}
              className="mt-3 text-xs text-zinc-600 underline hover:text-zinc-400"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-800 bg-zinc-950/70">
              <tr className="text-zinc-600 uppercase tracking-wider">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="h-3.5 w-3.5 cursor-pointer accent-blue-500"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Company</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Score</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">Source</th>
                <th className="px-4 py-3 font-medium text-right">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className={`group cursor-pointer transition-colors hover:bg-zinc-800/40 ${selected.has(lead.id) ? "bg-blue-950/10" : ""}`}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      className="h-3.5 w-3.5 cursor-pointer accent-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3" onClick={() => openDrawer(lead)}>
                    <div className="font-medium text-zinc-200">{lead.name}</div>
                    <div className="text-zinc-600">{lead.email}</div>
                    {lead.phone && <div className="text-zinc-700">{lead.phone}</div>}
                  </td>
                  <td className="hidden px-4 py-3 text-zinc-400 sm:table-cell" onClick={() => openDrawer(lead)}>
                    {lead.company || "—"}
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <LeadStatusSelect leadId={lead.id} currentStatus={lead.status as LeadStatus} />
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell" onClick={() => openDrawer(lead)}>
                    <span className={`font-bold tabular-nums ${scoreColor(lead.score)}`}>
                      {lead.score > 0 ? lead.score : "—"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell" onClick={() => openDrawer(lead)}>
                    {lead.utmSource ? (
                      <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-400">
                        {lead.utmSource}
                        {lead.utmMedium ? ` / ${lead.utmMedium}` : ""}
                      </span>
                    ) : (
                      <span className="text-zinc-700">direct</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-600" onClick={() => openDrawer(lead)}>
                    {relativetime(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Drawer */}
      {drawerLead && (
        <LeadDrawer lead={drawerLead} onClose={() => setDrawerLead(null)} />
      )}
    </div>
  );
}
