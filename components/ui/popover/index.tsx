"use client";

import React from "react";
import { View, Pressable, ScrollView, ViewStyle } from "react-native";
import {
  Motion,
  createMotionAnimatedComponent,
  AnimatePresence,
  MotionComponentProps,
} from "@legendapp/motion";
import { createPopover } from "@gluestack-ui/popover";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import {
  withStyleContext,
  useStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";
import { cssInterop } from "nativewind";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type IAnimatedPressableProps = React.ComponentProps<typeof Pressable> &
  MotionComponentProps<typeof Pressable, ViewStyle, unknown, unknown, unknown>;

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable,
) as React.ComponentType<IAnimatedPressableProps>;

const SCOPE = "POPOVER";

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

const UIPopover = createPopover({
  Root: withStyleContext(View, SCOPE),
  Arrow: MotionView,
  Backdrop: AnimatedPressable,
  Body: ScrollView,
  CloseButton: Pressable,
  Content: MotionView,
  Footer: View,
  Header: View,
  AnimatePresence: AnimatePresence,
});

cssInterop(MotionView, { className: "style" });

cssInterop(AnimatedPressable, { className: "style" });

const popoverStyle = tva({
  base: "group/popover h-full w-full items-center justify-center web:pointer-events-none",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      full: "",
    },
  },
});

const popoverArrowStyle = tva({
  base: "absolute z-[1] h-3.5 w-3.5 overflow-hidden border border-outline-100 bg-background-0",
  variants: {
    placement: {
      "top left":
        "data-[flip=false]:border-l-0 data-[flip=false]:border-t-0 data-[flip=true]:border-b-0 data-[flip=true]:border-r-0",
      top: "data-[flip=false]:border-l-0 data-[flip=false]:border-t-0 data-[flip=true]:border-b-0 data-[flip=true]:border-r-0",
      "top right":
        "data-[flip=false]:border-l-0 data-[flip=false]:border-t-0 data-[flip=true]:border-b-0 data-[flip=true]:border-r-0",
      bottom:
        "data-[flip=false]:border-b-0 data-[flip=false]:border-r-0 data-[flip=true]:border-l-0 data-[flip=true]:border-t-0",
      "bottom left":
        "data-[flip=false]:border-b-0 data-[flip=false]:border-r-0 data-[flip=true]:border-l-0 data-[flip=true]:border-t-0",
      "bottom right":
        "data-[flip=false]:border-b-0 data-[flip=false]:border-r-0 data-[flip=true]:border-l-0 data-[flip=true]:border-t-0",
      left: "data-[flip=false]:border-b-0 data-[flip=false]:border-l-0 data-[flip=true]:border-r-0 data-[flip=true]:border-t-0",
      "left top":
        "data-[flip=false]:border-b-0 data-[flip=false]:border-l-0 data-[flip=true]:border-r-0 data-[flip=true]:border-t-0",
      "left bottom":
        "data-[flip=false]:border-b-0 data-[flip=false]:border-l-0 data-[flip=true]:border-r-0 data-[flip=true]:border-t-0",
      right:
        "data-[flip=false]:border-r-0 data-[flip=false]:border-t-0 data-[flip=true]:border-b-0 data-[flip=true]:border-l-0",
      "right top":
        "data-[flip=false]:border-r-0 data-[flip=false]:border-t-0 data-[flip=true]:border-b-0 data-[flip=true]:border-l-0",
      "right bottom":
        "data-[flip=false]:border-r-0 data-[flip=false]:border-t-0 data-[flip=true]:border-b-0 data-[flip=true]:border-l-0",
    },
  },
});

const popoverBackdropStyle = tva({
  base: "absolute bottom-0 left-0 right-0 top-0 web:cursor-default",
});

const popoverCloseButtonStyle = tva({
  base: "group/popover-close-button z-[1] rounded-sm web:cursor-pointer web:outline-0 data-[focus-visible=true]:web:bg-background-100",
});

const popoverContentStyle = tva({
  base: "w-full overflow-hidden rounded-lg border border-outline-100 bg-background-0",
  parentVariants: {
    size: {
      xs: "max-w-[360px] p-3.5",
      sm: "max-w-[420px] p-4",
      md: "max-w-[510px] p-[18px]",
      lg: "max-w-[640px] p-5",
      full: "p-6",
    },
  },
});

const popoverHeaderStyle = tva({
  base: "flex-row items-center justify-between",
});

const popoverBodyStyle = tva({
  base: "",
});

const popoverFooterStyle = tva({
  base: "flex-row items-center justify-between",
});

