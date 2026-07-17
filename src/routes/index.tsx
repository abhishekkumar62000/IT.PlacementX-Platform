import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, Bot, Target, Users, Rocket, Code2, Trophy,
  GraduationCap, Briefcase, LineChart, ShieldCheck, PlayCircle, Star,
  Brain, FileText, Compass, MessageSquare, Layers, Award, Building2, Zap,
  CheckCircle2, TrendingUp, X, ChevronRight, Activity, Terminal
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <LogoCloud />
      <Stats />
      <Transformation />
      <Features />
      <HowItWorks />
      <AIShowcase />
      <ProgramsPreview />
      <MentorsPreview />
      <Testimonials />
      <CTA />
    </SiteShell>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev === 0 ? 1 : 0));
        setIsVisible(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-radial-brand opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-[var(--brand)]/20 to-transparent blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/5 px-4 py-2 text-xs sm:text-sm font-medium text-[var(--brand)] backdrop-blur-md shadow-[0_0_20px_-5px_var(--brand)] mb-8 animate-fade-in-up">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>India's 1st AI-Powered Career Platform</span>
        </div>

        {/* Dynamic Headline */}
        <div className="min-h-[220px] sm:min-h-[180px] lg:min-h-[200px] flex flex-col justify-center max-w-4xl mx-auto">
          <div className={`transition-all duration-500 transform ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"}`}>
            {index === 0 ? (
              <>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                  Bridge the gap between <br className="hidden sm:block" />
                  <span className="text-gradient-brand">college education</span> and the real IT industry.
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                  Become Industry Ready. <br className="hidden sm:block" />
                  <span className="text-gradient-brand">Get Hired Faster.</span>
                </h1>
              </>
            )}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-up delay-100">
          Transform into an industry-ready engineer with senior mentors from FAANG, production-level projects, AI career guidance, and guaranteed placement assistance.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <Link to="/login" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_-10px_var(--brand)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_var(--brand)]">
            <span>Start Your Career</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 ring-offset-2 ring-offset-background transition-all group-hover:ring-white/40" />
          </Link>
          
          <Link to="/smart-hub" className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-8 py-4 text-sm font-bold text-foreground backdrop-blur-md transition-all hover:bg-[var(--brand)]/20 hover:border-[var(--brand)]/50 shadow-[0_0_20px_-10px_var(--brand)]">
            <Bot className="h-4 w-4 text-[var(--brand)] transition-transform group-hover:scale-110" />
            <span>Explore Smart Hub</span>
          </Link>
        </div>
        
        {/* Sleek Mobile-Friendly Hero Preview */}
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl animate-fade-in-up delay-300 text-left">
      {/* Ambient Backlight */}
      <div className="absolute inset-0 bg-linear-to-b from-[var(--brand)]/30 to-transparent blur-3xl rounded-full scale-y-50 -translate-y-1/4" />
      
      {/* Floating Glass UI Container */}
      <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl p-2 sm:p-4 overflow-hidden">
        {/* Mac OS Style Top Bar */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-3 px-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto flex h-6 items-center rounded-md bg-white/5 px-3 text-[10px] sm:text-xs font-medium text-white/50">
            <LockIcon />
            <span className="ml-1.5">app.itplacementx.com/dashboard</span>
          </div>
        </div>

        {/* Dashboard Content Grid - Mobile Optimized */}
        <div className="grid gap-4 mt-4 lg:grid-cols-3">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Top Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { l: "Resume ATS Score", v: "88/100", d: "+12 this week", i: FileText, c: "text-emerald-400", bg: "bg-emerald-400/10" },
                { l: "Skill Match", v: "76%", d: "Target: SDE-1", i: Target, c: "text-blue-400", bg: "bg-blue-400/10" },
                { l: "Interviews", v: "3", d: "Upcoming", i: Users, c: "text-purple-400", bg: "bg-purple-400/10", hideOnMobile: true },
              ].map((s, idx) => (
                <div key={s.l} className={`rounded-xl border border-white/5 bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 ${s.hideOnMobile ? 'hidden sm:block' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className={`grid h-8 w-8 place-items-center rounded-lg ${s.bg} ${s.c}`}>
                      <s.i className="h-4 w-4" />
                    </div>
                    <Activity className={`h-4 w-4 ${s.c} opacity-50`} />
                  </div>
                  <div className="mt-3 text-lg sm:text-2xl font-bold text-white">{s.v}</div>
                  <div className="text-xs text-white/50 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Glowing Chart Area */}
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 sm:p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-r from-[var(--brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                  <div className="text-sm font-semibold text-white">Career Trajectory Analysis</div>
                  <div className="text-xs text-white/50">Skill growth over 12 weeks</div>
                </div>
                <div className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                  On Track
                </div>
              </div>
              <div className="relative h-24 sm:h-32 w-full z-10">
                <SparklineChart />
              </div>
            </div>
          </div>

          {/* Sidebar / AI Notifications (Stacks on mobile) */}
          <div className="space-y-4">
            {/* AI Coach Card */}
            <div className="rounded-xl border border-[var(--brand)]/30 bg-linear-to-br from-[var(--brand)]/10 to-transparent p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain className="h-16 w-16 text-[var(--brand)]" />
              </div>
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <div className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
                <span className="text-xs font-bold text-[var(--brand)]">AI Career Coach Insight</span>
              </div>
              <p className="text-sm text-white/80 relative z-10 leading-relaxed">
                Focus your learning on <span className="font-bold text-white">System Design</span> this week. It covers 24% of the skill gap for your target role at Microsoft.
              </p>
              <button className="mt-3 text-xs font-semibold text-[var(--brand)] flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                View Learning Path <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Live Terminal / Next Task */}
            <div className="rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-white/40 mb-3 border-b border-white/5 pb-2">
                <Terminal className="h-3 w-3" />
                <span>terminal — bash</span>
              </div>
              <div className="text-green-400 mb-1">$ npx placement-cli status</div>
              <div className="text-white/70 space-y-1">
                <div>&gt; Profile: Industry Ready (85%)</div>
                <div>&gt; Next Mock Interview: Tomorrow, 6 PM</div>
                <div className="text-yellow-400">&gt; Action required: Update GitHub Readme</div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="w-2 h-4 bg-white/50 animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function SparklineChart() {
  const pts = [10, 15, 20, 25, 35, 45, 50, 65, 70, 80, 85, 95];
  const max = 100;
  const w = 640, h = 100, step = w/(pts.length-1);
  const d = pts.map((p,i)=>`${i===0?"M":"L"}${i*step},${h-(p/max)*h+8}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h+20}`} className="w-full h-full drop-shadow-[0_0_10px_var(--brand)]">
      <defs>
        <linearGradient id="g-sparkline" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g-sparkline)" />
      <path d={d} stroke="var(--brand)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Animated dots on the line */}
      <circle cx={w} cy={h-(pts[pts.length-1]/max)*h+8} r="5" fill="white" className="animate-pulse" />
      <circle cx={w} cy={h-(pts[pts.length-1]/max)*h+8} r="10" fill="var(--brand)" opacity="0.5" className="animate-ping" />
    </svg>
  );
}

function LogoCloud() {
  const logos = ["Google","Microsoft","Amazon","Meta","Netflix","Stripe","Adobe","Uber","Airbnb","IBM","Oracle","Salesforce"];
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#03060a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#03060a] to-transparent z-10" />
      
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-6">Our Alumni Work At Top Tech Giants</p>
        
        {/* CSS Marquee effect */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-8 sm:gap-16 items-center">
            {[...logos, ...logos, ...logos].map((l, idx) => (
              <div key={`${l}-${idx}`} className="font-display text-lg sm:text-xl font-bold text-white/20 transition-colors hover:text-white/60 select-none">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

function Stats() {
  const stats = [
    { l: "Students Trained", v: "42k+", c: "text-[var(--brand)]" },
    { l: "Industry Mentors", v: "1.2k+", c: "text-[var(--brand-2)]" },
    { l: "Hiring Partners", v: "600+", c: "text-[var(--brand-3)]" },
    { l: "Avg Salary Hike", v: "3.4×", c: "text-emerald-400" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 text-center transition-all hover:bg-white/10 hover:border-white/10">
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`text-3xl sm:text-4xl font-bold font-display ${s.c} drop-shadow-[0_0_15px_currentColor]`}>{s.v}</div>
            <div className="mt-2 text-xs sm:text-sm font-medium text-white/50 tracking-wide uppercase">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Transformation() {
  const [activeTab, setActiveTab] = useState<"freshers" | "professionals">("freshers");

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#03060a] py-24">
      <div className="absolute inset-0 bg-radial-brand opacity-20 mix-blend-screen" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" /> Career Transformation
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Your Career Transformation <span className="text-gradient-brand">Starts Here</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">
            Bridge the industry skill gap with AI-powered guidance, senior mentors, production-level learning, and placement support tailored to your journey.
          </p>
        </div>

        {/* Premium OS-style Tab Switcher */}
        <div className="mt-12 flex justify-center">
          <div className="glass flex rounded-full p-1 border border-white/10 bg-white/5">
            <button
              onClick={() => setActiveTab("freshers")}
              className={`flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "freshers"
                  ? "bg-linear-to-r from-[var(--brand)] to-[var(--brand-2)] text-white shadow-[0_0_20px_-5px_var(--brand)]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <GraduationCap className="h-4 w-4" /> Freshers / Students
            </button>
            <button
              onClick={() => setActiveTab("professionals")}
              className={`flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "professionals"
                  ? "bg-linear-to-r from-[var(--brand)] to-[var(--brand-2)] text-white shadow-[0_0_20px_-5px_var(--brand)]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Briefcase className="h-4 w-4" /> IT Professionals
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-16 transition-all duration-500 animate-fade-in">
          {activeTab === "freshers" ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Without Card */}
              <div className="group relative rounded-3xl border border-red-500/20 bg-red-950/20 p-6 sm:p-8 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
                    <X className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">Without ITPlacementX</h3>
                    <p className="text-sm text-red-400">Struggling to Start an IT Career</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "College syllabus focuses on theory, not production skills.",
                    "Confused by thousands of random YouTube tutorials.",
                    "No hands-on experience with real-world workflows.",
                    "Weak resume and GitHub portfolio reduce interview chances."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/50" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* With Card */}
              <div className="group relative rounded-3xl border border-[var(--brand)]/40 bg-linear-to-br from-[var(--brand)]/10 to-[var(--brand-2)]/5 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_40px_-15px_var(--brand)]">
                <div className="absolute inset-0 bg-linear-to-b from-[var(--brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <div className="relative flex items-center gap-4 mb-8">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">With ITPlacementX</h3>
                    <p className="text-sm text-emerald-400">Become Industry-Ready with Confidence</p>
                  </div>
                </div>
                <ul className="relative space-y-4">
                  {[
                    "AI Skill Gap Analysis and structured career roadmap.",
                    "Learn directly from senior IT professionals live.",
                    "Build real production projects using modern tools.",
                    "Guaranteed placement assistance and mock interviews."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
               {/* Without Card */}
               <div className="group relative rounded-3xl border border-red-500/20 bg-red-950/20 p-6 sm:p-8 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
                    <X className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">Without ITPlacementX</h3>
                    <p className="text-sm text-red-400">Career Growth Stuck</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "Missing critical skills from JDs limits better opportunities.",
                    "No expert mentor to quickly bridge technology gaps.",
                    "Failing technical rounds due to system design weakness.",
                    "Slower salary growth and fewer high-impact roles."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/50" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* With Card */}
              <div className="group relative rounded-3xl border border-[var(--brand)]/40 bg-linear-to-br from-[var(--brand)]/10 to-[var(--brand-2)]/5 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_40px_-15px_var(--brand)]">
                <div className="absolute inset-0 bg-linear-to-b from-[var(--brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <div className="relative flex items-center gap-4 mb-8">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">With ITPlacementX</h3>
                    <p className="text-sm text-emerald-400">Accelerate Your Career Growth</p>
                  </div>
                </div>
                <ul className="relative space-y-4">
                  {[
                    "AI analyzes resume vs target JDs to find exact gaps.",
                    "Learn advanced architectures from FAANG seniors.",
                    "Master System Design and DSA through mock interviews.",
                    "Increase chances of securing high-paying senior roles."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const featureList = [
  { i: Bot, t: "AI Resume Analyzer", d: "Deep analysis with ATS scoring and rewrite suggestions." },
  { i: Target, t: "AI Skill Gap Analysis", d: "Compare your profile against target roles and companies." },
  { i: Compass, t: "AI Career Roadmap", d: "Personalized weekly plan aligned to salary goals." },
  { i: Users, t: "Live Mentorship", d: "1:1 with senior engineers from FAANG and top startups." },
  { i: GraduationCap, t: "Senior IT Trainers", d: "Curriculum taught by 10+ year industry veterans." },
  { i: Code2, t: "Production Projects", d: "Ship real systems, not tutorials, to your GitHub." },
];

function Features() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Everything you need to become <span className="text-gradient-brand">industry-ready</span>
        </h2>
        <p className="mt-4 text-white/60">A complete operating system for your career — from first commit to first offer.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map(({ i: Icon, t, d }) => (
          <div key={t} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 transition-all hover:border-[var(--brand)]/40 hover:bg-white/10 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform group-hover:scale-110 group-hover:opacity-20">
              <Icon className="h-20 w-20 text-[var(--brand)]" />
            </div>
            <div className="relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br from-[var(--brand)]/20 to-[var(--brand-2)]/20 text-[var(--brand)] mb-6 shadow-[0_0_15px_-5px_var(--brand)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{t}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/features" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:text-white transition-colors">
          View all features <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { t: "Profile & Resume", d: "AI parses your history and goals." },
    { t: "Skill Gap Analysis", d: "Exact list of what to learn." },
    { t: "Live Learning", d: "Learn from industry veterans." },
    { t: "Placement", d: "Interviews at 600+ partners." },
  ];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-16">A proven path to your offer</h2>
        
        {/* Responsive Timeline */}
        <div className="relative grid gap-8 sm:grid-cols-4 max-w-5xl mx-auto">
          {/* Desktop connecting line */}
          <div className="hidden sm:block absolute top-[1.75rem] left-[12.5%] w-[75%] h-px bg-white/10" />
          
          {steps.map((s, i) => (
            <div key={s.t} className="relative z-10 flex flex-col items-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#03060a] bg-[var(--brand)] text-lg font-bold text-white shadow-[0_0_20px_-5px_var(--brand)] mb-4 transition-transform hover:scale-110">
                {i + 1}
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1">{s.t}</h3>
              <p className="text-xs text-white/50">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" /> AI Suite
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white leading-tight">
            Your personal career intelligence, <span className="text-gradient-brand">always on.</span>
          </h2>
          <p className="mt-4 text-base text-white/60">
            A network of AI agents work alongside human mentors to compress years of trial and error into weeks of focused execution.
          </p>
          
          <div className="mt-8 space-y-4">
            {[
              { i: Bot, t: "AI Mock Interviews", d: "Voice interviews with real-time STAR method feedback." },
              { i: Zap, t: "AI Salary Predictor", d: "Predict offers based on verified skills and city." }
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--brand)]/20 text-[var(--brand)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t}</h4>
                  <p className="text-sm text-white/50 mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
             <Link to="/smart-hub" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:text-white transition-colors">
              Explore the Smart Hub <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Premium Graphic Representation */}
        <div className="relative mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-linear-to-tr from-[var(--brand)]/30 to-[var(--brand-2)]/30 blur-[100px] rounded-full" />
          <div className="relative rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--brand)]/20 text-[var(--brand)] animate-pulse">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Career Coach AI</div>
                  <div className="text-xs text-green-400">Online & Analyzing</div>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-white/20" />
            </div>
            
            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 p-4 text-sm text-white/80 border border-white/5">
                I've analyzed your latest GitHub commit. Your implementation of Redis caching is great. To hit the Senior SDE requirement, let's optimize the time complexity.
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 rounded-lg bg-[var(--brand)]/20 py-2.5 px-2 text-xs font-semibold text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition-colors border border-[var(--brand)]/30 cursor-pointer">
                  Generate Optimization Plan
                </button>
                <button className="flex-1 rounded-lg bg-white/5 py-2.5 px-2 text-xs font-semibold text-white/70 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer">
                  Schedule Mentor Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsPreview() {
  const programs = [
    "Freshers Career Accelerator","Working Pro Accelerator","AI Engineering","Data Science",
    "Machine Learning","Generative AI","MERN Stack","Java Backend","Cloud & DevOps","Cyber Security"
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Programs built for the roles hiring today</h2>
        <p className="text-white/60">Cohort-based, mentor-led, portfolio-first tracks across the modern IT stack.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {programs.map((p) => (
          <span key={p} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-[var(--brand)]/50 hover:text-white hover:bg-[var(--brand)]/10 cursor-default">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

function MentorsPreview() {
  const mentors = [
    { n: "Priya S.", r: "Staff Engineer · Netflix", s: "Distributed Systems" },
    { n: "Arjun M.", r: "Sr. SDE · Amazon", s: "System Design" },
    { n: "Neha R.", r: "ML Lead · Meta", s: "Applied ML" },
    { n: "Vikram T.", r: "Principal · Microsoft", s: "Cloud & Azure" },
  ];
  return (
    <section className="bg-white/[0.02] py-24 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">Learn from senior engineers</h2>
            <p className="mt-2 text-white/60">Every mentor has 10+ years of hands-on production experience at top companies.</p>
          </div>
          <button className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer">
            Meet Mentors
          </button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <div key={m.n} className="group rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-sm transition-all hover:border-[var(--brand)]/40 hover:-translate-y-1 hover:bg-black/60">
              <div className="flex items-center gap-4 mb-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-[var(--brand)] to-[var(--brand-2)] font-bold text-white shadow-lg">
                  {m.n.split(" ").map(x=>x[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-white">{m.n}</div>
                  <div className="text-xs text-[var(--brand)] font-medium">{m.s}</div>
                </div>
              </div>
              <div className="text-sm text-white/60 border-t border-white/5 pt-4">
                Current Role: <span className="text-white font-medium">{m.r}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Ananya P.", r: "Now SDE-2 · Amazon", q: "Went from 4.5 LPA to 22 LPA in 7 months. The mentor + AI feedback loop is unreal.", g: "4.9× hike" },
    { n: "Karan D.", r: "Now MLE · Flipkart", q: "The production projects are what actually got me shortlisted. Everything else is theatre.", g: "3.2× hike" },
    { n: "Riya S.", r: "Now Cloud Eng · Microsoft", q: "The placement team routed me to 9 interviews in 3 weeks. Landed my dream role.", g: "5.1× hike" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Careers, transformed.</h2>
        <p className="mt-3 text-white/60">Real outcomes from real students. No paid actors.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((t) => (
          <div key={t.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
            <div className="absolute top-8 right-8 text-6xl text-white/5 font-serif leading-none">"</div>
            <div className="flex gap-1 text-[var(--brand)] mb-6">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-white/80 leading-relaxed mb-8 relative z-10">"{t.q}"</p>
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div>
                <div className="font-bold text-white">{t.n}</div>
                <div className="text-xs text-white/50">{t.r}</div>
              </div>
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                {t.g}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 mb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--brand)]/30 bg-black p-10 lg:p-20 text-center shadow-[0_0_80px_-20px_var(--brand)]">
        {/* Massive Ambient Glow */}
        <div className="absolute inset-0 bg-radial-brand opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-r from-[var(--brand-3)]/20 via-[var(--brand)]/30 to-[var(--brand-2)]/20 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md mb-8">
            <Rocket className="h-4 w-4" /> Free career consultation
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to become <br className="hidden sm:block" /> industry-ready?
          </h2>
          
          <p className="text-lg text-white/70 mb-10 max-w-xl">
            Book a 1:1 call with a senior mentor. We'll audit your resume, map your skill gap, and design your 90-day execution plan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10 cursor-pointer">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// silence unused imports
void Building2; void Trophy;
