import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  Eye, EyeOff, Sparkles, ChevronDown, Loader2, AlertCircle,
  GraduationCap, Briefcase, Settings, CheckCircle2, Users, Brain, Rocket
} from "lucide-react";
import { useAuth, UserRole, UserGender, getRoleDashboard } from "@/context/AuthContext";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — ITPlacementX" },
      { name: "description", content: "Join ITPlacementX and accelerate your IT career with AI-powered mentorship." },
    ],
  }),
  component: Register,
});

const ROLES: { value: UserRole; label: string; icon: React.ElementType; description: string; color: string }[] = [
  { value: "trainee", label: "Trainee", icon: GraduationCap, description: "I want to learn & get placed", color: "emerald" },
  { value: "trainer", label: "Trainer", icon: Briefcase, description: "I mentor & teach students", color: "blue" },
  { value: "admin", label: "Admin", icon: Settings, description: "I manage the platform", color: "amber" },
];

const GENDERS: { value: UserGender; label: string; emoji: string }[] = [
  { value: "male", label: "Male", emoji: "👨" },
  { value: "female", label: "Female", emoji: "👩" },
  { value: "other", label: "Other", emoji: "🧑" },
  { value: "prefer-not-to-say", label: "Prefer not to say", emoji: "🤐" },
];

const LEFT_FEATURES = [
  { icon: Brain, text: "AI Career Coach & Roadmap" },
  { icon: Users, text: "1:1 Live Mentorship Sessions" },
  { icon: Rocket, text: "Real Production Projects" },
  { icon: CheckCircle2, text: "Guaranteed Placement Assistance" },
];

