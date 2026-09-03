"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  readConsentClient,
} from "@/lib/cookieConsent";
import { getGtmContainerId } from "@/lib/gtm-container-id";

const GTM_BOOTSTRAP_ID = "zoveto-gtm";

/**
 * Loads Google Tag Manager (`gtm.js`) only after analytics consent.
 * Official container snippet, injected once. The noscript iframe is omitted
 * because it cannot respect the cookie banner (no-JS users never consent).
 *
 * Do not paste a second GTM snippet in `app/layout.tsx`.
 */
export function ConditionalGtmLoader() {
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
    const containerId = getGtmContainerId();
    if (!enabled || !containerId) {
      document.getElementById(GTM_BOOTSTRAP_ID)?.remove();
      document
        .querySelectorAll('script[src*="googletagmanager.com/gtm.js"]')
        .forEach((node) => node.remove());
      return;
    }
    if (document.getElementById(GTM_BOOTSTRAP_ID)) return;

    const s = document.createElement("script");
    s.id = GTM_BOOTSTRAP_ID;
    s.text = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(containerId)});
`;
    document.head.appendChild(s);
  }, [enabled]);

  return null;
}

export default ConditionalGtmLoader;
