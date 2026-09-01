"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const POSTER_SRC = "/videos/product-demo-poster.jpg";
const VIDEO_SRC = "/videos/product-demo.mp4";
const VIDEO_DESCRIPTION =
  "Screen recording of the Zoveto product: the Command Center overview, a Sales & CRM quotation-to-order list, the Operations warehouse pick list, and the Finance sales-invoice register with GST status, shown in sequence.";

function primeVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
}

export function ProductDemoReel() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldPlayRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [sourceAttached, setSourceAttached] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "120px 0px" },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) setSourceAttached(true);
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = sourceAttached && inView && !reduceMotion;
    shouldPlayRef.current = shouldPlay;
    primeVideo(video);

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      if (!shouldPlayRef.current) return;
      primeVideo(video);
      void video.play().catch(() => {
        window.setTimeout(() => {
          if (!shouldPlayRef.current) return;
          void video.play().catch(() => undefined);
        }, 250);
      });
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [inView, reduceMotion, sourceAttached]);

  function restartIfNeeded() {
    const video = videoRef.current;
    if (!video || !shouldPlayRef.current) return;
    if (video.ended) video.currentTime = 0;
    void video.play().catch(() => undefined);
  }

  return (
    <figure ref={rootRef} className="mx-auto w-full max-w-content px-4 sm:px-6">
      <p className="sr-only">{VIDEO_DESCRIPTION}</p>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-background">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={sourceAttached ? VIDEO_SRC : undefined}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPause={() => {
            if (!shouldPlayRef.current) return;
            restartIfNeeded();
          }}
          onEnded={restartIfNeeded}
        />
        {reduceMotion ? (
          <Image
            src={POSTER_SRC}
            alt=""
            fill
            sizes="(min-width: 1152px) 72rem, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
    </figure>
  );
}

export default ProductDemoReel;
