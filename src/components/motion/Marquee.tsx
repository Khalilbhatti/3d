import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. The track holds the content twice and translates
 * -50%, so the loop is gapless. Pure CSS transform animation (see .marquee-track
 * in globals.css) — GPU-only, no JS loop, pauses on hover, and freezes to a
 * static row under prefers-reduced-motion. Decorative, so aria-hidden.
 */
export function Marquee({
  children,
  className,
  durationSec = 34,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  durationSec?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("marquee flex overflow-hidden", className)} aria-hidden>
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={
          {
            "--marquee-dur": `${durationSec}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
