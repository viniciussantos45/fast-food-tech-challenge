module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': ['warn', { code: 130 }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
}
