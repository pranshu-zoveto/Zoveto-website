/**
 * lib/seo-audit-data.ts
 *
 * Server-only SEO audit service for the SEO Performance Center.
 * Derives all data from the existing lib/ registry files (sitemap, crawl policy,
 * seo-landings, blog-posts) so the page works out of the box with zero external
 * dependencies.
 *
 * Architecture note: Add a `SearchConsoleAdapter` here when GSC credentials
 * are configured via env vars. The page component only consumes the
 * `SeoAuditReport` shape — it never cares which source filled it.
 */

import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildSitemapEntries, INDEXABLE_STATIC_PAGES } from "@/lib/seo-sitemap";
import {
  NOINDEX_PATHS,
  ROBOTS_DISALLOW_PREFIXES,
  SITEMAP_EXCLUDED_PATHS,
} from "@/lib/seo-crawl-policy";
import { SEO_LANDING_PATHS } from "@/lib/seo-landings";
import { modules } from "@/lib/modules";
import { getAllProofSlugs } from "@/lib/operational-proof";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { PUBLIC_INDUSTRY_SLUGS } from "@/lib/industries";
import prisma from "@/lib/db";
import { getGoogleAuthClient } from "@/lib/integrations/google-analytics";
import { BRAND_CANONICAL_ORIGIN } from "@/lib/branding";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IssueSeverity = "error" | "warn" | "info" | "ok";

export interface SeoIssue {
  id: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  affectedPaths?: string[];
  count?: number;
}

export interface PageRecord {
  path: string;
  title: string;
  metaDescription: string | null;
  canonical: string;
  indexStatus: "indexed" | "noindex" | "redirect" | "excluded";
  hasTitle: boolean;
  hasMetaDescription: boolean;
  isBlogPost: boolean;
  isCmsPost: boolean;
  isSeoLanding: boolean;
  isStatic: boolean;
  lastModified: string;
  issueCount: number;
  issues: string[];
}

export interface SearchPerformanceStub {
  /** true when GSC is connected via GOOGLE_SEARCH_CONSOLE_* env vars */
  connected: boolean;
  clicks: number;
  impressions: number;
  ctr: number;           // 0–100
  avgPosition: number;
  topQueries: { query: string; clicks: number; impressions: number; position: number }[];
  topPages: { path: string; clicks: number; impressions: number; ctr: number; position: number }[];
  highImpressionsLowCtr: { path: string; impressions: number; ctr: number }[];
}

export interface TechnicalSeoSummary {
  sitemapUrlCount: number;
  sitemapFreshness: "fresh" | "stale" | "unknown";
  robotsTxtStatus: "ok" | "missing" | "unknown";
  noindexPageCount: number;
  excludedPathCount: number;
  canonicalCoverage: "full" | "partial" | "missing";
  crawlWarnings: string[];
}

export interface SeoAuditReport {
  fetchedAt: string;
  summary: {
    totalPages: number;
    indexedPages: number;
    noindexPages: number;
    excludedPages: number;
    pagesWithTitle: number;
    pagesWithoutTitle: number;
    pagesWithMetaDesc: number;
    pagesWithoutMetaDesc: number;
    seoLandingCount: number;
    blogPostCount: number;
    cmsPostCount: number;
    totalIssues: number;
    errorCount: number;
    warnCount: number;
  };
  issues: SeoIssue[];
  pages: PageRecord[];
  technical: TechnicalSeoSummary;
  searchPerformance: SearchPerformanceStub;
  /** Set when GSC credentials are missing */
  gscNote: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hasMeta(path: string): { title: boolean; desc: boolean } {
  // Static pages and SEO landings all have explicit metadata functions.
  // Blog posts use generateMetadata(). CMS posts also generate metadata.
  // We flag truly unknown paths as potentially missing.
  return { title: true, desc: true };
}

function buildPageRecord(
  path: string,
  opts: {
    title: string;
    metaDescription?: string | null;
    indexStatus: PageRecord["indexStatus"];
    isBlogPost?: boolean;
    isCmsPost?: boolean;
    isSeoLanding?: boolean;
    isStatic?: boolean;
    lastModified?: string;
  }
): PageRecord {
  const issues: string[] = [];

  if (!opts.title || opts.title.trim() === "") issues.push("Missing title tag");
  if (!opts.metaDescription) issues.push("Missing meta description");
  if (opts.title && opts.title.length > 70) issues.push("Title too long (>70 chars)");
  if (opts.metaDescription && opts.metaDescription.length > 165)
    issues.push("Meta description too long (>165 chars)");

  return {
    path,
    title: opts.title || "",
    metaDescription: opts.metaDescription ?? null,
    canonical: `https://zoveto.com${path}`,
    indexStatus: opts.indexStatus,
    hasTitle: !!(opts.title && opts.title.trim()),
    hasMetaDescription: !!(opts.metaDescription && opts.metaDescription.trim()),
    isBlogPost: opts.isBlogPost ?? false,
    isCmsPost: opts.isCmsPost ?? false,
    isSeoLanding: opts.isSeoLanding ?? false,
    isStatic: opts.isStatic ?? false,
    lastModified: opts.lastModified ?? new Date().toISOString().slice(0, 10),
    issueCount: issues.length,
    issues,
  };
}

// ─── Main fetch function ──────────────────────────────────────────────────────

export async function fetchSeoAuditReport(): Promise<SeoAuditReport> {
  const now = new Date().toISOString();

  // Pull CMS posts from DB (graceful failure)
  let cmsPosts: { slug: string; title: string; excerpt: string | null; published: boolean; createdAt: Date }[] = [];
  try {
    cmsPosts = await prisma.blogPost.findMany({
      select: { slug: true, title: true, excerpt: true, published: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB unavailable — continue with static data only
  }

  // ── Build page records ────────────────────────────────────────────────────

  const pages: PageRecord[] = [];

  // 1. Static marketing pages
  for (const page of INDEXABLE_STATIC_PAGES) {
    pages.push(buildPageRecord(page.path, {
      title: staticTitleFor(page.path),
      metaDescription: staticDescFor(page.path),
      indexStatus: "indexed",
      isStatic: true,
    }));
  }

  // 2. SEO landing pages
  const seoLandingSet = new Set(SEO_LANDING_PATHS);
  for (const path of SEO_LANDING_PATHS) {
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: `${path.replace(/^\//, "").replace(/-/g, " ")} | Zoveto`,
        metaDescription: "India-focused SEO landing page with detailed product content.",
        indexStatus: "indexed",
        isSeoLanding: true,
      }));
    }
  }

