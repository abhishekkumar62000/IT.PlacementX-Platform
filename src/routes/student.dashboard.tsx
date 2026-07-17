import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, User, BookOpen, Map, FolderKanban, Award,
  FileText, Bell, MessageSquare, Settings, LogOut, TrendingUp,
  CheckCircle2, Clock, Zap, Target, Star, ArrowRight, Rocket,
  AlertCircle, ChevronRight, BarChart3, Users, Calendar,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { traineeService, calcProfileCompletion, type TraineeProfile } from "@/services/traineeService";
import { toast } from "sonner";

export const Route = createFileRoute("/student/dashboard")({
  head: () => ({
    meta: [
      { title: "Trainee Dashboard — ITPlacementX" },
      { name: "description", content: "Your personal AI-powered career acceleration dashboard." },
    ],
  }),
  component: TraineeDashboard,
});

// ─── Sidebar Items ────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/student/dashboard", active: true },
  { label: "My Profile", icon: User, to: "/trainee/profile" },
  { label: "Learning", icon: BookOpen, to: "#" },
  { label: "Career Roadmap", icon: Map, to: "#" },
  { label: "Projects", icon: FolderKanban, to: "#" },
  { label: "Certificates", icon: Award, to: "#" },
  { label: "Resume", icon: FileText, to: "#" },
  { label: "Notifications", icon: Bell, to: "#" },
  { label: "Messages", icon: MessageSquare, to: "#" },
  { label: "Settings", icon: Settings, to: "#" },
];

const QUICK_ACTIONS = [
  { label: "Complete Profile", icon: User, color: "from-orange-500 to-amber-400", to: "/trainee/profile" },
  { label: "Upload Resume", icon: FileText, color: "from-blue-500 to-cyan-400", to: "/trainee/profile" },
  { label: "View Roadmap", icon: Map, color: "from-emerald-500 to-teal-400", to: "#" },
  { label: "Start Learning", icon: BookOpen, color: "from-purple-500 to-violet-400", to: "#" },
];

