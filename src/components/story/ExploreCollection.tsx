import Link from "next/link";
import { collections } from "@/content/collections";
import { type Chapter as ChapterType } from "@/content/types";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Kicker, VerticalLabel } from "@/components/typography/primitives";
import { ServiceOrbit } from "./ServiceOrbit";
import { cn } from "@/lib/utils";

/**
 * The home story's "Our Services" chapter: a WebGL orbit of every service
 * revolving around a glowing hub, plus a call-to-action into the collections
 * and the searchable archive. Rendered by `<ChapterStack>` in place of the
 * standard `<Chapter>` layout for chapters with `kind: "services"` — same
 * numeral + kicker chrome as every other chapter, so it reads as part of the
 * same numbered sequence instead of an unlabelled gap.
 */
export function ExploreCollection({
  chapter,
  index,
  variant = "flow",
  active = true,
}: {
  chapter: ChapterType;
  /** Position in the home story's flat chapter list — only used for `data-chapter` in flow mode. */
  index: number;
  /** "panel" fills a `<ChapterStack>` pinned card instead of normal document flow. */
  variant?: "flow" | "panel";
  /** Whether this card is the one currently visible in the pinned crossfade — gates the WebGL render loop. */
  active?: boolean;
}) {
  const panel = variant === "panel";

  return (
    <section
      id={chapter.id}
      data-chapter={variant === "flow" ? index : undefined}
      className={cn(
        "relative overflow-hidden bg-paper/80 text-ink",
        panel
          ? "flex h-full w-full items-center overflow-x-hidden overflow-y-auto py-10 md:py-12"
          : "scroll-mt-[var(--header-h)] py-28 md:py-40"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(65% 60% at 12% 0%, rgb(var(--accent) / 0.22), transparent 60%), radial-gradient(55% 55% at 92% 100%, rgb(var(--accent) / 0.14), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 lg:block">
        <VerticalLabel side="left" className="text-muted">
          {chapter.index} — {chapter.kicker}
        </VerticalLabel>
      </div>

      <div className="container-editorial relative w-full">
        {panel ? null : (
          <span
            aria-hidden
            className="block select-none font-display leading-[0.8] tracking-tighter text-[clamp(5rem,14vw,12rem)] text-ink/[0.07]"
          >
            {chapter.index}
          </span>
        )}

        <Kicker className={cn(panel ? "" : "-mt-4", "text-ink/60")}>Let us start the conversation</Kicker>
        <SplitReveal
          as="h2"
          type="lines"
          className={cn(
            "font-display text-ink",
            panel ? "mt-4 max-w-[22ch] text-display-md" : "mt-6 max-w-[14ch] text-display-lg"
          )}
        >
          <span id={`${chapter.id}-title`}>{chapter.title}</span>
        </SplitReveal>

        <ServiceOrbit collections={collections} active={active} compact={panel} />

        <div className={cn("flex flex-wrap items-center gap-x-8 gap-y-4", panel ? "mt-8" : "mt-14")}>
          <MagneticButton>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-ink/30 px-7 py-4 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              Get a quote
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </MagneticButton>
          <Link href="/services" className="link-underline text-ink/80 hover:text-ink">
            Browse all services
          </Link>
          <span className="label ml-auto text-ink/40">100+ projects delivered</span>
        </div>
      </div>
    </section>
  );
}
