module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      // impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-relative-packages': 'off',
    'import/no-self-import': 'off',
    'import/no-useless-path-segments': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/destructuring-assignment': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
