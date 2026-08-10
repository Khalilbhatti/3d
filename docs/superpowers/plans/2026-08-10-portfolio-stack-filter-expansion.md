# Portfolio Stack-Only Filter Bar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/portfolio`'s 4-facet filter bar (Team, Service, Industry, Stack) with a single Stack filter organized into 6 curated categories, all real interactive `.chip` filters.

**Architecture:** `getFacets()` stops deriving anything from artwork data and returns a single static `STACK_CATEGORIES` constant. `ArchiveGrid.tsx` drops the Team/Service/Industry `FilterGroup`s and their backing filter state entirely, keeping only `filters.medium`, and renders one `FilterGroup` per Stack category in a single responsive grid.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS. No new dependencies. No test framework in this project — verification is `npx tsc --noEmit` plus a real-browser check via the `gstack:browse` skill.

## Global Constraints

- `filters.medium` stays a single-select string, matched via `artworkMediumBucket(a) !== filters.medium` — unchanged. `Artwork` type is unchanged.
- Every Stack tag uses the existing `.chip` class and `FilterGroup` component (`src/app/globals.css:171-193`) — no new visual treatment.
- The Stack tag list is exactly the 6 categories below — no more, no fewer tags than specified. This intentionally drops several previously-real tags (React, WordPress, Front-End Engineering, Brand Identity, SEO, UI/UX Design, UI/UX Research) — those projects stay visible in the unfiltered grid and via search, they just become unreachable via any chip. This is accepted, not a bug.
- No new project data, no `Artwork` type changes, no new npm dependencies.

---

### Task 1: Simplify the content layer to a single static Stack facet

**Files:**
- Modify: `src/content/index.ts:97-127`

**Interfaces:**
- Produces: `STACK_CATEGORIES: { category: string; tags: string[] }[]` (exported constant) and `Facets = { stackCategories: { category: string; tags: string[] }[] }` — consumed by Task 2.
- Removes: `Facets.artists`, `Facets.periods`, `Facets.locations`, `Facets.mediums`, and the exported `artworkLocationBucket` helper (confirmed via `grep -rn "artworkLocationBucket" src/` to have no callers outside this file and `ArchiveGrid.tsx`, which Task 2 stops calling it from).
- Keeps: `artworkMediumBucket` (still used by Task 2 for Stack filter matching).

`src/content/index.ts` currently ends with this block (lines 97-127):

```ts
/* ------------------------- Archive filter facets -------------------------- */
export interface Facets {
  artists: { id: string; name: string }[];
  periods: string[];
  locations: string[];
  mediums: string[];
}

export function getFacets(): Facets {
  const period = new Set<string>();
  const location = new Set<string>();
  const medium = new Set<string>();
  for (const a of artworks) {
    period.add(a.period);
    location.add(a.location.split("·")[0].trim());
    medium.add(a.medium.split(/ on |,/i)[0].trim());
  }
  return {
    artists: artists
      .filter((ar) => getArtworksByArtist(ar.id).length > 0)
      .map((ar) => ({ id: ar.id, name: ar.name })),
    periods: [...period].sort(),
    locations: [...location].sort(),
    mediums: [...medium].sort(),
  };
}

/** Normalisers used by the archive filter so labels match the facet buckets. */
export const artworkLocationBucket = (a: Artwork) => a.location.split("·")[0].trim();
export const artworkMediumBucket = (a: Artwork) => a.medium.split(/ on |,/i)[0].trim();
```

- [ ] **Step 1: Replace the facets block**

Replace lines 97-127 (from the `/* ------------------------- Archive filter facets -------------------------- */` comment through the end of the file) with:

