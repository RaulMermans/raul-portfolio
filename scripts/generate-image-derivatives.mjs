import { mkdir, readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import sharp from 'sharp'

const sourceRoot = join(process.cwd(), 'public/images/photography')
const outputRoot = join(process.cwd(), 'public/images/derived/photography')
const widths = [480, 768, 1200, 1600, 2400]
const concurrency = 4

async function collectWebpFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const filePath = join(directory, entry.name)
      if (entry.isDirectory()) return collectWebpFiles(filePath)
      return entry.isFile() && entry.name.endsWith('.webp') ? [filePath] : []
    })
  )
  return files.flat()
}

async function needsWrite(sourcePath, outputPath) {
  if (!existsSync(outputPath)) return true
  const [source, output] = await Promise.all([stat(sourcePath), stat(outputPath)])
  return output.mtimeMs < source.mtimeMs
}

async function writeDerivative(sourcePath, outputPath, width, format) {
  if (!(await needsWrite(sourcePath, outputPath))) return false

  await mkdir(dirname(outputPath), { recursive: true })
  const pipeline = sharp(sourcePath).resize({ width, withoutEnlargement: true })

  if (format === 'avif') {
    await pipeline.avif({ quality: 62, effort: 2 }).toFile(outputPath)
  } else {
    await pipeline.webp({ quality: 80, effort: 5 }).toFile(outputPath)
  }

  return true
}

async function runPool(tasks, limit) {
  let nextTask = 0

  async function worker() {
    while (nextTask < tasks.length) {
      const task = tasks[nextTask]
      nextTask += 1
      await task()
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker))
}

const sourceFiles = await collectWebpFiles(sourceRoot)
const tasks = []
for (const sourcePath of sourceFiles) {
  const metadata = await sharp(sourcePath).metadata()
  const sourceWidth = metadata.width
  if (!sourceWidth) throw new Error(`Could not determine width for ${sourcePath}`)

  const assetPath = relative(sourceRoot, sourcePath)
  const stem = assetPath.replace(/\.webp$/, '')

  for (const width of widths.filter((candidate) => candidate <= sourceWidth)) {
    const webpPath = join(outputRoot, `${stem}-${width}.webp`)
    const avifPath = join(outputRoot, `${stem}-${width}.avif`)
    tasks.push(() => writeDerivative(sourcePath, webpPath, width, 'webp'))
    tasks.push(() => writeDerivative(sourcePath, avifPath, width, 'avif'))
  }
}

const generatedResults = []
await runPool(
  tasks.map((task) => async () => generatedResults.push(await task())),
  concurrency
)
const generated = generatedResults.filter(Boolean).length

console.log(`Image derivatives ready: ${sourceFiles.length} sources, ${generated} files generated.`)
