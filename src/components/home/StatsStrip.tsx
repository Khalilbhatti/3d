import { Counter } from "@/components/motion/Counter";

const STATS = [
  { value: "4 Years", label: "Years Experience" },
  { value: "500+", label: "Completed Projects" },
  { value: "200+", label: "Happy Customers" },
  { value: "6", label: "Core Disciplines" },
];

/** Trust bar directly under the hero — the same real numbers used on
 *  /about, minus the unsubstantiated "5+ Awards" stat (nothing on file
 *  backs a named award), replaced with the real "6 core disciplines". */
export function StatsStrip() {
  return (
    <section id="trust-stats" className="scroll-mt-[var(--header-h)] container-editorial py-16 md:py-20">
      <div className="grid grid-cols-2 gap-px border border-line/15 bg-line/15 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-paper p-8 text-center">
            <div className="font-display text-4xl text-accent md:text-5xl">
              <Counter value={s.value} />
            </div>
            <div className="label mt-3">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
