import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "trainee" | "trainer" | "admin";
export type UserGender = "male" | "female" | "other" | "prefer-not-to-say";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  gender: UserGender;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    gender: UserGender;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "itplacementx_user";
const USERS_KEY = "itplacementx_users";

function loadUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUser(user: UserProfile | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveUsers(users: UserProfile[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = loadUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const signIn = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // Simulate network

    const users = loadUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setLoading(false);
      return { success: false, error: "No account found with this email. Please register first." };
    }

    // In a real app, compare hashed password. Here we store a hash marker.
    const storedPw = localStorage.getItem(`itpx_pw_${user.uid}`);
    if (storedPw !== password) {
      setLoading(false);
      return { success: false, error: "Incorrect password. Please try again." };
    }

    if (user.role !== role) {
      setLoading(false);
      return {
        success: false,
        error: `This account is registered as a ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}, not ${role.charAt(0).toUpperCase() + role.slice(1)}.`,
      };
    }

    saveUser(user);
    setCurrentUser(user);
    setLoading(false);
    return { success: true };
  };

  const signUp = async (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    gender: UserGender;
  }): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // Simulate network

    const users = loadUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (exists) {
      setLoading(false);
      return { success: false, error: "An account with this email already exists. Please sign in." };
    }

    const newUser: UserProfile = {
      uid: `uid_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      role: data.role,
      gender: data.gender,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`itpx_pw_${newUser.uid}`, data.password);
    saveUsers([...users, newUser]);
    saveUser(newUser);
    setCurrentUser(newUser);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    saveUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function getRoleDashboard(role: UserRole): string {
  switch (role) {
    case "trainer": return "/trainer/dashboard";
    case "admin": return "/admin/dashboard";
    default: return "/student/dashboard";
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case "trainer": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    case "admin": return "text-amber-400 bg-amber-400/10 border-amber-400/30";
    default: return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
  }
}
