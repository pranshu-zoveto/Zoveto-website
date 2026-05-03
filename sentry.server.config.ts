// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

if (dsn) {
  Sentry.init({
    dsn,

    sendDefaultPii: false,

    environment: process.env.SENTRY_ENVIRONMENT?.trim() || process.env.VERCEL_ENV || process.env.NODE_ENV,

    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    includeLocalVariables: true,
  });
}
