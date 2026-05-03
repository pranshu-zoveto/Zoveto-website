import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildLeadSmtpPayload, LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";

describe("lead-intake-mail", () => {
  it("returns null without a valid email", () => {
    assert.equal(buildLeadSmtpPayload({}), null);
    assert.equal(buildLeadSmtpPayload({ email: "" }), null);
    assert.equal(buildLeadSmtpPayload({ email: "not-an-email" }), null);
  });

  it("builds footer product-updates subject when painPoint mentions source", () => {
    const p = buildLeadSmtpPayload({
      email: "u@example.com",
      fullName: "Product Updates Subscriber",
      organization: "Website product updates",
      painPoint: "Requested updates\n\nSource: footer_product_updates",
    });
    assert.ok(p);
    assert.match(p!.subject, /Product updates — u@example\.com/);
    assert.equal(p!.replyTo, "u@example.com");
    assert.match(p!.text, /footer_product_updates/);
  });

  it("defaults organization and uses generic lead subject", () => {
    const p = buildLeadSmtpPayload({
      email: "a@b.co",
      fullName: "Jane",
      painPoint: "Hello",
    });
    assert.ok(p);
    assert.match(p!.subject, /Lead — Website lead/);
    assert.match(p!.text, /Jane/);
  });

  it("exports staff inbox constant for copy/docs parity", () => {
    assert.equal(LEAD_STAFF_INBOX, "info@zoveto.com");
  });
});
