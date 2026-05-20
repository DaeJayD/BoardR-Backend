// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Database Types ────────────────────────────────────────────────────────────

export type UserRole = "student" | "landlord" | "admin";
export type KYCStatus = "pending" | "verified" | "rejected";
export type InquiryStatus = "pending" | "replied" | "viewed" | "closed";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  school?: string;
  phone?: string;
  avatar_url?: string;
  kyc_status: KYCStatus;
  created_at: string;
}

export interface Listing {
  id: string;
  landlord_id: string;
  title: string;
  description?: string;
  address: string;
  price: number;
  room_type: string;
  school?: string;
  distance?: string;
  amenities: string[];
  rules: string[];
  images: string[];
  available: boolean;
  verified: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  // joined
  profiles?: Profile;
}

export interface Inquiry {
  id: string;
  listing_id: string;
  student_id: string;
  landlord_id: string;
  status: InquiryStatus;
  created_at: string;
  // joined
  listings?: Listing;
  student?: Profile;
  landlord?: Profile;
}

export interface Message {
  id: string;
  inquiry_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  // joined
  sender?: Profile;
}
