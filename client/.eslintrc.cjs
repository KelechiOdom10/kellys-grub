const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: path.join(__dirname, "./tsconfig.json"),
      },
      vite: {
        configPath: path.join(__dirname, "./vite.config.ts"),
      },
      alias: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts", ".d.tsx"],
        map: [["~", "./src"]],
        root: "./",
      },
    },
  },
  plugins: ["@typescript-eslint", "import"],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  rules: {
    // Add your own rules here to override ones from the extended configs.
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/no-unescaped-entities": "off",
  },
};
