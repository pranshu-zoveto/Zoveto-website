import assert from "node:assert/strict";
import test from "node:test";
import { MODULES } from "./moduleData";

const EXPECTED_IDS = ["operations", "purchase", "sales-crm", "people", "finance"] as const;

test("dashboard MODULES keeps a stable scroll order and unique ids", () => {
  assert.deepEqual(
    MODULES.map((m) => m.id),
    [...EXPECTED_IDS]
  );
  assert.equal(new Set(MODULES.map((m) => m.id)).size, MODULES.length);
});

test("dashboard MODULES ships complete copy blocks for every module", () => {
  for (const m of MODULES) {
    assert.ok(m.label.trim().length > 1);
    assert.ok(m.sub.trim().length > 4);
    assert.ok(m.headline.trim().length > 8);
    assert.ok(m.body.trim().length > 40);
    assert.equal(m.stats.length, 3);
    for (const s of m.stats) {
      assert.ok(s.value.trim().length > 0);
      assert.ok(s.label.trim().length > 0);
    }
    assert.equal(m.bullets.length, 4);
    for (const b of m.bullets) {
      assert.ok(b.trim().length > 10);
    }
    assert.ok(m.panelSide === "left" || m.panelSide === "right");
    assert.ok(/^#[0-9A-Fa-f]{6}$/.test(m.color));
  }
});

test("Operations module surfaces Warehousing as the panel eyebrow", () => {
  const ops = MODULES.find((m) => m.id === "operations");
  assert.ok(ops);
  assert.equal(ops?.eyebrow, "Warehousing");
});
