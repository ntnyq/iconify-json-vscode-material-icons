/**
 * @file UnoCSS config
 */

import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import icons from './src/assets/icons.json'

export default defineConfig({
  safelist: icons.map(icon => `i-vscode-material-icons:${icon}`),

  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
      collections: {
        'vscode-material-icons': () =>
          import('iconify-json-vscode-material-icons/icons.json').then(
            i => i.default,
          ),
      },
      extraProperties: {
        color: 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
  ],

  shortcuts: [
    {
      'bg-base': 'bg-$c-bg-base',
      'border-base': 'border-$c-border',
      'border-bg-base': 'border-$c-bg-base',
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex-center flex-col',
      'text-base': 'text-$c-text-base',
      'wh-full': 'w-full h-full',
      'btn-action':
        'min-w-[140px] rounded-md bg-$c-text-base px-3 py-2 text-$c-bg-base transition hover:opacity-90',
      'btn-icon':
        'h-10 w-10 inline-flex items-center justify-center text-lg rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700',
    },
  ],

  theme: {
    colors: {},
  },
})
