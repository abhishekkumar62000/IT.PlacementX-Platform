import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardShell, SideNav, StatCard, Panel, ProgressBar, MiniChart } from "@/components/site/DashboardShell";
import { LayoutGrid, BookOpen, FolderKanban, GraduationCap, MessageSquare, Award, User, Settings, Calendar, Trophy, CheckCircle2, Clock, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dbService, StudentProfile } from "@/services/db";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/student/dashboard")({
  head: () => ({ meta: [{ title: "Student Dashboard — ITPlacementX" }, { name: "description", content: "Learning progress, mentor, projects and placement pipeline." }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<StudentProfile | null>(null);
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
        if (userProfile.role !== "student") {
          navigate({ to: "/unauthorized" });
          return;
        }
      }
    }
  }, [currentUser, userProfile, loading]);

  // Load student profile data from dbService
  useEffect(() => {
    if (currentUser?.uid && userProfile?.role === "student") {
      setProfileLoading(true);
      dbService.getStudentProfile(currentUser.uid)
        .then((data) => {
          setProfileData(data);
        })
        .catch((err) => {
          console.error("Failed to load student profile:", err);
          toast.error("Error loading student statistics.");
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
          <p className="mt-4 text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Fallback to default student details if profile query is empty
  const student = profileData || {
    cohort: "Freshers Career Accelerator",
    week: 1,
    totalWeeks: 24,
    resumeScore: 60,
    skillMatch: "20%",
    placementStatus: "In Progress",
    offersPipeline: 0,
    learningProgress: 0,
    modules: [
      { name: "System Design", progress: 0 },
      { name: "Distributed Systems", progress: 0 },
      { name: "Kubernetes", progress: 0 },
      { name: "Advanced SQL", progress: 0 }
    ],
    analyticsPoints: [0, 5, 10, 15],
    assignedMentorName: "Pending Assignment",
    tasks: [],
    pipeline: []
  };

  return (
    <DashboardShell
      title={`Welcome back, ${userProfile?.name || "Student"}`}
      subtitle={`Cohort · ${student.cohort} · Week ${student.week} of ${student.totalWeeks}`}
      sidebar={<SideNav items={[
        { label: "Dashboard", icon: LayoutGrid, active: true },
        { label: "Learning", icon: BookOpen },
        { label: "Projects", icon: FolderKanban },
        { label: "Mentor", icon: GraduationCap },
        { label: "Interviews", icon: MessageSquare },
        { label: "Certificates", icon: Award },
        { label: "Calendar", icon: Calendar },
        { label: "Leaderboard", icon: Trophy },
        { label: "Profile", icon: User },
        { label: "Settings", icon: Settings },
      ]} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Resume Score" value={String(student.resumeScore)} delta="+12 this week" tone="success" />
        <StatCard label="Skill Match" value={student.skillMatch} delta="Target: SDE at Google" />
        <StatCard label="Interviews" value={String(student.pipeline.length)} delta="Scheduled interviews" />
        <StatCard label="Placement" value={student.placementStatus} delta={`${student.offersPipeline} offers in pipeline`} tone="success" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Learning Progress" subtitle={`Cohort week ${student.week} of ${student.totalWeeks}`} right={<span className="text-xs text-muted-foreground">{student.learningProgress}% complete</span>}>
          <ProgressBar value={student.learningProgress} />
          <div className="mt-4 grid gap-2 text-sm">
            {student.modules.map((x) => (
              <div key={x.name}>
                <div className="flex justify-between text-xs text-muted-foreground"><span>{x.name}</span><span>{x.progress}%</span></div>
                <ProgressBar value={x.progress} />
              </div>
            ))}
          </div>
        </Panel>
        
        <Panel title="Career Analytics" subtitle="Skill velocity">
          <MiniChart points={student.analyticsPoints} />
          <div className="mt-2 text-xs text-muted-foreground">You're in the top 8% of your cohort.</div>
        </Panel>
        
        <Panel title="Assigned Mentor" subtitle={student.assignedMentorName}>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-linear-to-br from-[var(--brand-3)] to-[var(--brand-2)] font-semibold text-white">
              {student.assignedMentorName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div className="text-sm text-muted-foreground">Next 1:1 · Tue 6:00 PM</div>
          </div>
          <button className="mt-4 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm hover:bg-background/80 transition-colors">Message Mentor</button>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Today's Tasks">
          <ul className="space-y-2 text-sm">
            {student.tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className={`h-4 w-4 ${t.completed ? "text-[var(--brand)]" : "text-muted-foreground"}`} /> 
                <span className={t.completed ? "line-through opacity-70" : ""}>{t.text}</span>
              </li>
            ))}
            {student.tasks.length === 0 && (
              <li className="text-xs text-muted-foreground py-2">No tasks assigned for today.</li>
            )}
          </ul>
        </Panel>
        
        <Panel title="Upcoming Classes">
          <ul className="space-y-3 text-sm">
            {[
              { t: "Kubernetes Deep Dive", w: "Today · 8 PM" },
              { t: "System Design Panel", w: "Tue · 6 PM" },
              { t: "Advanced SQL Live", w: "Thu · 8 PM" },
            ].map((c) => (
              <li key={c.t} className="flex items-start justify-between gap-3">
                <div><div className="font-medium text-foreground">{c.t}</div><div className="text-xs text-muted-foreground">{c.w}</div></div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </Panel>
        
        <Panel title="Placement Pipeline">
          <ul className="space-y-2 text-sm">
            {student.pipeline.map((p) => (
              <li key={p.company} className="flex justify-between">
                <span className="text-muted-foreground">{p.company}</span>
                <span className={p.tone}>{p.status}</span>
              </li>
            ))}
            {student.pipeline.length === 0 && (
              <li className="text-xs text-muted-foreground py-2">No active application pipelines.</li>
            )}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Notifications" right={<Bell className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>New mentor feedback on Project #2</li>
            <li>Interview slot confirmed with Google</li>
            <li>Weekly analytics report published</li>
          </ul>
        </Panel>
        <Panel title="Achievements">
          <div className="flex flex-wrap gap-2 text-xs">
            {["Top 10% cohort", "3 projects shipped", "5 mock interviews", "AI Roadmap on track", "Mentor MVP"].map((a) => (
              <span key={a} className="rounded-full border border-[var(--brand)]/40 bg-[var(--brand)]/10 px-2.5 py-1 text-[var(--brand)]">{a}</span>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardShell>
  );
}
