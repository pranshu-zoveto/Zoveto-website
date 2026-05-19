import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BLOG_POSTS, getAllBlogSlugs, getBlogPost, formatBlogDate } from "./blog-posts";

describe("blog-posts", () => {
  it("has unique slugs", () => {
    const slugs = getAllBlogSlugs();
    assert.equal(new Set(slugs).size, slugs.length);
    for (const s of slugs) {
      assert.ok(/^[a-z0-9-]+$/.test(s), `slug safe: ${s}`);
    }
  });

  it("each post resolves by slug and has required fields", () => {
    for (const p of BLOG_POSTS) {
      assert.equal(getBlogPost(p.slug), p);
      assert.ok(p.title.length > 0, `title ${p.slug}`);
      assert.ok(p.subtitle.length > 0, `subtitle ${p.slug}`);
      assert.ok(p.excerpt.length >= 40, `excerpt ${p.slug}`);
      assert.match(p.date, /^\d{4}-\d{2}-\d{2}$/, `date ISO ${p.slug}`);
      assert.ok(p.readingTime.length > 0, `readingTime ${p.slug}`);
      assert.ok(p.category.length > 0, `category ${p.slug}`);
      assert.ok(Array.isArray(p.tags), `tags ${p.slug}`);
    }
  });

  it("formats blog dates for en-IN display", () => {
    const s = formatBlogDate("2026-05-10");
    assert.match(s, /2026/);
    assert.match(s, /May|5/);
  });

  it("includes the Company Operating System guide", () => {
    const p = getBlogPost("what-is-company-operating-system");
    assert.ok(p);
    assert.ok(p!.title.includes("Company Operating System"));
  });

  it("includes the Zoho One architecture comparison", () => {
    const p = getBlogPost("zoho-one-vs-zoveto-architecture");
    assert.ok(p);
    assert.ok(p!.title.includes("Zoho One"));
    assert.equal(p!.category, "Comparisons");
  });

  it("includes the GST ERP India 2026 guide", () => {
    const p = getBlogPost("gst-erp-software-india-2026");
    assert.ok(p);
    assert.ok(p!.title.includes("GST ERP"));
    assert.equal(p!.category, "ERP Guide");
  });
});
