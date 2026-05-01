import { hasAttributionStorageConsent, readConsentClient } from "./cookieConsent";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export const UTM_STORAGE_KEY = "zoveto_utm";

export type StoredUtm = Record<string, string> & { capturedAt?: string };

export function readUtmFromSearchParams(
  searchParams: URLSearchParams
): Partial<Record<UtmKey | "gclid" | "fbclid", string>> {
  const out: Partial<Record<string, string>> = {};
  for (const k of UTM_KEYS) {
    const v = searchParams.get(k);
    if (v) out[k] = v;
  }
  return out;
}

/** Merge fresh query UTM into localStorage (first-touch: keep existing keys unless new value present). */
export function persistUtmIfPresent(searchParams: URLSearchParams): void {
  if (typeof window === "undefined") return;
  if (!hasAttributionStorageConsent(readConsentClient())) return;
  const fresh = readUtmFromSearchParams(searchParams);
  if (Object.keys(fresh).length === 0) return;

  const existing = getStoredUtm();
  const merged: StoredUtm = {
    ...existing,
    ...Object.fromEntries(
      Object.entries(fresh).filter(([, v]) => v != null && v !== "")
    ) as Record<string, string>,
    capturedAt: existing.capturedAt ?? new Date().toISOString(),
  };

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* quota / private mode */
  }
}

export function getStoredUtm(): StoredUtm {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredUtm;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}
