import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Bot, FileText, Target, Compass, MessageSquare, Users, Code2, Wallet, PenTool, Linkedin, Github, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ai-features")({
  head: () => ({ meta: [{ title: "AI Suite — ITPlacementX" }, { name: "description", content: "13 AI agents purpose-built for your career." }] }),
  component: AI,
});

const tools = [
  { i: FileText, t: "AI Resume Analyzer", d: "ATS scoring + line-by-line rewrites." },
  { i: Target, t: "AI Skill Gap Detector", d: "Compare against any target role or company." },
  { i: Compass, t: "AI Career Coach", d: "24/7 assistant tuned on your profile." },
  { i: Sparkles, t: "AI Learning Roadmap", d: "Weekly plan aligned to your salary goal." },
  { i: MessageSquare, t: "AI Mock Interview", d: "Voice-based, feedback in real time." },
  { i: Users, t: "AI HR Interview", d: "Behavioural drills with STAR feedback." },
  { i: Code2, t: "AI Coding Interview", d: "Live coding with AI evaluator + hints." },
  { i: Wallet, t: "AI Salary Predictor", d: "Predict offers with high precision." },
  { i: PenTool, t: "AI Resume Builder", d: "Tailored resumes per JD, ATS-ready." },
  { i: Linkedin, t: "AI LinkedIn Optimizer", d: "Headline + about + posts, on brand." },
  { i: Github, t: "AI Portfolio Review", d: "Repo-level review with senior-level notes." },
  { i: Search, t: "AI Job Match Score", d: "Score any JD against your profile." },
  { i: Bot, t: "AI Career Recommendation", d: "Discover roles you didn't know you'd win." },
];

function AI() {
  return (
    <SiteShell>
      <PageHeader eyebrow="AI Suite" title="13 AI agents. One career." description="Purpose-built AI for every part of your career journey, from first commit to offer negotiation." />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ i: Icon, t, d }) => (
            <div key={t} className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-[var(--brand)]/40">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-linear-to-br from-[var(--brand-3)]/20 to-[var(--brand-2)]/20 text-[var(--brand)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-lg font-semibold">{t}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}