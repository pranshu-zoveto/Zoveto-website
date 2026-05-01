import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MODULES } from "@/components/sections/dashboard/moduleData";
import { STRIP_MODULES } from "@/components/sections/system-modules/stripModules";
import { TEAM_SECTION_INTRO } from "@/lib/team";

describe("global-neutral marketing copy (final_COMPLETE 2.1 baseline)", () => {
  it("keeps sales CRM hero body as multi-channel, not WhatsApp-only", () => {
    const crm = MODULES.find((m) => m.id === "sales-crm");
    assert.ok(crm);
    assert.match(crm!.body, /WhatsApp,\s*email,\s*or\s*SMS/i);
    assert.ok(crm!.bullets.some((b) => /WhatsApp,\s*email,\s*SMS/i.test(b)));
  });

  it("uses compliance wording on finance strip tile (not GST hero tagline)", () => {
    const fin = STRIP_MODULES.find((m) => m.id === "finance");
    assert.ok(fin);
    assert.match(fin!.tagline, /compliance/i);
    assert.doesNotMatch(fin!.tagline, /\bGST\b/);
  });

  it("keeps leadership intro globally framed", () => {
    assert.match(TEAM_SECTION_INTRO, /operating system/i);
    assert.doesNotMatch(TEAM_SECTION_INTRO, /Indian businesses/i);
  });
});
