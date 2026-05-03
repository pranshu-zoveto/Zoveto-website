"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Cookie, X } from "lucide-react";
import {
  buildAcceptAll,
  buildCustom,
  buildRejectAll,
  CONSENT_CHANGED_EVENT,
  persistConsentClient,
  readConsentClient,
} from "@/lib/cookieConsent";
import { UTM_STORAGE_KEY } from "@/lib/utm";
import { cn } from "@/lib/utils";

function clearUtmStorage() {
  try {
    window.localStorage.removeItem(UTM_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

const btnFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const secondaryBtn =
  `min-h-[48px] w-full rounded-xl border border-border bg-card px-4 text-base font-semibold text-foreground ` +
  `transition-colors hover:bg-surface active:scale-[0.99] motion-reduce:active:scale-100 ${btnFocus}`;

const primaryBtn =
  `min-h-[48px] w-full rounded-xl bg-blue px-4 text-base font-semibold text-white shadow-sm ` +
  `transition-colors hover:bg-blue-hover active:scale-[0.99] motion-reduce:active:scale-100 ${btnFocus}`;

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
          aria-labelledby="cookie-consent-label"
          aria-describedby="cookie-consent-desc"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[120] flex justify-center px-3 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] pt-2 sm:px-4 sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(7rem+env(safe-area-inset-bottom,0px))]"
        >
          {/* Floating card: reads as a deliberate module on phone, not a full-width slab */}
          <div
            className={cn(
              "pointer-events-auto w-full max-w-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-300 motion-reduce:animate-none",
              "sm:max-w-xl lg:max-w-3xl",
            )}
          >
            <div className="rounded-2xl border border-border/90 bg-card/98 shadow-[0_12px_48px_-16px_rgba(29,29,31,0.22)] backdrop-blur-xl supports-[backdrop-filter]:bg-card/94">
              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="flex min-w-0 gap-3 lg:flex-1 lg:max-w-[62ch]">
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface-2 text-blue"
                      aria-hidden
                    >
                      <Cookie className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 space-y-2">
                      <p id="cookie-consent-label" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-2">
                        Cookies
                      </p>
                      <p
                        id="cookie-consent-desc"
                        className="text-base leading-relaxed text-foreground sm:text-[15px] sm:leading-[1.55]"
                      >
                        We use cookies to run the site securely and, with your permission, to measure traffic and
                        campaigns. Read our{" "}
                        <Link
                          href="/privacy#cookies"
                          className={cn(
                            "font-semibold text-blue underline decoration-blue/35 underline-offset-[3px]",
                            "transition-colors hover:text-foreground",
                            btnFocus,
                            "rounded-sm",
                          )}
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  {/*
                    Narrow: single column, full-width 48px targets.
                    sm–lg: two secondary actions on one row; primary spans full width underneath.
                    lg+: three actions in one row beside copy (wide desktop only).
                  */}
                  <div className="grid w-full shrink-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:inline-grid lg:w-auto lg:max-w-md lg:grid-cols-3 lg:gap-3">
                    <button type="button" onClick={rejectAll} className={cn(secondaryBtn, "lg:min-h-[44px]")}>
                      Essential only
                    </button>
                    <button type="button" onClick={openCustomize} className={cn(secondaryBtn, "lg:min-h-[44px]")}>
                      Customize
                    </button>
                    <button
                      type="button"
                      onClick={acceptAll}
                      className={cn(primaryBtn, "sm:col-span-2 lg:col-span-1 lg:min-h-[44px]")}
                    >
                      Accept all
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog.Root
        open={settingsOpen}
        onOpenChange={(open) => {
          setSettingsOpen(open);
          if (!open && !readConsentClient()) setBannerVisible(true);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[210] bg-foreground/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className={cn(
              "fixed z-[211] flex max-h-[min(92dvh,44rem)] w-[min(calc(100vw-1.5rem),28rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] outline-none",
              "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "max-md:inset-x-3 max-md:bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-md:top-auto max-md:max-h-[min(85dvh,36rem)] max-md:translate-x-0 max-md:translate-y-0 max-md:w-auto",
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
              <Dialog.Title className="text-lg font-semibold tracking-tight text-foreground">
                Cookie preferences
              </Dialog.Title>
              <Dialog.Close
                type="button"
                className={cn(
                  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-2 transition-colors hover:bg-surface hover:text-foreground",
                  btnFocus,
                )}
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </Dialog.Close>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
              <Dialog.Description asChild>
                <p className="text-base leading-relaxed text-muted">
                  Necessary cookies stay on. Turn optional categories on or off — you can change this anytime via{" "}
                  <strong className="font-semibold text-foreground">Manage cookies</strong> in the footer.
                </p>
              </Dialog.Description>

              <div className="mt-5 divide-y divide-border rounded-xl border border-border bg-surface-2/40">
                <div className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">Necessary</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      Security, consent storage, and core site operation.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-card px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-2">
                    Always on
                  </span>
                </div>
                <label className="flex cursor-pointer items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">Analytics</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      Aggregate traffic and performance (e.g. Google Analytics) when configured.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={draftAnalytics}
                    onChange={(e) => setDraftAnalytics(e.target.checked)}
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 rounded border-border text-blue focus:ring-blue/40",
                      btnFocus,
                    )}
                  />
                </label>
                <label className="flex cursor-pointer items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">Marketing</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      Campaign attribution and stored marketing parameters (e.g. UTM).
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={draftMarketing}
                    onChange={(e) => setDraftMarketing(e.target.checked)}
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 rounded border-border text-blue focus:ring-blue/40",
                      btnFocus,
                    )}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface-2/30 p-4 sm:flex-row sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
              <Dialog.Close asChild>
                <button type="button" className={cn(secondaryBtn, "sm:min-h-[44px] sm:w-auto sm:min-w-[7.5rem]")}>
                  Cancel
                </button>
              </Dialog.Close>
              <button type="button" onClick={saveCustomize} className={cn(primaryBtn, "sm:min-h-[44px] sm:w-auto sm:min-w-[11rem]")}>
                Save preferences
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default CookieConsentBar;
