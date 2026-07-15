import type { Metadata } from "next";
import { brand, socialLinks } from "@/config/theme";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { MetaList } from "@/components/ui/MetaList";

export const metadata: Metadata = {
  title: "Contact",
  description: "Study visits, loan and research enquiries for the Auren Archive.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Study visits & enquiries."
        deck="For research access, study visits, image licensing or loan enquiries, write to us below. The archive is open by appointment."
      />

      <div className="container-editorial grid gap-14 pb-28 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <MetaList
            items={[
              { label: "Email", value: <a href={`mailto:${brand.email}`} className="link-underline">{brand.email}</a> },
              { label: "Location", value: brand.location },
              { label: "Opening", value: "Wednesday – Saturday, by appointment" },
              { label: "Study room", value: "Booked in advance, 48h notice" },
            ]}
          />
          <div className="mt-8">
            <span className="label">Elsewhere</span>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline text-ink-soft hover:text-ink">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-10 text-pretty text-sm leading-relaxed text-muted">
            This is a demonstration archive; all contact details are placeholders. Wire the form to a real endpoint via{" "}
            <code className="font-mono text-xs text-ink-soft">NEXT_PUBLIC_CONTACT_ENDPOINT</code> — see the deployment guide.
          </p>
        </aside>
      </div>
    </>
  );
}
