"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { brand } from "@/config/theme";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const IMPROVEMENT_OPTIONS = [
  "Custom Software",
  "CRM",
  "AI Automation",
  "Web & Mobile App",
  "Digital Marketing",
  "Other",
] as const;

/**
 * Contact / enquiry form, doubling as a lightweight qualification form. POSTs
 * to NEXT_PUBLIC_CONTACT_ENDPOINT when configured (Formspree, a Resend proxy,
 * etc.); otherwise falls back to a prefilled mailto: link so the form always
 * works with zero backend. Accessible labels, required fields and an
 * aria-live status region.
 */
export function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const phone = String(data.get("phone") ?? "");
    const improving = data.getAll("improving").map(String).join(", ");
    const challenge = String(data.get("challenge") ?? "");
    const subject = String(data.get("subject") ?? "Project enquiry");
    const message = String(data.get("message") ?? "");

    if (!endpoint) {
      const lines = [
        `From: ${name} <${email}>`,
        company ? `Company: ${company}` : "",
        phone ? `Phone/WhatsApp: ${phone}` : "",
        improving ? `Looking to improve: ${improving}` : "",
        challenge ? `Biggest challenge: ${challenge}` : "",
        "",
        message,
      ].filter(Boolean);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setStatus("success");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, company, phone, improving, challenge, subject, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-line/20 bg-paper-deep/40 p-8 md:p-10">
        <p className="font-display text-2xl text-ink">Thank you — message sent.</p>
        <p className="mt-3 max-w-md text-ink-soft">
          {endpoint
            ? "We’ll follow up to schedule your call shortly."
            : "Your email client should now be open with a prefilled message."}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-underline mt-6 text-sm text-ink">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Work Email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Company / business" name="company" autoComplete="organization" />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" />
      </div>

      <fieldset>
        <legend className="label">What are you trying to improve?</legend>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {IMPROVEMENT_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-ink-soft">
              <input type="checkbox" name="improving" value={opt} className="accent-accent" />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="cf-challenge" className="label">What&rsquo;s your biggest challenge right now?</label>
        <textarea
          id="cf-challenge"
          name="challenge"
          rows={4}
          className="mt-2 w-full resize-y border border-line/25 bg-transparent p-4 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
          placeholder="Manual data entry, missed follow-ups, disconnected tools…"
        />
      </div>

      <Field label="Subject" name="subject" defaultValue="Project enquiry" />
      <div>
        <label htmlFor="cf-message" className="label">Message</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y border border-line/25 bg-transparent p-4 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
          placeholder="Tell us about your project, timeline and budget…"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <MagneticButton>
          <button
            type="submit"
            disabled={status === "submitting"}
            className={cn(
              "inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-accent",
              status === "submitting" && "opacity-60"
            )}
          >
            {status === "submitting" ? "Sending…" : "Book a Free Strategy Call"}
            <span aria-hidden>→</span>
          </button>
        </MagneticButton>
        <p aria-live="polite" className="text-sm text-muted">
          {status === "error" ? "Something went wrong — please email us directly." : `Or write to ${brand.email}`}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...props
}: { label: string; name: string; type?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = `cf-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        className="mt-2 w-full border border-line/25 bg-transparent p-3.5 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
        {...props}
      />
    </div>
  );
}
