/**
 * Server-side COS URL (Route Handlers, SSR).
 * In Docker, set COS_API_BASE_URL=http://api:3000/api so Next can reach Nest from the website container.
 * For local `next dev`, default http://127.0.0.1:4000/api matches Zoveto API_HOST_PORT.
 */

export function normalizeCosApiBase(raw: string): string {
  const trimmed = raw.replace(/\/$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

/**
 * COS REST base including `/api`, or `null` when deployed on Vercel without an explicit URL.
 * Prevents serverless from POSTing to `127.0.0.1` (which always fails in production).
 */
export function resolveCosApiBaseFromEnv(env: Record<string, string | undefined>): string | null {
  const explicit = env.COS_API_BASE_URL?.trim() || env.NEXT_PUBLIC_COS_API_URL?.trim();
  if (explicit) return normalizeCosApiBase(explicit);
  if (env.VERCEL === "1") return null;
  return normalizeCosApiBase("http://127.0.0.1:4000/api");
}

export function resolveCosApiBase(): string | null {
  return resolveCosApiBaseFromEnv(process.env as Record<string, string | undefined>);
}

/**
 * COS base URL for local/dev when env is unset. On Vercel without COS_API_BASE_URL, returns localhost
 * — prefer {@link resolveCosApiBase} in Route Handlers so production never calls it blindly.
 */
export function cosServerApiBase(): string {
  return resolveCosApiBase() ?? normalizeCosApiBase("http://127.0.0.1:4000/api");
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
