"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GoalReport, GoalRange, DimensionMetric } from "../types";
import { Target, Users, MousePointerClick, Filter } from "lucide-react";

interface Props {
  report: GoalReport;
}

export function GoalsClient({ report }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRangeChange(r: GoalRange) {
    startTransition(() => {
      router.push(`/dashboard/goals?range=${r}`);
    });
  }

  const kpis = [
    { label: "Total Goal Events", value: report.totalEvents, icon: Target, color: "text-blue-400" },
    { label: "Unique Converters", value: report.totalUniqueVisitors, icon: Users, color: "text-green-400" },
  ];

  // A simple max value for scaling CSS bars
  const maxEvents = Math.max(1, ...report.trend.flatMap(t => Object.values(t.events).reduce((sum, v) => sum + v, 0)));
  const maxPageValue = Math.max(1, ...report.byPage.map(p => p.value));

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1">
          {(["today", "7d", "30d", "90d"] as GoalRange[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRangeChange(r)}
              disabled={isPending}
              className={[
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                report.range === r
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200",
                isPending ? "opacity-50" : "",
              ].join(" ")}
            >
              {r === "today" ? "Today" : r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

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

      {/* Trend Chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">Goal Trend</h3>
        <div className="flex h-48 items-end gap-1">
          {report.trend.length === 0 && (
            <div className="flex w-full h-full items-center justify-center text-xs text-zinc-500">No trend data.</div>
          )}
          {report.trend.map((day) => {
            const totalForDay = Object.values(day.events).reduce((sum, v) => sum + v, 0);
            const heightPct = Math.max(1, (totalForDay / maxEvents) * 100);
            return (
              <div key={day.date} className="relative flex flex-1 flex-col justify-end group">
                <div 
                  className="w-full rounded-t-sm bg-blue-500/80 transition-all group-hover:bg-blue-400"
                  style={{ height: `${heightPct}%`, minHeight: '4px' }}
                />
                <div className="absolute bottom-full mb-2 hidden w-auto whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-200 group-hover:block z-10 left-1/2 -translate-x-1/2">
                  {day.date}: {totalForDay} events
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Breakdowns Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Goals List */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Performance by Goal</h3>
          <div className="space-y-4">
            {report.goals.map((g) => (
              <div key={g.name} className="flex items-center justify-between text-xs">
                <div className="text-zinc-300 font-medium capitalize">
                  {g.name.replace(/_/g, " ")}
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-zinc-200">{g.total} total</div>
                  <div className="text-[10px] text-zinc-500">{g.unique} unique</div>
                </div>
              </div>
            ))}
            {report.goals.length === 0 && (
              <p className="text-xs text-zinc-500 text-center">No goals recorded in this period.</p>
            )}
          </div>
        </div>

        {/* Source List */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Sources</h3>
          <div className="space-y-4">
            {report.bySource.slice(0, 10).map((s) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <div className="text-zinc-300">{s.label}</div>
                <div className="text-zinc-400 tabular-nums">{s.value}</div>
              </div>
            ))}
            {report.bySource.length === 0 && (
              <p className="text-xs text-zinc-500 text-center">No source data.</p>
            )}
          </div>
        </div>
      </div>

      {/* Pages Performance */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">Goal Performance by Page</h3>
        <div className="space-y-4">
          {report.byPage.slice(0, 15).map((p) => (
            <div key={p.label}>
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="truncate pr-2 font-medium">{p.label}</span>
                <span className="shrink-0 tabular-nums">{p.value} events</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${Math.max(1, (p.value / maxPageValue) * 100)}%` }}
                />
              </div>
            </div>
          ))}
          {report.byPage.length === 0 && (
            <p className="text-xs text-zinc-500 text-center">No page data.</p>
          )}
        </div>
      </div>

    </div>
  );
}
