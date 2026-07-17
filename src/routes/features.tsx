import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  Bot, Target, Compass, Users, GraduationCap, Code2, Briefcase, MessageSquare,
  FileText, LineChart, Award, ShieldCheck, Trophy, Github, Calendar, BookOpen,
  BarChart3, Wallet, Bell, Sparkles, Rocket, Layers, BrainCircuit, Zap,
  ArrowRight, CheckCircle2, Cpu, Globe
} from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — ITPlacementX" },
      { name: "description", content: "AI career guidance, senior mentors, production projects, placement assistance and 20+ tools in one platform." },
    ],
  }),
  component: Features,
});

const featureCategories = [
  {
    id: "ai",
    label: "AI-Powered Tools",
    badge: "Powered by AI",
    color: "cyan",
    gradientFrom: "from-cyan-500/20",
    gradientTo: "to-blue-500/20",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-400",
    icon: BrainCircuit,
    description: "Our AI engine analyzes your profile, identifies gaps, and builds a personalized career roadmap — all in real time.",
    features: [
      { i: Bot, t: "AI Resume Analyzer", d: "Instantly score and optimize your resume against live job descriptions." },
      { i: Target, t: "AI Skill Gap Analysis", d: "Identify exactly what skills you're missing for your target role." },
      { i: Compass, t: "AI Career Roadmap", d: "Personalized, step-by-step roadmap generated from your goals." },
      { i: LineChart, t: "Career Analytics", d: "Real-time insights into your career growth trajectory." },
      { i: Wallet, t: "Salary Growth Planner", d: "Know what you're worth and plan your next salary jump." },
      { i: Calendar, t: "Weekly Career Tracking", d: "AI-guided weekly sprint reviews to keep you on track." },
    ]
  },
  {
    id: "mentorship",
    label: "Mentorship & Learning",
    badge: "Live & 1:1",
    color: "orange",
    gradientFrom: "from-orange-500/20",
    gradientTo: "to-amber-500/20",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-400",
    icon: Users,
    description: "Learn directly from senior engineers and architects working at top global companies — not pre-recorded videos.",
    features: [
      { i: Users, t: "Live Mentorship", d: "One-to-one sessions with experienced senior professionals." },
      { i: GraduationCap, t: "Senior IT Trainers", d: "Trainers from MNCs, product companies & startups." },
      { i: BookOpen, t: "Career Counselling", d: "Dedicated counselling to plan your short and long-term career." },
      { i: MessageSquare, t: "Mock Interviews", d: "Realistic technical and HR interview simulations." },
      { i: Code2, t: "Production-Level Projects", d: "Work on real projects using industry-standard workflows." },
      { i: Github, t: "GitHub Portfolio Building", d: "Build an impressive open-source portfolio guided by mentors." },
    ]
  },
  {
    id: "placement",
    label: "Placement & Career",
    badge: "Get Hired",
    color: "emerald",
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-teal-500/20",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    icon: Rocket,
    description: "Direct connections with recruiters and hiring companies, combined with powerful job tools to get you hired faster.",
    features: [
      { i: Briefcase, t: "Placement Assistance", d: "Direct placement support with our hiring partner network." },
      { i: Rocket, t: "Job Portal", d: "Curated IT job listings matched to your skill profile." },
      { i: FileText, t: "Resume Review", d: "Expert human review of your resume by senior professionals." },
      { i: Sparkles, t: "LinkedIn Optimization", d: "Maximize your LinkedIn visibility for recruiter discovery." },
      { i: Trophy, t: "Coding Challenges", d: "Practice with real company-level coding problems." },
      { i: Layers, t: "Interview Preparation", d: "Structured preparation plans for DSA, system design & HR." },
    ]
  },
  {
    id: "ecosystem",
    label: "Platform Ecosystem",
    badge: "All-in-One",
    color: "violet",
    gradientFrom: "from-violet-500/20",
    gradientTo: "to-purple-500/20",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-400",
    icon: Globe,
    description: "A fully integrated ecosystem that keeps you connected, accountable, and growing — every single day.",
    features: [
      { i: BarChart3, t: "Learning Dashboard", d: "Track every milestone, skill and goal in a unified dashboard." },
      { i: Award, t: "Certification", d: "Earn verified industry certificates on course completion." },
      { i: ShieldCheck, t: "Verified Community", d: "Join a vetted community of ambitious IT professionals." },
      { i: Bell, t: "Real-time Notifications", d: "Instant alerts for mentorship slots, jobs, and milestones." },
      { i: Cpu, t: "AI Progress Tracking", d: "AI monitors your growth and recommends next steps automatically." },
      { i: Zap, t: "Career Acceleration Hub", d: "Exclusive access to events, webinars, and hiring drives." },
    ]
  }
];

