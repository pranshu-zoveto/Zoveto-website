import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveSlugParams } from "@/lib/resolve-slug-params";

describe("resolveSlugParams", () => {
  it("unwraps a plain params object (Next 14)", async () => {
    const { slug } = await resolveSlugParams({ slug: "inventory" });
    assert.equal(slug, "inventory");
  });

  it("unwraps a Promise params object (Next 15+)", async () => {
    const { slug } = await resolveSlugParams(Promise.resolve({ slug: "crm" }));
    assert.equal(slug, "crm");
  });
});
