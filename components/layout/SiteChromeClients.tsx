"use client";

import { Suspense } from "react";
import CookieConsentBar from "@/components/legal/CookieConsentBar";
import { ConditionalAnalyticsLoader } from "@/components/tracking/ConditionalAnalyticsLoader";
import { ConditionalClarityLoader } from "@/components/tracking/ConditionalClarityLoader";
import { ConditionalPostHogLoader } from "@/components/tracking/ConditionalPostHogLoader";
import { AnalyticsRouteTracker } from "@/components/tracking/AnalyticsRouteTracker";
import UtmCapture from "@/components/tracking/UtmCapture";
import { SentryVerificationThrow } from "@/components/tracking/SentryVerificationThrow";

/**
 * Client-only site chrome: consent, consent-gated analytics, session marketing params.
 * Kept out of `app/layout.tsx` (RSC) to avoid bundling this tree into the server entry.
 */
export function SiteChromeClients() {
  return (
    <>
      <CookieConsentBar />
      <ConditionalAnalyticsLoader />
      <ConditionalPostHogLoader />
      <ConditionalClarityLoader />
      <AnalyticsRouteTracker />
      <Suspense fallback={null}>
        <UtmCapture />
      </Suspense>
      {process.env.NEXT_PUBLIC_SENTRY_VERIFICATION === "1" ? <SentryVerificationThrow /> : null}
    </>
  );
}
