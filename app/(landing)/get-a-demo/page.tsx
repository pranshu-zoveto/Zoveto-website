import { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import GetADemoClient from "./GetADemoClient";

/**
 * Dedicated landing page for paid search traffic (Google Ads, India Search
 * campaign). Kept out of the main site nav intentionally — visitors land
 * here from an ad, not by browsing — and set to noindex so it doesn't
 * compete with /contact in organic search.
 */
export const metadata: Metadata = {
  title: "Get a Demo — Zoveto",
  description:
    "See Zoveto running with your own numbers in a 15-minute call. GST-native invoicing, INR billing, Razorpay built in. Built for Indian trading, distribution, and manufacturing teams.",
  alternates: { canonical: canonicalUrl("/get-a-demo") },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Get a Demo — Zoveto",
    description: "See your data in Zoveto in 15 minutes. GST-native, INR billing, Razorpay built in.",
    url: canonicalUrl("/get-a-demo"),
    images: ["/og-image.png"],
  },
};

export default function GetADemoPage() {
  return <GetADemoClient />;
}
