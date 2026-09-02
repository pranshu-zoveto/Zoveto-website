"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductDemoReel from "./ProductDemoReel";
import { demoPinDistancePx, demoZoomScale } from "@/lib/product-demo-pin-math";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ST_ID = "product-demo-reel-pin";

function measureSourceWidth(scaler: HTMLElement): number {
  const frame = scaler.querySelector(".aspect-video");
  if (frame instanceof HTMLElement) return frame.offsetWidth;
  return scaler.offsetWidth;
}

export default function ProductDemoReelPinnedDesktop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const scaler = scaleRef.current;
      if (!root || !pin || !scaler) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 1024) return;

      const targetScale = () =>
        demoZoomScale(measureSourceWidth(scaler), window.innerWidth, window.innerHeight) ?? 1;

      gsap.set(scaler, { transformOrigin: "center center" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: ST_ID,
          trigger: pin,
          start: "center center",
          end: () => `+=${demoPinDistancePx(window.innerHeight)}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            scaler.style.willChange = self.isActive ? "transform" : "auto";
          },
          onRefresh: (self) => {
            pin.dataset.pinDist = String(Math.round(self.end - self.start));
          },
          onUpdate: (self) => {
            pin.dataset.progress = self.progress.toFixed(3);
          },
        },
      });

      tl.to(scaler, { scale: targetScale, duration: 0.35 });
      tl.to(scaler, { scale: targetScale, duration: 0.3 });
      tl.to(scaler, { scale: 1, duration: 0.35 });

      let refreshTimer = 0;
      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 60);
      };

      root.addEventListener("loadedmetadata", scheduleRefresh, true);
      root.addEventListener("loadeddata", scheduleRefresh, true);
      void document.fonts?.ready.then(scheduleRefresh);
      let rafInner = 0;
      const rafOuter = requestAnimationFrame(() => {
        rafInner = requestAnimationFrame(scheduleRefresh);
      });

      return () => {
        window.clearTimeout(refreshTimer);
        cancelAnimationFrame(rafOuter);
        cancelAnimationFrame(rafInner);
        root.removeEventListener("loadedmetadata", scheduleRefresh, true);
        root.removeEventListener("loadeddata", scheduleRefresh, true);
        scaler.style.willChange = "auto";
        ScrollTrigger.getById(ST_ID)?.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-product-demo-pin-root="">
      <div ref={pinRef} data-product-demo-pin="" className="relative z-[2] w-full">
        <div ref={scaleRef} className="mx-auto w-full max-w-content">
          <ProductDemoReel />
        </div>
      </div>
    </div>
  );
}
