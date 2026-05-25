import { getAnalyticsDataClient } from "@/lib/integrations/google-analytics";
import type { AnalyticsProvider } from "../provider-interface";
import type { TrafficRange, TrafficReport, Dimension, LandingPage } from "../types";

function getGa4DateRange(range: TrafficRange) {
  if (range === "today") return { startDate: "today", endDate: "today" };
  if (range === "7d") return { startDate: "7daysAgo", endDate: "today" };
  if (range === "30d") return { startDate: "30daysAgo", endDate: "today" };
  return { startDate: "90daysAgo", endDate: "today" };
}

function parseDate(dateStr: string | null | undefined): string {
  if (!dateStr || dateStr.length !== 8) return dateStr || "Unknown";
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

function mapDimensions(res: any, dimIndex = 0, metricIndex = 0): Dimension[] {
  if (!res.rows) return [];
  const total = res.rows.reduce((sum: number, r: any) => sum + Number(r.metricValues?.[metricIndex]?.value || 0), 0);
  return res.rows.map((r: any) => {
    const val = Number(r.metricValues?.[metricIndex]?.value || 0);
    return {
      label: r.dimensionValues?.[dimIndex]?.value || "(not set)",
      value: val,
      pct: total > 0 ? Math.round((val / total) * 100) : 0,
    };
  });
}

export class Ga4AnalyticsProvider implements AnalyticsProvider {
  readonly key = "ga4";
  readonly name = "Google Analytics 4";

  // With OAuth, we can't synchronously check availability without a DB call.
  // We'll return true here and let the try/catch handle unauthorized states.
  isAvailable(): boolean {
    return !!process.env.GA_PROPERTY_ID;
  }

  async fetchReport(range: TrafficRange): Promise<TrafficReport> {
    if (!this.isAvailable()) {
      return emptyReport(range, this.name, "GA_PROPERTY_ID missing.");
    }

    const property = `properties/${process.env.GA_PROPERTY_ID}`;
    const dateRanges = [getGa4DateRange(range)];

    try {
      const client = await getAnalyticsDataClient();
      const [
        [kpiRes],
        [trendRes],
        [sourcesRes],
        [mediumsRes],
        [campaignsRes],
        [deviceRes],
        [landingRes],
      ] = await Promise.all([
        client.runReport({
          property,
          dateRanges,
          metrics: [
            { name: "sessions" },
            { name: "activeUsers" },
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
            { name: "bounceRate" },
            { name: "engagementRate" },
          ],
        }),
        client.runReport({
          property,
          dateRanges,
          dimensions: [{ name: "date" }],
          metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        }),
        client.runReport({
          property,
          dateRanges,
          dimensions: [{ name: "sessionSource" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 10,
        }),
        client.runReport({
          property,
          dateRanges,
          dimensions: [{ name: "sessionMedium" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 10,
        }),
        client.runReport({
          property,
          dateRanges,
          dimensions: [{ name: "sessionCampaignName" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 10,
        }),
        client.runReport({
          property,
          dateRanges,
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),
        client.runReport({
          property,
          dateRanges,
          dimensions: [{ name: "landingPagePlusQueryString" }],
          metrics: [{ name: "sessions" }, { name: "engagementRate" }, { name: "conversions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 10,
        }),
      ]);

      const kpiRow = kpiRes.rows?.[0]?.metricValues || [];
      const kpis = {
        sessions: Number(kpiRow[0]?.value || 0),
        uniqueUsers: Number(kpiRow[1]?.value || 0),
        pageviews: Number(kpiRow[2]?.value || 0),
        returningUsers: 0, // GA4 doesn't have a simple returning users metric in runReport, would require a segment
        avgSessionDuration: Number(kpiRow[3]?.value || 0),
        bounceRate: Number(kpiRow[4]?.value || 0) * 100,
        engagementRate: Number(kpiRow[5]?.value || 0) * 100,
      };

      const trend = {
        sessions: (trendRes.rows || []).map((r) => ({
          date: parseDate(r.dimensionValues?.[0]?.value),
          value: Number(r.metricValues?.[0]?.value || 0),
        })),
        pageviews: (trendRes.rows || []).map((r) => ({
          date: parseDate(r.dimensionValues?.[0]?.value),
          value: Number(r.metricValues?.[1]?.value || 0),
        })),
        leads: [], // Handled by Prisma fallback typically, but GA4 doesn't track "leads" unless mapped to conversions
      };

      const topLandingPages: LandingPage[] = (landingRes.rows || []).map((r) => ({
        path: r.dimensionValues?.[0]?.value || "/",
        title: "Landing Page", // Title requires another dimension 'pageTitle', omitting for brevity
        sessions: Number(r.metricValues?.[0]?.value || 0),
        engagementRate: Number(r.metricValues?.[1]?.value || 0) * 100,
        conversions: Number(r.metricValues?.[2]?.value || 0),
        conversionRate: 0, // Computed below if possible
      }));
      topLandingPages.forEach(p => {
        p.conversionRate = p.sessions > 0 ? (p.conversions / p.sessions) * 100 : 0;
      });

      return {
        range,
        fetchedAt: new Date().toISOString(),
        provider: { name: this.name, status: "live" },
        kpis,
        trend,
        sources: {
          bySource: mapDimensions(sourcesRes),
          byMedium: mapDimensions(mediumsRes),
          byCampaign: mapDimensions(campaignsRes),
        },
        devices: {
          byDevice: mapDimensions(deviceRes),
          byBrowser: [],
          byOs: [],
        },
        geo: { byCountry: [], byCity: [] },
        topLandingPages,
        topExitPages: [],
      };
    } catch (err: any) {
      if (err.message !== "Google Analytics integration is not connected.") {
        console.error("[GA4] fetchReport failed:", err.message);
      }
      return emptyReport(range, this.name, `API Error: ${err.message}`);
    }
  }
}

function emptyReport(range: TrafficRange, providerName: string, note: string): TrafficReport {
  return {
    range,
    fetchedAt: new Date().toISOString(),
    provider: { name: providerName, status: "unavailable", note },
    kpis: { sessions: 0, uniqueUsers: 0, pageviews: 0, returningUsers: 0, avgSessionDuration: 0, bounceRate: 0, engagementRate: 0 },
    trend: { sessions: [], pageviews: [], leads: [] },
    sources: { bySource: [], byMedium: [], byCampaign: [] },
    devices: { byDevice: [], byBrowser: [], byOs: [] },
    geo: { byCountry: [], byCity: [] },
    topLandingPages: [],
    topExitPages: [],
  };
}

export const ga4AnalyticsProvider = new Ga4AnalyticsProvider();
