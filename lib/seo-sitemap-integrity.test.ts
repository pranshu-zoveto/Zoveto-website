import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { buildSitemapEntries } from "@/app/sitemap";
import { SITEMAP_EXCLUDED_PATHS } from "@/lib/seo-crawl-policy";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { modules } from "@/lib/modules";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { getAllProofSlugs } from "@/lib/operational-proof";
import { SEO_LANDING_PATHS } from "@/lib/seo-landings";
import { PUBLIC_INDUSTRY_SLUGS } from "@/lib/industries";

describe("sitemap integrity", () => {
  it("never includes redirect-only paths", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const urls = buildSitemapEntries().map((e) => new URL(e.url).pathname);
    for (const excluded of SITEMAP_EXCLUDED_PATHS) {
      assert.ok(!urls.includes(excluded), `sitemap must not include ${excluded}`);
    }
  });

  it("includes all public marketing surfaces", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const urls = new Set(buildSitemapEntries().map((e) => e.url));

    const required = [
      "https://zoveto.com/",
      "https://zoveto.com/pricing",
      "https://zoveto.com/product",
      "https://zoveto.com/contact",
      "https://zoveto.com/faq",
    ];
    for (const url of required) {
      assert.ok(urls.has(url), `missing ${url}`);
    }

    for (const path of SEO_LANDING_PATHS) {
      assert.ok(urls.has(`https://zoveto.com${path}`), `missing seo landing ${path}`);
    }
    for (const m of modules) {
      assert.ok(urls.has(`https://zoveto.com/modules/${m.slug}`), `missing module ${m.slug}`);
    }
    for (const slug of getAllProofSlugs()) {
      assert.ok(urls.has(`https://zoveto.com/operational-proof/${slug}`), `missing proof ${slug}`);
    }
    for (const page of COMPARE_PAGES) {
      assert.ok(urls.has(`https://zoveto.com/compare/${page.slug}`), `missing compare ${page.slug}`);
    }
    for (const slug of PUBLIC_INDUSTRY_SLUGS) {
      assert.ok(urls.has(`https://zoveto.com/industries/${slug}`), `missing industry ${slug}`);
    }
    for (const post of BLOG_POSTS) {
      assert.ok(urls.has(`https://zoveto.com/blog/${post.slug}`), `missing blog ${post.slug}`);
    }
  });

  it("next.config redirects www to apex", () => {
    const src = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8");
    assert.ok(src.includes("www.zoveto.com"), "must redirect www host to apex");
    assert.ok(src.includes("permanent: true"), "www redirect must be permanent");
  });
});
