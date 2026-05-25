/**
 * lib/content-performance-data.ts
 *
 * Aggregates CMS and static blog posts to measure leads, engagement,
 * conversion rates, and content decay.
 */

import { BLOG_POSTS } from "@/lib/blog-posts";
import prisma from "@/lib/db";

export interface ContentPerformanceMetrics {
  slug: string;
  title: string;
  type: "static" | "cms";
  publishedAt: string;
  daysSincePublished: number;
  // Performance metrics derived from Leads (since we don't have GA4 yet)
  leadsGenerated: number;
  qualifiedLeads: number; // score >= 70 or status QUALIFIED/WON
  conversionRate: number; // Placeholder until traffic data is integrated per page
  // Decay
  status: "fresh" | "decaying" | "archived" | "draft";
}

export interface ContentDashboardReport {
  fetchedAt: string;
  totalPosts: number;
  totalLeadsFromContent: number;
  topPerforming: ContentPerformanceMetrics[];
  decayingContent: ContentPerformanceMetrics[];
}

export async function fetchContentPerformance(): Promise<ContentDashboardReport> {
  // 1. Fetch CMS Posts
  let cmsPosts: { slug: string; title: string; published: boolean; createdAt: Date }[] = [];
  try {
    cmsPosts = await prisma.blogPost.findMany({
      select: { slug: true, title: true, published: true, createdAt: true },
    });
  } catch {
    // DB unavailable
  }

  // 2. Fetch Leads to attribute to content
  const leads = await prisma.lead.findMany({
    select: { id: true, sourceUrl: true, utmContent: true, status: true, score: true },
  });

  const now = new Date();
  const metricsMap = new Map<string, ContentPerformanceMetrics>();

  // Helper to add a post
  const addPost = (slug: string, title: string, type: "static" | "cms", date: Date, published: boolean) => {
    const daysSince = Math.max(0, Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)));
    let status: ContentPerformanceMetrics["status"] = "draft";
    
    if (published) {
      if (daysSince < 90) status = "fresh";
      else if (daysSince < 365) status = "decaying";
      else status = "archived";
    }

    metricsMap.set(slug, {
      slug,
      title,
      type,
      publishedAt: date.toISOString(),
      daysSincePublished: daysSince,
      leadsGenerated: 0,
      qualifiedLeads: 0,
      conversionRate: 0, // Placeholder
      status,
    });
  };

  // Add static posts
  for (const post of BLOG_POSTS) {
    addPost(post.slug, post.title, "static", new Date(post.date), true);
  }

  // Add CMS posts
  for (const post of cmsPosts) {
    if (!metricsMap.has(post.slug)) {
      addPost(post.slug, post.title, "cms", post.createdAt, post.published);
    }
  }

  // 3. Attribute leads
  let totalLeadsFromContent = 0;
  for (const lead of leads) {
    let slugMatch: string | null = null;
    
    // Check utmContent
    if (lead.utmContent && metricsMap.has(lead.utmContent)) {
      slugMatch = lead.utmContent;
    } 
    // Check sourceUrl (e.g. /blog/some-slug)
    else if (lead.sourceUrl && lead.sourceUrl.includes("/blog/")) {
      const parts = lead.sourceUrl.split("/blog/");
      if (parts.length > 1) {
        const slug = parts[1].split(/[?#]/)[0].replace(/\/$/, "");
        if (metricsMap.has(slug)) slugMatch = slug;
      }
    }

    if (slugMatch) {
      const metrics = metricsMap.get(slugMatch)!;
      metrics.leadsGenerated++;
      totalLeadsFromContent++;
      if (lead.score >= 70 || ["QUALIFIED", "WON"].includes(lead.status)) {
        metrics.qualifiedLeads++;
      }
    }
  }

  const allMetrics = Array.from(metricsMap.values());
  
  // Sort by leads generated for top performing
  const topPerforming = [...allMetrics]
    .filter(m => m.status !== "draft")
    .sort((a, b) => b.leadsGenerated - a.leadsGenerated);

  // Filter for decaying content
  const decayingContent = allMetrics.filter(m => m.status === "decaying");

  return {
    fetchedAt: now.toISOString(),
    totalPosts: allMetrics.length,
    totalLeadsFromContent,
    topPerforming,
    decayingContent,
  };
}
