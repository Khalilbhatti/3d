import { HomeStory } from "@/components/story/HomeStory";
import { brand } from "@/config/theme";

/**
 * Home — the immersive, scroll-driven story. The entire narrative system lives
 * in <HomeStory> (floating gallery → chapters → explore CTA). A small JSON-LD
 * block describes the organisation for search engines.
 */
export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brand.full,
    description: brand.description,
    url: siteUrl,
    logo: `${siteUrl}${brand.ogImage}`,
    image: `${siteUrl}${brand.ogImage}`,
    telephone: brand.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.location,
      addressCountry: "PK",
    },
    // sameAs intentionally omitted — theme.ts's socialLinks are still placeholder
    // platform homepages, not GitzTech's real profiles. Add real URLs there first.
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeStory />
    </>
  );
}
