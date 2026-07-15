"use client";

import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Magnetic wrapper for a primary call-to-action. On fine-pointer devices the
 * wrapper eases a small distance toward the cursor (spring-damped), giving the
 * button a premium "pull" without ever moving out from under the pointer — the
 * displacement is hard-clamped to `max` px. Only `transform` is animated, so it
 * never conflicts with the button's own colour/border hover transitions.
 *
 * The wrapper is `inline-block` and never changes size, so layout is untouched.
 * Disabled entirely on touch devices and under `prefers-reduced-motion` (falls
 * back to a plain span). The spring settles to rest and stops — no idle loop.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.32,
  max = 14,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset applied as displacement (0–1). */
  strength?: number;
  /** Maximum displacement in px, in each axis. */
  max?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 14, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 170, damping: 14, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  const clamp = (n: number) => Math.max(-max, Math.min(max, n));

  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block", willChange: "transform" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  );
}
