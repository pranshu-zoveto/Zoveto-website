import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  STRIP_FRAGMENT_IDS,
  STRIP_MODULES,
  stripModuleIndexForFragment,
} from "@/components/sections/system-modules/stripModules";

describe("system strip modules", () => {
  it("keeps six modules in product order", () => {
    assert.equal(STRIP_MODULES.length, 6);
    assert.deepEqual(
      STRIP_MODULES.map((m) => m.id),
      ["core-erp", "operations", "sales-crm", "finance", "people", "intelligence"]
    );
  });

  it("indexes 01..06", () => {
    assert.deepEqual(
      STRIP_MODULES.map((m) => m.index),
      ["01", "02", "03", "04", "05", "06"]
    );
  });

  it("maps each strip card to the correct module route", () => {
    assert.deepEqual(
      STRIP_MODULES.map((m) => m.href),
      [
        "/modules/inventory",
        "/modules/wms",
        "/modules/crm",
        "/modules/finance",
        "/modules/hrms",
        "/modules/analytics",
      ]
    );
  });

  it("assigns legacy fragment ids to ERP, CRM, and AI only", () => {
    const withFrag = STRIP_MODULES.filter((m) => m.fragmentId);
    assert.equal(withFrag.length, 3);
    assert.equal(withFrag[0]!.fragmentId, "zoveto-erp");
    assert.equal(withFrag[1]!.fragmentId, "zoveto-crm");
    assert.equal(withFrag[2]!.fragmentId, "zoveto-ai");
    assert.ok(STRIP_FRAGMENT_IDS.includes("zoveto-erp"));
    assert.ok(STRIP_FRAGMENT_IDS.includes("zoveto-crm"));
    assert.ok(STRIP_FRAGMENT_IDS.includes("zoveto-ai"));
  });

  it("maps fragments to strip indices for deep links", () => {
    assert.equal(stripModuleIndexForFragment("zoveto-erp"), 0);
    assert.equal(stripModuleIndexForFragment("zoveto-crm"), 2);
    assert.equal(stripModuleIndexForFragment("zoveto-ai"), 5);
    assert.equal(stripModuleIndexForFragment("unknown"), 0);
  });

  it("keeps taglines short (plan: scannable one-liners)", () => {
    for (const m of STRIP_MODULES) {
      const words = m.tagline.trim().split(/\s+/).length;
      assert.ok(words <= 16, `${m.id}: tagline too long (${words} words)`);
    }
  });

  it("uses readable text tokens on shared gradient tile surface", () => {
    const hex = /^#[0-9A-Fa-f]{6}$/;

    for (const m of STRIP_MODULES) {
      assert.ok(hex.test(m.palette.heading), `${m.id}: heading must be #RRGGBB`);
      assert.ok(
        /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)$/.test(m.palette.subtext.trim()),
        `${m.id}: subtext must be rgba(..., opacity)`
      );
    }
  });
});
