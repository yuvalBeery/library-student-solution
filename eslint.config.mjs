import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import stylisticJs from "@stylistic/eslint-plugin-js"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@stylistic/ts": stylisticTs,
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          arrowParameter: true,
          parameter: true,
          memberVariableDeclaration: true,
          propertyDeclaration: true,
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@stylistic/ts/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "block" },
        { blankLine: "always", prev: "block", next: "*" },
        { blankLine: "always", prev: "*", next: "block-like" },
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@stylistic/ts/semi": ["error", "always"],
      "no-var": "error",
      "default-case": "error",
      "@stylistic/js/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    },
    ignores: ["eslint.config.mjs"],
  }
);
