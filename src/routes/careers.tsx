import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — ITPlacementX" }, { name: "description", content: "Join the team building the career OS for the world." }] }),
  component: Careers,
});

const roles = [
  { t: "Founding Engineer · Platform", l: "Bengaluru / Remote", team: "Engineering" },
  { t: "AI Research Engineer", l: "Bengaluru", team: "AI" },
  { t: "Head of Placements", l: "Bengaluru", team: "GTM" },
  { t: "Senior Product Designer", l: "Remote", team: "Design" },
  { t: "Community Lead", l: "Remote", team: "Community" },
];

function Careers() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Careers" title="Build the career OS for the world." description="We're hiring senior operators, engineers and designers who want to change how people become industry-ready." />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass divide-y divide-border/60 rounded-2xl">
          {roles.map((r) => (
            <a key={r.t} href="#" className="flex items-center justify-between p-5 transition-colors hover:bg-white/5">
              <div>
                <div className="font-display text-lg font-semibold">{r.t}</div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{r.team}</span> · <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.l}</span>
                </div>
              </div>
              <span className="text-sm text-[var(--brand)]">Apply →</span>
            </a>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}