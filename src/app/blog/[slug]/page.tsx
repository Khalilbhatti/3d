import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  blogPosts,
  getBlogPostBySlug,
  getArtworksByIds,
  getBlogPostsByIds,
} from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { StoryRenderer } from "@/components/journal/StoryRenderer";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { RelatedArtworks } from "@/components/gallery/RelatedArtworks";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { Kicker, SectionDivider } from "@/components/typography/primitives";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.dek,
    openGraph: { title: post.title, description: post.dek, type: "article", authors: [post.author] },
  };
}

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedArtworks = getArtworksByIds(post.relatedArtworkIds);
  const relatedPosts = getBlogPostsByIds(post.relatedPostIds);

  return (
    <article>
      <header className="container-editorial pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker accent className="justify-center">{post.category}</Kicker>
          <SplitReveal as="h1" type="lines" className="mx-auto mt-6 max-w-[20ch] font-display text-display-md text-balance">
            {post.title}
          </SplitReveal>
          <Reveal delay={120} className="mx-auto mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-ink-soft">
            {post.dek}
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span className="label">{post.author}</span>
            <span aria-hidden className="text-muted">·</span>
            <span className="label">{post.displayDate}</span>
            <span aria-hidden className="text-muted">·</span>
            <span className="label">{post.readingTime}</span>
          </Reveal>
        </div>
      </header>

      <div className="container-editorial">
        <Reveal variant="mask">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            <PlaceholderArt seed={post.seed} palette={post.palette} />
          </div>
        </Reveal>
      </div>

      <div className="container-editorial py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <StoryRenderer blocks={post.blocks} />
        </div>
      </div>

      <RelatedArtworks artworks={relatedArtworks} title="Projects referenced" />

      {relatedPosts.length ? (
        <section className="container-editorial py-20 md:py-24">
          <SectionDivider label="Keep reading" className="mb-12" />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p, i) => (
              <BlogPostCard key={p.id} post={p} index={i} />
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
