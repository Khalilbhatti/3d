import { type ReactNode } from "react";
import { palette } from "@/config/theme";
import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { MReveal } from "@/components/motion/reveal";
import { HeaderCanvas } from "@/components/webgl/HeaderCanvas";
import { cn } from "@/lib/utils";

/**
 * Shared editorial page header for the interior (non-story) routes. An ambient
 * Three.js dust field drifts behind it, the title animates with SplitText, and
 * the deck blurs into focus (Framer Motion) — so every interior page opens with
 * a distinct, layered motion.
 */
export function PageHeader({
  kicker,
  title,
  deck,
  children,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  deck?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "container-editorial relative pb-10 pt-[calc(var(--header-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+5.5rem)]",
        align === "center" && "text-center",
        className
      )}
    >
      <HeaderCanvas
        color={palette.accent}
        className="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9),transparent_85%)]"
      />

      <div className="relative">
        <Kicker accent className={align === "center" ? "justify-center" : undefined}>
          {kicker}
        </Kicker>
        <SplitReveal
          as="h1"
          type="lines"
          className={cn(
            "mt-6 max-w-[16ch] font-display text-display-lg text-balance",
            align === "center" && "mx-auto"
          )}
        >
          {title}
        </SplitReveal>
        {deck ? (
          <MReveal
            variant="blur"
            delay={0.15}
            className={cn(
              "mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft",
              align === "center" && "mx-auto"
            )}
          >
            {deck}
          </MReveal>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </header>
  );
}
