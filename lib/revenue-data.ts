/**
 * lib/revenue-data.ts
 *
 * Server service to aggregate Deals and Leads for the Revenue Dashboard.
 */
import prisma from "@/lib/db";
import type { RevenueReport, RevenueTrend, DealItem, AttributionMetric } from "@/app/dashboard/(dashboard)/revenue/types";

export async function fetchRevenueReport(daysRange = 30): Promise<RevenueReport> {
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - daysRange);

  // 1. Fetch Deals
  const deals = await prisma.deal.findMany({
    where: { createdAt: { gte: startDate } },
    include: { lead: true },
    orderBy: { createdAt: "desc" },
  });

  // 2. Fetch Leads (for funnel calculation)
  const leadsCount = await prisma.lead.count({
    where: { createdAt: { gte: startDate } },
  });

  // 3. Fetch Tracking Events (for top-of-funnel visitors)
  // Assuming 1 event roughly equals 1 visitor action (or distinct session if we had it)
  // For simplicity, we'll just count total events as 'visitors' or distinct sessionIds
  const visitorEvents = await prisma.trackingEvent.findMany({
    where: { createdAt: { gte: startDate } },
    select: { sessionId: true },
  });
  const uniqueVisitors = new Set(visitorEvents.map(v => v.sessionId).filter(Boolean)).size;

  // 4. Aggregations
  let monthlyRevenue = 0;
  let pipelineValue = 0;
  let closedWonCount = 0;
  let closedLostCount = 0;

  const bySourceMap = new Map<string, number>();
  const byPageMap = new Map<string, number>();
  const trendMap = new Map<string, number>();

  for (const deal of deals) {
    const val = deal.value || 0;
    
    if (deal.status === "WON") {
      monthlyRevenue += val;
      closedWonCount++;

      // Attribution
      const source = deal.lead?.utmSource || "direct";
      bySourceMap.set(source, (bySourceMap.get(source) || 0) + val);

      const page = deal.lead?.sourceUrl || "unknown";
      byPageMap.set(page, (byPageMap.get(page) || 0) + val);

      // Trend
      const dateKey = deal.createdAt.toISOString().slice(0, 10);
      trendMap.set(dateKey, (trendMap.get(dateKey) || 0) + val);
    } else if (deal.status === "OPEN") {
      pipelineValue += val;
    } else if (deal.status === "LOST") {
      closedLostCount++;
    }
  }

  const avgDealSize = closedWonCount > 0 ? monthlyRevenue / closedWonCount : 0;
  const leadToCloseRate = leadsCount > 0 ? (closedWonCount / leadsCount) * 100 : 0;

  // Format Deals table
  const recentDeals: DealItem[] = deals.map(d => ({
    id: d.id,
    name: d.name,
    value: d.value,
    status: d.status as "OPEN" | "WON" | "LOST",
    leadName: d.lead?.name,
    createdAt: d.createdAt.toISOString(),
  }));

  // Format Trend
  const trend: RevenueTrend[] = [];
  for (let i = 0; i <= daysRange; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dk = d.toISOString().slice(0, 10);
    trend.push({
      date: dk,
      revenue: trendMap.get(dk) || 0,
    });
  }

  // Format Attribution
  const formatAttribution = (map: Map<string, number>): AttributionMetric[] => {
    return Array.from(map.entries())
      .map(([label, revenue]) => ({ label, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  };

  return {
    metrics: {
      monthlyRevenue,
      pipelineValue,
      avgDealSize,
      leadToCloseRate,
      closedWonCount,
      closedLostCount,
    },
    funnel: {
      visitors: Math.max(uniqueVisitors, leadsCount), // ensuring logic
      leads: leadsCount,
      deals: deals.length,
      wins: closedWonCount,
    },
    trend,
    bySource: formatAttribution(bySourceMap),
    byPage: formatAttribution(byPageMap),
    recentDeals,
  };
}
