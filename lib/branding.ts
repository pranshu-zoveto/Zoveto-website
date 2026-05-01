/**
 * Canonical public URLs for brand assets (served from /public/brand).
 * Use these everywhere so paths stay consistent and cache-friendly.
 */
export const BRAND_LOGO_ICON = "/brand/logo-icon.svg";
export const BRAND_LOGO_ICON_MONO_BLACK = "/brand/logo-icon-mono-black.svg";
export const BRAND_LOGO_ICON_MONO_WHITE = "/brand/logo-icon-mono-white.svg";
export const BRAND_WORDMARK = "/brand/wordmark.svg";

/** Aliases for short imports */
export const LOGO = BRAND_LOGO_ICON;
export const WORDMARK = BRAND_WORDMARK;

/** Default public origin (apex); override with `NEXT_PUBLIC_SITE_URL` in env-aware code via `siteUrl()`. */
export const BRAND_CANONICAL_ORIGIN = "https://zoveto.com";
