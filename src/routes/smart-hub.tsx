import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useState } from "react";
import {
  Sparkles, Bot, FileText, Target, Compass, MessageSquare, Wallet,
  Github, Users, Briefcase, Zap, CheckCircle2, AlertCircle, Clock,
  Search, Building2, Trophy, ClipboardCheck, BookOpen, GraduationCap,
  ArrowRight, BrainCircuit, Rocket, Activity, Star
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/smart-hub")({
  head: () => ({
    meta: [
      { title: "Smart Hub — ITPlacementX" },
      { name: "description", content: "Access all AI-powered tools, roadmaps, and career services in one single dashboard." },
      { property: "og:title", content: "Smart Hub — ITPlacementX" },
      { property: "og:description", content: "Your unified control center for AI career coaching, skill audits, and mentorship." },
    ],
  }),
  component: SmartHub,
});

type FeatureItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  status: "Active" | "Beta" | "Coming Soon";
  description: string;
  actionText: string;
  color: string;
};

const hubFeatures: FeatureItem[] = [
  {
    id: "resume-analyzer",
    icon: FileText,
    title: "AI Resume Analyzer",
    status: "Active",
    description: "Upload your resume for real-time ATS scoring, keyword optimization, and section-by-section rewrite suggestions.",
    actionText: "Launch Analyzer",
    color: "emerald",
  },
  {
    id: "skill-gap",
    icon: Target,
    title: "AI Skill Gap Auditor",
    status: "Active",
    description: "Paste any Job Description to instantly compare your profile against target roles and find exact technology gaps.",
    actionText: "Start Audit",
    color: "orange",
  },
  {
    id: "career-roadmap",
    icon: Compass,
    title: "AI Career Roadmap",
    status: "Active",
    description: "Generate a personalized weekly learning and project plan aligned to your target salary goals and role.",
    actionText: "Generate Roadmap",
    color: "cyan",
  },
  {
    id: "mock-interviews",
    icon: MessageSquare,
    title: "AI Mock Interviews",
    status: "Beta",
    description: "Practice technical coding, system design, and behavioral interviews with real-time audio and STAR feedback.",
    actionText: "Start Mock Session",
    color: "violet",
  },
  {
    id: "salary-predictor",
    icon: Wallet,
    title: "AI Salary Predictor",
    status: "Beta",
    description: "Predict potential compensation ranges based on your verified skills, experience, target companies, and location.",
    actionText: "Predict Salary",
    color: "amber",
  },
  {
    id: "portfolio-evaluator",
    icon: Github,
    title: "AI Portfolio Evaluator",
    status: "Coming Soon",
    description: "Connect your GitHub profile to audit repository structures, code quality, and project readme profiles.",
    actionText: "Link GitHub",
    color: "slate",
  },
  {
    id: "mentor-match",
    icon: Users,
    title: "Live Mentor Matchmaker",
    status: "Active",
    description: "Direct matching and scheduling system to book 1:1 sessions with senior engineers from top tech companies.",
    actionText: "Find Mentor",
    color: "rose",
  },
  {
    id: "recruiter-pipeline",
    icon: Briefcase,
    title: "Placement Matchmaker",
    status: "Beta",
    description: "Submit your verified industry-ready profile directly to hiring recruiters at 600+ partner companies.",
    actionText: "Apply to Partners",
    color: "blue",
  },
];

const careerCategories = [
  { id: "internships", title: "Internships", icon: Briefcase, badge: "1.5k+ open", color: "amber" },
  { id: "jobs", title: "Jobs", icon: Building2, badge: "3k+ active", color: "emerald" },
  { id: "competitions", title: "Competitions", icon: Trophy, badge: "40+ live", color: "violet" },
  { id: "mock-tests", title: "Mock Tests", icon: ClipboardCheck, badge: "120+ tests", color: "cyan" },
  { id: "mock-interviews", title: "Mock Interviews", icon: MessageSquare, badge: "Real-time", color: "orange" },
  { id: "mentorships", title: "Mentorships", icon: Users, badge: "5.0 ★ Rating", color: "rose" },
  { id: "courses", title: "Courses", icon: BookOpen, badge: "Certified", color: "blue" },
];

