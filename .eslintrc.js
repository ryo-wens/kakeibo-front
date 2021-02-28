module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-app', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-empty-interface': 0,
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-dupe-else-if': 'off',
    'prettier/prettier': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
  },
};
