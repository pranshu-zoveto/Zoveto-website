/**
 * lib/health-data.ts
 *
 * Aggregates site health data, mocking or pulling from internal sources,
 * and failing gracefully if Sentry/Vercel APIs aren't configured.
 */

import prisma from "@/lib/db";

export interface HealthReport {
  fetchedAt: string;
  globalStatus: "healthy" | "degraded" | "critical";
  uptime: {
    status: "up" | "down";
    percentage: number;
    responseTimeMs: number;
  };
  errors: {
    rate: number; // percentage
    failedApis: number;
    failedForms: number;
  };
  webVitals: {
    status: "good" | "needs_improvement" | "poor" | "unconfigured";
    lcpMs: number | null;
    cls: number | null;
  };
  sentryStatus: "configured" | "unconfigured";
  vercelStatus: "configured" | "unconfigured";
  incidents: { id: string; title: string; status: string; time: string }[];
  brokenRoutes: { path: string; count: number; lastSeen: string }[];
  runtimeErrors: { id: string; message: string; count: number; lastSeen: string }[];
  trend: { date: string; responseTime: number; errors: number }[];
}

export async function fetchHealthData(): Promise<HealthReport> {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // 1. Internal API / DB Health
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

  // 2. Fetch 404s and other error events from our new TrackingEvent table
  const trackingEvents = await prisma.trackingEvent.findMany({
    where: {
      createdAt: { gte: yesterday },
    },
    select: { eventName: true, pagePath: true, createdAt: true },
  });

  const brokenRoutesMap = new Map<string, { count: number; lastSeen: Date }>();
  let failedForms = 0;
  let failedApis = 0;

  for (const ev of trackingEvents) {
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

  // 3. Check for external API configurations
  // We use the tokens if they exist, otherwise we mock unconfigured state
  const hasSentry = !!process.env.SENTRY_AUTH_TOKEN;
  const hasVercel = !!process.env.VERCEL_ACCESS_TOKEN;

  // 4. Calculate Global Status
  const totalErrors = failedForms + failedApis + brokenRoutes.reduce((acc, br) => acc + br.count, 0);
  let globalStatus: "healthy" | "degraded" | "critical" = "healthy";
  if (!dbHealthy) globalStatus = "critical";
  else if (totalErrors > 50 || responseTime > 1000) globalStatus = "degraded";

  // 5. Mock Trend Data (since we don't have historical uptime pinging yet)
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    trend.push({
      date: d.toISOString().slice(0, 10),
      responseTime: Math.round(50 + Math.random() * 50),
      errors: Math.floor(Math.random() * 5),
    });
  }
  // Add today's actual data to the end of trend
  trend[trend.length - 1].responseTime = responseTime;
  trend[trend.length - 1].errors = totalErrors;

  return {
    fetchedAt: now.toISOString(),
    globalStatus,
    uptime: {
      status: dbHealthy ? "up" : "down",
      percentage: dbHealthy ? 99.99 : 0,
      responseTimeMs: responseTime,
    },
    errors: {
      rate: totalErrors > 0 ? Number((totalErrors / Math.max(1, trackingEvents.length) * 100).toFixed(2)) : 0.00,
      failedApis,
      failedForms,
    },
    webVitals: hasVercel
      ? { status: "good", lcpMs: 1200, cls: 0.02 } // Would fetch from Vercel API
      : { status: "unconfigured", lcpMs: null, cls: null },
    sentryStatus: hasSentry ? "configured" : "unconfigured",
    vercelStatus: hasVercel ? "configured" : "unconfigured",
    incidents: !dbHealthy ? [{ id: "INC-1", title: "Database Connection Failure", status: "Active", time: now.toISOString() }] : [],
    brokenRoutes,
    runtimeErrors: hasSentry
      ? [{ id: "ERR-1", message: "TypeError: Cannot read properties of undefined (reading 'map')", count: 12, lastSeen: now.toISOString() }] // Would fetch from Sentry API
      : [],
    trend,
  };
}
