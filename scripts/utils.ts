import { access, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec } from 'tinyexec'
import type { Options } from 'tinyexec'

export const __dirname: string = fileURLToPath(new URL('.', import.meta.url))

export const resolve = (...args: string[]): string =>
  path.resolve(__dirname, '..', ...args)

export async function fsEnsureDir(path: string): Promise<void> {
  if (await fsExists(path)) return
  await mkdir(path, { recursive: true })
}

export async function fsExists(path: string): Promise<boolean> {
  return access(path)
    .then(() => true)
    .catch(() => false)
}

export async function fsRemove(path: string): Promise<void> {
  await rm(path, { recursive: true }).catch(() => {})
}
export async function runCommand(
  command: string,
  args?: string[],
  options: Partial<Options> = {},
): Promise<void> {
  await exec(command, args, options)
}
