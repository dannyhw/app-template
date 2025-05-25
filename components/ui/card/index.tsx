import { ComponentPropsWithRef } from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { View } from "react-native";
import { cardStyle } from "./styles";

type ICardProps = ComponentPropsWithRef<typeof View> &
  VariantProps<typeof cardStyle> & { className?: string };

const Card = function Card({
  className,
  size = "md",
  variant = "elevated",
  ref,
  ...props
}: ICardProps) {
  return (
    <View
      className={cardStyle({ size, variant, class: className })}
      {...props}
      ref={ref}
    />
  );
};

Card.displayName = "Card";

export { Card };
