"use client";

import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";

type Props = {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export function StatCounter({ end, suffix = "", prefix = "", decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const counter = new CountUp(ref.current, end, {
      duration: 2,
      decimalPlaces: decimals,
      suffix,
      prefix,
      useGrouping: true,
    });
    if (!counter.error) {
      counter.start();
    }
  }, [decimals, end, prefix, suffix]);

  return <span ref={ref} className={className} />;
}
