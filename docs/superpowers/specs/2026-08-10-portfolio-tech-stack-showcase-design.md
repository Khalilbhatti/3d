# Expanded Stack filter for `/portfolio`

**Date:** 2026-08-10
**Status:** Approved, pending implementation
**Supersedes:** two earlier versions of this spec (same file, same date):
1. The static-showcase version — user reversed "static" after seeing the
   initial design and asked for real, clickable filter chips instead.
2. The "keep Team/Service/Industry, add Stack as a 7-category section
   below" version — user then sent a screenshot of the live 4-column filter
   bar with the explicit instruction to **remove Team, Service, and
   Industry entirely**, replacing the whole filter bar with only a Stack
   filter, organized into 6 categories (not 7 — the pasted list drops the
   "Design & Marketing" category and several previously-real tags; see
   Decisions below).

## Problem

`/portfolio`'s filter bar currently shows four facets — Team, Service,
Industry, Stack — all derived live from real project data via `getFacets()`
in `src/content/index.ts`. The user reviewed a screenshot of this live
4-column bar and gave a final, explicit instruction: remove Team, Service,
and Industry entirely, and replace the whole filter bar with a single Stack
filter, organized into 6 categories with a specific tag list per category.
Matching projects for tags with no current match will be added later; a new
tag showing "No projects match" until then is explicitly acceptable.

## Decisions

- **Team, Service, and Industry are removed, not just visually
  de-emphasized.** The `FilterGroup` calls for all three are deleted from
  `ArchiveGrid.tsx`, along with the now-unused `filters.artist`,
  `filters.period`, `filters.location` state, their `results`-filtering
  checks, and the `Facets.artists` / `Facets.periods` / `Facets.locations`
  fields that fed them. Free-text search (the existing "Search projects"
  box) already matches against artist name, location, and period text, so
  team/industry findability isn't lost entirely — just the dedicated
  clickable-chip UI for it.
- **Real interactive filters, not a static display.** Every Stack tag
  renders with the same `.chip` class and `data-active`/`aria-pressed`
  behavior already used by every filter chip on the page (see
  `src/app/globals.css:171-193` and `FilterGroup` in `ArchiveGrid.tsx`). No
  new visual treatment.
- **No change to filter matching *logic*.** `filters.medium` stays a
  single-select string, matched via `artworkMediumBucket(a) !== filters.medium`
  exactly as today. Clicking any Stack tag — regardless of which category
  it's grouped under visually — sets/clears that one shared filter value.
  `Artwork` type and the medium-matching predicate are unchanged.
- **The Stack facet becomes a static curated list, not data-derived.**
  `getFacets()`'s output stops deriving anything from `artworks` and returns
  a fixed, hand-authored list instead, so every tag always renders as a
  clickable chip regardless of whether any project matches it yet.
- **This list is exactly what the user provided — 6 categories, not 7 —
  and it does NOT preserve every previously-real tag.** Unlike the prior
  version of this spec, the user's final list intentionally drops: React
  (bare — only "React.js" remains), WordPress, Front-End Engineering, Brand
  Identity, SEO, UI/UX Design, UI/UX Research. Projects whose `medium` field
  matches those dropped values remain fully visible in the unfiltered grid
  and via free-text search — they simply become unreachable through any
  Stack chip, since no chip's exact string matches their bucket anymore.
  GoHighLevel, Next.js, and Laravel do survive (present verbatim in the new
  list), so those three still filter correctly.

## Content

Exactly 6 categories, each rendered via the existing `FilterGroup`
component, all writing to the same `filters.medium` state:

- **AI & Automation** — AI Agents, AI Automation, n8n, Make.com, Zapier,
  GoHighLevel, API Integration, 3rd-Party Integrations
- **Development** — Python, Node.js, Express.js, Laravel, PHP, React.js,
  Next.js, Vue.js, Angular, JavaScript, HTML, CSS
- **Database & Cloud** — PostgreSQL, MySQL, MongoDB, Firebase, Redis, AWS,
  Azure, Google Cloud, Docker, CI/CD
- **AI / ML** — OpenAI API, GPT, Claude, LangChain, TensorFlow, NLP, Machine
  Learning
- **CRM & Business Systems** — GHL, HubSpot, Zoho, Pipedrive, Salesforce,
  Active Campaign, CRM Automation
- **Mobile & E-commerce** — React Native, Flutter, Shopify, WooCommerce,
  Stripe, PayPal, Razorpay

## Design

### Data layer

`Facets` shrinks to a single field: `{ stackCategories: { category: string;
tags: string[] }[] }`. `getFacets()` returns `STACK_CATEGORIES` (a new
exported constant in `src/content/index.ts`, containing exactly the 6
categories and tag lists above) directly — no per-artwork derivation left.
`artworkLocationBucket` is deleted (orphaned once Industry's `FilterGroup`
is gone; confirmed via grep to have no other callers in `src/`).
`artworkMediumBucket` is kept — still used for Stack's filter matching.

### Layout

Filter bar becomes Stack-only: the "Search projects" / "View" row stays
unchanged, and directly below it is a single responsive grid
(`md:grid-cols-2 xl:grid-cols-3`) of 6 `FilterGroup`s, one per category, each
using its category name as the legend. `page.tsx`'s header copy ("Filter by
service or industry...") is updated since that facet no longer exists.

### Testing / verification

No unit test framework in this project. Verification: `npx tsc --noEmit`
clean, plus a real-browser check via `gstack:browse` — confirm Team, Service,
and Industry are gone, all 6 Stack categories render as real chips, clicking
"GoHighLevel" (or "Next.js"/"Laravel") still filters to the same project it
does today (regression check on a tag that survived), clicking a tag with no
current matches (e.g. "TensorFlow") correctly shows "No projects match those
filters", and the search box still works.

## Out of scope

- No new project data added — matching projects for tags with zero current
  matches is explicitly a later, separate task the user will handle.
- No changes to `Artwork` type or per-project data model.
- No new npm dependencies.
- No attempt to preserve Team/Service/Industry filtering through some other
  UI (e.g. inside search) beyond what free-text search already does today.
