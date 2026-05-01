import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllProofSlugs,
  getProofBySlug,
  getProofsForModuleSlug,
  operationalProofs,
} from "@/lib/operational-proof";

describe("operational-proof data", () => {
  it("has unique slugs", () => {
    const slugs = operationalProofs.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("getAllProofSlugs matches operationalProofs", () => {
    assert.deepEqual(
      getAllProofSlugs().sort(),
      operationalProofs.map((p) => p.slug).sort()
    );
  });

  it("each proof has required non-empty fields for listing and detail", () => {
    for (const p of operationalProofs) {
      assert.ok(p.slug.length > 0);
      assert.ok(p.industryTag.length > 0);
      assert.ok(p.title.length > 0);
      assert.ok(p.before.length > 0);
      assert.ok(p.after.length > 0);
      assert.ok(p.systemActions.length > 0);
      assert.ok(p.outcomeMetrics.length > 0);
      assert.ok(p.ctaLabel.length > 0);
      assert.ok(p.problemSummary.length > 0);
      assert.ok(p.metaTitle.length > 0);
      assert.ok(p.metaDescription.length > 0);
      assert.ok(p.currentRealitySteps.length > 0);
      assert.ok(p.redesignSteps.length > 0);
      assert.ok(p.insideZoveto.length > 0);
      assert.ok(p.impactMetrics.length > 0);
      for (const im of p.impactMetrics) {
        assert.ok(im.metric.length > 0);
        assert.ok(im.context.length > 0);
      }
    }
  });

  it("getProofBySlug returns proof for known slugs", () => {
    for (const slug of getAllProofSlugs()) {
      const got = getProofBySlug(slug);
      assert.ok(got);
      assert.equal(got!.slug, slug);
    }
  });

  it("getProofBySlug returns undefined for unknown slug", () => {
    assert.equal(getProofBySlug("nonexistent-slug-xyz"), undefined);
  });

  it("getProofsForModuleSlug returns proofs for known module slugs", () => {
    assert.ok(getProofsForModuleSlug("crm").length > 0);
    assert.ok(getProofsForModuleSlug("inventory").length > 0);
  });
});
