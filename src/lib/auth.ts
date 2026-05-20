// lib/auth.ts
import { supabase } from "./supabase"; // your existing client

// Sign up a new user
export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: "student" | "landlord" | "admin",
  school?: string,
  phone?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,   // ✅ required by your schema
        email,                 // ✅ required by your schema
        role,                  // ✅ must be student/landlord/admin
        school,
        phone,
        kyc_status: "pending", // ✅ matches your check constraint
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function signIn(email: string, password: string) {
  console.log("SUPABASE SIGNIN START");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("SUPABASE RESPONSE", { data, error });

  if (error) throw new Error(error.message);

  console.log("SUPABASE SIGNIN END");

  return data;
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// Get the current user profile
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Update user profile
export async function updateProfile(userId: string, updates: object) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
