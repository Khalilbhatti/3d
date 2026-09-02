import { getFacets } from "@/content/index";
import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

/** Reuses the already-authored STACK_CATEGORIES (src/content/index.ts) —
 *  zero new content. A static wrapped tag grid rather than a marquee: too
 *  long a list for infinite-scroll to stay legible. */
export function TechStackStrip() {
  const { stackCategories } = getFacets();
  return (
    <section id="tech-stack" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>Modern technology, practical engineering</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[20ch] font-display text-display-md text-balance text-ink">
        The stack behind the work.
      </SplitReveal>
      <StaggerGroup as="div" className="mt-14 space-y-8">
        {stackCategories.map((group) => (
          <StaggerItem as="div" key={group.category}>
            <span className="label text-ink-soft">{group.category}</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line/20 px-3 py-1.5 font-mono text-xs uppercase tracking-label text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
