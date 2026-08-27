import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brand } from "@/config/theme";
import {
  stories,
  getStoryBySlug,
  getArtworkById,
  getArtworksByIds,
  getStoriesByIds,
} from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { StoryRenderer } from "@/components/journal/StoryRenderer";
import { StoryCard } from "@/components/journal/StoryCard";
import { RelatedArtworks } from "@/components/gallery/RelatedArtworks";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { Kicker, SectionDivider } from "@/components/typography/primitives";
import type { Story, StoryBlock } from "@/content/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com";

/** Pulls question/answer pairs out of the "Common questions" section of a
 *  story's blocks (a heading marker followed by heading/paragraph pairs),
 *  for FAQPage schema — no separate FAQ data model needed. */
function extractFaqPairs(blocks: StoryBlock[]) {
  const start = blocks.findIndex((b) => b.type === "heading" && b.text === "Common questions");
  if (start === -1) return [];
  const pairs: { question: string; answer: string }[] = [];
  for (let i = start + 1; i < blocks.length - 1; i++) {
    const q = blocks[i];
    const a = blocks[i + 1];
    if (q.type === "heading" && a.type === "paragraph") {
      pairs.push({ question: q.text, answer: a.text });
      i++;
    }
  }
  return pairs;
}

function storyJsonLd(story: Story, image: string) {
  const url = `${siteUrl}/blog/${story.slug}`;
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: story.title,
    description: story.dek,
    image,
    datePublished: story.date,
    dateModified: story.date,
    author: { "@type": "Organization", name: story.author, "@id": `${siteUrl}/#organization` },
    publisher: { "@type": "Organization", name: brand.full, "@id": `${siteUrl}/#organization`, logo: { "@type": "ImageObject", url: `${siteUrl}${brand.ogImage}` } },
    mainEntityOfPage: url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: story.title, item: url },
    ],
  };

  const faqPairs = extractFaqPairs(story.blocks);
  const faq = faqPairs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqPairs.map((p) => ({
          "@type": "Question",
          name: p.question,
          acceptedAnswer: { "@type": "Answer", text: p.answer },
        })),
      }
    : null;

  return [blogPosting, breadcrumb, faq].filter(Boolean);
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const story = getStoryBySlug(params.slug);
  if (!story) return { title: "Story not found" };
  const coverArtwork = story.relatedArtworkIds[0] ? getArtworkById(story.relatedArtworkIds[0]) : undefined;
  const image = coverArtwork?.image ?? brand.ogImage;
  return {
    title: story.title,
    description: story.dek,
    alternates: { canonical: `/blog/${story.slug}` },
    openGraph: { title: story.title, description: story.dek, type: "article", authors: [story.author], images: [image] },
    twitter: { title: story.title, description: story.dek, images: [image] },
  };
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  const relatedArtworks = getArtworksByIds(story.relatedArtworkIds);
  const relatedStories = getStoriesByIds(story.relatedStoryIds);
  const coverImage = relatedArtworks[0]?.image ?? `${siteUrl}${brand.ogImage}`;
  const jsonLdBlocks = storyJsonLd(story, coverImage);

  return (
    <article>
      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
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
          {relatedArtworks[0] ? (
            <ArtworkImage artwork={relatedArtworks[0]} aspect="16 / 9" sizes="100vw" priority />
          ) : (
            <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
              <PlaceholderArt seed={story.seed} palette={story.palette} />
            </div>
          )}
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
        <Link href="/blog" className="link-underline text-ink">← All blog posts</Link>
      </div>
    </article>
  );
}
