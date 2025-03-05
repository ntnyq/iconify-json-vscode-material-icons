// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['**/vscode-material-icon-theme/**'],
  perfectionist: {
    all: true,
  },
})
