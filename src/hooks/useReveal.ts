"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Fraction of the element visible before it triggers (0–1). */
  threshold?: number;
  /** rootMargin, e.g. "0px 0px -12% 0px" to trigger slightly early. */
  rootMargin?: string;
  /** Re-hide when it scrolls away (default false = reveal once). */
  repeat?: boolean;
}

/**
 * Lightweight IntersectionObserver reveal. Cheap alternative to a ScrollTrigger
 * for the many simple fade/rise reveals across the site. Returns a ref + a
 * boolean the caller maps to CSS transition state.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.15, rootMargin = "0px 0px -10% 0px", repeat = false }: Options = {}
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) io.unobserve(el);
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, repeat]);

  return { ref, inView };
}
