# Content editing guide

All of the archive's content lives in **`src/content/`** as typed TypeScript data.
Components read it through the access layer in `src/content/index.ts`, so as long as
you keep IDs consistent the whole UI stays in sync — relationships (artist ↔ artwork
↔ collection ↔ story ↔ timeline) update automatically.

> Edit data, not layout. You should almost never need to touch a component to
> change what the site says.

## The files

| File             | What it holds                                          |
| ---------------- | ------------------------------------------------------ |
| `collections.ts` | The bodies of work (`/collections`)                    |
| `artworks.ts`    | Individual works (`/archive`, `/archive/[slug]`)       |
| `artists.ts`     | Contributors (`/artists`, `/artists/[slug]`)           |
| `stories.ts`     | Journal essays as structured blocks (`/journal`)       |
| `timeline.ts`    | Chronology entries (collection detail + about)         |
| `chapters.ts`    | The six home-story chapters                            |
| `types.ts`       | The shape of every record — read this first            |
| `index.ts`       | Typed getters (`getArtworkBySlug`, `getFacets`, …)     |

## Golden rules

1. **IDs are the glue.** `artwork.artistId` must match an `artist.id`;
   `artwork.collectionId` must match a `collection.id`; related lists reference IDs.
2. **Slugs are URLs.** `artwork.slug` → `/archive/<slug>`. Keep them unique,
   lowercase and hyphenated.
3. **Every artwork needs `alt`.** This is the screen-reader description — write it
   as if describing the work to someone who can't see it. It's required.
4. **Keep `orientation` honest** (`portrait` / `landscape` / `square`) so frames
   never distort.

## Add an artwork

```ts
// src/content/artworks.ts
{
  id: "a-new-work",              // unique
  slug: "a-new-work",            // → /archive/a-new-work
  title: "A New Work",
  artistId: "marrow",            // must exist in artists.ts
  year: "1740",
  medium: "Egg tempera on panel",
  dimensions: "18 × 24 cm",
  location: "Harbour Wing · cabinet 5",   // text before "·" becomes the location facet
  collectionId: "luminist",      // must exist in collections.ts
  period: "Founding · 1719–1761",// exact string drives the period facet
  description: "One sentence of wall-label prose.",
  historicalContext: "A short paragraph of context.",
  orientation: "landscape",
  seed: "new-work-01",           // any string → deterministic placeholder art
  palette: { from: "#E8C48A", via: "#C98B4B", to: "#7A3F1E", ink: 0.06 },
  alt: "Required. A plain-language description of the image.",
  relatedArtworkIds: ["a-tideline", "a-low-water"],
  featured: true,                // optional — surfaces on the 404 + featured rails
  // image / thumbnail / blurDataURL — optional real assets (see ASSET_REPLACEMENT.md)
}
```

Then add the id to the parent collection's `artworkIds` array so it appears in that
collection's gallery.

## Add a journal story (structured blocks)

Stories are authored as an array of typed `blocks` so long-form content stays
editable without touching layout. Available block types (see `StoryBlock` in
`types.ts`):

```ts
{ type: "paragraph", text: "…", lead: true }         // lead = large intro paragraph
{ type: "heading", text: "A section heading" }
{ type: "pullquote", text: "…", cite: "Attribution" }
{ type: "image", artworkId: "a-tideline", caption: "…", alt: "…" }  // or seed+palette
{ type: "gallery", artworkIds: ["a-x", "a-y", "a-z"] }
{ type: "video", label: "…", caption: "…", poster: "seed" }         // placeholder player
{ type: "audio", label: "…", duration: "3:41", caption: "…" }       // placeholder player
{ type: "footnote", id: 1, text: "…" }
```

> **Prefer MDX?** The block system covers rich editorial needs with zero build
> config. If you'd rather write prose in MDX, add `@next/mdx` and render an
> `.mdx` body in `journal/[slug]` — the surrounding page (hero, byline, related
> works) already works from the structured `Story` metadata.

## Edit the home story

`chapters.ts` drives the scrolling narrative. Each chapter sets its own kicker,
title, lede, body, quote, date, location, `artworkIds` (imagery) and `palette`.
Light vs. dark type is derived automatically from the palette, so a chapter with a
dark `via`/`to` colour flips to paper-coloured text. Add or remove chapters freely —
the progress indicator and header kicker adapt to the array length.

## Re-brand text & navigation

`src/config/theme.ts` holds the brand name, tagline, description, founding info,
email, primary navigation and social links in one place. Change them there and they
propagate to the header, menu, footer, metadata and about/contact pages.

## After editing

```bash
npm run typecheck   # catches broken IDs / missing fields at the type level
npm run dev
```
