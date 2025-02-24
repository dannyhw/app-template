import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// Validate required environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error("EXPO_PUBLIC_SUPABASE_URL is not set");

if (!anonKey) throw new Error("EXPO_PUBLIC_SUPABASE_ANON_KEY is required");

export const supabase = createClient<Database>(supabaseUrl, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
