import SignupClient from "./_SignupClient";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  pathname: "/signup",
  title: "Get started with Zoveto | Zoveto",
  description:
    "Manual onboarding for every business: share your operations pain; we review within 24 to 48 hours and prepare your workspace before access.",
  index: false,
  follow: false,
});

export default SignupClient;
