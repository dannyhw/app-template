import { ComponentPropsWithRef } from "react";
import { View } from "react-native";
import { centerStyle } from "./styles";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type ICenterProps = ComponentPropsWithRef<typeof View> &
  VariantProps<typeof centerStyle>;

const Center = function Center({ className, ref, ...props }: ICenterProps) {
  return (
    <View className={centerStyle({ class: className })} {...props} ref={ref} />
  );
};

Center.displayName = "Center";

export { Center };
