import type { Metadata } from "next";
import SignupClient from "./_SignupClient";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get started with Zoveto | Zoveto",
  description:
    "Manual onboarding for every business: share your operations pain, we review within 24–48 hours and prepare your workspace before access.",
  alternates: { canonical: canonicalUrl("/signup") },
  robots: { index: true, follow: false },
  openGraph: {
    title: "Get started with Zoveto | Zoveto",
    description:
      "Structured onboarding with your system configured before access. Typical response within 24–48 hours.",
    url: canonicalUrl("/signup"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get started with Zoveto | Zoveto",
    description:
      "Tell us where operations are breaking; we review, prepare your system, then onboard you with guided access.",
    images: ["/og-image.png"],
  },
};

export default SignupClient;
