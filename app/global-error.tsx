"use client";

import { captureException } from "@sentry/react";
import Link from "next/link";
import { useEffect } from "react";

/**
 * Root error boundary for the App Router. Required for capturing React render errors in production.
 * Use `@sentry/react` here so webpack resolves the browser SDK only (not `@sentry/nextjs` server graph).
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f5f7] px-6 text-center font-sans text-[#1d1d1f]">
        <p className="text-lg font-semibold">Something went wrong</p>
        <p className="max-w-md text-sm text-[#6e6e73]">
          We have been notified. Please try again or return to the homepage.
        </p>
        <Link href="/" className="text-sm font-semibold text-[#0071e3] underline">
          Back to Zoveto
        </Link>
      </body>
    </html>
  );
}
