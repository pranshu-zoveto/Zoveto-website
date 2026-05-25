/**
 * lib/analytics/providers/prisma-provider.ts
 *
 * Prisma-derived analytics provider.
 *
 * Derives traffic proxies from the Lead table in the Postgres database.
 * Leads carry UTM metadata in the `intent` field (stored as
 * "utm_source: X\nutm_medium: Y\nutm_campaign: Z" lines by lib/api.ts).
 *
 * This provider is ALWAYS available as long as the database is reachable.
 * It forms the reliable floor of data; GA4/PostHog layers add richer
 * session data when they become available.
 */

import type { AnalyticsProvider } from "../provider-interface";
import type {
  TrafficRange,
  TrafficReport,
  DataPoint,
  Dimension,
  LandingPage,
} from "../types";
import prisma from "@/lib/db";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRangeDays(range: TrafficRange): number {
  if (range === "today") return 1;
  if (range === "7d") return 7;
  if (range === "30d") return 30;
  return 90;
}

function getStartDate(range: TrafficRange): Date {
  const days = getRangeDays(range);
  const d = new Date();
  if (range === "today") {
    d.setHours(0, 0, 0, 0);
    return d;
  }
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Build a date-bucketed series with zeroes filled in. */
function buildDailyBuckets(range: TrafficRange): Record<string, number> {
  const days = getRangeDays(range);
  const buckets: Record<string, number> = {};
  for (let i = 0; i < Math.max(days, 1); i++) {
    const d = new Date();
    d.setDate(d.getDate() - (Math.max(days, 1) - 1 - i));
    buckets[d.toISOString().slice(0, 10)] = 0;
  }
  return buckets;
}

function toDimensionArray(map: Record<string, number>): Dimension[] {
  const total = Object.values(map).reduce((a, b) => a + b, 0);
  return Object.entries(map)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({
      label: label || "Unknown",
      value,
      pct: total > 0 ? Math.round((value / total) * 100) : 0,
    }));
}

/** Parse UTM or referrer fields from the stored intent text. */
function extractUtmField(intent: string | null, field: string): string {
  if (!intent) return "";
  const regex = new RegExp(`${field}[:\\s]+([^\\n]+)`, "i");
  const match = intent.match(regex);
  return match?.[1]?.trim() ?? "";
}

function inferSource(intent: string | null): string {
  const source = extractUtmField(intent, "utm_source");
  if (source) return source;
  const medium = extractUtmField(intent, "utm_medium");
  if (medium === "organic") return "google";
  if (medium === "email") return "email";
  return "direct";
}

function inferMedium(intent: string | null): string {
  const medium = extractUtmField(intent, "utm_medium");
  if (medium) return medium;
  return "none";
}

