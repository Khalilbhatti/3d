import { Kicker, SectionDivider } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

/** Six specific reasons to choose GitzTech, distinct from /about's own
 *  culture-facing `values` array — this section exists to differentiate on
 *  a sales page, so it earns its own copy rather than reusing /about's. */
const VALUES = [
  {
    title: "Business-First Thinking",
    body: "We understand the workflow before recommending the technology — the build follows the problem, not the other way around.",
  },
  {
    title: "One Team, End to End",
    body: "Strategy, UX, development, automation and growth — one team owns every layer, so nothing gets lost between agencies.",
  },
  {
    title: "Built Around Your Workflow",
    body: "We don't force your business into an off-the-shelf process — every build starts with how your team actually works.",
  },
  {
    title: "Transparent Development",
    body: "Regular updates and milestone-based delivery, so you always know exactly where your project stands.",
  },
  {
    title: "Scalable Technology",
    body: "Every build is architected to grow with your business, not to be rebuilt the moment it outgrows a template.",
  },
  {
    title: "Long-Term Partnership",
    body: "We stay on after launch — reporting, monitoring and iteration, not a handoff and goodbye.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>Why businesses choose us</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[20ch] font-display text-display-md text-balance text-ink">
        Business-first thinking, not just execution.
      </SplitReveal>
      <SectionDivider className="mt-10 mb-2" />
      <StaggerGroup as="div" className="grid gap-x-12 gap-y-2 md:grid-cols-2">
        {VALUES.map((v) => (
          <StaggerItem as="div" key={v.title} className="border-t border-line/15 py-6">
            <h3 className="font-display text-2xl leading-tight text-ink">{v.title}</h3>
            <p className="mt-3 max-w-md text-pretty leading-relaxed text-ink-soft">{v.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
