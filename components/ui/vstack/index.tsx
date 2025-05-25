import React from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { View } from "react-native";

import { vstackStyle } from "./styles";

type IVStackProps = React.ComponentPropsWithRef<typeof View> &
  VariantProps<typeof vstackStyle>;

const VStack = function VStack({
  className,
  space,
  reversed,
  ref,
  ...props
}: IVStackProps) {
  return (
    <View
      className={vstackStyle({ space, reversed, class: className })}
      {...props}
      ref={ref}
    />
  );
};

VStack.displayName = "VStack";

export { VStack };
