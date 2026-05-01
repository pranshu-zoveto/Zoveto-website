/**
 * Shared JSON parsing and narrow checks for API routes and `lib/api.ts`.
 * Avoids `any` while keeping response shapes compatible with COS proxies.
 */

export function getStringField(obj: Record<string, unknown>, key: string): string | undefined {
  const v = obj[key];
  return typeof v === "string" ? v : undefined;
}

/** COS and website routes often return `{ message: string }` on error. */
export function getMessageFromUnknown(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  return getStringField(value as Record<string, unknown>, "message");
}

/** Nest/class-validator style: `{ message: string | string[], error?: string }`. */
export function formatCosApiErrorMessage(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null) return undefined;
  const o = data as Record<string, unknown>;
  const m = o.message;
  if (typeof m === "string" && m.trim()) return m.trim();
  if (Array.isArray(m)) {
    const parts = m.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
    if (parts.length) return parts.join("; ");
  }
  const err = o.error;
  if (typeof err === "string" && err.trim()) return err.trim();
  return undefined;
}

/** Parse upstream text as JSON; on failure return a small object safe to forward as JSON. */
export function parseUpstreamJsonBody(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text.trim() || "Upstream error" };
  }
}

export async function readResponseJsonUnknown(res: Response): Promise<unknown> {
  const text = await res.text();
  return parseUpstreamJsonBody(text);
}

/** Best-effort message from a failed `fetch` response body (JSON or empty). */
export async function readErrorMessageFromResponse(res: Response): Promise<string | undefined> {
  try {
    const u: unknown = await res.json();
    return getMessageFromUnknown(u);
  } catch {
    return undefined;
  }
}
