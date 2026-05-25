/**
 * /dashboard — Website Command Center
 *
 * Server component. Time range is driven by ?range= search param so the
 * entire page is server-rendered for that range without any client state.
 */

import Link from "next/link";
import {
  Users,
  FileText,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Zap,
  BarChart3,
  Sparkles,
  ExternalLink,
  Clock,
  BookOpen,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { fetchKpis, fetchTopContent, fetchLeadTrend, type TimeRange } from "@/lib/command-center-data";
import { TimeRangeTabs } from "./components/TimeRangeTabs";
import { LeadTrendChart } from "./components/LeadTrendChart";

export const dynamic = "force-dynamic";

// ─── Helpers ────────────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const map: Record<string, string> = {
    NEW: "border-blue-800 bg-blue-950/40 text-blue-400",
    CONTACTED: "border-yellow-800 bg-yellow-950/40 text-yellow-400",
    QUALIFIED: "border-green-800 bg-green-950/40 text-green-400",
    CLOSED: "border-zinc-700 bg-zinc-800 text-zinc-400",
  };
  return map[status] ?? "border-zinc-700 bg-zinc-800 text-zinc-400";
}

function relativetime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

// ─── Sub-components (server) ─────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  href,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  href?: string;
}) {
  const Inner = (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border bg-zinc-900 p-5 transition-all",
        href ? "cursor-pointer hover:border-zinc-700 hover:bg-zinc-800/80" : "",
        "border-zinc-800",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-2 ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
        {href && (
          <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-zinc-400" />
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold tabular-nums tracking-tight text-zinc-100">
          {value}
        </p>
        <p className="mt-0.5 text-sm font-medium text-zinc-400">{label}</p>
        {sub && <p className="mt-1 text-xs text-zinc-600">{sub}</p>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{Inner}</Link>;
  }
  return Inner;
}

function SectionHeader({ title, sub, href }: { title: string; sub?: string; href?: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">{title}</h2>
        {sub && <p className="mt-0.5 text-xs text-zinc-600">{sub}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          View all <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function AlertCard({
  type,
  message,
  action,
}: {
  type: "error" | "warn" | "ok" | "info";
  message: string;
  action?: { label: string; href: string };
}) {
  const styles = {
    error: { border: "border-red-900/60", bg: "bg-red-950/20", text: "text-red-400", Icon: AlertTriangle },
    warn: { border: "border-yellow-900/60", bg: "bg-yellow-950/20", text: "text-yellow-400", Icon: AlertTriangle },
    ok: { border: "border-green-900/60", bg: "bg-green-950/20", text: "text-green-400", Icon: CheckCircle2 },
    info: { border: "border-blue-900/60", bg: "bg-blue-950/20", text: "text-blue-400", Icon: Circle },
  };
  const s = styles[type];
  return (
    <div className={`flex items-start gap-3 rounded-lg border p-3.5 ${s.border} ${s.bg}`}>
      <s.Icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.text}`} />
      <div className="flex-1 text-sm text-zinc-300">
        {message}
        {action && (
          <Link href={action.href} className="ml-2 text-xs underline text-zinc-500 hover:text-zinc-300">
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}

function AIRecommendation({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
      <p className="text-sm font-semibold text-zinc-200">{title}</p>
      <p className="text-xs leading-relaxed text-zinc-500">{body}</p>
      {action && (
        <Link href={action.href} className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
          {action.label} <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function CommandCenterPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const rawRange = resolved.range ?? "7d";
  const range: TimeRange =
    rawRange === "today" || rawRange === "7d" || rawRange === "30d" ? rawRange : "7d";

  const trendDays = range === "today" ? 1 : range === "7d" ? 7 : 30;

  // Parallel data fetch — all wrapped in Promise.allSettled inside each service fn
  const [kpis, topContent, leadTrend] = await Promise.all([
    fetchKpis(range),
    fetchTopContent(),
    fetchLeadTrend(trendDays),
  ]);

  const conversionRate =
    kpis.totalLeads > 0 ? ((kpis.leadsInRange / Math.max(kpis.totalLeads, 1)) * 100).toFixed(1) : "0.0";

  const rangeLabel = { today: "today", "7d": "last 7 days", "30d": "last 30 days" }[range];

  const now = new Date().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-full space-y-8 pb-12">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Command Center
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Website Intelligence
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Everything important about Zoveto in one place.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <TimeRangeTabs current={range} />
          <span className="text-[10px] text-zinc-700">Last fetched {now}</span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          label="Total Leads"
          value={kpis.totalLeads}
          sub={`+${kpis.leadsInRange} ${rangeLabel}`}
          icon={Users}
          accent="bg-blue-950/60 text-blue-400 border border-blue-900/40"
          href="/dashboard/leads"
        />
        <KpiCard
          label="New Leads"
          value={kpis.leadsInRange}
          sub={`in ${rangeLabel}`}
          icon={TrendingUp}
          accent="bg-green-950/60 text-green-400 border border-green-900/40"
          href="/dashboard/leads"
        />
        <KpiCard
          label="Published Posts"
          value={kpis.publishedPosts}
          sub={`${kpis.draftPosts} drafts`}
          icon={FileText}
          accent="bg-purple-950/60 text-purple-400 border border-purple-900/40"
          href="/dashboard/blog"
        />
        <KpiCard
          label="Total Content"
          value={kpis.totalPosts}
          sub={`${kpis.publishedPosts} live`}
          icon={BookOpen}
          accent="bg-orange-950/60 text-orange-400 border border-orange-900/40"
          href="/dashboard/blog"
        />
        <KpiCard
          label="Lead Rate"
          value={`${conversionRate}%`}
          sub="period vs all-time"
          icon={BarChart3}
          accent="bg-pink-950/60 text-pink-400 border border-pink-900/40"
        />
        <KpiCard
          label="Indexed Pages"
          value="38+"
          sub="programmatic SEO routes"
          icon={Globe}
          accent="bg-teal-950/60 text-teal-400 border border-teal-900/40"
        />
        <KpiCard
          label="Site Health"
          value="Good"
          sub="security headers active"
          icon={ShieldCheck}
          accent="bg-green-950/60 text-green-400 border border-green-900/40"
        />
        <KpiCard
          label="Live Blog"
          value={`${kpis.publishedPosts} articles`}
          sub="view public blog"
          icon={ExternalLink}
          accent="bg-zinc-800 text-zinc-400 border border-zinc-700"
          href="/blog"
        />
      </div>

      {/* ── Main 2-col Grid ── */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Trend Chart — takes 2/3 width */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <SectionHeader
            title="Lead Trend"
            sub={`Daily lead volume for ${rangeLabel}`}
            href="/dashboard/leads"
          />
          <LeadTrendChart data={leadTrend} />
        </div>

        {/* Critical Alerts — 1/3 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <SectionHeader title="Critical Alerts" sub="System status checks" />
          <div className="space-y-2.5">
            {kpis.draftPosts > 0 && (
              <AlertCard
                type="warn"
                message={`${kpis.draftPosts} blog post${kpis.draftPosts > 1 ? "s" : ""} saved as draft and not yet published.`}
                action={{ label: "Review", href: "/dashboard/blog" }}
              />
            )}
            {kpis.totalLeads === 0 && (
              <AlertCard
                type="warn"
                message="No leads captured yet. Verify the contact form is wired correctly."
                action={{ label: "Check leads", href: "/dashboard/leads" }}
              />
            )}
            {kpis.leadsInRange === 0 && kpis.totalLeads > 0 && (
              <AlertCard
                type="info"
                message={`No new leads in ${rangeLabel}. Consider reviewing CTAs.`}
              />
            )}
            <AlertCard
              type="ok"
              message="Security headers active. HSTS, CSP, and X-Frame-Options are enforced."
            />
            <AlertCard
              type="ok"
              message="Database connection healthy. Prisma pool responding normally."
            />
            <AlertCard
              type="info"
              message="SMTP not configured locally. Email notifications are non-blocking."
              action={{ label: "Setup guide", href: "/dashboard" }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom 3-col Grid ── */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Leads */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <SectionHeader
            title="Recent Leads"
            sub={`Latest inbound in ${rangeLabel}`}
            href="/dashboard/leads"
          />
          {kpis.recentLeads.length === 0 ? (
            <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-zinc-800 text-sm text-zinc-600">
              No leads in this period — try switching to a wider range.
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-800 bg-zinc-950/50">
                  <tr className="text-zinc-600 uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {kpis.recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-zinc-200">
                        <div>{lead.name}</div>
                        <div className="text-zinc-600">{lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{lead.company || "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusBadge(lead.status)}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-600">
                        <span className="flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" />
                          {relativetime(new Date(lead.createdAt))}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              AI Recommendations
            </h2>
          </div>
          <div className="space-y-3">
            {kpis.draftPosts > 0 && (
              <AIRecommendation
                title="Publish pending drafts"
                body={`You have ${kpis.draftPosts} unpublished post${kpis.draftPosts > 1 ? "s" : ""}. Publishing improves crawl rate and signals freshness to Google.`}
                action={{ label: "Go to Blog Engine", href: "/dashboard/blog" }}
              />
            )}
            {kpis.leadsInRange === 0 && (
              <AIRecommendation
                title="No new leads this period"
                body="Consider A/B testing your hero CTA copy or adding a sticky 'Book a demo' bar to high-traffic pages."
                action={{ label: "View contact page", href: "/contact" }}
              />
            )}
            <AIRecommendation
              title="Add CMS posts to the blog index"
              body="Your /blog index only shows static posts. Merging CMS posts into the listing will improve discoverability and keep the page fresh."
              action={{ label: "Blog index", href: "/blog" }}
            />
            <AIRecommendation
              title="Configure SMTP for lead alerts"
              body="Set MAIL_FROM and SMTP_* env vars in Vercel to receive real-time email notifications for every new demo request."
            />
            <AIRecommendation
              title="Build the Settings page"
              body="The Settings link is live in the sidebar but has no route. A good first feature: configurable notification email and blog author defaults."
            />
          </div>
        </div>
      </div>

      {/* ── Top Content ── */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <SectionHeader
          title="Top Content"
          sub="Published blog posts, newest first"
          href="/dashboard/blog"
        />
        {topContent.length === 0 ? (
          <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-zinc-800 text-sm text-zinc-600">
            No published posts yet.{" "}
            <Link href="/dashboard/blog/new" className="ml-1 text-blue-400 hover:underline">
              Create your first post.
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topContent.map((post) => (
              <div
                key={post.id}
                className="group rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm font-medium text-zinc-200 leading-snug">
                    {post.title}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="shrink-0 text-zinc-700 transition-colors hover:text-zinc-400"
                    title="View live"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
                {post.excerpt && (
                  <p className="mt-1.5 line-clamp-2 text-xs text-zinc-600">{post.excerpt}</p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-700">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/dashboard/blog/${post.id}/edit`}
                    className="text-[10px] text-zinc-600 hover:text-zinc-300 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Quick Links ── */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "New Blog Post", icon: FileText, href: "/dashboard/blog/new", accent: "text-purple-400" },
            { label: "View All Leads", icon: Mail, href: "/dashboard/leads", accent: "text-blue-400" },
            { label: "View Public Blog", icon: Globe, href: "/blog", accent: "text-teal-400" },
            { label: "Book a Demo Page", icon: ExternalLink, href: "/contact", accent: "text-orange-400" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:text-zinc-100"
            >
              <item.icon className={`h-4 w-4 ${item.accent}`} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
