"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Drives Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync via the
 * shared gsap.ticker (single rAF loop). Users who prefer reduced motion get
 * native scrolling and no smoothing. The `reduce-motion` class on <html>
 * lets CSS neutralise any reveal states if JS never animates them.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // expose for components that want to lock scroll (menu, viewer)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced]);

  // On route change, jump to top and refresh triggers after paint.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}

/** Imperatively stop/start Lenis (used by menu + fullscreen viewer). */
export function lockScroll(lock: boolean) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lock ? lenis.stop() : lenis.start();
  }
  document.documentElement.classList.toggle("overflow-hidden", lock);
}
