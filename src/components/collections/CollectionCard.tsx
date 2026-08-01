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
      <div
        className={cn(
          "group relative md:col-span-7",
          flip ? "md:order-2 md:col-start-6" : "md:order-1"
        )}
      >
        <Link
          href={`/services/${collection.slug}`}
          className="absolute inset-0 z-[1] focus-visible:outline-none"
          aria-label={`${collection.title} — open collection`}
        />
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
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
          </div>

          {/* Hover quick actions, matching the portfolio card pattern. */}
          <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end bg-gradient-to-t from-paper/80 via-paper/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex flex-wrap gap-2 p-3.5">
              <Link
                href={`/services/${collection.slug}`}
                className="pointer-events-auto relative z-[4] inline-flex items-center gap-1.5 bg-ink px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:bg-accent"
              >
                View service
              </Link>
              <Link
                href="/contact"
                className="pointer-events-auto relative z-[4] inline-flex items-center gap-1.5 border border-paper/50 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:border-accent hover:text-accent"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

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
