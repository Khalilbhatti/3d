# Asset & theme replacement guide

The demo ships with a **self-contained placeholder system** — every "artwork" is a
deterministic gradient field generated from a `seed` + `palette`, so the site runs
with **no image files at all**. When you have real imagery, fonts and colours, drop
them in here.

## 1. Replace placeholder art with real images

Each `Artwork` (and `Collection` / `Artist` / `Story`) supports optional real-asset
fields. The moment you add an `image`, `<ArtworkImage>` and `<ParallaxArtwork>`
switch from the generated placeholder to **`next/image`** automatically — no
component changes needed.

```ts
// src/content/artworks.ts
{
  id: "a-tideline",
  // …existing fields…
  image: "/artworks/tideline.jpg",        // put files in /public/artworks/
  thumbnail: "/artworks/tideline-sm.jpg", // optional
  blurDataURL: "data:image/jpeg;base64,…" // optional blur-up (enables placeholder="blur")
}
```

### Local files

Place them under `public/` and reference with a root-absolute path:

```
public/
└─ artworks/
   ├─ tideline.jpg
   └─ tideline-sm.jpg
```

### Remote / CDN images

Whitelist the host in `next.config.mjs`:

```js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.your-cdn.com" },
  ],
  formats: ["image/avif", "image/webp"],
}
```

### The 3D floating gallery

The home hero's Three.js gallery paints its image planes at runtime from each
work's `seed` + `palette` via `src/lib/textures.ts` (a canvas → `THREE.CanvasTexture`),
so it needs no files either. To show real photographs on the 3D planes, load them
with `useTexture`/`TextureLoader` in `src/components/webgl/FloatingGallery.tsx` and
map them onto the plane materials instead of calling `makeArtTexture`.

### Generating blur placeholders (optional but recommended)

```bash
npm i -D plaiceholder sharp
```

Then generate a base64 `blurDataURL` per image (build script or one-off) and paste
it into the record. Responsive sizes, lazy loading and AVIF/WebP are already handled
by `next/image` via the `sizes` prop each component passes.

### Keep these correct

- **`orientation`** (`portrait`/`landscape`/`square`) sets the frame aspect ratio.
- **`alt`** stays required — real images still need real alt text.
- **`palette`** is still used for the blur background and for chapter theming even
  after you add photos, so leave a representative palette in place.

## 2. Re-key the colour palette

Open **`src/config/theme.ts`** and edit the `palette` object (authored in hex). It's
converted to `R G B` CSS custom properties at runtime, so Tailwind's alpha syntax
(`bg-paper/70`, `text-ink/[0.08]`) keeps working everywhere.

```ts
export const palette = {
  paper: "#F2ECDF",     // primary warm field
  paperDeep: "#E6DBC7", // recessed panels
  ink: "#1A1611",       // display type
  inkSoft: "#39322A",   // body copy
  muted: "#7B7160",     // captions / labels
  accent: "#A6431E",    // ← the one configurable key colour
  accentDeep: "#7A2E13",
  line: "#1A1611",      // hairlines (used at low alpha)
};
```

Changing `accent` alone re-keys the whole identity. Fallback values in
`globals.css :root` mirror these for the no-flash first paint — update them too if
you want the fallback to match exactly.

## 3. Swap the fonts

Fonts are loaded with `next/font/google` in `src/app/layout.tsx` and exposed as CSS
variables (`--font-display`, `--font-sans`, `--font-mono`). Replace the families:

```ts
import { Cormorant, Manrope, Space_Mono } from "next/font/google";
const display = Cormorant({ subsets: ["latin"], variable: "--font-display", … });
```

For self-hosted/custom fonts use `next/font/local` instead. The type scale
(`display-xl/lg/md`, `label` tracking, etc.) lives in `tailwind.config.ts`.

## 4. Logo

The header/footer use a wordmark (`brand.name` + accent dot). To use an image logo,
drop it in `public/`, set up `next/image`, and replace the wordmark `<Link>` in
`src/components/site/Header.tsx` and `Footer.tsx`.

## 5. Favicon / social image

Add `app/icon.png` (favicon) and `app/opengraph-image.png` (1200×630) — Next picks
these up automatically for `<head>` and social cards.
