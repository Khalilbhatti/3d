import type { Metadata } from "next";
import { getArtists } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { SectionDivider } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the GitzTech team — full-stack developers, UI/UX designers, digital marketers, WordPress developers, CRM specialists and project managers.",
};

export default function ArtistsPage() {
  const artists = getArtists();
  return (
    <>
      <PageHeader
        kicker="Our team"
        title="The people behind your project."
        deck="Developers, designers, marketers, CRM specialists and project managers who share one mindset — turning ambitious ideas into reliable, results-driven digital products."
      />
      <div className="container-editorial pb-28">
        <SectionDivider label="Leadership & specialist teams" className="mb-12" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
