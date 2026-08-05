# The Auren Archive

An immersive, scroll-driven art & heritage storytelling website — a museum-grade
editorial experience built with **Next.js (App Router)**, **Three.js / React Three
Fiber**, **Framer Motion**, **GSAP + ScrollTrigger + SplitText**, **Lenis**,
**Zustand** and **Tailwind CSS**.

> **This is a demonstration build.** Every artwork, artist, date and essay is
> professional _placeholder_ content — an invented luminist painting school (the
> "Auren School") composed to show how a real archive would read. Swap in your own
> imagery, text, palette and fonts to make it yours. See the guides in [`/docs`](./docs).

## Highlights

- **Floating 3D gallery opening** — a Three.js / R3F gallery of the collection
  suspended in space that you **drag to orbit**, **recompose between a sphere and a
  cylinder**, and that **leans toward your cursor** (ambient parallax). Clicking a
  work makes the plane **fly toward you and grow as the scene dims**, then the
  fullscreen viewer **springs open** — a continuous, Pahari-style open animation.
- **Framer Motion throughout** — first-load preloader with a 0→100 counter, a
  blended custom cursor, animated route transitions, the sphere/cylinder toggle,
  the live hover caption, and the viewer's expand-open.
- **Long-form home story** — the floating gallery flows into six scroll-driven
  chapters (origin → development → important works → cultural context → one colour
  as a climate → present-day relevance) with animated typography, layered parallax,
  chapter progress and light/dark background transitions.
- **Four gallery modes** — editorial vertical, drag/wheel/swipe horizontal, a
  filterable/searchable grid archive (grid & list), and the fullscreen viewer
  (zoom, pan, keyboard, swipe, thumbnails).
- **Eleven page types + custom 404** — home, collections archive, collection detail,
  grid archive, artwork detail, artists, artist detail, journal, story detail,
  about, contact.
- **Accessible & fast** — skip link, semantic headings, keyboard gallery controls,
  visible focus, reduced-motion + no-WebGL DOM fallbacks, self-hosted fonts,
  responsive `next/image`, and Three.js code-split so it never blocks first paint.

## Tech stack

| Concern       | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 14 (App Router) + React 18 + TypeScript    |
| Styling       | Tailwind CSS 3, CSS custom properties for theming  |
| 3D / WebGL    | Three.js + React Three Fiber + Drei (OrbitControls)|
| UI motion     | Framer Motion (preloader, cursor, transitions)     |
| Scroll motion | GSAP, ScrollTrigger, SplitText + Lenis smooth scroll|
| State         | Zustand (menu, viewer, chapter progress)           |
| Images        | `next/image` + generated CSS/Canvas placeholders   |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Optional env (`.env.example` → `.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_ENDPOINT=          # contact form POST target (else mailto)
```

## Project structure

```
src/
├─ app/                     # routes: home, collections, archive, artists, journal, about, contact, 404, sitemap, robots, template
├─ components/
│  ├─ story/                # HomeStory, OpeningScene, Chapter, ParallaxArtwork, ScrollCue
│  ├─ home/                 # FloatingGalleryHero (the 3D opening)
│  ├─ webgl/                # FloatingGallery (+ card-open focus), GalleryCanvas, HeroScene, HeroCanvas
│  ├─ gallery/              # Editorial / Horizontal / ArchiveGrid / FullscreenViewer / cards
│  ├─ typography/           # SplitReveal, Reveal, ScrollParagraph, primitives
│  ├─ media/                # ArtworkImage + PlaceholderArt
│  ├─ site/                 # Header, FullscreenMenu, Footer, CustomCursor, ScrollProgress
│  └─ journal/ artists/ collections/ contact/ artwork/ ui/
├─ content/                 # ← all editable data
├─ config/theme.ts          # ← brand, palette, fonts, navigation
├─ hooks/  lib/             # reduced-motion, media query, gsap, store, textures, utils
```

## Documentation

- **[docs/CONTENT_EDITING.md](./docs/CONTENT_EDITING.md)** — edit collections,
  artworks, artists, stories, timeline and home chapters.
- **[docs/ASSET_REPLACEMENT.md](./docs/ASSET_REPLACEMENT.md)** — replace the
  generated placeholders with real imagery, re-key the palette/fonts.
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** — deploy to Vercel + wire the form.

## License / content note

The code is yours to use. All names, works, dates and biographies shipped in
`src/content/*` are fictional placeholders — replace them before publishing.
