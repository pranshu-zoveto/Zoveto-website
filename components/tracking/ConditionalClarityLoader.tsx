"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  readConsentClient,
} from "@/lib/cookieConsent";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Microsoft Clarity — official bootstrap (`clarity.ms/tag/{projectId}`), injected once into `document.head`.
 * Loads only after analytics consent (same gate as GA4). Disable by omitting `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
 *
 * Set env to your Clarity project ID only (the last argument in the dashboard snippet), e.g. `NEXT_PUBLIC_CLARITY_PROJECT_ID=abcd123456`.
 */
export function ConditionalClarityLoader() {
  const [enabled, setEnabled] = useState(false);

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
    const pid = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
    if (!enabled || !pid) {
      document.getElementById("zoveto-clarity")?.remove();
      return;
    }
    if (document.getElementById("zoveto-clarity")) return;

    const s = document.createElement("script");
    s.id = "zoveto-clarity";
    s.text = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(pid)});
`;
    document.head.appendChild(s);
  }, [enabled]);

  return null;
}

export default ConditionalClarityLoader;
