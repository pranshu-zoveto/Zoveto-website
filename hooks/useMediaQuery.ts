"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media-query hook.
 *
 * Returns `false` on the server and on the initial client render. After
 * hydration, the first `useEffect` pass synchronises with the real
 * `matchMedia` result and subscribes to subsequent changes.
 *
 * Consumers that need to render different markup on mobile vs desktop should
 * either (a) accept a brief post-hydration swap, or (b) prefer pure-CSS
 * `lg:hidden` / `hidden lg:block` patterns when the markup difference can be
 * expressed as a visibility toggle.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export default useMediaQuery;
