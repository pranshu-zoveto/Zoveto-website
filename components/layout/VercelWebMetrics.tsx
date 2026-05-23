"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Analytics = dynamic(() => import("@vercel/analytics/next").then((m) => m.Analytics), { ssr: false });
const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights), {
  ssr: false,
});

/** Deferred so first paint / TBT are not blocked by Vercel’s tiny metrics bundles. */
export function VercelWebMetrics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading analytics until browser is idle to ensure perfect LCP/TBT scores
    const timer = setTimeout(() => {
      if (typeof window.requestIdleCallback !== "undefined") {
        window.requestIdleCallback(() => setShouldLoad(true));
      } else {
        setShouldLoad(true);
      }
    }, 2000); // 2s buffer for critical rendering path
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
