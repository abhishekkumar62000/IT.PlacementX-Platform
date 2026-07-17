import { db } from "@/firebase/config";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

// ─── Trainee Profile Type ────────────────────────────────────────────────────
export interface TraineeProfile {
  uid: string;
  updatedAt?: any;

  // Section 1 — Basic
  profilePhoto?: string;
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  alternatePhone?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  pinCode?: string;
  currentAddress?: string;
  permanentAddress?: string;

  // Section 2 — Education
  tenth?: { school?: string; board?: string; year?: string; percentage?: string };
  twelfth?: { school?: string; board?: string; year?: string; percentage?: string };
  diploma?: { college?: string; branch?: string; year?: string; percentage?: string };
  graduation?: { college?: string; university?: string; branch?: string; year?: string; cgpa?: string };
  postGraduation?: { college?: string; university?: string; branch?: string; year?: string; cgpa?: string };

  // Section 3 — Career Goal
  desiredJobRole?: string;
  preferredTechnology?: string;
  experienceLevel?: "fresher" | "experienced";
  careerObjective?: string;
  dreamCompany?: string;
  expectedSalary?: string;
  preferredLocation?: string;
  openToRelocate?: boolean;

  // Section 4 — Skills
  programmingLanguages?: string[];
  frameworks?: string[];
  databases?: string[];
  cloud?: string[];
  devops?: string[];
  ai?: string[];
  dataAnalytics?: string[];
  machineLearning?: string[];
  softSkills?: string[];

  // Section 5 — Projects
  projects?: {
    id: string;
    name: string;
    description: string;
    technologies: string;
    githubLink?: string;
    liveLink?: string;
  }[];

  // Section 6 — Resume
  resumeUrl?: string;
  resumeHeadline?: string;
  resumeSummary?: string;

  // Section 7 — Social Links
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  youtube?: string;

  // Section 8 — Achievements
  certificates?: string[];
  hackathons?: string[];
  internships?: string[];
  awards?: string[];
  extraActivities?: string[];

  // Section 9 — Career Preferences
  interestedDomains?: string[];
  availableTime?: string;
  preferredMentor?: string;
  preferredBatch?: string;
  learningMode?: "online" | "offline" | "hybrid";
}

// ─── Completion Calculator ───────────────────────────────────────────────────
export function calcProfileCompletion(p: TraineeProfile): number {
  const checks = [
    // Basic
    !!p.fullName, !!p.phone, !!p.dateOfBirth, !!p.city, !!p.state, !!p.currentAddress,
    // Education
    !!p.graduation?.college || !!p.twelfth?.school,
    // Career
    !!p.desiredJobRole, !!p.careerObjective,
    // Skills
    (p.programmingLanguages?.length ?? 0) > 0,
    // Projects
    (p.projects?.length ?? 0) > 0,
    // Resume
    !!p.resumeHeadline,
    // Social
    !!p.linkedin || !!p.github,
    // Achievements
    (p.certificates?.length ?? 0) > 0 || !!p.internships,
    // Preferences
    !!p.preferredTechnology,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

// ─── Firestore Service ───────────────────────────────────────────────────────
export const traineeService = {
  async getProfile(uid: string): Promise<TraineeProfile | null> {
    if (!db) return null;
    try {
      const snap = await getDoc(doc(db, "trainee_profiles", uid));
      return snap.exists() ? (snap.data() as TraineeProfile) : null;
    } catch (e) {
      console.error("traineeService.getProfile error:", e);
      return null;
    }
  },

  async saveProfile(uid: string, data: Partial<TraineeProfile>): Promise<void> {
    if (!db) throw new Error("Firestore not available");
    const ref = doc(db, "trainee_profiles", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { ...data, uid, updatedAt: serverTimestamp() });
    } else {
      await setDoc(ref, { ...data, uid, updatedAt: serverTimestamp() });
    }
  },

  async markProfileComplete(uid: string): Promise<void> {
    if (!db) return;
    await updateDoc(doc(db, "users", uid), { profileCompleted: true });
  },
};
