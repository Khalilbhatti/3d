"use client";

import Image from "next/image";
import { MReveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Three persona cards — age, goal, priorities, concern, needs. */
export function PersonaGrid({
  items,
}: {
  items: {
    name: string;
    role: string;
    age: string;
    goal: string;
    priorities: string;
    concern: string;
    needs: string[];
  }[];
}) {
  return (
    <Stagger className="grid gap-8 md:grid-cols-3">
      {items.map((p) => (
        <StaggerItem key={p.name} as="article" variant="up" className="border border-line/15 p-6">
          <p className="label text-accent">{p.role}</p>
          <h3 className="mt-2 font-display text-2xl italic text-ink">{p.name}</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="label">Age</dt>
              <dd className="mt-1 text-ink-soft">{p.age}</dd>
            </div>
            <div>
              <dt className="label">Goal</dt>
              <dd className="mt-1 text-ink-soft">{p.goal}</dd>
            </div>
            <div>
              <dt className="label">Priorities</dt>
              <dd className="mt-1 text-ink-soft">{p.priorities}</dd>
            </div>
            <div>
              <dt className="label">Concern</dt>
              <dd className="mt-1 text-ink-soft">{p.concern}</dd>
            </div>
          </dl>
          <p className="label mt-5">Needs</p>
          <ul className="mt-2 space-y-1">
            {p.needs.map((n) => (
              <li key={n} className="text-sm text-ink-soft">
                — {n}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Nested tree diagram (CSS only) — the sitemap. */
export function SitemapTree({
  items,
}: {
  items: { label: string; children?: { label: string; children?: { label: string }[] }[] }[];
}) {
  return (
    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((branch) => (
        <MReveal key={branch.label} as="li" variant="up" className="border-t border-line/25 pt-4">
          <p className="font-display text-lg text-ink">{branch.label}</p>
          {branch.children ? (
            <ul className="mt-3 space-y-2 border-l border-line/15 pl-4">
              {branch.children.map((child) => (
                <li key={child.label} className="text-sm text-ink-soft">
                  {child.label}
                  {child.children ? (
                    <ul className="mt-1 space-y-1 pl-3">
                      {child.children.map((leaf) => (
                        <li key={leaf.label} className="text-xs text-muted">
                          · {leaf.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </MReveal>
      ))}
    </ul>
  );
}

/** Tall color swatches — name, real hex, usage. Dynamic background color goes on
 *  a plain inner div, never on the StaggerItem itself (it doesn't forward `style`). */
export function ColorPaletteBoard({ items }: { items: { name: string; hex: string; usage: string }[] }) {
  return (
    <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      {items.map((c) => (
        <StaggerItem key={c.hex} as="div" variant="up" className="flex flex-col">
          <div className="aspect-[3/4] w-full" style={{ backgroundColor: c.hex }} aria-hidden />
          <p className="mt-3 text-sm text-ink">{c.name}</p>
          <p className="font-mono text-xs uppercase text-muted">{c.hex}</p>
          <p className="mt-1 text-xs leading-snug text-ink-soft">{c.usage}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Display + interface typeface specimen and the type scale table. */
export function TypographySpecimen({
  display,
  interfaceFont,
  scale,
}: {
  display: { name: string; uses: string[] };
  interfaceFont: { name: string; uses: string[] };
  scale: { name: string; sizes: string }[];
}) {
  return (
    <div>
      <div className="grid gap-10 sm:grid-cols-2">
        <MReveal as="div" variant="up">
          <p className="font-display text-6xl text-ink">Aa</p>
          <p className="mt-2 font-display text-lg italic text-ink">{display.name}</p>
          <p className="mt-2 text-sm text-ink-soft">{display.uses.join(" · ")}</p>
        </MReveal>
        <MReveal as="div" variant="up" delay={0.1}>
          <p className="font-sans text-6xl text-ink">Aa</p>
          <p className="mt-2 font-sans text-lg text-ink">{interfaceFont.name}</p>
          <p className="mt-2 text-sm text-ink-soft">{interfaceFont.uses.join(" · ")}</p>
        </MReveal>
      </div>
      <dl className="mt-10 divide-y divide-line/15 border-t border-line/15">
        {scale.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-6 py-3">
            <dt className="label">{s.name}</dt>
            <dd className="text-right text-sm text-ink-soft">{s.sizes}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Real-screenshot showcase. Fixed aspect ratio uses a Tailwind class, not an
 *  inline style (StaggerItem doesn't forward `style`). */
export function ScreenGallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2">
      {images.map((src, i) => (
        <StaggerItem
          key={src}
          as="div"
          variant="scale"
          className="relative aspect-[4/3] overflow-hidden bg-paper-deep"
        >
          <Image src={src} alt={`${alt} — screen ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Horizontal numbered stage flow with arrows — the UX strategy stages, the 4-step process. */
export function StageFlow({ stages }: { stages: { name: string; body: string; number?: string }[] }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:flex lg:items-start lg:gap-0">
      {stages.map((s, i) => (
        <StaggerItem key={s.name} as="div" variant="up" className="flex flex-1 items-start gap-4 lg:flex-col">
          <div className="flex flex-1 flex-col lg:border-t lg:border-line/25 lg:pt-5">
            {s.number ? <span className="label text-accent">{s.number}</span> : null}
            <h3 className={cn("font-display text-xl text-ink", s.number && "mt-2")}>{s.name}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </div>
          {i < stages.length - 1 ? (
            <span aria-hidden className="hidden shrink-0 self-center px-2 text-ink-soft lg:block">
              →
            </span>
          ) : null}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
