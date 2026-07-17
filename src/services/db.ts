import { db } from "@/firebase/config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  updateDoc 
} from "firebase/firestore";

// Types matching the database structure requirements
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: "student" | "trainer" | "admin";
  createdAt: string;
  status: "active" | "inactive";
  active: boolean;
}

export interface StudentProfile {
  uid: string;
  cohort: string;
  week: number;
  totalWeeks: number;
  resumeScore: number;
  skillMatch: string;
  targetRole: string;
  placementStatus: string;
  offersPipeline: number;
  learningProgress: number;
  modules: { name: string; progress: number }[];
  analyticsPoints: number[];
  assignedMentorId: string;
  assignedMentorName: string;
  tasks: { id: string; text: string; completed: boolean }[];
  pipeline: { company: string; status: string; tone: string }[];
}

export interface TrainerProfile {
  uid: string;
  company: string;
  designation: string;
  cohortId: string;
  activeStudents: number;
  pendingReviews: number;
  sessionsThisWeek: number;
  avgRating: number;
}

// Database Service abstraction interacting directly with Firestore
export const dbService = {
  // --- USERS ---
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
    } catch (e) {
      console.error("Firestore error in getUserProfile:", e);
      return null;
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await setDoc(doc(db, "users", profile.uid), profile);
    } catch (e) {
      console.error("Firestore error in saveUserProfile:", e);
      throw e;
    }
  },

  // --- STUDENT PROFILES ---
  async getStudentProfile(uid: string): Promise<StudentProfile | null> {
    try {
      const docSnap = await getDoc(doc(db, "student_profiles", uid));
      return docSnap.exists() ? (docSnap.data() as StudentProfile) : null;
    } catch (e) {
      console.error("Firestore error in getStudentProfile:", e);
      return null;
    }
  },

  async saveStudentProfile(profile: StudentProfile): Promise<void> {
    try {
      await setDoc(doc(db, "student_profiles", profile.uid), profile);
    } catch (e) {
      console.error("Firestore error in saveStudentProfile:", e);
      throw e;
    }
  },

  // --- TRAINER PROFILES ---
  async getTrainerProfile(uid: string): Promise<TrainerProfile | null> {
    try {
      const docSnap = await getDoc(doc(db, "trainer_profiles", uid));
      return docSnap.exists() ? (docSnap.data() as TrainerProfile) : null;
    } catch (e) {
      console.error("Firestore error in getTrainerProfile:", e);
      return null;
    }
  },

  async saveTrainerProfile(profile: TrainerProfile): Promise<void> {
    try {
      await setDoc(doc(db, "trainer_profiles", profile.uid), profile);
    } catch (e) {
      console.error("Firestore error in saveTrainerProfile:", e);
      throw e;
    }
  }
};
