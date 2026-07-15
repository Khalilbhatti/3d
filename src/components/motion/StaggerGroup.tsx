"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { stagger as staggerTokens, duration, easing, distance, inView } from "@/motion/tokens";

type Tag = "div" | "ul" | "ol" | "section";

/**
 * Orchestrates a staggered reveal of its <StaggerItem> children as the group
 * scrolls into view — one parent IntersectionObserver drives all children (no
 * per-item observer). Reduced-motion collapses the stagger to an instant fade.
 * Pair with <StaggerItem> for the individual elements.
 */
export function StaggerGroup({
  children,
  className,
  gap = staggerTokens.normal,
  as = "div",
  amount = inView.amount,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: Tag;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap } },
  };
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: inView.once, amount }}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

/** A single child of <StaggerGroup>. Rises + fades on its scheduled beat. */
export function StaggerItem({
  children,
  className,
  y = distance.md,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: Tag | "li" | "figure" | "article" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.component, ease: easing.editorial },
    },
  };
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
