import { useEffect, useState, useCallback } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  User, GraduationCap, Target, Code2, FolderKanban, FileText,
  Link2, Trophy, Settings2, ChevronRight, ChevronLeft, Save,
  Loader2, CheckCircle2, Camera, Plus, Trash2, LayoutDashboard,
  LogOut, ArrowLeft, AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { traineeService, calcProfileCompletion, type TraineeProfile } from "@/services/traineeService";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — ITPlacementX" },
      { name: "description", content: "Build your complete trainee profile to unlock AI career acceleration." },
    ],
  }),
  component: TraineeProfilePage,
});

// ─── Section Definitions ─────────────────────────────────────────────────────
const SECTIONS = [
  { id: 0, label: "Basic Info", icon: User, color: "orange" },
  { id: 1, label: "Education", icon: GraduationCap, color: "blue" },
  { id: 2, label: "Career Goal", icon: Target, color: "emerald" },
  { id: 3, label: "Skills", icon: Code2, color: "purple" },
  { id: 4, label: "Projects", icon: FolderKanban, color: "amber" },
  { id: 5, label: "Resume", icon: FileText, color: "red" },
  { id: 6, label: "Social Links", icon: Link2, color: "cyan" },
  { id: 7, label: "Achievements", icon: Trophy, color: "yellow" },
  { id: 8, label: "Preferences", icon: Settings2, color: "pink" },
];

const SKILL_CATEGORIES = [
  { key: "programmingLanguages", label: "Programming Languages", placeholder: "e.g. Python, JavaScript, Java" },
  { key: "frameworks", label: "Frameworks & Libraries", placeholder: "e.g. React, Node.js, Django" },
  { key: "databases", label: "Databases", placeholder: "e.g. MySQL, MongoDB, PostgreSQL" },
  { key: "cloud", label: "Cloud Platforms", placeholder: "e.g. AWS, Azure, GCP" },
  { key: "devops", label: "DevOps Tools", placeholder: "e.g. Docker, Kubernetes, Jenkins" },
  { key: "ai", label: "AI & ML Tools", placeholder: "e.g. TensorFlow, PyTorch, scikit-learn" },
  { key: "dataAnalytics", label: "Data Analytics", placeholder: "e.g. Pandas, Tableau, Power BI" },
  { key: "machineLearning", label: "Machine Learning", placeholder: "e.g. NLP, Computer Vision, LLMs" },
  { key: "softSkills", label: "Soft Skills", placeholder: "e.g. Communication, Leadership, Problem Solving" },
];

// ─── Reusable Input Components ────────────────────────────────────────────────
function FormInput({ label, value, onChange, placeholder = "", type = "text", required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-white/50">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white/8"
      />
    </div>
  );
}

