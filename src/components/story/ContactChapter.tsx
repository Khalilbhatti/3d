import { brand, socialLinks } from "@/config/theme";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Kicker } from "@/components/typography/primitives";
import { ContactForm } from "@/components/contact/ContactForm";
import { MetaList } from "@/components/ui/MetaList";

/**
 * The home story's closing "Contact" chapter — the nav's Contact link
 * scrolls here. Reuses the same working form and details as the dedicated
 * /contact page (which stays live for anyone who lands on it directly).
 */
export function ContactChapter() {
  return (
    <section
      id="our-contact"
      data-chapter={100}
      className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-paper/80 py-28 text-ink md:py-40"
    >
      <div className="container-editorial relative">
        <Kicker className="text-ink/60">Let&rsquo;s start the conversation</Kicker>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-6 max-w-[16ch] font-display text-display-lg text-ink"
        >
          Get a quote — no obligation.
        </SplitReveal>
        <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
          Tell us about your project and we&rsquo;ll reply with next steps within one business day.
        </p>

        <div className="mt-16 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <MetaList
              items={[
                {
                  label: "Phone",
                  value: (
                    <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="link-underline">
                      {brand.phone}
                    </a>
                  ),
                },
                {
                  label: "Email",
                  value: (
                    <a href={`mailto:${brand.email}`} className="link-underline">
                      {brand.email}
                    </a>
                  ),
                },
                { label: "Office", value: brand.location },
                { label: "Hours", value: brand.hours },
              ]}
            />
            <div className="mt-8">
              <span className="label text-ink/50">Elsewhere</span>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-ink-soft hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
