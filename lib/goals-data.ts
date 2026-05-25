/**
 * lib/goals-data.ts
 *
 * Server service to aggregate TrackingEvents for the Goal / Conversion Tracker.
 */
import prisma from "@/lib/db";
import type { GoalReport, GoalRange, GoalTrendData, DimensionMetric } from "@/app/dashboard/(dashboard)/goals/types";

export async function fetchGoalReport(range: GoalRange): Promise<GoalReport> {
  const now = new Date();
  let startDate = new Date();
  
  if (range === "today") startDate.setHours(0, 0, 0, 0);
  else if (range === "7d") startDate.setDate(now.getDate() - 7);
  else if (range === "30d") startDate.setDate(now.getDate() - 30);
  else if (range === "90d") startDate.setDate(now.getDate() - 90);

  const events = await prisma.trackingEvent.findMany({
    where: {
      createdAt: { gte: startDate },
    },
    select: {
      eventName: true,
      sessionId: true,
      pagePath: true,
      utmSource: true,
      device: true,
      createdAt: true,
    },
  });

  // Calculate unique sessions as the baseline for conversion rate (if we had a "page_view" event).
  // Since we don't have automatic pageviews, we might not have a true "total sessions" denominator unless 
  // we count every distinct sessionId as a visitor.
  const uniqueSessions = new Set<string>();
  events.forEach((e: any) => {
    if (e.sessionId) uniqueSessions.add(e.sessionId);
  });
  const totalVisitors = Math.max(1, uniqueSessions.size); // avoid div by 0

  // 1. By Goal Name
  const byGoalMap = new Map<string, { total: number; unique: Set<string> }>();
  
  // 2. Trend (by date)
  const trendMap = new Map<string, Record<string, number>>();

  // 3. By Page
  const byPageMap = new Map<string, number>();

  // 4. By Source
  const bySourceMap = new Map<string, number>();

  // 5. By Device
  const byDeviceMap = new Map<string, number>();

  for (const ev of events) {
    // Goal totals
    if (!byGoalMap.has(ev.eventName)) {
      byGoalMap.set(ev.eventName, { total: 0, unique: new Set() });
    }
    const goal = byGoalMap.get(ev.eventName)!;
    goal.total++;
    if (ev.sessionId) goal.unique.add(ev.sessionId);

    // Trend
    const dateKey = ev.createdAt.toISOString().slice(0, 10);
    if (!trendMap.has(dateKey)) trendMap.set(dateKey, {});
    const day = trendMap.get(dateKey)!;
    day[ev.eventName] = (day[ev.eventName] || 0) + 1;

    // Page
    const page = ev.pagePath || "/";
    byPageMap.set(page, (byPageMap.get(page) || 0) + 1);

    // Source
    const source = ev.utmSource || "direct";
    bySourceMap.set(source, (bySourceMap.get(source) || 0) + 1);

    // Device
    const device = ev.device || "desktop";
    byDeviceMap.set(device, (byDeviceMap.get(device) || 0) + 1);
  }

  // Format Goals
  const goals = Array.from(byGoalMap.entries()).map(([name, data]) => ({
    name,
    total: data.total,
    unique: data.unique.size,
    conversionRate: (data.unique.size / totalVisitors) * 100,
  })).sort((a, b) => b.total - a.total);

  // Format Trend
  const trend: GoalTrendData[] = [];
  // Build continuous date array
  const diffDays = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));
  for (let i = 0; i < diffDays; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dk = d.toISOString().slice(0, 10);
    trend.push({
      date: dk,
      events: trendMap.get(dk) || {},
    });
  }

  // Helper to format dimensions
  const formatDim = (map: Map<string, number>): DimensionMetric[] => {
    return Array.from(map.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  };

  return {
    range,
    totalEvents: events.length,
    totalUniqueVisitors: uniqueSessions.size,
    goals,
    trend,
    byPage: formatDim(byPageMap),
    bySource: formatDim(bySourceMap),
    byDevice: formatDim(byDeviceMap),
  };
}
