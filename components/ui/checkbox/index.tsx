"use client";

import { createCheckbox } from "@gluestack-ui/checkbox";
import { PrimitiveIcon, UIIcon } from "@gluestack-ui/icon";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import {
  useStyleContext,
  withStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";
import { cssInterop } from "nativewind";
import React, { ComponentPropsWithRef } from "react";
import { Platform, Pressable, Text, View } from "react-native";

const IndicatorWrapper = function IndicatorWrapper({
  ref,
  ...props
}: ComponentPropsWithRef<typeof View>) {
  return <View {...props} ref={ref} />;
};

const LabelWrapper = function LabelWrapper({
  ref,
  ...props
}: ComponentPropsWithRef<typeof Text>) {
  return <Text {...props} ref={ref} />;
};

const IconWrapper = function IconWrapper({
  ref,
  ...props
}: ComponentPropsWithRef<typeof PrimitiveIcon>) {
  return <UIIcon {...props} ref={ref} />;
};

const SCOPE = "CHECKBOX";

const UICheckbox = createCheckbox({
  // @ts-expect-error : internal implementation for r-19/react-native-web
  Root:
    Platform.OS === "web"
      ? withStyleContext(View, SCOPE)
      : withStyleContext(Pressable, SCOPE),
  Group: View,
  Icon: IconWrapper,
  Label: LabelWrapper,
  Indicator: IndicatorWrapper,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true,
    },
  },
});

const checkboxStyle = tva({
  base: "group/checkbox flex-row items-center justify-start web:cursor-pointer data-[disabled=true]:cursor-not-allowed",
  variants: {
    size: {
      lg: "gap-2",
      md: "gap-2",
      sm: "gap-1.5",
    },
  },
});

const checkboxIndicatorStyle = tva({
  base: "items-center justify-center rounded border-outline-400 bg-transparent data-[checked=true]:border-primary-600 data-[checked=true]:bg-primary-600 data-[invalid=true]:border-error-700 web:data-[focus-visible=true]:outline-none web:data-[focus-visible=true]:ring-2 web:data-[focus-visible=true]:ring-indicator-primary data-[hover=true]:data-[checked=false]:border-outline-500 data-[hover=true]:data-[checked=true]:bg-primary-700 data-[hover=true]:data-[checked=true]:border-primary-700 data-[hover=true]:data-[checked=true]:data-[disabled=true]:bg-primary-600 data-[hover=true]:data-[checked=true]:data-[disabled=true]:border-primary-600 data-[hover=true]:data-[checked=true]:data-[disabled=true]:data-[invalid=true]:border-error-700 data-[hover=true]:data-[checked=true]:data-[disabled=true]:opacity-40 data-[hover=true]:data-[invalid=true]:border-error-700 data-[hover=true]:bg-transparent data-[hover=true]:data-[disabled=true]:data-[invalid=true]:border-error-700 data-[hover=true]:data-[disabled=true]:border-outline-400 data-[active=true]:data-[checked=true]:bg-primary-800 data-[active=true]:data-[checked=true]:border-primary-800 data-[disabled=true]:opacity-40",
  parentVariants: {
    size: {
      lg: "h-6 w-6 border-[3px]",
      md: "h-5 w-5 border-2",
      sm: "h-4 w-4 border-2",
    },
  },
});

const checkboxLabelStyle = tva({
  base: "text-typography-600 web:select-none data-[checked=true]:text-typography-900 data-[hover=true]:data-[checked=true]:data-[disabled=true]:text-typography-900 data-[hover=true]:data-[checked=true]:text-typography-900 data-[hover=true]:text-typography-900 data-[hover=true]:data-[disabled=true]:text-typography-400 data-[active=true]:data-[checked=true]:text-typography-900 data-[active=true]:text-typography-900 data-[disabled=true]:opacity-40",
  parentVariants: {
    size: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
    },
  },
});

const checkboxIconStyle = tva({
  base: "fill-none text-typography-50",

  parentVariants: {
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    },
  },
});

const CheckboxGroup = UICheckbox.Group;

type ICheckboxProps = React.ComponentPropsWithRef<typeof UICheckbox> &
  VariantProps<typeof checkboxStyle>;

const Checkbox = function Checkbox({
  className,
  size = "md",
  ref,
  ...props
}: ICheckboxProps) {
  return (
    <UICheckbox
      className={checkboxStyle({
        class: className,
        size,
      })}
      {...props}
      context={{
        size,
      }}
      ref={ref}
    />
  );
};

type ICheckboxIndicatorProps = React.ComponentPropsWithRef<
  typeof UICheckbox.Indicator
> &
  VariantProps<typeof checkboxIndicatorStyle>;

const CheckboxIndicator = function CheckboxIndicator({
  className,
  size,
  ref,
  ...props
}: ICheckboxIndicatorProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UICheckbox.Indicator
      className={checkboxIndicatorStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
};

type ICheckboxLabelProps = React.ComponentPropsWithRef<
  typeof UICheckbox.Label
> &
  VariantProps<typeof checkboxLabelStyle>;

const CheckboxLabel = function CheckboxLabel({
  className,
  size,
  ref,
  ...props
}: ICheckboxLabelProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UICheckbox.Label
      className={checkboxLabelStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
};

type ICheckboxIconProps = React.ComponentPropsWithRef<typeof UICheckbox.Icon> &
  VariantProps<typeof checkboxIconStyle>;

const CheckboxIcon = function CheckboxIcon({
  className,
  size,
  ref,
  ...props
}: ICheckboxIconProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  if (typeof size === "number") {
    return (
      <UICheckbox.Icon
        ref={ref}
        {...props}
        className={checkboxIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UICheckbox.Icon
        ref={ref}
        {...props}
        className={checkboxIconStyle({ class: className })}
      />
    );
  }

  return (
    <UICheckbox.Icon
      className={checkboxIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
        size,
      })}
      {...props}
      ref={ref}
    />
  );
};

Checkbox.displayName = "Checkbox";

CheckboxIndicator.displayName = "CheckboxIndicator";

CheckboxLabel.displayName = "CheckboxLabel";

CheckboxIcon.displayName = "CheckboxIcon";

export {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
};
