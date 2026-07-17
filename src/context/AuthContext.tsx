import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/firebase/config";

// ─── Types ──────────────────────────────────────────────────────────────────
export type UserRole = "trainee" | "trainer" | "admin";
export type UserGender = "male" | "female" | "other" | "prefer-not-to-say";

export interface AppUser {
  uid: string;
  email: string;
  fullName: string;
  gender: UserGender;
  role: UserRole;
  createdAt: string;
  profileCompleted: boolean;
  isActive: boolean;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  signUp: (data: {
    fullName: string;
    email: string;
    password: string;
    gender: UserGender;
    role: UserRole;
  }) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string,
    role: UserRole
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAppUser: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function getRoleDashboard(role: UserRole): string {
  switch (role) {
    case "trainer":
      return "/trainer/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/student/dashboard";
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case "trainer":
      return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    case "admin":
      return "text-amber-400 bg-amber-400/10 border-amber-400/30";
    default:
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
  }
}

function parseFirebaseError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please sign in.";
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email. Please register first.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return "An error occurred. Please try again.";
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Firestore user doc
  async function fetchAppUser(uid: string): Promise<AppUser | null> {
    if (!isFirebaseConfigured || !db) return null;
    try {
      const snap = await getDoc(doc(db, "users", uid));
      return snap.exists() ? (snap.data() as AppUser) : null;
    } catch (e) {
      console.error("Firestore fetchAppUser error:", e);
      return null;
    }
  }

  async function refreshAppUser() {
    if (currentUser) {
      const data = await fetchAppUser(currentUser.uid);
      setAppUser(data);
    }
  }

  // Auth state listener
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const data = await fetchAppUser(user.uid);
        setAppUser(data);
      } else {
        setAppUser(null);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  // ─── Sign Up ───────────────────────────────────────────────────────────────
  const signUp = async (data: {
    fullName: string;
    email: string;
    password: string;
    gender: UserGender;
    role: UserRole;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth || !db) {
      return {
        success: false,
        error:
          "Firebase is not configured. Please add your Firebase credentials to .env file.",
      };
    }

    try {
      // 1. Create Firebase Auth account
      const cred = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password
      );

      // 2. Build Firestore user document
      const userDoc: AppUser = {
        uid: cred.user.uid,
        email: data.email.trim().toLowerCase(),
        fullName: data.fullName.trim(),
        gender: data.gender,
        role: data.role,
        createdAt: new Date().toISOString(),
        profileCompleted: false,
        isActive: true,
      };

      // 3. Save to Firestore `users` collection
      await setDoc(doc(db, "users", cred.user.uid), {
        ...userDoc,
        createdAt: serverTimestamp(),
      });

      setAppUser(userDoc);
      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: parseFirebaseError(e.code || ""),
      };
    }
  };

  // ─── Sign In ───────────────────────────────────────────────────────────────
  const signIn = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      return {
        success: false,
        error:
          "Firebase is not configured. Please add your Firebase credentials to .env file.",
      };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      // Verify role matches Firestore
      const userData = await fetchAppUser(cred.user.uid);
      if (userData && userData.role !== role) {
        await signOut(auth);
        return {
          success: false,
          error: `This account is registered as a ${userData.role}. Please select the correct role.`,
        };
      }

      setAppUser(userData);
      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: parseFirebaseError(e.code || ""),
      };
    }
  };

  // ─── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    if (auth) await signOut(auth);
    setCurrentUser(null);
    setAppUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, appUser, loading, signUp, signIn, logout, refreshAppUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
