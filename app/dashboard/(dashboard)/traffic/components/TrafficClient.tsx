"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { TrafficReport, TrafficRange, Dimension } from "@/lib/analytics/types";
import { Users, MousePointerClick, Clock, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

interface Props {
  report: TrafficReport;
  selectedRange: TrafficRange;
}

export function TrafficClient({ report, selectedRange }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRangeChange(r: TrafficRange) {
    startTransition(() => {
      router.push(`/dashboard/traffic?range=${r}`);
    });
  }

  const kpiItems = [
    { label: "Total Sessions", value: report.kpis.sessions, icon: Activity },
    { label: "Unique Users", value: report.kpis.uniqueUsers, icon: Users },
    { label: "Pageviews", value: report.kpis.pageviews, icon: MousePointerClick },
    { label: "Avg Session", value: `${Math.round(report.kpis.avgSessionDuration / 60)}m ${Math.round(report.kpis.avgSessionDuration % 60)}s`, icon: Clock },
    { label: "Bounce Rate", value: `${report.kpis.bounceRate.toFixed(1)}%`, icon: ArrowDownRight },
    { label: "Engagement", value: `${report.kpis.engagementRate.toFixed(1)}%`, icon: ArrowUpRight },
  ];

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1">
          {(["today", "7d", "30d", "90d"] as TrafficRange[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRangeChange(r)}
              disabled={isPending}
              className={[
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                selectedRange === r
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200",
                isPending ? "opacity-50" : "",
              ].join(" ")}
            >
              {r === "today" ? "Today" : r.toUpperCase()}
            </button>
          ))}
        </div>
        
        {report.provider.status !== "live" && (
          <div className="flex flex-col items-end">
             <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-900/50 bg-yellow-900/20 px-2.5 py-1 text-[10px] font-medium text-yellow-500">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              {report.provider.name} ({report.provider.status})
            </span>
            {report.provider.note && (
              <p className="mt-1 text-[10px] text-zinc-500">{report.provider.note}</p>
            )}
          </div>
        )}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {kpiItems.map((item) => (
          <div key={item.label} className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <item.icon className="h-4 w-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Breakdowns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sources */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Sources</h3>
          <DimensionList data={report.sources.bySource} />
        </div>
        
        {/* Mediums */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Mediums</h3>
          <DimensionList data={report.sources.byMedium} />
        </div>

        {/* Devices */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Devices</h3>
          <DimensionList data={report.devices.byDevice} />
        </div>
      </div>

      {/* Page Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Landing Pages</h3>
          <div className="space-y-4">
            {report.topLandingPages.length === 0 ? (
               <p className="text-xs text-zinc-500">No landing page data available.</p>
            ) : (
              report.topLandingPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between text-xs">
                  <div className="truncate pr-4 text-zinc-300">
                    <p className="truncate font-medium">{p.path}</p>
                    <p className="truncate text-[10px] text-zinc-500">{p.title}</p>
                  </div>
                  <div className="text-right text-zinc-400 shrink-0">
                    <p className="font-medium text-zinc-300">{p.sessions} sessions</p>
                    <p className="text-[10px]">{p.conversionRate.toFixed(1)}% cvr</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Exit Pages</h3>
          <div className="space-y-4">
            {report.topExitPages.length === 0 ? (
               <p className="text-xs text-zinc-500">No exit page data available.</p>
            ) : (
              report.topExitPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between text-xs">
                  <div className="truncate pr-4 text-zinc-300">
                    <p className="truncate font-medium">{p.path}</p>
                  </div>
                  <div className="text-right text-zinc-400 shrink-0">
                    <p className="font-medium text-zinc-300">{p.exits} exits</p>
                    <p className="text-[10px]">{p.exitRate.toFixed(1)}% exit rate</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DimensionList({ data }: { data: Dimension[] }) {
  if (data.length === 0) {
    return <p className="text-xs text-zinc-500">No data available.</p>;
  }
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="truncate pr-2 font-medium">{d.label}</span>
            <span className="shrink-0 tabular-nums">{d.value}</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${Math.max(1, d.pct ?? 0)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
