import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// for some reason relative fetch isn't working on dev even though it should
const fetchPath = __DEV__ ? "http://localhost:8081" : "";

function useFetchHello() {
  const toast = useToast();

  const fetchHello = useCallback(async () => {
    try {
      const response = await fetch(`${fetchPath}/hello`);

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
  }, [toast]);

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
