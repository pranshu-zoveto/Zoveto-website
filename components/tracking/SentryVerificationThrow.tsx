"use client";

import { useEffect } from "react";

/**
 * **Temporary production check only.** When `NEXT_PUBLIC_SENTRY_VERIFICATION=1` is set at **build**
 * (Vercel env), the client throws once after mount so Sentry browser init can capture it.
 * Unset the variable and redeploy immediately after you see the issue in Sentry.
 */
export function SentryVerificationThrow() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_VERIFICATION === "1") {
      throw new Error("Sentry Frontend Test Error");
    }
  }, []);

  return null;
}
