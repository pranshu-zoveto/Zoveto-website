/**
 * lib/health-data.ts
 *
 * Site health for /dashboard/health.
 * Sentry capture is DSN-based. Issue listing needs SENTRY_AUTH_TOKEN + org + project.
 * Vercel Speed Insights is live on Vercel automatically (no VERCEL_ACCESS_TOKEN).
 */

import prisma from "@/lib/db";
import {
  deriveGlobalStatus,
  isSentryCaptureConfigured,
  isSentryIssuesApiConfigured,
  isVercelInsightsLive,
  type HealthGlobalStatus,
} from "@/lib/health-status";
import { fetchSentryUnresolvedIssues } from "@/lib/sentry-issues";

export interface HealthReport {
  fetchedAt: string;
  globalStatus: HealthGlobalStatus;
  uptime: {
    status: "up" | "down";
    percentage: number;
    responseTimeMs: number;
  };
  errors: {
    rate: number;
    failedApis: number;
    failedForms: number;
  };
  webVitals: {
    status: "good" | "needs_improvement" | "poor" | "collecting" | "unconfigured";
    lcpMs: number | null;
    cls: number | null;
  };
  sentryStatus: "unconfigured" | "capturing" | "live";
  vercelStatus: "unconfigured" | "live";
  incidents: { id: string; title: string; status: string; time: string }[];
  brokenRoutes: { path: string; count: number; lastSeen: string }[];
  runtimeErrors: { id: string; message: string; count: number; lastSeen: string }[];
  trend: { date: string; responseTime: number; errors: number }[];
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function fetchHealthData(): Promise<HealthReport> {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  let dbHealthy = false;
  let responseTime = 0;
  try {
    const start = performance.now();
    await prisma.$queryRaw`SELECT 1`;
    responseTime = Math.round(performance.now() - start);
    dbHealthy = true;
  } catch {
    dbHealthy = false;
  }

  const [dayEvents, weekErrorEvents, runtimeErrors] = await Promise.all([
    prisma.trackingEvent.findMany({
      where: { createdAt: { gte: yesterday } },
      select: { eventName: true, pagePath: true, createdAt: true },
    }),
    prisma.trackingEvent.findMany({
      where: {
        createdAt: { gte: weekAgo },
        eventName: { in: ["404_error", "form_submit_error", "api_error"] },
      },
      select: { eventName: true, createdAt: true },
    }),
    isSentryIssuesApiConfigured() ? fetchSentryUnresolvedIssues() : Promise.resolve([]),
  ]);

  const brokenRoutesMap = new Map<string, { count: number; lastSeen: Date }>();
  let failedForms = 0;
  let failedApis = 0;

  for (const ev of dayEvents) {
    if (ev.eventName === "404_error") {
      const path = ev.pagePath || "unknown";
      const existing = brokenRoutesMap.get(path);
      if (existing) {
        existing.count++;
        if (ev.createdAt > existing.lastSeen) existing.lastSeen = ev.createdAt;
      } else {
        brokenRoutesMap.set(path, { count: 1, lastSeen: ev.createdAt });
      }
    } else if (ev.eventName === "form_submit_error") {
      failedForms++;
    } else if (ev.eventName === "api_error") {
      failedApis++;
    }
  }

  const brokenRoutes = Array.from(brokenRoutesMap.entries())
    .map(([path, data]) => ({
      path,
      count: data.count,
      lastSeen: data.lastSeen.toISOString(),
    }))
    .sort((a, b) => b.count - a.count);

  const capture = isSentryCaptureConfigured();
  const issuesApi = isSentryIssuesApiConfigured();
  const vercelLive = isVercelInsightsLive();

  const sentryStatus: HealthReport["sentryStatus"] = issuesApi
    ? "live"
    : capture
      ? "capturing"
      : "unconfigured";

  const totalErrors = failedForms + failedApis + brokenRoutes.reduce((acc, br) => acc + br.count, 0);
  const globalStatus = deriveGlobalStatus({
    dbHealthy,
    totalErrors,
    dbPingMs: responseTime,
  });

  const errorsByDay = new Map<string, number>();
  for (const ev of weekErrorEvents) {
    const key = dayKey(ev.createdAt);
    errorsByDay.set(key, (errorsByDay.get(key) ?? 0) + 1);
  }

  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    const key = dayKey(d);
    trend.push({
      date: key,
      responseTime: i === 0 ? responseTime : 0,
      errors: errorsByDay.get(key) ?? 0,
    });
  }

  return {
    fetchedAt: now.toISOString(),
    globalStatus,
    uptime: {
      status: dbHealthy ? "up" : "down",
      percentage: dbHealthy ? 100 : 0,
      responseTimeMs: responseTime,
    },
    errors: {
      rate:
        totalErrors > 0
          ? Number(((totalErrors / Math.max(1, dayEvents.length)) * 100).toFixed(2))
          : 0,
      failedApis,
      failedForms,
    },
    webVitals: vercelLive
      ? { status: "collecting", lcpMs: null, cls: null }
      : { status: "unconfigured", lcpMs: null, cls: null },
    sentryStatus,
    vercelStatus: vercelLive ? "live" : "unconfigured",
    incidents: !dbHealthy
      ? [{ id: "INC-1", title: "Database connection failed", status: "Active", time: now.toISOString() }]
      : [],
    brokenRoutes,
    runtimeErrors,
    trend,
  };
}
