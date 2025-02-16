import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <Text>Not found</Text>
    </>
  );
}
