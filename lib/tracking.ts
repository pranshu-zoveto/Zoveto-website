import { getStoredUtm } from "@/lib/utm";

type TrackingValue = string | number | boolean | null | undefined;
type TrackingParams = Record<string, TrackingValue>;

export type MarketingEventName =
  | "demo_request_submit"
  | "access_request_submit"
  | "contact_form_submit"
  | "demo_schedule_click"
  | "pricing_view"
  | "compare_page_view"
  | "whatsapp_click"
  | "newsletter_signup"
  | "calculator_used"
  | "calculator_export_request";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: TrackingParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

function currentPageParams(): TrackingParams {
  if (typeof window === "undefined") return {};
  const utm = getStoredUtm();
  return {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search || ""}`,
    ...utm,
  };
}

function cleanParams(params: TrackingParams): TrackingParams {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

export function trackMarketingEvent(eventName: MarketingEventName, params: TrackingParams = {}): void {
  trackEvent(eventName, cleanParams({ ...currentPageParams(), ...params }));
}
