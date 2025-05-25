"use client";

import React from "react";
import { H4 } from "@expo/html-elements";
import { createActionsheet } from "@gluestack-ui/actionsheet";
import {
  Pressable,
  View,
  Text,
  ScrollView,
  VirtualizedList,
  FlatList,
  SectionList,
  PressableProps,
  ViewStyle,
} from "react-native";
import { PrimitiveIcon, UIIcon } from "@gluestack-ui/icon";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { cssInterop } from "nativewind";
import {
  Motion,
  AnimatePresence,
  createMotionAnimatedComponent,
  MotionComponentProps,
} from "@legendapp/motion";

const ItemWrapper = function ItemWrapper({ ...props }: PressableProps) {
  return <Pressable {...props} />;
};

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

type IAnimatedPressableProps = React.ComponentProps<typeof Pressable> &
  MotionComponentProps<typeof Pressable, ViewStyle, unknown, unknown, unknown>;

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable,
) as React.ComponentType<IAnimatedPressableProps>;

export const UIActionsheet = createActionsheet({
  Root: View,
  Content: MotionView,
  Item: ItemWrapper,
  ItemText: Text,
  DragIndicator: View,
  IndicatorWrapper: View,
  Backdrop: AnimatedPressable,
  ScrollView: ScrollView,
  VirtualizedList: VirtualizedList,
  FlatList: FlatList,
  SectionList: SectionList,
  SectionHeaderText: H4,
  Icon: UIIcon,
  AnimatePresence: AnimatePresence,
});

cssInterop(UIActionsheet, { className: "style" });

cssInterop(UIActionsheet.Content, { className: "style" });

cssInterop(ItemWrapper, { className: "style" });

cssInterop(UIActionsheet.ItemText, { className: "style" });

cssInterop(UIActionsheet.DragIndicator, { className: "style" });

cssInterop(UIActionsheet.DragIndicatorWrapper, { className: "style" });

cssInterop(UIActionsheet.Backdrop, { className: "style" });

cssInterop(UIActionsheet.ScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
  indicatorClassName: "indicatorStyle",
});

cssInterop(UIActionsheet.VirtualizedList, {
  className: "style",
  ListFooterComponentClassName: "ListFooterComponentStyle",
  ListHeaderComponentClassName: "ListHeaderComponentStyle",
  contentContainerClassName: "contentContainerStyle",
  indicatorClassName: "indicatorStyle",
});

cssInterop(UIActionsheet.FlatList, {
  className: "style",
  ListFooterComponentClassName: "ListFooterComponentStyle",
  ListHeaderComponentClassName: "ListHeaderComponentStyle",
  columnWrapperClassName: "columnWrapperStyle",
  contentContainerClassName: "contentContainerStyle",
  indicatorClassName: "indicatorStyle",
});

cssInterop(UIActionsheet.SectionList, { className: "style" });

cssInterop(UIActionsheet.SectionHeaderText, { className: "style" });

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

const actionsheetStyle = tva({ base: "h-full w-full web:pointer-events-none" });

const actionsheetContentStyle = tva({
  base: "items-center rounded-tl-3xl rounded-tr-3xl border border-b-0 border-outline-100 bg-background-0 p-5 pt-2 shadow-hard-5 web:pointer-events-auto web:select-none",
});

const actionsheetItemStyle = tva({
  base: "w-full flex-row items-center gap-2 rounded-sm p-3 hover:bg-background-50 active:bg-background-100 data-[focus=true]:bg-background-100 web:data-[focus-visible=true]:bg-background-100 web:data-[focus-visible=true]:outline-indicator-primary data-[disabled=true]:opacity-40 data-[disabled=true]:web:pointer-events-auto data-[disabled=true]:web:cursor-not-allowed",
});

