import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  currentUser: any | null;
  userProfile: any | null;
  loading: boolean;
  signIn: (email: string, pass: string, rememberMe: boolean) => Promise<void>;
  signUp: (email: string, pass: string, name: string, role: "student" | "trainer") => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendEmailVerificationLink: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Skeleton auth states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, pass: string, rememberMe: boolean) => {
    console.log("signIn to be implemented by user");
    // Placeholder actions
  };

  const signUp = async (email: string, pass: string, name: string, role: "student" | "trainer") => {
    console.log("signUp to be implemented by user");
    // Placeholder actions
  };

  const logout = async () => {
    console.log("logout to be implemented by user");
    setCurrentUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    console.log("resetPassword to be implemented by user");
  };

  const sendEmailVerificationLink = async () => {
    console.log("sendEmailVerificationLink to be implemented by user");
  };

  const reloadUser = async () => {
    console.log("reloadUser to be implemented by user");
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userProfile, 
      loading, 
      signIn, 
      signUp, 
      logout, 
      resetPassword,
      sendEmailVerificationLink,
      reloadUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
