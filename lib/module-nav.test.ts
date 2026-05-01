import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getModuleNavLinks, MODULE_NAV_SLUGS } from "@/lib/module-nav";

describe("module nav", () => {
  it("uses canonical slug order", () => {
    assert.deepEqual(MODULE_NAV_SLUGS, [
      "inventory",
      "wms",
      "crm",
      "finance",
      "analytics",
      "hrms",
    ]);
  });

  it("maps slugs to hrefs and HRMS label", () => {
    const links = getModuleNavLinks();
    assert.equal(links.length, 6);
    assert.deepEqual(
      links.map((l) => l.slug),
      [...MODULE_NAV_SLUGS]
    );
    assert.deepEqual(
      links.map((l) => l.href),
      [
        "/modules/inventory",
        "/modules/wms",
        "/modules/crm",
        "/modules/finance",
        "/modules/analytics",
        "/modules/hrms",
      ]
    );
    const hrms = links.find((l) => l.slug === "hrms");
    assert.ok(hrms);
    assert.equal(hrms!.name, "HRMS (People & Payroll)");
  });
});
