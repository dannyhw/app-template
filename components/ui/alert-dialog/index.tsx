"use client";

import React from "react";
import { createAlertDialog } from "@gluestack-ui/alert-dialog";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import {
  withStyleContext,
  useStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";

import { cssInterop } from "nativewind";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import {
  Motion,
  AnimatePresence,
  createMotionAnimatedComponent,
  MotionComponentProps,
} from "@legendapp/motion";
import { View, Pressable, ScrollView, ViewStyle } from "react-native";

const SCOPE = "ALERT_DIALOG";

const RootComponent = withStyleContext(View, SCOPE);

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

type IAnimatedPressableProps = React.ComponentProps<typeof Pressable> &
  MotionComponentProps<typeof Pressable, ViewStyle, unknown, unknown, unknown>;

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable,
) as React.ComponentType<IAnimatedPressableProps>;

const UIAccessibleAlertDialog = createAlertDialog({
  Root: RootComponent,
  Body: ScrollView,
  Content: MotionView,
  CloseButton: Pressable,
  Header: View,
  Footer: View,
  Backdrop: AnimatedPressable,
  AnimatePresence: AnimatePresence,
});

cssInterop(MotionView, { className: "style" });

cssInterop(AnimatedPressable, { className: "style" });

const alertDialogStyle = tva({
  base: "group/modal h-full w-full items-center justify-center web:pointer-events-none",
  parentVariants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      full: "",
    },
  },
});

const alertDialogContentStyle = tva({
  base: "overflow-hidden rounded-lg border border-outline-100 bg-background-0 p-6",
  parentVariants: {
    size: {
      xs: "w-[60%] max-w-[360px]",
      sm: "w-[70%] max-w-[420px]",
      md: "w-[80%] max-w-[510px]",
      lg: "w-[90%] max-w-[640px]",
      full: "w-full",
    },
  },
});

const alertDialogCloseButtonStyle = tva({
  base: "group/alert-dialog-close-button z-10 rounded-sm p-2 outline-0 web:cursor-pointer data-[focus-visible=true]:bg-background-100",
});

const alertDialogHeaderStyle = tva({
  base: "flex-row items-center justify-between",
});

const alertDialogFooterStyle = tva({
  base: "flex-row items-center justify-end gap-3",
});

const alertDialogBodyStyle = tva({ base: "" });

const alertDialogBackdropStyle = tva({
  base: "absolute bottom-0 left-0 right-0 top-0 bg-background-dark web:cursor-default",
});

type IAlertDialogProps = React.ComponentProps<typeof UIAccessibleAlertDialog> &
  VariantProps<typeof alertDialogStyle>;

type IAlertDialogContentProps = React.ComponentProps<
  typeof UIAccessibleAlertDialog.Content
> &
  VariantProps<typeof alertDialogContentStyle> & { className?: string };

type IAlertDialogCloseButtonProps = React.ComponentProps<
  typeof UIAccessibleAlertDialog.CloseButton
> &
  VariantProps<typeof alertDialogCloseButtonStyle>;

type IAlertDialogHeaderProps = React.ComponentProps<
  typeof UIAccessibleAlertDialog.Header
> &
  VariantProps<typeof alertDialogHeaderStyle>;

type IAlertDialogFooterProps = React.ComponentProps<
  typeof UIAccessibleAlertDialog.Footer
> &
  VariantProps<typeof alertDialogFooterStyle>;

type IAlertDialogBodyProps = React.ComponentProps<
  typeof UIAccessibleAlertDialog.Body
> &
  VariantProps<typeof alertDialogBodyStyle>;

type IAlertDialogBackdropProps = React.ComponentProps<
  typeof UIAccessibleAlertDialog.Backdrop
> &
  VariantProps<typeof alertDialogBackdropStyle> & { className?: string };

const AlertDialog = function AlertDialog({
  className,
  size = "md",
  ref,
  ...props
}: IAlertDialogProps) {
  return (
    <UIAccessibleAlertDialog
      ref={ref}
      {...props}
      className={alertDialogStyle({ class: className })}
      context={{ size }}
      pointerEvents="box-none"
    />
  );
};

const AlertDialogContent = function AlertDialogContent({
  className,
  size,
  ref,
  ...props
}: IAlertDialogContentProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIAccessibleAlertDialog.Content
      pointerEvents="auto"
      ref={ref}
      initial={{
        scale: 0.9,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0.9,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 250,
        opacity: {
          type: "timing",
          duration: 250,
        },
      }}
      {...props}
      className={alertDialogContentStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
    />
  );
};

const AlertDialogCloseButton = function AlertDialogCloseButton({
  className,
  ref,
  ...props
}: IAlertDialogCloseButtonProps) {
  return (
    <UIAccessibleAlertDialog.CloseButton
      ref={ref}
      {...props}
      className={alertDialogCloseButtonStyle({
        class: className,
      })}
    />
  );
};

const AlertDialogHeader = function AlertDialogHeader({
  className,
  ref,
  ...props
}: IAlertDialogHeaderProps) {
  return (
    <UIAccessibleAlertDialog.Header
      ref={ref}
      {...props}
      className={alertDialogHeaderStyle({
        class: className,
      })}
    />
  );
};

const AlertDialogFooter = function AlertDialogFooter({
  className,
  ref,
  ...props
}: IAlertDialogFooterProps) {
  return (
    <UIAccessibleAlertDialog.Footer
      ref={ref}
      {...props}
      className={alertDialogFooterStyle({
        class: className,
      })}
    />
  );
};

const AlertDialogBody = function AlertDialogBody({
  className,
  ref,
  ...props
}: IAlertDialogBodyProps) {
  return (
    <UIAccessibleAlertDialog.Body
      ref={ref}
      {...props}
      className={alertDialogBodyStyle({
        class: className,
      })}
    />
  );
};

const AlertDialogBackdrop = function AlertDialogBackdrop({
  className,
  ref,
  ...props
}: IAlertDialogBackdropProps) {
  return (
    <UIAccessibleAlertDialog.Backdrop
      ref={ref}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.5,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 250,
        opacity: {
          type: "timing",
          duration: 250,
        },
      }}
      {...props}
      className={alertDialogBackdropStyle({
        class: className,
      })}
    />
  );
};

AlertDialog.displayName = "AlertDialog";

AlertDialogContent.displayName = "AlertDialogContent";

AlertDialogCloseButton.displayName = "AlertDialogCloseButton";

AlertDialogHeader.displayName = "AlertDialogHeader";

AlertDialogFooter.displayName = "AlertDialogFooter";

AlertDialogBody.displayName = "AlertDialogBody";

AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
};
