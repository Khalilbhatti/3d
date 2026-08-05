import type { Metadata } from "next";
import { Suspense } from "react";
import { getArtworks, getFacets } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchiveGrid } from "@/components/gallery/ArchiveGrid";
import { ProjectOrbitIntro } from "@/components/gallery/ProjectOrbitIntro";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Our portfolio of end-to-end builds — websites, apps, e-commerce, branding and CRM automation delivered by GitzTech.",
};

export default function ArchivePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const artworks = getArtworks();
  const facets = getFacets();
  const initialQuery = typeof searchParams.q === "string" ? searchParams.q : "";

  return (
    <>
      <PageHeader
        kicker="Our work · Portfolio"
        title="Work that speaks for itself."
        deck="End-to-end builds — from complete UI design systems to custom full-stack development and cloud deployment. Filter by service or industry, and open any project to read the case study."
      />
      <ProjectOrbitIntro artworks={artworks} />
      <Suspense>
        <ArchiveGrid artworks={artworks} facets={facets} initialQuery={initialQuery} />
      </Suspense>
    </>
  );
}
