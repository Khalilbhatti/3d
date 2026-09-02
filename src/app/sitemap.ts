import type { MetadataRoute } from "next";
import { collections, artworks, artists, stories, caseStudies } from "@/content/index";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com";

/** Route-complete sitemap generated from the content layer. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/industries", "/portfolio", "/team", "/blog", "/case-studies", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  type DynamicRoute = { path: string; priority: number; lastModified?: Date };

  const dynamicRoutes: DynamicRoute[] = [
    ...collections.map((c) => ({ path: `/services/${c.slug}`, priority: 0.6 })),
    ...artworks.map((a) => ({ path: `/portfolio/${a.slug}`, priority: a.featured ? 0.7 : 0.6 })),
    ...artists.map((a) => ({ path: `/team/${a.slug}`, priority: 0.6 })),
    ...stories.map((s) => ({ path: `/blog/${s.slug}`, priority: 0.65, lastModified: new Date(s.date) })),
    ...caseStudies.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.6 })),
  ];

  const dynamicSitemapRoutes = dynamicRoutes.map(({ path, priority, lastModified }) => ({
    url: `${base}${path}`,
    changeFrequency: "yearly" as const,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }));

  return [...staticRoutes, ...dynamicSitemapRoutes];
}