```ts
/* ------------------------- Archive filter facets -------------------------- */
export interface Facets {
  stackCategories: { category: string; tags: string[] }[];
}

/**
 * Curated Stack filter tags, grouped for display. Static (not derived from
 * artwork data) so every tag renders as a clickable chip even before a
 * project uses it. See
 * docs/superpowers/specs/2026-08-10-portfolio-tech-stack-showcase-design.md.
 */
export const STACK_CATEGORIES: { category: string; tags: string[] }[] = [
  {
    category: "AI & Automation",
    tags: [
      "AI Agents",
      "AI Automation",
      "n8n",
      "Make.com",
      "Zapier",
      "GoHighLevel",
      "API Integration",
      "3rd-Party Integrations",
    ],
  },
  {
    category: "Development",
    tags: [
      "Python",
      "Node.js",
      "Express.js",
      "Laravel",
      "PHP",
      "React.js",
      "Next.js",
      "Vue.js",
      "Angular",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Database & Cloud",
    tags: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Redis",
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "CI/CD",
    ],
  },
  {
    category: "AI / ML",
    tags: ["OpenAI API", "GPT", "Claude", "LangChain", "TensorFlow", "NLP", "Machine Learning"],
  },
  {
    category: "CRM & Business Systems",
    tags: ["GHL", "HubSpot", "Zoho", "Pipedrive", "Salesforce", "Active Campaign", "CRM Automation"],
  },
  {
    category: "Mobile & E-commerce",
    tags: ["React Native", "Flutter", "Shopify", "WooCommerce", "Stripe", "PayPal", "Razorpay"],
  },
];

export function getFacets(): Facets {
  return { stackCategories: STACK_CATEGORIES };
}

/** Normaliser used by the archive filter so labels match the Stack facet buckets. */
export const artworkMediumBucket = (a: Artwork) => a.medium.split(/ on |,/i)[0].trim();
```

- [ ] **Step 2: Typecheck**

This change alone will NOT typecheck cleanly — `src/components/gallery/ArchiveGrid.tsx` still references `facets.artists`, `facets.periods`, `facets.locations`, `facets.mediums`, and `artworkLocationBucket`, none of which exist anymore. That's expected; Task 2 fixes it.

Run: `npm run typecheck`
Expected: several errors, all inside `src/components/gallery/ArchiveGrid.tsx`, all "Property '...' does not exist on type 'Facets'" or "has no exported member 'artworkLocationBucket'". If any error appears in a file other than `ArchiveGrid.tsx`, stop and investigate before continuing.

- [ ] **Step 3: Commit**

```bash
git add src/content/index.ts
git commit -m "content: replace derived Team/Service/Industry/Stack facets with a single curated Stack facet"
```

---

### Task 2: Remove Team/Service/Industry from ArchiveGrid, render Stack-only filter bar

**Files:**
- Modify: `src/components/gallery/ArchiveGrid.tsx` (imports, `Filters` interface, `EMPTY`, `results`, `signature`, `toggle`, the filter-bar JSX, and the `FilterGroup` call sites)
- Modify: `src/app/portfolio/page.tsx:29` (header copy referencing the removed Service/Industry filters)

**Interfaces:**
- Consumes: `Facets.stackCategories: { category: string; tags: string[] }[]` from Task 1 (via the existing `facets: Facets` prop).
- Consumes: the existing, unmodified `FilterGroup` component (`ArchiveGrid.tsx:189-219`) — reused as-is, once per Stack category.
- Changes: `toggle(key: keyof Filters, value: string)` becomes `toggle(value: string)` since `Filters` now has only one field. `FilterGroup`'s `onToggle` prop type is `(value: string) => void`, so `onToggle={toggle}` can be passed directly (no arrow-wrapper needed).

**Step-by-step:**

- [ ] **Step 1: Update the `@/content/index` import**

`ArchiveGrid.tsx:7-12` currently reads:

```tsx
import {
  type Facets,
  getArtistById,
  artworkLocationBucket,
  artworkMediumBucket,
} from "@/content/index";
```

Replace with (drop `artworkLocationBucket`, it no longer exists):

```tsx
import { type Facets, getArtistById, artworkMediumBucket } from "@/content/index";
```

- [ ] **Step 2: Shrink the `Filters` interface and `EMPTY` constant**

`ArchiveGrid.tsx:21-28` currently reads:

```tsx
interface Filters {
  artist: string | null;
  period: string | null;
  location: string | null;
  medium: string | null;
}

const EMPTY: Filters = { artist: null, period: null, location: null, medium: null };
```

Replace with:

```tsx
interface Filters {
  medium: string | null;
}

const EMPTY: Filters = { medium: null };
```

- [ ] **Step 3: Simplify the `results` filter predicate**

