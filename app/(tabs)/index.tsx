import { supabase } from "@/auth/supabase";
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
      const response = await fetch(`${fetchPath}/hello`);

      const data = await response.json();

      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "hello-toast",
        render() {
          return (
            <Toast action="muted" variant="solid" className="min-w-40">
              <ToastTitle>Hello!</ToastTitle>

              <ToastDescription>{data.hello}</ToastDescription>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [toast]);

  return fetchHello;
}

export default function HomeScreen() {
  const toast = useToast();

  const insets = useSafeAreaInsets();

  const fetchHello = useFetchHello();

  useLogjam("hello");

  useLogjam({ example: "hello" });

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
        id: "hello-toast",
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

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "hello-toast",
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

    if (!session) {
      toast.show({
        placement: "bottom",
        duration: 3000,
        id: "hello-toast",
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

    setLoading(false);
  }

  return (
    <ScrollView style={{ padding: insets.top }}>
      <Text className="text-blue-800">Tab1</Text>

      <Button onPress={() => fetchHello()}>
        <ButtonText>Fetch Hello</ButtonText>
      </Button>

      <VStack space="xs" className="mt-8">
        <Text className="text-typography-500">Email</Text>

        <Input>
          <InputField value={email} type="text" onChangeText={setEmail} />
        </Input>
      </VStack>

      <VStack space="xs">
        <Text className="text-typography-500">Password</Text>

        <Input className="text-center">
          <InputField
            type={showPassword ? "text" : "password"}
            value={password}
            onChangeText={setPassword}
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
