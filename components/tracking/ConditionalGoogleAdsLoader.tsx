"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasMarketingConsent,
  readConsentClient,
} from "@/lib/cookieConsent";
import { getGoogleAdsId } from "@/lib/google-ads-id";

const AW_SCRIPT_ID = "zoveto-aw";
const AW_CONFIG_ID = "zoveto-aw-config";

/**
 * Loads the Google Ads tag (`AW-…`) after marketing consent.
 * Reuses the existing gtag.js loader when GA4 already injected it.
 * Do not paste a second AW snippet in `app/layout.tsx`.
 */
export function ConditionalGoogleAdsLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function sync() {
      setEnabled(hasMarketingConsent(readConsentClient()));
    }
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const adsId = getGoogleAdsId();
    if (!enabled || !adsId) {
      document.getElementById(AW_SCRIPT_ID)?.remove();
      document.getElementById(AW_CONFIG_ID)?.remove();
      return;
    }
    if (document.getElementById(AW_CONFIG_ID)) return;

    const gtagAlreadyLoaded = Boolean(document.getElementById("zoveto-ga4"));
    if (!gtagAlreadyLoaded && !document.getElementById(AW_SCRIPT_ID)) {
      const s1 = document.createElement("script");
      s1.id = AW_SCRIPT_ID;
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`;
      document.head.appendChild(s1);
    }

    const s2 = document.createElement("script");
    s2.id = AW_CONFIG_ID;
    s2.type = "text/javascript";
    s2.text = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(adsId)});
`;
    document.head.appendChild(s2);
  }, [enabled]);

  return null;
}

export default ConditionalGoogleAdsLoader;
