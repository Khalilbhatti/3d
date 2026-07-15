import type { Metadata } from "next";
import { getCollections, getArtworks } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { HorizontalCollections } from "@/components/collections/HorizontalCollections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Five bodies of work that trace the invented Auren School — from the founding luminists to the present-day archive.",
};

export default function CollectionsPage() {
  const collections = getCollections();
  const workCount = getArtworks().length;

  return (
    <>
      <PageHeader
        kicker="The archive · Collections"
        title="Five bodies of work, one coast."
        deck="A process in five movements — scroll to move sideways through the school, chapter by chapter, from the founding light to the present tide."
      >
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <span className="label">{collections.length} collections</span>
          <span className="label">{workCount} works catalogued</span>
          <span className="label">1719 – present</span>
        </div>
      </PageHeader>

      <HorizontalCollections />
    </>
  );
}
