import { copyFile } from 'node:fs/promises'
import { consola } from 'consola'
import { glob } from 'tinyglobby'
import { kebabCase } from 'uncase'
import { fsEnsureDir, fsExists, fsRemove, resolve } from './utils'

const DIR_ICONS = resolve('icons')
const DIR_SOURCE_ICONS = resolve('vscode-material-icon-theme/icons')

const IGNORE_ICONS = ['vedic.svg']

async function prepareIcons() {
  // Cleanup
  if (await fsExists(DIR_ICONS)) {
    await fsRemove(DIR_ICONS)
    consola.info(`Cleanup directory: icons`)
  }

  // Glob all SVG files
  const files = await glob('*.svg', {
    cwd: DIR_SOURCE_ICONS,
    ignore: IGNORE_ICONS,
    onlyFiles: true,
  })

  // Create the directory
  await fsEnsureDir(DIR_ICONS)

  consola.success(`Create directory: icons`)

  // Copy all SVG files and rename them
  await Promise.all(
    files.map(fileName =>
      copyFile(
        resolve(DIR_SOURCE_ICONS, fileName),
        resolve(DIR_ICONS, `${kebabCase(fileName.replace(/\.svg$/, ''))}.svg`),
      ),
    ),
  )

  consola.success(`Icons has been prepared!`)
}

prepareIcons().catch(err => {
  consola.error(err)
})
