import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — ITPlacementX" }, { name: "description", content: "Book a free consultation with our career team." }] }),
  component: Contact,
});

function Contact() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Contact" title="Talk to our team." description="Book a free 20-min career consultation. We'll audit your resume, map your gap and design your 90-day plan." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 lg:col-span-1">
          {[
            { i: Mail, t: "Email", d: "hello@itplacementx.com" },
            { i: Phone, t: "Phone", d: "+91 80 4600 1200" },
            { i: MapPin, t: "HQ", d: "Bengaluru, India" },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="glass rounded-xl p-5">
              <Icon className="h-5 w-5 text-[var(--brand)]" />
              <div className="mt-3 text-sm font-semibold">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" placeholder="Your name" />
            <Field label="Email" type="email" placeholder="you@company.com" />
            <Field label="Phone" placeholder="+91" />
            <Field label="Goal" placeholder="e.g. Land SDE-2 role" />
          </div>
          <div className="mt-4">
            <label className="text-xs text-muted-foreground">Message</label>
            <textarea rows={5} placeholder="Tell us about your background and target..." className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-[var(--brand)]" />
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] px-5 py-3 text-sm font-medium text-white">
            Book Consultation
          </button>
        </form>
      </section>
    </SiteShell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-[var(--brand)]" />
    </label>
  );
}