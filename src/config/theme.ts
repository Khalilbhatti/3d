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
 * Dark, cinematic palette. Near-black surfaces with warm light text and a single
 * configurable accent. The whole site reads these tokens, so this one object
 * controls the theme. (`paper` = the dark surface role, `ink` = the light text
 * role — kept as the original token names so every component maps automatically.)
 */
export const palette = {
  paper: "#0A0A0F", // primary near-black surface
  paperDeep: "#14141B", // elevated surface / raised panels
  ink: "#F4F1EA", // primary text (warm light)
  inkSoft: "#BDB8AD", // secondary text
  muted: "#6E6A62", // muted captions / metadata
  accent: "#D6A24A", // warm gold — configurable key colour
  accentDeep: "#B07E30", // pressed / hover accent
  line: "#F4F1EA", // hairline dividers (used at low alpha)
} as const;

/**
 * Light counterpart, toggled in via `[data-theme="light"]` on <html> (see
 * ThemeToggle). Same token roles, inverted: `paper` is the warm cream
 * surface, `ink` the near-black text. Every component already reads these
 * roles rather than hardcoded colours, so the toggle needs no component
 * changes — only this palette + the CSS it's written into.
 */
export const paletteLight = {
  paper: "#F7F4EC",
  paperDeep: "#ECE6D6",
  ink: "#1A1712",
  inkSoft: "#3D372C",
  muted: "#8A8272",
  accent: "#B07E30",
  accentDeep: "#8C6425",
  line: "#1A1712",
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
   * Items without a home section (Portfolio, Our Team, Insights) always
   * navigate to their dedicated page, on the homepage or anywhere else.
   */
  sectionId?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", note: "Smart solutions for your business" },
  { label: "Services", href: "/services", note: "What we build & deliver", sectionId: "ch-services" },
  { label: "Portfolio", href: "/portfolio", note: "Every project we've shipped" },
  { label: "Our Team", href: "/team", note: "The people behind your project" },
  { label: "Insights", href: "/insights", note: "Guides & field notes" },
  { label: "About", href: "/about", note: "Who we are & how we work", sectionId: "ch-about" },
  { label: "Contact", href: "/contact", note: "Get a quote & book a call", sectionId: "contact" },
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
