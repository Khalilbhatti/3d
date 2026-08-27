import Image from "next/image";
import Link from "next/link";
import { type BlogPost } from "@/content/types";
import { getArtworkById } from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { MReveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/** Blog entry tile — hero image (real project photo when the post has one
 *  associated, otherwise generated art), category, title, deck and byline. */
export function BlogPostCard({
  post,
  index = 0,
  className,
  feature = false,
}: {
  post: BlogPost;
  index?: number;
  className?: string;
  feature?: boolean;
}) {
  const coverArtwork = post.relatedArtworkIds?.[0] ? getArtworkById(post.relatedArtworkIds[0]) : undefined;
  return (
    <MReveal variant="rotate" delay={(index % 3) * 0.09} className={cn("group", className)}>
      <article>
        <Link href={`/blog/${post.slug}`} className="block">
          <TiltCard
            className="relative overflow-hidden"
            style={{ aspectRatio: feature ? "16 / 9" : "3 / 2" }}
            max={feature ? 4 : 6}
          >
            <div className="h-full w-full transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
              {coverArtwork?.image ? (
                <Image
                  src={coverArtwork.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <PlaceholderArt seed={post.seed} palette={post.palette} />
              )}
            </div>
            <span className="absolute left-3 top-3 z-[3] bg-paper/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-label text-ink">
              {post.category}
            </span>
          </TiltCard>
          <div className="mt-5">
            <h3 className={cn("font-display leading-tight text-ink", feature ? "text-3xl md:text-4xl" : "text-2xl")}>
              <span className="link-underline">{post.title}</span>
            </h3>
            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-ink-soft">{post.dek}</p>
            <p className="label mt-4">
              {post.author} · {post.displayDate} · {post.readingTime}
            </p>
          </div>
        </Link>
      </article>
    </MReveal>
  );
}