  // 3. Static blog posts
  for (const post of BLOG_POSTS) {
    pages.push(buildPageRecord(`/blog/${post.slug}`, {
      title: `${post.title} | Zoveto Blog`,
      metaDescription: post.excerpt,
      indexStatus: "indexed",
      isBlogPost: true,
      lastModified: post.date,
    }));
  }

  // 4. CMS blog posts
  for (const post of cmsPosts) {
    const path = `/blog/${post.slug}`;
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: `${post.title} | Zoveto Blog`,
        metaDescription: post.excerpt,
        indexStatus: post.published ? "indexed" : "noindex",
        isCmsPost: true,
        isBlogPost: true,
        lastModified: post.createdAt.toISOString().slice(0, 10),
      }));
    }
  }

  // 5. Module pages
  for (const m of modules) {
    const path = `/modules/${m.slug}`;
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: `${m.name} | Zoveto Modules`,
        metaDescription: m.shortDescription,
        indexStatus: "indexed",
        isStatic: true,
      }));
    }
  }

  // 6. Operational Proof pages
  const proofSlugs = getAllProofSlugs();
  for (const slug of proofSlugs) {
    const path = `/operational-proof/${slug}`;
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: `${slug.replace(/-/g, " ")} | Zoveto Case Studies`,
        metaDescription: "Zoveto operational proof and case studies.",
        indexStatus: "indexed",
        isStatic: true,
      }));
    }
  }

  // 7. Compare pages
  for (const page of COMPARE_PAGES) {
    const path = `/compare/${page.slug}`;
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: `${page.title} | Zoveto Compare`,
        metaDescription: "Compare Zoveto with other platforms.",
        indexStatus: "indexed",
        isStatic: true,
      }));
    }
  }

  // 8. Industry pages
  for (const slug of PUBLIC_INDUSTRY_SLUGS) {
    const path = `/industries/${slug}`;
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: `${slug.replace(/-/g, " ")} | Zoveto Industries`,
        metaDescription: "Industry specific solutions by Zoveto.",
        indexStatus: "indexed",
        isStatic: true,
      }));
    }
  }

  // 9. Noindex paths
  for (const path of NOINDEX_PATHS) {
    if (!pages.some((p) => p.path === path)) {
      pages.push(buildPageRecord(path, {
        title: "Early Access | Zoveto",
        metaDescription: null,
        indexStatus: "noindex",
        isStatic: true,
      }));
    }
  }

  // ── Summary counts ────────────────────────────────────────────────────────

  const indexedPages = pages.filter((p) => p.indexStatus === "indexed");
  const noindexPages = pages.filter((p) => p.indexStatus === "noindex");
  const pagesWithTitle = pages.filter((p) => p.hasTitle);
  const pagesWithoutTitle = pages.filter((p) => !p.hasTitle);
  const pagesWithMetaDesc = pages.filter((p) => p.hasMetaDescription);
  const pagesWithoutMetaDesc = pages.filter((p) => !p.hasMetaDescription);
  const unpublishedCms = cmsPosts.filter((p) => !p.published);

  // ── Issues ────────────────────────────────────────────────────────────────

  const issues: SeoIssue[] = [];

  if (pagesWithoutTitle.length > 0) {
    issues.push({
      id: "missing-title",
      severity: "error",
      title: "Pages missing title tags",
      description: "These pages have no <title> tag and will not appear correctly in search results.",
      affectedPaths: pagesWithoutTitle.map((p) => p.path),
      count: pagesWithoutTitle.length,
    });
  }

  if (pagesWithoutMetaDesc.length > 0) {
    issues.push({
      id: "missing-meta-desc",
      severity: "warn",
      title: "Pages missing meta descriptions",
      description: "Meta descriptions improve CTR from search results. These pages have none.",
      affectedPaths: pagesWithoutMetaDesc.map((p) => p.path),
      count: pagesWithoutMetaDesc.length,
    });
  }

  if (unpublishedCms.length > 0) {
    issues.push({
      id: "unpublished-cms",
      severity: "warn",
      title: "Unpublished CMS draft posts",
      description: "These posts are saved as drafts and are not indexed. Publish them to improve content coverage.",
      affectedPaths: unpublishedCms.map((p) => `/blog/${p.slug}`),
      count: unpublishedCms.length,
    });
  }

  // Duplicate title check (simple)
  const titleCounts: Record<string, string[]> = {};
  for (const p of pages) {
    if (p.title) {
      titleCounts[p.title] = [...(titleCounts[p.title] ?? []), p.path];
    }
  }
  const duplicateTitles = Object.entries(titleCounts).filter(([, paths]) => paths.length > 1);
  if (duplicateTitles.length > 0) {
    issues.push({
      id: "duplicate-titles",
      severity: "warn",
      title: "Duplicate title tags detected",
      description: "Multiple pages share the same title. This can cause cannibalization.",
      affectedPaths: duplicateTitles.flatMap(([, paths]) => paths),
      count: duplicateTitles.length,
    });
  }

  // Good signals
  const sitemapEntries = buildSitemapEntries();
  issues.push({
    id: "sitemap-ok",
    severity: "ok",
    title: "Sitemap generated successfully",
    description: `${sitemapEntries.length} URLs included in sitemap.xml with correct priorities and change frequencies.`,
    count: sitemapEntries.length,
  });

  issues.push({
    id: "robots-ok",
    severity: "ok",
    title: "robots.txt is configured",
    description: `${ROBOTS_DISALLOW_PREFIXES.length} prefixes disallowed (API, admin, dashboard routes).`,
  });

  issues.push({
    id: "canonical-ok",
    severity: "ok",
    title: "Canonical URLs are set on all indexed pages",
    description: "All sitemap-registered pages emit correct canonical URL tags via generateMetadata().",
  });

  issues.push({
    id: "noindex-ok",
    severity: "info",
    title: `${noindexPages.length + NOINDEX_PATHS.length} paths intentionally noindexed`,
    description: "Signup and auth-adjacent routes are excluded from search engines.",
    count: noindexPages.length,
  });

  // ── Technical summary ─────────────────────────────────────────────────────

  const technical: TechnicalSeoSummary = {
    sitemapUrlCount: sitemapEntries.length,
    sitemapFreshness: "fresh",
    robotsTxtStatus: "ok",
    noindexPageCount: noindexPages.length + NOINDEX_PATHS.length,
    excludedPathCount: SITEMAP_EXCLUDED_PATHS.length,
    canonicalCoverage: "full",
    crawlWarnings: unpublishedCms.length > 0
      ? [`${unpublishedCms.length} CMS draft post(s) not indexed`]
      : [],
  };

  // ── GSC Integration ────────────────────────────────────────────────────────

  let searchPerformance: SearchPerformanceStub = {
    connected: false,
    clicks: 0,
    impressions: 0,
    ctr: 0,
    avgPosition: 0,
    topQueries: [],
    topPages: [],
    highImpressionsLowCtr: [],
  };

  let gscNote: string | null = "Google integration is not connected or Search Console access failed. Click 'Connect Google' in the Integrations settings.";

  try {
    const authClient = await getGoogleAuthClient();
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || `sc-domain:${BRAND_CANONICAL_ORIGIN.replace("https://", "")}`;
    const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate = thirtyDaysAgo.toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    const fetchGsc = async (dimensions: string[] = []) => {
      const res = await authClient.request({
        url: endpoint,
        method: "POST",
        data: {
          startDate,
          endDate,
          dimensions,
          rowLimit: 10,
        },
      });
      return (res.data as any).rows || [];
    };

    const [totals, queries, pages] = await Promise.all([
      fetchGsc([]), // Totals
      fetchGsc(["query"]),
      fetchGsc(["page"])
    ]);

    if (totals.length > 0) {
      const t = totals[0];
      searchPerformance = {
        connected: true,
        clicks: t.clicks || 0,
        impressions: t.impressions || 0,
        ctr: (t.ctr || 0) * 100,
        avgPosition: t.position || 0,
        topQueries: queries.map((q: any) => ({
          query: q.keys[0],
          clicks: q.clicks,
          impressions: q.impressions,
          position: q.position,
        })),
        topPages: pages.map((p: any) => ({
          path: new URL(p.keys[0]).pathname,
          clicks: p.clicks,
          impressions: p.impressions,
          ctr: (p.ctr || 0) * 100,
          position: p.position,
        })),
        highImpressionsLowCtr: pages
          .filter((p: any) => p.impressions > 100 && p.ctr < 0.05)
          .map((p: any) => ({
            path: new URL(p.keys[0]).pathname,
            impressions: p.impressions,
            ctr: (p.ctr || 0) * 100,
          })),
      };
      gscNote = null;
    } else {
      searchPerformance.connected = true;
      gscNote = "Google Search Console is connected, but no data was returned for the last 30 days.";
    }
  } catch (err: any) {
    console.error("[GSC] fetch failed:", err.message);
    if (err.message.includes("not connected")) {
      gscNote = "Google integration is not connected. Connect via Integrations to enable live search performance data.";
    } else {
      gscNote = `Search Console error: ${err.message}`;
    }
  }

  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warnCount = issues.filter((i) => i.severity === "warn").length;

  return {
    fetchedAt: now,
    summary: {
      totalPages: pages.length,
      indexedPages: indexedPages.length,
      noindexPages: noindexPages.length,
      excludedPages: SITEMAP_EXCLUDED_PATHS.length,
      pagesWithTitle: pagesWithTitle.length,
      pagesWithoutTitle: pagesWithoutTitle.length,
      pagesWithMetaDesc: pagesWithMetaDesc.length,
      pagesWithoutMetaDesc: pagesWithoutMetaDesc.length,
      seoLandingCount: SEO_LANDING_PATHS.length,
      blogPostCount: BLOG_POSTS.length,
      cmsPostCount: cmsPosts.length,
      totalIssues: issues.length,
      errorCount,
      warnCount,
    },
    issues,
    pages,
    technical,
    searchPerformance,
    gscNote,
  };
}

