import type { MetadataRoute } from "next";
import { buildSitemapEntries, getPublishedCmsBlogSitemapPosts } from "@/lib/seo-sitemap";

export { buildSitemapEntries };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsBlogPosts = await getPublishedCmsBlogSitemapPosts();
  return buildSitemapEntries({ cmsBlogPosts });
}
