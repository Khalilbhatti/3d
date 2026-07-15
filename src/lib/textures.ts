import * as THREE from "three";
import { type ArtPalette, type Orientation } from "@/content/types";
import { hexToRgb } from "@/lib/utils";

/**
 * Runtime texture factory for the 3D floating gallery. Paints the SAME
 * deterministic scene the DOM cards use (PlaceholderArt) — a luminist coastal
 * landscape, or an illuminated manuscript page — onto a 2D canvas and wraps it in
 * a THREE.CanvasTexture, so the floating planes show real image-like artwork with
 * zero binary assets. Seeded identically to PlaceholderArt, so a work's 3D plane
 * and its DOM card render the same picture. To use real photography, load it with
 * TextureLoader/useTexture instead (see docs/ASSET_REPLACEMENT.md).
 *
 * Textures are cached by key so re-renders and layout swaps never re-paint.
 */
const cache = new Map<string, THREE.Texture>();

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function makeRand(seed: string) {
  let s = hash(seed) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export type ArtMotif = "field" | "portrait" | "manuscript";

export function makeArtTexture(
  seed: string,
  palette: ArtPalette,
  motif: ArtMotif = "field",
  w = 560,
  h = 640
): THREE.Texture {
  const key = `${seed}:${motif}`;
  const cached = cache.get(key);
  if (cached) return cached;

  // SSR guard — should only ever run on the client.
  if (typeof document === "undefined") return new THREE.Texture();

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const rand = makeRand(seed);
  const from = palette.from;
  const via = palette.via ?? palette.to;
  const to = palette.to;

  if (motif === "manuscript") {
    const pg = ctx.createLinearGradient(0, 0, w, h);
    pg.addColorStop(0, rgba(from, 0.7));
    pg.addColorStop(0.45, via);
    pg.addColorStop(1, to);
    ctx.fillStyle = pg;
    ctx.fillRect(0, 0, w, h);

    // aged stain
    const sx = w * (0.3 + rand() * 0.4);
    const sy = h * (0.25 + rand() * 0.45);
    const stain = ctx.createRadialGradient(sx, sy, 4, sx, sy, w * 0.4);
    stain.addColorStop(0, rgba(to, 0.32));
    stain.addColorStop(1, rgba(to, 0));
    ctx.fillStyle = stain;
    ctx.fillRect(0, 0, w, h);

    // margin frame
    ctx.strokeStyle = rgba(to, 0.5);
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.12, h * 0.1, w * 0.76, h * 0.8);

    // illuminated initial
    ctx.fillStyle = rgba(from, 0.9);
    ctx.fillRect(w * 0.16, h * 0.15, w * 0.16, w * 0.16);
    ctx.strokeStyle = rgba(to, 0.6);
    ctx.strokeRect(w * 0.18, h * 0.17, w * 0.12, w * 0.12);

    // ruled text
    const lines = 6 + Math.floor(rand() * 4);
    for (let i = 0; i < lines; i++) {
      const y = h * 0.2 + (i + 1) * ((h * 0.62) / (lines + 1));
      const startX = i < 2 ? w * 0.35 : w * 0.18;
      const lw = (w * 0.7 - (startX - w * 0.18)) * (0.7 + rand() * 0.28);
      ctx.fillStyle = rgba(to, 0.6);
      ctx.fillRect(startX, y, lw, 2);
    }
  } else {
    // Luminist coastal landscape.
    const horizon = h * (0.54 + rand() * 0.16);
    const sunX = w * (0.16 + rand() * 0.68);
    const sunR = w * (0.09 + rand() * 0.07);
    const sunY = horizon - sunR * (0.2 + rand() * 0.9);
    const clouds = 1 + Math.floor(rand() * 2);
    const hasCoast = rand() > 0.35;

    // sky
    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, to);
    sky.addColorStop(0.55, via);
    sky.addColorStop(1, rgba(from, 0.95));
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon);

    // clouds
    for (let i = 0; i < clouds; i++) {
      const cx = w * (0.1 + rand() * 0.8);
      const cy = horizon * (0.2 + rand() * 0.5);
      const rx = w * (0.16 + rand() * 0.18);
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, rx * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = rgba(from, 0.16);
      ctx.fill();
    }

    // sun glow + core
    const glow = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, sunR * 2.8);
    glow.addColorStop(0, "rgba(255,248,230,0.95)");
    glow.addColorStop(0.28, rgba(from, 0.9));
    glow.addColorStop(1, rgba(from, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, horizon + sunR * 3);
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,246,223,0.94)";
    ctx.fill();

    // distant coast
    if (hasCoast) {
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.quadraticCurveTo(w * 0.25, horizon - 26, w * 0.5, horizon - 8);
      ctx.quadraticCurveTo(w * 0.78, horizon - 2, w, horizon - 16);
      ctx.lineTo(w, horizon);
      ctx.closePath();
      ctx.fillStyle = rgba(to, 0.85);
      ctx.fill();
    }

    // sea
    const sea = ctx.createLinearGradient(0, horizon, 0, h);
    sea.addColorStop(0, rgba(from, 0.6));
    sea.addColorStop(0.3, via);
    sea.addColorStop(1, to);
    ctx.fillStyle = sea;
    ctx.fillRect(0, horizon, w, h - horizon);

    // horizon line
    ctx.fillStyle = rgba(from, 0.7);
    ctx.fillRect(0, horizon - 1, w, 2);

    // reflection
    const refl = ctx.createLinearGradient(0, horizon, 0, h);
    refl.addColorStop(0, rgba(from, 0.45));
    refl.addColorStop(1, rgba(from, 0));
    ctx.fillStyle = refl;
    ctx.fillRect(sunX - sunR * 1.3, horizon, sunR * 2.6, h - horizon);

    // water striations
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = rgba(from, 0.1 + i * 0.02);
      ctx.fillRect(0, horizon + ((h - horizon) * (i + 1)) / 5, w, 1);
    }
  }

  // fine grain
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 2200; i++) {
    ctx.fillStyle = i % 2 ? "#000000" : "#ffffff";
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }
  ctx.globalAlpha = 1;

  // vignette
  const vig = ctx.createRadialGradient(w * 0.5, h * 0.42, w * 0.2, w * 0.5, h * 0.5, w * 0.85);
  vig.addColorStop(0, "rgba(11,9,6,0)");
  vig.addColorStop(1, "rgba(11,9,6,0.28)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  cache.set(key, texture);
  return texture;
}

/** Plane dimensions (world units) for an artwork orientation. */
export function planeSize(orientation: Orientation): [number, number] {
  switch (orientation) {
    case "portrait":
      return [2.0, 2.5];
    case "landscape":
      return [2.8, 1.9];
    default:
      return [2.2, 2.2];
  }
}
