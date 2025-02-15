import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";

function useFetchHello() {
  const toast = useToast();

  const fetchHello = useCallback(async () => {
    try {
      const response = await fetch(`/hello`);

      const data = await response.json();

      toast.show({
        placement: "bottom",
        duration: 3000,
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
  }, []);

  return fetchHello;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const fetchHello = useFetchHello();

  return (
    <ScrollView style={{ padding: insets.top }}>
      <Text className="text-blue-800">Tab1</Text>

      <Button onPress={() => fetchHello()}>
        <ButtonText>Fetch Hello</ButtonText>
      </Button>
    </ScrollView>
  );
}
