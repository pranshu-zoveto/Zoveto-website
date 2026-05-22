import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildSitemapEntries } from "@/lib/seo-sitemap";
import { NOINDEX_PATHS } from "@/lib/seo-crawl-policy";
import { BLOG_POSTS } from "@/lib/blog-posts";

describe("seo-sitemap", () => {
  it("returns only unique absolute URLs", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const entries = buildSitemapEntries();
    const pathnames = entries.map((e) => new URL(e.url).pathname);
    assert.equal(new Set(pathnames).size, pathnames.length, "duplicate pathnames in sitemap");
    for (const e of entries) {
      assert.ok(e.url.startsWith("https://"), e.url);
      assert.ok(!e.url.includes("?"), e.url);
      assert.ok(!e.url.includes("#"), e.url);
    }
  });

  it("excludes noindex paths", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const urls = buildSitemapEntries().map((e) => new URL(e.url).pathname);
    for (const path of NOINDEX_PATHS) {
      assert.ok(!urls.includes(path), `sitemap must not include noindex path ${path}`);
    }
  });

  it("includes every published blog slug", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const urls = new Set(buildSitemapEntries().map((e) => e.url));
    for (const post of BLOG_POSTS) {
      assert.ok(urls.has(`https://zoveto.com/blog/${post.slug}`), post.slug);
    }
  });
});
