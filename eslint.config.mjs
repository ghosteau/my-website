import { dirname } from "path";
import { fileURLToPath } from "url";
import nextConfig from "eslint-config-next/core-web-vitals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
];

export default eslintConfig;
