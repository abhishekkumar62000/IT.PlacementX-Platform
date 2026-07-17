import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/site/SiteShell";
import { Mail, RefreshCw, LogOut, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify Your Email — ITPlacementX" },
      { name: "description", content: "Please verify your email address to continue." }
    ]
  }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const { currentUser, userProfile, logout, sendEmailVerificationLink, reloadUser, loading } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  // Redirect if verified or not logged in
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate({ to: "/login" });
        return;
      }
      if (currentUser.emailVerified) {
        redirectUser(userProfile?.role || "student");
      }
    }
  }, [currentUser, userProfile, loading]);

  const redirectUser = (role: "student" | "trainer" | "admin") => {
    if (role === "trainer") {
      navigate({ to: "/trainer/dashboard" });
    } else if (role === "admin") {
      navigate({ to: "/admin/dashboard" });
    } else {
      navigate({ to: "/student/dashboard" });
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    try {
      await reloadUser();
      if (currentUser?.emailVerified) {
        toast.success("Email verified successfully! Redirecting...");
        redirectUser(userProfile?.role || "student");
      } else {
        toast.error("Email is still not verified. Please check your inbox and spam folder.");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to check status.");
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await sendEmailVerificationLink();
      toast.success("Verification link sent to your email!");
    } catch (e: any) {
      toast.error(e.message || "Failed to resend verification link.");
    } finally {
      setResending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (e) {
      toast.error("Failed to sign out.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--brand)] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Checking authentication state...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground p-6 sm:p-12 overflow-hidden">
      <div className="absolute inset-0 bg-radial-brand opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <header className="relative z-10 flex justify-between items-center">
        <BrandMark />
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/30 hover:bg-card/70 px-4 py-2 text-xs font-medium transition-all text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" /> Log Out
        </button>
      </header>

      <main className="relative z-10 my-auto flex items-center justify-center py-12">
        <div className="w-full max-w-md text-center glass border border-white/10 p-8 rounded-2xl bg-card/40 backdrop-blur-md">
          <div className="mx-auto p-4 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] w-fit mb-6">
            <Mail className="h-8 w-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Verify your email</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We've sent a verification link to <strong className="text-foreground">{currentUser?.email}</strong>.
            Please click on the link in the email to activate your account.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={checking}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] text-white text-sm font-medium shadow-md shadow-brand/10 hover:opacity-95 transition-opacity disabled:opacity-50"
            >
              {checking ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Checking...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" /> I Have Verified
                </>
              )}
            </button>

            <button
              onClick={handleResend}
              disabled={resending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border/60 bg-card/30 hover:bg-card/75 text-sm font-medium transition-all disabled:opacity-50"
            >
              {resending ? "Resending link..." : "Resend Verification Email"}
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ITPlacementX. All rights reserved.
      </footer>
    </div>
  );
}
