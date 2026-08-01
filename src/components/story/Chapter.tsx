import { type Chapter as ChapterType } from "@/content/types";
import { getArtworkById, getArtistById } from "@/content/index";
import { ParallaxArtwork } from "./ParallaxArtwork";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { VerticalLabel } from "@/components/typography/primitives";
import { cn } from "@/lib/utils";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * A single scroll-driven story chapter. Combines a large chapter numeral, a
 * vertical section label, a masked heading, a lede, body copy, an attributed
 * quote, animated date/location metadata, and layered parallax artwork. Light
 * and dark palettes swap the type colour so text always stays readable, and the
 * background field shifts chapter-to-chapter for a scrolled colour transition.
 */
export function Chapter({
  chapter,
  index,
  dark,
}: {
  chapter: ChapterType;
  index: number;
  /** Precomputed by the parent so the type theme is stable across SSR. */
  dark: boolean;
}) {
  const works = chapter.artworkIds
    .map((id) => getArtworkById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getArtworkById>>[];
  const [main, secondary] = works;
  const mainArtist = main ? getArtistById(main.artistId) : undefined;

  // Dark theme: type is always warm-light. `dark` chapters simply carry a
  // stronger, more saturated atmospheric wash of their palette.
  const tone = {
    head: "text-ink",
    body: "text-ink-soft",
    faint: "text-muted",
    num: "text-ink/[0.07]",
  };

  // Both variants are translucent dark surfaces so the global fluid shows
  // through — `dark` chapters just push the palette tint harder for drama.
  const bg = dark
    ? {
        backgroundColor: "rgb(var(--paper) / 0.80)",
        backgroundImage: `radial-gradient(95% 75% at 20% 6%, ${chapter.palette.from}59, transparent 55%), radial-gradient(80% 85% at 82% 100%, ${chapter.palette.via ?? chapter.palette.to}4D, transparent 62%)`,
      }
    : {
        backgroundColor: "rgb(var(--paper) / 0.66)",
        backgroundImage: `radial-gradient(70% 55% at 85% 12%, ${chapter.palette.from}40, transparent 60%), radial-gradient(60% 60% at 8% 92%, ${chapter.palette.via ?? chapter.palette.from}22, transparent 60%)`,
      };

  return (
    <section
      id={chapter.id}
      data-chapter={index}
      aria-labelledby={`${chapter.id}-title`}
      className="relative flex min-h-screen scroll-mt-[var(--header-h)] items-center overflow-hidden py-24 md:py-32"
      style={bg}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 lg:block">
        <VerticalLabel side="left" className={tone.faint}>
          {chapter.index} — {chapter.kicker}
        </VerticalLabel>
      </div>

      <div className="container-editorial relative grid w-full items-center gap-y-14 md:grid-cols-12 md:gap-x-12">
        <div className="relative md:order-1 md:col-span-5">
          <span
            aria-hidden
            className={cn(
              "block select-none font-display leading-[0.8] tracking-tighter",
              "text-[clamp(5rem,14vw,12rem)]",
              tone.num
            )}
          >
            {chapter.index}
          </span>

          <Reveal variant="fade" className="-mt-4">
            <span className="label text-accent">{chapter.kicker}</span>
          </Reveal>

          <SplitReveal
            as="h2"
            type="lines"
            className={cn("mt-4 max-w-[18ch] font-display text-display-md text-balance", tone.head)}
          >
            <span id={`${chapter.id}-title`}>{chapter.title}</span>
          </SplitReveal>

          <Reveal
            variant="up"
            delay={120}
            className={cn("mt-6 max-w-md font-display text-xl leading-snug", tone.head)}
          >
            {chapter.lede}
          </Reveal>

          <Reveal
            variant="up"
            delay={200}
            className={cn("mt-5 max-w-md text-pretty leading-relaxed", tone.body)}
          >
            {chapter.body}
          </Reveal>

          {chapter.quote ? (
            <Reveal as="figure" variant="up" delay={120} className="mt-9 max-w-md">
              <blockquote
                className={cn(
                  "font-display text-2xl leading-snug text-balance md:text-[1.7rem]",
                  tone.head
                )}
              >
                &ldquo;{chapter.quote.text}&rdquo;
              </blockquote>
              <figcaption className={cn("label mt-4", tone.faint)}>— {chapter.quote.cite}</figcaption>
            </Reveal>
          ) : null}

          <Reveal
            variant="up"
            delay={80}
            className={cn("mt-10 flex items-end gap-6 border-t border-line/15 pt-5")}
          >
            {chapter.date ? (
              <span className={cn("font-display text-4xl leading-none", tone.head)}>{chapter.date}</span>
            ) : null}
            {chapter.location ? <span className={cn("label pb-1", tone.faint)}>{chapter.location}</span> : null}
          </Reveal>
        </div>

        <div
          className="relative md:order-2 md:col-span-6 md:col-start-7"
        >
          {main ? (
            <figure className="relative">
              <ParallaxArtwork
                artwork={main}
                aspect={main.orientation === "portrait" ? "4 / 5" : "3 / 2"}
                sizes="(max-width: 768px) 100vw, 50vw"
                motif={main.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
              />
              <figcaption className={cn("mt-4 flex items-baseline justify-between gap-4", tone.faint)}>
                <span className="text-sm">
                  <span className={cn("italic", tone.head)}>{main.title}</span>
                  {mainArtist ? `, ${mainArtist.name}` : ""}
                </span>
                <span className="label shrink-0">{main.year}</span>
              </figcaption>

              {secondary ? (
                <div
                  className="mt-6 w-2/3 lg:absolute lg:-bottom-14 lg:mt-0 lg:w-[46%]"
                  style={{ left: "-3.5rem" }}
                >
                  <div className={cn("shadow-2xl", dark ? "shadow-black/40" : "shadow-ink/15")}>
                    <ParallaxArtwork
                      artwork={secondary}
                      amount={6}
                      aspect={secondary.orientation === "portrait" ? "4 / 5" : "1 / 1"}
                      sizes="(max-width: 768px) 66vw, 24vw"
                      motif={secondary.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
                    />
                  </div>
                </div>
              ) : null}
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
