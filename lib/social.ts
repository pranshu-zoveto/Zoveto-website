/**
 * Canonical public social URLs - single source for footer, JSON-LD, and copy.
 */
export const LINKEDIN_COMPANY_URL = "https://www.linkedin.com/company/zoveto-os/";

/** sameAs / schema.org (no trailing slash is conventional). */
export const LINKEDIN_COMPANY_URL_ENTITY = LINKEDIN_COMPANY_URL.replace(/\/$/, "");

/** Verified public profiles (also linked in site footer). */
export const TWITTER_URL = "https://twitter.com/zoveto";
export const INSTAGRAM_URL = "https://www.instagram.com/zoveto.os/";

export const VERIFIED_SAME_AS = [
  LINKEDIN_COMPANY_URL_ENTITY,
  TWITTER_URL,
  INSTAGRAM_URL,
] as const;
