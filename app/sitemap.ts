import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { modules } from "@/lib/modules";
import { getAllProofSlugs } from "@/lib/operational-proof";
import { SEO_LANDING_PATHS } from "@/lib/seo-landings";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { PUBLIC_INDUSTRY_SLUGS } from "@/lib/industries";
import { siteUrl } from "@/lib/site";

function lastModIso(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

/** Exported for tests; default `sitemap()` delegates here. */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const BASE = siteUrl();
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/product`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE}/dpa`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE}/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE}/security`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/subprocessors`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/operational-proof`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.82 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${BASE}/case-studies/rock-tear-parts`, lastModified: now, changeFrequency: "monthly", priority: 0.74 },
    { url: `${BASE}/system`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
  ];

  const seoLandings: MetadataRoute.Sitemap = SEO_LANDING_PATHS.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: lastModIso(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const modulePages: MetadataRoute.Sitemap = modules.map((m) => ({
    url: `${BASE}/modules/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const operationalProofPages: MetadataRoute.Sitemap = getAllProofSlugs().map((slug) => ({
    url: `${BASE}/operational-proof/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.76,
  }));

  const comparePages: MetadataRoute.Sitemap = COMPARE_PAGES.map((page) => ({
    url: `${BASE}/compare/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.74,
  }));

  const industryPages: MetadataRoute.Sitemap = PUBLIC_INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE}/industries/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.77,
  }));

  return [
    ...staticPages,
    ...seoLandings,
    ...blogPosts,
    ...modulePages,
    ...operationalProofPages,
    ...comparePages,
    ...industryPages,
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
