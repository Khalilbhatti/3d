"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns false until mounted. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Convenience: true on viewports narrower than the `md` breakpoint (768px). */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
