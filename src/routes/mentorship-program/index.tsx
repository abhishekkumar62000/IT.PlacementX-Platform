import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useState } from "react";
import {
  Search, Star, ArrowRight, ArrowUpRight, Trophy, MapPin, Briefcase,
  Users, CheckCircle2, Sparkles, ChevronRight, SlidersHorizontal,
  ArrowUpDown, UserCheck, Calendar, Filter, Video, BookOpen, Clock
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/mentorship-program/")({
  head: () => ({
    meta: [
      { title: "Mentorship Program — ITPlacementX" },
      { name: "description", content: "Connect 1:1 with senior engineers from Google, Amazon, Microsoft and top companies. Personalized career guidance, code reviews, and placement referrals." },
    ],
  }),
  component: MentorshipProgram,
});

const topCompanies = [
  // ── FAANG / Big Tech ──
  { id: "amazon",      name: "Amazon",      abbr: "A",    color: "#FF9900", bg: "#fff8ee", domain: "amazon.com" },
  { id: "google",      name: "Google",      abbr: "G",    color: "#4285F4", bg: "#eef4ff", domain: "google.com" },
  { id: "microsoft",   name: "Microsoft",   abbr: "M",    color: "#00a4ef", bg: "#eefaff", domain: "microsoft.com" },
  { id: "meta",        name: "Meta",        abbr: "fb",   color: "#0866FF", bg: "#eef4ff", domain: "meta.com" },
  { id: "apple",       name: "Apple",       abbr: "🍎",   color: "#555555", bg: "#f5f5f5", domain: "apple.com" },
  { id: "netflix",     name: "Netflix",     abbr: "N",    color: "#E50914", bg: "#fff0f0", domain: "netflix.com" },
  // ── Global Enterprise & Hardware ──
  { id: "ibm",         name: "IBM",         abbr: "IBM",  color: "#006699", bg: "#eef4ff", domain: "ibm.com" },
  { id: "oracle",      name: "Oracle",      abbr: "Or",   color: "#F80000", bg: "#fff0f0", domain: "oracle.com" },
  { id: "salesforce",  name: "Salesforce",  abbr: "Sf",   color: "#00A1E0", bg: "#eefaff", domain: "salesforce.com" },
  { id: "sap",         name: "SAP",         abbr: "SAP",  color: "#0070F2", bg: "#eef4ff", domain: "sap.com" },
  { id: "adobe",       name: "Adobe",       abbr: "Ad",   color: "#FA0F00", bg: "#fff0f0", domain: "adobe.com" },
  { id: "intel",       name: "Intel",       abbr: "In",   color: "#0071C5", bg: "#eef4ff", domain: "intel.com" },
  { id: "nvidia",      name: "NVIDIA",      abbr: "NV",   color: "#76B900", bg: "#f2ffe8", domain: "nvidia.com" },
  { id: "samsung",     name: "Samsung",     abbr: "Sm",   color: "#1428A0", bg: "#eef0ff", domain: "samsung.com" },
  { id: "qualcomm",    name: "Qualcomm",    abbr: "Qc",   color: "#3253DC", bg: "#eef2ff", domain: "qualcomm.com" },
  { id: "cisco",       name: "Cisco",       abbr: "Ci",   color: "#049FD9", bg: "#eefaff", domain: "cisco.com" },
  { id: "vmware",      name: "VMware",      abbr: "Vm",   color: "#717074", bg: "#f5f5f5", domain: "vmware.com" },
  { id: "dell",        name: "Dell",        abbr: "Dl",   color: "#007DB8", bg: "#eef4ff", domain: "dell.com" },
  { id: "hp",          name: "HP",          abbr: "HP",   color: "#0096D6", bg: "#eef8ff", domain: "hp.com" },
  // ── Consulting & IT Services ──
  { id: "accenture",   name: "Accenture",   abbr: "Ac",   color: "#A100FF", bg: "#f5eeff", domain: "accenture.com" },
  { id: "deloitte",    name: "Deloitte",    abbr: "Dt",   color: "#86BC25", bg: "#f2ffe8", domain: "deloitte.com" },
  { id: "ey",          name: "EY",          abbr: "EY",   color: "#FFE600", bg: "#fffde8", domain: "ey.com" },
  { id: "pwc",         name: "PwC",         abbr: "PwC",  color: "#D04A02", bg: "#fff2ee", domain: "pwc.com" },
  { id: "kpmg",        name: "KPMG",        abbr: "KP",   color: "#00338D", bg: "#eef0ff", domain: "kpmg.com" },
  { id: "mckinsey",    name: "McKinsey",    abbr: "Mc",   color: "#003C71", bg: "#eef2ff", domain: "mckinsey.com" },
  { id: "bcg",         name: "BCG",         abbr: "BCG",  color: "#2A8C00", bg: "#eefde8", domain: "bcg.com" },
  { id: "tcs",         name: "TCS",         abbr: "TCS",  color: "#0D2C6C", bg: "#eef0ff", domain: "tcs.com" },
  { id: "infosys",     name: "Infosys",     abbr: "If",   color: "#007CC3", bg: "#eef8ff", domain: "infosys.com" },
  { id: "wipro",       name: "Wipro",       abbr: "Wp",   color: "#431D7C", bg: "#f3eeff", domain: "wipro.com" },
  { id: "hcl",         name: "HCL Tech",    abbr: "HCL",  color: "#0078D4", bg: "#eef4ff", domain: "hcltech.com" },
  { id: "cognizant",   name: "Cognizant",   abbr: "Cg",   color: "#0033A1", bg: "#eef0ff", domain: "cognizant.com" },
  { id: "capgemini",   name: "Capgemini",   abbr: "Cp",   color: "#0070AD", bg: "#eef4ff", domain: "capgemini.com" },
  { id: "techm",       name: "Tech Mahindra", abbr: "TM", color: "#6F2C91", bg: "#f3eeff", domain: "techmahindra.com" },
  { id: "ltimindtree", name: "LTIMindtree", abbr: "LT",   color: "#0066B3", bg: "#eef4ff", domain: "ltimindtree.com" },
  { id: "mphasis",     name: "Mphasis",     abbr: "Mp",   color: "#1A237E", bg: "#eef0ff", domain: "mphasis.com" },
  // ── Banking & Finance ──
  { id: "goldmansachs",name: "Goldman Sachs",abbr: "GS",  color: "#6F9FD8", bg: "#eef4ff", domain: "goldmansachs.com" },
  { id: "jpmorgan",    name: "JPMorgan",    abbr: "JP",   color: "#003A70", bg: "#eef2ff", domain: "jpmorgan.com" },
  { id: "morgan",      name: "Morgan Stanley",abbr: "MS", color: "#003986", bg: "#eef2ff", domain: "morganstanley.com" },
  { id: "visa",        name: "Visa",        abbr: "Vi",   color: "#1A1F71", bg: "#eef0ff", domain: "visa.com" },
  { id: "mastercard",  name: "Mastercard",  abbr: "Mc",   color: "#EB001B", bg: "#fff0f0", domain: "mastercard.com" },
  // ── Fintech & Payments ──
  { id: "stripe",      name: "Stripe",      abbr: "St",   color: "#635bff", bg: "#f2f1ff", domain: "stripe.com" },
  { id: "paypal",      name: "PayPal",      abbr: "PP",   color: "#003087", bg: "#eef0ff", domain: "paypal.com" },
  { id: "razorpay",    name: "Razorpay",    abbr: "Rz",   color: "#2D67F6", bg: "#eef4ff", domain: "razorpay.com" },
  { id: "phonepe",     name: "PhonePe",     abbr: "Ph",   color: "#5F259F", bg: "#f3eeff", domain: "phonepe.com" },
  { id: "paytm",       name: "Paytm",       abbr: "Pt",   color: "#00BAF2", bg: "#eefaff", domain: "paytm.com" },
  { id: "cred",        name: "CRED",        abbr: "CR",   color: "#D4D4D4", bg: "#f5f5f5", domain: "cred.club" },
  { id: "groww",       name: "Groww",       abbr: "Gw",   color: "#5367FF", bg: "#eef2ff", domain: "groww.in" },
  { id: "zerodha",     name: "Zerodha",     abbr: "Ze",   color: "#387ED1", bg: "#eef4ff", domain: "zerodha.com" },
  // ── E-Commerce & Consumer India ──
  { id: "flipkart",    name: "Flipkart",    abbr: "F",    color: "#F74D01", bg: "#fff4ee", domain: "flipkart.com" },
  { id: "swiggy",      name: "Swiggy",      abbr: "Sw",   color: "#FC8019", bg: "#fff6ee", domain: "swiggy.com" },
  { id: "zomato",      name: "Zomato",      abbr: "Zm",   color: "#E23744", bg: "#fff0f0", domain: "zomato.com" },
  { id: "meesho",      name: "Meesho",      abbr: "Me",   color: "#E3147C", bg: "#fff0f8", domain: "meesho.com" },
  { id: "myntra",      name: "Myntra",      abbr: "My",   color: "#FF3F6C", bg: "#fff0f4", domain: "myntra.com" },
  { id: "nykaa",       name: "Nykaa",       abbr: "Ny",   color: "#FC2779", bg: "#fff0f6", domain: "nykaa.com" },
  { id: "dream11",     name: "Dream11",     abbr: "D11",  color: "#D0021B", bg: "#fff0f0", domain: "dream11.com" },
  { id: "ola",         name: "Ola",         abbr: "Ol",   color: "#93C83E", bg: "#f2ffe8", domain: "olacabs.com" },
  { id: "jio",         name: "Jio",         abbr: "Jio",  color: "#0A3D91", bg: "#eef2ff", domain: "jio.com" },
  { id: "sharechat",   name: "ShareChat",   abbr: "Sc",   color: "#F54E32", bg: "#fff2ee", domain: "sharechat.com" },
  { id: "walmart",     name: "Walmart",     abbr: "Wm",   color: "#0071DC", bg: "#eef4ff", domain: "walmart.com" },
  // ── Global SaaS / Dev Tools / Cloud ──
  { id: "uber",        name: "Uber",        abbr: "Ub",   color: "#000000", bg: "#f5f5f5", domain: "uber.com" },
  { id: "atlassian",   name: "Atlassian",   abbr: "At",   color: "#0052CC", bg: "#eef4ff", domain: "atlassian.com" },
  { id: "spotify",     name: "Spotify",     abbr: "Sp",   color: "#1DB954", bg: "#eefde8", domain: "spotify.com" },
  { id: "twitter",     name: "X (Twitter)", abbr: "X",    color: "#000000", bg: "#f5f5f5", domain: "x.com" },
  { id: "linkedin",    name: "LinkedIn",    abbr: "Li",   color: "#0A66C2", bg: "#eef4ff", domain: "linkedin.com" },
  { id: "slack",       name: "Slack",       abbr: "Sl",   color: "#4A154B", bg: "#f3eeff", domain: "slack.com" },
  { id: "github",      name: "GitHub",      abbr: "GH",   color: "#181717", bg: "#f5f5f5", domain: "github.com" },
  { id: "shopify",     name: "Shopify",     abbr: "Sh",   color: "#96BF48", bg: "#f2ffe8", domain: "shopify.com" },
  { id: "freshworks",  name: "Freshworks",  abbr: "Fw",   color: "#F26522", bg: "#fff4ee", domain: "freshworks.com" },
  { id: "zoho",        name: "Zoho",        abbr: "Zo",   color: "#C8202B", bg: "#fff0f0", domain: "zoho.com" },
  { id: "browserstack",name: "BrowserStack",abbr: "Bs",   color: "#F5A623", bg: "#fff8ee", domain: "browserstack.com" },
  // ── Data & AI Platforms ──
  { id: "databricks",  name: "Databricks",  abbr: "Db",   color: "#FF3621", bg: "#fff2ee", domain: "databricks.com" },
  { id: "snowflake",   name: "Snowflake",   abbr: "Sn",   color: "#29B5E8", bg: "#eefaff", domain: "snowflake.com" },
  { id: "mongodb",     name: "MongoDB",     abbr: "Mg",   color: "#47A248", bg: "#eefde8", domain: "mongodb.com" },
  { id: "twilio",      name: "Twilio",      abbr: "Tw",   color: "#F22F46", bg: "#fff0f2", domain: "twilio.com" },
  { id: "notion",      name: "Notion",      abbr: "No",   color: "#000000", bg: "#f5f5f5", domain: "notion.so" },
];

