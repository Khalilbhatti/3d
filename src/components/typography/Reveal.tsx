"use client";

import { type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "mask" | "scale";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: RevealVariant;
  /** Delay in ms, staggered reveals. */
  delay?: number;
  /** Distance in px for "up". */
  distance?: number;
  once?: boolean;
}

const hiddenFor: Record<RevealVariant, string> = {
  up: "opacity-0 translate-y-[var(--rv-d)]",
  fade: "opacity-0",
  mask: "opacity-0 [clip-path:inset(0_0_100%_0)]",
  scale: "opacity-0 scale-[0.96]",
};

/**
 * Generic, dependency-light reveal used across cards, captions, dividers and
 * images. Fully static (visible) for reduced-motion / no-JS via the
 * `.reduce-motion [data-reveal]` rule in globals.css and the fact that the
 * "shown" state is the default paint when JS is disabled.
 */
export function Reveal({
  children,
  as = "div",
  className,
  variant = "up",
  delay = 0,
  distance = 24,
  once = true,
}: RevealProps) {
  const Tag = as as ElementType;
  const { ref, inView } = useReveal<HTMLElement>({ repeat: !once });

  return (
    <Tag
      ref={ref}
      data-reveal
      style={
        {
          // custom prop consumed by the "up" variant + transition timing
          "--rv-d": `${distance}px`,
          transitionDelay: `${delay}ms`,
        } as React.CSSProperties
      }
      className={cn(
        "transition-[opacity,transform,clip-path] duration-[900ms] ease-editorial will-change-[opacity,transform]",
        inView ? "opacity-100 translate-y-0 scale-100 [clip-path:inset(0_0_0_0)]" : hiddenFor[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
