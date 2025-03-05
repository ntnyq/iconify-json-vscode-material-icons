# iconify-json-vscode-material-icons

[![CI](https://github.com/ntnyq/iconify-json-vscode-material-icons/workflows/CI/badge.svg)](https://github.com/ntnyq/iconify-json-vscode-material-icons/actions)
[![NPM VERSION](https://img.shields.io/npm/v/iconify-json-vscode-material-icons.svg)](https://www.npmjs.com/package/iconify-json-vscode-material-icons)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/iconify-json-vscode-material-icons.svg)](https://www.npmjs.com/package/iconify-json-vscode-material-icons)
[![LICENSE](https://img.shields.io/github/license/ntnyq/iconify-json-vscode-material-icons.svg)](https://github.com/ntnyq/iconify-json-vscode-material-icons/blob/main/LICENSE)

A starter template for node projects.

## Install

```shell
npm install iconify-json-vscode-material-icons -D
```

```shell
yarn add iconify-json-vscode-material-icons -D
```

```shell
pnpm add iconify-json-vscode-material-icons -D
```

## Usage

Config in your `{uno,unocss}.config.ts`

```ts
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        'vscode-material-icons': () =>
          import('iconify-json-vscode-material-icons/icons.json').then(
            i => i.default,
          ),
      },
    }),
  ],
})
```

## Files

- Icon data is stored in `icons.json` in `IconifyJSON` format. See [IconifyJSON documentation](https://docs.iconify.design/types/iconify-json.html).
- Icon set information is stored in `info.json` in `IconifyInfo` format. See [IconifyInfo documentation](https://docs.iconify.design/types/iconify-info.html).

## License

[MIT](./LICENSE) License © 2025-PRESENT [ntnyq](https://github.com/ntnyq)
