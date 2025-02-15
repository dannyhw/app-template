// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "*" },
      { blankLine: "any", prev: "import", next: "import" },
      { blankLine: "any", prev: "expression", next: "expression" },
      { blankLine: "any", prev: "const", next: "const" },
      { blankLine: "any", prev: "let", next: "let" },
      { blankLine: "any", prev: "var", next: "var" },
    ],
  },
};
