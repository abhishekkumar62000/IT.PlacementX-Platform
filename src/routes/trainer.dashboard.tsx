import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardShell, SideNav, StatCard, Panel } from "@/components/site/DashboardShell";
import { LayoutGrid, Users, ClipboardCheck, FolderKanban, MessageSquare, Calendar, BarChart3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dbService, TrainerProfile } from "@/services/db";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/dashboard")({
  head: () => ({ meta: [{ title: "Trainer Dashboard — ITPlacementX" }, { name: "description", content: "Trainer console to track cohort, tasks, and sessions." }] }),
  component: TrainerDashboard,
});

function TrainerDashboard() {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<TrainerProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Protected route & Role redirect logic
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate({ to: "/login" });
        return;
      }
      
      // Strict Email Verification check
      if (!currentUser.emailVerified) {
        navigate({ to: "/verify-email" });
        return;
      }

      if (userProfile) {
        if (userProfile.role !== "trainer") {
          navigate({ to: "/unauthorized" });
          return;
        }
      }
    }
  }, [currentUser, userProfile, loading]);

  // Load trainer profile data from dbService
  useEffect(() => {
    if (currentUser?.uid && userProfile?.role === "trainer") {
      setProfileLoading(true);
      dbService.getTrainerProfile(currentUser.uid)
        .then((data) => {
          setProfileData(data);
        })
        .catch((err) => {
          console.error("Failed to load trainer profile:", err);
          toast.error("Error loading trainer console data.");
        })
        .finally(() => {
          setProfileLoading(false);
        });
    }
  }, [currentUser, userProfile]);

  if (loading || (currentUser && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--brand)] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading trainer console...</p>
        </div>
      </div>
    );
  }

  // Fallback to default trainer details if profile query is empty
  const trainer = profileData || {
    company: "Google",
    designation: "Senior SDE",
    cohortId: "Cohort FR-24",
    activeStudents: 42,
    pendingReviews: 7,
    sessionsThisWeek: 9,
    avgRating: 4.9
  };

  return (
    <DashboardShell
      title="Trainer Console"
      subtitle={`${userProfile?.name || "Trainer"} · ${trainer.designation} @ ${trainer.company} · ${trainer.cohortId}`}
      sidebar={<SideNav items={[
        { label: "Overview", icon: LayoutGrid, active: true },
        { label: "Students", icon: Users },
        { label: "Attendance", icon: ClipboardCheck },
        { label: "Project Reviews", icon: FolderKanban },
        { label: "Interview Feedback", icon: MessageSquare },
        { label: "Sessions", icon: Calendar },
        { label: "Analytics", icon: BarChart3 },
      ]} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Students" value={String(trainer.activeStudents)} />
        <StatCard label="Pending Reviews" value={String(trainer.pendingReviews)} tone="warning" delta="Due today" />
        <StatCard label="Sessions this week" value={String(trainer.sessionsThisWeek)} />
        <StatCard label="Avg Rating" value={String(trainer.avgRating)} tone="success" delta="+0.1" />
      </div>
      
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Students needing attention">
          <ul className="divide-y divide-border/60 text-sm">
            {[
              { n: "Aditya V.", s: "System Design", d: "Struggling with consistency" },
              { n: "Meera J.", s: "Kubernetes", d: "Missed 2 sessions" },
              { n: "Karan D.", s: "Advanced SQL", d: "Behind by 1 week" },
            ].map((x) => (
              <li key={x.n} className="flex items-center justify-between py-2.5">
                <div>
                  <div className="font-medium">{x.n}</div>
                  <div className="text-xs text-muted-foreground">{x.s} · {x.d}</div>
                </div>
                <button className="rounded-md border border-border px-3 py-1 text-xs hover:bg-white/5 transition-colors">Message</button>
              </li>
            ))}
          </ul>
        </Panel>
        
        <Panel title="Project Reviews Queue">
          <ul className="space-y-2 text-sm">
            {[
              { n: "URL Shortener · v2", s: "Aditya" },
              { n: "Distributed Cache", s: "Karan" },
              { n: "Feature Flags Service", s: "Meera" },
            ].map((p) => (
              <li key={p.n} className="flex items-center justify-between rounded-md border border-border/60 bg-background/60 p-3">
                <div><div className="font-medium">{p.n}</div><div className="text-xs text-muted-foreground">by {p.s}</div></div>
                <button className="rounded-md bg-linear-to-r from-[var(--brand-3)] via-[var(--brand)] to-[var(--brand-2)] px-3 py-1 text-xs text-white hover:opacity-90 transition-opacity">Review</button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </DashboardShell>
  );
}
