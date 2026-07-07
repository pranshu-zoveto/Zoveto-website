import { getStoredUtm } from "@/lib/utm";

export { GA4_KEY_EVENTS, GA4_KEY_EVENT_NAMES } from "@/lib/ga4-key-events";
export type { Ga4KeyEventDefinition } from "@/lib/ga4-key-events";

type TrackingValue = string | number | boolean | null | undefined;
type TrackingParams = Record<string, TrackingValue>;

/** Keys that must never be sent to analytics (PII / form fields). */
const BLOCKED_PARAM_KEYS = new Set([
  "email",
  "phone",
  "name",
  "company",
  "message",
  "first_name",
  "last_name",
  "full_name",
  "company_name",
  "notes",
  "body",
]);

function stripBlockedParams(params: TrackingParams): TrackingParams {
  return Object.fromEntries(
    Object.entries(params).filter(([key]) => !BLOCKED_PARAM_KEYS.has(key.toLowerCase())),
  );
}

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

function shouldPersistInternalTracking(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return process.env.NEXT_PUBLIC_ENABLE_INTERNAL_TRACKING === "1";
}

async function persistInternalTracking(eventName: string, sessionId: string, safeParams: TrackingParams): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2500);

  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        sessionId,
        ...safeParams,
      }),
      signal: controller.signal,
      keepalive: true,
    });
  } catch {
    // Ignore internal tracking errors so calculator and marketing pages never break.
  } finally {
    window.clearTimeout(timeout);
  }
}

export function trackEvent(eventName: string, params: TrackingParams = {}): void {
  if (typeof window === "undefined") return;

  const safeParams = stripBlockedParams(params);

  // 1. External (GA4)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParams);
  }

  // 2. Internal (Prisma TrackingEvent) — production only unless explicitly enabled in dev
  if (!shouldPersistInternalTracking()) return;

  const sessionId = getSessionId();
  void persistInternalTracking(eventName, sessionId, safeParams);
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
  trackEvent(eventName, cleanParams(stripBlockedParams({ ...currentPageParams(), ...params })));
}