`ArchiveGrid.tsx:57-69` currently reads:

```tsx
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artworks.filter((a) => {
      if (filters.artist && a.artistId !== filters.artist) return false;
      if (filters.period && a.period !== filters.period) return false;
      if (filters.location && artworkLocationBucket(a) !== filters.location) return false;
      if (filters.medium && artworkMediumBucket(a) !== filters.medium) return false;
      if (!q) return true;
      const artist = getArtistById(a.artistId)?.name ?? "";
      const hay = `${a.title} ${artist} ${a.medium} ${a.year} ${a.location} ${a.period} ${a.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [artworks, filters, query]);
```

Replace with (drop the artist/period/location checks; keep medium and the free-text search, including its existing artist/location/period text matching — search still finds by team/industry, it's just no longer a clickable facet):

```tsx
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artworks.filter((a) => {
      if (filters.medium && artworkMediumBucket(a) !== filters.medium) return false;
      if (!q) return true;
      const artist = getArtistById(a.artistId)?.name ?? "";
      const hay = `${a.title} ${artist} ${a.medium} ${a.year} ${a.location} ${a.period} ${a.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [artworks, filters, query]);
```

- [ ] **Step 4: Simplify `signature` and `toggle`**

`ArchiveGrid.tsx:71-81` currently reads:

```tsx
  const activeCount = Object.values(filters).filter(Boolean).length + (query ? 1 : 0);
  const signature = `${query}|${filters.artist}|${filters.period}|${filters.location}|${filters.medium}|${view}`;
  const ids = results.map((a) => a.id);

  function toggle(key: keyof Filters, value: string) {
    setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));
  }
  function clearAll() {
    setFilters(EMPTY);
    setQuery("");
  }
```

Replace with (`activeCount` needs no change — it's already generic over `Object.values(filters)`; only `signature` and `toggle` reference the removed fields by name):

```tsx
  const activeCount = Object.values(filters).filter(Boolean).length + (query ? 1 : 0);
  const signature = `${query}|${filters.medium}|${view}`;
  const ids = results.map((a) => a.id);

  function toggle(value: string) {
    setFilters((f) => ({ medium: f.medium === value ? null : value }));
  }
  function clearAll() {
    setFilters(EMPTY);
    setQuery("");
  }
```

- [ ] **Step 5: Replace the filter-bar JSX**

`ArchiveGrid.tsx:122-147` currently reads:

```tsx
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <FilterGroup
            legend="Team"
            options={facets.artists.map((a) => ({ label: a.name, value: a.id }))}
            active={filters.artist}
            onToggle={(v) => toggle("artist", v)}
          />
          <FilterGroup
            legend="Service"
            options={facets.periods.map((p) => ({ label: p.split(" · ")[0], value: p }))}
            active={filters.period}
            onToggle={(v) => toggle("period", v)}
          />
          <FilterGroup
            legend="Industry"
            options={facets.locations.map((l) => ({ label: l, value: l }))}
            active={filters.location}
            onToggle={(v) => toggle("location", v)}
          />
          <FilterGroup
            legend="Stack"
            options={facets.mediums.map((m) => ({ label: m, value: m }))}
            active={filters.medium}
            onToggle={(v) => toggle("medium", v)}
          />
        </div>
```

Replace with:

```tsx
        <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
          {facets.stackCategories.map((cat) => (
            <FilterGroup
              key={cat.category}
              legend={cat.category}
              options={cat.tags.map((t) => ({ label: t, value: t }))}
              active={filters.medium}
              onToggle={toggle}
            />
          ))}
        </div>
```

- [ ] **Step 6: Fix the now-stale header copy in `page.tsx`**

`src/app/portfolio/page.tsx:29` currently reads:

```tsx
        deck="End-to-end builds — from complete UI design systems to custom full-stack development and cloud deployment. Filter by service or industry, and open any project to read the case study."
```

Replace with (Service/Industry filters no longer exist; this sentence must stop claiming they do):

```tsx
        deck="End-to-end builds — from complete UI design systems to custom full-stack development and cloud deployment. Filter by stack, and open any project to read the case study."
```

- [ ] **Step 7: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/gallery/ArchiveGrid.tsx src/app/portfolio/page.tsx
git commit -m "feat(portfolio): replace 4-facet filter bar with a single 6-category Stack filter"
```

---

### Task 3: Real-browser verification

**Files:** none (verification only, no code changes)

No unit test framework exists in this project; this is the project's established verification method.

**Interfaces:**
- Consumes: the running dev server at `/portfolio`, and the `gstack:browse` skill for headless-browser automation.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Run this in the background. Wait for the "Ready" log line (or poll the dev server's URL until it responds) before proceeding — read the port from the dev server's own startup output rather than assuming 3000.

- [ ] **Step 2: Verify Team/Service/Industry are gone and Stack renders correctly**

Using the `gstack:browse` skill, navigate to `/portfolio` and confirm, with a screenshot:
- No "Team", "Service", or "Industry" labels/chips remain anywhere on the page.
- A single filter section renders with all 6 category labels (AI & Automation, Development, Database & Cloud, AI / ML, CRM & Business Systems, Mobile & E-commerce), each with its own chip row.
- Every chip uses the same bordered-pill `.chip` styling as before (no visual distinction between categories).
- The updated header "deck" copy no longer mentions filtering by service or industry.

- [ ] **Step 3: Regression check — a tag that survived still filters correctly**

Click the "GoHighLevel" chip (under AI & Automation). Confirm:
- The chip becomes visually active (inverted: dark background, light text) with `aria-pressed="true"`.
- The results count and grid update to show the same project(s) "GoHighLevel" filters to today (the project whose `medium` field starts with `"GoHighLevel"`).
- Click it again to confirm it toggles off and the full grid returns.

- [ ] **Step 4: New-tag check — an unused tag shows the expected empty state**

Click a tag with no current matches, e.g. "TensorFlow" (under AI / ML). Confirm:
- The chip becomes active.
- The page shows "No projects match those filters." (the existing empty state) rather than an error or blank crash.
- "Clear the filters" recovers the full grid.

- [ ] **Step 5: Confirm search still works**

Type a term that would previously have matched via the removed Team/Industry chips (e.g. an artist/team name, or an industry word like "wellness") into the search box. Confirm it still returns the matching project via free-text search, since that logic in `results` was preserved.

- [ ] **Step 6: Record results**

No commit for this task (no code changes). Report the verification results — pass/fail for each of Steps 2-5, with the screenshot(s) taken — in the task report.

---

## Self-Review

**Spec coverage:** The "Team/Service/Industry removed entirely" decision is satisfied by deleting their `FilterGroup` calls, backing filter state, and `results` checks (Task 2, Steps 2-5). The "6 categories, exact tag list" content is satisfied verbatim in `STACK_CATEGORIES` (Task 1). "Static curated list, not data-derived" is satisfied — `getFacets()` no longer touches `artworks` at all (Task 1). "Real interactive filters" (unchanged `.chip`/`FilterGroup` reuse) is satisfied (Task 2, Step 5). The stale header-copy fix is covered (Task 2, Step 6) since it's a direct, in-scope consequence of removing Service/Industry filtering. Testing section is covered by Task 3, including the regression check (now on "GoHighLevel", since "WordPress" is one of the intentionally-dropped tags) and the new-tag empty-state check.

**Placeholder scan:** No TBD/TODO markers. Every step has complete, copy-pasteable code or an exact command with an expected result.

**Type consistency:** `Facets.stackCategories` (Task 1) matches exactly what Task 2 consumes (`facets.stackCategories.map((cat) => ...)`, `cat.category`, `cat.tags`). `toggle`'s new single-argument signature (`(value: string) => void`, Task 2 Step 4) matches `FilterGroup`'s `onToggle` prop type exactly, so `onToggle={toggle}` (Task 2 Step 5) type-checks without a wrapper. `artworkMediumBucket` keeps its exact name and signature across both tasks. No task references `facets.mediums`, `facets.artists`, `facets.periods`, `facets.locations`, or `artworkLocationBucket` after Task 2 completes.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-10-portfolio-stack-filter-expansion.md`, superseding the previous version of this plan (same file). Proceeding with **Subagent-Driven execution** per your "sub agents" instruction — dispatching a fresh implementer subagent for Task 1 now.
