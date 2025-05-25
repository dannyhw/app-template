"use client";

import React from "react";
import { createModal } from "@gluestack-ui/modal";
import { Pressable, View, ScrollView, ViewStyle } from "react-native";
import {
  Motion,
  AnimatePresence,
  createMotionAnimatedComponent,
  MotionComponentProps,
} from "@legendapp/motion";
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

const SCOPE = "MODAL";

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

const UIModal = createModal({
  Root: withStyleContext(View, SCOPE),
  Backdrop: AnimatedPressable,
  Content: MotionView,
  Body: ScrollView,
  CloseButton: Pressable,
  Footer: View,
  Header: View,
  AnimatePresence: AnimatePresence,
});

cssInterop(AnimatedPressable, { className: "style" });

cssInterop(MotionView, { className: "style" });

const modalStyle = tva({
  base: "group/modal h-full w-full items-center justify-center web:pointer-events-none",
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

const modalBackdropStyle = tva({
  base: "absolute bottom-0 left-0 right-0 top-0 bg-background-dark web:cursor-default",
});

const modalContentStyle = tva({
  base: "overflow-hidden rounded-md border border-outline-100 bg-background-0 p-6 shadow-hard-2",
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

const modalBodyStyle = tva({
  base: "mb-6 mt-2",
});

const modalCloseButtonStyle = tva({
  base: "group/modal-close-button z-10 cursor-pointer rounded web:outline-0 data-[focus-visible=true]:web:bg-background-100",
});

const modalHeaderStyle = tva({
  base: "flex-row items-center justify-between",
});

const modalFooterStyle = tva({
  base: "flex-row items-center justify-end gap-2",
});

type IModalProps = React.ComponentProps<typeof UIModal> &
  VariantProps<typeof modalStyle> & { className?: string };

type IModalBackdropProps = React.ComponentProps<typeof UIModal.Backdrop> &
  VariantProps<typeof modalBackdropStyle> & { className?: string };

type IModalContentProps = React.ComponentProps<typeof UIModal.Content> &
  VariantProps<typeof modalContentStyle> & { className?: string };

type IModalHeaderProps = React.ComponentProps<typeof UIModal.Header> &
  VariantProps<typeof modalHeaderStyle> & { className?: string };

type IModalBodyProps = React.ComponentProps<typeof UIModal.Body> &
  VariantProps<typeof modalBodyStyle> & { className?: string };

type IModalFooterProps = React.ComponentProps<typeof UIModal.Footer> &
  VariantProps<typeof modalFooterStyle> & { className?: string };

type IModalCloseButtonProps = React.ComponentProps<typeof UIModal.CloseButton> &
  VariantProps<typeof modalCloseButtonStyle> & { className?: string };

const Modal = ({ className, size = "md", ref, ...props }: IModalProps) => (
  <UIModal
    ref={ref}
    {...props}
    pointerEvents="box-none"
    className={modalStyle({ size, class: className })}
    context={{ size }}
  />
);

const ModalBackdrop = function ModalBackdrop({
  className,
  ref,
  ...props
}: IModalBackdropProps) {
  return (
    <UIModal.Backdrop
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
      className={modalBackdropStyle({
        class: className,
      })}
    />
  );
};

const ModalContent = function ModalContent({
  className,
  size,
  ref,
  ...props
}: IModalContentProps) {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIModal.Content
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
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
      className={modalContentStyle({
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

const ModalHeader = function ModalHeader({
  className,
  ref,
  ...props
}: IModalHeaderProps) {
  return (
    <UIModal.Header
      ref={ref}
      {...props}
      className={modalHeaderStyle({
        class: className,
      })}
    />
  );
};

const ModalBody = function ModalBody({
  className,
  ref,
  ...props
}: IModalBodyProps) {
  return (
    <UIModal.Body
      ref={ref}
      {...props}
      className={modalBodyStyle({
        class: className,
      })}
    />
  );
};

const ModalFooter = function ModalFooter({
  className,
  ref,
  ...props
}: IModalFooterProps) {
  return (
    <UIModal.Footer
      ref={ref}
      {...props}
      className={modalFooterStyle({
        class: className,
      })}
    />
  );
};

const ModalCloseButton = function ModalCloseButton({
  className,
  ref,
  ...props
}: IModalCloseButtonProps) {
  return (
    <UIModal.CloseButton
      ref={ref}
      {...props}
      className={modalCloseButtonStyle({
        class: className,
      })}
    />
  );
};

Modal.displayName = "Modal";

ModalBackdrop.displayName = "ModalBackdrop";

ModalContent.displayName = "ModalContent";

ModalHeader.displayName = "ModalHeader";

ModalBody.displayName = "ModalBody";

ModalFooter.displayName = "ModalFooter";

ModalCloseButton.displayName = "ModalCloseButton";

export {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
};
