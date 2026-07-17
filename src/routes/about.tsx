import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { 
  Target, Globe, Zap, Users, GraduationCap, Briefcase, 
  BrainCircuit, LayoutDashboard, Rocket, Cpu, CheckCircle2,
  ChevronRight, Sparkles, Code2
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ITPlacementX" },
      { name: "description", content: "Transforming Careers Through Real Industry Experience." },
    ],
  }),
  component: About,
});

function About() {
  const workingProFeatures = [
    "AI-Powered Skill Gap Analysis", "Corporate Industry Training", "One-to-One Expert Mentorship",
    "Live Production-Level Learning", "Real Project Experience", "Interview Preparation",
    "Resume Optimization", "LinkedIn Profile Optimization", "Career Transition Guidance",
    "Promotion Readiness", "Mock Technical Interviews", "Salary Growth Preparation",
    "Leadership Development", "Weekend Fast-Track Programs"
  ];

  const fresherFeatures = [
    "Industry-Oriented Learning Paths", "Senior Industry Mentorship", "Production-Level Live Projects",
    "Git & GitHub Workflow", "Agile & Scrum Practices", "Cloud & DevOps Fundamentals",
    "System Design Fundamentals", "Resume Building", "LinkedIn Optimization",
    "Mock Interviews", "Communication Training", "Placement Preparation",
    "Career Roadmap Planning", "Portfolio Development", "Placement Assistance"
  ];

  const aiEcosystem = [
    "AI Career Coach", "AI Resume Analyzer", "AI Skill Gap Analyzer", "AI Learning Roadmap",
    "AI Interview Preparation", "AI Coding Practice", "AI Career Recommendation Engine",
    "AI Job Match Analysis", "AI Progress Tracking", "AI Career Analytics"
  ];

  const productionLearning = [
    "GitHub Collaboration", "Code Reviews", "Agile Sprint Workflow", "Real Business Problems",
    "Team Collaboration", "API Development", "Cloud Deployment", "CI/CD Concepts",
    "Industry Best Practices", "Professional Documentation"
  ];

  const mentorNetwork = [
    "One-to-One Mentorship", "Career Coaching Sessions", "Live Interactive Classes",
    "Production Project Guidance", "Mock Interviews", "Code Reviews", "Technical Discussions",
    "Career Planning", "Industry Insights", "Corporate Training Sessions"
  ];

  const ecosystemNodes = [
    { icon: GraduationCap, title: "Students" },
    { icon: Briefcase, title: "Working Professionals" },
    { icon: Users, title: "Senior Industry Mentors" },
    { icon: Target, title: "Recruiters" },
    { icon: Globe, title: "Hiring Companies" },
    { icon: LayoutDashboard, title: "Corporate Partners" },
    { icon: Zap, title: "Startup Ecosystem" },
    { icon: Code2, title: "Technology Communities" }
  ];

  return (
    <SiteShell>
      {/* 1. HERO: ABOUT ITPLACEMENTX */}
      <section className="relative overflow-hidden bg-[#03060a] pt-24 pb-32 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[60%] w-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="relative group mb-10">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 opacity-70 blur-xl transition duration-500 group-hover:opacity-100 group-hover:duration-200 animate-pulse" />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl bg-white p-3 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img src="/our-logo.jpeg" alt="IT.PlacementX Logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl mb-4 leading-tight">
            India's 1st AI-Powered <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400">
              IT Career & Placement Platform
            </span>
          </h1>

          <h2 className="text-3xl font-black tracking-tight text-slate-300 sm:text-5xl lg:text-6xl mb-8 leading-tight">
            Transforming Careers Through <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Real Industry Experience
            </span>
          </h2>
          
          <div className="mx-auto max-w-4xl space-y-6 mt-6">
            <p className="text-lg text-slate-300 sm:text-xl font-medium leading-relaxed">
              ITPlacementX is an AI-powered Career Acceleration Platform built to bridge the gap between traditional education and real-world IT industry requirements.
            </p>
            <p className="text-base text-slate-400 sm:text-lg leading-relaxed">
              We believe that talent should never be limited by a lack of industry exposure, outdated learning methods, or missing technical skills. Our mission is to help learners and professionals become truly industry-ready through personalized mentorship, production-level learning, and practical career guidance.
            </p>
            <div className="inline-block mt-4 border border-emerald-500/30 bg-emerald-500/10 rounded-2xl px-6 py-4 text-emerald-300 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              Unlike traditional learning platforms that rely on recorded videos, ITPlacementX focuses on live learning, one-to-one mentorship, real production projects, and AI-driven career development.
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR MISSION & DIFFERENTIATOR */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f18]/80 backdrop-blur-2xl p-10 sm:p-14 shadow-2xl group hover:border-orange-500/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-orange-500/20 text-orange-400 rounded-xl">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-wide uppercase">Our Mission</h2>
            </div>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Our mission is to empower millions of Freshers and Working IT Professionals by helping them learn exactly what the industry demands, connect with experienced mentors, build production-ready skills, and accelerate their careers.
              </p>
              <p className="font-semibold text-white text-xl">
                We aim to create India's most trusted ecosystem where learning leads directly to real career growth.
              </p>
            </div>
          </div>

          {/* Differentiator */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f18]/80 backdrop-blur-2xl p-10 sm:p-14 shadow-2xl group hover:border-emerald-500/30 transition-colors duration-500">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mb-32" />
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-wide uppercase">What Makes Us Different</h2>
            </div>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                We don't just teach technology. <br/> We build industry-ready professionals.
              </div>
              <p>
                Instead of offering endless recorded courses, we provide structured learning paths designed by experienced professionals working in leading global technology companies.
              </p>
              <p className="font-semibold text-emerald-200">
                Every learning journey is personalized according to the learner's career goals, current skills, and target role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL PATHWAYS: PROFESSIONALS & FRESHERS */}
      <section className="relative border-y border-white/5 bg-[#03060a]/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
            
            {/* Working IT Professionals */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-widest mb-6">
                  <Briefcase className="h-4 w-4" /> For Working IT Professionals
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Bridge Your Skill Gap</h3>
                <p className="text-slate-400 leading-relaxed text-lg mb-4">
                  Many experienced professionals lose high-paying opportunities simply because they are missing a few critical technologies listed in a company's Job Description.
                </p>
                <p className="text-slate-400 leading-relaxed text-lg">
                  ITPlacementX helps professionals identify these skill gaps through AI-powered analysis and provides focused upskilling through experienced industry mentors. Our goal is to help professionals become more confident, technically stronger, and better prepared for new career opportunities.
                </p>
              </div>
              
              <div className="bg-[#0a0f18] rounded-3xl border border-white/5 p-8 flex-1">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Zap className="h-5 w-5 text-amber-500" /> Working Professional Programs
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {workingProFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Freshers & College Students */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-6">
                  <GraduationCap className="h-4 w-4" /> For Freshers & Students
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Gain Practical Experience</h3>
                <p className="text-slate-400 leading-relaxed text-lg mb-4">
                  College education often focuses on theoretical concepts, while companies expect practical production-level experience.
                </p>
                <p className="text-slate-400 leading-relaxed text-lg">
                  ITPlacementX helps students bridge this gap through structured learning and real-world project exposure. Our objective is to transform students into confident, industry-ready professionals.
                </p>
              </div>
              
              <div className="bg-[#0a0f18] rounded-3xl border border-white/5 p-8 flex-1">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-emerald-500" /> Fresher Programs
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {fresherFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM PILLARS (Mentors, AI, Production) */}
      <section className="relative py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Mentor Network */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0f18] to-[#0d1420] border border-white/10 p-8 sm:p-12 mb-8 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight">World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Mentor Network</span></h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Learn directly from experienced engineers, architects, consultants, and technology leaders working across global product companies, multinational corporations, startups, and enterprise organizations.
            </p>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mentorNetwork.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors">
                <Users className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-semibold text-slate-200">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Ecosystem */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0f18] to-[#0d1420] border border-white/10 p-8 sm:p-12 mb-8 shadow-2xl flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight">AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Career Ecosystem</span></h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              ITPlacementX integrates Artificial Intelligence throughout the learning journey. Our AI-powered ecosystem accelerates learning and career insights at every step.
            </p>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiEcosystem.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors">
                <BrainCircuit className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-slate-200">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Production Level Learning */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0f18] to-[#0d1420] border border-white/10 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight">Production-Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Learning</span></h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Learning at ITPlacementX goes beyond theory. Learners work on production-inspired projects using modern development practices to ensure they are day-one ready.
            </p>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {productionLearning.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors">
                <Cpu className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR ECOSYSTEM GRID */}
      <section className="py-24 bg-[#03060a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Our Ecosystem</h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-16">
            ITPlacementX is building a complete career ecosystem, creating a single platform where learning, mentoring, networking, and career growth work together.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {ecosystemNodes.map(({ icon: Icon, title }) => (
              <div key={title} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                <Icon className="h-8 w-8 mx-auto text-slate-500 group-hover:text-orange-400 transition-colors mb-4" />
                <h4 className="text-sm font-bold text-slate-300 group-hover:text-white">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VISION & PROMISE */}
      <section className="relative py-32 border-t border-white/10 bg-gradient-to-b from-[#0a0f18] to-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-24">
            <h2 className="text-xl text-emerald-400 font-bold uppercase tracking-[0.3em] mb-8">Our Vision</h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              To become one of the world's most trusted AI-powered Career Acceleration Platforms, helping learners and professionals continuously adapt to evolving technologies, strengthen their skills, and unlock meaningful career opportunities through mentorship, innovation, and real industry experience.
            </p>
          </div>

          <div className="relative rounded-3xl border border-orange-500/20 bg-orange-500/5 p-10 sm:p-16 backdrop-blur-sm">
            <h2 className="text-xl text-orange-400 font-bold uppercase tracking-[0.3em] mb-12">Our Promise</h2>
            
            <div className="space-y-6 text-2xl sm:text-3xl font-black text-white tracking-tight mb-16">
              <p>We don't just teach. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">We mentor.</span></p>
              <p>We don't just provide courses. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">We create real industry experience.</span></p>
              <p>We don't just help people learn. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">We help them become career-ready.</span></p>
            </div>

            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              ITPlacementX — Learn from Industry. Build with Confidence. Grow Without Limits.
            </div>
          </div>
        </div>
      </section>

    </SiteShell>
  );
}