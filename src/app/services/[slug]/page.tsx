import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  collections,
  getCollectionBySlug,
  getArtworksByIds,
  getArtistById,
  getStoriesByIds,
  getTimelineByIds,
  getNextCollection,
} from "@/content/index";
import { ParallaxArtwork } from "@/components/story/ParallaxArtwork";
import { EditorialGallery } from "@/components/gallery/EditorialGallery";
import { HorizontalGallery } from "@/components/gallery/HorizontalGallery";
import { Timeline } from "@/components/ui/Timeline";
import { StoryCard } from "@/components/journal/StoryCard";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { NextLink } from "@/components/ui/NextLink";
import { MetaList } from "@/components/ui/MetaList";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { Kicker, SectionDivider } from "@/components/typography/primitives";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: "Service not found" };
  return {
    title: collection.title,
    description: collection.summary,
    openGraph: { title: collection.title, description: collection.summary },
  };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const works = getArtworksByIds(collection.artworkIds);
  const hero = works[0];
  const stories = getStoriesByIds(collection.relatedStoryIds);
  const timeline = getTimelineByIds(collection.timelineIds);
  const artists = collection.featuredArtistIds.map((id) => getArtistById(id)).filter(Boolean);
  const next = getNextCollection(collection.id);

  return (
    <article>
      <header className="container-editorial grid items-end gap-10 pb-12 pt-[calc(var(--header-h)+3.5rem)] md:grid-cols-12 md:pt-[calc(var(--header-h)+5rem)]">
        <div className="md:col-span-7">
          <Kicker accent>{collection.period} · Service</Kicker>
          <SplitReveal as="h1" type="lines" className="mt-6 max-w-[15ch] font-display text-display-lg text-balance">
            {collection.title}
          </SplitReveal>
          <Reveal delay={120} className="mt-4 font-display text-xl italic text-muted">{collection.subtitle}</Reveal>
          <Reveal delay={180} className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            {collection.intro}
          </Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <MetaList
            items={[
              { label: "Led by", value: collection.curator },
              { label: "Discipline", value: collection.period },
              { label: "Case studies", value: `${works.length}` },
              { label: "Specialists", value: artists.map((a) => a!.name).join(", ") },
            ]}
          />
        </div>
      </header>

      {hero ? (
        <div className="container-editorial">
          <ParallaxArtwork
            artwork={hero}
            aspect="16 / 9"
            sizes="(max-width: 1680px) 100vw, 1680px"
            priority
            motif={hero.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
          />
          <p className="label mt-3">
            Above — <span className="italic text-ink-soft">{hero.title}</span>, {getArtistById(hero.artistId)?.name}, {hero.year}
          </p>
        </div>
      ) : null}

      <section className="container-editorial py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Kicker>How we deliver it</Kicker>
          </div>
          <div className="md:col-span-8 md:col-start-4">
            {collection.statement.map((p, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                as="p"
                className={
                  i === 0
                    ? "font-display text-2xl leading-snug text-ink md:text-3xl"
                    : "mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft"
                }
              >
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {timeline.length ? (
        <section className="container-editorial pb-24 md:pb-32">
          <SectionDivider label="Our process" className="mb-10" />
          <Timeline entries={timeline} />
        </section>
      ) : null}

      {artists.length ? (
        <section className="container-editorial pb-24 md:pb-32">
          <SectionDivider label="The team behind it" className="mb-12" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {artists.map((a, i) => (
              <ArtistCard key={a!.id} artist={a!} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <SectionDivider label={`Work in this service · ${works.length}`} className="mb-12" />
        </div>
        <HorizontalGallery artworks={works} />
      </section>

      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <SectionDivider label="Selected projects, in detail" className="mb-16" />
        </div>
        <EditorialGallery artworks={works.slice(0, 3)} />
      </section>

      {stories.length ? (
        <section className="container-editorial py-24 md:py-28">
          <SectionDivider label="From the blog" className="mb-12" />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <StoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-editorial py-16">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Kicker>Who you work with</Kicker>
          </div>
          <dl className="md:col-span-8 md:col-start-4">
            {collection.credits.map((c) => (
              <div key={c.role} className="flex items-baseline justify-between gap-6 border-t border-line/15 py-4">
                <dt className="label">{c.role}</dt>
                <dd className="text-right text-ink">{c.name}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Link href="/services" className="link-underline mt-12 inline-block text-ink">← All services</Link>
      </section>

      <NextLink
        eyebrow="Next service"
        title={next.title}
        href={`/services/${next.slug}`}
        palette={next.palette}
        meta={`${next.period} · ${next.artworkIds.length} case studies`}
      />
    </article>
  );
}
