/**
 * Central motion tokens — one source of truth for the site's motion language so
 * every animation shares the same easing, timing, spring feel and travel
 * distances. Import these instead of hand-writing cubic-beziers or durations.
 *
 * Hierarchy (see the motion brief): micro (120–300ms) for controls, component
 * (350–700ms) for cards/reveals, section (700–1400ms) for large compositions,
 * ambient (slow, continuous) for backgrounds.
 */

/** Cubic-bezier easing curves. `editorial` is the house ease-out. */
export const easing = {
  editorial: [0.22, 1, 0.36, 1],
  inOutQuint: [0.83, 0, 0.17, 1],
  soft: [0.4, 0, 0.2, 1],
  out: [0.16, 1, 0.3, 1],
} as const;

/** Durations in seconds, grouped by motion tier. */
export const duration = {
  micro: 0.24,
  component: 0.6,
  section: 0.95,
  ambient: 6,
} as const;

/** Stagger intervals in seconds. */
export const stagger = {
  tight: 0.05,
  normal: 0.09,
  loose: 0.14,
} as const;

/** Framer Motion spring presets. */
export const spring = {
  soft: { type: "spring", stiffness: 150, damping: 20, mass: 0.4 },
  snappy: { type: "spring", stiffness: 220, damping: 24 },
  magnetic: { type: "spring", stiffness: 170, damping: 14, mass: 0.35 },
  tilt: { type: "spring", stiffness: 150, damping: 18, mass: 0.4 },
} as const;

/** Travel distances in px for translate-based reveals. */
export const distance = {
  sm: 16,
  md: 36,
  lg: 64,
} as const;

/** Viewport thresholds for scroll-in reveals. */
export const inView = {
  amount: 0.2,
  once: true,
} as const;

/** Blur amounts (px) for blur-in reveals. */
export const blur = {
  soft: 8,
  strong: 14,
} as const;
