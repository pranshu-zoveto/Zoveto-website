"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  readConsentClient,
} from "@/lib/cookieConsent";

/**
 * Loads GA4 via the Google tag (gtag.js) only after analytics consent.
 * Script URL is `googletagmanager.com/gtag/js` — that is the official GA4 loader,
 * not a Google Tag Manager container.
 * `send_page_view: false` avoids double-counting: {@link AnalyticsRouteTracker} sends page_view.
 *
 * Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (e.g. G-XXXXXXXXXX) in `.env.local` / Vercel.
 */
export function ConditionalAnalyticsLoader() {
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
    const mid = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
    if (!enabled || !mid) {
      document.getElementById("zoveto-ga4")?.remove();
      document.getElementById("zoveto-ga4-config")?.remove();
      return;
    }
    if (document.getElementById("zoveto-ga4")) return;

    const s1 = document.createElement("script");
    s1.id = "zoveto-ga4";
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(mid)}`;
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.id = "zoveto-ga4-config";
    s2.text = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(mid)}, { anonymize_ip: true, send_page_view: false });
`;
    document.head.appendChild(s2);
  }, [enabled]);

  return null;
}

export default ConditionalAnalyticsLoader;
