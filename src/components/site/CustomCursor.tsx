"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Blended custom cursor — a lagging ring (spring) and an instant dot, both in
 * mix-blend-difference so they invert over any background. Grows over
 * interactive targets. Only enabled on fine pointers (desktop) and disabled for
 * reduced-motion; touch devices keep the native pointer.
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 480, damping: 40, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 480, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      setHovering(
        !!el?.closest?.("a, button, [role='button'], [data-cursor], input, textarea, select, label")
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{ x: rx, y: ry }}
        animate={{ scale: hovering ? 1.7 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <motion.div aria-hidden className="cursor-dot" style={{ x, y }} />
    </>
  );
}
