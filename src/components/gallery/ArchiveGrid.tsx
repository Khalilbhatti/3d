"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type Artwork } from "@/content/types";
import {
  type Facets,
  getArtistById,
  artworkLocationBucket,
  artworkMediumBucket,
} from "@/content/index";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { ArtworkCaption } from "./ArtworkCaption";
import { ArtworkListRow } from "./ArtworkListRow";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface Filters {
  artist: string | null;
  period: string | null;
  location: string | null;
  medium: string | null;
}

const EMPTY: Filters = { artist: null, period: null, location: null, medium: null };

/**
 * The grid archive. Filter by artist, period, location and medium; free-text
 * search across the catalogue; toggle grid / list views; and open any work in
 * the fullscreen viewer. Filtering re-keys the results so items re-animate in.
 * All controls are keyboard-operable with `aria-pressed` state and a live count.
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
  return (
    <div className="group relative animate-fade-up" style={{ animationDelay: `${(index % 12) * 45}ms` }}>
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
    </div>
  );
}
