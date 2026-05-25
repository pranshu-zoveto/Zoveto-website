/**
 * lib/analytics/types.ts
 *
 * Canonical types for the Traffic & Visitor Intelligence layer.
 * All analytics providers (GA4, PostHog, Vercel, Prisma-derived) must
 * return data shaped to these interfaces. The page component is
 * completely decoupled from any specific provider.
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

export type TrafficRange = "today" | "7d" | "30d" | "90d";

export interface DataPoint {
  date: string;  // ISO 8601 date "YYYY-MM-DD"
  value: number;
}

export interface Dimension {
  label: string;
  value: number;
  pct?: number;  // 0–100 percentage of total
}

// ─── Provider metadata ────────────────────────────────────────────────────────

export type ProviderStatus = "live" | "unavailable" | "demo";

export interface ProviderMeta {
  name: string;
  status: ProviderStatus;
  /** Human-readable note shown in the UI when status !== "live" */
  note?: string;
}

// ─── Traffic KPIs ─────────────────────────────────────────────────────────────

export interface TrafficKpis {
  sessions: number;
  uniqueUsers: number;
  pageviews: number;
  returningUsers: number;
  avgSessionDuration: number; // seconds
  bounceRate: number;         // 0–100
  engagementRate: number;     // 0–100 (inverse of bounce if not available)
}

// ─── Trend series ─────────────────────────────────────────────────────────────

export interface TrafficTrend {
  sessions: DataPoint[];
  pageviews: DataPoint[];
  leads: DataPoint[];
}

// ─── Dimension breakdowns ─────────────────────────────────────────────────────

export interface TrafficSources {
  bySource: Dimension[];    // organic, direct, referral, paid, social, email
  byMedium: Dimension[];    // cpc, organic, none, email, social, referral
  byCampaign: Dimension[];  // UTM campaign values
}

export interface DeviceBreakdown {
  byDevice: Dimension[];   // desktop, mobile, tablet
  byBrowser: Dimension[];  // Chrome, Safari, Firefox, Edge, etc.
  byOs: Dimension[];       // Windows, macOS, iOS, Android, Linux
}

export interface GeoBreakdown {
  byCountry: Dimension[];
  byCity: Dimension[];
}

// ─── Landing / exit pages ─────────────────────────────────────────────────────

export interface LandingPage {
  path: string;
  title: string;
  sessions: number;
  engagementRate: number; // 0–100
  conversions: number;
  conversionRate: number; // 0–100
}

export interface ExitPage {
  path: string;
  exits: number;
  exitRate: number; // 0–100
}

// ─── Aggregated result ────────────────────────────────────────────────────────

export interface TrafficReport {
  range: TrafficRange;
  fetchedAt: string;         // ISO 8601 timestamp
  provider: ProviderMeta;
  kpis: TrafficKpis;
  trend: TrafficTrend;
  sources: TrafficSources;
  devices: DeviceBreakdown;
  geo: GeoBreakdown;
  topLandingPages: LandingPage[];
  topExitPages: ExitPage[];
}
