"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const progressElement = document.getElementById("scroll-progress");
    const update = () => {
      if (!progressElement) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      progressElement.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}

export default SmoothScroll;
