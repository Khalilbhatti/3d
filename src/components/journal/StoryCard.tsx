import Image from "next/image";
import Link from "next/link";
import { type Story } from "@/content/types";
import { getArtworkById } from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { MReveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/** Journal entry tile — hero image (real project photo when the story has one
 *  associated, otherwise generated art), category, title, deck and byline. */
export function StoryCard({
  story,
  index = 0,
  className,
  feature = false,
}: {
  story: Story;
  index?: number;
  className?: string;
  feature?: boolean;
}) {
  const coverArtwork = story.relatedArtworkIds?.[0] ? getArtworkById(story.relatedArtworkIds[0]) : undefined;
  return (
    <MReveal variant="rotate" delay={(index % 3) * 0.09} className={cn("group", className)}>
      <article>
        <Link href={`/insights/${story.slug}`} className="block">
          <TiltCard
            className="relative overflow-hidden"
            style={{ aspectRatio: feature ? "16 / 9" : "3 / 2" }}
            max={feature ? 4 : 6}
          >
            <div className="h-full w-full transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
              {coverArtwork?.image ? (
                <Image
                  src={coverArtwork.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <PlaceholderArt seed={story.seed} palette={story.palette} />
              )}
            </div>
            <span className="absolute left-3 top-3 z-[3] bg-paper/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-label text-ink">
              {story.category}
            </span>
          </TiltCard>
          <div className="mt-5">
            <h3 className={cn("font-display leading-tight text-ink", feature ? "text-3xl md:text-4xl" : "text-2xl")}>
              <span className="link-underline">{story.title}</span>
            </h3>
            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-ink-soft">{story.dek}</p>
            <p className="label mt-4">
              {story.author} · {story.displayDate} · {story.readingTime}
            </p>
          </div>
        </Link>
      </article>
    </MReveal>
  );
}
