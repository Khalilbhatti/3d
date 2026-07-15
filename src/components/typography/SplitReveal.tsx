"use client";

import { type ElementType, type ReactNode, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface SplitRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Granularity of the split. */
  type?: "lines" | "words" | "chars";
  stagger?: number;
  duration?: number;
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
  start?: string;
}

/**
 * Masked, staggered text reveal built on GSAP SplitText. The real text is
 * server-rendered (accessible + indexable); SplitText only enhances it on the
 * client. Reduced-motion users see the text immediately, un-split.
 */
export function SplitReveal({
  children,
  as = "h2",
  className,
  type = "lines",
  stagger = 0.09,
  duration = 1.1,
  delay = 0,
  immediate = false,
  start = "top 82%",
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const Tag = as as ElementType;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      const build = () => {
        split = new SplitText(el, {
          type,
          // GSAP 3.13 auto-wraps targets in overflow-hidden clip masks.
          mask: type,
          linesClass: "split-line",
        });
        const targets =
          type === "lines" ? split.lines : type === "words" ? split.words : split.chars;

        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          targets,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration,
            delay,
            ease: "power4.out",
            stagger,
            scrollTrigger: immediate
              ? undefined
              : { trigger: el, start, once: true },
          }
        );
      };

      // Split after web fonts settle so line breaks are measured correctly.
      if (document.fonts?.status === "loaded") build();
      else document.fonts?.ready.then(build);
    }, ref);

    return () => {
      split?.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <Tag
      ref={ref}
      data-reveal
      // hidden only once JS is confirmed running, to avoid a flash of unsplit text
      className={cn("[&:not([data-reveal])]:opacity-100", className)}
      style={reduced ? undefined : { visibility: "visible" }}
    >
      {children}
    </Tag>
  );
}
