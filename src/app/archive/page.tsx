import type { Metadata } from "next";
import { Suspense } from "react";
import { getArtworks, getFacets } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchiveGrid } from "@/components/gallery/ArchiveGrid";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Every catalogued work in the Auren Archive — filter by artist, period, location and medium, search the catalogue, and open works full screen.",
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
        kicker="The archive · Every work"
        title="The complete catalogue."
        deck="Twenty-four works across five collections and three centuries. Filter, search, switch between grid and list, and open any work full screen to zoom and pan."
      />
      <Suspense>
        <ArchiveGrid artworks={artworks} facets={facets} initialQuery={initialQuery} />
      </Suspense>
    </>
  );
}
