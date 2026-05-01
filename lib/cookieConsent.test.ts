import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildAcceptAll,
  buildRejectAll,
  buildCustom,
  parseConsentPayload,
  serializeConsent,
  migrateLegacyMarketingConsent,
  readConsentFromCookie,
  hasAttributionStorageConsent,
  COOKIE_CONSENT_COOKIE_NAME,
} from "@/lib/cookieConsent";

describe("cookieConsent", () => {
  it("parses valid payload", () => {
    const p = buildCustom({ analytics: true, marketing: false });
    const round = parseConsentPayload(serializeConsent(p));
    assert.ok(round);
    assert.equal(round!.analytics, true);
    assert.equal(round!.marketing, false);
    assert.equal(round!.necessary, true);
  });

  it("rejects wrong version", () => {
    const bad = JSON.stringify({
      v: 99,
      necessary: true,
      analytics: true,
      marketing: false,
      updatedAt: "x",
    });
    assert.equal(parseConsentPayload(bad), null);
  });

  it("migrates legacy accepted/declined", () => {
    const all = migrateLegacyMarketingConsent("accepted");
    assert.ok(all);
    assert.equal(all!.analytics, true);
    assert.equal(all!.marketing, true);
    const none = migrateLegacyMarketingConsent("declined");
    assert.ok(none);
    assert.equal(none!.analytics, false);
    assert.equal(none!.marketing, false);
  });

  it("reads consent from cookie string", () => {
    const p = buildAcceptAll();
    const encoded = encodeURIComponent(serializeConsent(p));
    const cookie = `foo=1; ${COOKIE_CONSENT_COOKIE_NAME}=${encoded}; bar=2`;
    const read = readConsentFromCookie(cookie);
    assert.ok(read);
    assert.equal(read!.marketing, true);
  });

  it("attribution consent requires analytics or marketing", () => {
    assert.equal(hasAttributionStorageConsent(buildRejectAll()), false);
    assert.equal(hasAttributionStorageConsent(buildCustom({ analytics: true, marketing: false })), true);
    assert.equal(hasAttributionStorageConsent(buildCustom({ analytics: false, marketing: true })), true);
  });
});
