import { defineConfig } from 'oxfmt'

// Keep ignorePatterns in sync with oxlint.config.mjs.
// oxfmt cannot format .astro yet. Content (.md / .mdx) is written by editors, not reformatted.
export default defineConfig({
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  semi: false,
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  sortImports: {
    newlinesBetween: false,
  },
  sortTailwindcss: {
    stylesheet: 'src/styles/global.css',
    functions: ['twMerge', 'twJoin', 'clsx'],
    attributes: ['className', 'class', 'class:list'],
  },
  sortPackageJson: true,
  ignorePatterns: [
    '.agents/**',
    '.output/**',
    'playwright-report/**',
    'test-results/**',
    '**/*.astro',
    '**/*.md',
    '**/*.mdx',
  ],
})
