import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { signUp, signIn, signOut, getProfile } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [authLoading, setAuthLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // PROFILE LOADER (DEBUGGED)
  // =========================
  const loadProfile = useCallback(async (userId: string) => {
    console.log("🔍 loadProfile called with:", userId);

    try {
      const profileData = await getProfile(userId);

      console.log("📦 profileData received:", profileData);

      if (!profileData) {
        console.warn("⚠️ No profile found for user:", userId);
      }

      setProfile(profileData);
    } catch (err: any) {
      console.error("❌ loadProfile error:", err.message);
      setError(err.message);
      setProfile(null);
    }
  }, []);

  // =========================
  // AUTH LISTENER (DEBUGGED)
  // =========================
  useEffect(() => {
    console.log("🚀 Auth listener initialized");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔔 Auth state changed:", _event);

      const currentUser = session?.user ?? null;

      console.log("👤 currentUser:", currentUser);

      setUser(currentUser);

      if (currentUser) {
        console.log("📡 calling loadProfile...");
        loadProfile(currentUser.id);
      } else {
        console.log("🧹 clearing profile");
        setProfile(null);
      }
    });

    // =========================
    // INITIAL SESSION CHECK
    // =========================
    supabase.auth.getSession().then(({ data }) => {
      console.log("📦 getSession result:", data);

      const sessionUser = data.session?.user ?? null;

      console.log("👤 sessionUser:", sessionUser);

      setUser(sessionUser);

      if (sessionUser) {
        console.log("📡 calling loadProfile (initial)...");
        loadProfile(sessionUser.id);
      } else {
        console.log("🧹 no session user");
        setProfile(null);
      }

      setAuthLoading(false);
      console.log("✅ authLoading set to false");
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  // =========================
  // SIGN IN (DEBUGGED)
  // =========================
  const handleSignIn = useCallback(async (email: string, password: string) => {
    console.log("🔑 signIn attempt:", email);

    setActionLoading(true);
    setError(null);

    try {
      const data = await signIn(email, password);

      console.log("✅ signIn success:", data);

      return data;
    } catch (err: any) {
      console.error("❌ signIn error:", err.message);

      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
      console.log("🔄 actionLoading = false");
    }
  }, []);

  // =========================
  // SIGN UP (DEBUGGED)
  // =========================
  const handleSignUp = useCallback(async (payload: any) => {
    console.log("🆕 signUp attempt:", payload.email);

    setActionLoading(true);
    setError(null);

    try {
      const data = await signUp(
        payload.email,
        payload.password,
        payload.name,
        payload.role,
        payload.school,
        payload.phone
      );

      console.log("✅ signUp success:", data);

      return data;
    } catch (err: any) {
      console.error("❌ signUp error:", err.message);

      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  // =========================
  // SIGN OUT (DEBUGGED)
  // =========================
  const handleSignOut = useCallback(async () => {
    console.log("🚪 signOut");

    setActionLoading(true);
    setError(null);

    try {
      await signOut();

      console.log("✅ signOut success");

      setUser(null);
      setProfile(null);
    } catch (err: any) {
      console.error("❌ signOut error:", err.message);

      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  return {
    user,
    profile,
    authLoading,
    actionLoading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
}