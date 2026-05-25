"use client";

import { useState } from "react";
import type { SeoAuditReport, SeoIssue, PageRecord } from "@/lib/seo-audit-data";
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Info,
  Search,
  FileText,
  Activity,
  Globe
} from "lucide-react";

interface Props {
  report: SeoAuditReport;
}

export function SeoClient({ report }: Props) {
  const [tab, setTab] = useState<"overview" | "performance" | "pages" | "issues">("overview");

  return (
    <div className="space-y-6">
      {/* Search Console Notice */}
      {report.gscNote && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-900/50 bg-yellow-950/20 p-4 text-yellow-500">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-xs">{report.gscNote}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-px">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "performance", label: "Search Performance", icon: Search },
          { id: "pages", label: "Pages & Metadata", icon: FileText },
          { id: "issues", label: `Issues (${report.summary.totalIssues})`, icon: AlertCircle },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={[
              "flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200",
            ].join(" ")}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab report={report} />}
      {tab === "performance" && <PerformanceTab perf={report.searchPerformance} />}
      {tab === "pages" && <PagesTab pages={report.pages} />}
      {tab === "issues" && <IssuesTab issues={report.issues} />}
    </div>
  );
}

function PerformanceTab({ perf }: { perf: any }) {
  if (!perf.connected) {
    return (
      <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800">
        <Globe className="mb-2 h-6 w-6 text-zinc-600" />
        <p className="text-sm font-medium text-zinc-300">Not Connected</p>
        <p className="text-xs text-zinc-500">Connect your Google account in Settings to see live search data.</p>
      </div>
    );
  }

  if (perf.clicks === 0 && perf.impressions === 0 && perf.topQueries.length === 0) {
     return (
      <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800">
        <Search className="mb-2 h-6 w-6 text-zinc-600" />
        <p className="text-sm font-medium text-zinc-300">No Data Yet</p>
        <p className="text-xs text-zinc-500">Google Search Console is connected, but there is no search traffic data for the last 30 days.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-2xl font-bold tabular-nums text-zinc-100">{perf.clicks.toLocaleString()}</p>
          <p className="mt-1 text-xs text-zinc-400">Total Clicks (30d)</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-2xl font-bold tabular-nums text-blue-400">{perf.impressions.toLocaleString()}</p>
          <p className="mt-1 text-xs text-zinc-400">Total Impressions</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-2xl font-bold tabular-nums text-green-400">{perf.ctr.toFixed(1)}%</p>
          <p className="mt-1 text-xs text-zinc-400">Average CTR</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-2xl font-bold tabular-nums text-purple-400">{perf.avgPosition.toFixed(1)}</p>
          <p className="mt-1 text-xs text-zinc-400">Average Position</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Search Queries</h3>
          <div className="space-y-3">
             {perf.topQueries.slice(0, 5).map((q: any, i: number) => (
                <div key={i} className="flex justify-between border-b border-zinc-800/50 pb-2 text-xs">
                  <span className="text-zinc-300 font-medium">{q.query}</span>
                  <div className="flex gap-4 text-zinc-500">
                    <span title="Clicks">{q.clicks} clicks</span>
                    <span title="Impressions">{q.impressions} imp.</span>
                  </div>
                </div>
             ))}
             {perf.topQueries.length === 0 && <p className="text-xs text-zinc-500">No query data available.</p>}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Top Pages by Traffic</h3>
          <div className="space-y-3">
             {perf.topPages.slice(0, 5).map((p: any, i: number) => (
                <div key={i} className="flex justify-between border-b border-zinc-800/50 pb-2 text-xs">
                  <span className="text-blue-400 truncate max-w-[150px] sm:max-w-[200px]" title={p.path}>{p.path}</span>
                  <div className="flex gap-4 text-zinc-500">
                    <span title="Clicks">{p.clicks} clicks</span>
                    <span title="Position">Pos: {p.position.toFixed(1)}</span>
                  </div>
                </div>
             ))}
             {perf.topPages.length === 0 && <p className="text-xs text-zinc-500">No page data available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ report }: { report: SeoAuditReport }) {
  const kpis = [
    { label: "Total Pages", value: report.summary.totalPages, color: "text-zinc-100" },
    { label: "Indexable (App Intent)", value: report.summary.indexedPages, color: "text-blue-400" },
    { label: "Noindex", value: report.summary.noindexPages, color: "text-yellow-400" },
    { label: "Errors", value: report.summary.errorCount, color: "text-red-400" },
    { label: "Warnings", value: report.summary.warnCount, color: "text-yellow-500" },
    { label: "Sitemap URLs", value: report.technical.sitemapUrlCount, color: "text-green-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className={`text-2xl font-bold tabular-nums ${item.color}`}>{item.value}</p>
            <p className="mt-1 text-xs text-zinc-400">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Technical Health */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Technical Health</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Sitemap.xml</span>
              <span className="text-zinc-300 capitalize">{report.technical.sitemapFreshness}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Robots.txt</span>
              <span className="text-zinc-300 capitalize">{report.technical.robotsTxtStatus}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Canonical Coverage</span>
              <span className="text-zinc-300 capitalize">{report.technical.canonicalCoverage}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Excluded Paths</span>
              <span className="text-zinc-300">{report.technical.excludedPathCount}</span>
            </div>
          </div>
        </div>

        {/* Content Coverage */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-200">Content Coverage</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">SEO Landing Pages</span>
              <span className="text-zinc-300">{report.summary.seoLandingCount}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Static Blog Posts</span>
              <span className="text-zinc-300">{report.summary.blogPostCount}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">CMS Blog Posts</span>
              <span className="text-zinc-300">{report.summary.cmsPostCount}</span>
            </div>
             <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Missing Title Tag</span>
              <span className={report.summary.pagesWithoutTitle > 0 ? "text-red-400 font-bold" : "text-zinc-300"}>
                {report.summary.pagesWithoutTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PagesTab({ pages }: { pages: PageRecord[] }) {
  const [search, setSearch] = useState("");
  
  const filtered = pages.filter(p => p.path.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input 
          type="text" 
          placeholder="Search path or title..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-zinc-300 focus:border-zinc-600 focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-800 bg-zinc-950/70 text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Path / Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Metadata</th>
              <th className="px-4 py-3 font-medium text-right">Issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/20">
            {filtered.map(p => (
              <tr key={p.path} className="hover:bg-zinc-800/40">
                <td className="px-4 py-3">
                  <div className="font-medium text-blue-400 hover:underline">
                    <a href={p.path} target="_blank" rel="noreferrer">{p.path}</a>
                  </div>
                  <div className="mt-0.5 text-zinc-400 truncate max-w-[300px]" title={p.title}>{p.title || <span className="italic text-red-500">Missing Title</span>}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    p.indexStatus === "indexed" ? "bg-green-950/40 text-green-400" : "bg-yellow-950/40 text-yellow-500"
                  }`}>
                    {p.indexStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-[10px] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-8 text-zinc-500">Desc:</span>
                    {p.hasMetaDescription ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  {p.issueCount > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-950/30 px-2 py-0.5 text-[10px] font-medium text-red-400">
                      {p.issueCount} issue{p.issueCount !== 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">No pages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IssuesTab({ issues }: { issues: SeoIssue[] }) {
  if (issues.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800">
        <CheckCircle2 className="mb-2 h-6 w-6 text-green-500" />
        <p className="text-sm font-medium text-zinc-300">Looking good!</p>
        <p className="text-xs text-zinc-500">No SEO issues detected.</p>
      </div>
    );
  }

  const icons = {
    error: <XCircle className="mt-0.5 h-4 w-4 text-red-500" />,
    warn: <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-500" />,
    info: <Info className="mt-0.5 h-4 w-4 text-blue-400" />,
    ok: <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />,
  };

  const borderColors = {
    error: "border-red-900/30",
    warn: "border-yellow-900/30",
    info: "border-blue-900/30",
    ok: "border-green-900/30",
  };

  return (
    <div className="space-y-4">
      {issues.map(issue => (
        <div key={issue.id} className={`rounded-xl border bg-zinc-900/50 p-4 ${borderColors[issue.severity]}`}>
          <div className="flex items-start gap-3">
            {icons[issue.severity]}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-zinc-200">{issue.title}</h4>
                {issue.count !== undefined && (
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                    {issue.count}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-400">{issue.description}</p>
              
              {issue.affectedPaths && issue.affectedPaths.length > 0 && (
                <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/50 p-2 text-xs">
                  <p className="mb-1 text-[10px] font-semibold text-zinc-500">AFFECTED URLS</p>
                  <ul className="max-h-32 overflow-y-auto space-y-1 text-zinc-300">
                    {issue.affectedPaths.map((path, idx) => (
                      <li key={idx} className="truncate">{path}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
