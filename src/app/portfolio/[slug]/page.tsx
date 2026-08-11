import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  artworks,
  getArtworkBySlug,
  getArtistById,
  getCollectionById,
  getRelatedArtworks,
  getNextArtwork,
  getCaseStudyBySlug,
} from "@/content/index";
import { ParallaxArtwork } from "@/components/story/ParallaxArtwork";
import { RelatedArtworks } from "@/components/gallery/RelatedArtworks";
import { ArtworkActions } from "@/components/artwork/ArtworkActions";
import { NextLink } from "@/components/ui/NextLink";
import { MetaList } from "@/components/ui/MetaList";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { Kicker } from "@/components/typography/primitives";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artwork = getArtworkBySlug(params.slug);
  if (!artwork) return { title: "Project not found" };
  const artist = getArtistById(artwork.artistId);
  return {
    title: `${artwork.title} — ${artist?.name ?? "Unknown"}`,
    description: artwork.description,
    openGraph: { title: artwork.title, description: artwork.description },
  };
}

export default function ArtworkDetailPage({ params }: { params: { slug: string } }) {
  const artwork = getArtworkBySlug(params.slug);
  if (!artwork) notFound();

  const artist = getArtistById(artwork.artistId);
  const collection = getCollectionById(artwork.collectionId);
  const related = getRelatedArtworks(artwork);
  const next = getNextArtwork(artwork.id);
  const viewerIds = [artwork.id, ...related.map((r) => r.id)];
  const gallery = (artwork.images ?? []).filter((src) => src !== artwork.image);
  const caseStudy = getCaseStudyBySlug(artwork.slug);

  return (
    <article>
      <header className="container-editorial pb-10 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4.5rem)]">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2">
          <Link href="/portfolio" className="hover:text-ink">Portfolio</Link>
          <span aria-hidden>/</span>
          {collection ? (
            <Link href={`/services/${collection.slug}`} className="hover:text-ink">{collection.title}</Link>
          ) : null}
        </nav>
        <div className="mt-6 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-9">
            <Kicker accent>{artwork.year} · {artwork.medium}</Kicker>
            <SplitReveal as="h1" type="lines" className="mt-5 font-display text-display-md text-balance">
              <span className="italic">{artwork.title}</span>
            </SplitReveal>
            {artist ? (
              <Reveal delay={120} className="mt-4 text-lg text-ink-soft">
                <Link href={`/team/${artist.slug}`} className="link-underline">{artist.name}</Link> · {artist.role}
              </Reveal>
            ) : null}
          </div>
        </div>
      </header>

      <div className="container-editorial">
        <Reveal variant="mask">
          <ParallaxArtwork
            artwork={artwork}
            aspect={
              artwork.imageAspect ??
              (artwork.orientation === "portrait" ? "4 / 5" : artwork.orientation === "square" ? "1 / 1" : "3 / 2")
            }
            fit={artwork.imageFit}
            sizes="(max-width: 1680px) 100vw, 1680px"
            priority
            amount={6}
            motif={artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
          />
        </Reveal>
        <ArtworkActions ids={viewerIds} title={artwork.title} className="mt-6" />
      </div>

      <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <Kicker>About this project</Kicker>
          <Reveal as="p" className="mt-6 max-w-2xl font-display text-2xl leading-snug text-ink md:text-[1.7rem]">
            {artwork.description}
          </Reveal>

          <h2 className="mt-14 font-display text-xl text-ink">How we solved it</h2>
          <Reveal as="p" delay={80} className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
            {artwork.historicalContext}
          </Reveal>

          <p className="mt-10 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
            <span className="label">Description for screen readers</span>
            <br />
            {artwork.alt}
          </p>
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <MetaList
            items={[
              {
                label: "Delivered by",
                value: artist ? (
                  <Link href={`/team/${artist.slug}`} className="link-underline">{artist.name}</Link>
                ) : (
                  "Unknown"
                ),
              },
              { label: "Year", value: artwork.year },
              { label: "Stack", value: artwork.medium },
              { label: "Scope", value: artwork.dimensions },
              {
                label: "Service",
                value: collection ? (
                  <Link href={`/services/${collection.slug}`} className="link-underline">{collection.title}</Link>
                ) : (
                  "—"
                ),
              },
              { label: "Industry", value: artwork.location },
              { label: "Engagement", value: artwork.period },
            ]}
          />
          {artwork.liveUrl || artwork.appUrl || caseStudy ? (
            <div className="mt-8 flex flex-col gap-3">
              {artwork.liveUrl ? (
                <a
                  href={artwork.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Visit website
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : null}
              {artwork.appUrl ? (
                <a
                  href={artwork.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Get the app
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : null}
              {caseStudy ? (
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group inline-flex items-center justify-between gap-3 border border-accent/40 bg-accent/5 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-accent transition-colors hover:border-accent hover:bg-accent/10"
                >
                  Full Case Study
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </Link>
              ) : null}
            </div>
          ) : null}
        </aside>
      </div>

      {gallery.length ? (
        <section className="container-editorial pb-20 md:pb-28">
          <Kicker>More from this project</Kicker>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={i * 80}>
                <div
                  className="group relative overflow-hidden bg-paper-deep"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Image
                    src={src}
                    alt={`${artwork.title} — additional screen ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <RelatedArtworks artworks={related} title="Related projects" />

      <NextLink
        eyebrow="Next project"
        title={next.title}
        href={`/portfolio/${next.slug}`}
        palette={next.palette}
        meta={`${getArtistById(next.artistId)?.name ?? ""} · ${next.year}`}
      />
    </article>
  );
}
