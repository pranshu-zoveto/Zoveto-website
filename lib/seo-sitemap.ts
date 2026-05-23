import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { modules } from "@/lib/modules";
import { getAllProofSlugs } from "@/lib/operational-proof";
import { SEO_LANDING_PATHS } from "@/lib/seo-landings";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { PUBLIC_INDUSTRY_SLUGS } from "@/lib/industries";
import { isSitemapExcludedPath, normalizePathname } from "@/lib/seo-crawl-policy";
import { canonicalUrl } from "@/lib/site";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type StaticSitemapPage = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

/** Marketing/legal pages with stable routes (source of truth for static sitemap URLs). */
export const INDEXABLE_STATIC_PAGES: readonly StaticSitemapPage[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/product", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.75 },
  { path: "/team", changeFrequency: "monthly", priority: 0.72 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.65 },
  { path: "/implementation", changeFrequency: "monthly", priority: 0.82 },
  { path: "/operational-proof", changeFrequency: "monthly", priority: 0.82 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.75 },
  { path: "/faq", changeFrequency: "weekly", priority: 0.82 },
  { path: "/compare", changeFrequency: "weekly", priority: 0.75 },
  { path: "/system", changeFrequency: "monthly", priority: 0.72 },
  { path: "/reorder-point-calculator", changeFrequency: "monthly", priority: 0.76 },
  { path: "/operational-proof/rock-tear-parts", changeFrequency: "monthly", priority: 0.74 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.35 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.35 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.35 },
  { path: "/dpa", changeFrequency: "yearly", priority: 0.35 },
  { path: "/acceptable-use", changeFrequency: "yearly", priority: 0.35 },
  { path: "/security", changeFrequency: "yearly", priority: 0.4 },
  { path: "/subprocessors", changeFrequency: "yearly", priority: 0.35 },
] as const;

function lastModIso(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function entry(
  path: string,
  opts: { changeFrequency: ChangeFrequency; priority: number; lastModified?: string },
): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(path),
    lastModified: opts.lastModified ?? new Date().toISOString(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  };
}

function dedupeSitemapEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((item) => {
    try {
      const key = normalizePathname(new URL(item.url).pathname);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    } catch {
      return false;
    }
  });
}

/** Builds the full indexable sitemap from live content registries. */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = INDEXABLE_STATIC_PAGES.map((page) =>
    entry(page.path, {
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      lastModified: now,
    }),
  );

  const seoLandings = SEO_LANDING_PATHS.map((path) =>
    entry(path, { changeFrequency: "monthly", priority: 0.78, lastModified: now }),
  );

  const blogPosts = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, {
      changeFrequency: "monthly",
      priority: 0.72,
      lastModified: lastModIso(post.date),
    }),
  );

  const modulePages = modules.map((m) =>
    entry(`/modules/${m.slug}`, { changeFrequency: "monthly", priority: 0.7, lastModified: now }),
  );

  const operationalProofPages = getAllProofSlugs().map((slug) =>
    entry(`/operational-proof/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.76,
      lastModified: now,
    }),
  );

  const comparePages = COMPARE_PAGES.map((page) =>
    entry(`/compare/${page.slug}`, {
      changeFrequency: "monthly",
      priority: 0.74,
      lastModified: now,
    }),
  );

  const industryPages = PUBLIC_INDUSTRY_SLUGS.map((slug) =>
    entry(`/industries/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.77,
      lastModified: now,
    }),
  );

  const all = [
    ...staticPages,
    ...seoLandings,
    ...blogPosts,
    ...modulePages,
    ...operationalProofPages,
    ...comparePages,
    ...industryPages,
  ];

  const filtered = all.filter((item) => {
    try {
      const pathname = new URL(item.url).pathname;
      if (!item.url.startsWith("http")) return false;
      if (item.url.includes("?") || item.url.includes("#")) return false;
      return !isSitemapExcludedPath(pathname);
    } catch {
      return false;
    }
  });

  return dedupeSitemapEntries(filtered);
}
