import type { MetadataRoute } from "next";
import { collections, artworks, artists, stories, blogPosts } from "@/content/index";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com";

/** Route-complete sitemap generated from the content layer. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/portfolio", "/team", "/insights", "/blog", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const dynamicRoutes = [
    ...collections.map((c) => `/services/${c.slug}`),
    ...artworks.map((a) => `/portfolio/${a.slug}`),
    ...artists.map((a) => `/team/${a.slug}`),
    ...stories.map((s) => `/insights/${s.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
