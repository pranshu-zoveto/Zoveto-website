import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { buildSitemapEntries } from "@/app/sitemap";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { ProductSoftwareApplicationSchema } from "@/components/seo/ProductSoftwareApplicationSchema";

function sentenceCount(text: string): number {
  const parts = text
    .split(/[.!?]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length;
}

describe("enterprise seo/aeo readiness", () => {
  it("keeps question-led blog H1s with direct-answer first paragraph", () => {
    for (const post of getAllBlogPosts()) {
      assert.match(post.h1, /\?$/, `Expected question H1 for ${post.slug}`);
      const firstParagraph = post.sections[0]?.paragraphs[0] ?? "";
      assert.ok(firstParagraph.length >= 80, `First paragraph should be substantive for ${post.slug}`);
      assert.ok(sentenceCount(firstParagraph) >= 2, `First paragraph should include at least two sentences for ${post.slug}`);
    }
  });

  it("ships competitor comparison pages and includes them in sitemap", () => {
    assert.equal(COMPARE_PAGES.length, 5, "Expected 5 competitor pages");
    const entries = buildSitemapEntries().map((entry) => entry.url);
    for (const page of COMPARE_PAGES) {
      assert.ok(entries.some((url) => url.endsWith(`/compare/${page.slug}`)), `Missing sitemap entry for /compare/${page.slug}`);
    }
  });

  it("includes contact point and social/entity signals in Organization schema", () => {
    const script = OrganizationSchema();
    assert.ok(script?.props?.dangerouslySetInnerHTML?.__html, "Organization schema should render JSON-LD");
    const payload = JSON.parse(script.props.dangerouslySetInnerHTML.__html) as Record<string, unknown>;
    assert.equal(payload["@type"], "Organization");
    assert.ok(Array.isArray(payload["sameAs"]), "sameAs should be an array");
    assert.ok((payload["sameAs"] as string[]).some((item) => item.includes("g2.com")), "Expected G2 in sameAs");
    assert.ok(payload["contactPoint"], "Expected contactPoint");
  });

  it("includes Starter and Growth offers in SoftwareApplication schema", () => {
    const script = ProductSoftwareApplicationSchema();
    assert.ok(script?.props?.dangerouslySetInnerHTML?.__html, "SoftwareApplication schema should render JSON-LD");
    const payload = JSON.parse(script.props.dangerouslySetInnerHTML.__html) as Record<string, unknown>;
    assert.equal(payload["@type"], "SoftwareApplication");
    const offers = payload["offers"] as Array<Record<string, string>>;
    assert.ok(Array.isArray(offers) && offers.length >= 2, "Expected multiple offers");
    const names = offers.map((offer) => offer.name);
    assert.ok(names.includes("Starter"), "Missing Starter offer");
    assert.ok(names.includes("Growth"), "Missing Growth offer");
  });
});
