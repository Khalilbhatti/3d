/**
 * =============================================================================
 *  CONTENT TYPES
 * =============================================================================
 *  Centralised data model for the archive. Keep these types stable — the whole
 *  UI reads from them. When you add a field, add it here first, then to the data
 *  files in src/content/*.ts. See docs/CONTENT_EDITING.md.
 */

export type Orientation = "portrait" | "landscape" | "square";

/**
 * A two/three-stop palette used by the self-contained placeholder renderer to
 * generate a deterministic "artwork" until real imagery is supplied. When you
 * add a real image (`image`/`thumbnail`), the palette is still used for the
 * blur placeholder background. See src/components/media/ArtworkImage.tsx.
 */
export interface ArtPalette {
  from: string;
  via?: string;
  to: string;
  /** 0–1 — how much dark ink wash to layer over the field. */
  ink?: number;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  /** References Artist.id */
  artistId: string;
  year: string;
  medium: string;
  dimensions: string;
  location: string;
  /** References Collection.id */
  collectionId: string;
  /** Broad art-historical period, used by archive filters. */
  period: string;
  description: string;
  historicalContext: string;
  orientation: Orientation;
  /** Placeholder generation seed + palette (swap for real `image` later). */
  seed: string;
  palette: ArtPalette;
  /** Optional real assets. When present, next/image is used. */
  image?: string;
  thumbnail?: string;
  /** Blur-up data URL for next/image (optional). */
  blurDataURL?: string;
  /** Optional external links surfaced on the project detail page. */
  liveUrl?: string;
  appUrl?: string;
  /**
   * Optional hero override for real (non-generated) imagery whose important
   * content sits close to the edges — e.g. a marketing screenshot — where the
   * default orientation-derived aspect ratio + parallax oversize-crop would
   * cut it off. Falls back to standard cover/orientation behaviour when unset.
   */
  imageAspect?: string;
  imageFit?: "cover" | "contain";
  /**
   * Additional real images for the home hero's hover backdrop. When a card is
   * hovered, its image(s) show full-bleed behind the scene; more than one
   * cycles as a slider. Falls back to the card's own texture (generated art,
   * or `image` alone) when unset — every project always has a backdrop.
   */
  images?: string[];
  /** Required, detailed alt-text for screen readers. */
  alt: string;
  /** References other Artwork.id */
  relatedArtworkIds: string[];
  /** Flag a small set as archive highlights. */
  featured?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  curator: string;
  /** One-line summary for cards/lists. */
  summary: string;
  /** Longer introduction shown on the collection detail hero. */
  intro: string;
  /** Formal curatorial statement (may contain multiple paragraphs). */
  statement: string[];
  seed: string;
  palette: ArtPalette;
  image?: string;
  featuredArtistIds: string[];
  /** Ordered artwork ids belonging to the collection. */
  artworkIds: string[];
  relatedStoryIds: string[];
  timelineIds: string[];
  credits: { role: string; name: string }[];
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  role: string;
  /** e.g. "c. 1710 – 1774" */
  lifespan: string;
  origin: string;
  activePeriod: string;
  mediums: string[];
  /** Short intro line. */
  summary: string;
  /** Multi-paragraph biography. */
  bio: string[];
  /** A first-person artist statement / attributed quote. */
  statement: string;
  seed: string;
  palette: ArtPalette;
  portrait?: string;
  relatedArtworkIds: string[];
}

/* ---------------------------- Journal / stories --------------------------- */

export type StoryBlock =
  | { type: "paragraph"; text: string; lead?: boolean }
  | { type: "heading"; text: string }
  | { type: "pullquote"; text: string; cite?: string }
  | { type: "image"; artworkId?: string; seed?: string; palette?: ArtPalette; caption?: string; alt: string }
  | { type: "gallery"; artworkIds: string[] }
  | { type: "video"; poster?: string; caption?: string; label?: string }
  | { type: "audio"; label: string; duration?: string; caption?: string }
  | { type: "footnote"; id: number; text: string };

export interface Story {
  id: string;
  slug: string;
  title: string;
  /** Standfirst / deck. */
  dek: string;
  author: string;
  authorRole: string;
  date: string; // ISO
  displayDate: string;
  readingTime: string;
  category: string;
  seed: string;
  palette: ArtPalette;
  hero?: string;
  blocks: StoryBlock[];
  relatedArtworkIds: string[];
  relatedStoryIds: string[];
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  body: string;
  location: string;
  collectionId?: string;
}

/* ------------------------------ Home chapters ----------------------------- */

export interface Chapter {
  id: string;
  index: string; // "01"
  kicker: string; // vertical label
  title: string;
  lede: string;
  body: string;
  quote?: { text: string; cite: string };
  date?: string;
  location?: string;
  /** Artwork ids used as the chapter's imagery. */
  artworkIds: string[];
  palette: ArtPalette;
}

/** Minimal shape the 3D gallery + fullscreen viewer share. */
export type MediaItem = Artwork;
