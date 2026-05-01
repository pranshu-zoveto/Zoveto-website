/**
 * GDPR / DPDP-oriented cookie consent preferences for the marketing site.
 * SSR-safe: only `parseConsentPayload`, `buildConsentPayload`, and constants run on the server.
 */

export const COOKIE_CONSENT_VERSION = 1 as const;
/** localStorage key for structured consent */
export const COOKIE_CONSENT_STORAGE_KEY = "zoveto_cookie_consent_v1";
/** First-party cookie name (mirrors localStorage for server-readable signal where needed) */
export const COOKIE_CONSENT_COOKIE_NAME = "zoveto_consent";
export const CONSENT_CHANGED_EVENT = "zoveto-consent-changed";

/** Legacy marketing-only key (migrated on read) */
export const LEGACY_MARKETING_CONSENT_KEY = "zoveto_marketing_cookie_consent_v1";

export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 6 months

export type ConsentPreferences = {
  v: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function buildRejectAll(): ConsentPreferences {
  return {
    v: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  };
}

export function buildAcceptAll(): ConsentPreferences {
  return {
    v: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  };
}

export function buildCustom(partial: Pick<ConsentPreferences, "analytics" | "marketing">): ConsentPreferences {
  return {
    v: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(partial.analytics),
    marketing: Boolean(partial.marketing),
    updatedAt: new Date().toISOString(),
  };
}

export function parseConsentPayload(raw: string | null | undefined): ConsentPreferences | null {
  if (raw == null || raw === "") return null;
  try {
    const o = JSON.parse(raw) as unknown;
    if (!o || typeof o !== "object") return null;
    const rec = o as Record<string, unknown>;
    if (rec.v !== COOKIE_CONSENT_VERSION) return null;
    if (rec.necessary !== true) return null;
    return {
      v: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: Boolean(rec.analytics),
      marketing: Boolean(rec.marketing),
      updatedAt: typeof rec.updatedAt === "string" ? rec.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function serializeConsent(p: ConsentPreferences): string {
  return JSON.stringify(p);
}

/** Whether the user has completed a consent choice (any stored record). */
export function isConsentRecord(p: ConsentPreferences | null): p is ConsentPreferences {
  return p !== null;
}

/** Read legacy localStorage value and map to structured prefs (does not write). */
export function migrateLegacyMarketingConsent(legacy: string | null): ConsentPreferences | null {
  if (legacy === "accepted") return buildAcceptAll();
  if (legacy === "declined") return buildRejectAll();
  return null;
}

/**
 * Parse `document.cookie` value for consent cookie.
 */
export function readConsentFromCookie(cookieHeader: string, name = COOKIE_CONSENT_COOKIE_NAME): ConsentPreferences | null {
  const parts = cookieHeader.split(";").map((s) => s.trim());
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const k = decodeURIComponent(part.slice(0, eq).trim());
    if (k !== name) continue;
    const v = decodeURIComponent(part.slice(eq + 1).trim());
    return parseConsentPayload(v);
  }
  return null;
}

export function formatConsentCookieValue(p: ConsentPreferences): string {
  return encodeURIComponent(serializeConsent(p));
}

/** Client-only: persist to localStorage + cookie and dispatch event. */
export function persistConsentClient(p: ConsentPreferences): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serializeConsent(p));
  } catch {
    /* quota / private mode */
  }
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${formatConsentCookieValue(p)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  } catch {
    /* ignore */
  }
}

/** Client-only: load consent (localStorage first, then cookie), with legacy migration. */
export function readConsentClient(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const fromLs = parseConsentPayload(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
    if (fromLs) return fromLs;
  } catch {
    /* ignore */
  }
  try {
    const fromCookie = readConsentFromCookie(document.cookie);
    if (fromCookie) {
      try {
        window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serializeConsent(fromCookie));
      } catch {
        /* ignore */
      }
      return fromCookie;
    }
  } catch {
    /* ignore */
  }
  try {
    const legacy = window.localStorage.getItem(LEGACY_MARKETING_CONSENT_KEY);
    const migrated = migrateLegacyMarketingConsent(legacy);
    if (migrated) {
      persistConsentClient(migrated);
      try {
        window.localStorage.removeItem(LEGACY_MARKETING_CONSENT_KEY);
      } catch {
        /* ignore */
      }
      return migrated;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function hasAnalyticsConsent(p: ConsentPreferences | null): boolean {
  return p?.analytics === true;
}

export function hasMarketingConsent(p: ConsentPreferences | null): boolean {
  return p?.marketing === true;
}

/** UTM / campaign attribution: allow when analytics or marketing is on (non-essential storage). */
export function hasAttributionStorageConsent(p: ConsentPreferences | null): boolean {
  return hasAnalyticsConsent(p) || hasMarketingConsent(p);
}