// ─── Component ────────────────────────────────────────────────────────────────
function TraineeDashboard() {
  const { currentUser, appUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<TraineeProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route
  useEffect(() => {
    if (!loading) {
      if (!currentUser) navigate({ to: "/login" });
    }
  }, [currentUser, loading]);

  // Load Firestore trainee profile
  useEffect(() => {
    if (currentUser?.uid) {
      traineeService
        .getProfile(currentUser.uid)
        .then((data) => setProfile(data))
        .catch(() => toast.error("Could not load profile data."))
        .finally(() => setProfileLoading(false));
    }
  }, [currentUser]);

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#03060a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin" />
          <p className="text-sm text-white/40">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const name = appUser?.fullName || "Trainee";
  const firstName = name.split(" ")[0];
  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();
  const completion = profile ? calcProfileCompletion(profile) : 0;
  const completionColor =
    completion >= 80 ? "text-emerald-400" : completion >= 50 ? "text-amber-400" : "text-red-400";
  const completionBarColor =
    completion >= 80 ? "from-emerald-500 to-teal-400" : completion >= 50 ? "from-amber-500 to-orange-400" : "from-red-500 to-orange-400";

  async function handleLogout() {
    await logout();
    toast.success("Logged out successfully.");
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-[#03060a] text-white flex overflow-hidden">
      {/* ── SIDEBAR ─────────────────────────────────────── */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 flex flex-col border-r border-white/5 bg-[#060b14]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="h-9 w-9 rounded-xl bg-white p-1 shadow">
            <img src="/our-logo.jpeg" alt="Logo" className="h-full w-full rounded-lg object-contain" />
          </div>
          <div>
            <div className="text-sm font-black text-white">
              IT.Placement<span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">X</span>
            </div>
            <div className="text-[8px] tracking-widest uppercase text-white/30">Trainee Portal</div>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-3 mt-4 rounded-2xl border border-white/5 bg-gradient-to-br from-orange-500/10 to-emerald-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-sm font-black text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">{name}</div>
              <div className="text-[9px] text-white/40 truncate">{appUser?.email}</div>
              <span className="mt-1 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-emerald-400">
                Trainee
              </span>
            </div>
          </div>
          {/* Profile completion mini bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-white/40">Profile</span>
              <span className={`text-[9px] font-black ${completionColor}`}>{completion}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${completionBarColor} transition-all duration-700`}
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map(({ label, icon: Icon, to, active }) => (
            <Link
              key={label}
              to={to as any}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all group ${
                active
                  ? "bg-gradient-to-r from-orange-500/15 to-emerald-500/10 text-white border border-white/5"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-orange-400" : "text-white/30 group-hover:text-white/60"}`} />
              {label}
              {label === "My Profile" && completion < 100 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-[9px] font-black text-orange-400">!</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/5 bg-[#03060a]/80 backdrop-blur-xl px-4 lg:px-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-xs text-white/30 lg:hidden">
            <span className="font-bold text-white/70">Dashboard</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-[8px] font-black text-white flex items-center justify-center">3</span>
            </button>
            {/* Profile avatar */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-xs font-black text-white">
                {initials}
              </div>
              <span className="hidden sm:block text-xs font-bold text-white">{firstName}</span>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
          {/* Welcome */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Dashboard Active
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Welcome back, <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">{firstName}</span> 👋
              </h1>
              <p className="text-white/40 text-sm mt-1">Here's your career acceleration overview.</p>
            </div>
            <Link
              to="/trainee/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 px-4 py-2.5 text-sm font-black text-white shadow-lg hover:scale-105 transition-all shrink-0"
            >
              {completion < 100 ? "Complete Profile" : "View Profile"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Profile Completion Alert */}
          {completion < 60 && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
              <AlertCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white">Complete your profile to unlock all features</div>
                <div className="text-xs text-white/50 mt-0.5">Your profile is {completion}% complete. Add more details to improve your chances of placement.</div>
              </div>
              <Link to="/trainee/profile" className="shrink-0 rounded-lg bg-orange-500/20 px-3 py-1.5 text-xs font-bold text-orange-400 hover:bg-orange-500/30 transition-colors">
                Update →
              </Link>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Profile Score", value: `${completion}%`, delta: "Complete your profile", icon: Target, color: "orange" },
              { label: "Skill Match", value: "—", delta: "Add skills to calculate", icon: BarChart3, color: "blue" },
              { label: "Projects", value: String(profile?.projects?.length ?? 0), delta: "Live projects built", icon: FolderKanban, color: "emerald" },
              { label: "Certificates", value: String(profile?.certificates?.length ?? 0), delta: "Earned certifications", icon: Award, color: "amber" },
            ].map(({ label, value, delta, icon: Icon, color }) => (
              <div key={label} className={`relative rounded-2xl border bg-white/5 p-5 overflow-hidden transition-all hover:bg-white/8 hover:scale-[1.02] border-white/10`}>
                <div className={`absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-xl bg-${color}-500/10`}>
                  <Icon className={`h-4 w-4 text-${color}-400`} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">{label}</div>
                <div className="text-3xl font-black text-white">{value}</div>
                <div className={`text-xs text-${color}-400 mt-1.5 font-semibold`}>{delta}</div>
              </div>
            ))}
          </div>

          {/* Middle Row */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            {/* Profile Completion Card */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-base font-black text-white">Profile Completion</div>
                  <div className="text-xs text-white/40 mt-0.5">Fill in details to improve your placement chances</div>
                </div>
                <span className={`text-2xl font-black ${completionColor}`}>{completion}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden mb-5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${completionBarColor} transition-all duration-1000`}
                  style={{ width: `${completion}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Basic Info", done: !!profile?.phone && !!profile?.city },
                  { label: "Education", done: !!profile?.graduation?.college || !!profile?.twelfth?.school },
                  { label: "Career Goal", done: !!profile?.desiredJobRole },
                  { label: "Skills", done: (profile?.programmingLanguages?.length ?? 0) > 0 },
                  { label: "Projects", done: (profile?.projects?.length ?? 0) > 0 },
                  { label: "Resume", done: !!profile?.resumeHeadline },
                  { label: "Social Links", done: !!profile?.linkedin || !!profile?.github },
                  { label: "Achievements", done: (profile?.certificates?.length ?? 0) > 0 },
                  { label: "Preferences", done: !!profile?.preferredTechnology },
                ].map(({ label, done }) => (
                  <div key={label} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${done ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-white/5 bg-white/3 text-white/30"}`}>
                    <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${done ? "text-emerald-400" : "text-white/20"}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-base font-black text-white mb-4">Quick Actions</div>
              <div className="space-y-2.5">
                {QUICK_ACTIONS.map(({ label, icon: Icon, color, to }) => (
                  <Link
                    key={label}
                    to={to as any}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-4 py-3 hover:bg-white/8 transition-all group"
                  >
                    <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${color} shrink-0`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white/70 group-hover:text-white flex-1">{label}</span>
                    <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Recent Activity */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-base font-black text-white">Recent Activity</div>
                <Clock className="h-4 w-4 text-white/30" />
              </div>
              <div className="space-y-3">
                {[
                  { text: "Account created successfully", time: "Just now", icon: CheckCircle2, color: "text-emerald-400" },
                  { text: "Profile setup started", time: "Now", icon: User, color: "text-blue-400" },
                  { text: "Dashboard accessed", time: "Now", icon: LayoutDashboard, color: "text-orange-400" },
                ].map(({ text, time, icon: Icon, color }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5`}>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white/70">{text}</div>
                      <div className="text-[10px] text-white/30">{time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Features */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-base font-black text-white">Upcoming</div>
                <Calendar className="h-4 w-4 text-white/30" />
              </div>
              <div className="space-y-3">
                {[
                  { label: "AI Roadmap Generation", badge: "Soon", color: "bg-purple-500/20 text-purple-400" },
                  { label: "Mock Interview Practice", badge: "Soon", color: "bg-blue-500/20 text-blue-400" },
                  { label: "Live Mentor Sessions", badge: "Coming", color: "bg-orange-500/20 text-orange-400" },
                  { label: "Resume ATS Checker", badge: "Coming", color: "bg-emerald-500/20 text-emerald-400" },
                ].map(({ label, badge, color }) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 px-3 py-2.5">
                    <span className="text-xs font-semibold text-white/60">{label}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wider ${color}`}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Accelerator CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-emerald-500/10 p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-emerald-500 mb-4">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <div className="text-base font-black text-white mb-2">Accelerate Your Career</div>
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  Complete your profile to unlock AI-powered career roadmap, mentor matching, and placement pipeline.
                </p>
                <Link
                  to="/trainee/profile"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 px-4 py-2 text-xs font-black text-white shadow hover:scale-105 transition-all"
                >
                  Build Profile <Zap className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
