import { readdir, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'

const root = 'out'
const maxFiles = 20_000
const maxFileBytes = 25 * 1024 * 1024
let fileCount = 0
let totalBytes = 0
let largest = { path: '', bytes: 0 }

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await inspect(path)
    } else if (entry.isFile()) {
      const { size } = await stat(path)
      fileCount++
      totalBytes += size
      if (size > largest.bytes) largest = { path: relative(root, path), bytes: size }
      if (size > maxFileBytes) {
        throw new Error(`${relative(root, path)} exceeds the 25 MiB Pages asset limit`)
      }
    }
  }
}

await inspect(root)
if (fileCount > maxFiles) {
  throw new Error(`${fileCount} files exceed the 20,000-file Pages Free limit`)
}

const names = new Set(await readdir(root))
for (const required of ['index.html', '404.html', '_redirects', '_headers', 'robots.txt', 'sitemap.xml']) {
  if (!names.has(required)) throw new Error(`Missing Pages export file: ${required}`)
}

console.log(
  `Pages export: ${fileCount} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MiB total; ` +
  `largest: ${largest.path} (${(largest.bytes / 1024 / 1024).toFixed(1)} MiB)`
)
