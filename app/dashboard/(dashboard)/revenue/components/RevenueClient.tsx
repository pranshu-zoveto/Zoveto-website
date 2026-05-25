"use client";

import type { RevenueReport } from "../types";
import { DollarSign, BarChart3, TrendingUp, Target, Filter } from "lucide-react";

export function RevenueClient({ report }: { report: RevenueReport }) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const kpis = [
    { label: "Closed/Won Revenue (30d)", value: formatCurrency(report.metrics.monthlyRevenue), icon: DollarSign, color: "text-green-400" },
    { label: "Pipeline Value (Open)", value: formatCurrency(report.metrics.pipelineValue), icon: TrendingUp, color: "text-blue-400" },
    { label: "Avg Deal Size", value: formatCurrency(report.metrics.avgDealSize), icon: BarChart3, color: "text-purple-400" },
    { label: "Lead to Close Rate", value: `${report.metrics.leadToCloseRate.toFixed(1)}%`, icon: Target, color: "text-zinc-100" },
  ];

  const maxRevenue = Math.max(1, ...report.trend.map(t => t.revenue));
  
  // Calculate funnel percentages based on top of funnel (visitors)
  const funnelSteps = [
    { label: "Visitors", value: report.funnel.visitors },
    { label: "Leads", value: report.funnel.leads },
    { label: "Deals", value: report.funnel.deals },
    { label: "Wins", value: report.funnel.wins },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <item.icon className="h-4 w-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
            <p className={`mt-2 text-2xl font-bold tabular-nums ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Trend */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Revenue Trend (30 Days)</h3>
          <div className="flex h-48 items-end gap-1">
            {report.trend.length === 0 && (
               <div className="flex w-full h-full items-center justify-center text-xs text-zinc-500">No trend data.</div>
            )}
            {report.trend.map((day) => {
              const heightPct = Math.max(1, (day.revenue / maxRevenue) * 100);
              return (
                <div key={day.date} className="relative flex flex-1 flex-col justify-end group">
                  <div 
                    className="w-full rounded-t-sm bg-green-500/80 transition-all group-hover:bg-green-400"
                    style={{ height: `${heightPct}%`, minHeight: '4px' }}
                  />
                  <div className="absolute bottom-full mb-2 hidden w-auto whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-200 group-hover:block z-10 left-1/2 -translate-x-1/2">
                    {day.date}: {formatCurrency(day.revenue)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Conversion Funnel</h3>
          <div className="space-y-4">
             {funnelSteps.map((step, idx) => {
               const percentage = report.funnel.visitors > 0 ? (step.value / report.funnel.visitors) * 100 : 0;
               return (
                 <div key={step.label}>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-zinc-300 font-medium">{step.label}</span>
                     <span className="tabular-nums text-zinc-400">{step.value} ({percentage.toFixed(1)}%)</span>
                   </div>
                   <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                     <div 
                       className="h-full bg-blue-500 rounded-full transition-all" 
                       style={{ width: `${percentage}%` }}
                     />
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Revenue Sources */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Revenue by Source</h3>
          <div className="space-y-4">
            {report.bySource.slice(0, 5).map((s) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <div className="text-zinc-300 font-medium">{s.label}</div>
                <div className="text-green-400 tabular-nums">{formatCurrency(s.revenue)}</div>
              </div>
            ))}
            {report.bySource.length === 0 && (
              <p className="text-xs text-zinc-500 text-center">No revenue source data.</p>
            )}
          </div>
        </div>

        {/* Top Revenue Pages */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Revenue by Landing Page</h3>
          <div className="space-y-4">
            {report.byPage.slice(0, 5).map((p) => (
              <div key={p.label} className="flex items-center justify-between text-xs">
                <div className="text-zinc-300 truncate pr-4 font-medium" title={p.label}>{p.label}</div>
                <div className="text-green-400 tabular-nums shrink-0">{formatCurrency(p.revenue)}</div>
              </div>
            ))}
            {report.byPage.length === 0 && (
              <p className="text-xs text-zinc-500 text-center">No revenue page data.</p>
            )}
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="border-b border-zinc-800 p-5 flex items-center justify-between">
           <h3 className="text-sm font-semibold text-zinc-200">Recent Deals & Opportunities</h3>
           <button className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-md transition-colors">
             + New Deal
           </button>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-950/70 text-zinc-500 border-b border-zinc-800">
            <tr>
              <th className="px-4 py-3 font-medium">Deal Name</th>
              <th className="px-4 py-3 font-medium">Lead/Contact</th>
              <th className="px-4 py-3 font-medium text-right">Value</th>
              <th className="px-4 py-3 font-medium text-right">Status</th>
              <th className="px-4 py-3 font-medium text-right">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {report.recentDeals.map(deal => (
              <tr key={deal.id} className="hover:bg-zinc-800/40">
                <td className="px-4 py-3 font-medium text-zinc-200">{deal.name}</td>
                <td className="px-4 py-3 text-zinc-400">{deal.leadName || "—"}</td>
                <td className="px-4 py-3 text-right tabular-nums text-green-400">{formatCurrency(deal.value)}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold 
                    ${deal.status === 'WON' ? 'bg-green-950/40 border-green-900/50 text-green-400' : ''}
                    ${deal.status === 'OPEN' ? 'bg-blue-950/40 border-blue-900/50 text-blue-400' : ''}
                    ${deal.status === 'LOST' ? 'bg-red-950/40 border-red-900/50 text-red-400' : ''}
                  `}>
                    {deal.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-zinc-500 tabular-nums" suppressHydrationWarning>
                  {new Date(deal.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {report.recentDeals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No deals found. Create one manually or qualify a lead.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
