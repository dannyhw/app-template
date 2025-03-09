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
import { useSegments, Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-url-polyfill/auto";
import "../hooks/useLog"; // import useLog hook for global registration
import "../util/log"; // relative path for reliable module resolution

// prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

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
        <HasAuth>
          <Stack>
            <Stack.Screen
              name="authenticated/(tabs)"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>

          <StatusBar style="auto" />
        </HasAuth>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

const HasAuth = ({ children }: { children: React.ReactNode }) => {
  const session = useAtomValue(sessionAtom);

  const segments = useSegments();

  const router = useRouter();

  useEffect(() => {
    if (!session && segments.at(0) !== "public") {
      console.log("redirecting to sign-in");

      return router.replace("/public/sign-in");
    }
  }, [session, segments, router]);

  return <>{children}</>;
};
