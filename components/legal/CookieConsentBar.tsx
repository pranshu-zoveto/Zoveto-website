"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  buildAcceptAll,
  buildCustom,
  buildRejectAll,
  CONSENT_CHANGED_EVENT,
  persistConsentClient,
  readConsentClient,
} from "@/lib/cookieConsent";
import { UTM_STORAGE_KEY } from "@/lib/utm";

function clearUtmStorage() {
  try {
    window.localStorage.removeItem(UTM_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function CookieConsentBar() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftMarketing, setDraftMarketing] = useState(false);

  const syncDraftFromStored = useCallback(() => {
    const p = readConsentClient();
    setDraftAnalytics(Boolean(p?.analytics));
    setDraftMarketing(Boolean(p?.marketing));
  }, []);

  useEffect(() => {
    function openSettings() {
      syncDraftFromStored();
      setSettingsOpen(true);
    }
    window.addEventListener("zoveto-open-cookie-settings", openSettings);
    return () => window.removeEventListener("zoveto-open-cookie-settings", openSettings);
  }, [syncDraftFromStored]);

  useEffect(() => {
    try {
      const existing = readConsentClient();
      if (!existing) {
        const t = window.setTimeout(() => setBannerVisible(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      setBannerVisible(true);
    }
  }, []);

  useEffect(() => {
    function onConsent() {
      if (readConsentClient()) setBannerVisible(false);
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsent);
  }, []);

  function acceptAll() {
    persistConsentClient(buildAcceptAll());
    setBannerVisible(false);
    setSettingsOpen(false);
  }

  function rejectAll() {
    persistConsentClient(buildRejectAll());
    clearUtmStorage();
    setBannerVisible(false);
    setSettingsOpen(false);
  }

  function openCustomize() {
    syncDraftFromStored();
    setSettingsOpen(true);
  }

  function saveCustomize() {
    const p = buildCustom({ analytics: draftAnalytics, marketing: draftMarketing });
    persistConsentClient(p);
    if (!draftAnalytics && !draftMarketing) clearUtmStorage();
    setBannerVisible(false);
    setSettingsOpen(false);
  }

  const showBottomBanner = bannerVisible && !settingsOpen;

  return (
    <>
      {showBottomBanner && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          aria-describedby="cookie-consent-desc"
          className="fixed bottom-28 left-0 right-0 z-[120] p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-32 sm:p-6 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-2xl rounded-xl border border-neutral-200/90 bg-neutral-50/95 px-4 py-4 shadow-lg backdrop-blur-md sm:px-5 sm:py-4">
            <p id="cookie-consent-desc" className="mb-4 text-sm leading-relaxed text-neutral-700">
              We use cookies to improve your experience. You can choose what you allow. See our{" "}
              <Link
                href="/privacy#cookies"
                className="font-medium text-teal underline underline-offset-2 hover:text-neutral-950"
              >
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={openCustomize}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal/90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Customize cookies"
          className="fixed inset-0 z-[210] flex items-end justify-center bg-neutral-950/40 p-4 sm:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSettingsOpen(false);
              if (!readConsentClient()) setBannerVisible(true);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-neutral-200 bg-white p-5 shadow-xl sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-950">Cookie preferences</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Necessary cookies are always on. Optional categories help us measure traffic and plan campaigns.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-4">
                <div>
                  <p className="font-medium text-neutral-950">Necessary</p>
                  <p className="mt-1 text-xs text-neutral-600">
                    Security, load balancing, and basic site operation.
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold uppercase text-neutral-500">Always on</span>
              </li>
              <li className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-4">
                <div>
                  <p className="font-medium text-neutral-950">Analytics</p>
                  <p className="mt-1 text-xs text-neutral-600">
                    Anonymous usage statistics (e.g. Google Analytics) when configured.
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <span className="sr-only">Allow analytics</span>
                  <input
                    type="checkbox"
                    checked={draftAnalytics}
                    onChange={(e) => setDraftAnalytics(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-teal focus:ring-teal"
                  />
                </label>
              </li>
              <li className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-4">
                <div>
                  <p className="font-medium text-neutral-950">Marketing</p>
                  <p className="mt-1 text-xs text-neutral-600">
                    Campaign attribution and future marketing tools (e.g. stored UTM parameters).
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <span className="sr-only">Allow marketing</span>
                  <input
                    type="checkbox"
                    checked={draftMarketing}
                    onChange={(e) => setDraftMarketing(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-teal focus:ring-teal"
                  />
                </label>
              </li>
            </ul>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  if (!readConsentClient()) setBannerVisible(true);
                }}
                className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCustomize}
                className="rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal/90"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieConsentBar;
