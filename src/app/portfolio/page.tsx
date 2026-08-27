import type { Metadata } from "next";
import { Suspense } from "react";
import { getArtworks, getFacets, getFeaturedArtworks } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchiveGrid } from "@/components/gallery/ArchiveGrid";
import { FeaturedProjectsSelector } from "@/components/gallery/FeaturedProjectsSelector";

const description =
  "Our portfolio of end-to-end builds — websites, apps, e-commerce, branding and CRM automation delivered by GitzTech.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "Portfolio", description },
  twitter: { title: "Portfolio", description },
};

export default function ArchivePage() {
  const artworks = getArtworks();
  const facets = getFacets();
  const featured = getFeaturedArtworks().slice(0, 6);

  return (
    <>
      <PageHeader
        kicker="Our work · Portfolio"
        title="Work that speaks for itself."
        deck="End-to-end builds — from complete UI design systems to custom full-stack development and cloud deployment. Filter by stack, and open any project to read the case study."
      />
      <Suspense>
        <ArchiveGrid artworks={artworks} facets={facets} />
      </Suspense>
      <FeaturedProjectsSelector artworks={featured} />
    </>
  );
}
