module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    React: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  },
}
