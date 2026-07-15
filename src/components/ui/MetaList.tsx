import { type ReactNode } from "react";
import { MReveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface MetaItem {
  label: string;
  value: ReactNode;
}

/**
 * Museum catalogue metadata as a semantic definition list. Each row is a
 * hairline-separated label / value pair, and the rows stagger in from below as
 * the list scrolls into view — used on artwork, collection and artist pages.
 */
export function MetaList({
  items,
  className,
  columns = 1,
}: {
  items: MetaItem[];
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-10",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {items.map((item, i) => (
        <MReveal
          as="div"
          key={i}
          variant="up"
          delay={(i % 8) * 0.05}
          duration={0.6}
          className="flex flex-col gap-1 border-t border-line/15 py-3.5"
        >
          <dt className="label">{item.label}</dt>
          <dd className="text-pretty text-[0.95rem] leading-snug text-ink">{item.value}</dd>
        </MReveal>
      ))}
    </dl>
  );
}
