import { ComponentPropsWithRef } from "react";
import { View } from "react-native";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { boxStyle } from "./styles";

type IBoxProps = ComponentPropsWithRef<typeof View> &
  VariantProps<typeof boxStyle> & { className?: string };

const Box = function Box({ className, ref, ...props }: IBoxProps) {
  return (
    <View ref={ref} {...props} className={boxStyle({ class: className })} />
  );
};

Box.displayName = "Box";

export { Box };
