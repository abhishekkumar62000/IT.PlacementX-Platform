import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — ITPlacementX" }, { name: "description", content: "Plans built for students, professionals and enterprises." }] }),
  component: Pricing,
});

const plans = [
  { n: "Starter", p: "Free", d: "Explore the platform.", f: ["AI resume analysis","Career roadmap preview","Community access","2 mock interviews"], cta: "Start free", tag: "" },
  { n: "Professional", p: "₹4,999/mo", d: "For serious upskillers.", f: ["Everything in Starter","Unlimited AI tools","Live cohort sessions","1:1 mentor · 4/mo","Project reviews"], cta: "Choose Professional", tag: "Popular" },
  { n: "Career Accelerator", p: "₹14,999/mo", d: "Guaranteed placement.", f: ["Everything in Professional","Weekly 1:1 mentor","Production capstone","Placement assistance","Job-offer guarantee"], cta: "Accelerate my career", tag: "" },
  { n: "Enterprise", p: "Custom", d: "For companies & institutions.", f: ["Custom cohorts","Team analytics","Dedicated success mgr","API access","SLA & SSO"], cta: "Contact sales", tag: "" },
];

function Pricing() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Pricing"
        title="Invest in the career you actually want."
        description="Simple, transparent plans. Cancel anytime. Career Accelerator ships with an offer guarantee."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((pl) => {
            const featured = pl.tag === "Popular";
            return (
              <div key={pl.n} className={`relative rounded-2xl border p-6 ${featured ? "border-[var(--brand)]/50 bg-linear-to-b from-[var(--brand)]/10 to-transparent ring-glow" : "border-border/60 bg-card/60"}`}>
                {pl.tag && (
                  <div className="absolute -top-3 left-6 rounded-full border border-[var(--brand)]/50 bg-background px-3 py-1 text-xs text-[var(--brand)]">{pl.tag}</div>
                )}
                <div className="font-display text-lg font-semibold">{pl.n}</div>
                <div className="mt-4 text-3xl font-semibold">{pl.p}</div>
                <p className="mt-1 text-sm text-muted-foreground">{pl.d}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {pl.f.map((f) => (
                    <li key={f} className="flex gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${featured ? "bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] text-white" : "border border-border bg-background/60"}`}>
                  {pl.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}