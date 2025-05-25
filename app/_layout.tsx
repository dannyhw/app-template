import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { supabase } from "@/database/supabase.client";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { sessionAtom } from "@/state/auth";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-url-polyfill/auto";
import "../hooks/useLog"; // import useLog hook for global registration
import "../util/log"; // relative path for reliable module resolution

// prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: newSession } }) => {
        setSession(newSession);

        if (newSession) {
          router.replace("/authenticated/(tabs)");
        }
      })
      .catch((e) => {
        console.error(e);
      });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
  }, [setSession, router]);

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Protected guard={Boolean(session)}>
            <Stack.Screen
              name="authenticated/(tabs)"
              options={{ headerShown: false }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!session}>
            <Stack.Screen name="public/sign-in" />

            <Stack.Screen name="public/sign-up" />
          </Stack.Protected>

          <Stack.Screen name="+not-found" />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
