import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { MARKETING_PRICING_PLANS } from "./pricing-plans";
import { DEFAULT_BILLING_CYCLE } from "./pricing-display";

describe("MARKETING_PRICING_PLANS", () => {
  it("has three plans in display order", () => {
    assert.equal(MARKETING_PRICING_PLANS.length, 3);
    const ids = MARKETING_PRICING_PLANS.map((p) => p.id);
    assert.deepEqual(ids, ["operations-suite", "business-os", "enterprise"]);
  });

  it("Operations Suite has core stack subtitle", () => {
    const plan = MARKETING_PRICING_PLANS.find((p) => p.id === "operations-suite");
    assert.ok(plan);
    assert.ok(plan!.subtitle?.includes("WMS"));
  });

  it("Business OS has all-modules subtitle", () => {
    const plan = MARKETING_PRICING_PLANS.find((p) => p.id === "business-os");
    assert.ok(plan);
    assert.ok(plan!.subtitle?.includes("five modules") || plan!.subtitle?.includes("5 modules") || plan!.subtitle?.includes("All five"));
  });

  it("marks Business OS as popular", () => {
    const businessOs = MARKETING_PRICING_PLANS.find((p) => p.id === "business-os");
    assert.ok(businessOs);
    assert.equal(businessOs!.popular, true);
    const others = MARKETING_PRICING_PLANS.filter((p) => p.id !== "business-os");
    assert.ok(others.every((p) => p.popular === false));
  });

  it("Operations Suite and Business OS have public INR pricing; Enterprise is contact-led", () => {
    for (const p of MARKETING_PRICING_PLANS) {
      if (p.id === "operations-suite" || p.id === "business-os") {
        assert.ok(p.pricing, `${p.id} should have pricing`);
      } else {
        assert.equal(p.pricing, null, `${p.id} should be contact-led`);
      }
    }
  });

  it("each plan has at most seven features and valid CTAs", () => {
    for (const p of MARKETING_PRICING_PLANS) {
      assert.ok(p.features.length >= 1 && p.features.length <= 7, `${p.id} feature count`);
      assert.ok(p.ctaHref === "/signup" || p.ctaHref === "/contact");
      assert.ok(p.ctaLabel.length > 0);
    }
  });

  it("bundle prices are set correctly", () => {
    const opsSuite = MARKETING_PRICING_PLANS.find((p) => p.id === "operations-suite");
    const businessOs = MARKETING_PRICING_PLANS.find((p) => p.id === "business-os");
    assert.ok(opsSuite?.pricing);
    assert.ok(businessOs?.pricing);
    assert.equal(opsSuite!.pricing!.listMonthly, 14999);
    assert.equal(businessOs!.pricing!.listMonthly, 24999);
  });

  it("defaults billing to yearly", () => {
    assert.equal(DEFAULT_BILLING_CYCLE, "yearly");
  });

  it("keeps headline price + /mo from breaking mid-suffix (alignment)", () => {
    const src = readFileSync(join(process.cwd(), "components/pricing/PlanPriceBlock.tsx"), "utf8");
    assert.ok(!src.includes("[overflow-wrap:anywhere]"), "overflow-wrap:anywhere can split /mo");
    assert.ok(src.includes("whitespace-nowrap"), "price + /mo should stay on one line");
  });
});
