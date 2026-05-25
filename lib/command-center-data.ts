/**
 * lib/command-center-data.ts
 *
 * Server-only data service for the Website Command Center dashboard.
 * All Prisma queries are isolated here so the page component stays clean.
 * Never imported on the client.
 */

import prisma from "@/lib/db";

export type TimeRange = "today" | "7d" | "30d";

function getStartDate(range: TimeRange): Date {
  const now = new Date();
  if (range === "today") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (range === "7d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  // 30d
  const d = new Date(now);
  d.setDate(d.getDate() - 30);
  return d;
}

/** KPI snapshot from the Prisma database. */
export async function fetchKpis(range: TimeRange) {
  const since = getStartDate(range);

  const [
    totalLeads,
    leadsInRange,
    publishedPosts,
    draftPosts,
    totalPosts,
    recentLeads,
    allLeads,
  ] = await Promise.allSettled([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: since } } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
    prisma.blogPost.count(),
    prisma.lead.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, company: true, createdAt: true, status: true },
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, email: true, company: true, createdAt: true, status: true },
    }),
  ]);

  return {
    totalLeads: totalLeads.status === "fulfilled" ? totalLeads.value : 0,
    leadsInRange: leadsInRange.status === "fulfilled" ? leadsInRange.value : 0,
    publishedPosts: publishedPosts.status === "fulfilled" ? publishedPosts.value : 0,
    draftPosts: draftPosts.status === "fulfilled" ? draftPosts.value : 0,
    totalPosts: totalPosts.status === "fulfilled" ? totalPosts.value : 0,
    recentLeads: recentLeads.status === "fulfilled" ? recentLeads.value : [],
    allLeads: allLeads.status === "fulfilled" ? allLeads.value : [],
  };
}

/** Top blog posts by publish date (proxy for engagement until analytics is wired). */
export async function fetchTopContent() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        createdAt: true,
        excerpt: true,
      },
    });
    return posts;
  } catch {
    return [];
  }
}

/** Daily lead counts for the trend sparkline (last N days). */
export async function fetchLeadTrend(days: number): Promise<{ date: string; count: number }[]> {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);
    since.setHours(0, 0, 0, 0);

    const leads = await prisma.lead.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Build a map of date → count
    const buckets: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().slice(0, 10);
      buckets[key] = 0;
    }

    for (const lead of leads) {
      const key = lead.createdAt.toISOString().slice(0, 10);
      if (key in buckets) {
        buckets[key]++;
      }
    }

    return Object.entries(buckets).map(([date, count]) => ({ date, count }));
  } catch {
    return [];
  }
}

export interface CommandCenterData {
  kpis: Awaited<ReturnType<typeof fetchKpis>>;
  topContent: Awaited<ReturnType<typeof fetchTopContent>>;
  leadTrend: Awaited<ReturnType<typeof fetchLeadTrend>>;
  range: TimeRange;
  fetchedAt: string;
}
