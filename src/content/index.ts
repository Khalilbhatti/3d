/**
 * =============================================================================
 *  CONTENT ACCESS LAYER
 * =============================================================================
 *  All components read the archive through these helpers rather than importing
 *  raw arrays, so relationships (artist ↔ artwork ↔ collection) stay consistent.
 */
import { artworks } from "./artworks";
import { collections } from "./collections";
import { artists } from "./artists";
import { stories } from "./stories";
import { timeline } from "./timeline";
import { chapters } from "./chapters";
import type { Artwork, Artist, Collection, Story, TimelineEntry } from "./types";

export { artworks, collections, artists, stories, timeline, chapters };
export type { Artwork, Artist, Collection, Story, TimelineEntry };

/* ------------------------------- Collections ------------------------------ */
export const getCollections = (): Collection[] => collections;
export const getCollectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);
export const getCollectionById = (id: string) =>
  collections.find((c) => c.id === id);

export function getNextCollection(id: string): Collection {
  const i = collections.findIndex((c) => c.id === id);
  return collections[(i + 1) % collections.length];
}

/* --------------------------------- Artists -------------------------------- */
export const getArtists = (): Artist[] => artists;
export const getArtistBySlug = (slug: string) =>
  artists.find((a) => a.slug === slug);
export const getArtistById = (id: string) => artists.find((a) => a.id === id);

/* -------------------------------- Artworks -------------------------------- */
export const getArtworks = (): Artwork[] => artworks;
export const getArtworkBySlug = (slug: string) =>
  artworks.find((a) => a.slug === slug);
export const getArtworkById = (id: string) => artworks.find((a) => a.id === id);

export const getArtworksByIds = (ids: string[]): Artwork[] =>
  ids.map((id) => artworks.find((a) => a.id === id)).filter(Boolean) as Artwork[];

export const getArtworksByCollection = (collectionId: string): Artwork[] =>
  artworks.filter((a) => a.collectionId === collectionId);

export const getArtworksByArtist = (artistId: string): Artwork[] =>
  artworks.filter((a) => a.artistId === artistId);

export const getFeaturedArtworks = (): Artwork[] =>
  artworks.filter((a) => a.featured);

export function getNextArtwork(id: string): Artwork {
  const i = artworks.findIndex((a) => a.id === id);
  return artworks[(i + 1) % artworks.length];
}

export const getRelatedArtworks = (artwork: Artwork): Artwork[] =>
  getArtworksByIds(artwork.relatedArtworkIds);

/* --------------------------------- Stories -------------------------------- */
export const getStories = (): Story[] =>
  [...stories].sort((a, b) => (a.date < b.date ? 1 : -1));
export const getStoryBySlug = (slug: string) =>
  stories.find((s) => s.slug === slug);
export const getStoryById = (id: string) => stories.find((s) => s.id === id);
export const getStoriesByIds = (ids: string[]): Story[] =>
  ids.map((id) => stories.find((s) => s.id === id)).filter(Boolean) as Story[];

/* -------------------------------- Timeline -------------------------------- */
export const getTimeline = (): TimelineEntry[] => timeline;
export const getTimelineByIds = (ids: string[]): TimelineEntry[] =>
  ids.map((id) => timeline.find((t) => t.id === id)).filter(Boolean) as TimelineEntry[];

/* -------------------------------- Chapters -------------------------------- */
export const getChapters = () => chapters;

/* ------------------------------- Denormalise ------------------------------ */
export interface ArtworkView extends Artwork {
  artist: Artist | undefined;
  collection: Collection | undefined;
}

export function toArtworkView(a: Artwork): ArtworkView {
  return {
    ...a,
    artist: getArtistById(a.artistId),
    collection: getCollectionById(a.collectionId),
  };
}

export const getArtworkViews = (list: Artwork[] = artworks): ArtworkView[] =>
  list.map(toArtworkView);

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
