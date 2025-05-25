import React from "react";
import { centerStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type ICenterProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof centerStyle> & { className?: string };

const Center = function Center({ className, ref, ...props }: ICenterProps) {
  return (
    <div className={centerStyle({ class: className })} {...props} ref={ref} />
  );
};

Center.displayName = "Center";

export { Center };
