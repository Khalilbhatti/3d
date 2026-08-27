"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Statistic counter. Counts from zero to the target once, the first time it
 * scrolls into view (IntersectionObserver via useReveal). The self-cancelling
 * rAF settles and stops — no persistent loop, no state churn once complete.
 *
 * Accessibility: the true value is always exposed via `aria-label`, so screen
 * readers announce the real figure regardless of the visual tween. When
 * `prefers-reduced-motion` is set, the final value renders immediately.
 *
 * Non-numeric values (or numbers wrapped in symbols like "1,200+") are parsed
 * for their numeric core and re-wrapped with the original prefix/suffix; if no
 * number is found the value is rendered verbatim.
 */
export function Counter({
  value,
  duration = 1700,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useReveal<HTMLSpanElement>({ threshold: 0.6 });

  const match = value.match(/^(\D*)(\d[\d,]*)(\D*)$/);
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";
  const grouped = match ? match[2].includes(",") : false;
  const target = match ? Number.parseInt(match[2].replace(/,/g, ""), 10) : Number.NaN;
  const parsable = !Number.isNaN(target);

  const fmt = (n: number) => `${prefix}${grouped ? n.toLocaleString() : n}${suffix}`;
  // Initial (server-rendered) paint always shows the real value — so it's never
  // exposed as "0" before hydration or to crawlers. The reveal animation resets
  // to zero and counts back up only once the element actually scrolls into view.
  const [display, setDisplay] = useState(() =>
    !parsable || reduced ? value : fmt(target)
  );

  useEffect(() => {
    if (!parsable || reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let raf = 0;
    let start = 0;
    setDisplay(fmt(0));
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic — natural settle
      setDisplay(fmt(Math.round(eased * target)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(fmt(target));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, parsable, reduced, target, duration, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