type IPopoverProps = React.ComponentProps<typeof UIPopover> &
  VariantProps<typeof popoverStyle> & { className?: string };

type IPopoverArrowProps = React.ComponentProps<typeof UIPopover.Arrow> &
  VariantProps<typeof popoverArrowStyle> & { className?: string };

type IPopoverContentProps = React.ComponentProps<typeof UIPopover.Content> &
  VariantProps<typeof popoverContentStyle> & { className?: string };

type IPopoverHeaderProps = React.ComponentProps<typeof UIPopover.Header> &
  VariantProps<typeof popoverHeaderStyle> & { className?: string };

type IPopoverFooterProps = React.ComponentProps<typeof UIPopover.Footer> &
  VariantProps<typeof popoverFooterStyle> & { className?: string };

type IPopoverBodyProps = React.ComponentProps<typeof UIPopover.Body> &
  VariantProps<typeof popoverBodyStyle> & { className?: string };

type IPopoverBackdropProps = React.ComponentProps<typeof UIPopover.Backdrop> &
  VariantProps<typeof popoverBackdropStyle> & { className?: string };

type IPopoverCloseButtonProps = React.ComponentProps<
  typeof UIPopover.CloseButton
> &
  VariantProps<typeof popoverCloseButtonStyle> & { className?: string };

const Popover = function Popover({
  className,
  size = "md",
  placement = "bottom",
  ref,
  ...props
}: IPopoverProps) {
  return (
    <UIPopover
      ref={ref}
      placement={placement}
      {...props}
      className={popoverStyle({ size, class: className })}
      context={{ size, placement }}
      pointerEvents="box-none"
    />
  );
};

const PopoverContent = function PopoverContent({
  className,
  size,
  ref,
  ...props
}: IPopoverContentProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIPopover.Content
      ref={ref}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 250,
        mass: 0.9,
        opacity: {
          type: "timing",
          duration: 50,
          delay: 50,
        },
      }}
      {...props}
      className={popoverContentStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
      pointerEvents="auto"
    />
  );
};

const PopoverArrow = function PopoverArrow({
  className,
  ref,
  ...props
}: IPopoverArrowProps) {
  const { placement } = useStyleContext(SCOPE);

  return (
    <UIPopover.Arrow
      ref={ref}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 250,
        mass: 0.9,
        opacity: {
          type: "timing",
          duration: 50,
          delay: 50,
        },
      }}
      {...props}
      className={popoverArrowStyle({
        class: className,
        placement,
      })}
    />
  );
};

const PopoverBackdrop = function PopoverBackdrop({
  className,
  ref,
  ...props
}: IPopoverBackdropProps) {
  return (
    <UIPopover.Backdrop
      ref={ref}
      {...props}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 450,
        mass: 0.9,
        opacity: {
          type: "timing",
          duration: 50,
          delay: 50,
        },
      }}
      className={popoverBackdropStyle({
        class: className,
      })}
    />
  );
};

const PopoverBody = function PopoverBody({
  className,
  ref,
  ...props
}: IPopoverBodyProps) {
  return (
    <UIPopover.Body
      ref={ref}
      {...props}
      className={popoverBodyStyle({
        class: className,
      })}
    />
  );
};

const PopoverCloseButton = function PopoverCloseButton({
  className,
  ref,
  ...props
}: IPopoverCloseButtonProps) {
  return (
    <UIPopover.CloseButton
      ref={ref}
      {...props}
      className={popoverCloseButtonStyle({
        class: className,
      })}
    />
  );
};

const PopoverFooter = function PopoverFooter({
  className,
  ref,
  ...props
}: IPopoverFooterProps) {
  return (
    <UIPopover.Footer
      ref={ref}
      {...props}
      className={popoverFooterStyle({
        class: className,
      })}
    />
  );
};

const PopoverHeader = function PopoverHeader({
  className,
  ref,
  ...props
}: IPopoverHeaderProps) {
  return (
    <UIPopover.Header
      ref={ref}
      {...props}
      className={popoverHeaderStyle({
        class: className,
      })}
    />
  );
};

Popover.displayName = "Popover";

PopoverArrow.displayName = "PopoverArrow";

PopoverBackdrop.displayName = "PopoverBackdrop";

PopoverContent.displayName = "PopoverContent";

PopoverHeader.displayName = "PopoverHeader";

PopoverFooter.displayName = "PopoverFooter";

PopoverBody.displayName = "PopoverBody";

PopoverCloseButton.displayName = "PopoverCloseButton";

export {
  Popover,
  PopoverBackdrop,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
};
