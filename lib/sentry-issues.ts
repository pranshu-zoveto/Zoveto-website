export type SentryIssueRow = {
  id: string;
  message: string;
  count: number;
  lastSeen: string;
};

type SentryIssueJson = {
  id?: unknown;
  title?: unknown;
  culprit?: unknown;
  count?: unknown;
  lastSeen?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function fetchSentryUnresolvedIssues(
  env: Record<string, string | undefined> = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<SentryIssueRow[]> {
  const token = env.SENTRY_AUTH_TOKEN?.trim();
  const org = env.SENTRY_ORG?.trim();
  const project = env.SENTRY_PROJECT?.trim();
  if (!token || !org || !project) return [];

  const base = (env.SENTRY_API_URL?.trim() || "https://sentry.io").replace(/\/$/, "");
  const url = `${base}/api/0/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/issues/?query=is:unresolved&statsPeriod=24h&limit=10`;

  try {
    const res = await fetchImpl(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[health] Sentry issues API", res.status);
      return [];
    }
    const payload = (await res.json()) as unknown;
    if (!Array.isArray(payload)) return [];
    return payload
      .map((item): SentryIssueRow | null => {
        const row = item as SentryIssueJson;
        const id = asString(row.id);
        const message = asString(row.title) || asString(row.culprit);
        if (!id || !message) return null;
        const countRaw = row.count;
        const count =
          typeof countRaw === "number"
            ? countRaw
            : Number.parseInt(asString(countRaw) || "0", 10) || 0;
        return {
          id,
          message,
          count,
          lastSeen: asString(row.lastSeen) || new Date().toISOString(),
        };
      })
      .filter((row): row is SentryIssueRow => row !== null);
  } catch (err) {
    console.error("[health] Sentry issues fetch failed", err instanceof Error ? err.message : err);
    return [];
  }
}
