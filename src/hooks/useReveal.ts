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
          if (!repeat) cleanupFallback();
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);

    /* Safety net. Under the smooth-scroll layer the observer occasionally never
       delivers an "intersecting" callback for elements that are plainly on
       screen, leaving content stuck hidden. A cheap rAF-throttled scroll/resize
       check reveals anything that enters the viewport, so nothing is ever left
       invisible. It only ever reveals (never hides), so working pages are
       unaffected — the observer almost always wins the race. */
    let raf = 0;
    const isOnScreen = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    const check = () => {
      raf = 0;
      if (isOnScreen()) {
        setInView(true);
        if (!repeat) cleanupFallback();
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    function cleanupFallback() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const initial = window.setTimeout(check, 300);

    return () => {
      io.disconnect();
      cleanupFallback();
      clearTimeout(initial);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold, rootMargin, repeat]);

  return { ref, inView };
}
