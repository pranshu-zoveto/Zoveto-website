import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  deriveGlobalStatus,
  isSentryCaptureConfigured,
  isSentryIssuesApiConfigured,
  isVercelInsightsLive,
} from "@/lib/health-status";
import { fetchSentryUnresolvedIssues } from "@/lib/sentry-issues";

describe("health status", () => {
  it("treats Sentry as capturing when a DSN is set, not only an auth token", () => {
    assert.equal(isSentryCaptureConfigured({}), false);
    assert.equal(isSentryCaptureConfigured({ SENTRY_AUTH_TOKEN: "sntrys_x" }), false);
    assert.equal(isSentryCaptureConfigured({ NEXT_PUBLIC_SENTRY_DSN: "https://x@o.ingest.sentry.io/1" }), true);
    assert.equal(isSentryCaptureConfigured({ SENTRY_DSN: "https://x@o.ingest.sentry.io/1" }), true);
  });

  it("requires token, org, and project to list Sentry issues in the dashboard", () => {
    assert.equal(isSentryIssuesApiConfigured({ SENTRY_AUTH_TOKEN: "t" }), false);
    assert.equal(
      isSentryIssuesApiConfigured({
        SENTRY_AUTH_TOKEN: "t",
        SENTRY_ORG: "zoveto",
        SENTRY_PROJECT: "zoveto-website",
      }),
      true,
    );
  });

  it("treats Vercel Speed Insights as live from Vercel runtime env, not VERCEL_ACCESS_TOKEN", () => {
    assert.equal(isVercelInsightsLive({}), false);
    assert.equal(isVercelInsightsLive({ VERCEL_ACCESS_TOKEN: "tok" }), false);
    assert.equal(isVercelInsightsLive({ VERCEL: "1" }), true);
    assert.equal(isVercelInsightsLive({ VERCEL_ENV: "production" }), true);
  });

  it("does not mark the site degraded for a 1–2s Neon ping", () => {
    assert.equal(deriveGlobalStatus({ dbHealthy: true, totalErrors: 0, dbPingMs: 1737 }), "healthy");
    assert.equal(deriveGlobalStatus({ dbHealthy: true, totalErrors: 51, dbPingMs: 80 }), "degraded");
    assert.equal(deriveGlobalStatus({ dbHealthy: false, totalErrors: 0, dbPingMs: 0 }), "critical");
    assert.equal(deriveGlobalStatus({ dbHealthy: true, totalErrors: 0, dbPingMs: 6000 }), "degraded");
  });
});

describe("sentry issues fetch", () => {
  it("returns an empty list when the issues API is not configured", async () => {
    const rows = await fetchSentryUnresolvedIssues({});
    assert.deepEqual(rows, []);
  });

  it("maps Sentry issue payloads", async () => {
    const env = {
      SENTRY_AUTH_TOKEN: "t",
      SENTRY_ORG: "zoveto",
      SENTRY_PROJECT: "site",
    };
    const rows = await fetchSentryUnresolvedIssues(env, async () =>
      new Response(
        JSON.stringify([
          { id: "1", title: "TypeError: x is undefined", count: "4", lastSeen: "2026-09-05T08:00:00.000Z" },
        ]),
        { status: 200 },
      ),
    );
    assert.equal(rows.length, 1);
    assert.equal(rows[0]?.message, "TypeError: x is undefined");
    assert.equal(rows[0]?.count, 4);
  });
});
