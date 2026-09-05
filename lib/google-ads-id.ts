/**
 * Google Ads conversion / remarketing tag ID (`AW-…`).
 * Override with `NEXT_PUBLIC_GOOGLE_ADS_ID`.
 *
 * Loaded after marketing consent via `ConditionalGoogleAdsLoader`.
 * Do not paste a second AW snippet in `app/layout.tsx`, and do not also fire
 * this same `AW-…` tag inside the GTM container.
 */
export const DEFAULT_GOOGLE_ADS_ID = "AW-18133443669";

export function getGoogleAdsId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  return fromEnv || DEFAULT_GOOGLE_ADS_ID;
}
