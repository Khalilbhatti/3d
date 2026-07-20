import type { MetadataRoute } from "next";
import { collections, artworks, artists, stories } from "@/content/index";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com";

/** Route-complete sitemap generated from the content layer. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collections", "/archive", "/artists", "/journal", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const dynamicRoutes = [
    ...collections.map((c) => `/collections/${c.slug}`),
    ...artworks.map((a) => `/archive/${a.slug}`),
    ...artists.map((a) => `/artists/${a.slug}`),
    ...stories.map((s) => `/journal/${s.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
