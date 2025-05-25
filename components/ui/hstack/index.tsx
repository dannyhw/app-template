import { ComponentPropsWithRef } from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { View } from "react-native";
import { hstackStyle } from "./styles";

type IHStackProps = ComponentPropsWithRef<typeof View> &
  VariantProps<typeof hstackStyle>;

const HStack = function HStack({
  className,
  space,
  reversed,
  ref,
  ...props
}: IHStackProps) {
  return (
    <View
      className={hstackStyle({ space, reversed, class: className })}
      {...props}
      ref={ref}
    />
  );
};

HStack.displayName = "HStack";

export { HStack };