const hoverRingMap: Record<string, string> = {
  cyan:    "hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]",
  orange:  "hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.12)]",
  emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)]",
  violet:  "hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.12)]",
};

const badgeMap: Record<string, string> = {
  cyan:    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  orange:  "bg-amber-500/10 border-amber-500/20 text-amber-400",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  violet:  "bg-violet-500/10 border-violet-500/20 text-violet-400",
};

const topBarMap: Record<string, string> = {
  cyan:    "bg-gradient-to-r from-cyan-500 to-blue-500",
  orange:  "bg-gradient-to-r from-orange-500 to-amber-500",
  emerald: "bg-gradient-to-r from-emerald-500 to-teal-500",
  violet:  "bg-gradient-to-r from-violet-500 to-purple-500",
};

function Features() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#03060a] pt-24 pb-32 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-orange-500/8 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[60%] w-[40%] rounded-full bg-cyan-500/8 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-10">
            <Sparkles className="h-3.5 w-3.5" /> Platform Features
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl mb-4 leading-tight">
            Every Tool Your Career <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400">
              Needs. One Platform.
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-400 sm:text-xl font-medium leading-relaxed mt-6 mb-12">
            A cohesive suite of <span className="text-white font-bold">AI</span>,{" "}
            <span className="text-white font-bold">mentorship</span>, and{" "}
            <span className="text-white font-bold">placement tools</span> designed to compress years of career struggle into weeks of focused execution.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border border-white/5 bg-white/[0.03] rounded-2xl px-10 py-5 backdrop-blur-sm">
            {[
              { val: "22+", label: "Career Tools" },
              { val: "4", label: "Core Pillars" },
              { val: "AI", label: "Powered" },
              { val: "1:1", label: "Mentorship" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">{val}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CATEGORIES */}
      {featureCategories.map((cat, catIdx) => {
        const CatIcon = cat.icon;
        const isReversed = catIdx % 2 !== 0;
        return (
          <section key={cat.id} className={`relative py-24 ${catIdx % 2 === 0 ? "bg-transparent" : "bg-[#03060a]/40 border-y border-white/5"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col ${isReversed ? "lg:items-end text-right" : "lg:items-start"} mb-14`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-4 ${badgeMap[cat.color]}`}>
                  <CatIcon className="h-3.5 w-3.5" /> {cat.badge}
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">{cat.label}</h2>
                <p className="max-w-xl text-lg text-slate-400 leading-relaxed">{cat.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.features.map(({ i: Icon, t, d }) => (
                  <div
                    key={t}
                    className={`group relative rounded-3xl border border-white/8 bg-[#0a0f18]/80 backdrop-blur-2xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-default ${hoverRingMap[cat.color]}`}
                  >
                    <div className="absolute -right-4 -bottom-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                      <Icon className="h-28 w-28 text-white" />
                    </div>
                    <div className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${topBarMap[cat.color]}`} />

                    <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} border ${cat.borderColor} ${cat.textColor} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className={`relative z-10 text-lg font-black text-white mb-2 tracking-wide transition-colors duration-300`}>
                      {t}
                    </h3>
                    <p className="relative z-10 text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {d}
                    </p>

                    <div className={`relative z-10 mt-5 flex items-center gap-1 text-xs font-bold ${cat.textColor} opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`}>
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA BANNER */}
      <section className="relative py-32 border-t border-white/10 bg-gradient-to-b from-[#0a0f18] to-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
              Go From Learning to Earning
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12">
            22+ integrated tools, all working together. No more switching between platforms — IT.PlacementX is your single career operating system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/programs"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff9b3f] via-[#ffba5a] to-[#10b981] px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#060b13] shadow-[0_0_25px_rgba(251,146,60,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-[1.04] active:scale-95 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Programs <ArrowRight className="h-4 w-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="/smart-hub"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" /> Smart Hub
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {["AI-Powered", "Live Mentors", "Real Projects", "Job Placement"].map((item) => (
              <div key={item} className="flex items-center gap-2 justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
