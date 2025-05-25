import React from "react";
import { cardStyle } from "./styles";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type ICardProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof cardStyle>;

const Card = function Card({
  className,
  size = "md",
  variant = "elevated",
  ref,
  ...props
}: ICardProps) {
  return (
    <div
      className={cardStyle({ size, variant, class: className })}
      {...props}
      ref={ref}
    />
  );
};

Card.displayName = "Card";

export { Card };
