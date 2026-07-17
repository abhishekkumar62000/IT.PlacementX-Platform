import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Calendar, Briefcase } from "lucide-react";

export const Route = createFileRoute("/mentors")({
  head: () => ({ meta: [{ title: "Mentors — ITPlacementX" }, { name: "description", content: "Learn from senior engineers with 10+ years at top companies." }] }),
  component: Mentors,
});

const mentors = [
  { n: "Priya S.", c: "Netflix", r: "Staff Engineer", y: "14y", s: ["Distributed Systems","Scala","Kafka"] },
  { n: "Arjun M.", c: "Amazon", r: "Sr. SDE", y: "11y", s: ["System Design","AWS","Java"] },
  { n: "Neha R.", c: "Meta", r: "ML Lead", y: "12y", s: ["Applied ML","PyTorch","Ranking"] },
  { n: "Vikram T.", c: "Microsoft", r: "Principal Eng", y: "16y", s: ["Azure","Kubernetes","Go"] },
  { n: "Sana K.", c: "Google", r: "Sr. SWE", y: "10y", s: ["Backend","gRPC","Go"] },
  { n: "Ravi P.", c: "Stripe", r: "Staff Eng", y: "13y", s: ["Payments","Ruby","Reliability"] },
  { n: "Divya N.", c: "Uber", r: "Sr. Data Eng", y: "9y", s: ["Spark","Airflow","Snowflake"] },
  { n: "Kabir A.", c: "Adobe", r: "Sr. Frontend", y: "11y", s: ["React","Perf","Design Systems"] },
];

function Mentors() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Mentors"
        title="Senior engineers who have shipped what you're trying to learn."
        description="Every mentor is currently working at a top company with 9+ years of hands-on production experience."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m) => (
            <div key={m.n} className="glass rounded-xl p-5">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-[var(--brand-3)] to-[var(--brand-2)] text-lg font-semibold text-white">
                {m.n.split(" ").map((x) => x[0]).join("")}
              </div>
              <div className="mt-4 font-display text-lg font-semibold">{m.n}</div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" /> {m.r} · {m.c} · {m.y}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.s.map((s) => (
                  <span key={s} className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                ))}
              </div>
              <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] px-3 py-2 text-sm font-medium text-white">
                <Calendar className="h-4 w-4" /> Book Session
              </button>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}