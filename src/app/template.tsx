"use client";

import { motion } from "framer-motion";

/**
 * App Router template — re-mounts on every navigation, so it plays an enter
 * transition per route (a soft rise + fade). Combined with Lenis' scroll-to-top
 * on route change, this gives cohesive Framer Motion page transitions.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
