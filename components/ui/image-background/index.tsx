"use client";

import { ImageBackground as RNImageBackground } from "react-native";
import React from "react";
import { tva } from "@gluestack-ui/nativewind-utils/tva";

const imageBackgroundStyle = tva({});

const ImageBackground = function ImageBackground({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof RNImageBackground>) {
  return (
    <RNImageBackground
      className={imageBackgroundStyle({
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
};

ImageBackground.displayName = "ImageBackground";

export { ImageBackground };
