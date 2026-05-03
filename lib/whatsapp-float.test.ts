import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getWhatsAppFloatHref, WHATSAPP_FLOAT_PHONE } from "@/lib/whatsapp-float";

describe("whatsapp-float", () => {
  it("builds api.whatsapp.com send URL with phone and prefilled message", () => {
    const href = getWhatsAppFloatHref();
    const u = new URL(href);
    assert.equal(u.origin + u.pathname, "https://api.whatsapp.com/send/");
    assert.equal(u.searchParams.get("phone"), WHATSAPP_FLOAT_PHONE);
    assert.ok(u.searchParams.get("text")?.includes("Zoveto team"));
    assert.equal(u.searchParams.get("type"), "phone_number");
    assert.equal(u.searchParams.get("app_absent"), "0");
  });
});
