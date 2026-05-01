import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { slidingWindowHit, type SlidingWindowState } from "./rate-limit";

describe("slidingWindowHit", () => {
  it("allows up to max hits within the window", () => {
    const state: SlidingWindowState = { hits: [] };
    const w = 60_000;
    const max = 3;
    assert.equal(slidingWindowHit(state, 1_000, w, max).ok, true);
    assert.equal(slidingWindowHit(state, 2_000, w, max).ok, true);
    assert.equal(slidingWindowHit(state, 3_000, w, max).ok, true);
    const fourth = slidingWindowHit(state, 4_000, w, max);
    assert.equal(fourth.ok, false);
    if (!fourth.ok) assert.ok(fourth.retryAfterSec >= 1);
  });

  it("drops hits older than the window", () => {
    const state: SlidingWindowState = { hits: [] };
    const w = 10_000;
    const max = 2;
    assert.equal(slidingWindowHit(state, 0, w, max).ok, true);
    assert.equal(slidingWindowHit(state, 5_000, w, max).ok, true);
    assert.equal(slidingWindowHit(state, 11_000, w, max).ok, true);
  });
});
