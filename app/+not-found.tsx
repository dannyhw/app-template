import { obi } from "@/assets/images";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { sessionAtom } from "@/state/auth";
import { Link, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { Image } from "react-native";

export default function NotFoundScreen() {
  const session = useAtomValue(sessionAtom);

  return (
    <VStack className="flex-1 items-center justify-center gap-4 px-4">
      <Stack.Screen options={{ title: "Oops!" }} />

      <Text className="text-center text-2xl font-bold">
        The is not the page you are looking for.
      </Text>

      <Image source={obi} className="w-full" />

      {session ? (
        <Link asChild href="/authenticated/(tabs)">
          <Button>
            <ButtonText>Go to home</ButtonText>
          </Button>
        </Link>
      ) : (
        <Link asChild href="/public/sign-in">
          <Button>
            <ButtonText>Go to sign in</ButtonText>
          </Button>
        </Link>
      )}
    </VStack>
  );
}
