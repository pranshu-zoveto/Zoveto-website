// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { captureRequestError } from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
    const { warnIfSmtpUnconfigured } = await import("./lib/server-mail");
    warnIfSmtpUnconfigured();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = captureRequestError;
