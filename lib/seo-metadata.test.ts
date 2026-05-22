import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildPageMetadata } from "@/lib/seo-metadata";

describe("seo-metadata", () => {
  it("sets noindex for signup via crawl policy", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const meta = buildPageMetadata({
      pathname: "/signup",
      title: "Signup",
      description: "Signup page",
    });
    const robots = meta.robots;
    assert.ok(robots && typeof robots === "object");
    assert.equal(robots.index, false);
    assert.equal(robots.follow, false);
    assert.equal(meta.alternates?.canonical, "https://zoveto.com/signup");
  });

  it("sets indexable defaults for marketing pages", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const meta = buildPageMetadata({
      pathname: "/pricing",
      title: "Pricing",
      description: "Plans and pricing",
      index: true,
    });
    const robots = meta.robots;
    assert.ok(robots && typeof robots === "object");
    assert.equal(robots.index, true);
    assert.equal(meta.alternates?.canonical, "https://zoveto.com/pricing");
  });
});
