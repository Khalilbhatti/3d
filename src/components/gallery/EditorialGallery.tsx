import Link from "next/link";
import { type Artwork } from "@/content/types";
import { getArtistById } from "@/content/index";
import { ParallaxArtwork } from "@/components/story/ParallaxArtwork";
import { Reveal } from "@/components/typography/Reveal";
import { Kicker } from "@/components/typography/primitives";
import { cn } from "@/lib/utils";

/**
 * Editorial gallery mode: large vertical artworks with alternating descriptions.
 * Each entry pairs a parallax image with its caption, medium line and historical
 * context — the "read the wall label" layout. Sides alternate for asymmetry.
 */
export function EditorialGallery({
  artworks,
  className,
}: {
  artworks: Artwork[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-28 md:space-y-44", className)}>
      {artworks.map((artwork, i) => {
        const artist = getArtistById(artwork.artistId);
        const flip = i % 2 === 1;
        return (
          <figure
            key={artwork.id}
            className="container-editorial grid items-center gap-8 md:grid-cols-12 md:gap-12"
          >
            <div
              className={cn(
                "md:col-span-7",
                flip ? "md:order-2 md:col-start-6" : "md:order-1"
              )}
            >
              <ParallaxArtwork
                artwork={artwork}
                sizes="(max-width: 768px) 100vw, 55vw"
                motif={artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
              />
            </div>

            <figcaption
              className={cn(
                "md:col-span-5 md:row-start-1",
                flip ? "md:order-1 md:col-start-1" : "md:order-2 md:pl-4"
              )}
            >
              <Reveal>
                <Kicker>
                  {String(i + 1).padStart(2, "0")} · {artwork.year}
                </Kicker>
                <h3 className="mt-5 font-display text-3xl leading-tight text-ink md:text-4xl">
                  <span className="italic">{artwork.title}</span>
                </h3>
                <p className="mt-2 text-ink-soft">
                  {artist?.name}
                  {artist ? " · " : ""}
                  {artwork.medium}
                </p>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink-soft">
                  {artwork.description}
                </p>
                <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted">
                  {artwork.historicalContext}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Link
                    href={`/archive/${artwork.slug}`}
                    className="link-underline text-sm font-medium text-ink"
                  >
                    View full record &rarr;
                  </Link>
                  <span className="label">{artwork.location}</span>
                </div>
              </Reveal>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
