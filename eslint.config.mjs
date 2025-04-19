// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['**/vscode-material-icon-theme/**'],
  pnpm: true,
  unocss: true,
  vue: true,
  perfectionist: {
    all: true,
  },
})
