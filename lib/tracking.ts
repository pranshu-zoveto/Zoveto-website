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
  | "calculator_export_request"
  | "email_click"
  | "phone_click"
  | "cta_button_click"
  | "calendly_booking"
  | "signup_completed"
  | "404_error";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Generate or retrieve an anonymous session ID for conversion tracking
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "zoveto_session_id";
  let sid = localStorage.getItem(key);
  if (!sid) {
    sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(key, sid);
  }
  return sid;
}

export function trackEvent(eventName: string, params: TrackingParams = {}): void {
  if (typeof window === "undefined") return;
  
  // 1. External (GA4)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // 2. Internal (Prisma TrackingEvent)
  const sessionId = getSessionId();
  
  // Fire and forget
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      sessionId,
      ...params,
    }),
  }).catch(() => {
    // Ignore internal tracking errors to prevent breaking UI
  });
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
