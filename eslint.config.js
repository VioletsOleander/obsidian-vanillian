import { defineConfig, globalIgnores } from "eslint/config";

import js from "@eslint/js";
import obsidian from "eslint-plugin-obsidianmd";
import globals from "globals";
import ts from "typescript-eslint";

const config = defineConfig([
  js.configs.recommended,
  ts.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  ...obsidian.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: { ...globals.browser },
      parser: ts.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  globalIgnores([
    "dist/",
    "**/*.js",
    "**/*.json",
  ]),
]);

export default config;
