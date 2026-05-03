import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PUBLIC_INDUSTRY_SLUGS,
  getIndustryBySlug,
  getPublicIndustries,
  industries,
  industryCopyPlainText,
  isPublicIndustrySlug,
} from "@/lib/industries";
import { SPARE_PARTS_PHASE1_META, sparePartsPhase1WordCount } from "@/lib/phase1-spare-parts-industry";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

describe("lib/industries", () => {
  it("exports exactly four public slugs in stable order", () => {
    assert.deepEqual([...PUBLIC_INDUSTRY_SLUGS], [
      "manufacturing",
      "distribution",
      "spare-parts-trading",
      "warehousing",
    ]);
    assert.equal(industries.length, 4);
    assert.equal(getPublicIndustries().length, 4);
  });

  it("getIndustryBySlug resolves each public slug", () => {
    for (const slug of PUBLIC_INDUSTRY_SLUGS) {
      const row = getIndustryBySlug(slug);
      assert.ok(row, slug);
      assert.equal(row!.slug, slug);
      assert.ok(isPublicIndustrySlug(slug));
    }
    assert.equal(isPublicIndustrySlug("pharma"), false);
  });

  it("meta titles follow Manufacturing ERP Software | Zoveto pattern", () => {
    for (const ind of industries) {
      assert.match(ind.metaTitle, /\bERP Software \| Zoveto$/);
      assert.match(ind.metaDescription, /one system/i);
      assert.match(ind.metaDescription, /Inventory, orders, dispatch, and finance/i);
    }
  });

  it("each vertical has minimum copy depth for SEO body (600+ words concatenated)", () => {
    for (const ind of industries) {
      const n = wordCount(industryCopyPlainText(ind));
      assert.ok(
        n >= 600,
        `${ind.slug} expected >= 600 words in industryCopyPlainText, got ${n}`,
      );
    }
  });

  it("spare-parts-trading phase-1 SEO block meets long-form depth and meta constraints", () => {
    const n = sparePartsPhase1WordCount();
    assert.ok(n >= 1200, `spare parts phase1 expected >= 1200 words, got ${n}`);
    assert.ok(SPARE_PARTS_PHASE1_META.metaTitle.length <= 60);
    const dlen = SPARE_PARTS_PHASE1_META.metaDescription.length;
    assert.ok(dlen >= 150 && dlen <= 160, `metaDescription length ${dlen} not in [150,160]`);
  });

  it("each industry has AEO directAnswer and at least five FAQs", () => {
    for (const ind of industries) {
      assert.ok(ind.directAnswer.length >= 40, ind.slug);
      assert.ok(ind.faqs.length >= 5, ind.slug);
      const qs = ind.faqs.map((f) => f.q);
      assert.equal(new Set(qs).size, qs.length, `${ind.slug}: unique FAQ questions`);
    }
  });

  it("each industry has five module playbooks and system flow steps", () => {
    for (const ind of industries) {
      assert.equal(ind.modulePlaybooks.length, 5);
      assert.ok(ind.systemFlowSteps.length >= 5);
      assert.ok(ind.outcomes.length >= 3);
      assert.ok(ind.proofPoints.length >= 2);
      assert.ok(ind.homepageFeatures.length >= 3);
      for (const p of ind.modulePlaybooks) {
        assert.ok(p.href.startsWith("/"));
        assert.ok(p.body.length > 80);
      }
    }
  });
});
