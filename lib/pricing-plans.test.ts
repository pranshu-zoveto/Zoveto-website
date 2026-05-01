import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { MARKETING_PRICING_PLANS } from "./pricing-plans";
import { DEFAULT_BILLING_CYCLE, PAID_PLAN_PRICING } from "./pricing-display";

describe("MARKETING_PRICING_PLANS", () => {
  it("has four plans in display order", () => {
    assert.equal(MARKETING_PRICING_PLANS.length, 4);
    const ids = MARKETING_PRICING_PLANS.map((p) => p.id);
    assert.deepEqual(ids, ["free", "starter", "growth", "enterprise"]);
  });

  it("positions Free as testing-only (subtitle)", () => {
    const free = MARKETING_PRICING_PLANS.find((p) => p.id === "free");
    assert.ok(free);
    assert.equal(free!.subtitle, "Best for testing the system");
  });

  it("positions Starter with daily-ops subtitle under plan name", () => {
    const starter = MARKETING_PRICING_PLANS.find((p) => p.id === "starter");
    assert.ok(starter);
    assert.equal(starter!.subtitle, "Run your daily operations in one system");
  });

  it("positions Growth with workflow subtitle under plan name", () => {
    const growth = MARKETING_PRICING_PLANS.find((p) => p.id === "growth");
    assert.ok(growth);
    assert.equal(growth!.subtitle, "Automate workflows and scale your team");
  });

  it("marks Growth as popular", () => {
    const growth = MARKETING_PRICING_PLANS.find((p) => p.id === "growth");
    assert.ok(growth);
    assert.equal(growth!.popular, true);
    const others = MARKETING_PRICING_PLANS.filter((p) => p.id !== "growth");
    assert.ok(others.every((p) => p.popular === false));
  });

  it("Free, Starter, and Growth have public INR pricing; Enterprise is contact-led", () => {
    for (const p of MARKETING_PRICING_PLANS) {
      if (p.id === "free" || p.id === "starter" || p.id === "growth") {
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

  it("uses one canonical starter/growth pricing table", () => {
    const starter = MARKETING_PRICING_PLANS.find((p) => p.id === "starter");
    const growth = MARKETING_PRICING_PLANS.find((p) => p.id === "growth");
    assert.ok(starter?.pricing);
    assert.ok(growth?.pricing);
    assert.equal(starter!.pricing!.listMonthly, PAID_PLAN_PRICING.starter.monthly);
    assert.equal(starter!.pricing!.effectiveMonthlyAnnual, PAID_PLAN_PRICING.starter.yearlyEffective);
    assert.equal(growth!.pricing!.listMonthly, PAID_PLAN_PRICING.growth.monthly);
    assert.equal(growth!.pricing!.effectiveMonthlyAnnual, PAID_PLAN_PRICING.growth.yearlyEffective);
  });

  it("defaults billing to yearly", () => {
    assert.equal(DEFAULT_BILLING_CYCLE, "yearly");
  });

  it("keeps headline price + /mo from breaking mid-suffix (Growth yearly alignment)", () => {
    const src = readFileSync(join(process.cwd(), "components/pricing/PlanPriceBlock.tsx"), "utf8");
    assert.ok(!src.includes("[overflow-wrap:anywhere]"), "overflow-wrap:anywhere can split /mo");
    assert.ok(src.includes("whitespace-nowrap"), "price + /mo should stay on one line");
  });

  it("Free tier stack says testing scope, not full-access marketing", () => {
    const src = readFileSync(join(process.cwd(), "components/pricing/PlanPriceBlock.tsx"), "utf8");
    assert.ok(src.includes("Not for running a business"));
    assert.ok(!src.includes("Full access. No commitment."));
  });
});
