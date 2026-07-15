import { type Artwork } from "@/content/types";
import { getArtistById } from "@/content/index";
import { cn } from "@/lib/utils";

/** Museum wall-label: title, attribution, catalogue line. */
export function ArtworkCaption({
  artwork,
  className,
  size = "md",
}: {
  artwork: Artwork;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const artist = getArtistById(artwork.artistId);
  return (
    <figcaption className={cn("space-y-1.5", className)}>
      <h3
        className={cn(
          "font-display leading-tight text-ink",
          size === "sm" && "text-lg",
          size === "md" && "text-xl md:text-2xl",
          size === "lg" && "text-2xl md:text-3xl"
        )}
      >
        <span className="italic">{artwork.title}</span>
      </h3>
      <p className="text-sm text-ink-soft">
        {artist?.name ?? "Unknown"}, {artwork.year}
      </p>
      <p className="label pt-1">
        {artwork.medium} · {artwork.dimensions}
      </p>
    </figcaption>
  );
}
