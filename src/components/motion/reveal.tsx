"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type RevealVariant =
  | "up"
  | "down"
  | "fade"
  | "blur"
  | "clip"
  | "scale"
  | "left"
  | "right"
  | "rotate";

type Tag = "div" | "section" | "article" | "li" | "figure" | "span" | "p" | "h2" | "h3" | "ul" | "ol";

const V: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -32 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(14px)", y: 16 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
  clip: { hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" }, show: { opacity: 1, clipPath: "inset(0 0 0% 0)" } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  rotate: { hidden: { opacity: 0, rotate: -5, y: 26 }, show: { opacity: 1, rotate: 0, y: 0 } },
};

const FADE: Variants = { hidden: { opacity: 0 }, show: { opacity: 1 } };

interface Props {
  children: ReactNode;
  variant?: RevealVariant;
  as?: Tag;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Framer Motion scroll reveal with a library of distinct variants (up / blur /
 * clip / scale / slide / rotate…). Respects reduced-motion (plain fade). Use
 * across sections so the site's motion reads as varied rather than uniform.
 */
export function MReveal({
  children,
  variant = "up",
  as = "div",
  className,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={reduce ? FADE : V[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Stagger container — children using <StaggerItem> reveal in sequence. */
export function Stagger({
  children,
  as = "div",
  className,
  gap = 0.09,
  delay = 0,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  gap?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  variant = "up",
  as = "div",
  className,
  duration = 0.6,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  as?: Tag;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={reduce ? FADE : V[variant]}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
