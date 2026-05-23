import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isNoindexPath,
  isRobotsDisallowedPath,
  isSitemapExcludedPath,
  normalizePathname,
  NOINDEX_PATHS,
  SITEMAP_EXCLUDED_PATHS,
} from "@/lib/seo-crawl-policy";

describe("seo-crawl-policy", () => {
  it("excludes redirect-only paths from sitemap", () => {
    for (const path of SITEMAP_EXCLUDED_PATHS) {
      assert.equal(isSitemapExcludedPath(path), true, path);
    }
    assert.equal(isSitemapExcludedPath("/operational-proof"), false);
    assert.equal(isSitemapExcludedPath("/operational-proof/rock-tear-parts"), false);
  });

  it("excludes noindex paths from sitemap", () => {
    for (const path of NOINDEX_PATHS) {
      assert.equal(isNoindexPath(path), true, path);
      assert.equal(isSitemapExcludedPath(path), true, path);
    }
  });

  it("rejects query-string pathnames for sitemap", () => {
    assert.equal(isSitemapExcludedPath("/pricing?utm=1"), true);
  });

  it("disallows private and utility prefixes in robots", () => {
    assert.equal(isRobotsDisallowedPath("/api/contact"), true);
    assert.equal(isRobotsDisallowedPath("/go/linkedin/abc"), true);
    assert.equal(isRobotsDisallowedPath("/signup"), true);
    assert.equal(isRobotsDisallowedPath("/pricing"), false);
  });

  it("normalizes pathnames for canonical comparison", () => {
    assert.equal(normalizePathname("/Pricing/"), "/pricing");
    assert.equal(normalizePathname("/"), "/");
  });
});
