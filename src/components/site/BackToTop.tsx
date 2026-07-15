"use client";

import Lenis from "lenis";

export function BackToTop({ className }: { className?: string }) {
  function toTop() {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <button type="button" onClick={toTop} className={className}>
      Back to top ↑
    </button>
  );
}