function Register() {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<UserRole>("trainee");
  const [gender, setGender] = useState<UserGender | "">("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRole = ROLES.find((r) => r.value === role)!;
  const selectedGender = GENDERS.find((g) => g.value === gender);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!email.trim()) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (!gender) return setError("Please select your gender.");

    setIsSubmitting(true);
    const result = await signUp({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      role,
      gender: gender as UserGender,
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate({ to: getRoleDashboard(role) });
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen flex bg-[#03060a] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0c2e] via-[#12123a] to-[#0a1628]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-emerald-500/10" />
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-white/10 bg-white p-1 shadow-lg">
            <img src="/our-logo.jpeg" alt="ITPlacementX" className="h-full w-full rounded-lg object-contain" />
          </div>
          <div>
            <div className="font-display text-base font-black text-white">
              IT.Placement<span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">X</span>
            </div>
            <div className="text-[8px] tracking-[0.2em] uppercase text-white/40">India's AI Career Platform</div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center my-auto">
          <div className="relative w-72 h-56 mb-8">
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <div className="ml-auto flex h-5 items-center rounded bg-white/5 px-2 text-[8px] text-white/30">dashboard.itplacementx.com</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { l: "ATS Score", v: "92%", c: "text-emerald-400" },
                  { l: "Skill Match", v: "78%", c: "text-blue-400" },
                  { l: "Interviews", v: "5", c: "text-orange-400" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg border border-white/5 bg-white/5 p-2 text-center">
                    <div className={`text-lg font-black ${s.c}`}>{s.v}</div>
                    <div className="text-[7px] text-white/40 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                <div className="text-[8px] font-bold text-white/50 mb-1.5">Career Growth Trajectory</div>
                <svg viewBox="0 0 200 30" className="w-full h-6">
                  <polyline points="0,28 20,22 40,18 60,15 80,10 100,8 120,5 140,4 160,3 180,2 200,1" fill="none" stroke="url(#rg)" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="rg" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white leading-tight mb-3">
            Join the Future of <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">IT Careers</span>
          </h2>
          <p className="text-sm text-white/50 max-w-xs leading-relaxed">
            Get AI-powered mentorship, live training from FAANG engineers, and guaranteed placement assistance.
          </p>

          <div className="mt-8 w-full max-w-xs space-y-3">
            {LEFT_FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-orange-500/20 to-emerald-500/20 text-orange-400">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center text-xs text-white/30">
          Trusted by 42,000+ learners across India
        </div>
      </div>

      {/* RIGHT PANEL — FORM */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-white p-1">
              <img src="/our-logo.jpeg" alt="ITPlacementX" className="h-full w-full rounded-lg object-contain" />
            </div>
            <div className="font-display text-lg font-black text-white">
              IT.Placement<span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">X</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white">
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Create</span>{" "}
              <span className="bg-gradient-to-r from-amber-300 to-emerald-400 bg-clip-text text-transparent">Account</span>
            </h1>
            <p className="mt-1 text-sm text-white/40">Start your journey to becoming industry-ready.</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="register-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
              autoComplete="name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-orange-500/50 focus:bg-white/8 focus:ring-2 focus:ring-orange-500/20"
            />

            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-orange-500/50 focus:bg-white/8 focus:ring-2 focus:ring-orange-500/20"
            />

            <div className="relative">
              <input
                id="register-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 characters)"
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-orange-500/50 focus:bg-white/8 focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Role + Gender Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Role */}
              <div className="relative">
                <div
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 cursor-pointer hover:border-white/20 transition-all"
                  onClick={() => { setRoleOpen((v) => !v); setGenderOpen(false); }}
                >
                  <div>
                    <span className="text-[8px] font-black tracking-[0.15em] uppercase text-orange-400">Type</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <selectedRole.icon className={`h-3.5 w-3.5 ${selectedRole.color === "emerald" ? "text-emerald-400" : selectedRole.color === "blue" ? "text-blue-400" : "text-amber-400"}`} />
                      <span className="text-xs font-bold text-white">{selectedRole.label}</span>
                    </div>
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 text-white/30 transition-transform ${roleOpen ? "rotate-180" : ""}`} />
                </div>
                {roleOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0d1421] backdrop-blur-xl shadow-2xl overflow-hidden z-50">
                    {ROLES.map((r) => {
                      const Icon = r.icon;
                      const colorClass = r.color === "emerald" ? "text-emerald-400" : r.color === "blue" ? "text-blue-400" : "text-amber-400";
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => { setRole(r.value); setRoleOpen(false); }}
                          className={`flex w-full items-start gap-3 px-3 py-3 text-xs transition-all cursor-pointer hover:bg-white/5 ${role === r.value ? "bg-white/5" : ""}`}
                        >
                          <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${colorClass}`} />
                          <div className="text-left">
                            <div className={`font-bold ${role === r.value ? colorClass : "text-white"}`}>{r.label}</div>
                            <div className="text-[9px] text-white/40">{r.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="relative">
                <div
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 cursor-pointer hover:border-white/20 transition-all"
                  onClick={() => { setGenderOpen((v) => !v); setRoleOpen(false); }}
                >
                  <div>
                    <span className="text-[8px] font-black tracking-[0.15em] uppercase text-emerald-400">Gender</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {selectedGender ? (
                        <>
                          <span className="text-sm">{selectedGender.emoji}</span>
                          <span className="text-xs font-bold text-white truncate">{selectedGender.label}</span>
                        </>
                      ) : (
                        <span className="text-xs text-white/30">Select</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 text-white/30 transition-transform ${genderOpen ? "rotate-180" : ""}`} />
                </div>
                {genderOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0d1421] backdrop-blur-xl shadow-2xl overflow-hidden z-50">
                    {GENDERS.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => { setGender(g.value); setGenderOpen(false); }}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-xs transition-all cursor-pointer hover:bg-white/5 ${gender === g.value ? "bg-orange-500/10 text-orange-400 font-bold" : "text-white/70"}`}
                      >
                        <span className="text-base">{g.emoji}</span>
                        <span>{g.label}</span>
                        {gender === g.value && <span className="ml-auto h-2 w-2 rounded-full bg-orange-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isSubmitting || loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 py-4 text-sm font-black uppercase tracking-[0.15em] text-[#060b13] shadow-[0_0_30px_-8px_rgba(249,115,22,0.6)] transition-all hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer mt-2"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Creating Account...</>
                ) : (
                  <>Create Account <Sparkles className="h-4 w-4" /></>
                )}
              </span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Joined already?{" "}
            <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-emerald-400 hover:opacity-80 transition-opacity">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
