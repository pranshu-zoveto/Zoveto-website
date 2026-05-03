import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COMPARE_PAGES,
  COMPARE_TABLE_ROW_COUNT,
  comparePageH1,
  getComparePageAeoLead,
  getComparePageBySlug,
  getComparePageFaqs,
} from "@/lib/compare-pages";
import { phase1CompareWordCount } from "@/lib/phase1-compare-zoho-tally";

const REQUIRED_SLUGS = ["zoho-vs-zoveto", "tally-vs-zoveto", "odoo-vs-zoveto"] as const;

describe("compare-pages", () => {
  it("includes high-intent slugs and unique competitors", () => {
    const slugs = COMPARE_PAGES.map((p) => p.slug);
    for (const s of REQUIRED_SLUGS) {
      assert.ok(slugs.includes(s), `missing slug ${s}`);
    }
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("each page has full structure, non-empty copy, and table row count", () => {
    for (const page of COMPARE_PAGES) {
      assert.ok(page.slug.length > 3);
      assert.ok(page.competitor.length > 1);
      assert.ok(page.description.length > 40);
      assert.ok(page.hubLens.trim().length >= 8, `${page.slug}: hubLens`);
      assert.ok(page.hubTeaser.trim().length >= 80, `${page.slug}: hubTeaser length`);
      assert.ok(page.keywords.length >= 3);

      if (page.phase1) {
        assert.ok(page.phase1.h1.length > 24);
        assert.ok(page.phase1.h1.includes("Zoveto") || page.phase1.h1.includes("zoveto"));
        assert.ok(page.phase1.metaTitle.length > 10 && page.phase1.metaTitle.length <= 60);
        const dlen = page.phase1.metaDescription.length;
        assert.ok(dlen >= 150 && dlen <= 160, `metaDescription length ${dlen} not in [150,160]`);
        assert.ok(page.phase1.faqs.length >= 5 && page.phase1.faqs.length <= 7);
        const wc = phase1CompareWordCount(page.phase1);
        assert.ok(wc >= 1200, `${page.slug} phase1 word count ${wc} expected >= 1200`);
      } else {
        const h1 = comparePageH1(page.competitor);
        assert.ok(h1.includes("Zoveto vs"));
        assert.ok(h1.includes(page.competitor));
        assert.ok(h1.includes("Which system is right for your business?"));
      }

      assert.ok(page.hero.subtext.length > 20);
      assert.ok(page.hero.primaryCta.label.length > 2);
      assert.ok(page.hero.secondaryCta.label.length > 2);

      assert.ok(page.quickSummary.zoveto.length >= 3);
      assert.ok(page.quickSummary.competitor.length >= 3);
      const kinds = page.quickSummary.competitor.map((b) => b.kind);
      assert.ok(kinds.includes("strength"), `${page.slug}: competitor summary should credit a strength`);
      assert.ok(kinds.includes("gap"), `${page.slug}: competitor summary should note at least one gap`);
      for (const b of page.quickSummary.competitor) {
        assert.ok(b.text.trim().length > 10);
      }

      assert.ok(page.tableRows.length >= COMPARE_TABLE_ROW_COUNT);
      for (const row of page.tableRows) {
        assert.ok(row.name.trim().length > 2);
        assert.ok(row.zoveto.trim().length > 5);
        assert.ok(row.competitor.trim().length > 5);
      }

      assert.ok(page.whoShouldUse.chooseZoveto.length >= 2);
      assert.ok(page.whoShouldUse.chooseCompetitor.length >= 2);

      assert.ok(page.workflow.zoveto.length > 40);
      assert.ok(page.workflow.competitor.length > 40);

      assert.ok(page.limitations.length >= 1);
      assert.ok(page.finalVerdict.length >= 1);

      assert.ok(page.ctaClosing.headline.length > 5);

      const faqs = getComparePageFaqs(page);
      assert.ok(faqs.length >= 5, `${page.slug}: at least 5 FAQs`);
      const qs = faqs.map((f) => f.q);
      assert.equal(new Set(qs).size, qs.length, `${page.slug}: unique FAQ questions`);
      for (const f of faqs) {
        assert.ok(f.q.trim().length > 10);
        assert.ok(f.a.trim().length > 40);
      }
      const lead = getComparePageAeoLead(page);
      assert.ok(lead.length >= 40, `${page.slug}: AEO lead`);
    }
  });

  it("getComparePageBySlug resolves known slugs", () => {
    assert.ok(getComparePageBySlug("zoho-vs-zoveto"));
    assert.equal(getComparePageBySlug("unknown-slug"), undefined);
  });

  it("compare hub teasers are unique per competitor (no shared index boilerplate)", () => {
    const teasers = COMPARE_PAGES.map((p) => p.hubTeaser.trim());
    assert.equal(new Set(teasers).size, teasers.length);
    const lenses = COMPARE_PAGES.map((p) => p.hubLens.trim().toLowerCase());
    assert.equal(new Set(lenses).size, lenses.length);
  });
});
