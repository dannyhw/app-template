"use client";

import React from "react";
import { createAvatar } from "@gluestack-ui/avatar";

import { View, Text, Image, Platform } from "react-native";

import { tva } from "@gluestack-ui/nativewind-utils/tva";
import {
  withStyleContext,
  useStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
const SCOPE = "AVATAR";

const UIAvatar = createAvatar({
  Root: withStyleContext(View, SCOPE),
  Badge: View,
  Group: View,
  Image: Image,
  FallbackText: Text,
});

const avatarStyle = tva({
  base: "relative items-center justify-center rounded-full bg-primary-600 group-[.avatar-group]/avatar-group:-ml-2.5",
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
      xl: "h-24 w-24",
      "2xl": "h-32 w-32",
    },
  },
});

const avatarFallbackTextStyle = tva({
  base: "text-transform:uppercase overflow-hidden font-semibold text-typography-0 web:cursor-default",

  parentVariants: {
    size: {
      xs: "text-2xs",
      sm: "text-xs",
      md: "text-base",
      lg: "text-xl",
      xl: "text-3xl",
      "2xl": "text-5xl",
    },
  },
});

const avatarGroupStyle = tva({
  base: "group/avatar-group avatar-group relative flex-row-reverse",
});

const avatarBadgeStyle = tva({
  base: "absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-background-0 bg-success-500",
  parentVariants: {
    size: {
      xs: "h-2 w-2",
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
      xl: "h-6 w-6",
      "2xl": "h-8 w-8",
    },
  },
});

const avatarImageStyle = tva({
  base: "absolute h-full w-full rounded-full",
});

type IAvatarProps = Omit<React.ComponentProps<typeof UIAvatar>, "context"> &
  VariantProps<typeof avatarStyle>;

const Avatar = function Avatar({
  className,
  size = "md",
  ref,
  ...props
}: IAvatarProps) {
  return (
    <UIAvatar
      ref={ref}
      {...props}
      className={avatarStyle({ size, class: className })}
      context={{ size }}
    />
  );
};

type IAvatarBadgeProps = React.ComponentProps<typeof UIAvatar.Badge> &
  VariantProps<typeof avatarBadgeStyle>;

const AvatarBadge = function AvatarBadge({
  className,
  size,
  ref,
  ...props
}: IAvatarBadgeProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIAvatar.Badge
      ref={ref}
      {...props}
      className={avatarBadgeStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
    />
  );
};

type IAvatarFallbackTextProps = React.ComponentProps<
  typeof UIAvatar.FallbackText
> &
  VariantProps<typeof avatarFallbackTextStyle>;

const AvatarFallbackText = function AvatarFallbackText({
  className,
  size,
  ref,
  ...props
}: IAvatarFallbackTextProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIAvatar.FallbackText
      ref={ref}
      {...props}
      className={avatarFallbackTextStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
    />
  );
};

type IAvatarImageProps = React.ComponentProps<typeof UIAvatar.Image> &
  VariantProps<typeof avatarImageStyle>;

const AvatarImage = function AvatarImage({
  className,
  ref,
  ...props
}: IAvatarImageProps) {
  return (
    <UIAvatar.Image
      ref={ref}
      {...props}
      className={avatarImageStyle({
        class: className,
      })}
      // @ts-expect-error : This is a workaround to fix the issue with the image style on web.
      style={
        Platform.OS === "web"
          ? { height: "revert-layer", width: "revert-layer" }
          : undefined
      }
    />
  );
};

type IAvatarGroupProps = React.ComponentProps<typeof UIAvatar.Group> &
  VariantProps<typeof avatarGroupStyle>;

const AvatarGroup = function AvatarGroup({
  className,
  ref,
  ...props
}: IAvatarGroupProps) {
  return (
    <UIAvatar.Group
      ref={ref}
      {...props}
      className={avatarGroupStyle({
        class: className,
      })}
    />
  );
};

export { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage, AvatarGroup };
