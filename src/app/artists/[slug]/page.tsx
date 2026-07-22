import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  artists,
  getArtistBySlug,
  getArtworksByArtist,
  getCollectionById,
} from "@/content/index";
import { ArtistPortrait } from "@/components/artists/ArtistPortrait";
import { HorizontalGallery } from "@/components/gallery/HorizontalGallery";
import { RelatedArtworks } from "@/components/gallery/RelatedArtworks";
import { MetaList } from "@/components/ui/MetaList";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { AnimatedQuote, Kicker, SectionDivider } from "@/components/typography/primitives";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artist = getArtistBySlug(params.slug);
  if (!artist) return { title: "Team not found" };
  return {
    title: artist.name,
    description: artist.summary,
    openGraph: { title: artist.name, description: artist.summary },
  };
}

export default function ArtistDetailPage({ params }: { params: { slug: string } }) {
  const artist = getArtistBySlug(params.slug);
  if (!artist) notFound();

  const works = getArtworksByArtist(artist.id);
  const collections = Array.from(new Set(works.map((w) => w.collectionId)))
    .map((id) => getCollectionById(id))
    .filter(Boolean);

  return (
    <article>
      <header className="container-editorial grid items-end gap-10 pb-16 pt-[calc(var(--header-h)+3.5rem)] md:grid-cols-12 md:pt-[calc(var(--header-h)+5rem)]">
        <div className="md:col-span-7">
          <Kicker accent>{artist.role}</Kicker>
          <SplitReveal as="h1" type="lines" className="mt-6 font-display text-display-lg text-balance">
            {artist.name}
          </SplitReveal>
          <Reveal delay={120} className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
            <span className="label">{artist.lifespan}</span>
            <span className="label">{artist.origin}</span>
          </Reveal>
          <Reveal delay={180} className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            {artist.summary}
          </Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Reveal variant="mask">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
              <ArtistPortrait artist={artist} sizes="(max-width: 768px) 100vw, 33vw" priority />
            </div>
          </Reveal>
          <p className="label mt-3">{artist.origin}</p>
        </div>
      </header>

      <section className="container-editorial py-16 md:py-24">
        <AnimatedQuote cite={artist.name}>{artist.statement}</AnimatedQuote>
      </section>

      <section className="container-editorial grid gap-12 pb-24 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-7">
          <Kicker>How they work</Kicker>
          <div className="mt-6 space-y-6">
            {artist.bio.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 70} className="max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <MetaList
            items={[
              { label: "Availability", value: artist.activePeriod },
              { label: "Based in", value: artist.origin },
              { label: "Core skills", value: artist.mediums.join(", ") },
              { label: "Projects shown", value: `${works.length}` },
              {
                label: "Services",
                value: collections.length
                  ? collections.map((c, i) => (
                      <span key={c!.id}>
                        <Link href={`/collections/${c!.slug}`} className="link-underline">{c!.title}</Link>
                        {i < collections.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "—",
              },
            ]}
          />
        </aside>
      </section>

      {works.length ? (
        <section className="pb-8 md:pb-16">
          <div className="container-editorial">
            <SectionDivider label={`Selected work · ${works.length}`} className="mb-12" />
          </div>
          <HorizontalGallery artworks={works} />
        </section>
      ) : null}

      <RelatedArtworks artworks={works} title="Projects they delivered" />

      <div className="container-editorial pb-24">
        <Link href="/artists" className="link-underline text-ink">← Meet the whole team</Link>
      </div>
    </article>
  );
}
