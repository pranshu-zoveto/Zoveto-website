/**
 * Google Tag Manager web container ID (`GTM-…`).
 * Override with `NEXT_PUBLIC_GTM_ID` for a different container.
 *
 * Do not add GA4 tag `G-XRM9Y716DJ` inside this container — the site already
 * loads that Google tag via `ConditionalAnalyticsLoader`.
 */
export const DEFAULT_GTM_CONTAINER_ID = "GTM-MT5G5NCL";

export function getGtmContainerId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return fromEnv || DEFAULT_GTM_CONTAINER_ID;
}
