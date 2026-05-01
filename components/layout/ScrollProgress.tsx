"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const max = Math.max(root.scrollHeight - window.innerHeight, 1);
      const next = Math.min((window.scrollY / max) * 100, 100);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${next / 100})`;
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[120] h-[2px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-blue"
        style={{ transform: "scaleX(0)" }}
        aria-hidden
      />
    </div>
  );
}

export default ScrollProgress;
