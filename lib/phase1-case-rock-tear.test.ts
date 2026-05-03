import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ROCK_TEAR_META, rockTearCaseWordCount } from "@/lib/phase1-case-rock-tear";

describe("phase1-case-rock-tear", () => {
  it("meets long-form depth and meta length constraints", () => {
    const n = rockTearCaseWordCount();
    assert.ok(n >= 1200, `expected >= 1200 words, got ${n}`);
    assert.ok(ROCK_TEAR_META.metaTitle.length <= 60);
    const dlen = ROCK_TEAR_META.metaDescription.length;
    assert.ok(dlen >= 150 && dlen <= 160, `metaDescription length ${dlen} not in [150,160]`);
  });
});
