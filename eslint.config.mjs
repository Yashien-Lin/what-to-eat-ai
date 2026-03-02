import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // ESLint會依Prettier的格式優先，不會互相衝突。
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "warn",
      "@next/next/no-img-element": "off", // 關閉 Next.js 不允許 <img> 的警告
      "@typescript-eslint/no-unused-vars": "warn",
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
