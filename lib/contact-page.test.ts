import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { getContactPhoneDisplay } from "./whatsapp-float";

describe("contact page wiring", () => {
  const contactSrc = fs.readFileSync(
    path.join(process.cwd(), "app/(marketing)/contact/ContactClient.tsx"),
    "utf8",
  );

  it("exposes phone, WhatsApp, email, and response SLA", () => {
    assert.match(contactSrc, /getContactPhoneDisplay/);
    assert.match(contactSrc, /getWhatsAppFloatHref/);
    assert.match(contactSrc, /LEAD_STAFF_INBOX/);
    assert.match(contactSrc, /Business-hours response: under 4 hours/);
    assert.match(contactSrc, /Monday to Friday, 10:00 AM/);
    assert.match(contactSrc, /CONTACT_PHONE_TEL/);
  });

  it("tracks contact method clicks without PII keys", () => {
    assert.match(contactSrc, /phone_click/);
    assert.match(contactSrc, /whatsapp_click/);
    assert.match(contactSrc, /email_click/);
    assert.doesNotMatch(contactSrc, /trackMarketingEvent\([^)]*email:/);
  });

  it("uses public phone display helper", () => {
    assert.equal(getContactPhoneDisplay(), "+91 92173 80146");
  });
});
