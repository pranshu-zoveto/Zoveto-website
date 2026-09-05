export type HealthGlobalStatus = "healthy" | "degraded" | "critical";

type EnvLike = Record<string, string | undefined>;

export function isSentryCaptureConfigured(env: EnvLike = process.env): boolean {
  return Boolean(env.SENTRY_DSN?.trim() || env.NEXT_PUBLIC_SENTRY_DSN?.trim());
}

export function isSentryIssuesApiConfigured(env: EnvLike = process.env): boolean {
  return Boolean(
    env.SENTRY_AUTH_TOKEN?.trim() && env.SENTRY_ORG?.trim() && env.SENTRY_PROJECT?.trim(),
  );
}

/** Speed Insights / Web Analytics are app-wired and collect automatically on Vercel. No access token required. */
export function isVercelInsightsLive(env: EnvLike = process.env): boolean {
  const vercelEnv = env.VERCEL_ENV?.trim();
  return env.VERCEL === "1" || vercelEnv === "production" || vercelEnv === "preview";
}

export function deriveGlobalStatus(input: {
  dbHealthy: boolean;
  totalErrors: number;
  dbPingMs: number;
}): HealthGlobalStatus {
  if (!input.dbHealthy) return "critical";
  if (input.totalErrors > 50) return "degraded";
  if (input.dbPingMs > 5000) return "degraded";
  return "healthy";
}
