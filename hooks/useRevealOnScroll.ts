"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number | number[];
  /** When true, skip observer — always revealed. */
  disabled?: boolean;
};

/**
 * Toggles `revealed` when the element enters the viewport (IntersectionObserver).
 * Pair parent with `.reveal-stagger` + `.reveal-item` children in CSS.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(options?: Options) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(!!options?.disabled);

  useLayoutEffect(() => {
    if (options?.disabled) {
      setRevealed(true);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
    }
  }, [options?.disabled]);

  useEffect(() => {
    if (options?.disabled || revealed) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? "0px 0px -8% 0px",
        threshold: options?.threshold ?? 0.14,
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.disabled, options?.rootMargin, options?.threshold, revealed]);

  return { ref, revealed };
}
