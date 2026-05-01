import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PRICING_PAGE_FAQ } from "@/lib/pricing-page-faq";

describe("PRICING_PAGE_FAQ", () => {
  it("has unique questions and non-empty answers", () => {
    const questions = PRICING_PAGE_FAQ.map((i) => i.question);
    assert.equal(new Set(questions).size, questions.length);
    for (const item of PRICING_PAGE_FAQ) {
      assert.ok(item.question.trim().length > 8);
      assert.ok(item.answer.trim().length > 40);
    }
  });
});
