import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { TrendingUp, Star } from "lucide-react";

export const Route = createFileRoute("/success-stories")({
  head: () => ({ meta: [{ title: "Success Stories — ITPlacementX" }, { name: "description", content: "Real students. Real salary jumps. Real offers." }] }),
  component: SuccessStories,
});

const stories = [
  { n: "Ananya P.", from: "Tier-3 college", to: "SDE-2 · Amazon", before: "0 LPA", after: "22 LPA", weeks: 24, q: "The mentor + AI feedback loop is what did it." },
  { n: "Karan D.", from: "4.5 LPA · Service", to: "MLE · Flipkart", before: "4.5 LPA", after: "18 LPA", weeks: 20, q: "Production projects got me shortlisted every time." },
  { n: "Riya S.", from: "Non-CS", to: "Cloud Eng · Microsoft", before: "3 LPA", after: "16 LPA", weeks: 22, q: "9 interviews in 3 weeks. Landed my dream role." },
  { n: "Aditya V.", from: "6 LPA · Backend", to: "Sr SDE · Uber", before: "6 LPA", after: "32 LPA", weeks: 18, q: "System design mocks were brutal — in the best way." },
  { n: "Meera J.", from: "Fresher", to: "Data Eng · Swiggy", before: "0 LPA", after: "14 LPA", weeks: 26, q: "The community carried me through the hardest weeks." },
  { n: "Rohan K.", from: "Fresher", to: "SDE · Google", before: "0 LPA", after: "44 LPA", weeks: 30, q: "I didn't believe it was possible until it happened." },
];

function SuccessStories() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Outcomes"
        title="Careers, transformed."
        description="No cherry-picking. These are median outcomes from recent cohorts."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {stories.map((s) => (
            <div key={s.n} className="glass rounded-xl p-6">
              <div className="flex gap-0.5 text-[var(--brand)]">
                {Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm">"{s.q}"</p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-sm font-semibold">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.from} → {s.to}</div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 rounded-full border border-[var(--brand)]/40 bg-[var(--brand)]/10 px-2 py-0.5 text-xs text-[var(--brand)]">
                    <TrendingUp className="h-3 w-3" /> {s.before} → {s.after}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">in {s.weeks} weeks</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}