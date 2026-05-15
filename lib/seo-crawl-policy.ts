/**
 * Central crawl/indexing policy for the marketing site (zoveto.com).
 * SaaS app routes live on app.zoveto.com — not in this repo.
 */

/** Paths that 301/308 elsewhere — never list in sitemap.xml. */
export const SITEMAP_EXCLUDED_PATHS = [
  "/case-studies",
  "/login",
  "/app",
  "/privacy-policy",
  "/terms-of-service",
  "/modules/hr",
] as const;

/** robots.txt disallow (prefix match). */
export const ROBOTS_DISALLOW_PREFIXES = [
  "/api/",
  "/api",
  "/admin",
  "/dashboard",
  "/login",
  "/app",
  "/go/",
  "/_next/",
] as const;

export function isSitemapExcludedPath(pathname: string): boolean {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return SITEMAP_EXCLUDED_PATHS.some((excluded) => path === excluded);
}

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return trimmed.toLowerCase();
}
