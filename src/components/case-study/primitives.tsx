"use client";

import { MReveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Kicker } from "@/components/typography/primitives";
import { cn } from "@/lib/utils";

/** Eyebrow + heading + one or more paragraphs — the workhorse narrative block. */
export function ProseSection({
  eyebrow,
  heading,
  body,
  className,
}: {
  eyebrow?: string;
  heading?: string;
  body: string[];
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Kicker accent>{eyebrow}</Kicker> : null}
      {heading ? (
        <MReveal
          as="h2"
          variant="up"
          className={cn("font-display text-3xl leading-tight text-ink text-balance md:text-4xl", eyebrow && "mt-5")}
        >
          {heading}
        </MReveal>
      ) : null}
      {body.map((p, i) => (
        <MReveal
          key={p}
          as="p"
          variant="up"
          delay={0.08 + i * 0.06}
          className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft"
        >
          {p}
        </MReveal>
      ))}
    </div>
  );
}

/** Static `.chip`-styled tag list — reuses the filter-chip visual language, non-interactive. */
export function ChipList({ heading, items }: { heading?: string; items: string[] }) {
  return (
    <div>
      {heading ? <Kicker>{heading}</Kicker> : null}
      <Stagger className={cn("flex flex-wrap gap-2", heading && "mt-4")}>
        {items.map((item) => (
          <StaggerItem key={item} as="span" variant="scale" duration={0.4} className="chip">
            {item}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Device/spec cards — grid system and responsive-design breakpoints. */
export function SpecGrid({ items }: { items: { device: string; spec: string[] }[] }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.device} as="div" variant="up" className="border-t border-line/15 pt-5">
          <h3 className="font-display text-lg text-ink">{item.device}</h3>
          <ul className="mt-3 space-y-1.5">
            {item.spec.map((line) => (
              <li key={line} className="text-sm text-ink-soft">
                {line}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Linear numbered step flow with arrows — user flows, form flow, conversion paths. */
export function FlowDiagram({ title, steps }: { title?: string; steps: string[] }) {
  return (
    <div>
      {title ? <p className="label mb-4">{title}</p> : null}
      <Stagger className="flex flex-wrap items-center gap-3">
        {steps.map((step, i) => (
          <StaggerItem key={step} as="div" variant="fade" className="flex items-center gap-3">
            <span className="border border-line/25 px-4 py-2 font-mono text-xs uppercase tracking-label text-ink">
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden className="text-ink-soft">
                →
              </span>
            ) : null}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Numbered/titled cards — business objectives, the homepage section breakdown. */
export function ObjectiveList({ items }: { items: { number: string; title: string; body: string }[] }) {
  return (
    <Stagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.number + item.title} as="div" variant="up" className="border-t border-line/15 pt-5">
          <span className="label text-accent">{item.number}</span>
          <h3 className="mt-2 font-display text-xl text-ink">{item.title}</h3>
          <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Titled cards with a short body — key decisions, challenges/responses, booking options.
 *  `meta` is optional — renders as a labelled third line when a source documents an
 *  outcome/result per item (e.g. a 3-column challenges table). */
export function DecisionList({
  items,
  metaLabel = "Outcome",
}: {
  items: { number?: string; title: string; body: string; meta?: string }[];
  metaLabel?: string;
}) {
  return (
    <Stagger className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.title} as="div" variant="left" className="border-t border-line/15 pt-5">
          {item.number ? <span className="label text-accent">{item.number}</span> : null}
          <h3 className={cn("font-display text-lg text-ink", item.number && "mt-2")}>{item.title}</h3>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.body}</p>
          {item.meta ? (
            <p className="mt-3 text-sm text-ink-soft">
              <span className="label text-accent">{metaLabel} </span>
              {item.meta}
            </p>
          ) : null}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Segment cards with a bullet list of needs — target audience. */
export function AudienceGrid({ items }: { items: { name: string; body: string; needs: string[] }[] }) {
  return (
    <Stagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.name} as="div" variant="up" className="border-t border-line/15 pt-5">
          <h3 className="font-display text-lg text-ink">{item.name}</h3>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.body}</p>
          <p className="label mt-4">Needs</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.needs.map((n) => (
              <li key={n} className="chip">
                {n}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Problem → Solution pairs, alternating slide-in — key user pain points. */
export function PainPointList({ items }: { items: { problem: string; solution: string }[] }) {
  return (
    <ol className="divide-y divide-line/15 border-t border-line/15">
      {items.map((item, i) => (
        <MReveal
          key={item.problem}
          as="li"
          variant={i % 2 === 0 ? "left" : "right"}
          className="grid gap-2 py-6 sm:grid-cols-2 sm:gap-8"
        >
          <p className="font-display text-lg italic text-ink">&ldquo;{item.problem}&rdquo;</p>
          <p className="text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{item.solution}</p>
        </MReveal>
      ))}
    </ol>
  );
}
