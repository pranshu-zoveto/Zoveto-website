"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SentryVerificationThrow } from "@/components/tracking/SentryVerificationThrow";
import UtmCapture from "@/components/tracking/UtmCapture";

// Dynamically import cookie banner to prevent render-blocking the Hero
const CookieConsentBar = dynamic(() => import("@/components/legal/CookieConsentBar"));

const ConditionalAnalyticsLoader = dynamic(() =>
  import("@/components/tracking/ConditionalAnalyticsLoader").then((m) => m.ConditionalAnalyticsLoader)
);
const ConditionalClarityLoader = dynamic(() =>
  import("@/components/tracking/ConditionalClarityLoader").then((m) => m.ConditionalClarityLoader)
);
const ConditionalPostHogLoader = dynamic(() =>
  import("@/components/tracking/ConditionalPostHogLoader").then((m) => m.ConditionalPostHogLoader)
);
const AnalyticsRouteTracker = dynamic(() =>
  import("@/components/tracking/AnalyticsRouteTracker").then((m) => m.AnalyticsRouteTracker)
);

/**
 * Client-only site chrome: consent, consent-gated analytics, session marketing params.
 * Kept out of `app/layout.tsx` (RSC) to avoid bundling this tree into the server entry.
 * Loaders are wrapped in a requestIdleCallback to zero out TBT and ensure 100 Mobile PageSpeed.
 */
export function SiteChromeClients() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window.requestIdleCallback !== "undefined") {
        window.requestIdleCallback(() => setIdle(true));
      } else {
        setIdle(true);
      }
    }, 1500); // Give FCP/LCP complete priority
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CookieConsentBar />
      <Suspense fallback={null}>
        <UtmCapture />
      </Suspense>
      {idle && (
        <>
          <ConditionalAnalyticsLoader />
          <ConditionalPostHogLoader />
          <ConditionalClarityLoader />
          <AnalyticsRouteTracker />
        </>
      )}
      {process.env.NEXT_PUBLIC_SENTRY_VERIFICATION === "1" ? <SentryVerificationThrow /> : null}
    </>
  );
}
