"use client";

import { useEffect } from "react";
import { trackEvent, trackMarketingEvent } from "@/lib/tracking";

/** Fires conversion events when a Calendly embed schedules a meeting (postMessage). */
export function useCalendlyBookingListener(source: string) {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (typeof event.origin !== "string" || !event.origin.includes("calendly.com")) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if ((data as { event?: string }).event !== "calendly.event_scheduled") return;

      trackMarketingEvent("calendly_booking", { source });
      trackEvent("generate_lead", { method: "calendly_booking", source });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [source]);
}
