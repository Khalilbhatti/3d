"use client";

import { useEffect, useState } from "react";

function readCssVarRgb(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const [r, g, b] = raw.split(/\s+/).map((n) => Number(n) / 255);
  return [r || 0, g || 0, b || 0];
}

/**
 * Live-reads a theme CSS custom property (e.g. "--paper", set by ThemeStyle
 * from src/config/theme.ts) as normalized 0-1 RGB — the format THREE.Color
 * accepts directly. Re-reads whenever the light/dark toggle flips
 * `data-theme` on <html>, so WebGL/canvas layers that paint a themed base
 * colour (the fluid background, the 3D gallery's scene backdrop) stay in
 * sync with the rest of the site instead of hardcoding a dark-only value.
 */
export function useThemeColor(varName: string): [number, number, number] {
  const [rgb, setRgb] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    setRgb(readCssVarRgb(varName));
    const observer = new MutationObserver(() => setRgb(readCssVarRgb(varName)));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, [varName]);

  return rgb;
}
