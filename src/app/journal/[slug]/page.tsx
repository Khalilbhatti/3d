import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  stories,
  getStoryBySlug,
  getArtworksByIds,
  getStoriesByIds,
} from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { StoryRenderer } from "@/components/journal/StoryRenderer";
import { StoryCard } from "@/components/journal/StoryCard";
import { RelatedArtworks } from "@/components/gallery/RelatedArtworks";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { Kicker, SectionDivider } from "@/components/typography/primitives";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const story = getStoryBySlug(params.slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.dek,
    openGraph: { title: story.title, description: story.dek, type: "article", authors: [story.author] },
  };
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  const relatedArtworks = getArtworksByIds(story.relatedArtworkIds);
  const relatedStories = getStoriesByIds(story.relatedStoryIds);

  return (
    <article>
      <header className="container-editorial pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker accent className="justify-center">{story.category}</Kicker>
          <SplitReveal as="h1" type="lines" className="mx-auto mt-6 max-w-[20ch] font-display text-display-md text-balance">
            {story.title}
          </SplitReveal>
          <Reveal delay={120} className="mx-auto mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-ink-soft">
            {story.dek}
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span className="label">{story.author}</span>
            <span aria-hidden className="text-muted">·</span>
            <span className="label">{story.displayDate}</span>
            <span aria-hidden className="text-muted">·</span>
            <span className="label">{story.readingTime}</span>
          </Reveal>
        </div>
      </header>

      <div className="container-editorial">
        <Reveal variant="mask">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            <PlaceholderArt seed={story.seed} palette={story.palette} />
          </div>
        </Reveal>
      </div>

      <div className="container-editorial py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <StoryRenderer blocks={story.blocks} />
        </div>
      </div>

      <RelatedArtworks artworks={relatedArtworks} title="Projects referenced" />

      {relatedStories.length ? (
        <section className="container-editorial py-20 md:py-24">
          <SectionDivider label="Keep reading" className="mb-12" />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {relatedStories.map((s, i) => (
              <StoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="container-editorial pb-24">
        <Link href="/journal" className="link-underline text-ink">← All insights</Link>
      </div>
    </article>
  );
}
