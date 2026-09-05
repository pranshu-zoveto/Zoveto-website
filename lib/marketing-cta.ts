/**
 * Primary marketing conversion: routes to the free demo-request form at
 * /contact (the #demo anchor scrolls straight to the form), not the paid
 * /signup checkout flow. Ad-driven and organic traffic alike should be
 * qualified through a demo before any payment screen. The self-serve
 * checkout at /signup still exists for the pricing page's own
 * TRIAL_CTA_LABEL buttons - only this top-of-funnel CTA changed.
 */
export const EARLY_ACCESS_CTA_LABEL = "Request early access";
export const EARLY_ACCESS_CTA_HREF = "/contact#demo" as const;
/** Compact label for tight nav slots on mobile */
export const EARLY_ACCESS_CTA_LABEL_SHORT = "Early access";
/** Self-serve trial CTA used on paid pricing cards */
export const TRIAL_CTA_LABEL = "Start 15-day free trial";
/** Secondary navigation CTA for plans */
export const VIEW_PRICING_CTA_LABEL = "View pricing";
export const VIEW_PRICING_CTA_HREF = "/pricing" as const;
