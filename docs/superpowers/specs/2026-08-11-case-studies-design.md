# Case Studies section (listing + Thornton & Co. detail page)

**Date:** 2026-08-11
**Status:** Approved, pending implementation

## Problem

The site has no dedicated space for a deep, "here's exactly how we designed
this" case study — `/portfolio` cards are catalogue entries (image, one-line
description, a "How we solved it" paragraph), not a full narrative. The user
wants a new top-level **Case Studies** section — modeled structurally on
[glowingsoft.com/case-studies](https://www.glowingsoft.com/case-studies/)
(a listing page) and its
[T‑PLUS detail page](https://www.glowingsoft.com/case-studies/sombank-tplus-mobile-application/)
(a long, heavily-sectioned, animated single-project deep-dive) — starting
with exactly one entry: **Thornton & Co.**, built from the full 53-section
case-study document the user provided (cover, overview, context, problem,
objectives, user goals, audiences, personas, pain points, UX strategy,
sitemap, user flows, content architecture, visual direction, color palette,
typography, grid, spacing, image direction, iconography, buttons, component
system, homepage section breakdowns, trust indicators, process, personali-
zation, lookbook, booking, form UX, responsive design, mobile nav,
interaction design, accessibility, conversion strategy/paths, UX writing,
design system/tokens, validation, key decisions, final page collection,
challenges, outcome, deliverables, skills demonstrated, reflection).

Reference-site research (fetched and summarized, not guessed):
- **Listing page** pattern: hero headline, a stats band, a "Case Studies"
  header, one **featured/expanded** project card (image, name, format label,
  category tags, short description, 3–4 feature bullets, a "Case Study"
  button) — with additional projects (none yet, here) as a secondary grid.
- **Detail page** pattern: hero with key metrics + big mockup → project
  overview → feature highlights → project-info metadata card → user-flow
  diagram → design-system snapshot → UX process stages → user-research /
  persona deep dive → final CTA → testimonial. A classic
  intro → problem/research → solution → process → proof → conversion arc,
  with mockups breaking up every section.

## Decisions

- **Additive only.** `/portfolio`, its grid, its Stack filters, and the
  Featured-work selector are untouched. Case Studies is a new, separate
  section; the existing Thornton & Co. portfolio card stays exactly as it
  is today, plus one addition (see cross-link below).
- **Detail page URL reuses the existing slug:** `/case-studies/thornton-co`
  (matches `/portfolio/thornton-co`) — same project, obviously linked.
- **Cross-link from the portfolio card.** `/portfolio/thornton-co` gets a
  "Full Case Study →" link to `/case-studies/thornton-co`, gated so it only
  renders when a matching case study exists (no dead links once more
  portfolio projects exist without a case study yet).
- **New content type, not the `Artwork` model.** A case study's content
  (persona cards, a sitemap tree, a 7-swatch color board, a typography
  specimen, 35+ distinct sections) doesn't fit `Artwork`'s catalogue-record
  shape or the journal's `StoryBlock` article-block system. It gets its own
  fixed-shape `CaseStudy` type in `src/content/types.ts` and a new
  `src/content/case-studies.ts` data file — one record for now (Thornton &
  Co.), same pattern as every other content type in `src/content/`.
- **Animation: Framer Motion throughout, matching the site's existing
  language, plus one bespoke WebGL hero moment — zero new npm
  dependencies.** The site already uses Framer Motion for every scroll
  reveal (`MReveal`, `Reveal`, `SplitReveal` in `src/components/motion/` and
  `src/components/typography/`) and Three.js / React Three Fiber for the
  homepage's floating gallery (`@react-three/fiber`, `three`, already
  dependencies). New case-study sections reuse those exact primitives —
  `MReveal` variants for staggered reveals, `Kicker`/`SectionDivider` for
  section framing — so motion feels like one system, not a bolted-on
  library. The cover section additionally gets a small bespoke R3F scene
  (1–2 textured planes of the real Thornton screenshots, subtle
  pointer-parallax + idle float) — a new, purpose-built component (not a
  reuse of the multi-card orbiting `FloatingGallery`, which is shaped for
  many artworks, not one hero image), following the exact graceful-
  degradation pattern `FloatingGalleryHero` already establishes: WebGL on
  capable desktops, a flat animated Framer Motion hero everywhere else
  (mobile, reduced-motion, no-WebGL), decided the same way — reading
  `matchMedia`/`webgl` support directly in an effect on every invocation,
  never a `resolvedOnceRef`-style gated flag (see `FloatingGalleryHero.tsx`
  for why that pattern matters — it's what caused this session's earlier
  `removeChild` crash).
- **No Lottie, no new component library.** Nothing in the content calls for
  a specific Lottie animation asset, and a new pre-built component library
  would duplicate what `MReveal`/`.chip`/existing primitives already do
  consistently. If the user has a specific Lottie asset in mind later, it's
  a separate, additive follow-up.
- **Real assets only.** Screenshot sections reuse the 5 real Thornton
  images already in `public/portfolio/` (`thornton-co.png`,
  `thornton-co-home.png`, `thornton-co-services.png`,
  `thornton-co-measurements.png`, `thornton-co-booking.png`) and the real
  color hex values / typeface names from the case-study document. No
  fabricated wireframes, moodboard photography, or Figma screenshots the
  user didn't provide — sections that call for imagery we don't have
  (e.g. "moodboard of 12 photos", "grey wireframes", "Figma design-system
  screenshot") render as structured text/diagram content instead of
  inventing images.

## Content model

`src/content/types.ts` gains:

```ts
export interface CaseStudy {
  id: string;
  slug: string;                 // "thornton-co"
  artworkId: string;            // "prj-thornton" — links back to the Artwork record
  title: string;
  tagline: string;               // "Tailored for Every Story"
  eyebrow: string;                // "UI/UX Case Study — 2026"
  year: string;
  heroImages: string[];          // real screenshot paths for the 3D hero + fallback
  liveUrl: string;

  projectDetails: { label: string; value: string }[]; // Industry, Project Type, Platform, Design Tool, Prototype, Role, Focus

  overview: { heading: string; body: string[] };
  context: { heading: string; body: string[]; keywords: string[] };
  problem: {
    heading: string;
    feelWords: string[];
    remainWords: string[];
    coreQuestion: string;
  };
  objectives: { number: string; title: string; body: string }[];
  userGoals: string[];
  audiences: { name: string; body: string; needs: string[] }[];
  personas: {
    name: string; role: string; age: string; goal: string;
    priorities: string; concern: string; needs: string[];
  }[];
  painPoints: { problem: string; solution: string }[];
  uxStrategy: { stages: { name: string; body: string }[] };
  sitemap: { label: string; children?: { label: string; children?: { label: string }[] }[] }[];
  userFlows: { title: string; steps: string[] }[];
  contentArchitecture: { section: string; question: string }[];
  visualDirection: { heading: string; body: string; traits: string[] };
  colorPalette: { name: string; hex: string; usage: string }[];
  typography: {
    display: { name: string; uses: string[] };
    interface: { name: string; uses: string[] };
    scale: { name: string; sizes: string }[];
  };
  grid: { device: string; spec: string[] }[];
  spacing: { base: string; scale: number[] };
  imageDirection: {
    categories: { name: string; items: string[] }[];
    treatment: string[];
    ratios: { use: string; ratio: string }[];
  };
  iconography: string[];
  buttonSystem: {
    primary: string; secondary: string; textLink: string; principles: string[];
  };
  componentSystem: { core: string[]; states: string[] };
  homepageSections: { title: string; question: string; body: string }[];
  processSteps: { number: string; title: string; body: string }[];
  personalization: { options: string[]; note: string };
  lookbookCategories: string[];
  bookingOptions: { title: string; body: string }[];
  formFlow: string[];
  responsive: { device: string; spec: string[] }[];
  interactionDesign: { microInteractions: string[]; principle: string };
  accessibility: string[];
  conversionStrategy: { primary: string; supporting: string[] };
  conversionPaths: { name: string; steps: string[] }[];
  uxWriting: { focus: string[]; body: string };
  designTokens: { group: string; tokens: string[] }[];
  validation: string[];
  decisions: { number: string; title: string; body: string }[];
  challenges: { challenge: string; response: string }[];
  outcome: string[];
  delivered: { ux: string[]; ui: string[]; prototyping: string[] };
  skills: string[];
  reflection: { heading: string; body: string[] };
}
```

`getCaseStudies()`, `getCaseStudyBySlug(slug)` added to `src/content/index.ts`,
same pattern as every other getter there.

## Design

### Routing

- `src/app/case-studies/page.tsx` — listing page.
- `src/app/case-studies/[slug]/page.tsx` — detail page, `generateStaticParams`
  over `caseStudies`, `notFound()` on miss (same pattern as
  `services/[slug]` / `portfolio/[slug]`).

### Listing page (`/case-studies`)

Hero (`Kicker` + `SplitReveal` heading + deck, matching `PageHeader`'s
existing pattern used on `/portfolio`/`/services`) → one **featured card**
for Thornton & Co.: hero image, title, "UI/UX Design" format label, its
Stack tags as `.chip`s (reusing the exact chip styling from the portfolio
filter — no new visual language), 2–3 sentence description pulled from the
`overview`, and a **"Case Study →"** button linking to
`/case-studies/thornton-co`. No "coming soon" placeholder grid — content
the user hasn't provided isn't fabricated; the section simply has one card
today and is ready to hold more as `case-studies.ts` grows.

### Detail page (`/case-studies/thornton-co`)

Composed from ~15 new, focused, reusable section components under
`src/components/case-study/`, each consuming one typed slice of `CaseStudy`
and built from existing motion primitives (`MReveal`, `Kicker`,
`SectionDivider`) — no section invents its own animation approach:

| Component | Renders | Feeds from |
|---|---|---|
| `CaseStudyHero` (+ `CaseStudyHero3D`/`CaseStudyHeroFallback`) | Cover: eyebrow, title, tagline, project-details `MetaList`, WebGL/fallback visual | `title`, `tagline`, `eyebrow`, `projectDetails`, `heroImages` |
| `ProseSection` | Eyebrow + heading + paragraph(s) — reused for Overview, Context, Problem intro, UX Writing, Reflection | `overview`, `context`, `problem`, `uxWriting`, `reflection` |
| `AudienceGrid` | Segment cards (name, body, needs) | `audiences` |
| `PersonaGrid` | 3 persona cards | `personas` |
| `PainPointList` | Problem → Solution pairs | `painPoints` |
| `StageFlow` | Horizontal numbered/arrow flow — reused for the 5-stage UX strategy and the 4-step process | `uxStrategy`, `processSteps` |
| `SitemapTree` | Nested tree diagram (CSS only) | `sitemap` |
| `FlowDiagram` | Linear step flow with arrows — reused for user flows and conversion paths | `userFlows`, `conversionPaths` |
| `ColorPaletteBoard` | Tall swatches: name, real hex, usage | `colorPalette` |
| `TypographySpecimen` | Display/interface type pairing + scale table | `typography` |
| `SpecGrid` | Device-spec cards — reused for grid system and responsive design | `grid`, `responsive` |
| `ChipList` | Reuses the existing `.chip` class — for iconography, skills, accessibility checklist, component system | `iconography`, `skills`, `accessibility`, `componentSystem` |
| `ScreenGallery` | Real-screenshot showcase | `heroImages` (the 5 real Thornton images) |
| `DecisionList` | Numbered cards — reused for key decisions, challenges/responses, and booking options (In-Studio/Online/Pickup — same title+body shape) | `decisions`, `challenges`, `bookingOptions` |
| `ObjectiveList` | Numbered/titled cards — reused for business objectives and the homepage section breakdown (title + question + body — same card shape) | `objectives`, `homepageSections` |

Every remaining field reuses one of the components above or an existing
primitive, so nothing in `CaseStudy` is left unrendered:

- `projectDetails`, `contentArchitecture` → the existing `MetaList`
  component (`src/components/ui/MetaList.tsx`) directly — both are
  label/value pairs, exactly what it already renders. No new component.
- `personalization.options`, `lookbookCategories`, `iconography`, `skills`,
  `accessibility`, `componentSystem.core`/`.states`, `interactionDesign
  .microInteractions`, `designTokens` (one `ChipList` per token group),
  `validation` → `ChipList`.
- `imageDirection.categories`/`.treatment` → `ChipList` (grouped by
  category); `imageDirection.ratios` and `grid`/`responsive` device specs →
  `SpecGrid`.
- `buttonSystem.principles`, `interactionDesign.principle`,
  `conversionStrategy.primary`, `personalization.note`,
  `uxWriting.body` → `ProseSection` (short-form variant, no eyebrow).
- `conversionStrategy.supporting` → `ChipList`.
- `formFlow` → `FlowDiagram` (it's the same "linear numbered steps" shape
  as the user flows and conversion paths it already renders).
- `delivered.ux`/`.ui`/`.prototyping` → three `ChipList`s under one
  "What we delivered" heading.

Section order on the page follows the case-study document's own numbering
(01 Cover → 02 Overview → 03 Context → … → 53 Reflection), condensed where
the source document itself groups related sub-sections (e.g. grid system +
spacing render as one "Layout system" block; button system + component
system render as one "Component system" block) — same content, not
duplicated headers for what's really one design-system section.

Closing: "Visit website" (real `liveUrl`) + a link back to
`/portfolio/thornton-co`.

### Nav + cross-link

`src/config/theme.ts`'s `primaryNav` gains one entry after Portfolio:
`{ label: "Case Studies", href: "/case-studies", note: "Deep dives into how we work" }`.

`src/app/portfolio/[slug]/page.tsx` gains one conditional block: if
`getCaseStudyBySlug(artwork.slug)` returns a record, render a
"Full Case Study →" link to `/case-studies/${artwork.slug}` near the
existing "Visit website" link. No change for projects without a case study.

### Testing / verification

No unit test framework in this project. Verification: `npx tsc --noEmit`
clean, plus a real-browser check via `gstack:browse` — confirm the new nav
item appears and routes correctly, `/case-studies` shows the Thornton card
with a working "Case Study →" link, `/case-studies/thornton-co` renders
every section without console errors (checked at desktop width, at mobile
width, and with `prefers-reduced-motion` to exercise the hero's fallback
path), the WebGL hero doesn't crash/tear down the way `FloatingGalleryHero`
once did (confirm on a fresh load AND on React Strict Mode's double-invoke
in dev), and `/portfolio/thornton-co` shows the new cross-link.

## Out of scope

- No changes to `/portfolio`, its filters, or the Featured-work selector.
- No second case study — the data model supports more, but only Thornton &
  Co.'s content is authored now.
- No Lottie, no new npm dependencies of any kind.
- No fabricated imagery (wireframes, moodboard photos, Figma screenshots)
  for sections the user didn't supply real assets for.
