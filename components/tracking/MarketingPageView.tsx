"use client";

import { useEffect } from "react";
import { trackMarketingEvent, type MarketingEventName } from "@/lib/tracking";

type Props = {
  eventName: Extract<MarketingEventName, "pricing_view" | "compare_page_view">;
  params?: Record<string, string | number | boolean | null | undefined>;
};

export function MarketingPageView({ eventName, params = {} }: Props) {
  useEffect(() => {
    trackMarketingEvent(eventName, params);
  }, [eventName, params]);

  return null;
}

export default MarketingPageView;
