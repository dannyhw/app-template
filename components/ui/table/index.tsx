import React, {
  createContext,
  useMemo,
  useContext,
  ComponentProps,
  ComponentPropsWithRef,
  Ref,
} from "react";
import {
  Table as ExpoTable,
  THead as ExpoTHead,
  TBody as ExpoTBody,
  TFoot as ExpoTFoot,
  TR as ExpoTR,
  Caption as ExpoTCaption,
} from "@expo/html-elements";

import {
  tableStyle,
  tableHeaderStyle,
  tableBodyStyle,
  tableFooterStyle,
  tableHeadStyle,
  tableRowStyleStyle,
  tableDataStyle,
  tableCaptionStyle,
} from "./styles";
import { Text, TextProps, View, ViewProps } from "react-native";

const TableHeaderContext = createContext<{
  isHeaderRow: boolean;
}>({
  isHeaderRow: false,
});

const TableFooterContext = createContext<{
  isFooterRow: boolean;
}>({
  isFooterRow: false,
});

type ITableProps = ComponentProps<typeof ExpoTable>;

type ITableHeaderProps = ComponentProps<typeof ExpoTHead>;

type ITableBodyProps = ComponentProps<typeof ExpoTBody>;

type ITableFooterProps = ComponentProps<typeof ExpoTFoot>;

type ViewWithProp = {
  useRNView: true;
} & ComponentPropsWithRef<typeof View>;

type TextWithProp = {
  useRNView: false;
} & ComponentPropsWithRef<typeof Text>;

type ITableHeadProps = ViewWithProp | TextWithProp;

type ITableRowProps = ComponentProps<typeof ExpoTR>;

type ITableDataProps = ViewWithProp | TextWithProp;

type ITableCaptionProps = ComponentProps<typeof ExpoTCaption>;

const Table = ({ className, ref, ...props }: ITableProps) => {
  return (
    <ExpoTable
      ref={ref}
      className={tableStyle({ class: className })}
      {...props}
    />
  );
};

const TableHeader = function TableHeader({
  className,
  ref,
  ...props
}: ITableHeaderProps) {
  const contextValue = useMemo(() => {
    return {
      isHeaderRow: true,
    };
  }, []);

  return (
    <TableHeaderContext.Provider value={contextValue}>
      <ExpoTHead
        ref={ref}
        className={tableHeaderStyle({ class: className })}
        {...props}
      />
    </TableHeaderContext.Provider>
  );
};

const TableBody = function TableBody({
  className,
  ref,
  ...props
}: ITableBodyProps) {
  return (
    <ExpoTBody
      ref={ref}
      className={tableBodyStyle({ class: className })}
      {...props}
    />
  );
};

const TableFooter = function TableFooter({
  className,
  ref,
  ...props
}: ITableFooterProps) {
  const contextValue = useMemo(() => {
    return {
      isFooterRow: true,
    };
  }, []);

  return (
    <TableFooterContext.Provider value={contextValue}>
      <ExpoTFoot
        ref={ref}
        className={tableFooterStyle({ class: className })}
        {...props}
      />
    </TableFooterContext.Provider>
  );
};

const TableHead = function TableHead({
  useRNView = false,
  className,
  ref,
  ...props
}: ITableHeadProps) {
  if (useRNView) {
    return (
      <View
        ref={ref as Ref<View>}
        className={tableHeadStyle({ class: className })}
        {...(props as ViewProps)}
      />
    );
  } else {
    return (
      <Text
        ref={ref as Ref<Text>}
        className={tableHeadStyle({ class: className })}
        {...(props as TextProps)}
      />
    );
  }
};

const TableRow = function TableRow({
  className,
  ref,
  ...props
}: ITableRowProps) {
  const { isHeaderRow } = useContext(TableHeaderContext);

  const { isFooterRow } = useContext(TableFooterContext);

  return (
    <ExpoTR
      ref={ref}
      className={tableRowStyleStyle({
        isHeaderRow,
        isFooterRow,
        class: className,
      })}
      {...props}
    />
  );
};

const TableData = function TableData({
  useRNView = false,
  ref,
  className,
  ...props
}: ITableDataProps) {
  if (useRNView) {
    return (
      <View
        ref={ref as Ref<View>}
        className={tableDataStyle({ class: className })}
        {...(props as ViewProps)}
      />
    );
  } else {
    return (
      <Text
        ref={ref as Ref<Text>}
        className={tableDataStyle({ class: className })}
        {...(props as TextProps)}
      />
    );
  }
};

const TableCaption = React.forwardRef<
  React.ComponentRef<typeof ExpoTCaption>,
  ITableCaptionProps
>(({ className, ...props }, ref) => {
  return (
    <ExpoTCaption
      // @ts-expect-error : ref type changed
      ref={ref}
      className={tableCaptionStyle({ class: className })}
      {...props}
    />
  );
});

Table.displayName = "Table";

TableHeader.displayName = "TableHeader";

TableBody.displayName = "TableBody";

TableFooter.displayName = "TableFooter";

TableHead.displayName = "TableHead";

TableRow.displayName = "TableRow";

TableData.displayName = "TableData";

TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
  TableCaption,
};
