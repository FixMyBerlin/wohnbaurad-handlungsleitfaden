import { defineConfig } from 'oxlint'

// Keep ignorePatterns in sync with oxfmt.config.mjs.
export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc'],
  options: { typeAware: true },
  ignorePatterns: ['.agents/**', '.output/**', 'playwright-report/**', 'test-results/**'],
  rules: {
    'typescript/switch-exhaustiveness-check': 'error',
    // Object config clears oxlint defaults, so the `_` patterns are restated
    'eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // Noisy type-aware rules, same as other FMC apps
    'typescript/no-floating-promises': 'off',
    'typescript/no-duplicate-type-constituents': 'off',
    'typescript/no-redundant-type-constituents': 'off',
    'typescript/restrict-template-expressions': 'off',
    'typescript/no-base-to-string': 'off',
    'typescript/await-thenable': 'off',
    'typescript/unbound-method': 'off',
    'typescript/no-meaningless-void-operator': 'off',
    'typescript/no-useless-default-assignment': 'off',
    'typescript/no-misused-spread': 'off',
    'typescript/require-array-sort-compare': 'off',
    'typescript/no-array-delete': 'off',
  },
  overrides: [
    {
      files: ['*.astro', '**/*.astro'],
      globals: {
        Fragment: 'readonly',
      },
      env: {
        node: true,
      },
    },
  ],
})
