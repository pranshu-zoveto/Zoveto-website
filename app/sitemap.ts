import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/seo-sitemap";

export { buildSitemapEntries };

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
