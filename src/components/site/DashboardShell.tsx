import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { BrandMark } from "@/components/site/SiteShell";
import { GraduationCap, Briefcase, Users, Building2, Shield, Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function DashboardShell({ title, subtitle, children, sidebar }: { title: string; subtitle?: string; children: ReactNode; sidebar?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      navigate({ to: "/login" });
    } catch (e: any) {
      toast.error("Error logging out.");
    }
  };

  // Define role based routes switcher
  const getRolesForHeader = () => {
    if (!userProfile) return [];
    
    if (userProfile.role === "admin") {
      return [
        { to: "/student/dashboard", label: "Student View", icon: GraduationCap },
        { to: "/trainer/dashboard", label: "Trainer View", icon: Users },
        { to: "/admin/dashboard", label: "Admin Panel", icon: Shield },
      ];
    }
    
    if (userProfile.role === "trainer") {
      return [
        { to: "/trainer/dashboard", label: "Trainer Console", icon: Users }
      ];
    }
    
    return [
      { to: "/student/dashboard", label: "Student Dashboard", icon: GraduationCap }
    ];
  };

  const headerRoles = getRolesForHeader();
  const initials = userProfile?.name
    ? userProfile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4">
          <BrandMark />
          <div className="relative ml-4 hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search projects, mentors, jobs..." className="w-full rounded-xl border border-border bg-card/60 py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[var(--brand)] transition-colors" />
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <button className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-card/30 hover:bg-card/70 transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            
            {/* User Profile Info */}
            <div className="flex items-center gap-2 pl-2 border-l border-border/60">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-[var(--brand-3)] to-[var(--brand-2)] text-xs font-semibold text-white shadow-md shadow-brand/10">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-medium leading-none text-foreground">{userProfile?.name || "Loading..."}</span>
                <span className="text-[10px] text-muted-foreground capitalize leading-none mt-1">{userProfile?.role || "User"}</span>
              </div>
              <button 
                onClick={handleLogout}
                title="Log Out"
                className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-card/30 text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all ml-1"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs based on Role */}
        {headerRoles.length > 0 && (
          <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-4 pb-2 text-sm border-t border-border/20 pt-2">
            {headerRoles.map((r) => {
              const Icon = r.icon;
              return (
                <Link 
                  key={r.to} 
                  to={r.to} 
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "bg-white/8! text-foreground!" }}
                  activeOptions={{ exact: false }}
                >
                  <Icon className="h-3.5 w-3.5" /> {r.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>
      
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="glass rounded-2xl p-4 border border-border/60">{sidebar}</div>
        </aside>
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold sm:text-3xl tracking-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function SideNav({ items }: { items: { label: string; icon: React.ComponentType<{ className?: string }>; active?: boolean }[] }) {
  return (
    <nav className="space-y-1.5 text-sm">
      {items.map((i) => (
        <a 
          key={i.label} 
          href="#" 
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium transition-all ${
            i.active 
              ? "bg-white/8 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          }`}
        >
          <i.icon className="h-4 w-4" /> {i.label}
        </a>
      ))}
    </nav>
  );
}

export function StatCard({ label, value, delta, tone = "brand" }: { label: string; value: string; delta?: string; tone?: "brand" | "success" | "warning" }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-5 hover:border-border transition-all duration-300">
      <div className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
      {delta && <div className={`text-xs mt-1.5 font-medium ${tone === "success" ? "text-emerald-400" : tone === "warning" ? "text-amber-400" : "text-[var(--brand)]"}`}>{delta}</div>}
    </div>
  );
}

export function Panel({ title, subtitle, right, children }: { title: string; subtitle?: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/30 p-5 hover:border-border transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-display text-base font-semibold tracking-tight text-foreground">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function ProgressBar({ value, tone = "brand" }: { value: number; tone?: "brand" | "success" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <div className={`h-full rounded-full transition-all duration-500 ${tone === "success" ? "bg-emerald-400" : "bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)]"}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function MiniChart({ points, color = "oklch(0.72 0.17 235)" }: { points: number[]; color?: string }) {
  const max = Math.max(...points), w = 320, h = 80, step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / max) * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-20 w-full">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={color} opacity="0.1" className="animate-pulse" />
      <path d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}