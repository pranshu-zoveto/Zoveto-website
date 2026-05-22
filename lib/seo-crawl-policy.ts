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

/**
 * Public routes that should not be indexed (conversion/auth-adjacent).
 * Excluded from sitemap; pages should set robots noindex.
 */
export const NOINDEX_PATHS = ["/signup"] as const;

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
  "/signup",
] as const;

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return trimmed.toLowerCase();
}

export function isNoindexPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return NOINDEX_PATHS.some((excluded) => path === excluded);
}

export function isSitemapExcludedPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path.includes("?") || path.includes("#")) return true;
  return (
    SITEMAP_EXCLUDED_PATHS.some((excluded) => path === excluded) || isNoindexPath(path)
  );
}

export function isRobotsDisallowedPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return ROBOTS_DISALLOW_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(prefix),
  );
}
