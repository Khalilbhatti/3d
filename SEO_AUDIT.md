# Technical & Content SEO Audit

A full-site inspection of metadata, structured data, sitemap coverage, content uniqueness and Core Web Vitals hygiene across the Next.js codebase — every finding below was reproduced directly against a production build, not inferred.

- **Method:** `next build` (local production build) + a full read of `src/`
- **Scope:** metadata · schema · sitemap · content · Core Web Vitals hygiene
- **Routes inspected:** 61 built pages

> This is the audit-only pass — findings and evidence as first discovered. Every fixable item in this list has since been implemented and re-verified against a fresh production build (all except §07, which needs real social profile URLs before it can be closed).

---

## Overall: 58 / 100

**1 critical · 4 high · 4 medium · 3 low/polish · 7 already working well**

Strong content layer, undone by one plumbing bug. The content model, sitemap wiring and font/image performance choices are genuinely solid. But one root-layout bug forces *every page on the site* to declare the homepage as its own canonical URL — which caps everything else this audit finds at a lower ceiling until it's fixed. Findings below are ordered by severity; §1 is the one to read first.

---

## §1 — Critical

### 01. Every page canonicalizes to the homepage

`alternates: { canonical: "/" }` is set once, in `src/app/layout.tsx`, and none of the twelve page-level metadata exports override it. Next.js metadata inheritance means any field a child route doesn't set falls back to its parent's — so this one line propagates to every URL on the site.

**Evidence** (reproduced against the production build, reading rendered HTML directly):

```
$ grep -o '<link rel="canonical"[^>]*>' .next/server/app/about.html
<link rel="canonical" href="https://[site-domain]/"/>

$ grep -o '<link rel="canonical"[^>]*>' .next/server/app/blog/ai-b2b-lead-generation-automation.html
<link rel="canonical" href="https://[site-domain]/"/>

$ grep -o '<link rel="canonical"[^>]*>' .next/server/app/portfolio/ai-b2b-lead-generation-cold-email-engine.html
<link rel="canonical" href="https://[site-domain]/"/>
```

**Why it matters:** a canonical tag tells search engines "index this other URL instead of this one." Right now the site is telling them, on every single inner page, to index the homepage instead. That's not a ranking penalty — it's an instruction. Left in place, it can get inner pages dropped from the index over months, consolidating everything onto one URL.

**Fix direction:** give each of the 12 metadata exports its own `alternates: { canonical: <path> }` matching that route. The homepage keeps `canonical: "/"` — it's the only one that should.

---

## §2 — High

### 02. No social preview image on any page

Neither the root layout's `openGraph`/`twitter` blocks nor any page-level metadata export sets an `images` field.

```
Every og:/twitter: tag rendered on the homepage — no image line exists:
<meta property="og:title" content="..."/>
<meta property="og:description" content="..."/>
<meta name="twitter:card" content="summary_large_image"/>
(no og:image or twitter:image tag anywhere in the document)
```

**Why it matters:** this is a visual portfolio/agency site — every link shared to LinkedIn, X, Slack or WhatsApp renders as a bare text card. Direct CTR loss on the referral channels a business like this depends on, and `summary_large_image` is a card type that's actively broken without an image.

**Fix direction:** add a default 1200×630 `og:image` for pages without one, and a per-project image on portfolio/case-study/blog pages using each project's own real screenshot.

### 03. Twitter Card shows the homepage's title on every inner page

None of the page-level metadata exports set a `twitter` field — only `openGraph`. So `og:title`/`og:description` correctly update per page, but `twitter:title`/`twitter:description` silently inherit the root layout's static values.

```
Rendered on a blog post:
og:title            = "[the post's actual title]"          ✓
og:description      = "[the post's actual description]"    ✓
twitter:title       = "[site name]"                         ✗ wrong
twitter:description = "[generic site tagline]"               ✗ wrong
```

**Fix direction:** mirror every existing `openGraph: { title, description }` block with a matching `twitter: { title, description }` block.

### 04. Case studies are built but excluded from the sitemap

`sitemap.ts` enumerates services, portfolio, team and blog routes, but never imports the case-studies content. The case-studies hub and its entries are fully static-generated pages that simply never appear in `sitemap.xml`.

```
staticRoutes = ["", "/services", "/portfolio", "/team", "/blog", "/about", "/contact"]
// no "/case-studies" — and no case-study entries mapped into dynamicRoutes
```

**Why it matters:** case studies are the deepest, most citable content on the site — exactly what both classic SEO (E-E-A-T) and AI answer engines reward most. They're currently invisible to the one file whose entire job is telling crawlers what exists.

**Fix direction:** import the case-studies data in `sitemap.ts`, add the hub route to `staticRoutes`, and map each case study's slug into `dynamicRoutes` — the same pattern already used for the other four content types.

### 05. Six portfolio pages share a verbatim 20-word sentence

The exact phrase below appears, unchanged, in the visible body copy of 6 of the 10 GoHighLevel-funnel portfolio entries.

```
"...structured around a clear conversion journey: establish the value
proposition, educate the visitor, reinforce credibility, remove common
objections, and present a strong next action."
```

