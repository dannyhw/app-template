import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { supabase } from "@/database/supabase.client";
import { sessionAtom } from "@/state/auth";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// for some reason relative fetch isn't working on dev even though it should
const fetchPath = __DEV__ ? "http://localhost:8081/api" : "/api";

function useFetchHello() {
  const toast = useToast();

  const fetchHello = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(`${fetchPath}/hello`, {
        headers: {
          "x-supabase-auth": session.access_token,
          "x-supabase-refresh": session.refresh_token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "hello-toast",
        render() {
          return (
            <Toast action="muted" variant="solid" className="min-w-40">
              <ToastTitle>Hello!</ToastTitle>

              <ToastDescription>
                {data.hello}

                {data.profile && (
                  <>
                    {`\nProfile: ${data.profile.first_name} ${data.profile.last_name}`}
                  </>
                )}
              </ToastDescription>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error(error);

      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "error-toast",
        render() {
          return (
            <Toast action="error" variant="solid" className="min-w-40">
              <ToastTitle>Error</ToastTitle>

              <ToastDescription>
                {error instanceof Error ? error.message : "An error occurred"}
              </ToastDescription>
            </Toast>
          );
        },
      });
    }
  }, [toast]);

  return fetchHello;
}

export default function HomeScreen() {
  const session = useAtomValue(sessionAtom);

  const toast = useToast();

  const insets = useSafeAreaInsets();

  const fetchHello = useFetchHello();

  return (
    <ScrollView style={{ padding: insets.top }}>
      <Text className="text-blue-800">Tab1</Text>

      <Button onPress={() => fetchHello()}>
        <ButtonText>Fetch from server</ButtonText>
      </Button>

      <Button
        className="my-4"
        onPress={async () => {
          try {
            const { data, error } = await supabase
              .from("profiles")
              .select()
              .maybeSingle();

            if (error) {
              throw error;
            }

            toast.show({
              placement: "bottom",
              duration: 3000,
              id: "profiles-toast",
              render() {
                return (
                  <Toast action="muted" variant="solid" className="min-w-40">
                    <ToastTitle>Profiles</ToastTitle>

                    <ToastDescription>{data?.first_name}</ToastDescription>
                  </Toast>
                );
              },
            });

            log({ data });
          } catch (error) {
            toast.show({
              placement: "bottom",
              duration: 3000,
              id: "profiles-error-toast",
              render() {
                return (
                  <Toast action="error" variant="solid" className="min-w-40">
                    <ToastTitle>Error</ToastTitle>

                    <ToastDescription>
                      {error instanceof Error
                        ? error.message
                        : "Failed to fetch profiles"}
                    </ToastDescription>
                  </Toast>
                );
              },
            });
          }
        }}
      >
        <ButtonText>Fetch client side</ButtonText>
      </Button>

      <Text>authenticated with: {session?.user.email}</Text>

      <Button onPress={() => supabase.auth.signOut()}>
        <ButtonText>Sign out</ButtonText>
      </Button>
    </ScrollView>
  );
}
