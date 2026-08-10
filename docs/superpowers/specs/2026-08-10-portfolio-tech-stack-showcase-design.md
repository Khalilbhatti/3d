# Expanded Stack filter for `/portfolio`

**Date:** 2026-08-10
**Status:** Approved, pending implementation
**Supersedes:** the static-showcase version of this spec (same file, same date)
— user reversed the "static" decision after seeing the initial design and
asked for real, clickable filter chips instead, accepting that most will
show 0 matching projects until more projects are added later.

## Problem

`/portfolio`'s "Stack" filter column currently shows ~10 chips, each derived
live from real project data (`getFacets()` in `src/content/index.ts` builds
`facets.mediums` from every `Artwork.medium` field's first comma-separated
segment via `artworkMediumBucket()`; clicking a chip filters `ArchiveGrid` to
projects whose bucket matches exactly). The user wants this expanded to
~45 additional technology tags across 6 categories (AI & Automation,
Development, Database & Cloud, AI/ML, CRM & Business Systems, Mobile &
E-commerce), as real interactive filter chips — matching the existing
`.chip` visual/interaction style exactly — while keeping the UI looking
good. Matching projects for the new tags will be added later; it's
explicitly acceptable for a new tag to show "No projects match" until then.

## Decisions

- **Real interactive filters, not a static display.** Every tag — old and
  new — renders with the same `.chip` class and `data-active`/`aria-pressed`
  behavior already used by every other filter chip on the page (see
  `src/app/globals.css:171-193` and `FilterGroup` in `ArchiveGrid.tsx`). No
  new visual treatment, no distinction from the existing filters — this is
  the opposite of the superseded static-showcase design.
- **No change to filter *logic*.** `filters.medium` stays a single-select
  string, matched via `artworkMediumBucket(a) !== filters.medium` exactly as
  today. Clicking any Stack tag — regardless of which category it's grouped
  under visually — sets/clears that one shared filter value, same as now.
  This means no changes to the `Filters` interface, `Artwork` type, or the
  `results` filtering logic in `ArchiveGrid.tsx`.
- **The Stack facet becomes a static curated list, not purely
  data-derived.** Today, `facets.mediums` is `[...new Set(artworks.map(...))]`
  — only values that already exist in the data show up. That can't produce
  tags with zero current matches. `getFacets()`'s `mediums` field changes to
  a fixed, hand-authored superset (all ~45 new tags plus every currently-real
  bucket value), so every tag always renders as a clickable chip regardless
  of whether any project matches it yet. A project added later that sets
  `medium` to (e.g.) `"TensorFlow, ..."` will start matching the existing
  "TensorFlow" chip automatically — no facet-list update needed at that
  point, since the tag is already in the curated superset.
- **All 10 currently-real tags are preserved, none renamed.** The pasted
  45-tag list doesn't include 6 tags that are real, working filters today
  (Brand Identity, Front-End Engineering, SEO, UI/UX Design, UI/UX Research,
  WordPress) — dropping them would silently break existing project filters.
  They're kept, grouped into the categories they fit best (see Content
  below). Similarly, "React" (real, matches an existing project today) and
  "React.js" (new, from the pasted list) are kept as two distinct chips
  rather than merged into one — renaming the real "React" tag to "React.js"
  would break its match against the existing project's `medium` field
  (`"React, React Native, Node.js, Cloud"`), since matching is an exact
  string comparison against real data, not fuzzy. Same reasoning for
  "GoHighLevel" (existing, real) vs. "GHL" (new, under CRM & Business
  Systems) — kept distinct. Where a new tag's spelling exactly matches an
  existing real value already (e.g. "GoHighLevel" also appears verbatim in
  the pasted AI & Automation category), it's treated as one shared chip, not
  duplicated.

## Content

7 categories (6 from the user's list + 1 new one to hold currently-real tags
that don't fit elsewhere), each rendered via the existing `FilterGroup`
component, all writing to the same `filters.medium` state:

- **AI & Automation** — AI Agents, AI Automation, n8n, Make.com, Zapier,
  GoHighLevel *(shared with the existing real tag — same string)*, API
  Integration, 3rd-Party Integrations
- **Development** — React *(existing, real)*, React.js *(new, distinct)*,
  Next.js *(existing, real)*, Front-End Engineering *(existing, real)*,
  WordPress *(existing, real)*, Laravel *(existing, real)*, Python, Node.js,
  Express.js, PHP, Vue.js, Angular, JavaScript, HTML, CSS
- **Database & Cloud** — PostgreSQL, MySQL, MongoDB, Firebase, Redis, AWS,
  Azure, Google Cloud, Docker, CI/CD
- **AI / ML** — OpenAI API, GPT, Claude, LangChain, TensorFlow, NLP, Machine
  Learning
- **CRM & Business Systems** — GHL *(new, distinct from GoHighLevel above)*,
  HubSpot, Zoho, Pipedrive, Salesforce, Active Campaign, CRM Automation
- **Mobile & E-commerce** — React Native, Flutter, Shopify, WooCommerce,
  Stripe, PayPal, Razorpay
- **Design & Marketing** *(new category, holds remaining existing-real
  tags)* — Brand Identity, SEO, UI/UX Design, UI/UX Research

## Design

### Data layer

`getFacets()` in `src/content/index.ts`: replace the derived `mediums: [...medium].sort()`
with a reference to a new exported constant, e.g. `STACK_CATEGORIES: {
category: string; tags: string[] }[]` defined near the top of the same file
(or a new small `src/content/stack.ts` if that reads cleaner — decided at
plan time), containing exactly the 7 categories and tag lists above.
`Facets.mediums` stays `string[]` (the flattened, deduplicated tag list) so
`ArchiveGrid.tsx` doesn't need to know about categories at all — it only
needs the flat list for its existing single `FilterGroup` call, OR (see
Layout below) the categorized structure directly, if the layout changes to
render one `FilterGroup` per category. Exact shape decided at plan time
based on which layout option is chosen.

### Layout

Current filter bar is `grid gap-5 md:grid-cols-2 xl:grid-cols-4` — Team,
Service, Industry, and Stack as four equal-width columns. With ~54 Stack
tags across 7 categories, that column would be far taller than the other
three, breaking the "look good" requirement.

**Chosen approach:** Team / Service / Industry stay as a 3-column row (same
grid, `xl:grid-cols-3` for that row). Stack becomes its own full-width
section directly below that row, laid out as its 7 categories in a
responsive sub-grid (`md:grid-cols-2` — 2 categories per row on desktop,
1 per row on mobile), each category rendered as its own `FilterGroup` with
its category name as the legend. This keeps the top row compact and gives
Stack the horizontal room its tag volume actually needs, while every tag is
still the same real, clickable chip as today — just organized instead of
dumped in one column.

### Testing / verification

No unit test framework in this project (confirmed earlier this session).
Verification: `npx tsc --noEmit` clean, plus a real-browser check via
`gstack:browse` — confirm all 7 categories and their tags render as real
chips, clicking a *currently-real* tag (e.g. "WordPress") still filters to
the same project it does today (regression check — this must not break),
clicking a *new* tag with no current matches correctly shows "No projects
match those filters" (expected, not a bug), and the existing Team/Service/
Industry filters and search box are unaffected.

## Out of scope

- No new project data added — matching projects for the new tags is
  explicitly a later, separate task the user will handle.
- No changes to `Artwork` type or per-project data model — still one
  `medium` bucket per project, exactly as today.
- No new npm dependencies.
