"use client";

import { type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { duration, easing, inView } from "@/motion/tokens";

/**
 * Curtain / clip-path reveal for media. The framed content is wiped into view
 * from bottom to top as it scrolls in — an editorial "print developing" reveal.
 * Only `clip-path` animates (compositor-friendly, no layout shift). Under
 * reduced-motion it renders the plain frame. Do NOT wrap content that is already
 * transform-animated by another system (e.g. a GSAP ParallaxArtwork) — use it on
 * otherwise-static media frames.
 */
export function ImageReveal({
  children,
  className,
  style,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  direction?: "up" | "down" | "left" | "right";
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const from: Record<typeof direction, string> = {
    up: "inset(0 0 100% 0)",
    down: "inset(100% 0 0 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: from[direction] }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: inView.once, amount: 0.3 }}
      transition={{ duration: duration.section, ease: easing.inOutQuint }}
    >
      {children}
    </motion.div>
  );
}
