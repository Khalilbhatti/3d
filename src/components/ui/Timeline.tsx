import { type TimelineEntry } from "@/content/types";
import { MReveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Vertical chronology. Entries slide in from alternating sides (Framer Motion)
 * as they enter view. Used on collection detail and the About page.
 */
export function Timeline({
  entries,
  className,
}: {
  entries: TimelineEntry[];
  className?: string;
}) {
  if (!entries.length) return null;
  return (
    <ol className={cn("relative", className)}>
      {entries.map((e, i) => (
        <MReveal
          as="li"
          key={e.id}
          variant={i % 2 === 0 ? "left" : "right"}
          duration={0.7}
          className="group relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line/15 py-8 md:grid-cols-[8rem_1fr] md:gap-x-12"
        >
          <span className="font-display text-3xl leading-none text-accent md:text-4xl">{e.year}</span>
          <div>
            <h3 className="font-display text-xl leading-tight text-ink md:text-2xl">{e.title}</h3>
            <p className="mt-3 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{e.body}</p>
            <p className="label mt-4">{e.location}</p>
          </div>
        </MReveal>
      ))}
    </ol>
  );
}
