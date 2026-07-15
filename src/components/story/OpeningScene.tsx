import { type ArtPalette } from "@/content/types";
import { brand } from "@/config/theme";
import { HeroCanvas } from "@/components/webgl/HeroCanvas";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { ScrollCue } from "./ScrollCue";

/** Warm dawn-in-the-dark field for the opening WebGL scene. */
const heroPalette: ArtPalette = {
  from: "#D69A4E",
  via: "#7A3F1E",
  to: "#120C08",
  ink: 0.32,
};

/**
 * Cinematic opening chapter: full-viewport procedural WebGL field (with a static
 * gradient fallback), museum-style metadata, an animated masked title and
 * subtitle, and an ambient scroll cue. Establishes the editorial theme at once.
 */
export function OpeningScene() {
  return (
    <section className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden text-paper">
      <HeroCanvas palette={heroPalette} className="absolute inset-0" />

      <div className="container-editorial relative z-10 flex flex-1 flex-col justify-between pb-9 pt-[calc(var(--header-h)+1.5rem)]">
        <Reveal
          variant="fade"
          delay={200}
          className="flex flex-wrap items-center gap-x-6 gap-y-1 text-paper/70"
        >
          <span className="label text-paper/70">{brand.full}</span>
          <span aria-hidden className="hidden h-px w-8 bg-paper/30 sm:block" />
          <span className="label text-paper/70">Est. {brand.founded}</span>
          <span aria-hidden className="hidden h-px w-8 bg-paper/30 sm:block" />
          <span className="label text-paper/70">{brand.location}</span>
        </Reveal>

        <div className="max-w-5xl">
          <Reveal variant="fade" delay={120}>
            <span className="label text-accent">An archive in six chapters</span>
          </Reveal>
          <SplitReveal
            as="h1"
            type="lines"
            immediate
            delay={0.25}
            className="mt-5 font-display text-display-xl text-paper"
          >
            An archive of light.
          </SplitReveal>
          <Reveal
            variant="up"
            delay={650}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-paper/80 md:text-xl"
          >
            Three invented centuries of a painted coast — told in tide and tempera,
            lantern and indigo. Scroll to follow the light from dawn to the long dark
            and back again.
          </Reveal>
        </div>

        <div className="flex items-end justify-between">
          <ScrollCue tone="paper" />
          <span className="hidden max-w-[22ch] text-right text-xs leading-relaxed text-paper/50 md:block">
            A demonstration archive. Every work, name and date is a placeholder.
          </span>
        </div>
      </div>
    </section>
  );
}
