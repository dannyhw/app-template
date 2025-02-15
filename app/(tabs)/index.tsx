import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ padding: insets.top }}>
      <Text>Tab1</Text>
    </ScrollView>
  );
}
