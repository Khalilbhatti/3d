"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * 3D tilt frame. On fine-pointer devices the element leans a few degrees toward
 * the cursor (spring-damped) — a "painting catching the light / paper lifting"
 * depth cue that echoes the WebGL hero. Only `transform` (rotateX/Y) is animated
 * on THIS element, so it never conflicts with a child's `group-hover:scale` or an
 * ancestor reveal's translate/opacity.
 *
 * A gold "sheen" — a diagonal light sweep — passes across on hover (transform of
 * a gradient overlay), reinforcing the luminist motif. The sheen keys off the
 * nearest `.group` ancestor, so it works with the cards' existing group-hover.
 *
 * Disabled (plain frame) on touch and under `prefers-reduced-motion`; the springs
 * settle to rest and stop — no idle loop, no layout shift.
 */
export function TiltCard({
  children,
  className,
  style,
  max = 9,
  sheen = true,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  /** Render the diagonal gold light-sweep on hover. */
  sheen?: boolean;
  /** Render the soft gold edge-glow ring on hover. */
  glow?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 } as const;
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches && !reduced);
  }, [reduced]);

  const sheenEl = sheen ? (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <span className="absolute -inset-y-6 -left-1/3 w-1/3 -translate-x-[220%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(240,205,75,0.18),transparent)] transition-transform duration-[1100ms] ease-editorial group-hover:translate-x-[420%]" />
    </span>
  ) : null;
  const glowEl = glow ? (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-0 shadow-[inset_0_0_0_1px_rgba(240,205,75,0.35)] transition-opacity duration-500 group-hover:opacity-100"
    />
  ) : null;

  if (!enabled) {
    return (
      <div className={className} style={style}>
        {children}
        {sheenEl}
        {glowEl}
      </div>
    );
  }

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
      {sheenEl}
      {glowEl}
    </motion.div>
  );
}
