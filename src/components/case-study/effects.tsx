"use client";

import { useId } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import parkoPulseData from "@/content/lottie/parko-pulse.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/**
 * Magic UI-style animated grid pattern, reimplemented on the project's existing
 * Framer Motion dependency (no new package). Squares fade in and out on a
 * staggered loop behind hero/section content — the parking-space grid is a
 * deliberate nod to Parko's own product surface.
 */
export function AnimatedGridPattern({
  numSquares = 40,
  className,
}: {
  numSquares?: number;
  className?: string;
}) {
  const id = useId();
  const cols = 10;
  const rows = Math.ceil(numSquares / cols);
  const squares = Array.from({ length: numSquares }, (_, i) => ({
    x: (i % cols) * (100 / cols),
    y: Math.floor(i / cols) * (100 / rows),
    delay: ((i * 37) % 100) / 20,
  }));

  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <mask id={id}>
          <rect width="100%" height="100%" fill="url(#parko-grid-fade)" />
          <radialGradient id="parko-grid-fade" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        {squares.map((sq, i) => (
          <motion.rect
            key={i}
            x={`${sq.x}%`}
            y={`${sq.y}%`}
            width={`${100 / cols - 0.6}%`}
            height={`${100 / rows - 0.6}%`}
            rx={2}
            fill="rgb(var(--accent))"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 3.2, delay: sq.delay, repeat: Infinity, repeatDelay: rows * 0.3, ease: "easeInOut" }}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Magic UI-style BorderBeam, reimplemented on Framer Motion (no new package,
 * no experimental CSS motion-path) — a small gradient comet loops the
 * rectangular edge of its positioned parent via percentage-based left/top
 * keyframes, which trace a perfect rectangle regardless of the container's
 * aspect ratio. Purely decorative (`aria-hidden`); parent needs `position: relative`.
 */
export function BorderBeam({ className, duration = 8 }: { className?: string; duration?: number }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} style={{ borderRadius: "inherit" }}>
      <motion.span
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgb(var(--accent)) 0%, rgb(var(--accent) / 0) 70%)" }}
        animate={{ left: ["0%", "100%", "100%", "0%", "0%"], top: ["0%", "0%", "100%", "100%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}

/** Hand-authored, self-contained radar-pulse Lottie asset — a small motif near the ticket/QR content. */
export function LottiePulse({ className, size = 96 }: { className?: string; size?: number }) {
  return (
    <div aria-hidden className={cn("pointer-events-none", className)} style={{ width: size, height: size }}>
      <Lottie animationData={parkoPulseData} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
