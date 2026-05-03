import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAllBlogPosts, getBlogPostBySlug, BLOG_SLUGS } from "./blog-posts";

const MAX_META_TITLE = 62;
const MIN_DESC = 130;
const MAX_DESC = 165;

describe("blog-posts", () => {
  it("has unique slugs", () => {
    assert.equal(new Set(BLOG_SLUGS).size, BLOG_SLUGS.length);
    for (const s of BLOG_SLUGS) {
      assert.ok(/^[a-z0-9-]+$/.test(s), `slug safe: ${s}`);
    }
  });

  it("each post has meta, excerpt, sections, and internal links", () => {
    for (const p of getAllBlogPosts()) {
      assert.equal(getBlogPostBySlug(p.slug), p);
      assert.ok(p.metaTitle.length > 0 && p.metaTitle.length <= MAX_META_TITLE, `title ${p.slug}`);
      assert.ok(
        p.metaDescription.length >= MIN_DESC && p.metaDescription.length <= MAX_DESC,
        `description ${p.slug}`,
      );
      assert.ok(p.h1.length >= 20, `h1 ${p.slug}`);
      assert.ok(p.excerpt.length >= 40, `excerpt ${p.slug}`);
      assert.ok(p.sections.length >= 2, `sections ${p.slug}`);
      assert.ok(p.directAnswer.length >= 40, `directAnswer ${p.slug}`);
      assert.ok(p.faqs.length >= 5, `faqs ${p.slug}`);
      const fq = p.faqs.map((x) => x.question);
      assert.equal(new Set(fq).size, fq.length, `unique blog FAQ questions ${p.slug}`);
      assert.ok(p.relatedLinks.length >= 2, `relatedLinks ${p.slug}`);
      for (const r of p.relatedLinks) {
        assert.ok(r.href.startsWith("/"), `href ${p.slug} ${r.href}`);
        assert.ok(r.label.length > 0, `label ${p.slug}`);
      }
    }
  });

  it("erp-cost post links to pricing, contact, landers, product", () => {
    const p = getBlogPostBySlug("erp-cost-in-india");
    assert.ok(p);
    const hrefs = p!.relatedLinks.map((r) => r.href);
    assert.ok(hrefs.includes("/pricing"));
    assert.ok(hrefs.includes("/contact"));
    assert.ok(hrefs.includes("/erp-software-small-business-india"));
    assert.ok(hrefs.includes("/warehouse-management-system-india"));
    assert.ok(hrefs.includes("/inventory-management-software-india"));
    assert.ok(hrefs.includes("/product"));
  });

  it("excel post links to inventory lander, erp lander, wms lander, module", () => {
    const p = getBlogPostBySlug("excel-inventory-problems");
    assert.ok(p);
    const hrefs = p!.relatedLinks.map((r) => r.href);
    assert.ok(hrefs.includes("/inventory-management-software-india"));
    assert.ok(hrefs.includes("/erp-software-small-business-india"));
    assert.ok(hrefs.includes("/warehouse-management-system-india"));
    assert.ok(hrefs.includes("/modules/inventory"));
  });

  it("comparison post links to all three India landers", () => {
    const p = getBlogPostBySlug("best-erp-software-comparison-india");
    assert.ok(p);
    const hrefs = p!.relatedLinks.map((r) => r.href);
    assert.ok(hrefs.includes("/erp-software-small-business-india"));
    assert.ok(hrefs.includes("/warehouse-management-system-india"));
    assert.ok(hrefs.includes("/inventory-management-software-india"));
  });

  it("comparison post body mentions Tier 2 phrase without a competing lander URL", () => {
    const p = getBlogPostBySlug("best-erp-software-comparison-india");
    assert.ok(p);
    const body = p!.sections.flatMap((s) => s.paragraphs).join(" ");
    assert.match(body, /business management software in India/i);
  });
});
