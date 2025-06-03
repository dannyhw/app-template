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
import { supabase } from "@/database/supabase.client";
import { Link } from "expo-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignInScreen() {
  const toast = useToast();

  const insets = useSafeAreaInsets();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }: { value: { email: string; password: string } }) => {
      await signInWithEmail(value.email, value.password);
    },
  });

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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

  return (
    <ScrollView
      style={{ padding: insets.top }}
      contentContainerClassName="gap-4"
    >
      <form.Provider>
        <VStack space="xs" className="mt-8">
          <Text className="text-typography-900">Email</Text>

          <form.Field name="email">
            {(field: any) => (
              <Input className="bg-white">
                <InputField
                  autoComplete="email"
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  value={field.state.value}
                  type="text"
                  onChangeText={field.handleChange}
                />
              </Input>
            )}
          </form.Field>
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-900">Password</Text>

          <form.Field name="password">
            {(field: any) => (
              <Input className="bg-white">
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  autoComplete="password"
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  onSubmitEditing={() => form.handleSubmit()}
                />

                <InputSlot
                  className="pr-3"
                  onPress={() => setShowPassword((cur) => !cur)}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          </form.Field>
        </VStack>

        <Button
          className="mt-4"
          disabled={loading}
          onPress={() => form.handleSubmit()}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>

        <Link href="/public/sign-up" asChild>
          <Button variant="link">
            <ButtonText>create account</ButtonText>
          </Button>
        </Link>
      </form.Provider>
    </ScrollView>
  );
}
