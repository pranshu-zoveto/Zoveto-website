/**
 * lib/analytics/provider-interface.ts
 *
 * The pluggable provider contract. Any analytics backend (GA4, PostHog,
 * Vercel, Plausible, mock) must implement this interface.
 * The traffic page ONLY depends on this interface — never on a specific
 * provider implementation.
 */

import type { TrafficRange, TrafficReport } from "./types";

export interface AnalyticsProvider {
  /** Unique key used to identify the provider in logs and UI labels. */
  readonly key: string;
  /** Human-readable display name. */
  readonly name: string;
  /**
   * Returns true when the provider has the required credentials / config
   * available at runtime. Must not throw.
   */
  isAvailable(): boolean;
  /**
   * Fetch a full traffic report for the given date range.
   * Must not throw — return a graceful empty/demo report on failure.
   */
  fetchReport(range: TrafficRange): Promise<TrafficReport>;
}
