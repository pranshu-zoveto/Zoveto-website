"use client";

import dynamic from "next/dynamic";

const SiteChromeClients = dynamic(
  () => import("@/components/layout/SiteChromeClients").then((m) => ({ default: m.SiteChromeClients })),
  { ssr: false },
);

const VercelWebMetrics = dynamic(
  () => import("@/components/layout/VercelWebMetrics").then((m) => ({ default: m.VercelWebMetrics })),
  { ssr: false },
);

/** Consent, analytics, and metrics — client-only to avoid hydration mismatches. */
export function ClientOnlySiteChrome() {
  return (
    <>
      <SiteChromeClients />
      <VercelWebMetrics />
    </>
  );
}
