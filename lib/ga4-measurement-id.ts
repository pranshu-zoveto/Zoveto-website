/**
 * Google tag (gtag.js) measurement ID for the marketing site.
 * This is a GA4 / Google tag ID (`G-…`), not a Google Tag Manager container (`GTM-…`).
 * Override with `NEXT_PUBLIC_GA_MEASUREMENT_ID` for a different stream.
 */
export const DEFAULT_GA4_MEASUREMENT_ID = "G-XRM9Y716DJ";

export function getGa4MeasurementId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return fromEnv || DEFAULT_GA4_MEASUREMENT_ID;
}
