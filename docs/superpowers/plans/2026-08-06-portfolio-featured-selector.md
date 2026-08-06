# Featured Work Selector (`/portfolio`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a horizontal-accordion "Featured work" showcase below the existing project grid on `/portfolio`, using real featured-project content, restyled to the site's own design tokens, scoped to that page only.

**Architecture:** One new client component (`FeaturedProjectsSelector`) rendering either a desktop accordion (one panel expanded via `flex-grow`, others collapsed to strips, each panel a real `<Link>` to `/portfolio/[slug]`) or a mobile/reduced-motion vertical card stack — same two-branch pattern already used by `ChapterStack`/`HorizontalCollections`/`ServiceOrbit`. `src/app/portfolio/page.tsx` fetches the first 6 featured artworks and renders the component after `ArchiveGrid`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion (`MReveal`) for entrance, `next/image` for real screenshots, existing `PlaceholderArt` for artworks without one. No new npm dependencies.

## Global Constraints

- New component lives at `src/components/gallery/FeaturedProjectsSelector.tsx` (same domain folder as `ArchiveGrid`) — not `components/ui`, and not imported anywhere except `src/app/portfolio/page.tsx`.
- No new dependencies. Do not add `react-icons` or `lucide-react`.
- No `styled-jsx`. Tailwind utilities + existing global tokens (`paper`, `ink`, `accent`, `.label`, `container-editorial`, `ease-editorial`) only.
- Content is real: sourced from `getFeaturedArtworks()`, first 6 results. No placeholder/demo copy, no Unsplash URLs.
- Mobile (`<768px`) and `prefers-reduced-motion: reduce` both render the vertical-stack fallback, never the accordion.
- The mobile/desktop resolve must read `window.matchMedia(...)` directly inside the effect body on every invocation — do not gate it behind a "resolved once" ref/flag. That exact pattern (trusting `reduced`/`isMobile` hook closures behind a first-run flag) caused a React Strict Mode reconciler crash elsewhere in this codebase (see `ChapterStack.tsx`, `ServiceOrbit.tsx`, `FloatingGalleryHero.tsx` — all three were fixed by removing that flag and reading `matchMedia` directly every time).
- No unit test framework exists in this project (confirmed: no jest/vitest/playwright in `package.json`). Verification is: `npx tsc --noEmit` (must be clean) + real-browser checks via the `gstack:browse` skill, matching how every other frontend change in this codebase has been verified.

---

### Task 1: Build `FeaturedProjectsSelector`

**Files:**
- Create: `src/components/gallery/FeaturedProjectsSelector.tsx`

**Interfaces:**
- Consumes: `Artwork` type from `@/content/types` (fields used: `id`, `slug`, `title`, `description`, `image`, `alt`, `seed`, `palette`, `medium`), `PlaceholderArt` from `@/components/media/PlaceholderArt` (props: `seed: string`, `palette: ArtPalette`, `motif?: "field" | "portrait" | "manuscript"`), `MReveal` from `@/components/motion/reveal` (props: `variant?`, `className?`, `delay?`), `usePrefersReducedMotion` from `@/hooks/usePrefersReducedMotion` (returns `boolean`), `useIsMobile` from `@/hooks/useMediaQuery` (returns `boolean`), `cn` from `@/lib/utils`.
- Produces: `FeaturedProjectsSelector` — a named export, `{ artworks: Artwork[] }` props, used by Task 2.

- [ ] **Step 1: Create the component file**