**Why it matters:** these six pages compete for adjacent, near-identical keyword territory ("[industry] funnel"). A repeated sentence at this length and density is a textbook near-duplicate-content pattern — it gives search engines a concrete reason to fold several of these pages together in results, and undercuts what's supposed to differentiate one industry funnel from the next.

**Fix direction:** rewrite the shared sentence into something specific to each project's actual conversion mechanic.

---

## §3 — Medium

### 06. Organization schema is missing logo, address, phone and sameAs

The only structured data on the entire site is a single `Organization` JSON-LD block on the homepage — name, description, url. Nothing else. The business's location, phone and email already exist in the site's brand config and are used all over the visible page, but never make it into the schema.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "...",
  "description": "...",
  "url": "..."
  // no logo, image, telephone, address, or sameAs
}
```

**Why it matters:** a thin entity record limits Knowledge Panel eligibility and is exactly the kind of gap both E-E-A-T scoring and AI answer engines look at when deciding whether a business is a verifiable, trustworthy entity worth citing.

**Fix direction:** extend the JSON-LD block with `logo`, `image`, `telephone`, a `PostalAddress`, and a `sameAs` array — once the footer's social links point at real profiles (see #07).

### 07. Footer social links point to generic platform homepages

The site's social-links config resolves LinkedIn, Facebook and Instagram to the platforms' own front doors, not the business's actual profiles.

**Why it matters:** beyond the broken visitor experience — clicking "LinkedIn" in the footer lands on a generic homepage — these are the URLs that should be populating `sameAs` in the Organization schema above.

**Fix direction:** swap in the business's actual profile URLs; feed the same URLs into the `sameAs` array from #06.

### 08. No FAQPage, Article or Service schema anywhere

Blog posts already contain a literal "Common questions" Q&A section as structured content blocks. Neither post — nor any service or portfolio page — emits `FAQPage`, `BlogPosting`/`Article`, `BreadcrumbList`, or `Service` JSON-LD.

**Why it matters:** this is close to free. The Q&A content already exists as typed data; it just isn't being serialized into schema. Rich-result eligibility aside, schema is one of the clearest signals an LLM's retrieval pipeline uses to trust and quote a page.

**Fix direction:** derive `FAQPage` schema from consecutive heading/paragraph pairs under each post's "Common questions" section; add `BlogPosting` schema to the blog template; add `Service` schema to the services template.

### 09. The portfolio hub renders dynamically instead of statically

`/portfolio` reads a search-query parameter directly inside the page component, which forces server-rendering on every request instead of prerendering it as static HTML the way every other top-level route is.

```
next build route table:
○  /services          (Static)
ƒ  /portfolio          (Dynamic — server-rendered per request)
○  /team               (Static)
○  /blog               (Static)
```

**Why it matters:** the HTML is still fully server-rendered and crawlable, so this isn't an indexing blocker — but it's a real TTFB/Core Web Vitals cost on the page most likely to catch a first-time organic visit.

**Fix direction:** move the search-query read into a client component that hydrates after a statically-rendered shell, rather than reading it in the server component itself.

---

## §4 — Low / polish

| Item | Detail |
|---|---|
| Two images with empty `alt=""` and no adjacent text | Worth a second look, but on closer inspection these sit directly beside their own visible label text — empty alt is likely correct there, not a gap. Confirm before changing. |
| No `manifest.json`/`site.webmanifest` | Only one favicon size. Not a ranking factor, standard completeness item. |
| Local SEO (Map Pack/GBP tactics) mostly not applicable | The business's listed location has no street-level address, which reads as a nationally/internationally-serving business rather than a walk-in local one. The relevant subset is NAP consistency + schema completeness (§06–07), not Map Pack optimization. |

---

## What's already working — leave it alone

- Self-hosted fonts via `next/font` — zero external font requests, no render-blocking loads.
- `next/image` used across the codebase with responsive `sizes` attributes.
- Clean heading hierarchy — one H1 per page via shared header components, consistent H2s for in-body sections.
- Typed content layer — every fix above is a small, mechanical change, not a rewrite.
- `robots.txt` and `sitemap.xml` both exist and are correctly wired, aside from the case-studies gap (§04).
- No accidental `noindex` anywhere; no orphaned or broken internal links found.
- Legacy URLs from prior route renames still 301-redirect correctly — link equity preserved.

---

## Suggested fix order

1. **§01 Canonical bug** — highest leverage single fix, blocks the value of everything else.
2. **§04 Case studies in sitemap** — trivial, zero risk, pure upside.
3. **§03 Stale Twitter Cards** — same shape of fix as #1, do together.
4. **§02 Social preview image** — highest visible payoff once shipped.
5. **§05 Duplicate portfolio sentence** — content work, can run in parallel with anything above.
6. **§06–07 Schema completeness + real social links** — do together, one feeds the other.
7. **§08 FAQ/Article/Service schema** — data already exists, needs the serialization layer built once.
8. **§09 Dynamic portfolio hub** — real, but the smallest performance delta of the set.

---

## Monitoring, once live

- Indexed page count vs. total routes (expect this to *increase* after §01 ships, not decrease, despite it looking like a "loss" of the homepage-only index state).
- Canonical/indexation errors in Search Console's Page Indexing report.
- Social referral CTR before/after the OG image fix.
- Organic sessions to case-study pages specifically, once they're in the sitemap.
