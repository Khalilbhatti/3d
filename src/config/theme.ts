/**
 * =============================================================================
 *  THEME + BRAND CONFIGURATION  — single source of truth
 * =============================================================================
 *
 *  Everything the client is allowed to rebrand lives here: palette, fonts,
 *  brand strings, navigation, and social links. Colours are authored as hex
 *  and converted to "R G B" triplets that feed the CSS custom properties in
 *  globals.css (so Tailwind's <alpha-value> keeps working — e.g. `bg-paper/70`).
 *
 *  To re-theme the whole site, edit `palette` and `brand` below. See
 *  docs/CONTENT_EDITING.md for the full guide.
 */

export const brand = {
  /** Short mark used in the header / footer. */
  name: "GitzTech",
  /** Full company name. */
  full: "GitzTech",
  /** One-line positioning statement. */
  tagline: "Smart solutions for your business — every byte in excellence.",
  /** Longer descriptor used in metadata + about hero. */
  description:
    "We believe that the future will be brighter with GitzTech. Our mission is to provide cutting-edge solutions that enhance business efficiency, sustainability, and connectivity.",
  founded: "2026",
  location: "GHS Lahore, Pakistan",
  email: "info@gitztech.com",
  phone: "(+92) 343 191 1380",
  hours: "Mon – Fri 03:00 PM to 12:00 AM",
} as const;

/**
 * Dark, cinematic palette matched to the GitzTech brand mark: deep navy
 * surfaces with cool light text and a warm orange accent. The whole site
 * reads these tokens, so this one object controls the theme. (`paper` = the
 * dark surface role, `ink` = the light text role — kept as the original
 * token names so every component maps automatically.)
 */
export const palette = {
  paper: "#0E2038", // rich navy surface (reads as navy, not near-black)
  paperDeep: "#17304F", // elevated surface / raised panels
  ink: "#F3F5F8", // primary text (cool light)
  inkSoft: "#C1CBDC", // secondary text
  muted: "#7C90AC", // muted captions / metadata
  accent: "#FF9807", // exact brand orange, sampled from the logo
  accentDeep: "#E07E00", // pressed / hover accent
  line: "#F3F5F8", // hairline dividers (used at low alpha)
} as const;

/**
 * Light counterpart, toggled in via `[data-theme="light"]` on <html> (see
 * ThemeToggle). Same token roles, inverted: `paper` is a cool off-white
 * surface, `ink` the brand navy. Every component already reads these
 * roles rather than hardcoded colours, so the toggle needs no component
 * changes — only this palette + the CSS it's written into.
 */
export const paletteLight = {
  paper: "#F5F7FA",
  paperDeep: "#E6EBF2",
  ink: "#10325C", // exact brand navy, sampled from the logo
  inkSoft: "#33507A",
  muted: "#5E7290",
  accent: "#A85200",
  accentDeep: "#7A3C00",
  line: "#10325C",
} as const;

export const fonts = {
  /** CSS variable names supplied by next/font in layout.tsx. */
  display: "--font-display",
  sans: "--font-sans",
  mono: "--font-mono",
} as const;

export type NavItem = {
  label: string;
  href: string;
  note?: string;
  /**
   * Id of the matching section on the home story. When set, and the visitor
   * is already on `/`, the header/menu smooth-scroll here instead of
   * navigating — the section stays in place alongside the rest of the page.
   * Items without a home section (Portfolio, Our Team, Blog) always
   * navigate to their dedicated page, on the homepage or anywhere else.
   */
  sectionId?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", note: "Smart solutions for your business" },
  { label: "Services", href: "/services", note: "What we build & deliver", sectionId: "our-services" },
  { label: "Portfolio", href: "/portfolio", note: "Every project we've shipped" },
  { label: "Case Studies", href: "/case-studies", note: "Deep dives into how we work" },
  { label: "Our Team", href: "/team", note: "The people behind your project" },
  { label: "Blog", href: "/blog", note: "Strategy & field notes" },
  { label: "About", href: "/about", note: "Who we are & how we work", sectionId: "ch-about" },
  { label: "Contact", href: "/contact", note: "Get a quote & book a call", sectionId: "our-contact" },
];

export const socialLinks: NavItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

/* -------------------------------------------------------------------------- */
/*  Colour plumbing — do not edit below unless you know what you're doing.     */
/* -------------------------------------------------------------------------- */

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Map of CSS custom property name -> "R G B" triplet. */
export const themeCssVars: Record<string, string> = {
  "--paper": hexToRgbTriplet(palette.paper),
  "--paper-deep": hexToRgbTriplet(palette.paperDeep),
  "--ink": hexToRgbTriplet(palette.ink),
  "--ink-soft": hexToRgbTriplet(palette.inkSoft),
  "--muted": hexToRgbTriplet(palette.muted),
  "--accent": hexToRgbTriplet(palette.accent),
  "--accent-deep": hexToRgbTriplet(palette.accentDeep),
  "--line": hexToRgbTriplet(palette.line),
};

const themeCssVarsLight: Record<string, string> = {
  "--paper": hexToRgbTriplet(paletteLight.paper),
  "--paper-deep": hexToRgbTriplet(paletteLight.paperDeep),
  "--ink": hexToRgbTriplet(paletteLight.ink),
  "--ink-soft": hexToRgbTriplet(paletteLight.inkSoft),
  "--muted": hexToRgbTriplet(paletteLight.muted),
  "--accent": hexToRgbTriplet(paletteLight.accent),
  "--accent-deep": hexToRgbTriplet(paletteLight.accentDeep),
  "--line": hexToRgbTriplet(paletteLight.line),
};

/** Serialise the vars into `:root` (dark, default) and `[data-theme="light"]`
 *  blocks for a server-injected <style> — no colour flash either way. */
export function themeStyleString(): string {
  const dark = Object.entries(themeCssVars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");
  const light = Object.entries(themeCssVarsLight)
    .map(([k, v]) => `${k}:${v};`)
    .join("");
  return `:root{${dark}}:root[data-theme="light"]{${light}}`;
}