Write `src/components/gallery/FeaturedProjectsSelector.tsx`:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type Artwork } from "@/content/types";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { MReveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

function motifFor(artwork: Artwork): "field" | "portrait" | "manuscript" {
  return artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field";
}

/**
 * Closing showcase for /portfolio only: a horizontal accordion of curated
 * featured projects, one expanded at a time via flex-grow. Mobile / reduced-
 * motion fall back to a plain vertical card stack — the same two-branch
 * safety pattern already used by ChapterStack, HorizontalCollections, and
 * ServiceOrbit elsewhere in this codebase, for the same reason: an R3F canvas
 * or GSAP-pinned layout mounted only for the "full" branch must never be
 * mounted then immediately torn down on a stale device-capability read.
 * This component has no canvas/GSAP, but keeps the same resolve shape for
 * consistency and because the underlying stale-closure risk is identical
 * for any conditional-mount branch driven by these two hooks.
 */
export function FeaturedProjectsSelector({ artworks }: { artworks: Artwork[] }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  // Reads matchMedia directly on every invocation rather than trusting the
  // reduced/isMobile hook closures behind a "resolved once" flag — see
  // Global Constraints in the plan this was built from.
  const [confirmedFull, setConfirmedFull] = useState(false);
  useEffect(() => {
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setConfirmedFull(!reducedNow && !mobileNow);
  }, [reduced, isMobile]);

  if (artworks.length === 0) return null;

  return (
    <section className="border-t border-line/15 py-20 md:py-28">
      <div className="container-editorial">
        <span className="label text-accent">Featured work</span>
        <h2 className="mt-4 max-w-[16ch] font-display text-display-md leading-[0.98] text-ink">
          A closer look at what we&apos;ve shipped.
        </h2>
      </div>

      {!confirmedFull ? (
        <div className="container-editorial mt-12 space-y-6">
          {artworks.map((artwork, i) => (
            <MReveal key={artwork.id} variant="up" delay={(i % 6) * 0.06}>
              <Link
                href={`/portfolio/${artwork.slug}`}
                className="group flex items-center gap-5 border-b border-line/15 pb-6"
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden">
                  {artwork.image ? (
                    <Image
                      src={artwork.image}
                      alt={artwork.alt}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <PlaceholderArt seed={artwork.seed} palette={artwork.palette} motif={motifFor(artwork)} />
                  )}
                </div>
                <div>
                  <p className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                    {artwork.title}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{artwork.description}</p>
                </div>
              </Link>
            </MReveal>
          ))}
        </div>
      ) : (
        <div className="container-editorial mt-12">
          <div className="flex h-[440px] w-full items-stretch gap-1 overflow-hidden">
            {artworks.map((artwork, i) => {
              const isActive = i === active;
              return (
                <MReveal
                  key={artwork.id}
                  as="div"
                  variant="left"
                  delay={i * 0.08}
                  className={cn(
                    "group relative min-w-[64px] overflow-hidden transition-[flex-grow] duration-700 ease-editorial",
                    isActive ? "flex-[7_1_0%]" : "flex-[1_1_0%]"
                  )}
                >
                  {/* `absolute inset-0`, not a real width/height, so this Link
                      always exactly fills its MReveal parent regardless of
                      that parent's animated flex-grow — the parent carries
                      the entrance animation, sizing, and the 64px floor
                      (MReveal doesn't forward a `style` prop, so that floor
                      has to be a class on the parent, not inline style here),
                      this only carries content + the click/keyboard interaction. */}
                  <Link
                    href={`/portfolio/${artwork.slug}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        setActive(i);
                      }
                    }}
                    className="absolute inset-0 flex flex-col justify-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
                  >
                    <div className="absolute inset-0">
                      {artwork.image ? (
                        <Image
                          src={artwork.image}
                          alt={artwork.alt}
                          fill
                          sizes={isActive ? "60vw" : "120px"}
                          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                        />
                      ) : (
                        <PlaceholderArt seed={artwork.seed} palette={artwork.palette} motif={motifFor(artwork)} />
                      )}
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent transition-opacity duration-500"
                      style={{ opacity: isActive ? 1 : 0.6 }}
                    />
                    <div className="relative z-[1] p-5">
                      <p
                        className={cn(
                          "font-mono text-xs uppercase tracking-label text-paper/70 transition-opacity duration-500",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p
                        className={cn(
                          "font-display text-2xl text-paper transition-all duration-500",
                          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        )}
                      >
                        {artwork.title}
                      </p>
                      <p
                        className={cn(
                          "mt-1 max-w-xs text-pretty text-sm text-paper/80 transition-all delay-100 duration-500",
                          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        )}
                      >
                        {artwork.description}
                      </p>
                    </div>
                  </Link>
                </MReveal>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (clean).

- [ ] **Step 3: Commit**

```bash
git add src/components/gallery/FeaturedProjectsSelector.tsx
git commit -m "Add FeaturedProjectsSelector component for /portfolio"
```

---

### Task 2: Wire it into `/portfolio`

**Files:**
- Modify: `src/app/portfolio/page.tsx`

**Interfaces:**
- Consumes: `FeaturedProjectsSelector` from Task 1 (`{ artworks: Artwork[] }`), `getFeaturedArtworks` from `@/content/index` (already exported, returns `Artwork[]`, no new content-layer code needed).

- [ ] **Step 1: Add the import and data fetch, render below `ArchiveGrid`**

Current file (`src/app/portfolio/page.tsx`):

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { getArtworks, getFacets } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchiveGrid } from "@/components/gallery/ArchiveGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Our portfolio of end-to-end builds — websites, apps, e-commerce, branding and CRM automation delivered by GitzTech.",
};

export default function ArchivePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const artworks = getArtworks();
  const facets = getFacets();
  const initialQuery = typeof searchParams.q === "string" ? searchParams.q : "";

  return (
    <>
      <PageHeader
        kicker="Our work · Portfolio"
        title="Work that speaks for itself."
        deck="End-to-end builds — from complete UI design systems to custom full-stack development and cloud deployment. Filter by service or industry, and open any project to read the case study."
      />
      <Suspense>
        <ArchiveGrid artworks={artworks} facets={facets} initialQuery={initialQuery} />
      </Suspense>
    </>
  );
}
```

Replace with:

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { getArtworks, getFacets, getFeaturedArtworks } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchiveGrid } from "@/components/gallery/ArchiveGrid";
import { FeaturedProjectsSelector } from "@/components/gallery/FeaturedProjectsSelector";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Our portfolio of end-to-end builds — websites, apps, e-commerce, branding and CRM automation delivered by GitzTech.",
};

export default function ArchivePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const artworks = getArtworks();
  const facets = getFacets();
  const initialQuery = typeof searchParams.q === "string" ? searchParams.q : "";
  const featured = getFeaturedArtworks().slice(0, 6);

  return (
    <>
      <PageHeader
        kicker="Our work · Portfolio"
        title="Work that speaks for itself."
        deck="End-to-end builds — from complete UI design systems to custom full-stack development and cloud deployment. Filter by service or industry, and open any project to read the case study."
      />
      <Suspense>
        <ArchiveGrid artworks={artworks} facets={facets} initialQuery={initialQuery} />
      </Suspense>
      <FeaturedProjectsSelector artworks={featured} />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (clean).

- [ ] **Step 3: Confirm scope — component used only here**

Run: `grep -rln "FeaturedProjectsSelector" src`
Expected: exactly two files — `src/components/gallery/FeaturedProjectsSelector.tsx` (the definition) and `src/app/portfolio/page.tsx` (this usage). If any other file matches, the scope constraint has been violated — remove that usage.

- [ ] **Step 4: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "Render FeaturedProjectsSelector on /portfolio"
```

---

### Task 3: Verify in a real browser

**Files:** none (verification only).

**Interfaces:** none — this task drives the dev server and the `gstack:browse` skill; it produces no code artifacts for later tasks.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Wait for `http://localhost:3000` to respond `200` before proceeding (e.g. poll with `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`).

- [ ] **Step 2: Desktop check via `gstack:browse`**

Using the `gstack:browse` skill's `$B` binary:

```bash
$B viewport 1440x900
$B goto http://localhost:3000/portfolio
$B wait --load
$B console --errors
```

Expected: `(no console errors)` — no hydration warnings, no React errors.

Then scroll to the new section and screenshot it:

```bash
$B js "window.scrollTo(0, document.body.scrollHeight)"
$B screenshot --viewport featured-desktop.png
```

Read the screenshot. Confirm: the accordion renders below the grid, one panel is visibly wider than the rest, the expanded panel shows a real project title + description (not "Luxury Tent" / "Escape in Style" or any camping copy), and the image is a real project screenshot or the site's own generated placeholder art (not an Unsplash tent/campfire photo).

- [ ] **Step 3: Narrowest-desktop check (768px)**

768px is the narrowest width where the accordion branch renders at all (767px and below is the mobile fallback) — with 6 panels and a 64px floor on the 5 collapsed ones, this is the tightest the accordion ever gets. Confirm it's not visually broken here, not just at a roomy 1440px:

```bash
$B viewport 768x1024
$B goto http://localhost:3000/portfolio
$B wait --load
$B js "window.scrollTo(0, document.body.scrollHeight)"
$B screenshot --viewport featured-768.png
```

Read the screenshot. Confirm all 6 panels are visible, the expanded panel's title/description text isn't clipped or overlapping its neighbor, and no panel has visibly collapsed below its image content.

- [ ] **Step 5: Interaction check**

Reset to the roomier desktop size first (Step 3 left the viewport at 768px):

```bash
$B viewport 1440x900
$B goto http://localhost:3000/portfolio
$B wait --load
$B js "window.scrollTo(0, document.body.scrollHeight)"
$B snapshot -i -s "section:has(a[aria-current])"
```

Note the `@e` ref of a collapsed panel's link (not the one with `aria-current="true"`), then:

```bash
$B click @eN
$B screenshot --viewport featured-after-click.png
```

Read the screenshot. Confirm a different panel is now expanded (the click changed which panel is wide, and did not navigate away from `/portfolio`).

- [ ] **Step 6: Keyboard operability check**

```bash
$B snapshot -i -s "section:has(a[aria-current])"
```

Confirm each panel is a `[link]` in the snapshot (not a `div` with no role) — this alone confirms it's a real, keyboard-focusable, screen-reader-announced link, consistent with the design's accessibility requirement.

- [ ] **Step 7: Mobile check**

```bash
$B viewport 375x812
$B console --clear
$B goto http://localhost:3000/portfolio
$B wait --load
$B console --errors
```

Expected: `(no console errors)`.

```bash
$B js "window.scrollTo(0, document.body.scrollHeight)"
$B screenshot --viewport featured-mobile.png
```

Read the screenshot. Confirm the section now renders as a vertical stack of cards (image + title + description per row), not the horizontal accordion.

- [ ] **Step 8: Confirm the rest of the site is untouched**

```bash
$B viewport 1440x900
$B goto http://localhost:3000
$B wait --load
$B console --errors
```

Expected: `(no console errors)` — confirms this change didn't regress the home page (which shares hooks/components with the new file, e.g. `usePrefersReducedMotion`, `useIsMobile`, `cn`).

- [ ] **Step 9: Stop the dev server**

Kill the `npm run dev` process started in Step 1.

- [ ] **Step 10: Push**

```bash
git push origin main
```
