import { promises as fs } from 'node:fs'
import {
  checkBadTags,
  cleanupInlineStyle,
  cleanupSVGRoot,
  convertStyleToAttrs,
  removeBadAttributes,
} from '@iconify/tools/lib'
// import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse'
import { importDirectory } from '@iconify/tools/lib/import/directory'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'
import { consola } from 'consola'
import { resolve, runCommand } from './utils'

const DIR_ICONS = resolve('icons')
const ICONS_JSON_PATH = resolve('icons.json')
const INFO_JSON_PATH = resolve('info.json')

const PREFIX_NAME = 'vscode-material-icons'

async function generateIconCollection() {
  // Import icons
  const iconSet = await importDirectory(DIR_ICONS, {
    prefix: PREFIX_NAME,
  })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') return

    const svg = iconSet.toSVG(name)

    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      cleanupInlineStyle(svg)
      convertStyleToAttrs(svg)
      cleanupSVGRoot(svg)
      checkBadTags(svg)
      removeBadAttributes(svg)

      // parseColors(svg, {
      //   defaultColor: 'currentColor',
      //   callback: (_attr, colorStr, color) => {
      //     return !color || isEmptyColor(color) ? colorStr : 'currentColor'
      //   },
      // })
      runSVGO(svg)
    } catch (err) {
      // Invalid icon
      consola.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export as IconifyJSON
  const exported = `${JSON.stringify(iconSet.export(), null, 2)}\n`

  // Save to file
  await fs.writeFile(ICONS_JSON_PATH, exported, 'utf8')

  // Update total
  const iconInfo = JSON.parse(await fs.readFile(INFO_JSON_PATH, 'utf-8'))

  if (iconSet.count() !== iconInfo.total) {
    iconInfo.total = iconSet.count()

    await fs.writeFile(
      INFO_JSON_PATH,
      JSON.stringify(iconInfo, null, 2),
      'utf-8',
    )

    await runCommand('eslint', ['--fix', ICONS_JSON_PATH, INFO_JSON_PATH])

    consola.info(`Icon set count changed to ${iconSet.count()}`)
  }
}

generateIconCollection().catch(err => {
  consola.error(err)
})
