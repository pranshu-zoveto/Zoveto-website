"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  readConsentClient,
} from "@/lib/cookieConsent";
import { getGa4MeasurementId } from "@/lib/ga4-measurement-id";

/**
 * Loads GA4 via the Google tag (gtag.js) only after analytics consent.
 * Script URL is `googletagmanager.com/gtag/js` - that is the official Google tag loader,
 * not a Google Tag Manager container (`GTM-…`).
 * `send_page_view: false` avoids double-counting: {@link AnalyticsRouteTracker} sends page_view.
 *
 * Measurement ID defaults to `G-XRM9Y716DJ`. Override with `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
 * Only this component injects the Google tag - do not add a second gtag snippet in `layout` or per-page.
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
    const mid = getGa4MeasurementId();
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
    s2.type = "text/javascript";
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
