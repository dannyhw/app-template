import { supabase } from "@/database/supabase.client";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState } from "react";
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
  const toast = useToast();

  const insets = useSafeAreaInsets();

  const fetchHello = useFetchHello();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "login-error-toast",
        render() {
          return (
            <Toast action="muted" variant="solid" className="min-w-40">
              <ToastTitle>error</ToastTitle>

              <ToastDescription>{error.message}</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "loggedin-toast",
        render() {
          return (
            <Toast action="muted" variant="solid" className="min-w-40">
              <ToastTitle>logged in</ToastTitle>

              <ToastDescription>you loggedin</ToastDescription>
            </Toast>
          );
        },
      });
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      log(data);

      if (error) {
        toast.show({
          placement: "bottom",
          duration: 3000,
          id: "signup-error-toast1",
          render() {
            return (
              <Toast action="muted" variant="solid" className="min-w-40">
                <ToastTitle>error</ToastTitle>

                <ToastDescription>{error.message}</ToastDescription>
              </Toast>
            );
          },
        });
      }

      if (!data.session) {
        log(data);

        toast.show({
          placement: "bottom",
          duration: 3000,
          id: "signup-error-toast2",
          render() {
            return (
              <Toast action="muted" variant="solid" className="min-w-40">
                <ToastTitle>No session</ToastTitle>

                <ToastDescription>
                  Please check your inbox for email verification!
                </ToastDescription>
              </Toast>
            );
          },
        });
      }
    } catch (error: any) {
      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "signup-error-toast3",
        render() {
          return (
            <Toast action="muted" variant="solid" className="min-w-40">
              <ToastTitle>error</ToastTitle>

              <ToastDescription>{error.message}</ToastDescription>
            </Toast>
          );
        },
      });
    }

    setLoading(false);
  }

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

      <VStack space="xs" className="mt-8">
        <Text className="text-typography-500">Email</Text>

        <Input>
          <InputField
            autoComplete="email"
            autoCapitalize={"none"}
            autoCorrect={false}
            value={email}
            type="text"
            onChangeText={setEmail}
          />
        </Input>
      </VStack>

      <VStack space="xs">
        <Text className="text-typography-500">Password</Text>

        <Input className="text-center">
          <InputField
            type={showPassword ? "text" : "password"}
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
            autoCapitalize={"none"}
            autoCorrect={false}
            onSubmitEditing={() => signInWithEmail()}
          />

          <InputSlot
            className="pr-3"
            onPress={() => setShowPassword((cur) => !cur)}
          >
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        </Input>
      </VStack>

      <Box className="py-4">
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          <ButtonText>Sign in</ButtonText>
        </Button>
      </Box>

      <Box className="py-4">
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </Box>
    </ScrollView>
  );
}
