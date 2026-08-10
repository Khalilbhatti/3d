"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type Artwork } from "@/content/types";
import { type Facets, getArtistById, artworkMediumBucket } from "@/content/index";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { ArtworkCaption } from "./ArtworkCaption";
import { ArtworkListRow } from "./ArtworkListRow";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface Filters {
  medium: string | null;
}

const EMPTY: Filters = { medium: null };

/**
 * The grid archive. Filter by stack; free-text search across the catalogue;
 * toggle grid / list views; and open any work in the fullscreen viewer.
 * Filtering re-keys the results so items re-animate in. All controls are
 * keyboard-operable with `aria-pressed` state and a live count.
 */
export function ArchiveGrid({
  artworks,
  facets,
  initialQuery = "",
}: {
  artworks: Artwork[];
  facets: Facets;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [view, setView] = useState<ViewMode>("grid");
  const openViewer = useAppStore((s) => s.openViewer);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [query]);

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

  return (
    <div className="container-editorial pb-24">
      <div className="border-y border-line/15 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full max-w-sm">
            <label htmlFor="archive-search" className="label">Search projects</label>
            <div className="mt-2 flex items-center gap-3 border-b border-line/30 pb-2 focus-within:border-accent">
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Project, industry, stack…"
                className="w-full bg-transparent font-display text-lg text-ink placeholder:text-muted/70 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="label">View</span>
            <div className="flex border border-line/25">
              {(["grid", "list"] as ViewMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setView(m)}
                  aria-pressed={view === m}
                  className={cn(
                    "px-4 py-2 font-mono text-xs uppercase tracking-label transition-colors",
                    view === m ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

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
      </div>

      <div className="flex items-center justify-between py-5">
        <p className="label" aria-live="polite">
          {results.length} {results.length === 1 ? "project" : "projects"}
          {activeCount > 0 ? " · filtered" : ""}
        </p>
        {activeCount > 0 ? (
          <button type="button" onClick={clearAll} className="label transition-colors hover:text-accent">
            Clear all ✕
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="border-t border-line/15 py-24 text-center">
          <p className="font-display text-2xl text-ink">No projects match those filters.</p>
          <button type="button" onClick={clearAll} className="link-underline mt-4 text-ink-soft">
            Clear the filters
          </button>
        </div>
      ) : view === "grid" ? (
        <div
          key={signature}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4"
        >
          {results.map((a, i) => (
            <ArchiveItem key={a.id} artwork={a} index={i} onQuickView={() => openViewer(ids, i)} />
          ))}
        </div>
      ) : (
        <div key={signature} className="border-b border-line/15">
          {results.map((a, i) => (
            <ArtworkListRow key={a.id} artwork={a} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  legend,
  options,
  active,
  onToggle,
}: {
  legend: string;
  options: { label: string; value: string }[];
  active: string | null;
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label mb-2.5">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className="chip"
            data-active={active === o.value}
            aria-pressed={active === o.value}
            onClick={() => onToggle(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ArchiveItem({
  artwork,
  index,
  onQuickView,
}: {
  artwork: Artwork;
  index: number;
  onQuickView: () => void;
}) {
  const reduced = useReducedMotion();
  // Each card starts scattered — a small random offset, drop, and tilt — and
  // springs into its actual grid cell. The grid itself never moves; this is
  // purely a transform+opacity entrance layered on top of the normal CSS
  // Grid layout, so card size/position/functionality are untouched.
  // Seeded from `index` (not Math.random()) so SSR and client hydration
  // compute identical values — Math.random() here caused a React hydration
  // mismatch (server and client render different transform: translate/rotate).
  // Integer-only bit mixing (no Math.sin/floating transcendentals) so the
  // result is bit-identical across server/client V8 builds, not just close.
  const scatter = useMemo(() => {
    const rand = (n: number) => {
      let t = ((index + 1) * 0x6d2b79f5) ^ Math.imul(n, 0x9e3779b9);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return {
      x: (rand(1) - 0.5) * 140,
      y: 36 + rand(2) * 54,
      rotate: (rand(3) - 0.5) * 12,
    };
  }, [index]);

  return (
    <motion.div
      className="group relative"
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: scatter.x, y: scatter.y, rotate: scatter.rotate, scale: 0.88 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: (index % 12) * 0.05 }}
    >
      <div className="relative overflow-hidden">
        <Link
          href={`/portfolio/${artwork.slug}`}
          className="absolute inset-0 z-[1] focus-visible:outline-none"
          aria-label={`${artwork.title} — view detail`}
        />
        <div className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
          <ArtworkImage
            artwork={artwork}
            aspect="3 / 2"
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
            motif={artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
          />
        </div>

        {/* Hover quick actions — sit above the invisible card-link via z-index,
            so clicking a specific action navigates there instead. Scrim stays
            light enough that darker project screenshots don't just vanish. */}
        <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end bg-gradient-to-t from-paper/80 via-paper/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2 p-3.5">
            <Link
              href={`/portfolio/${artwork.slug}`}
              className="pointer-events-auto relative z-[4] inline-flex items-center gap-1.5 bg-ink px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:bg-accent"
            >
              View project
            </Link>
            <Link
              href="/contact"
              className="pointer-events-auto relative z-[4] inline-flex items-center gap-1.5 border border-paper/50 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Get a quote
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={onQuickView}
          aria-label={`Quick view ${artwork.title}`}
          className="absolute left-3 top-3 z-[4] border border-ink/40 bg-paper/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-label text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-paper/70 focus-visible:opacity-100 group-hover:opacity-100"
        >
          Zoom ⤢
        </button>
      </div>
      <Link href={`/portfolio/${artwork.slug}`} className="mt-4 block focus-visible:outline-none">
        <ArtworkCaption artwork={artwork} size="sm" />
      </Link>
    </motion.div>
  );
}
