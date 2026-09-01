import type { Metadata } from "next";
import { HomeStory } from "@/components/story/HomeStory";
import { brand } from "@/config/theme";

const title = "GitzTech — AI Automation & Custom Software Development";
const description =
  "GitzTech builds AI automation, CRM and WhatsApp AI systems, RAG knowledge bases and custom web & app development — engineered with n8n and AI agents for real business results.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, images: [brand.ogImage] },
  twitter: { title, description, images: [brand.ogImage] },
};

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
