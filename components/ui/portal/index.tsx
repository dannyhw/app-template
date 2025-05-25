"use client";

import React from "react";
import { Overlay } from "@gluestack-ui/overlay";
import { cssInterop } from "nativewind";

cssInterop(Overlay, { className: "style" });

const Portal = function Portal({
  ref,
  ...props
}: React.ComponentProps<typeof Overlay>) {
  return <Overlay {...props} ref={ref} />;
};

Portal.displayName = "Portal";

export { Portal };
