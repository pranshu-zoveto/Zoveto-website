import { hasAttributionStorageConsent, readConsentClient } from "@/lib/cookieConsent";

/** @deprecated Legacy key — migrated by `readConsentClient()` into structured consent. */
export const MARKETING_COOKIE_CONSENT_KEY = "zoveto_marketing_cookie_consent_v1";

/** True when user allows non-essential attribution storage (UTM / campaign params). */
export function hasMarketingCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return hasAttributionStorageConsent(readConsentClient());
  } catch {
    return false;
  }
}
