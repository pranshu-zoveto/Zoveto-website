# Analytics (GA4 + marketing events)

Website code fires events through the consent-gated `ConditionalAnalyticsLoader` using measurement ID `G-XRM9Y716DJ` (override with `NEXT_PUBLIC_GA_MEASUREMENT_ID`). Google Tag Manager container `GTM-MT5G5NCL` loads through `ConditionalGtmLoader` after the same analytics consent (override with `NEXT_PUBLIC_GTM_ID`). Do not add a second gtag or GTM snippet in `app/layout.tsx`. Do not add GA4 tag `G-XRM9Y716DJ` inside the GTM container, or page views will be counted twice.

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
