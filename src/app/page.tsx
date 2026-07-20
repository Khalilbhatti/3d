import { HomeStory } from "@/components/story/HomeStory";
import { brand } from "@/config/theme";

/**
 * Home — the immersive, scroll-driven story. The entire narrative system lives
 * in <HomeStory> (floating gallery → chapters → explore CTA). A small JSON-LD
 * block describes the archive for search engines.
 */
export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.full,
    description: brand.description,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeStory />
    </>
  );
}
