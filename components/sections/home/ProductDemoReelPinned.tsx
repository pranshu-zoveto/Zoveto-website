"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProductDemoReel from "./ProductDemoReel";

const ProductDemoReelPinnedDesktop = dynamic(() => import("./ProductDemoReelPinnedDesktop"), {
  ssr: false,
  loading: () => <ProductDemoReel />,
});

/**
 * Desktop (≥1024, motion allowed): pin/zoom wrapper around the existing reel.
 * Mobile/tablet and prefers-reduced-motion: the unmodified inline reel.
 */
export default function ProductDemoReelPinned() {
  const [enablePin, setEnablePin] = useState(false);

  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEnablePin(widthMq.matches && !motionMq.matches);
    };
    sync();
    widthMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    return () => {
      widthMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  if (!enablePin) return <ProductDemoReel />;
  return <ProductDemoReelPinnedDesktop />;
}
