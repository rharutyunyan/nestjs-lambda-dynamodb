module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-any': 'off',
    '@typescript-eslint/quote-props': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'import/order': 'off',
    'max-len': ['error', { code: 100 }],
    '@typescript-eslint/member-ordering': 'off',
    'quotes': ['error', 'single', { avoidEscape: true }],
    'arrow-parens': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-function': ['error', { allow: ['functions', 'constructors'] }],
    'no-extra-semi': 'error',
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'no-trailing-spaces': ['error', { skipBlankLines: false }],
    'quote-props': ['error', 'consistent'],
    'max-classes-per-file': 'off',
    'no-bitwise': ['error'],
    'sort-keys': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: [
          'camelCase',
          'strictCamelCase',
          'PascalCase',
          'StrictPascalCase',
          'snake_case',
          'UPPER_CASE',
        ],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
