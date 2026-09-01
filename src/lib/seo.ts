import type { Metadata } from "next";
import { brand } from "@/config/theme";

/**
 * Builds metadata for a static top-level page (About, Contact, Services list,
 * etc). Next.js does not deep-merge `openGraph`/`twitter` across route
 * segments — a page that declares its own `openGraph` object replaces the
 * layout's entirely, silently dropping the default share image. This always
 * carries `brand.ogImage` through so link previews never go blank.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = brand.ogImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, images: [image] },
    twitter: { title, description, images: [image] },
  };
}
