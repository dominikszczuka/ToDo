// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/strict",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "@typescript-eslint"],
  rules: {
    endOfLine: "off",
    "no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-var": "error",
    "brace-style": "error",
    "prefer-template": "error",
    "react/prop-types": "off",
    radix: "error",
    "space-before-blocks": "error",
    "import/prefer-default-export": "off",
  },
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.test.tsx",
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.spec.tsx",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
