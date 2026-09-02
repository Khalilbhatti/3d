import { Kicker, ChapterNumber } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

/** Discovery/Design reused verbatim from src/content/chapters.ts; Development
 *  reused verbatim from team-fullstack's real statement, and QA & Security
 *  reused verbatim from the QA/PM statement (both src/content/artists.ts,
 *  the same quote QAStandards.tsx uses). Strategy, UX/UI and Launch are new
 *  synthesis, not verbatim reuse — flagged for a copy review before this
 *  goes live. */
const STEPS = [
  {
    step: "Discovery",
    body: "Understanding what's actually slowing you down, then mapping the real cause before picking a tool — the right technology for the problem, not the loudest one.",
  },
  {
    step: "Strategy",
    body: "Turning the problem into a plan: the right architecture, the right stack, and a scope that maps to a realistic timeline before any design work starts.",
  },
  {
    step: "UX/UI",
    body: "We design from evidence — user flows and real session behaviour — then test wireframes and prototypes before anything gets built.",
  },
  {
    step: "Development",
    body: "A build is only finished when someone other than the person who wrote it can run it, read it and extend it.",
  },
  {
    step: "QA & Security",
    body: "Builds are tested across browsers, devices and screen sizes before release, with accessibility and performance checks treated as requirements, not nice-to-haves.",
  },
  {
    step: "Launch",
    body: "Deployment, integrations and production configuration handled end-to-end, so go-live day isn't the first time the real environment gets tested.",
  },
  {
    step: "Support & Growth",
    body: "We stay on after launch — reporting, monitoring and iteration, not a handoff and goodbye.",
  },
];

export function ProcessSection() {
  return (
    <section id="how-we-work" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>How we work</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[22ch] font-display text-display-md text-balance text-ink">
        We don&rsquo;t start with technology. We start with the problem.
      </SplitReveal>
      <StaggerGroup as="div" className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <StaggerItem as="div" key={s.step}>
            <ChapterNumber value={String(i + 1).padStart(2, "0")} className="text-[clamp(2.5rem,5vw,4rem)] text-ink/[0.1]" />
            <h3 className="-mt-4 font-display text-xl text-ink">{s.step}</h3>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
