import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isSitemapExcludedPath, normalizePathname, SITEMAP_EXCLUDED_PATHS } from "@/lib/seo-crawl-policy";

describe("seo-crawl-policy", () => {
  it("excludes redirect-only paths from sitemap", () => {
    for (const path of SITEMAP_EXCLUDED_PATHS) {
      assert.equal(isSitemapExcludedPath(path), true, path);
    }
    assert.equal(isSitemapExcludedPath("/operational-proof"), false);
    assert.equal(isSitemapExcludedPath("/case-studies/rock-tear-parts"), false);
  });

  it("normalizes pathnames for canonical comparison", () => {
    assert.equal(normalizePathname("/Pricing/"), "/pricing");
    assert.equal(normalizePathname("/"), "/");
  });
});
