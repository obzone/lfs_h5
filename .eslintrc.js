const path = require("path");

module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  env: { jest: true, browser: true },
  parserOptions: {
    project: "tsconfig.eslint.json",
    sourceType: "module",
  },
  settings: {
    // eslint import/resolver does not take tsconfig.compilerOptions.paths into consideration
    // https://github.com/benmosher/eslint-plugin-import/issues/1573
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: {
              // webpack config alias require absolute path
              "~": path.join(__dirname, "src"),
            },
            extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
          },
        },
      },
    },
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": 0,
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/no-unresolved": 0,
    "no-underscore-dangle": ["error", { allow: ["__typename"] }],
    "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mjs: "never",
      },
    ],
  },
};
