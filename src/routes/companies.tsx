import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/companies")({
  head: () => ({ meta: [{ title: "Hiring Partners — ITPlacementX" }, { name: "description", content: "600+ companies hire from ITPlacementX." }] }),
  component: Companies,
});

const partners = ["Google","Microsoft","Amazon","Meta","Netflix","Stripe","Adobe","Uber","Airbnb","IBM","Oracle","Salesforce","Zoom","Atlassian","Shopify","Snowflake","Databricks","Cloudflare","Linear","Notion","Figma","Vercel"];

function Companies() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Hiring partners"
        title="600+ companies hire from ITPlacementX."
        description="From high-growth startups to global tech leaders — a single talent pipeline of vetted, industry-ready engineers."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partners.map((p) => (
            <div key={p} className="glass grid aspect-[3/2] place-items-center rounded-xl">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-[var(--brand)]" /> {p}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Hire from a vetted, production-ready pipeline</h2>
          <p className="mt-3 text-muted-foreground">Every candidate ships real projects, passes mock panels and is mentor-verified before being surfaced.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-md bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] px-5 py-3 text-sm font-medium text-white">Partner with us</Link>
            <Link to="/dashboard/company" className="rounded-md border border-border bg-background/60 px-5 py-3 text-sm font-medium">Recruiter demo</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}