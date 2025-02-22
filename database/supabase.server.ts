import { createServerClient } from "@supabase/ssr";
import { Database } from "./database.types";

// Validate required environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) throw new Error("EXPO_PUBLIC_SUPABASE_URL is not set");

if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");

// In-memory cookie store for server-side
const cookies = new Map<string, string>();

export const getSupabase = () =>
  createServerClient<Database>(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    cookies: {
      getAll: () =>
        Promise.resolve(
          Array.from(cookies.entries()).map(([name, value]) => ({
            name,
            value,
          })),
        ),
      setAll: (cookiesToSet) =>
        cookiesToSet.forEach(({ name, value }) => cookies.set(name, value)),
    },
  });
