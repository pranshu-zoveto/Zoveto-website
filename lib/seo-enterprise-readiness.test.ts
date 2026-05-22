import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PAID_PLAN_PRICING } from "@/lib/pricing-display";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { buildSitemapEntries } from "@/lib/seo-sitemap";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { ProductSoftwareApplicationSchema } from "@/components/seo/ProductSoftwareApplicationSchema";

describe("enterprise seo/aeo readiness", () => {
  it("keeps blog metadata with excerpts suitable for SERP snippets", () => {
    for (const post of BLOG_POSTS) {
      assert.ok(post.excerpt.length >= 40, `excerpt should be substantive for ${post.slug}`);
      assert.ok(post.title.length >= 10, `title for ${post.slug}`);
    }
  });

  it("ships competitor comparison pages and includes them in sitemap", () => {
    assert.equal(COMPARE_PAGES.length, 8, "Expected 8 competitor pages after growth update");
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
    const starter = offers.find((o) => o.name === "Starter") as Record<string, unknown> | undefined;
    assert.equal(starter?.price, String(PAID_PLAN_PRICING.starter.yearlyEffective));
    const growth = offers.find((o) => o.name === "Growth") as Record<string, unknown> | undefined;
    assert.equal(growth?.price, String(PAID_PLAN_PRICING.growth.yearlyEffective));
  });
});
