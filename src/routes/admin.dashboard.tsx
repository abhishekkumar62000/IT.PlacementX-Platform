import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardShell, SideNav, StatCard, Panel, MiniChart } from "@/components/site/DashboardShell";
import { LayoutGrid, Users, GraduationCap, Building2, CreditCard, BookOpen, Award, BarChart3, LifeBuoy, Bell, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — ITPlacementX" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  // Protected route & Role redirect logic
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate({ to: "/login" });
        return;
      }
      
      if (userProfile) {
        if (userProfile.role !== "admin") {
          navigate({ to: "/unauthorized" });
          return;
        }
      }
    }
  }, [currentUser, userProfile, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--brand)] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading admin settings...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell
      title="Platform Admin"
      subtitle={`ITPlacementX · Global Workspace · Admin: ${userProfile?.name || "System"}`}
      sidebar={<SideNav items={[
        { label: "Overview", icon: LayoutGrid, active: true },
        { label: "Students", icon: Users },
        { label: "Mentors", icon: GraduationCap },
        { label: "Companies", icon: Building2 },
        { label: "Payments", icon: CreditCard },
        { label: "Programs", icon: BookOpen },
        { label: "Certificates", icon: Award },
        { label: "Analytics", icon: BarChart3 },
        { label: "Support", icon: LifeBuoy },
        { label: "Notifications", icon: Bell },
        { label: "Reports", icon: FileText },
      ]} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Students" value="42,318" delta="+512" tone="success" />
        <StatCard label="Mentors" value="1,204" delta="+22" />
        <StatCard label="Companies" value="612" delta="+9" />
        <StatCard label="MRR" value="₹4.8 Cr" delta="+8.4%" tone="success" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Platform Growth" subtitle="Last 12 months">
          <MiniChart points={[10,12,16,18,22,28,32,38,42,48,54,60]} />
        </Panel>
        <Panel title="Support Queue">
          <ul className="space-y-2 text-sm">
            {[
              { s: "Payment issue · #ITX-2938", p: "High" },
              { s: "Mentor onboarding · #ITX-2917", p: "Med" },
              { s: "Certificate reissue · #ITX-2911", p: "Low" },
            ].map((t) => (
              <li key={t.s} className="flex items-center justify-between rounded-md border border-border/60 bg-background/60 p-3">
                <span>{t.s}</span><span className="text-xs text-muted-foreground">{t.p}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </DashboardShell>
  );
}
