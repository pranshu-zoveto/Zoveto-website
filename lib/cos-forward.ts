/**
 * Server-side COS URL (Route Handlers, SSR).
 * In Docker, set COS_API_BASE_URL=http://api:3000/api so Next can reach Nest from the website container.
 * For local `next dev`, default http://127.0.0.1:4000/api matches Zoveto API_HOST_PORT.
 */
export function cosServerApiBase(): string {
  const raw = (
    process.env.COS_API_BASE_URL ??
    process.env.NEXT_PUBLIC_COS_API_URL ??
    "http://127.0.0.1:4000/api"
  ).replace(/\/$/, "");
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}

/** Matches COS `WEB_CONTACT_SECRET` when public lead/demo endpoints require a shared secret. */
export function cosWebsiteContactHeaders(): Record<string, string> {
  const secret = process.env.WEB_CONTACT_SECRET?.trim();
  if (!secret) return {};
  return { "X-Website-Contact-Secret": secret };
}

/** COS lead/demo DTOs use strict validation — these keys must not appear on the JSON body. */
const FORBIDDEN_COS_CONTACT_KEYS = ["notificationEmail", "notifyEmail", "source"] as const;

/** Removes fields that trigger `property X should not exist` from upstream validators. */
export function stripForbiddenCosContactFields(body: Record<string, unknown>): Record<string, unknown> {
  const next = { ...body };
  for (const key of FORBIDDEN_COS_CONTACT_KEYS) {
    delete next[key];
  }
  return next;
}
