import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { buildSitemapEntries } from "@/app/sitemap";
import { getAllProofSlugs } from "@/lib/operational-proof";

describe("sitemap buildSitemapEntries", () => {
  const prev = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = prev;
  });

  it("emits only https zoveto.com URLs when env unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const entries = buildSitemapEntries();
    assert.ok(entries.length > 8, "expected many URLs");

    for (const e of entries) {
      assert.ok(e.url.startsWith("https://zoveto.com"), e.url);
      assert.ok(!e.url.includes("localhost"), e.url);
      assert.ok(!e.url.includes("127.0.0.1"), e.url);
      assert.ok(!e.url.includes("www.zoveto.com"), e.url);
      assert.ok(!e.url.includes("/login"), `unexpected login: ${e.url}`);
      assert.ok(!e.url.includes("/case-studies"), `legacy path should not appear: ${e.url}`);
    }

    assert.ok(entries.some((e) => e.url === "https://zoveto.com/team"));
    assert.ok(entries.some((e) => e.url === "https://zoveto.com/operational-proof"));
    for (const slug of getAllProofSlugs()) {
      assert.ok(entries.some((e) => e.url === `https://zoveto.com/operational-proof/${slug}`), slug);
    }

    assert.ok(entries.some((e) => e.url === "https://zoveto.com/system"));
  });

  it("respects NEXT_PUBLIC_SITE_URL override", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://staging.example.com";
    const entries = buildSitemapEntries();
    assert.ok(entries.every((e) => e.url.startsWith("https://staging.example.com")));
  });

  it("sets blog lastModified from published dates", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const entries = buildSitemapEntries().filter((e) => e.url.includes("/blog/") && !e.url.endsWith("/blog"));
    assert.ok(entries.length > 0);
    for (const e of entries) {
      assert.ok(e.lastModified, e.url);
      const s = typeof e.lastModified === "string" ? e.lastModified : e.lastModified.toISOString();
      assert.match(s, /^\d{4}-\d{2}-\d{2}T/);
    }
  });
});
