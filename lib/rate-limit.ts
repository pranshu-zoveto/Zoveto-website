/**
 * In-memory sliding-window rate limiter for Edge middleware / serverless routes.
 *
 * Limits are per runtime instance only. On Vercel (multiple regions/instances),
 * each isolate keeps its own counters—abuse gets "N × instance" effective quota.
 * For strict shared limits, use Upstash Redis or Vercel KV and gate with env.
 */

export type SlidingWindowResult = { ok: true } | { ok: false; retryAfterSec: number };

export type SlidingWindowState = { hits: number[] };

export function slidingWindowHit(
  state: SlidingWindowState,
  nowMs: number,
  windowMs: number,
  max: number
): SlidingWindowResult {
  state.hits = state.hits.filter((t) => nowMs - t < windowMs);
  if (state.hits.length >= max) {
    const oldest = state.hits[0]!;
    const retryAfterMs = Math.max(0, windowMs - (nowMs - oldest));
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }
  state.hits.push(nowMs);
  return { ok: true };
}

/** Pick first public client IP from proxy headers (Vercel, common CDNs). */
export function getRequestIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export function isApiRateLimitDisabled(): boolean {
  return (
    process.env.API_RATE_LIMIT_DISABLED === "1" ||
    process.env.DISABLE_API_RATE_LIMIT === "1" ||
    process.env.DISABLE_API_RATE_LIMIT === "true"
  );
}
