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
  name: "Auren",
  /** Full institutional name. */
  full: "The Auren Archive",
  /** One-line positioning statement. */
  tagline: "An archive of light — the invented painting traditions of the Auren Coast.",
  /** Longer descriptor used in metadata + about hero. */
  description:
    "A digital archive and study of the Auren School: a fictional lineage of luminist landscape, court manuscript, and nocturne painting composed for demonstration.",
  founded: "MMXXV",
  location: "Harbour Wing, Old Customs House",
  email: "study@auren-archive.example.com",
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

export const fonts = {
  /** CSS variable names supplied by next/font in layout.tsx. */
  display: "--font-display",
  sans: "--font-sans",
  mono: "--font-mono",
} as const;

export type NavItem = { label: string; href: string; note?: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", note: "The story of the Auren light" },
  { label: "Collections", href: "/collections", note: "Five bodies of work" },
  { label: "Archive", href: "/archive", note: "Every catalogued work" },
  { label: "Artists", href: "/artists", note: "Hands behind the school" },
  { label: "Journal", href: "/journal", note: "Essays & field notes" },
  { label: "About", href: "/about", note: "The archive & its method" },
  { label: "Contact", href: "/contact", note: "Study visits & enquiries" },
];

export const socialLinks: NavItem[] = [
  { label: "Instagram", href: "https://example.com" },
  { label: "Are.na", href: "https://example.com" },
  { label: "Newsletter", href: "https://example.com" },
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

/** Serialise the vars into a `:root { ... }` block for a server-injected <style>. */
export function themeStyleString(): string {
  const body = Object.entries(themeCssVars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");
  return `:root{${body}}`;
}