const topMentors = [
  {
    id: "m1",
    name: "Rahul Kumar",
    role: "Senior SDE",
    company: "Google",
    rating: 4.9,
    reviews: 212,
    bio: "7 YOE in Backend, System Design & DSA. Mentored 80+ students into FAANG roles.",
    tags: ["System Design", "Java", "DSA"],
    gradient: "from-blue-500/30 to-indigo-600/20",
    badge: "Top Rated",
  },
  {
    id: "m2",
    name: "Priya Nair",
    role: "Principal Engineer",
    company: "Microsoft",
    rating: 4.9,
    reviews: 318,
    bio: "10+ YOE across Azure, .NET & Cloud Architecture. IIT Delhi alumna.",
    tags: ["Cloud", ".NET", "Azure"],
    gradient: "from-cyan-500/30 to-blue-600/20",
    badge: "Top Rated",
  },
  {
    id: "m3",
    name: "Vikram Sharma",
    role: "Engineering Manager",
    company: "Amazon",
    rating: 4.8,
    reviews: 174,
    bio: "Led 15-engineer teams on AWS services. Expert in LLD, HLD & leadership skills.",
    tags: ["AWS", "Leadership", "HLD"],
    gradient: "from-orange-500/30 to-amber-600/20",
    badge: "🏆 Hall of Fame",
  },
  {
    id: "m4",
    name: "Anjali Mehra",
    role: "Staff Engineer",
    company: "Meta",
    rating: 4.9,
    reviews: 256,
    bio: "Full-stack & React Native expert. Helps with Frontend interviews & portfolio reviews.",
    tags: ["React", "Frontend", "Portfolio"],
    gradient: "from-purple-500/30 to-pink-600/20",
    badge: "Top Rated",
  },
  {
    id: "m5",
    name: "Suresh Patel",
    role: "Senior Data Engineer",
    company: "Flipkart",
    rating: 4.8,
    reviews: 143,
    bio: "Spark, Kafka, Databricks expert. Placed 50+ in Data Eng & Analytics roles.",
    tags: ["Data Engineering", "Spark", "SQL"],
    gradient: "from-yellow-500/30 to-orange-600/20",
    badge: null,
  },
  {
    id: "m6",
    name: "Neha Kapoor",
    role: "DevOps Lead",
    company: "IBM",
    rating: 4.7,
    reviews: 98,
    bio: "CI/CD, Kubernetes & Docker expert with 8 YOE. Loves open-source contributions.",
    tags: ["DevOps", "Kubernetes", "CI/CD"],
    gradient: "from-teal-500/30 to-cyan-600/20",
    badge: null,
  },
  {
    id: "m7",
    name: "Arjun Reddy",
    role: "ML Engineer",
    company: "Google",
    rating: 4.9,
    reviews: 189,
    bio: "ML & GenAI specialist. Helped 60+ transition to ML roles from software backgrounds.",
    tags: ["ML", "GenAI", "Python"],
    gradient: "from-green-500/30 to-emerald-600/20",
    badge: "🏆 Hall of Fame",
  },
  {
    id: "m8",
    name: "Kavita Singh",
    role: "Product Manager",
    company: "Microsoft",
    rating: 4.8,
    reviews: 167,
    bio: "MBA IIM A. Ex-SDE turned PM. Expert in PM interviews, roadmaps & case studies.",
    tags: ["Product", "PM Interview", "Case Study"],
    gradient: "from-rose-500/30 to-pink-600/20",
    badge: null,
  },
];

