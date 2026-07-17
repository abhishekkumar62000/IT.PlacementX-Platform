import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Sparkles, ChevronDown, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useAuth, UserRole, getRoleDashboard } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — ITPlacementX" },
      { name: "description", content: "Sign in to your ITPlacementX account and accelerate your IT career." },
    ],
  }),
  component: Login,
});

const ROLES: { value: UserRole; label: string; emoji: string }[] = [
  { value: "trainee", label: "Trainee", emoji: "🎓" },
  { value: "trainer", label: "Trainer", emoji: "🧑‍💻" },
  { value: "admin", label: "Admin", emoji: "⚙️" },
];

function Login() {
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<UserRole>("trainee");
  const [roleOpen, setRoleOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRole = ROLES.find((r) => r.value === role)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) return;

    setIsSubmitting(true);
    const result = await signIn(email.trim(), password, role);
    setIsSubmitting(false);

    if (result.success) {
      navigate({ to: getRoleDashboard(role) });
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#03060a] overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl rounded-full" />

      <div className="relative w-full max-w-sm">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 via-amber-400/20 to-emerald-500/30 rounded-3xl blur-md opacity-70" />
        <div className="relative rounded-3xl border border-white/10 bg-[#080d14]/90 backdrop-blur-2xl shadow-2xl p-8">

          {/* Logo + Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/40 to-emerald-500/40 rounded-full blur-md animate-pulse" />
              <div className="relative h-20 w-20 rounded-full border-2 border-white/10 bg-white p-1.5 shadow-xl">
                <img src="/our-logo.jpeg" alt="ITPlacementX" className="h-full w-full rounded-full object-contain" />
              </div>
            </div>
            <h1 className="font-display text-xl font-black tracking-tight text-white">
              IT.Placement<span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">X</span>
            </h1>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mt-1">India's AI Career Platform</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="login-email"
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
                id="login-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete="current-password"
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

            {/* Role Selector */}
            <div className="relative">
              <div
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 cursor-pointer hover:border-white/20 transition-all"
                onClick={() => setRoleOpen((v) => !v)}
              >
                <div>
                  <span className="text-[9px] font-black tracking-[0.18em] uppercase text-orange-400">Sign In As</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base">{selectedRole.emoji}</span>
                    <span className="text-sm font-bold text-white">{selectedRole.label}</span>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/40 transition-transform duration-200 ${roleOpen ? "rotate-180" : ""}`} />
              </div>

              {roleOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0d1421] backdrop-blur-xl shadow-2xl overflow-hidden z-50">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => { setRole(r.value); setRoleOpen(false); }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-all cursor-pointer hover:bg-white/5 ${role === r.value ? "bg-orange-500/10 text-orange-400 font-bold" : "text-white/70"}`}
                    >
                      <span className="text-base">{r.emoji}</span>
                      <span>{r.label}</span>
                      {role === r.value && <span className="ml-auto h-2 w-2 rounded-full bg-orange-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={isSubmitting || loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 py-4 text-sm font-black uppercase tracking-[0.15em] text-[#060b13] shadow-[0_0_30px_-8px_rgba(249,115,22,0.6)] transition-all hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Signing In...</>
                ) : (
                  <>Sign In <Sparkles className="h-4 w-4" /></>
                )}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/40">
              New here?{" "}
              <Link to="/register" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-emerald-400 hover:opacity-80 transition-opacity">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}