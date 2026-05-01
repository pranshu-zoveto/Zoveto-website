"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

/**
 * Emits GA4 page_view events on route updates.
 * Safe no-op when gtag is unavailable or consent is not granted.
 */
export function AnalyticsRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = window.location.search || "";
    const pagePath = search ? `${pathname}${search}` : pathname;

    trackEvent("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });
  }, [pathname]);

  return null;
}

export default AnalyticsRouteTracker;
