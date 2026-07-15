import { type StoryBlock } from "@/content/types";
import { getArtworkById, getArtworksByIds } from "@/content/index";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { Reveal } from "@/components/typography/Reveal";
import { MReveal } from "@/components/motion/reveal";

/**
 * Renders a story's structured block array. Keeping long-form content as data
 * (rather than freeform markup) means editors change stories without touching
 * layout. Supports paragraphs, headings, pull-quotes, images, galleries,
 * video/audio placeholders and footnotes.
 */
export function StoryRenderer({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="prose-editorial">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={block.lead ? "lead" : undefined}>{block.text}</p>;

    case "heading":
      return (
        <h2 className="mt-16 font-display text-2xl leading-tight text-ink md:text-3xl">
          {block.text}
        </h2>
      );

    case "pullquote":
      return (
        <MReveal as="figure" variant="clip" className="my-14 border-l-2 border-accent pl-6 md:-ml-10 md:pl-10">
          <blockquote className="font-display text-2xl leading-snug text-ink text-balance md:text-3xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.cite ? <figcaption className="label mt-4">— {block.cite}</figcaption> : null}
        </MReveal>
      );

    case "image": {
      const artwork = block.artworkId ? getArtworkById(block.artworkId) : undefined;
      return (
        <Reveal as="figure" variant="mask" className="my-14 md:-mx-10 lg:-mx-20">
          {artwork ? (
            <ArtworkImage
              artwork={artwork}
              aspect={artwork.orientation === "portrait" ? "4 / 5" : "3 / 2"}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          ) : (
            <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
              <PlaceholderArt
                seed={block.seed ?? "story-image"}
                palette={block.palette ?? { from: "#C9B892", via: "#9A8663", to: "#5E4E34" }}
              />
            </div>
          )}
          {block.caption ? <figcaption className="label mt-3">{block.caption}</figcaption> : null}
        </Reveal>
      );
    }

    case "gallery": {
      const works = getArtworksByIds(block.artworkIds);
      if (!works.length) return null;
      return (
        <div className="my-14 grid grid-cols-2 gap-5 md:-mx-10 md:grid-cols-3 lg:-mx-20">
          {works.map((a, i) => (
            <ArtworkCard key={a.id} artwork={a} index={i} sizes="(max-width: 768px) 45vw, 30vw" />
          ))}
        </div>
      );
    }

    case "video":
      return (
        <Reveal as="figure" className="my-14 md:-mx-10 lg:-mx-20">
          <div className="relative flex items-center justify-center overflow-hidden bg-paper" style={{ aspectRatio: "16 / 9" }}>
            <PlaceholderArt
              seed={block.poster ?? "video-poster"}
              palette={{ from: "#2E3A57", via: "#1B2338", to: "#0A0D18", ink: 0.2 }}
            />
            <span className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-ink/60 text-ink backdrop-blur-sm">
              ▶
            </span>
            <span className="absolute bottom-4 left-4 font-mono text-[0.6rem] uppercase tracking-label text-ink/80">
              {block.label ?? "Video"} · placeholder
            </span>
          </div>
          {block.caption ? <figcaption className="label mt-3">{block.caption}</figcaption> : null}
        </Reveal>
      );

    case "audio":
      return (
        <figure className="my-12 flex items-center gap-4 border border-line/20 bg-paper-deep/40 p-5 md:-mx-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line/30 text-ink">▶</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{block.label}</p>
            {block.caption ? <p className="mt-0.5 truncate text-xs text-muted">{block.caption}</p> : null}
            <div aria-hidden className="mt-3 flex h-6 items-end gap-[3px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="w-[3px] bg-line/30" style={{ height: `${20 + ((i * 37) % 80)}%` }} />
              ))}
            </div>
          </div>
          {block.duration ? <span className="label shrink-0">{block.duration}</span> : null}
        </figure>
      );

    case "footnote":
      return (
        <p id={`fn-${block.id}`} className="mt-6 flex gap-3 border-t border-line/15 pt-4 text-sm text-muted">
          <sup className="font-mono text-accent">{block.id}</sup>
          <span>{block.text}</span>
        </p>
      );

    default:
      return null;
  }
}
