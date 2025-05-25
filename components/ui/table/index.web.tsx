import React, { createContext, useMemo, useContext } from "react";
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

const Table = function Table({
  className,
  ref,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <table ref={ref} className={tableStyle({ class: className })} {...props} />
  );
};

const TableHeader = function TableHeader({
  className,
  ref,
  ...props
}: React.ComponentProps<"thead">) {
  const contextValue = useMemo(() => {
    return {
      isHeaderRow: true,
    };
  }, []);

  return (
    <TableHeaderContext.Provider value={contextValue}>
      <thead
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
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
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
}: React.ComponentProps<"tfoot">) {
  const contextValue = useMemo(() => {
    return {
      isFooterRow: true,
    };
  }, []);

  return (
    <TableFooterContext.Provider value={contextValue}>
      <tfoot
        ref={ref}
        className={tableFooterStyle({ class: className })}
        {...props}
      />
    </TableFooterContext.Provider>
  );
};

const TableHead = function TableHead({
  className,
  ref,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th ref={ref} className={tableHeadStyle({ class: className })} {...props} />
  );
};

const TableRow = function TableRow({
  className,
  ref,
  ...props
}: React.ComponentProps<"tr">) {
  const { isHeaderRow } = useContext(TableHeaderContext);

  const { isFooterRow } = useContext(TableFooterContext);

  return (
    <tr
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
  className,
  ref,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td ref={ref} className={tableDataStyle({ class: className })} {...props} />
  );
};

const TableCaption = function TableCaption({
  className,
  ref,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      ref={ref}
      className={tableCaptionStyle({ class: className })}
      {...props}
    />
  );
};

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
