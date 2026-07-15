"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/** Small tracked, uppercase eyebrow label. */
export function Kicker({
  children,
  className,
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span className={cn("label inline-flex items-center gap-3", accent && "text-accent", className)}>
      <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}

/** Vertical rotated label used along section edges. */
export function VerticalLabel({
  children,
  className,
  side = "left",
}: {
  children: ReactNode;
  className?: string;
  side?: "left" | "right";
}) {
  return (
    <span
      className={cn(
        "label-vertical select-none",
        side === "right" && "[writing-mode:vertical-lr] rotate-180",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Oversized chapter numeral. */
export function ChapterNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "block font-display leading-none text-ink/[0.12] text-[clamp(6rem,18vw,20rem)] tracking-tighter",
        className
      )}
    >
      {value}
    </span>
  );
}

/** Hairline divider that grows from left as it enters the viewport. */
export function SectionDivider({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>({ threshold: 0.5 });
  return (
    <div ref={ref} className={cn("flex items-center gap-6", className)}>
      <span
        className={cn(
          "h-px flex-1 origin-left bg-line/20 transition-transform duration-[1200ms] ease-editorial",
          inView ? "scale-x-100" : "scale-x-0"
        )}
      />
      {label ? <span className="label shrink-0">{label}</span> : null}
      {label ? (
        <span
          className={cn(
            "h-px flex-1 origin-right bg-line/20 transition-transform duration-[1200ms] ease-editorial",
            inView ? "scale-x-100" : "scale-x-0"
          )}
        />
      ) : null}
    </div>
  );
}

/** Editorial pull-quote / attributed blockquote. */
export function AnimatedQuote({
  children,
  cite,
  className,
}: {
  children: ReactNode;
  cite?: string;
  className?: string;
}) {
  const { ref, inView } = useReveal<HTMLQuoteElement>();
  return (
    <blockquote
      ref={ref}
      className={cn(
        "relative max-w-4xl transition-all duration-1000 ease-editorial",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute -left-2 -top-8 font-display text-7xl leading-none text-accent/30 md:-left-8"
      >
        &ldquo;
      </span>
      <p className="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.22] text-ink text-balance">
        {children}
      </p>
      {cite ? <cite className="label mt-6 block not-italic">— {cite}</cite> : null}
    </blockquote>
  );
}
