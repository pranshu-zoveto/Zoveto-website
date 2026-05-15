import type { MetadataRoute } from "next";
import { ROBOTS_DISALLOW_PREFIXES } from "@/lib/seo-crawl-policy";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...ROBOTS_DISALLOW_PREFIXES],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [...ROBOTS_DISALLOW_PREFIXES],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
