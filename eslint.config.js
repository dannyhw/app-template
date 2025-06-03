const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactCompiler = require("eslint-plugin-react-compiler");

module.exports = defineConfig([
  {
    ignores: ["ios/**", "android/**", "dist/**", "types/**"],
  },
  expoConfig,
  reactCompiler.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/array-type": "off",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "*" },
        {
          blankLine: "any",
          prev: ["import", "export", "cjs-import", "case"],
          next: "*",
        },
      ],
      "react/jsx-newline": ["error", { prevent: false }],
      "import/no-unresolved": "off",
    },
  },
]);
