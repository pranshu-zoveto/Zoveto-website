import test from "node:test";
import assert from "node:assert/strict";
import { bandIndexForSection, type MarketingBand } from "./marketing-bands";

test("bandIndexForSection cycles 0..3 for non-negative indices", () => {
  const expected: MarketingBand[] = [0, 1, 2, 3, 0, 1, 2, 3];
  for (let i = 0; i < expected.length; i++) {
    assert.equal(bandIndexForSection(i), expected[i]);
  }
});

test("bandIndexForSection normalizes negative indices", () => {
  assert.equal(bandIndexForSection(-1), 3);
  assert.equal(bandIndexForSection(-4), 0);
  assert.equal(bandIndexForSection(-5), 3);
});
