// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo"],
  ignorePatterns: ["/dist/*"],
  plugins: ["react"],
  rules: {
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
  },
};
