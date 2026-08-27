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
import { blogPosts } from "./blog";
import { timeline } from "./timeline";
import { chapters } from "./chapters";
import { caseStudies } from "./case-studies";
import type { Artwork, Artist, Collection, Story, BlogPost, TimelineEntry, CaseStudy } from "./types";

export { artworks, collections, artists, stories, blogPosts, timeline, chapters, caseStudies };
export type { Artwork, Artist, Collection, Story, BlogPost, TimelineEntry, CaseStudy };

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

/* ---------------------------------- Blog ----------------------------------- */
export const getBlogPosts = (): BlogPost[] =>
  [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
export const getBlogPostById = (id: string) => blogPosts.find((p) => p.id === id);
export const getBlogPostsByIds = (ids: string[]): BlogPost[] =>
  ids.map((id) => blogPosts.find((p) => p.id === id)).filter(Boolean) as BlogPost[];

/* -------------------------------- Timeline -------------------------------- */
export const getTimeline = (): TimelineEntry[] => timeline;
export const getTimelineByIds = (ids: string[]): TimelineEntry[] =>
  ids.map((id) => timeline.find((t) => t.id === id)).filter(Boolean) as TimelineEntry[];

/* -------------------------------- Chapters -------------------------------- */
export const getChapters = () => chapters;

/* ------------------------------ Case Studies ------------------------------ */
export const getCaseStudies = (): CaseStudy[] => caseStudies;
export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

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
  {
    category: "UI/UX Design & Prototyping",
    tags: ["Website Design", "Mobile App Design", "Wireframes", "Mockups", "Prototyping"],
  },
];

export function getFacets(): Facets {
  return { stackCategories: STACK_CATEGORIES };
}

/** Normaliser used by the archive filter so labels match the Stack facet buckets. */
export const artworkMediumBucket = (a: Artwork) => a.medium.split(/ on |,/i)[0].trim();
