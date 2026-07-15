/** Tiny className joiner (no external dep). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Clamp a number to a range. */
export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Format an ArtPalette into a CSS linear-gradient string. */
export function gradientFrom(
  palette: { from: string; via?: string; to: string },
  angle = 145
): string {
  const stops = palette.via
    ? `${palette.from}, ${palette.via}, ${palette.to}`
    : `${palette.from}, ${palette.to}`;
  return `linear-gradient(${angle}deg, ${stops})`;
}

/** Parse a #rgb / #rrggbb hex string into {r,g,b} (0–255). */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "").slice(0, 6);
  const full =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean.padEnd(6, "0");
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** WCAG relative luminance (0 dark – 1 light) of a hex colour. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * Whether a palette reads as "dark" (so overlaid type should be paper, not ink).
 * Judged on the mid-stop, since that dominates a full-bleed gradient field.
 */
export function paletteIsDark(palette: {
  from: string;
  via?: string;
  to: string;
  ink?: number;
}): boolean {
  const mid = palette.via ?? palette.to;
  return relativeLuminance(mid) < 0.12 || (palette.ink ?? 0) >= 0.16;
}
