# Featured Work selector for `/portfolio`

**Date:** 2026-08-06
**Status:** Approved, pending implementation

## Problem

A pasted reference component (`interactive-selector.tsx`) demonstrates a horizontal
accordion interaction — a row of panels where one is expanded (revealing title +
description over its image) and the rest collapse to slim image strips, switching
on click. The user wants this interaction pattern added to the `/portfolio` page's
projects section, scoped to that page only, and built elegantly — not a literal
copy-paste of the reference's demo content (a "glamping" showcase with Unsplash
stock photos, `react-icons`, and `styled-jsx`), which has no relevance to a client
project portfolio.

`/portfolio` currently renders `PageHeader` + `ArchiveGrid` — a filterable,
searchable grid of every project (arbitrary count, currently 10 `Artwork` records
marked `featured: true` out of the full catalogue). The accordion pattern is a
fixed-cardinality showcase widget; it cannot replace or wrap the grid without
breaking search/filter, so it needs its own home on the page.

## Decisions (from brainstorming)

- **Placement:** New section **below** the existing `ArchiveGrid`, as a closing
  showcase — the grid stays first for anyone who wants to search/filter
  immediately.
- **Content:** Real data only. Take the first 6 of the `featured: true` artworks
  returned by the existing `getFeaturedArtworks()` helper — `featured` is
  already the content layer's curation signal, so no second manual selection
  step is introduced. Real titles, real descriptions, real screenshots. No
  demo copy, no stock photography.
- **Scope:** Lives in `src/components/gallery/` (the existing domain folder for
  portfolio/archive concerns, alongside `ArchiveGrid`), imported only into
  `src/app/portfolio/page.tsx`. Not added to `components/ui` and not reused
  anywhere else on the site.
- **No new dependencies.** Neither `react-icons` nor `lucide-react` is a
  dependency of this project today, and the component needs no icons — each
  panel is image + title + one-line description, with the site's existing `→`
  glyph convention for the "view project" affordance if needed.
- **No `styled-jsx`.** Restyled entirely with Tailwind utilities and the site's
  existing design tokens (`paper`/`ink`/`accent`, `font-mono` uppercase labels),
  matching every other section on the site instead of the reference's own dark
  `#222` theme.

## Design

### Component

`FeaturedProjectsSelector` — a client component (`"use client"`) rendering the
accordion. Props: `artworks: Artwork[]` (the caller passes the curated featured
list; the component doesn't fetch or filter on its own — keeps it a dumb,
testable presentation component).

### Data flow

`src/app/portfolio/page.tsx` already calls `getArtworks()` and `getFacets()` for
the grid. It additionally calls `getFeaturedArtworks()`, takes the first 6, and
passes them to `<FeaturedProjectsSelector artworks={featured} />` rendered after
`<ArchiveGrid />`. No new content-layer functions needed — `getFeaturedArtworks`
already exists and is used elsewhere (`FloatingGalleryHero`).

Each panel reads, per `Artwork`: `title`, `description` (truncated to one line
via CSS line-clamp, not string slicing, so it degrades gracefully), `image`
(falls back to the existing `PlaceholderArt`/`ArtworkImage` pattern already used
by `ArchiveGrid` for artworks without a real `image` — no separate image-handling
logic invented here), and `slug` (builds the `/portfolio/${slug}` link).

### Interaction

- Desktop/tablet (≥768px, no reduced-motion): horizontal flex row, one panel
  `flex: 6`, the rest `flex: 1`, animated via CSS transition on `flex-grow`
  (same mechanism as the reference, just restyled) — no new animation library.
  Default expanded panel: the first one. Click a collapsed panel to expand it;
  click the expanded panel's title/CTA to navigate to its project page.
- Entrance: staggered fade/slide-in as the section scrolls into view, once,
  using the existing `MReveal` component (already used by `ArchiveGrid`'s
  cards) — consistent with the rest of the page, no bespoke keyframes.

### Mobile / reduced-motion fallback

Below 768px or with `prefers-reduced-motion: reduce`, renders a simple vertical
stack of cards (image + title + description, each wrapped in `MReveal`) instead
of the accordion — the same fallback shape already used by `ChapterStack`,
`HorizontalCollections`, and `ServiceOrbit` elsewhere in this codebase. This is
an established, low-risk site convention, not a new pattern.

### Styling

- Section heading matches the page's editorial voice (e.g. a `label` kicker +
  a `font-display` heading), consistent with headings elsewhere on `/portfolio`
  and other pages.
- Panels: `bg-paper`/`bg-ink` per current theme, `font-mono` uppercase labels
  for title, `text-ink-soft` for description, focus-visible states matching the
  site's global `:focus-visible` outline (panels are buttons/links, must be
  keyboard-operable — click-to-expand needs an `Enter`/`Space`-triggered
  equivalent, not just `onClick`).
- Image handling reuses `ArtworkImage` (already handles `next/image` vs.
  `PlaceholderArt` fallback, aspect ratio, `sizes`) rather than reimplementing
  background-image CSS from the reference.

### Testing / verification

- Typecheck clean.
- Visual check via `gstack:browse` at a few breakpoints (desktop accordion,
  mobile stacked fallback) before considering this done, consistent with how
  every other animation change this session was verified in a real browser
  rather than asserted from code alone.
- Confirm keyboard operability (tab to a collapsed panel, `Enter` expands it).
- Confirm this component is not imported anywhere except `portfolio/page.tsx`.

## Out of scope

- No changes to `ArchiveGrid`, its filtering, or its search behavior.
- No global/shared reusable version of this component — single-page only, per
  the user's explicit instruction.
- No new npm dependencies.
