import React from "react";
import { boxStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type IBoxProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof boxStyle> & { className?: string };

const Box = function Box({ className, ref, ...props }: IBoxProps) {
  return (
    <div ref={ref} className={boxStyle({ class: className })} {...props} />
  );
};

Box.displayName = "Box";

export { Box };
