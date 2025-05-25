"use client";

import React from "react";
import { createAccordion } from "@gluestack-ui/accordion";
import { View, Pressable, Text, Platform, TextProps } from "react-native";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import {
  withStyleContext,
  useStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";
import { H3 } from "@expo/html-elements";
import { cssInterop } from "nativewind";
import { PrimitiveIcon, UIIcon } from "@gluestack-ui/icon";

const SCOPE = "ACCORDION";
/** Styles */

const accordionStyle = tva({
  base: "w-full",
  variants: {
    variant: {
      filled: "bg-white shadow-hard-2",
      unfilled: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
});

const accordionItemStyle = tva({
  base: "",
  parentVariants: {
    variant: {
      filled: "bg-background-0",
      unfilled: "bg-transparent",
    },
  },
});

const accordionTitleTextStyle = tva({
  base: "flex-1 text-left font-bold text-typography-900",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});

const accordionIconStyle = tva({
  base: "fill-none text-typography-900",
  parentVariants: {
    size: {
      "2xs": "h-3 w-3",
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    },
  },
});

const accordionContentTextStyle = tva({
  base: "font-normal text-typography-700",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});

const accordionHeaderStyle = tva({
  base: "mx-0 my-0",
});

const accordionContentStyle = tva({
  base: "px-4 pb-3 pt-1",
});

const accordionTriggerStyle = tva({
  base: "w-full flex-row items-center justify-between px-4 py-3 focus:outline-none web:outline-none data-[focus-visible=true]:bg-background-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40",
});

const Root = withStyleContext(View, SCOPE);

const Header = (
  Platform.OS === "web" ? H3 : View
) as React.ComponentType<TextProps>;

/** Creator */
const UIAccordion = createAccordion({
  Root: Root,
  Item: View,
  Header: Header,
  Trigger: Pressable,
  Icon: UIIcon,
  TitleText: Text,
  ContentText: Text,
  Content: View,
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

cssInterop(H3, {
  className: {
    target: "style",
  },
});

type IAccordionProps = React.ComponentProps<typeof UIAccordion> &
  VariantProps<typeof accordionStyle>;

type IAccordionItemProps = React.ComponentProps<typeof UIAccordion.Item> &
  VariantProps<typeof accordionItemStyle>;

type IAccordionContentProps = React.ComponentProps<typeof UIAccordion.Content> &
  VariantProps<typeof accordionContentStyle>;

type IAccordionContentTextProps = React.ComponentProps<
  typeof UIAccordion.ContentText
> &
  VariantProps<typeof accordionContentTextStyle>;

type IAccordionIconProps = VariantProps<typeof accordionIconStyle> &
  React.ComponentProps<typeof UIAccordion.Icon> & {
    as?: React.ElementType;
    height?: number;
    width?: number;
  };

type IAccordionHeaderProps = React.ComponentProps<typeof UIAccordion.Header> &
  VariantProps<typeof accordionHeaderStyle>;

type IAccordionTriggerProps = React.ComponentProps<typeof UIAccordion.Trigger> &
  VariantProps<typeof accordionTriggerStyle>;

type IAccordionTitleTextProps = React.ComponentProps<
  typeof UIAccordion.TitleText
> &
  VariantProps<typeof accordionTitleTextStyle>;

/** Components */

const Accordion = ({
  className,
  variant = "filled",
  size = "md",
  ref,
  ...props
}: IAccordionProps) => {
  return (
    <UIAccordion
      ref={ref}
      {...props}
      className={accordionStyle({ variant, class: className })}
      context={{ variant, size }}
    />
  );
};

const AccordionItem = ({ className, ref, ...props }: IAccordionItemProps) => {
  const { variant } = useStyleContext(SCOPE);

  return (
    <UIAccordion.Item
      ref={ref}
      {...props}
      className={accordionItemStyle({
        parentVariants: { variant },
        class: className,
      })}
    />
  );
};

const AccordionContent = ({
  className,
  ref,
  ...props
}: IAccordionContentProps) => {
  return (
    <UIAccordion.Content
      ref={ref}
      {...props}
      className={accordionContentStyle({
        class: className,
      })}
    />
  );
};

const AccordionContentText = ({
  className,
  ref,
  ...props
}: IAccordionContentTextProps) => {
  const { size } = useStyleContext(SCOPE);

  return (
    <UIAccordion.ContentText
      ref={ref}
      {...props}
      className={accordionContentTextStyle({
        parentVariants: { size },
        class: className,
      })}
    />
  );
};

const AccordionIcon = ({
  size,
  className,
  ref,
  ...props
}: IAccordionIconProps) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  if (typeof size === "number") {
    return (
      <UIAccordion.Icon
        ref={ref}
        {...props}
        className={accordionIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIAccordion.Icon
        ref={ref}
        {...props}
        className={accordionIconStyle({ class: className })}
      />
    );
  }

  return (
    <UIAccordion.Icon
      ref={ref}
      {...props}
      className={accordionIconStyle({
        size,
        class: className,
        parentVariants: { size: parentSize },
      })}
    />
  );
};

const AccordionHeader = ({
  className,
  ref,
  ...props
}: IAccordionHeaderProps) => {
  return (
    <UIAccordion.Header
      ref={ref}
      {...props}
      className={accordionHeaderStyle({
        class: className,
      })}
    />
  );
};

const AccordionTrigger = ({
  className,
  ref,
  ...props
}: IAccordionTriggerProps) => {
  return (
    <UIAccordion.Trigger
      ref={ref}
      {...props}
      className={accordionTriggerStyle({
        class: className,
      })}
    />
  );
};

const AccordionTitleText = ({
  className,
  ref,
  ...props
}: IAccordionTitleTextProps) => {
  const { size } = useStyleContext(SCOPE);

  return (
    <UIAccordion.TitleText
      ref={ref}
      {...props}
      className={accordionTitleTextStyle({
        parentVariants: { size },
        class: className,
      })}
    />
  );
};

Accordion.displayName = "Accordion";

AccordionItem.displayName = "AccordionItem";

AccordionHeader.displayName = "AccordionHeader";

AccordionTrigger.displayName = "AccordionTrigger";

AccordionTitleText.displayName = "AccordionTitleText";

AccordionContentText.displayName = "AccordionContentText";

AccordionIcon.displayName = "AccordionIcon";

AccordionContent.displayName = "AccordionContent";

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
};