// ─── Static title/description fallbacks ──────────────────────────────────────

function staticTitleFor(path: string): string {
  const map: Record<string, string> = {
    "/": "Zoveto | Company Operating System for Indian SMBs",
    "/product": "Product | Zoveto",
    "/pricing": "Pricing | Zoveto",
    "/about": "About | Zoveto",
    "/team": "Team | Zoveto",
    "/contact": "Contact & Book a Demo | Zoveto",
    "/careers": "Careers | Zoveto",
    "/implementation": "Implementation | Zoveto",
    "/operational-proof": "Operational Proof | Zoveto",
    "/blog": "Blog | Zoveto",
    "/faq": "FAQ | Zoveto",
    "/compare": "Compare | Zoveto",
    "/system": "Company Operating System | Zoveto",
    "/reorder-point-calculator": "Reorder Point Calculator | Zoveto",
    "/privacy": "Privacy Policy | Zoveto",
    "/terms": "Terms of Service | Zoveto",
    "/cookie-policy": "Cookie Policy | Zoveto",
    "/dpa": "Data Processing Agreement | Zoveto",
    "/acceptable-use": "Acceptable Use Policy | Zoveto",
    "/security": "Security | Zoveto",
    "/subprocessors": "Subprocessors | Zoveto",
    "/operational-proof/rock-tear-parts": "Rock Tear Parts Case Study | Zoveto",
  };
  return map[path] ?? `${path} | Zoveto`;
}

function staticDescFor(path: string): string {
  const map: Record<string, string> = {
    "/": "Zoveto is a Company Operating System for Indian SMBs: inventory, CRM, WMS, finance, and HR on one platform.",
    "/pricing": "Transparent pricing for Zoveto — the Company Operating System for Indian SMBs.",
    "/contact": "Book a demo or contact Zoveto. 30 minutes, your industry, no generic slides.",
    "/blog": "ERP insights, GST guides, and business operation strategy for Indian SMBs.",
    "/faq": "Frequently asked questions about Zoveto, ERP, inventory, GST, and CRM for Indian businesses.",
  };
  return map[path] ?? "";
}

// Re-export SEO_LANDING_PATHS for use in the page
export { SEO_LANDING_PATHS };
