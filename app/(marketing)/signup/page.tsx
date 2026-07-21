import SignupClient from "./_SignupClient";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { BILLING_MODULES, type BillingModuleKey } from "@/lib/modular-billing-config";

export const metadata = buildPageMetadata({
  pathname: "/signup",
  title: "Request early access | Zoveto",
  description:
    "Request early access to Zoveto. Start a 15-day trial on Operations Suite or Business OS. Secure checkout, no charge until day 15.",
  index: false,
  follow: false,
});

const VALID_MODULE_KEYS = new Set(BILLING_MODULES.map((m) => m.key));

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { module?: string };
}) {
  const rawModule = searchParams?.module?.toUpperCase();
  const preSelected =
    rawModule && VALID_MODULE_KEYS.has(rawModule as BillingModuleKey)
      ? (rawModule as BillingModuleKey)
      : null;

  return <SignupClient preSelectedModule={preSelected} />;
}
