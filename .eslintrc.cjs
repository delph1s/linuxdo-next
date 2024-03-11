module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
  ],
  plugins: [
    "simple-import-sort",
    "@typescript-eslint",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "arrow-body-style": [
      "off",
      "as-needed",
      {
        requireReturnForObjectLiteral: true,
      },
    ],
    "import/extensions": [
      "off",
      "never",
      {
        ignorePackages: true,
        scss: "ignorePackages",
        svg: "ignorePackages",
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    // 'import/no-cycle': 'off',
    "import/no-duplicates": [
      "error",
      {
        "considerQueryString": true,
        "prefer-inline": false,
      }
    ],
    "react/jsx-props-no-spreading": [
      "off",
      {
        "html": "ignore", // "ignore" | "enforce"
        "custom": "ignore", // "ignore" | "enforce"
        "explicitSpread": "ignore", // "ignore" | "enforce"
        "exceptions": ["Image", "img"],
      }
    ],
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/no-named-as-default': 'off',
    // 'import/no-relative-packages': 'off',
    // 'import/no-self-import': 'off',
    // 'import/no-useless-path-segments': 'off',
    // 'import/order': 'off',
    "import/prefer-default-export": [
      "off",
      {
        target: "single",
      }
    ],
    // 'jsx-a11y/control-has-associated-label': 'off',
    // 'jsx-a11y/label-has-associated-control': 'off',
    "no-console": "off",
    // 'react/destructuring-assignment': 'off',
    "react/require-default-props": "off",
    // "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
