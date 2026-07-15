"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * A paragraph whose words brighten from muted to ink as it is scrolled through
 * — a scroll-controlled read. Used sparingly (one or two per page) so text
 * stays readable. Words are real DOM text; reduced-motion shows them fully lit.
 */
export function ScrollParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      const spans = el.querySelectorAll<HTMLElement>("[data-word]");
      gsap.set(spans, { opacity: 0.24 });
      gsap.to(spans, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <p
      ref={ref}
      data-reveal
      className={cn(
        "font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.32] text-ink",
        className
      )}
    >
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
