import React from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { textStyle } from "./styles";

type ITextProps = React.ComponentProps<"span"> & VariantProps<typeof textStyle>;

const Text = function Text({
  className,
  isTruncated,
  bold,
  underline,
  strikeThrough,
  size = "md",
  sub,
  italic,
  highlight,
  ref,
  ...props
}: { className?: string } & ITextProps) {
  return (
    <span
      className={textStyle({
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size,
        sub,
        italic,
        highlight,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
};

Text.displayName = "Text";

export { Text };
