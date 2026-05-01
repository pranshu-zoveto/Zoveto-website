import { BRAND_CANONICAL_ORIGIN } from "@/lib/branding";

export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  return BRAND_CANONICAL_ORIGIN;
}

/** Absolute canonical URL for a pathname (leading `/`). Homepage is `${origin}/` for sitemap parity. */
export function canonicalUrl(pathname: string): string {
  const base = siteUrl().replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/" || path === "") return `${base}/`;
  return `${base}${path}`;
}
