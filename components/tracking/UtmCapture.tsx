"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CONSENT_CHANGED_EVENT,
  hasAttributionStorageConsent,
  readConsentClient,
} from "@/lib/cookieConsent";
import { persistUtmIfPresent, UTM_STORAGE_KEY } from "@/lib/utm";

export function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!hasAttributionStorageConsent(readConsentClient())) return;
    persistUtmIfPresent(searchParams);
  }, [searchParams]);

  useEffect(() => {
    function onConsent() {
      if (hasAttributionStorageConsent(readConsentClient())) {
        persistUtmIfPresent(searchParams);
      } else {
        try {
          window.localStorage.removeItem(UTM_STORAGE_KEY);
        } catch {
          /* ignore */
        }
      }
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsent);
  }, [searchParams]);

  return null;
}

export default UtmCapture;
