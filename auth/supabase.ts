import { AppState } from "react-native";
// import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { storage } from "@/util/localStorage";

if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  throw new Error("EXPO_PUBLIC_SUPABASE_URL is not set");
}

if (!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("EXPO_PUBLIC_SUPABASE_ANON_KEY is not set");
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key: string) => {
        return storage.getString(key) ?? "";
      },
      setItem: storage.set,
      removeItem: storage.delete,
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
