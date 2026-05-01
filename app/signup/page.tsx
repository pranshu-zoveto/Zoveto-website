import type { Metadata } from "next";
import SignupClient from "./_SignupClient";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request Early Access | Zoveto",
  description:
    "Join the founder-reviewed Zoveto early access queue. Qualified operations teams are onboarded manually.",
  alternates: { canonical: canonicalUrl("/signup") },
  robots: { index: true, follow: false },
  openGraph: {
    title: "Request Early Access | Zoveto",
    description: "Apply for founder-reviewed onboarding into the Zoveto operating system.",
    url: canonicalUrl("/signup"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Early Access | Zoveto",
    description: "Join the controlled early access queue for qualified operations teams.",
    images: ["/og-image.png"],
  },
};

export default SignupClient;
