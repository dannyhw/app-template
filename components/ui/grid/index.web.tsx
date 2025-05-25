import React from "react";
import { gridStyle, gridItemStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type IGridProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof gridStyle> & {
    gap?: number;
    rowGap?: number;
    columnGap?: number;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingStart?: number;
    paddingEnd?: number;
    _extra: {
      className: string;
    };
  };

const Grid = function Grid({ className, _extra, ref, ...props }: IGridProps) {
  const gridClass = _extra?.className;

  const finalGridClass = gridClass ?? "";

  return (
    <div
      ref={ref}
      className={gridStyle({
        class: className + " " + finalGridClass,
      })}
      {...props}
    />
  );
};

type IGridItemProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof gridItemStyle> & {
    index?: number;
    _extra: {
      className: string;
    };
  };

const GridItem = function GridItem({
  className,
  _extra,
  ref,
  ...props
}: IGridItemProps) {
  const gridItemClass = _extra?.className;

  const finalGridItemClass = gridItemClass ?? "";

  return (
    <div
      ref={ref}
      className={gridItemStyle({
        class: className + " " + finalGridItemClass,
      })}
      {...props}
    />
  );
};

Grid.displayName = "Grid";

GridItem.displayName = "GridItem";

export { Grid, GridItem };
