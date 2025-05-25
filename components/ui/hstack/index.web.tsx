import React from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { hstackStyle } from "./styles";

type IHStackProps = React.ComponentProps<"div"> &
  VariantProps<typeof hstackStyle>;

const HStack = function HStack({
  className,
  space,
  reversed,
  ref,
  ...props
}: IHStackProps) {
  return (
    <div
      className={hstackStyle({ space, reversed, class: className })}
      {...props}
      ref={ref}
    />
  );
};

HStack.displayName = "HStack";

export { HStack };
