import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { Menu, X, ArrowRight, Github, Linkedin, Twitter, Youtube, Activity, LogOut, ChevronDown, User, LayoutDashboard } from "lucide-react";
import { useAuth, getRoleColor, getRoleDashboard } from "@/context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/features", label: "Features" },
  { to: "/smart-hub", label: "Smart Hub" },
  { to: "/programs", label: "Programs" },
  { to: "/contact", label: "Contact" },
] as const;

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-md bg-white p-0.5 shadow-sm transition-transform group-hover:scale-105">
        <img 
          src="/our-logo.jpeg" 
          alt="IT.PlacementX Logo" 
          className="h-full w-full object-contain" 
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-display text-xs sm:text-[13.5px] font-black tracking-tight text-white leading-none">
          IT.Placement<span className="text-gradient-brand">X</span>
        </span>
        <span className="text-[6px] sm:text-[7px] font-bold tracking-[0.16em] text-[#cbd5e1] uppercase mt-0.5 hidden sm:inline-block">
          India's Smart AI Career Hub
        </span>
        <span className="text-[6px] font-bold tracking-[0.1em] text-[#cbd5e1] uppercase mt-0.5 sm:hidden">
          Smart AI Hub
        </span>
      </div>
    </Link>
  );
}

// ─── Auth-aware Profile / Login button ────────────────────────────────────
function NavAuthButton() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!currentUser) {
    return (
      <Link
        to="/login"
        className="relative overflow-hidden inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff9b3f] via-[#ffba5a] to-[#10b981] px-6 py-2.5 text-[9.5px] font-black uppercase tracking-[0.2em] text-[#060b13] shadow-[0_0_15px_rgba(251,146,60,0.2)] hover:shadow-[0_0_22px_rgba(16,185,129,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 group"
      >
        <span className="absolute inset-0 w-full h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        <span className="relative z-10 flex items-center gap-1.5">
          Login <ArrowRight className="h-3 w-3 stroke-[3px] group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </Link>
    );
  }

  const initials = currentUser.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const roleLabel = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
  const roleBadgeClass = getRoleColor(currentUser.role);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setDropOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
      >
        {/* Avatar circle */}
        <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-xs font-black text-white shadow-[0_0_12px_-2px_rgba(249,115,22,0.5)]">
          {initials}
        </div>
        <div className="hidden xl:flex flex-col items-start">
          <span className="text-[10px] font-bold text-white leading-none truncate max-w-[80px]">{currentUser.name.split(" ")[0]}</span>
          <span className={`text-[8px] font-black tracking-wide uppercase mt-0.5 px-1.5 py-0.5 rounded-full border ${roleBadgeClass}`}>{roleLabel}</span>
        </div>
        <ChevronDown className={`h-3 w-3 text-white/40 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {dropOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-white/10 bg-[#0d1421]/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50">
          {/* User info header */}
          <div className="px-4 pt-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-sm font-black text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-white/40 truncate">{currentUser.email}</div>
                <span className={`mt-1 inline-block text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${roleBadgeClass}`}>{roleLabel}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="p-2">
            <button
              onClick={() => { setDropOpen(false); navigate({ to: getRoleDashboard(currentUser.role) }); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4 text-orange-400" />
              My Dashboard
            </button>
            <button
              onClick={() => { setDropOpen(false); navigate({ to: "/login" }); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
            >
              <User className="h-4 w-4 text-blue-400" />
              Profile Settings
            </button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-white/5">
            <button
              onClick={() => { logout(); setDropOpen(false); navigate({ to: "/" }); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Auth Button ─────────────────────────────────────────────────────
function MobileAuthSection({ onClose }: { onClose: () => void }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <Link
        to="/login"
        onClick={onClose}
        className="relative overflow-hidden flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff9b3f] via-[#ffba5a] to-[#10b981] w-full py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-[#060b13] shadow-[0_0_25px_rgba(251,146,60,0.25)] group hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <span className="absolute inset-0 w-full h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        <span className="relative z-10 flex items-center gap-2">
          Login <ArrowRight className="h-4 w-4 stroke-[3px]" />
        </span>
      </Link>
    );
  }

  const initials = currentUser.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const roleLabel = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
  const roleBadgeClass = getRoleColor(currentUser.role);

  return (
    <div className="space-y-2">
      {/* Profile card */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-base font-black text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white truncate">{currentUser.name}</div>
          <div className="text-[10px] text-white/40 truncate">{currentUser.email}</div>
          <span className={`mt-1 inline-block text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${roleBadgeClass}`}>{roleLabel}</span>
        </div>
      </div>
      <button
        onClick={() => { onClose(); navigate({ to: getRoleDashboard(currentUser.role) }); }}
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
      >
        <LayoutDashboard className="h-4 w-4 text-orange-400" /> My Dashboard
      </button>
      <button
        onClick={() => { logout(); onClose(); navigate({ to: "/" }); }}
        className="flex w-full items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3.5 text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/40">
      {/* Top Banner Ticker */}
      <div className="w-full bg-[#03060a] py-1.5 px-3 sm:px-4 overflow-hidden border-b border-white/5 relative z-50">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-[8px] sm:text-[9.5px] font-semibold tracking-[0.16em] text-white w-full">
          <div className="flex items-center gap-1.5 text-amber-500 animate-pulse shrink-0">
            <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </div>
          
          <div className="flex flex-1 items-center justify-center gap-3 md:gap-5 text-center truncate md:flex-wrap md:whitespace-normal px-2">
            <span className="text-slate-200 font-extrabold uppercase truncate">
              <span className="md:hidden tracking-[0.1em]">INDIA'S 1ST AI-POWERED IT PLACEMENT PLATFORM</span>
              <span className="hidden md:inline">INDIA'S 1ST AI-POWERED IT CAREER & PLACEMENT ACCELERATION PLATFORM</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-emerald-400 font-extrabold uppercase">
              DESIGNED FOR CONTINUOUS MENTORSHIP & REAL-TIME PLACEMENTS!
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-200 font-extrabold uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">IT.PLACEMENTX</span> FOR BHARAT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-500 animate-pulse shrink-0">
            <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </div>
        </div>
      </div>
      {/* Dual Tone Separator Bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 shadow-[0_1px_5px_rgba(245,158,11,0.2)] relative z-50" />

      <div className="mx-auto flex h-14 lg:h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 relative z-50">
        <BrandMark />
        
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3.5 py-2 text-[10px] xl:text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400 transition-colors hover:text-white group"
              activeOptions={{ exact: l.to === "/" }}
            >
              {({ isActive }) => (
                <span className="relative flex items-center justify-center">
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-1/2 h-[2px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-emerald-500 shadow-[0_0_8px_#f97316] rounded-full" />
                  )}
                  {l.label === "Smart Hub" && (
                    <span className="absolute -top-3.5 -right-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-1 py-0.5 text-[6px] font-black text-white uppercase tracking-widest animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]">
                      NEW
                    </span>
                  )}
                  {/* Hover indicator */}
                  {!isActive && (
                    <span className="absolute -bottom-2.5 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-white/30 rounded-full transition-all duration-300 group-hover:w-1/2" />
                  )}
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="hidden lg:flex items-center gap-4">
          <NavAuthButton />
        </div>
        
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative z-50 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="absolute top-[100%] left-0 w-full border-b border-border/40 bg-[#0a0f18]/95 backdrop-blur-3xl lg:hidden shadow-2xl overflow-hidden z-40">
          <div className="mx-auto flex flex-col px-5 py-6 gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="relative flex items-center justify-between rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all active:scale-[0.98]"
                activeProps={{ className: "text-white bg-white/5 border border-white/5 shadow-inner" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
                {l.label === "Smart Hub" ? (
                  <span className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-1 text-[8px] font-black text-white uppercase tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)] animate-pulse">
                    NEW
                  </span>
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 opacity-30" />
                )}
              </Link>
            ))}
            
            <div className="mt-4 border-t border-white/5 pt-6 pb-2">
              <MobileAuthSection onClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const cols = [
    { title: "Product", links: [
      { to: "/features", label: "Features" },
      { to: "/programs", label: "Programs" },
      { to: "/ai-features", label: "AI Suite" },
      { to: "/pricing", label: "Pricing" },
    ]},
    { title: "Company", links: [
      { to: "/about", label: "About" },
      { to: "/mentors", label: "Mentors" },
      { to: "/companies", label: "Hiring Partners" },
      { to: "/success-stories", label: "Success Stories" },
    ]},
    { title: "Resources", links: [
      { to: "/blog", label: "Blog" },
      { to: "/faq", label: "FAQ" },
      { to: "/support", label: "Support" },
      { to: "/contact", label: "Contact" },
    ]},
    { title: "Legal", links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
      { to: "/careers", label: "Careers" },
    ]},
  ] as const;
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-6 lg:px-8">
        <div className="lg:col-span-2">
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI-powered career acceleration platform connecting students, professionals, senior mentors, and hiring companies in one ecosystem.
          </p>
          <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-md border border-border bg-card/60 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-[var(--brand)]"
            />
            <button className="rounded-md bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] px-4 py-2 text-sm font-medium text-white">
              Subscribe
            </button>
          </form>
          <div className="mt-6 flex gap-3 text-muted-foreground">
            {[Github, Linkedin, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border border-border transition-colors hover:text-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold text-foreground">{c.title}</div>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ITPlacementX. All rights reserved.</p>
          <p>Built for the industry-ready generation.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-radial-brand opacity-70" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" /> {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}