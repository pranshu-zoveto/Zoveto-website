"use client";

import type { ContentDashboardReport, ContentPerformanceMetrics } from "@/lib/content-performance-data";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Props {
  report: ContentDashboardReport;
}

export function ContentClient({ report }: Props) {
  const kpis = [
    { label: "Total Tracked Posts", value: report.totalPosts, icon: FileText, color: "text-zinc-100" },
    { label: "Leads Generated", value: report.totalLeadsFromContent, icon: Users, color: "text-blue-400" },
    { label: "Top Performer Leads", value: report.topPerforming[0]?.leadsGenerated ?? 0, icon: TrendingUp, color: "text-green-400" },
    { label: "Decaying Content", value: report.decayingContent.length, icon: Clock, color: "text-yellow-400" },
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performing Content */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="border-b border-zinc-800 p-5">
            <h3 className="text-sm font-semibold text-zinc-200">Top Performing Content</h3>
            <p className="mt-1 text-xs text-zinc-500">Posts with the highest lead generation.</p>
          </div>
          <div className="flex-1 p-5">
            <div className="space-y-4">
              {report.topPerforming.slice(0, 5).map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
              {report.topPerforming.length === 0 && (
                <p className="text-xs text-zinc-500 text-center py-4">No data yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Content Decay Warning */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="border-b border-zinc-800 p-5">
            <h3 className="text-sm font-semibold text-zinc-200">Content Decay Warning</h3>
            <p className="mt-1 text-xs text-zinc-500">Older content that may need a refresh (90-365 days old).</p>
          </div>
          <div className="flex-1 p-5">
            <div className="space-y-4">
              {report.decayingContent.slice(0, 5).map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
               {report.decayingContent.length === 0 && (
                <p className="text-xs text-zinc-500 text-center py-4">No decaying content detected.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Content List */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="border-b border-zinc-800 p-5">
           <h3 className="text-sm font-semibold text-zinc-200">All Tracked Content</h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-950/70 text-zinc-500 border-b border-zinc-800">
            <tr>
              <th className="px-4 py-3 font-medium">Post Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Age (Days)</th>
              <th className="px-4 py-3 font-medium text-right">Leads</th>
              <th className="px-4 py-3 font-medium text-right">Qualified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {report.topPerforming.map(post => (
              <tr key={post.slug} className="hover:bg-zinc-800/40">
                <td className="px-4 py-3">
                   <Link href={`/blog/${post.slug}`} className="font-medium text-blue-400 hover:underline" target="_blank">
                      {post.title}
                   </Link>
                </td>
                <td className="px-4 py-3">
                   <StatusBadge status={post.status} />
                </td>
                <td className="px-4 py-3 text-right">{post.daysSincePublished}</td>
                <td className="px-4 py-3 text-right font-medium">{post.leadsGenerated}</td>
                <td className="px-4 py-3 text-right text-green-400">{post.qualifiedLeads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PostRow({ post }: { post: ContentPerformanceMetrics }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="truncate pr-4 flex-1 text-zinc-300">
        <Link href={`/blog/${post.slug}`} className="truncate font-medium hover:underline text-blue-400" target="_blank">
          {post.title}
        </Link>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-500">
          <StatusBadge status={post.status} />
          <span>{post.daysSincePublished} days old</span>
        </div>
      </div>
      <div className="text-right shrink-0 ml-4">
        <p className="font-medium text-zinc-300">{post.leadsGenerated} Leads</p>
        <p className="text-[10px] text-green-400 mt-1">{post.qualifiedLeads} Qualified</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ContentPerformanceMetrics["status"] }) {
  const styles = {
    fresh: "bg-green-950/40 border-green-900/50 text-green-400",
    decaying: "bg-yellow-950/40 border-yellow-900/50 text-yellow-500",
    archived: "bg-zinc-800 border-zinc-700 text-zinc-400",
    draft: "bg-zinc-800 border-dashed border-zinc-600 text-zinc-500",
  };
  
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