function FormTextarea({ label, value, onChange, placeholder = "", rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-white/50">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white/8 resize-none"
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-white/50">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-[#0d1421] px-4 py-3 text-sm text-white outline-none transition-all focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function TagInput({ label, tags, onChange, placeholder }: {
  label: string; tags: string[]; onChange: (tags: string[]) => void; placeholder?: string;
}) {
  const [input, setInput] = useState("");
  function addTag() {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput("");
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-white/50">{label}</label>
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-xs font-semibold text-orange-300">
              {tag}
              <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} className="text-orange-400/60 hover:text-red-400 transition-colors">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder={placeholder || "Type and press Enter"}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
          />
          <button type="button" onClick={addTag} className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-white/60 hover:bg-white/20 transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-4">
      <div className="mb-5">
        <div className="text-lg font-black text-white">{title}</div>
        {subtitle && <div className="text-xs text-white/40 mt-0.5">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
function TraineeProfilePage() {
  const { currentUser, appUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [profile, setProfile] = useState<TraineeProfile>({} as TraineeProfile);
  const [saving, setSaving] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route
  useEffect(() => {
    if (!loading && !currentUser) navigate({ to: "/login" });
  }, [currentUser, loading]);

  // Load existing profile
  useEffect(() => {
    if (currentUser?.uid) {
      traineeService.getProfile(currentUser.uid).then((data) => {
        if (data) setProfile(data);
        setDataLoaded(true);
      });
    }
  }, [currentUser]);

  const update = useCallback((field: keyof TraineeProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateNested = useCallback((field: keyof TraineeProfile, subField: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: { ...(prev[field] as any || {}), [subField]: value },
    }));
  }, []);

  async function handleSave() {
    if (!currentUser?.uid) return;
    setSaving(true);
    try {
      await traineeService.saveProfile(currentUser.uid, profile);
      const completion = calcProfileCompletion(profile);
      if (completion >= 80) {
        await traineeService.markProfileComplete(currentUser.uid);
      }
      toast.success("✅ Profile saved successfully!");
    } catch (e) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const completion = calcProfileCompletion(profile);
  const name = appUser?.fullName || "Trainee";
  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();

  if (loading || !dataLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#03060a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin" />
          <p className="text-sm text-white/40">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03060a] text-white flex overflow-hidden">
      {/* ── SIDEBAR ─────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full z-40 w-64 flex flex-col border-r border-white/5 bg-[#060b14]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="h-9 w-9 rounded-xl bg-white p-1 shadow">
            <img src="/our-logo.jpeg" alt="Logo" className="h-full w-full rounded-lg object-contain" />
          </div>
          <div>
            <div className="text-sm font-black text-white">IT.Placement<span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">X</span></div>
            <div className="text-[8px] tracking-widest uppercase text-white/30">Trainee Portal</div>
          </div>
        </div>

        <div className="mx-3 mt-4 rounded-2xl border border-white/5 bg-gradient-to-br from-orange-500/10 to-emerald-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-sm font-black">{initials}</div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">{name}</div>
              <span className="mt-1 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-black uppercase text-emerald-400">Trainee</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[9px] mb-1"><span className="text-white/40">Profile</span><span className="font-black text-orange-400">{completion}%</span></div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-700" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <Link to="/student/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white transition-all">
            <LayoutDashboard className="h-4 w-4 text-white/30" /> Dashboard
          </Link>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold bg-gradient-to-r from-orange-500/15 to-emerald-500/10 text-white border border-white/5">
            <User className="h-4 w-4 text-orange-400" /> My Profile
          </div>
        </nav>

        <div className="p-3 border-t border-white/5">
          <button onClick={async () => { await logout(); navigate({ to: "/" }); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/5 bg-[#03060a]/80 backdrop-blur-xl px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/student/dashboard" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-white/30">Profile: <span className="font-bold text-orange-400">{completion}%</span></span>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 px-4 py-2 text-xs font-black text-white shadow hover:scale-105 transition-all disabled:opacity-60 cursor-pointer"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Section Navigator */}
          <div className="hidden md:flex flex-col w-52 border-r border-white/5 bg-[#060b14]/40 py-4 px-2 gap-1 overflow-y-auto">
            {SECTIONS.map(({ id, label, icon: Icon }) => {
              const sectionDone = (() => {
                if (id === 0) return !!profile.phone && !!profile.city;
                if (id === 1) return !!profile.graduation?.college || !!profile.twelfth?.school;
                if (id === 2) return !!profile.desiredJobRole;
                if (id === 3) return (profile.programmingLanguages?.length ?? 0) > 0;
                if (id === 4) return (profile.projects?.length ?? 0) > 0;
                if (id === 5) return !!profile.resumeHeadline;
                if (id === 6) return !!profile.linkedin || !!profile.github;
                if (id === 7) return (profile.certificates?.length ?? 0) > 0;
                if (id === 8) return !!profile.preferredTechnology;
                return false;
              })();
              return (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-left transition-all ${activeSection === id ? "bg-white/8 text-white border border-white/5" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${activeSection === id ? "text-orange-400" : sectionDone ? "text-emerald-400" : "text-white/20"}`} />
                  <span className="flex-1">{label}</span>
                  {sectionDone && <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Section Content */}
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
            {/* Mobile section tabs */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 md:hidden">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-1.5 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all ${activeSection === id ? "bg-orange-500/20 text-orange-400 border border-orange-500/20" : "bg-white/5 text-white/40 border border-white/5"}`}
                >
                  <Icon className="h-3 w-3" /> {label}
                </button>
              ))}
            </div>

            {/* ─ Section 0: Basic Info ─ */}
            {activeSection === 0 && (
              <div className="space-y-4">
                <SectionCard title="Basic Information" subtitle="Your personal details and contact information">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative group cursor-pointer">
                      <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 text-2xl font-black text-white shadow-xl">
                        {initials}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white/30 mt-2">Profile photo (coming soon)</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput label="Full Name" value={profile.fullName || ""} onChange={(v) => update("fullName", v)} placeholder="Your full name" required />
                    <FormSelect label="Gender" value={profile.gender || ""} onChange={(v) => update("gender", v)} options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }, { value: "prefer-not-to-say", label: "Prefer not to say" }]} />
                    <FormInput label="Date of Birth" value={profile.dateOfBirth || ""} onChange={(v) => update("dateOfBirth", v)} type="date" />
                    <FormInput label="Phone Number" value={profile.phone || ""} onChange={(v) => update("phone", v)} placeholder="+91 00000 00000" required />
                    <FormInput label="Alternate Number" value={profile.alternatePhone || ""} onChange={(v) => update("alternatePhone", v)} placeholder="+91 00000 00000" />
                    <FormInput label="Country" value={profile.country || ""} onChange={(v) => update("country", v)} placeholder="India" />
                    <FormInput label="State" value={profile.state || ""} onChange={(v) => update("state", v)} placeholder="Your state" required />
                    <FormInput label="District" value={profile.district || ""} onChange={(v) => update("district", v)} placeholder="Your district" />
                    <FormInput label="City" value={profile.city || ""} onChange={(v) => update("city", v)} placeholder="Your city" required />
                    <FormInput label="PIN Code" value={profile.pinCode || ""} onChange={(v) => update("pinCode", v)} placeholder="000000" />
                  </div>
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    <FormTextarea label="Current Address" value={profile.currentAddress || ""} onChange={(v) => update("currentAddress", v)} placeholder="House no, Street, Area..." />
                    <FormTextarea label="Permanent Address" value={profile.permanentAddress || ""} onChange={(v) => update("permanentAddress", v)} placeholder="House no, Street, Area..." />
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ─ Section 1: Education ─ */}
            {activeSection === 1 && (
              <div className="space-y-4">
                {[
                  { key: "tenth", label: "10th Standard", fields: ["school", "board", "year", "percentage"] },
                  { key: "twelfth", label: "12th Standard", fields: ["school", "board", "year", "percentage"] },
                  { key: "diploma", label: "Diploma (if any)", fields: ["college", "branch", "year", "percentage"] },
                  { key: "graduation", label: "Graduation", fields: ["college", "university", "branch", "year", "cgpa"] },
                  { key: "postGraduation", label: "Post Graduation (if any)", fields: ["college", "university", "branch", "year", "cgpa"] },
                ].map(({ key, label, fields }) => (
                  <SectionCard key={key} title={label}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {fields.map((f) => (
                        <FormInput
                          key={f}
                          label={f.charAt(0).toUpperCase() + f.slice(1)}
                          value={((profile as any)[key] as any)?.[f] || ""}
                          onChange={(v) => updateNested(key as keyof TraineeProfile, f, v)}
                          placeholder={f === "year" ? "YYYY" : f === "cgpa" ? "8.5" : f === "percentage" ? "85%" : ""}
                        />
                      ))}
                    </div>
                  </SectionCard>
                ))}
              </div>
            )}

            {/* ─ Section 2: Career Goal ─ */}
            {activeSection === 2 && (
              <SectionCard title="Career Goals" subtitle="Define your dream career path">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput label="Desired Job Role" value={profile.desiredJobRole || ""} onChange={(v) => update("desiredJobRole", v)} placeholder="e.g. Full Stack Developer, Data Scientist" required />
                  <FormInput label="Preferred Technology" value={profile.preferredTechnology || ""} onChange={(v) => update("preferredTechnology", v)} placeholder="e.g. React, Python, AWS" required />
                  <FormSelect label="Experience Level" value={profile.experienceLevel || ""} onChange={(v) => update("experienceLevel", v as any)} options={[{ value: "fresher", label: "Fresher (0-1 year)" }, { value: "experienced", label: "Experienced (1+ years)" }]} />
                  <FormInput label="Dream Company" value={profile.dreamCompany || ""} onChange={(v) => update("dreamCompany", v)} placeholder="e.g. Google, Microsoft, Amazon" />
                  <FormInput label="Expected Salary (LPA)" value={profile.expectedSalary || ""} onChange={(v) => update("expectedSalary", v)} placeholder="e.g. 6-10 LPA" />
                  <FormInput label="Preferred Location" value={profile.preferredLocation || ""} onChange={(v) => update("preferredLocation", v)} placeholder="e.g. Bangalore, Remote, Pan India" />
                  <div className="flex items-center gap-3 col-span-full">
                    <input
                      type="checkbox"
                      id="relocate"
                      checked={profile.openToRelocate || false}
                      onChange={(e) => update("openToRelocate", e.target.checked)}
                      className="h-4 w-4 rounded accent-orange-500 cursor-pointer"
                    />
                    <label htmlFor="relocate" className="text-sm font-semibold text-white/70 cursor-pointer">Open to Relocate</label>
                  </div>
                </div>
                <div className="mt-4">
                  <FormTextarea label="Career Objective" value={profile.careerObjective || ""} onChange={(v) => update("careerObjective", v)} placeholder="Write your career objective in 2-3 sentences..." rows={4} />
                </div>
              </SectionCard>
            )}

            {/* ─ Section 3: Skills ─ */}
            {activeSection === 3 && (
              <SectionCard title="Technical & Soft Skills" subtitle="Add your skills — press Enter or click Add after each skill">
                <div className="grid sm:grid-cols-2 gap-5">
                  {SKILL_CATEGORIES.map(({ key, label, placeholder }) => (
                    <TagInput
                      key={key}
                      label={label}
                      tags={(profile as any)[key] || []}
                      onChange={(tags) => update(key as keyof TraineeProfile, tags)}
                      placeholder={placeholder}
                    />
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ─ Section 4: Projects ─ */}
            {activeSection === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">Projects</div>
                    <div className="text-xs text-white/40">Showcase your real-world work</div>
                  </div>
                  <button
                    onClick={() => update("projects", [...(profile.projects || []), { id: Date.now().toString(), name: "", description: "", technologies: "", githubLink: "", liveLink: "" }])}
                    className="flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Project
                  </button>
                </div>

                {(profile.projects || []).length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/3 p-12 text-center">
                    <FolderKanban className="h-10 w-10 text-white/20 mx-auto mb-3" />
                    <div className="text-white/40 text-sm font-semibold">No projects added yet</div>
                    <div className="text-white/20 text-xs mt-1">Click "Add Project" to showcase your work</div>
                  </div>
                )}

                {(profile.projects || []).map((proj, idx) => (
                  <div key={proj.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider text-orange-400">Project {idx + 1}</span>
                      <button
                        onClick={() => update("projects", profile.projects!.filter((_, i) => i !== idx))}
                        className="grid h-7 w-7 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput label="Project Name" value={proj.name} onChange={(v) => { const p = [...profile.projects!]; p[idx] = { ...p[idx], name: v }; update("projects", p); }} placeholder="My Awesome Project" />
                      <FormInput label="Technologies Used" value={proj.technologies} onChange={(v) => { const p = [...profile.projects!]; p[idx] = { ...p[idx], technologies: v }; update("projects", p); }} placeholder="React, Node.js, MongoDB" />
                      <FormInput label="GitHub Link" value={proj.githubLink || ""} onChange={(v) => { const p = [...profile.projects!]; p[idx] = { ...p[idx], githubLink: v }; update("projects", p); }} placeholder="https://github.com/..." />
                      <FormInput label="Live Link" value={proj.liveLink || ""} onChange={(v) => { const p = [...profile.projects!]; p[idx] = { ...p[idx], liveLink: v }; update("projects", p); }} placeholder="https://myproject.com" />
                    </div>
                    <div className="mt-4">
                      <FormTextarea label="Description" value={proj.description} onChange={(v) => { const p = [...profile.projects!]; p[idx] = { ...p[idx], description: v }; update("projects", p); }} placeholder="What does this project do? What problem does it solve?" rows={3} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─ Section 5: Resume ─ */}
            {activeSection === 5 && (
              <SectionCard title="Resume" subtitle="Upload your resume and write a compelling headline">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50">Upload Resume (PDF)</label>
                    <div className="mt-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/3 p-8 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all cursor-pointer group">
                      <div className="text-center">
                        <FileText className="h-10 w-10 text-white/20 group-hover:text-orange-400/50 mx-auto mb-2 transition-colors" />
                        <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">Drag & drop or click to upload PDF</div>
                        <div className="text-xs text-white/20 mt-1">Max size: 5MB</div>
                        <div className="text-[10px] text-orange-400/50 mt-2">(Firebase Storage integration — available when configured)</div>
                      </div>
                    </div>
                  </div>
                  <FormInput label="Resume Headline" value={profile.resumeHeadline || ""} onChange={(v) => update("resumeHeadline", v)} placeholder="e.g. Full Stack Developer | React | Node.js | 2+ Years" required />
                  <FormTextarea label="Resume Summary" value={profile.resumeSummary || ""} onChange={(v) => update("resumeSummary", v)} placeholder="Write a professional summary that will appear at the top of your resume..." rows={5} />
                </div>
              </SectionCard>
            )}

            {/* ─ Section 6: Social Links ─ */}
            {activeSection === 6 && (
              <SectionCard title="Social Links" subtitle="Connect your professional profiles">
                <div className="space-y-4">
                  {[
                    { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourname" },
                    { key: "github", label: "GitHub", placeholder: "https://github.com/yourname" },
                    { key: "portfolio", label: "Portfolio Website", placeholder: "https://yourname.dev" },
                    { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/yourname" },
                    { key: "youtube", label: "YouTube Channel", placeholder: "https://youtube.com/@yourname" },
                  ].map(({ key, label, placeholder }) => (
                    <FormInput key={key} label={label} value={(profile as any)[key] || ""} onChange={(v) => update(key as keyof TraineeProfile, v)} placeholder={placeholder} />
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ─ Section 7: Achievements ─ */}
            {activeSection === 7 && (
              <SectionCard title="Achievements & Recognition" subtitle="Highlight your accomplishments">
                <div className="grid sm:grid-cols-2 gap-5">
                  <TagInput label="Certificates" tags={profile.certificates || []} onChange={(v) => update("certificates", v)} placeholder="e.g. AWS Certified, Google Data Analytics" />
                  <TagInput label="Hackathons" tags={profile.hackathons || []} onChange={(v) => update("hackathons", v)} placeholder="e.g. HackIndia 2024, Smart India Hackathon" />
                  <TagInput label="Internships" tags={profile.internships || []} onChange={(v) => update("internships", v)} placeholder="e.g. TCS, Infosys, Startup Intern" />
                  <TagInput label="Awards & Honors" tags={profile.awards || []} onChange={(v) => update("awards", v)} placeholder="e.g. Best Student, Dean's List" />
                  <div className="sm:col-span-2">
                    <TagInput label="Extra-Curricular Activities" tags={profile.extraActivities || []} onChange={(v) => update("extraActivities", v)} placeholder="e.g. NSS, Sports Captain, Tech Club Lead" />
                  </div>
                </div>
              </SectionCard>
            )}

            {/* ─ Section 8: Career Preferences ─ */}
            {activeSection === 8 && (
              <SectionCard title="Career Preferences" subtitle="Help us match you with the right mentor and batch">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormSelect label="Learning Mode" value={profile.learningMode || ""} onChange={(v) => update("learningMode", v as any)} options={[{ value: "online", label: "Online (Live Classes)" }, { value: "offline", label: "Offline / Classroom" }, { value: "hybrid", label: "Hybrid" }]} />
                  <FormSelect label="Available Time" value={profile.availableTime || ""} onChange={(v) => update("availableTime", v)} options={[{ value: "morning", label: "Morning (6AM - 12PM)" }, { value: "afternoon", label: "Afternoon (12PM - 6PM)" }, { value: "evening", label: "Evening (6PM - 10PM)" }, { value: "weekend", label: "Weekends Only" }, { value: "flexible", label: "Flexible" }]} />
                  <FormInput label="Preferred Mentor Type" value={profile.preferredMentor || ""} onChange={(v) => update("preferredMentor", v)} placeholder="e.g. FAANG engineer, Startup founder" />
                  <FormInput label="Preferred Batch" value={profile.preferredBatch || ""} onChange={(v) => update("preferredBatch", v)} placeholder="e.g. Jan 2025, Next available" />
                  <div className="sm:col-span-2">
                    <TagInput label="Interested Domains" tags={profile.interestedDomains || []} onChange={(v) => update("interestedDomains", v)} placeholder="e.g. Full Stack, Data Science, DevOps, AI/ML" />
                  </div>
                </div>
              </SectionCard>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <button
                onClick={() => setActiveSection((p) => Math.max(0, p - 1))}
                disabled={activeSection === 0}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              <div className="flex items-center gap-1.5">
                {SECTIONS.map(({ id }) => (
                  <button key={id} onClick={() => setActiveSection(id)} className={`h-2 rounded-full transition-all ${id === activeSection ? "w-6 bg-orange-500" : "w-2 bg-white/10"}`} />
                ))}
              </div>

              {activeSection < 8 ? (
                <button
                  onClick={() => setActiveSection((p) => Math.min(8, p + 1))}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 px-4 py-2.5 text-sm font-bold text-white hover:scale-105 transition-all cursor-pointer"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 px-5 py-2.5 text-sm font-black text-white hover:scale-105 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