const programs = [
  { icon: "🎯", title: "1:1 Weekly Sessions", desc: "Dedicated 60-min sessions every week, focused on your exact goals." },
  { icon: "💻", title: "Live Code Reviews", desc: "Get async and live feedback on your GitHub repos and projects." },
  { icon: "🗂️", title: "Resume & LinkedIn", desc: "ATS-optimized resume rewrites + LinkedIn profile overhauls." },
  { icon: "🎤", title: "Mock Interviews", desc: "Technical + HR practice rounds with detailed STAR feedback." },
  { icon: "📈", title: "Career Strategy", desc: "Personalized roadmap, salary negotiation and offer decisions." },
  { icon: "🤝", title: "Direct Referrals", desc: "Warm intros and referrals to 600+ partner company recruiters." },
];

function MentorshipProgram() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = topMentors.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <SiteShell>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-radial-brand opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-14 sm:px-6 lg:px-8">
          <Link
            to="/smart-hub"
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Smart Hub
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
            <Sparkles className="h-3 w-3" /> Main Feature #2
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Perfect{" "}
            <span className="text-gradient-brand">Mentor</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Get matched 1:1 with senior engineers from Google, Amazon, Microsoft and top companies. Weekly sessions, code reviews, resume help and direct placement referrals.
          </p>
          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { v: "1,200+", l: "Senior Mentors" },
              { v: "8k+", l: "Active Mentees" },
              { v: "4.9★", l: "Avg Rating" },
              { v: "93%", l: "Placed in 6 Months" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-gradient-brand text-2xl font-bold font-display">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">

        {/* ── Search ── */}
        <div className="relative mx-auto max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by Name, Company or Skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border/80 bg-card/60 py-3.5 pl-12 pr-6 text-sm outline-none focus:border-[var(--brand)] shadow-lg backdrop-blur-xl"
          />
        </div>

        {/* ── Mentors from Top Companies ── */}
        <div>
          <div className="mb-1 flex items-center gap-3 border-l-4 border-l-[var(--brand)] pl-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Mentors from Top Companies</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground pl-7 mb-8">Click a company to browse mentors from that organisation.</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
            {topCompanies.map((c) => (
              <Link
                key={c.id}
                to="/mentorship-program/$companyId"
                params={{ companyId: c.id }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer hover:border-[var(--brand)]/50"
              >
                {/* Company logo container */}
                <div
                  className="relative grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 overflow-hidden bg-white/95 p-2 shadow-inner"
                  style={{ border: `1px solid ${c.color}40` }}
                >
                  <img
                    src={`https://logo.clearbit.com/${c.domain}`}
                    alt={c.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes("google.com")) {
                        target.src = `https://www.google.com/s2/favicons?sz=128&domain=${c.domain}`;
                      } else {
                        target.style.display = "none";
                        const fallback = target.nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = "flex";
                      }
                    }}
                    className="h-full w-full object-contain transition-all duration-300 group-hover:scale-105"
                  />
                  {/* Fallback Text Badge */}
                  <span
                    className="absolute inset-0 hidden items-center justify-center text-sm font-bold tracking-wider select-none bg-card"
                    style={{ color: c.color }}
                  >
                    {c.abbr}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-gradient-brand transition-colors">
                  {c.name}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Top Mentors Grid ── */}
        <div>
          <div className="mb-8 flex items-center gap-3 border-l-4 border-l-[var(--brand-2)] pl-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Featured Mentors</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((m) => (
              <div
                key={m.id}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${m.gradient} p-5 transition-all hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-card/80 text-sm font-bold text-foreground">
                    {m.name.split(" ").map((x) => x[0]).join("")}
                  </div>
                  {m.badge && (
                    <span className="rounded-full bg-card/70 px-2 py-0.5 text-[10px] font-bold text-foreground">
                      {m.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-base font-bold text-foreground">{m.name}</h3>
                <div className="text-xs text-muted-foreground">{m.role} · {m.company}</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-400">{m.rating}</span>
                  <span className="text-muted-foreground">({m.reviews})</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => toast.success(`Booking session with ${m.name}...`)}
                  className="mt-4 w-full rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/8 py-2 text-xs font-semibold text-[var(--brand)] transition-all hover:bg-[var(--brand)] hover:text-white cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-8 text-center text-muted-foreground text-sm">
                No mentors found matching "{search}".
              </div>
            )}
          </div>
        </div>

        {/* ── Programs / How it works ── */}
        <div>
          <div className="mb-8 flex items-center gap-3 border-l-4 border-l-[var(--brand-3)] pl-4">
            <h2 className="font-display text-2xl font-bold text-foreground">What You Get</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-5 flex gap-4 items-start">
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <div className="font-display text-sm font-bold text-foreground">{p.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </SiteShell>
  );
}
