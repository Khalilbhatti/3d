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
  /**
   * "services" renders as the `<ExploreCollection>` orbit instead of the
   * standard `<Chapter>` layout — same numbered slot in the scroll sequence,
   * different content shape (no artwork/quote, has the WebGL service ring).
   * Omitted/"content" is the normal narrative chapter.
   */
  kind?: "content" | "services";
}

/** Minimal shape the 3D gallery + fullscreen viewer share. */
export type MediaItem = Artwork;

/**
 * A long-form case study — richer and more structured than an Artwork
 * catalogue record. One record per deep-dive project write-up. See
 * docs/superpowers/specs/2026-08-11-case-studies-design.md.
 */
export interface CaseStudy {
  id: string;
  slug: string;
  /** References Artwork.id — links back to the matching /portfolio entry. */
  artworkId: string;
  title: string;
  tagline: string;
  eyebrow: string;
  year: string;
  /** Real screenshot paths, reused for both the hero and the full gallery. */
  heroImages: string[];
  /** width/height of `heroImages`. Drives the hero's flat-fallback aspect and WebGL plane
   *  geometry so portrait screenshots (e.g. phone mockups) aren't stretched to a landscape
   *  frame. Defaults to 4/3 (Thornton & Co.'s landscape browser screenshots) when omitted. */
  heroAspect?: number;
  /** Optional — omitted when the write-up is a design exercise with no shipped/live product. */
  liveUrl?: string;

  projectDetails: { label: string; value: string }[];

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
  /**
   * `role`/`age`/`priorities`/`concern` fit a client-facing persona brief
   * (Thornton & Co.'s shape). `motivation`/`painPoint` fit a lighter
   * motivation/pain-point/need snapshot (Parko's shape). Both are optional —
   * a record populates whichever pair its source material actually has.
   */
  personas: {
    name: string;
    role?: string;
    age?: string;
    goal: string;
    priorities?: string;
    concern?: string;
    motivation?: string;
    painPoint?: string;
    needs: string[];
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
    /** `weight` is optional — populated when the source spec lists a weight range per style (e.g. Parko's type hierarchy). */
    scale: { name: string; sizes: string; weight?: string }[];
  };
  /** Assumed research questions + the likely findings applied in the design. Optional — not every write-up documents an explicit research direction. */
  researchDirection?: { questions: string[]; findings: string[] };
  /** Short paragraph on how the product reasons about its competitive landscape. Optional. */
  competitiveThinking?: string;
  /** All fields below marked optional are omitted when the source write-up genuinely
   *  doesn't cover that concept (e.g. a mobile-only case study with no desktop grid
   *  spec) — never populate them with invented specifics. */
  grid?: { device: string; spec: string[] }[];
  spacing?: { base: string; scale: number[] };
  imageDirection?: {
    categories: { name: string; items: string[] }[];
    treatment: string[];
    ratios: { use: string; ratio: string }[];
  };
  iconography: string[];
  buttonSystem: { primary: string; secondary: string; textLink: string; principles: string[] };
  componentSystem: { core: string[]; states: string[] };
  homepageSections?: { title: string; question: string; body: string }[];
  processSteps: { number: string; title: string; body: string }[];
  personalization?: { options: string[]; note: string };
  lookbookCategories?: string[];
  bookingOptions?: { title: string; body: string }[];
  formFlow?: string[];
  responsive?: { device: string; spec: string[] }[];
  interactionDesign: { microInteractions: string[]; principle: string };
  accessibility: string[];
  conversionStrategy: { primary: string; supporting: string[] };
  conversionPaths?: { name: string; steps: string[] }[];
  uxWriting?: { focus: string[]; body: string };
  designTokens?: { group: string; tokens: string[] }[];
  validation?: string[];
  decisions: { number: string; title: string; body: string }[];
  /** `outcome` is optional — populated when the source documents a per-challenge result column (e.g. Parko's 3-column table). */
  challenges: { challenge: string; response: string; outcome?: string }[];
  outcome: string[];
  delivered?: { ux: string[]; ui: string[]; prototyping: string[] };
  skills: string[];
  reflection: { heading: string; body: string[] };
  /** Numbered screen-by-screen breakdown (e.g. Parko's 15.1–15.10). Optional — most write-ups fold this into `homepageSections` instead. */
  screenBreakdown?: { number: string; title: string; body: string; bullets: string[] }[];
  /** Standalone bullet list of learnings, distinct from the closing `reflection` prose. Optional. */
  keyLearnings?: string[];
  /** Forward-looking feature list. Optional. */
  futureImprovements?: string[];
  /** Which real screenshot pairs with which named mockup board. Optional. */
  mockupGuide?: string[];
}
