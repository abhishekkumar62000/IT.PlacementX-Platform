import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — ITPlacementX" }, { name: "description", content: "Career tips, industry trends and mentor insights." }] }),
  component: Blog,
});

const posts = [
  { c: "Career", t: "How to land a FAANG offer in 6 months (with a real timeline)", d: "12 min · Jul 2026" },
  { c: "AI", t: "The 2026 AI Engineer stack every backend dev should know", d: "8 min" },
  { c: "Interviews", t: "System design: the 8-question framework that always works", d: "15 min" },
  { c: "Salary", t: "Negotiating a 2× hike — a script that actually works", d: "6 min" },
  { c: "Projects", t: "5 production projects that get you shortlisted", d: "10 min" },
  { c: "Mentorship", t: "What senior engineers actually look for in juniors", d: "7 min" },
];

function Blog() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Blog" title="Notes from the industry." description="Weekly insights from senior engineers, hiring partners and our AI research team." />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <a key={p.t} href="#" className="group overflow-hidden rounded-xl border border-border/60 bg-card/60 transition-colors hover:border-[var(--brand)]/40">
              <div className="relative aspect-[16/9] overflow-hidden bg-radial-brand">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute bottom-3 left-3 rounded-full border border-border bg-background/70 px-2 py-0.5 text-xs backdrop-blur">{p.c}</div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold group-hover:text-[var(--brand)]">{p.t}</h3>
                <div className="mt-2 text-xs text-muted-foreground">{p.d}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}