import { sync as globSync } from "glob";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import prettier from "prettier";

const cwd = process.cwd();

const paths = globSync("*.?(png|jpg|jpeg)", {
  cwd: resolve(cwd, "assets/images/"),
  absolute: false,
}).filter((name) => !name.includes("@2x") && !name.includes("@3x"));

const fileContent = paths
  .map((name) => {
    const normalizedName = name.replaceAll("-", "_").split(".")[0];

    return `export {default as ${normalizedName}} from './${name}'`;
  })
  .join(";\n");

const config = await prettier.resolveConfig(process.cwd());

const formattedContent = await prettier.format(fileContent, {
  ...config,
  parser: "babel",
});

writeFileSync("assets/images/index.ts", formattedContent, {
  encoding: "utf8",
  flag: "w",
});
