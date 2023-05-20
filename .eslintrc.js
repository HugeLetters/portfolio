module.exports = {
  env: {
    browser: true,
    es2021: true,
    "astro/astro": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  overrides: [
    {
      files: ["*.astro"],
      extends: ["plugin:astro/recommended"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
      rules: {},
    },
    {
      files: ["*.tsx", "*.jsx"],
      extends: ["plugin:react/recommended", "plugin:react/jsx-runtime"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-undef": "off",
    "@typescript-eslint/triple-slash-reference": "off",
  },
  ignorePatterns: ["*.config.*", ".*.*"],
};
