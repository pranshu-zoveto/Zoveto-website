/** Confirmed subprocessors — single source for /subprocessors and DPA summary tables. */
export type Subprocessor = {
  provider: string;
  purpose: string;
  region: string;
};

export const SUBPROCESSORS: readonly Subprocessor[] = [
  {
    provider: "Amazon Web Services (AWS)",
    purpose: "Cloud hosting, compute, storage, networking, and infrastructure operations",
    region: "Global infrastructure (region varies by deployment and service)",
  },
  {
    provider: "Google Analytics",
    purpose: "Website analytics and aggregate traffic insights (when analytics consent is enabled)",
    region: "Global",
  },
  {
    provider: "Google Tag Manager",
    purpose: "Tag loading and marketing/measurement tags on the marketing site (when analytics consent is enabled)",
    region: "Global",
  },
  {
    provider: "Microsoft Clarity",
    purpose:
      "Website session replay, heatmaps, and behavioral diagnostics on the marketing site (when analytics consent is enabled)",
    region: "Global",
  },
  {
    provider: "Razorpay",
    purpose: "Payment processing, billing workflows, and transaction records",
    region: "India / Global depending on payment flow",
  },
  {
    provider: "Google (Gmail SMTP)",
    purpose: "Transactional email delivery and account/service communication",
    region: "Global",
  },
] as const;
