// This file configures Sentry for the browser (App Router client bundle).
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

if (dsn) {
  Sentry.init({
    dsn,

    // Marketing site: avoid sending PII by default; enable in Sentry project if needed.
    sendDefaultPii: false,

    // Optional: set NEXT_PUBLIC_SENTRY_ENVIRONMENT=preview on Vercel preview deployments to split issues.
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT?.trim() || process.env.NODE_ENV,

    /** Prod: disable tracing to cut main-thread work (Lighthouse TBT). Dev keeps full traceability. */
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
