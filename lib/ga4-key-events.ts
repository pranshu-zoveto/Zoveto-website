/**
 * GA4 Key Events — configure manually in Google Analytics 4 Admin after events appear in Reports.
 * @see docs/analytics.md
 */

export type Ga4KeyEventDefinition = {
  eventName: string;
  purpose: string;
  firedFrom: string;
  markAsKeyEvent: boolean;
};

export const GA4_KEY_EVENTS: readonly Ga4KeyEventDefinition[] = [
  {
    eventName: "generate_lead",
    purpose: "GA4 recommended event when a real lead is captured.",
    firedFrom: "DemoBookingForm, SignupClient, Calendly booking on contact page",
    markAsKeyEvent: true,
  },
  {
    eventName: "demo_request_submit",
    purpose: "Contact/demo booking form submitted successfully.",
    firedFrom: "components/forms/DemoBookingForm.tsx",
    markAsKeyEvent: true,
  },
  {
    eventName: "contact_form_submit",
    purpose: "General contact or lead form submitted.",
    firedFrom: "components/forms/LeadForm.tsx",
    markAsKeyEvent: true,
  },
  {
    eventName: "access_request_submit",
    purpose: "Signup / early-access request submitted.",
    firedFrom: "app/(marketing)/signup/_SignupClient.tsx",
    markAsKeyEvent: true,
  },
  {
    eventName: "calendly_booking",
    purpose: "Calendly embed scheduled a meeting (postMessage event_scheduled).",
    firedFrom: "app/(marketing)/contact/ContactClient.tsx when Calendly URL is set",
    markAsKeyEvent: true,
  },
] as const;

export const GA4_KEY_EVENT_NAMES = GA4_KEY_EVENTS.map((e) => e.eventName);
