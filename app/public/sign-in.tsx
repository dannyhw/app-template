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

  return (
    <ScrollView style={{ padding: insets.top }}>
      <Text className="text-blue-800">Sign in</Text>

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
    </ScrollView>
  );
}
