"use client";

import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  readConsentClient,
} from "@/lib/cookieConsent";

let posthogInitialized = false;

/**
 * PostHog (product analytics + session replay) via `posthog-js`, loaded only after analytics consent.
 * Matches the GA4 / Clarity gate — no tracking before the user opts in.
 *
 * Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` (Project settings → API keys;
 * host is usually `https://us.i.posthog.com` or `https://eu.i.posthog.com`). Omit both to disable.
 */
export function ConditionalPostHogLoader() {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    function sync() {
      setEnabled(hasAnalyticsConsent(readConsentClient()));
    }
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
    if (!token || !apiHost) return;

    if (!enabled) {
      if (posthogInitialized) {
        void import("posthog-js").then(({ default: posthog }) => {
          posthog.opt_out_capturing();
        });
      }
      return;
    }

    void import("posthog-js").then(({ default: posthog }) => {
      if (!enabledRef.current) return;

      if (!posthogInitialized) {
        posthog.init(token, {
          api_host: apiHost,
          defaults: "2026-01-30",
          persistence: "localStorage+cookie",
          cross_subdomain_cookie: false,
          secure_cookie: window.location.protocol === "https:",
          session_recording: {
            maskAllInputs: true,
          },
        });
        posthogInitialized = true;
        return;
      }

      posthog.opt_in_capturing();
    });
  }, [enabled]);

  return null;
}

export default ConditionalPostHogLoader;
