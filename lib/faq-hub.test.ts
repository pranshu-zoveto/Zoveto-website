import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FAQ_HUB_CATEGORIES, filterFaqHubByQuery, getAllFaqHubItems } from "./faq-hub";

describe("faq-hub", () => {
  it("has at least 30 unique questions across categories", () => {
    const all = getAllFaqHubItems();
    assert.ok(all.length >= 30, `expected >=30 FAQs, got ${all.length}`);
    const qs = all.map((x) => x.question);
    assert.equal(new Set(qs).size, qs.length, "FAQ questions must be unique");
    for (const item of all) {
      assert.ok(item.question.trim().length > 12);
      assert.ok(item.answer.trim().length > 40);
    }
  });

  it("has non-empty categories", () => {
    assert.ok(FAQ_HUB_CATEGORIES.length >= 4);
    for (const c of FAQ_HUB_CATEGORIES) {
      assert.ok(c.id.length > 1);
      assert.ok(c.title.length > 3);
      assert.ok(c.items.length >= 1);
    }
  });

  it("filterFaqHubByQuery returns all categories when query empty", () => {
    const r = filterFaqHubByQuery("");
    assert.equal(r.length, FAQ_HUB_CATEGORIES.length);
  });

  it("filterFaqHubByQuery narrows to GST-related categories", () => {
    const r = filterFaqHubByQuery("gst");
    assert.ok(r.length >= 1);
    assert.ok(r.some((c) => c.id === "gst-accounting"));
    for (const c of r) {
      for (const item of c.items) {
        const blob = `${item.question} ${item.answer}`.toLowerCase();
        assert.ok(blob.includes("gst"));
      }
    }
  });
});
