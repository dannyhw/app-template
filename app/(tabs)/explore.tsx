import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ padding: insets.top }}>
      <Text>tab2</Text>
    </ScrollView>
  );
}
