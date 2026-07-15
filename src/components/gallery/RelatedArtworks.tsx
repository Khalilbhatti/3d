import { type Artwork } from "@/content/types";
import { ArtworkCard } from "./ArtworkCard";
import { SectionDivider } from "@/components/typography/primitives";
import { cn } from "@/lib/utils";

/** A responsive rail of related / featured artworks. */
export function RelatedArtworks({
  artworks,
  title = "Related works",
  className,
}: {
  artworks: Artwork[];
  title?: string;
  className?: string;
}) {
  if (!artworks.length) return null;
  return (
    <section className={cn("container-editorial py-20 md:py-28", className)}>
      <SectionDivider label={title} />
      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        {artworks.map((a, i) => (
          <ArtworkCard
            key={a.id}
            artwork={a}
            index={i}
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
          />
        ))}
      </div>
    </section>
  );
}
