import Image from "next/image";
import Link from "next/link";
import { type Collection } from "@/content/types";
import { getArtworksByIds } from "@/content/index";
import { ParallaxArtwork } from "@/components/story/ParallaxArtwork";
import { MReveal } from "@/components/motion/reveal";
import { Kicker } from "@/components/typography/primitives";
import { cn } from "@/lib/utils";

/**
 * Large editorial collection row for the collections archive. Alternating
 * hero artwork + curatorial summary, catalogue count and period.
 */
export function CollectionCard({
  collection,
  index = 0,
}: {
  collection: Collection;
  index?: number;
}) {
  const hero = getArtworksByIds(collection.artworkIds)[0];
  const flip = index % 2 === 1;
  return (
    <article className="container-editorial grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <Link
        href={`/services/${collection.slug}`}
        className={cn(
          "group block md:col-span-7",
          flip ? "md:order-2 md:col-start-6" : "md:order-1"
        )}
        aria-label={`${collection.title} — open collection`}
      >
        {collection.image ? (
          <div className="relative overflow-hidden bg-paper-deep" style={{ aspectRatio: "3 / 2" }}>
            <Image
              src={collection.image}
              alt={`${collection.title} — GitzTech ${collection.title.toLowerCase()} service`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        ) : hero ? (
          <ParallaxArtwork artwork={hero} aspect="3 / 2" sizes="(max-width: 768px) 100vw, 55vw" />
        ) : null}
      </Link>

      <div
        className={cn(
          "md:col-span-5 md:row-start-1",
          flip ? "md:order-1 md:col-start-1" : "md:order-2"
        )}
      >
        <MReveal variant="scale">
          <Kicker accent>
            {String(index + 1).padStart(2, "0")} · {collection.period}
          </Kicker>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] text-ink md:text-5xl">
            <Link href={`/services/${collection.slug}`} className="link-underline">
              {collection.title}
            </Link>
          </h2>
          <p className="mt-2 font-display text-lg italic text-muted">{collection.subtitle}</p>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink-soft">{collection.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label">{collection.artworkIds.length} works</span>
            <span className="label">Led by {collection.curator}</span>
          </div>
        </MReveal>
      </div>
    </article>
  );
}
