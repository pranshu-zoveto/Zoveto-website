# Analytics (GA4 + marketing events)

Website code fires events through the consent-gated `ConditionalAnalyticsLoader` using `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Do not add a second GA4 loader in `app/layout.tsx`.

## GA4 dashboard configuration required

Mark the following GA4 events as **Key Events / conversions** in GA4 Admin after events start appearing in Reports:

- `generate_lead`
- `demo_request_submit`
- `contact_form_submit`
- `access_request_submit`
- `calendly_booking` (when Calendly scheduling is enabled on `/contact`)

These Key Events cannot be fully configured from website code alone. They must be enabled in the GA4 Admin dashboard after events start appearing.

See also: `lib/ga4-key-events.ts` for the in-repo registry of conversion events and where each fires.

## Privacy

Analytics payloads must not include PII. The tracking layer strips blocked keys (`email`, `phone`, `name`, `company`, `message`, etc.). Only safe metadata such as `source`, `method`, page path, and UTM parameters are sent.

## Calendly

When `NEXT_PUBLIC_CALENDLY_DEMO_URL` is set, `/contact` listens for `calendly.event_scheduled` postMessages from `calendly.com` and fires:

- `calendly_booking` with `{ source: "contact_calendly" }`
- `generate_lead` with `{ method: "calendly_booking", source: "contact_calendly" }`