function inferCampaign(intent: string | null): string {
  const campaign = extractUtmField(intent, "utm_campaign");
  return campaign || "(not set)";
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export class PrismaAnalyticsProvider implements AnalyticsProvider {
  readonly key = "prisma";
  readonly name = "Database (Lead-derived)";

  isAvailable(): boolean {
    // Prisma is always available when DB is configured
    return !!process.env.POSTGRES_PRISMA_URL || !!process.env.DATABASE_URL;
  }

  async fetchReport(range: TrafficRange): Promise<TrafficReport> {
    const since = getStartDate(range);
    const days = getRangeDays(range);

    try {
      const leads = await prisma.lead.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true, intent: true },
        orderBy: { createdAt: "asc" },
      });

      const totalLeads = leads.length;
      const allLeads = await prisma.lead.count();

      // ── Trend buckets ────────────────────────────────────────────────────
      const leadBuckets = buildDailyBuckets(range);
      for (const lead of leads) {
        const key = lead.createdAt.toISOString().slice(0, 10);
        if (key in leadBuckets) leadBuckets[key]++;
      }
      const leadTrend: DataPoint[] = Object.entries(leadBuckets).map(
        ([date, value]) => ({ date, value })
      );

      // ── Source / medium / campaign breakdowns ────────────────────────────
      const sourceMap: Record<string, number> = {};
      const mediumMap: Record<string, number> = {};
      const campaignMap: Record<string, number> = {};

      for (const lead of leads) {
        const src = inferSource(lead.intent);
        const med = inferMedium(lead.intent);
        const camp = inferCampaign(lead.intent);
        sourceMap[src] = (sourceMap[src] ?? 0) + 1;
        mediumMap[med] = (mediumMap[med] ?? 0) + 1;
        campaignMap[camp] = (campaignMap[camp] ?? 0) + 1;
      }

      // Add fallback so there's always something to show
      if (Object.keys(sourceMap).length === 0) {
        sourceMap["direct"] = 0;
        mediumMap["none"] = 0;
        campaignMap["(not set)"] = 0;
      }

      // ── Landing pages (derive from published blog posts as proxy) ─────────
      const publishedPosts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, title: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      });

      const topLandingPages: LandingPage[] = [
        { path: "/", title: "Homepage", sessions: 0, engagementRate: 0, conversions: totalLeads, conversionRate: 0 },
        { path: "/contact", title: "Contact & Book a Demo", sessions: 0, engagementRate: 0, conversions: totalLeads, conversionRate: 0 },
        { path: "/pricing", title: "Pricing", sessions: 0, engagementRate: 0, conversions: 0, conversionRate: 0 },
        ...publishedPosts.slice(0, 7).map((p) => ({
          path: `/blog/${p.slug}`,
          title: p.title,
          sessions: 0,
          engagementRate: 0,
          conversions: 0,
          conversionRate: 0,
        })),
      ];

      return {
        range,
        fetchedAt: new Date().toISOString(),
        provider: {
          name: this.name,
          status: "live",
          note: "Data derived from the Lead capture table. Session counts require a GA4/PostHog connection.",
        },
        kpis: {
          sessions: 0,          // Requires external analytics
          uniqueUsers: 0,       // Requires external analytics
          pageviews: 0,         // Requires external analytics
          returningUsers: 0,    // Requires external analytics
          avgSessionDuration: 0,
          bounceRate: 0,
          engagementRate: 0,
        },
        trend: {
          sessions: leadTrend.map((d) => ({ date: d.date, value: 0 })),
          pageviews: leadTrend.map((d) => ({ date: d.date, value: 0 })),
          leads: leadTrend,
        },
        sources: {
          bySource: toDimensionArray(sourceMap),
          byMedium: toDimensionArray(mediumMap),
          byCampaign: toDimensionArray(campaignMap),
        },
        devices: {
          byDevice: [],
          byBrowser: [],
          byOs: [],
        },
        geo: {
          byCountry: [],
          byCity: [],
        },
        topLandingPages,
        topExitPages: [],
        _meta: { totalLeads, allLeads, days },
      } as TrafficReport & { _meta: unknown };
    } catch (err) {
      console.error("[PrismaAnalyticsProvider] fetchReport failed:", err);
      return emptyReport(range, this.name);
    }
  }
}

function emptyReport(range: TrafficRange, providerName: string): TrafficReport {
  return {
    range,
    fetchedAt: new Date().toISOString(),
    provider: { name: providerName, status: "unavailable", note: "Database unreachable." },
    kpis: { sessions: 0, uniqueUsers: 0, pageviews: 0, returningUsers: 0, avgSessionDuration: 0, bounceRate: 0, engagementRate: 0 },
    trend: { sessions: [], pageviews: [], leads: [] },
    sources: { bySource: [], byMedium: [], byCampaign: [] },
    devices: { byDevice: [], byBrowser: [], byOs: [] },
    geo: { byCountry: [], byCity: [] },
    topLandingPages: [],
    topExitPages: [],
  };
}

export const prismaAnalyticsProvider = new PrismaAnalyticsProvider();
