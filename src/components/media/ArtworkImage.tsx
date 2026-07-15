import Image from "next/image";
import { type Artwork, type Orientation } from "@/content/types";
import { PlaceholderArt } from "./PlaceholderArt";
import { cn } from "@/lib/utils";

export const ASPECT: Record<Orientation, string> = {
  portrait: "4 / 5",
  landscape: "3 / 2",
  square: "1 / 1",
};

/**
 * Renders an artwork's imagery. If a real `image` URL is present on the record,
 * uses next/image (responsive sizes, lazy load, blur-up). Otherwise renders the
 * self-contained generated placeholder. Either way the frame keeps the correct
 * aspect ratio so layouts never shift. See docs/ASSET_REPLACEMENT.md.
 */
export function ArtworkImage({
  artwork,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  aspect,
  motif = "field",
}: {
  artwork: Artwork;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Override the orientation-derived aspect ratio (e.g. "16 / 9"). */
  aspect?: string;
  motif?: "field" | "portrait" | "manuscript";
}) {
  const ratio = aspect ?? ASPECT[artwork.orientation];

  return (
    <div
      className={cn("relative overflow-hidden bg-paper-deep", className)}
      style={{ aspectRatio: ratio }}
    >
      {artwork.image ? (
        <Image
          src={artwork.image}
          alt={artwork.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={artwork.blurDataURL ? "blur" : "empty"}
          blurDataURL={artwork.blurDataURL}
          className="object-cover"
        />
      ) : (
        <PlaceholderArt seed={artwork.seed} palette={artwork.palette} motif={motif} />
      )}
    </div>
  );
}
