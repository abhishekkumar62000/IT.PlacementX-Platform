import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/unauthorized")({
  head: () => ({
    meta: [
      { title: "Unauthorized — ITPlacementX" },
      { name: "description", content: "You do not have permission to view this page." }
    ]
  }),
  component: Unauthorized,
});

function Unauthorized() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    const role = userProfile?.role || "student";
    if (role === "trainer") {
      navigate({ to: "/trainer/dashboard" });
    } else if (role === "admin") {
      navigate({ to: "/admin/dashboard" });
    } else {
      navigate({ to: "/student/dashboard" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground p-6 sm:p-12 overflow-hidden">
      <div className="absolute inset-0 bg-radial-brand opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <main className="relative z-10 my-auto flex items-center justify-center py-12">
        <div className="w-full max-w-md text-center glass border border-white/10 p-8 rounded-2xl bg-card/40 backdrop-blur-md">
          <div className="mx-auto p-4 rounded-full bg-red-500/10 text-red-400 w-fit mb-6">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Access Denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            You do not have the required permissions to view this dashboard. If you believe this is an error, please contact support.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleBackToDashboard}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] text-white text-sm font-medium shadow-md shadow-brand/10 hover:opacity-95 transition-opacity"
            >
              <Home className="h-4 w-4" /> Go to Your Dashboard
            </button>

            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border/60 bg-card/30 hover:bg-card/75 text-sm font-medium transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ITPlacementX. All rights reserved.
      </footer>
    </div>
  );
}
