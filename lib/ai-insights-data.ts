/**
 * lib/ai-insights-data.ts
 *
 * Deterministic engine for turning dashboard data into actionable recommendations.
 */
import prisma from "@/lib/db";
import { BLOG_POSTS } from "@/lib/blog-posts";
import type { AIInsightsReport, InsightRecommendation, AnomalyAlert, WeeklySummary } from "@/app/dashboard/(dashboard)/ai-insights/types";

export async function fetchAIInsights(): Promise<AIInsightsReport> {
  const now = new Date();
  
  // Time boundaries
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // 1. Fetch Data
  const [
    recentLeads,
    previousLeads,
    recentDeals,
    previousDeals,
    recentEvents,
    previousEvents,
    allPosts,
    hotLeads,
    allEventsLast7Days
  ] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.lead.count({ where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),
    
    prisma.deal.findMany({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.deal.findMany({ where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),

    prisma.trackingEvent.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.trackingEvent.count({ where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),

    prisma.blogPost.findMany({ select: { id: true, title: true, published: true, createdAt: true } }),
    
    prisma.lead.findMany({ 
      where: { score: { gte: 70 }, status: { in: ["NEW", "CONTACTED"] } },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    
    prisma.trackingEvent.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { eventName: true, pagePath: true }
    })
  ]);

  // 2. Weekly Summary Generation
  const recentRev = recentDeals.filter((d: any) => d.status === "WON").reduce((sum: number, d: any) => sum + (d.value || 0), 0);
  const prevRev = previousDeals.filter((d: any) => d.status === "WON").reduce((sum: number, d: any) => sum + (d.value || 0), 0);
  
  let trafficChangeStr = "remained stable";
  if (recentEvents > previousEvents * 1.1) trafficChangeStr = "increased significantly";
  else if (recentEvents < previousEvents * 0.9) trafficChangeStr = "decreased";

  const summaryText = `Traffic has ${trafficChangeStr} over the last 7 days. You acquired ${recentLeads} new leads (compared to ${previousLeads} the previous week) and closed $${recentRev} in revenue.`;

  const weeklySummary: WeeklySummary = {
    text: summaryText,
    metrics: {
      leads: { current: recentLeads, previous: previousLeads },
      revenue: { current: recentRev, previous: prevRev },
      traffic: { current: recentEvents, previous: previousEvents },
    }
  };

  // 3. Anomaly Detection
  const anomalies: AnomalyAlert[] = [];
  
  // Traffic drop anomaly
  if (previousEvents > 100 && recentEvents < previousEvents * 0.7) {
    anomalies.push({
      id: "anom_traffic_drop",
      type: "traffic_drop",
      title: "Sudden Traffic Drop",
      description: `Traffic has dropped by over 30% compared to the previous week (${recentEvents} vs ${previousEvents}). Check your ad campaigns or Search Console.`,
      severity: "high"
    });
  }

  // Error spike anomaly
  let formErrors = 0;
  let brokenRoutes = 0;
  for (const ev of allEventsLast7Days) {
    if (ev.eventName === "form_submit_error") formErrors++;
    if (ev.eventName === "404_error") brokenRoutes++;
  }

  if (formErrors > 10) {
    anomalies.push({
      id: "anom_form_errors",
      type: "error_spike",
      title: "Form Failure Spike",
      description: `Detected ${formErrors} form submission errors in the last 7 days. Ensure your SMTP/API endpoints are operational.`,
      severity: "high"
    });
  }
  
  if (brokenRoutes > 20) {
    anomalies.push({
      id: "anom_404_spike",
      type: "error_spike",
      title: "Broken Routes Spike",
      description: `Detected ${brokenRoutes} hits to 404 pages. Review your Site Health dashboard to see the affected URLs.`,
      severity: "medium"
    });
  }

  // 4. Actionable Recommendations
  const recommendations: InsightRecommendation[] = [];

  // Hot Leads to follow up
  for (const hl of hotLeads) {
    let summary = `This lead has a high score (${hl.score}) but is still marked as ${hl.status}.`;
    if (hl.intent) summary += ` Expressed intent: "${hl.intent.slice(0, 100)}..."`;
    
    recommendations.push({
      id: `rec_lead_${hl.id}`,
      actionType: "follow_up_lead",
      title: `Follow up with ${hl.name || "Lead"}`,
      description: summary,
      priority: hl.score >= 90 ? "high" : "medium",
    });
  }

  // Content to update
  const staleDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000); // 180 days
  const stalePosts = allPosts.filter((p: any) => p.published && p.createdAt < staleDate).slice(0, 3);
  for (const sp of stalePosts) {
    recommendations.push({
      id: `rec_post_${sp.id}`,
      actionType: "update_content",
      title: `Refresh Content: ${sp.title}`,
      description: `This post was published over 6 months ago. Consider updating it to maintain SEO freshness.`,
      priority: "low",
    });
  }
  
  // Static Content
  const staleStaticPosts = BLOG_POSTS.filter(p => new Date(p.date) < staleDate).slice(0, 2);
  for (const ssp of staleStaticPosts) {
    recommendations.push({
      id: `rec_static_${ssp.slug}`,
      actionType: "update_content",
      title: `Refresh Content: ${ssp.title}`,
      description: `This static post is older than 6 months. Consider auditing its content for accuracy.`,
      priority: "low",
    });
  }

  // Broken pages (from 404s)
  if (brokenRoutes > 0) {
    const routeCounts = new Map<string, number>();
    allEventsLast7Days.filter((e: any) => e.eventName === "404_error" && e.pagePath).forEach((e: any) => {
      routeCounts.set(e.pagePath!, (routeCounts.get(e.pagePath!) || 0) + 1);
    });
    
    // Find highest hit 404
    let top404 = { path: "", count: 0 };
    for (const [path, count] of routeCounts.entries()) {
      if (count > top404.count) top404 = { path, count };
    }
    
    if (top404.count > 5) {
      recommendations.push({
        id: `rec_404_fix`,
        actionType: "fix_broken_page",
        title: `Fix broken URL: ${top404.path}`,
        description: `This URL was hit ${top404.count} times resulting in a 404. Setup a 301 redirect or recreate the page.`,
        priority: "medium",
      });
    }
  }

  return {
    generatedAt: now.toISOString(),
    summary: weeklySummary,
    anomalies,
    recommendations,
  };
}
