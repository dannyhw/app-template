import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <VStack className="flex-1 items-center justify-center">
      <Stack.Screen options={{ title: "Oops!" }} />

      <Link asChild href="/public/sign-in">
        <Button>
          <ButtonText>Go to sign in</ButtonText>
        </Button>
      </Link>
    </VStack>
  );
}
