import { brand, socialLinks } from "@/config/theme";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { MetaList } from "@/components/ui/MetaList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get a quote from GitzTech — AI automation, CRM & WhatsApp systems, web & app development, digital marketing, WordPress and GoHighLevel CRM.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact us"
        title="Let's start the conversation."
        deck="Ready to take your business to the next level? Tell us about your project and let's discuss how GitzTech can help you achieve your goals."
      />

      <div className="container-editorial grid gap-14 pb-28 md:grid-cols-12">
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
            <span className="label">Elsewhere</span>
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
          <p className="mt-10 text-pretty text-sm leading-relaxed text-muted">
            Prefer to book a call? Message us with a time that suits you and we&rsquo;ll confirm your consultation.
          </p>
        </aside>
      </div>
    </>
  );
}
