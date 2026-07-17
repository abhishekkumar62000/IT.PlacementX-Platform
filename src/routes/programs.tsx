import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { ArrowRight, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({ meta: [{ title: "Programs — ITPlacementX" }, { name: "description", content: "Cohort-based, mentor-led programs for freshers and working professionals." }] }),
  component: Programs,
});

const programs = [
  { t: "Freshers Career Accelerator", d: "0 → first offer. 6-month intensive with production projects and placement.", w: "24 weeks", c: "1200+ enrolled", tag: "Most Popular" },
  { t: "Working Professional Accelerator", d: "Weekend-first upskilling to unlock 2–4× salary hikes.", w: "16 weeks", c: "850+ enrolled", tag: "Weekend" },
  { t: "AI Engineering", d: "Foundational to advanced AI systems: LLMs, RAG, evals, production." },
  { t: "Data Science" }, { t: "Machine Learning" }, { t: "Generative AI" },
  { t: "Data Analytics" }, { t: "MERN Stack" }, { t: "Java Backend" },
  { t: "Python Backend" }, { t: "Cloud" }, { t: "DevOps" },
  { t: "Cyber Security" }, { t: "Product Management" }, { t: "UI UX" },
].map((p) => ({ w: "12 weeks", c: "500+ enrolled", d: "Cohort-based, mentor-led with production capstone.", tag: "", ...p }));

function Programs() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Programs"
        title="Career-accelerator programs built for how hiring actually works."
        description="Every program is cohort-based, mentor-led and ends with a production portfolio and placement assistance."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div key={p.t} className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-[var(--brand)]/40">
              {p.tag && (
                <div className="absolute right-4 top-4 rounded-full border border-[var(--brand)]/40 bg-[var(--brand)]/10 px-2 py-0.5 text-xs text-[var(--brand)]">{p.tag}</div>
              )}
              <div className="text-xs text-muted-foreground">Cohort program</div>
              <h3 className="mt-1 font-display text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.w}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {p.c}</span>
              </div>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--brand)] hover:underline">
                Enroll <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}