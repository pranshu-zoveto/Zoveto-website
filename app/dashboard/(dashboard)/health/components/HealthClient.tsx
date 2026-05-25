"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { HealthReport } from "@/lib/health-data";
import { 
  Activity, 
  Server, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Link2Off,
  Zap,
  Globe
} from "lucide-react";

export function HealthClient({ initialReport }: { initialReport: HealthReport }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const statusColors = {
    healthy: "text-green-400 bg-green-400/10 border-green-400/20",
    degraded: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    critical: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  const maxResponseTime = Math.max(1, ...initialReport.trend.map(t => t.responseTime));
  const maxErrors = Math.max(1, ...initialReport.trend.map(t => t.errors));

  return (
    <div className="space-y-6">
      {/* Top Header: Global Status & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1 font-semibold uppercase tracking-wider text-xs ${statusColors[initialReport.globalStatus]}`}>
            {initialReport.globalStatus === "healthy" && <CheckCircle2 className="h-4 w-4" />}
            {initialReport.globalStatus === "degraded" && <AlertTriangle className="h-4 w-4" />}
            {initialReport.globalStatus === "critical" && <XCircle className="h-4 w-4" />}
            <span>{initialReport.globalStatus}</span>
          </div>
          <span className="text-xs text-zinc-500" suppressHydrationWarning>
            Last checked: {new Date(initialReport.fetchedAt).toLocaleTimeString()}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
          {isPending ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Uptime */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Server className="h-4 w-4" />
            <span className="text-xs font-medium">Local Uptime</span>
          </div>
          <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-100">
            {initialReport.uptime.percentage.toFixed(2)}%
          </p>
          <p className="text-[10px] text-zinc-500 mt-1">Status: {initialReport.uptime.status}</p>
        </div>

        {/* Avg Response Time */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Avg Response Time</span>
          </div>
          <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-100">
            {initialReport.uptime.responseTimeMs}ms
          </p>
        </div>

        {/* Error Rate */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-medium">Error Rate (24h)</span>
          </div>
          <p className={`mt-2 text-2xl font-bold tabular-nums ${initialReport.errors.rate > 5 ? "text-red-400" : "text-zinc-100"}`}>
            {initialReport.errors.rate}%
          </p>
          <p className="text-[10px] text-zinc-500 mt-1">
            {initialReport.errors.failedApis} API / {initialReport.errors.failedForms} Forms
          </p>
        </div>

        {/* Web Vitals */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium">Web Vitals</span>
            </div>
          </div>
          {initialReport.webVitals.status === "unconfigured" ? (
            <p className="mt-2 text-sm font-semibold text-zinc-500">Vercel Insights Unconfigured</p>
          ) : (
            <>
              <p className="mt-2 text-2xl font-bold tabular-nums text-green-400 capitalize">
                {initialReport.webVitals.status.replace("_", " ")}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                LCP: {initialReport.webVitals.lcpMs}ms
              </p>
            </>
          )}
        </div>
      </div>

      {/* Trend Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Response Time Trend (ms)</h3>
          <div className="flex h-32 items-end gap-1">
            {initialReport.trend.map((t) => {
              const height = Math.max(1, (t.responseTime / maxResponseTime) * 100);
              return (
                <div key={t.date} className="relative flex flex-1 flex-col justify-end group">
                  <div className="w-full rounded-t-sm bg-blue-500/80 transition-all group-hover:bg-blue-400" style={{ height: `${height}%`, minHeight: '4px' }} />
                  <div className="absolute bottom-full mb-2 hidden w-auto whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-200 group-hover:block z-10 left-1/2 -translate-x-1/2">
                    {t.date}: {t.responseTime}ms
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Error Trend</h3>
          <div className="flex h-32 items-end gap-1">
            {initialReport.trend.map((t) => {
              const height = Math.max(1, (t.errors / maxErrors) * 100);
              return (
                <div key={t.date} className="relative flex flex-1 flex-col justify-end group">
                  <div className="w-full rounded-t-sm bg-red-500/80 transition-all group-hover:bg-red-400" style={{ height: `${height}%`, minHeight: '4px' }} />
                  <div className="absolute bottom-full mb-2 hidden w-auto whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-200 group-hover:block z-10 left-1/2 -translate-x-1/2">
                    {t.date}: {t.errors} errors
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Incidents */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="border-b border-zinc-800 p-5">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Active Incidents
            </h3>
          </div>
          <div className="p-5 flex-1 overflow-y-auto max-h-64 space-y-3">
            {initialReport.incidents.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center">No active incidents.</p>
            ) : (
              initialReport.incidents.map(inc => (
                <div key={inc.id} className="rounded border border-red-900/30 bg-red-950/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-400">{inc.id}</span>
                    <span className="text-[10px] text-zinc-500" suppressHydrationWarning>{new Date(inc.time).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1">{inc.title}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Broken Routes */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="border-b border-zinc-800 p-5">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Link2Off className="h-4 w-4" /> Broken Routes (404s)
            </h3>
          </div>
          <div className="p-0 flex-1 overflow-y-auto max-h-64">
             {initialReport.brokenRoutes.length === 0 ? (
               <div className="p-5 text-xs text-zinc-500 text-center">No broken routes detected in the last 24h.</div>
             ) : (
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {initialReport.brokenRoutes.map(br => (
                      <tr key={br.path} className="hover:bg-zinc-800/40">
                        <td className="px-4 py-3 truncate max-w-[150px] font-mono text-zinc-400" title={br.path}>
                          {br.path}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{br.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             )}
          </div>
        </div>

        {/* Sentry JS Errors */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="border-b border-zinc-800 p-5">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Globe className="h-4 w-4" /> Runtime Errors
            </h3>
          </div>
          <div className="p-0 flex-1 overflow-y-auto max-h-64">
             {initialReport.sentryStatus === "unconfigured" ? (
               <div className="p-5 text-xs text-zinc-500 text-center">
                 Sentry Integration Unconfigured.<br/>Add SENTRY_AUTH_TOKEN to .env
               </div>
             ) : (
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {initialReport.runtimeErrors.map(err => (
                      <tr key={err.id} className="hover:bg-zinc-800/40">
                        <td className="px-4 py-3 truncate max-w-[150px] text-red-300" title={err.message}>
                          {err.message}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{err.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
