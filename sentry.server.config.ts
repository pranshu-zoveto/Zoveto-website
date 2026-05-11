// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

if (dsn) {
  const isDev = process.env.NODE_ENV === "development";
  // Full performance tracing in dev is rarely worth the overhead on a marketing site.
  // Set `SENTRY_DEV_TRACES=1` (optional `SENTRY_DEV_TRACES_SAMPLE=0.2`) when debugging spans locally.
  const rawSample = Number(process.env.SENTRY_DEV_TRACES_SAMPLE ?? "0.2");
  const devTrace =
    process.env.SENTRY_DEV_TRACES === "1" && Number.isFinite(rawSample)
      ? Math.min(1, Math.max(0, rawSample))
      : 0;

  Sentry.init({
    dsn,

    sendDefaultPii: false,

    environment: process.env.SENTRY_ENVIRONMENT?.trim() || process.env.VERCEL_ENV || process.env.NODE_ENV,

    tracesSampleRate: isDev ? devTrace : 0.1,

    // Capturing local variables adds noticeable work per span; keep for prod, skip in dev.
    includeLocalVariables: !isDev,

    integrations: (integrations) => integrations.filter((i) => i.name !== "Prisma"),
  });
}