const actionsheetItemTextStyle = tva({
  base: "font-body font-normal text-typography-700",
  variants: {
    isTruncated: {
      true: "",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
});

const actionsheetDragIndicatorStyle = tva({
  base: "h-1 w-16 rounded-full bg-background-400",
});

const actionsheetDragIndicatorWrapperStyle = tva({
  base: "w-full items-center py-1",
});

const actionsheetBackdropStyle = tva({
  base: "absolute bottom-0 left-0 right-0 top-0 bg-background-dark web:pointer-events-auto web:cursor-default",
});

const actionsheetScrollViewStyle = tva({
  base: "h-auto w-full",
});

const actionsheetVirtualizedListStyle = tva({
  base: "h-auto w-full",
});

const actionsheetFlatListStyle = tva({
  base: "h-auto w-full",
});

const actionsheetSectionListStyle = tva({
  base: "h-auto w-full",
});

const actionsheetSectionHeaderTextStyle = tva({
  base: "font-heading my-0 p-3 font-bold uppercase leading-5 text-typography-500",
  variants: {
    isTruncated: {
      true: "",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    size: {
      "5xl": "text-5xl",
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },

    sub: {
      true: "text-xs",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow500",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

const actionsheetIconStyle = tva({
  base: "fill-none text-background-500",
  variants: {
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

type IActionsheetProps = VariantProps<typeof actionsheetStyle> &
  React.ComponentProps<typeof UIActionsheet>;

type IActionsheetContentProps = VariantProps<typeof actionsheetContentStyle> &
  React.ComponentProps<typeof UIActionsheet.Content> & {
    className?: string;
  };

type IActionsheetItemProps = VariantProps<typeof actionsheetItemStyle> &
  React.ComponentProps<typeof UIActionsheet.Item>;

type IActionsheetItemTextProps = VariantProps<typeof actionsheetItemTextStyle> &
  React.ComponentProps<typeof UIActionsheet.ItemText>;

type IActionsheetDragIndicatorProps = VariantProps<
  typeof actionsheetDragIndicatorStyle
> &
  React.ComponentProps<typeof UIActionsheet.DragIndicator>;

type IActionsheetDragIndicatorWrapperProps = VariantProps<
  typeof actionsheetDragIndicatorWrapperStyle
> &
  React.ComponentProps<typeof UIActionsheet.DragIndicatorWrapper>;

type IActionsheetBackdropProps = VariantProps<typeof actionsheetBackdropStyle> &
  React.ComponentProps<typeof UIActionsheet.Backdrop> & {
    className?: string;
  };

type IActionsheetScrollViewProps = VariantProps<
  typeof actionsheetScrollViewStyle
> &
  React.ComponentProps<typeof UIActionsheet.ScrollView>;

type IActionsheetVirtualizedListProps = VariantProps<
  typeof actionsheetVirtualizedListStyle
> &
  React.ComponentProps<typeof UIActionsheet.VirtualizedList>;

type IActionsheetFlatListProps = VariantProps<typeof actionsheetFlatListStyle> &
  React.ComponentProps<typeof UIActionsheet.FlatList>;

type IActionsheetSectionListProps = VariantProps<
  typeof actionsheetSectionListStyle
> &
  React.ComponentProps<typeof UIActionsheet.SectionList>;

type IActionsheetSectionHeaderTextProps = VariantProps<
  typeof actionsheetSectionHeaderTextStyle
> &
  React.ComponentProps<typeof UIActionsheet.SectionHeaderText>;

type IActionsheetIconProps = VariantProps<typeof actionsheetIconStyle> &
  React.ComponentProps<typeof UIActionsheet.Icon> & {
    className?: string;
    as?: React.ElementType;
    height?: number;
    width?: number;
  };

const Actionsheet = function Actionsheet({
  className,
  ...props
}: IActionsheetProps) {
  return (
    <UIActionsheet
      className={actionsheetStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetContent = function ActionsheetContent({
  className,
  ...props
}: IActionsheetContentProps) {
  return (
    <UIActionsheet.Content
      className={actionsheetContentStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetItem = function ActionsheetItem({
  className,
  ...props
}: IActionsheetItemProps) {
  return (
    <UIActionsheet.Item
      className={actionsheetItemStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetItemText = function ActionsheetItemText({
  isTruncated,
  bold,
  underline,
  strikeThrough,
  size = "sm",
  className,
  ...props
}: IActionsheetItemTextProps) {
  return (
    <UIActionsheet.ItemText
      className={actionsheetItemTextStyle({
        class: className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size,
      })}
      {...props}
    />
  );
};

const ActionsheetDragIndicator = function ActionsheetDragIndicator({
  className,
  ...props
}: IActionsheetDragIndicatorProps) {
  return (
    <UIActionsheet.DragIndicator
      className={actionsheetDragIndicatorStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetDragIndicatorWrapper =
  function ActionsheetDragIndicatorWrapper({
    className,
    ...props
  }: IActionsheetDragIndicatorWrapperProps) {
    return (
      <UIActionsheet.DragIndicatorWrapper
        className={actionsheetDragIndicatorWrapperStyle({
          class: className,
        })}
        {...props}
      />
    );
  };

const ActionsheetBackdrop = function ActionsheetBackdrop({
  className,
  ref,
  ...props
}: IActionsheetBackdropProps) {
  return (
    <UIActionsheet.Backdrop
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.5,
      }}
      exit={{
        opacity: 0,
      }}
      {...props}
      className={actionsheetBackdropStyle({
        class: className,
      })}
      ref={ref}
    />
  );
};

const ActionsheetScrollView = function ActionsheetScrollView({
  className,
  ...props
}: IActionsheetScrollViewProps) {
  return (
    <UIActionsheet.ScrollView
      className={actionsheetScrollViewStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetVirtualizedList = function ActionsheetVirtualizedList({
  className,
  ...props
}: IActionsheetVirtualizedListProps) {
  return (
    <UIActionsheet.VirtualizedList
      className={actionsheetVirtualizedListStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetFlatList = function ActionsheetFlatList({
  className,
  ...props
}: IActionsheetFlatListProps) {
  return (
    <UIActionsheet.FlatList
      className={actionsheetFlatListStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetSectionList = function ActionsheetSectionList({
  className,
  ...props
}: IActionsheetSectionListProps) {
  return (
    <UIActionsheet.SectionList
      className={actionsheetSectionListStyle({
        class: className,
      })}
      {...props}
    />
  );
};

const ActionsheetSectionHeaderText = function ActionsheetSectionHeaderText({
  className,
  isTruncated,
  bold,
  underline,
  strikeThrough,
  size,
  sub,
  italic,
  highlight,
  ...props
}: IActionsheetSectionHeaderTextProps) {
  return (
    <UIActionsheet.SectionHeaderText
      className={actionsheetSectionHeaderTextStyle({
        class: className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size,
        sub,
        italic,
        highlight,
      })}
      {...props}
    />
  );
};

const ActionsheetIcon = function ActionsheetIcon({
  className,
  size = "sm",
  ...props
}: IActionsheetIconProps) {
  if (typeof size === "number") {
    return (
      <UIActionsheet.Icon
        {...props}
        className={actionsheetIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIActionsheet.Icon
        {...props}
        className={actionsheetIconStyle({ class: className })}
      />
    );
  }

  return (
    <UIActionsheet.Icon
      className={actionsheetIconStyle({
        class: className,
        size,
      })}
      {...props}
    />
  );
};

export {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetScrollView,
  ActionsheetVirtualizedList,
  ActionsheetFlatList,
  ActionsheetSectionList,
  ActionsheetSectionHeaderText,
  ActionsheetIcon,
};
