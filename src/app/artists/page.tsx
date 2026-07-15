import type { Metadata } from "next";
import { getArtists } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { SectionDivider } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "The hands behind the Auren School — luminists, a nocturne painter, a court illuminator, indigo dyers, a chemist and the archive's present-day custodian.",
};

export default function ArtistsPage() {
  const artists = getArtists();
  return (
    <>
      <PageHeader
        kicker="Contributors"
        title="The hands behind the school."
        deck="Seven figures — some founders, some inheritors, one working today — whose techniques and obsessions together compose the Auren tradition."
      />
      <div className="container-editorial pb-28">
        <SectionDivider label={`${artists.length} contributors`} className="mb-12" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
