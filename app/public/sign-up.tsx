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
import { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignInScreen() {
  const toast = useToast();

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

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
    <ScrollView
      style={{ padding: insets.top }}
      contentContainerClassName="gap-4"
    >
      <VStack space="xs" className="mt-8">
        <Text className="text-typography-900">Email</Text>

        <Input className="bg-white">
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
        <Text className="text-typography-900">Password</Text>

        <Input className="bg-white">
          <InputField
            type={showPassword ? "text" : "password"}
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
            autoCapitalize={"none"}
            autoCorrect={false}
            onSubmitEditing={() => signUpWithEmail()}
          />

          <InputSlot
            className="pr-3"
            onPress={() => setShowPassword((cur) => !cur)}
          >
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        </Input>
      </VStack>

      <Button
        className="mt-4"
        disabled={loading}
        onPress={() => signUpWithEmail()}
      >
        <ButtonText>Sign up</ButtonText>
      </Button>
    </ScrollView>
  );
}