const colorConfig: Record<string, { icon: string; border: string; glow: string; badge: string; bg: string; topBar: string; checkColor: string }> = {
  emerald: { icon: "text-emerald-400", border: "hover:border-emerald-500/40", glow: "hover:shadow-[0_0_35px_rgba(16,185,129,0.15)]", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", bg: "bg-gradient-to-br from-emerald-500/15 to-teal-500/10", topBar: "bg-gradient-to-r from-emerald-500 to-teal-500", checkColor: "text-emerald-400" },
  orange:  { icon: "text-orange-400",  border: "hover:border-orange-500/40",  glow: "hover:shadow-[0_0_35px_rgba(249,115,22,0.15)]",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",  bg: "bg-gradient-to-br from-orange-500/15 to-amber-500/10",  topBar: "bg-gradient-to-r from-orange-500 to-amber-500",  checkColor: "text-orange-400"  },
  cyan:    { icon: "text-cyan-400",    border: "hover:border-cyan-500/40",    glow: "hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",      bg: "bg-gradient-to-br from-cyan-500/15 to-blue-500/10",     topBar: "bg-gradient-to-r from-cyan-500 to-blue-500",    checkColor: "text-cyan-400"    },
  violet:  { icon: "text-violet-400",  border: "hover:border-violet-500/40",  glow: "hover:shadow-[0_0_35px_rgba(139,92,246,0.15)]",    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",bg: "bg-gradient-to-br from-violet-500/15 to-purple-500/10", topBar: "bg-gradient-to-r from-violet-500 to-purple-500", checkColor: "text-violet-400"  },
  amber:   { icon: "text-amber-400",   border: "hover:border-amber-500/40",   glow: "hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]",    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   bg: "bg-gradient-to-br from-amber-500/15 to-orange-500/10",  topBar: "bg-gradient-to-r from-amber-500 to-orange-500",  checkColor: "text-amber-400"   },
  slate:   { icon: "text-slate-400",   border: "hover:border-slate-500/40",   glow: "hover:shadow-[0_0_20px_rgba(100,116,139,0.1)]",    badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",   bg: "bg-gradient-to-br from-slate-500/10 to-slate-600/5",    topBar: "bg-gradient-to-r from-slate-500 to-slate-600",   checkColor: "text-slate-400"   },
  rose:    { icon: "text-rose-400",    border: "hover:border-rose-500/40",    glow: "hover:shadow-[0_0_35px_rgba(244,63,94,0.15)]",     badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",      bg: "bg-gradient-to-br from-rose-500/15 to-pink-500/10",     topBar: "bg-gradient-to-r from-rose-500 to-pink-500",    checkColor: "text-rose-400"    },
  blue:    { icon: "text-blue-400",    border: "hover:border-blue-500/40",    glow: "hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",      bg: "bg-gradient-to-br from-blue-500/15 to-indigo-500/10",   topBar: "bg-gradient-to-r from-blue-500 to-indigo-500",  checkColor: "text-blue-400"    },
};

const categoryColorConfig: Record<string, { icon: string; border: string; bg: string }> = {
  amber:   { icon: "text-amber-400",   border: "hover:border-amber-500/30",   bg: "bg-amber-500/10" },
  emerald: { icon: "text-emerald-400", border: "hover:border-emerald-500/30", bg: "bg-emerald-500/10" },
  violet:  { icon: "text-violet-400",  border: "hover:border-violet-500/30",  bg: "bg-violet-500/10" },
  cyan:    { icon: "text-cyan-400",    border: "hover:border-cyan-500/30",    bg: "bg-cyan-500/10" },
  orange:  { icon: "text-orange-400",  border: "hover:border-orange-500/30",  bg: "bg-orange-500/10" },
  rose:    { icon: "text-rose-400",    border: "hover:border-rose-500/30",    bg: "bg-rose-500/10" },
  blue:    { icon: "text-blue-400",    border: "hover:border-blue-500/30",    bg: "bg-blue-500/10" },
};

function SmartHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLaunch = (featureName: string, status: string) => {
    if (status === "Coming Soon") {
      toast.info(`${featureName} is in development. You'll be notified when it launches!`);
    } else {
      toast.success(`Initializing ${featureName}...`);
    }
  };

  const filteredFeatures = hubFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SiteShell>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#03060a] pt-24 pb-32 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-violet-500/8 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[60%] w-[40%] rounded-full bg-emerald-500/8 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-10 animate-pulse">
            <Activity className="h-3.5 w-3.5" /> Capabilities Center
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl mb-4 leading-tight">
            Welcome to the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400">
              Smart Hub
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-400 sm:text-xl font-medium leading-relaxed mt-6 mb-12">
            Your unified control center for <span className="text-white font-bold">AI-powered career coaching</span>, skill audits, production project tracking, and <span className="text-white font-bold">live mentorship</span> — all in one place.
          </p>

          {/* Stats Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border border-white/5 bg-white/[0.03] rounded-2xl px-10 py-5 backdrop-blur-sm mb-10">
            {[
              { val: "8+", label: "AI Tools" },
              { val: "1,200+", label: "Mentors" },
              { val: "600+", label: "Hiring Partners" },
              { val: "850M+", label: "Opportunities" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">{val}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl relative">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search AI tools, features, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-6 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50 focus:bg-white/8 shadow-2xl backdrop-blur-xl transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── TOP LEAD FEATURES ── */}
      <section className="relative z-20 -mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Card 1 — Top IT Trainers */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f18]/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500" />
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:bg-cyan-500/20" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-1">Main Feature #1</div>
                    <h3 className="text-2xl font-black text-white leading-tight">Our Top IT Trainers</h3>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black text-emerald-400 border border-emerald-500/20 uppercase tracking-wider animate-pulse">Live Now</span>
              </div>

              <p className="text-slate-400 leading-relaxed mb-8">
                Learn directly from India's top senior IT professionals with 10+ years of real production experience at FAANG, startups, and leading product companies. Industry-first curriculum, live sessions.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { v: "150+", l: "Senior Trainers" },
                  { v: "42k+", l: "Students Trained" },
                  { v: "4.9★", l: "Avg Rating" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/5 bg-white/5 p-3 text-center">
                    <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">{s.v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{s.l}</div>
                  </div>
                ))}
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Live cohort-based classes from 10+ yr industry veterans",
                  "System Design, DSA, Cloud, DevOps & Full Stack tracks",
                  "Direct Slack access to your assigned trainer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => toast.success("Opening IT Trainers Hub...")}
                className="relative overflow-hidden w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-98 transition-all duration-300 group/btn"
              >
                <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore IT Trainers <ArrowRight className="h-4 w-4 stroke-[3px] group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Card 2 — Mentorship Program */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f18]/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-purple-500" />
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl transition-all duration-700 group-hover:bg-violet-500/20" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Users className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-1">Main Feature #2</div>
                    <h3 className="text-2xl font-black text-white leading-tight">Mentorship Program</h3>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-violet-500/10 px-3 py-1.5 text-[10px] font-black text-violet-400 border border-violet-500/20 uppercase tracking-wider">1:1 Live</span>
              </div>

              <p className="text-slate-400 leading-relaxed mb-8">
                Get personally matched with senior engineers from Google, Microsoft, Amazon and top startups. Weekly 1:1 sessions, code reviews, career strategy, and direct placement referrals.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { v: "1,200+", l: "Mentors" },
                  { v: "8k+", l: "Active Mentees" },
                  { v: "93%", l: "Placed in 6 mo." },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/5 bg-white/5 p-3 text-center">
                    <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">{s.v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{s.l}</div>
                  </div>
                ))}
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Matched with FAANG & top-startup senior engineers",
                  "Weekly 1:1 sessions + async code + career reviews",
                  "Direct referral pipeline to 600+ hiring partners",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/mentorship-program"
                className="relative overflow-hidden flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-98 transition-all duration-300 group/btn"
              >
                <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  Find Your Mentor <ArrowRight className="h-4 w-4 stroke-[3px] group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNLOCK YOUR CAREER + CATEGORY TILES ── */}
      <section className="relative border-y border-white/5 bg-[#03060a]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Career!</span>
              </h2>
              <p className="text-slate-400 font-medium">Explore job channels, practice environments, and mentorship networks.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm">
              <Zap className="h-4 w-4 text-amber-400" /> 850M+ Opportunities
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {careerCategories.map((c) => {
              const Icon = c.icon;
              const cc = categoryColorConfig[c.color];
              return (
                <div
                  key={c.id}
                  onClick={() => toast.success(`Opening ${c.title} Hub...`)}
                  className={`group cursor-pointer rounded-3xl border border-white/8 bg-[#0a0f18]/60 backdrop-blur-xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 ${cc.border} hover:-translate-y-2 hover:shadow-xl`}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cc.bg} ${cc.icon} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-black text-white group-hover:text-slate-200">{c.title}</div>
                  <div className="mt-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{c.badge}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI TOOLS GRID ── */}
      <section className="relative py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              <BrainCircuit className="h-3.5 w-3.5" /> AI Suite & Tools
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Your AI Career<br className="hidden sm:block" /> Toolkit</h2>
            <p className="max-w-xl text-lg text-slate-400 leading-relaxed mt-4">Select a tool to launch your personalized session. Every tool is powered by advanced AI trained on real industry data.</p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "Active", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
              { label: "Beta", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
              { label: "Coming Soon", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
            ].map(({ label, color }) => (
              <span key={label} className={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${color}`}>{label}</span>
            ))}
          </div>
        </div>

        {filteredFeatures.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredFeatures.map((f) => {
              const Icon = f.icon;
              const cc = colorConfig[f.color];
              return (
                <div
                  key={f.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/8 bg-[#0a0f18]/80 backdrop-blur-2xl p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 ${cc.border} ${cc.glow}`}
                >
                  {/* Top color bar */}
                  <div className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${cc.topBar}`} />

                  {/* Watermark icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                    <Icon className="h-24 w-24 text-white" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cc.bg} border border-white/5 ${cc.icon} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold border uppercase tracking-wider ${cc.badge}`}>
                        {f.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : f.status === "Beta" ? <Star className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {f.status}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white mb-2 leading-tight">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{f.description}</p>
                  </div>

                  <div className="relative mt-6">
                    <button
                      onClick={() => handleLaunch(f.title, f.status)}
                      disabled={f.status === "Coming Soon"}
                      className={`relative overflow-hidden w-full rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                        f.status === "Coming Soon"
                          ? "border border-white/5 text-slate-600 bg-transparent cursor-not-allowed"
                          : `${cc.topBar} text-white shadow-sm hover:scale-[1.03] active:scale-95 cursor-pointer group/btn`
                      }`}
                    >
                      {f.status !== "Coming Soon" && (
                        <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      )}
                      <span className="relative z-10">{f.actionText}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm">
            <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-semibold">No tools matching "<span className="text-white">{searchQuery}</span>"</p>
            <p className="text-slate-600 text-sm mt-2">Try searching for "AI", "Mentor", or "Interview"</p>
          </div>
        )}
      </section>

      {/* ── HELP BANNER ── */}
      <section className="relative py-32 border-t border-white/10 bg-gradient-to-b from-[#0a0f18] to-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-3xl border border-violet-500/20 bg-violet-500/5 p-10 sm:p-16 backdrop-blur-sm mb-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/20 border border-violet-500/30 text-violet-400 mx-auto mb-6">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Need Help Finding the Right Tool?</h3>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
              Our AI Career Coach can recommend the best next steps based on your current resume score. Available 24/7 or schedule a live consultation session.
            </p>
            <button
              onClick={() => toast.success("Connecting to AI Career Coach...")}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff9b3f] via-[#ffba5a] to-[#10b981] px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#060b13] shadow-[0_0_25px_rgba(251,146,60,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-[1.04] active:scale-95 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Talk to AI Career Coach <ArrowRight className="h-4 w-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {["AI-Powered", "24/7 Available", "Personalized", "Free to Use"].map((item) => (
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
