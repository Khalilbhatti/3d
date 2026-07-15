"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's reduced-motion preference. Components use this to skip
 * GSAP timelines and heavy WebGL, falling back to static/instant states.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
