#!/usr/bin/env node

import { mkdir, readdir, stat } from 'node:fs/promises'
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path'
import sharp from 'sharp'

const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.tif', '.tiff', '.webp'])
const usage = `Usage: npm run images:convert -- <image-or-folder> [options]

Supported inputs: AVIF, GIF, JPEG, PNG, SVG, TIFF, WebP.

Options:
  --output <path>     Output file (single image) or folder (input folder)
  --quality <1-100>   WebP quality (default: 82)
  --max-width <px>    Maximum width, without enlarging (default: 2400)
  --force             Replace existing converted files

Examples:
  npm run images:convert -- ~/Downloads/photo.jpg
  npm run images:convert -- ~/Downloads/photos --output public/images/photography/new-series
  npm run images:convert -- photo.png --output public/images/visuals/photo.webp`

function parseArgs(args) {
  const options = { quality: 82, maxWidth: 2400, force: false }
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--help' || arg === '-h') {
      console.log(usage)
      process.exit(0)
    } else if (arg === '--force') {
      options.force = true
    } else if (arg === '--output' || arg === '--quality' || arg === '--max-width') {
      const value = args[++index]
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${arg}`)
      if (arg === '--output') options.output = value
      if (arg === '--quality') options.quality = Number(value)
      if (arg === '--max-width') options.maxWidth = Number(value)
    } else if (arg.startsWith('-') || options.input) {
      throw new Error(`Unexpected argument: ${arg}`)
    } else {
      options.input = arg
    }
  }
  if (!options.input) throw new Error(usage)
  if (!Number.isInteger(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error('Quality must be an integer from 1 to 100')
  }
  if (!Number.isInteger(options.maxWidth) || options.maxWidth < 1) {
    throw new Error('Max width must be a positive integer')
  }
  return options
}

async function collectImages(folder) {
  const entries = await readdir(folder, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(folder, entry.name)
    if (entry.isDirectory()) return collectImages(path)
    return entry.isFile() && imageExtensions.has(extname(entry.name).toLowerCase()) ? [path] : []
  }))
  return nested.flat()
}

async function convert(source, destination, options) {
  if (source === destination) throw new Error(`Input and output are the same file: ${source}`)
  try {
    await stat(destination)
    if (!options.force) {
      console.log(`Skipped (already exists): ${destination}`)
      return false
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  await mkdir(dirname(destination), { recursive: true })
  await sharp(source, { animated: true })
    .rotate()
    .resize({ width: options.maxWidth, withoutEnlargement: true })
    .webp({ quality: options.quality, effort: 5 })
    .toFile(destination)
  console.log(`Converted: ${source} → ${destination}`)
  return true
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const input = resolve(options.input)
  const inputStat = await stat(input)

  if (inputStat.isFile()) {
    if (!imageExtensions.has(extname(input).toLowerCase())) {
      throw new Error(`Unsupported image extension: ${extname(input) || '(none)'}`)
    }
    const stem = basename(input, extname(input))
    const filename = `${stem}${extname(input).toLowerCase() === '.webp' ? '-optimized' : ''}.webp`
    const output = resolve(options.output ?? join(dirname(input), filename))
    if (extname(output).toLowerCase() !== '.webp') throw new Error('Output file must end in .webp')
    await convert(input, output, options)
    return
  }

  if (!inputStat.isDirectory()) throw new Error('Input must be an image file or folder')
  const output = resolve(options.output ?? `${input}-webp`)
  const outputRelative = relative(input, output)
  if (outputRelative === '' || (!outputRelative.startsWith(`..${sep}`) && outputRelative !== '..')) {
    throw new Error('Output folder must be outside the input folder')
  }

  const images = await collectImages(input)
  const destinations = new Map()
  for (const source of images) {
    const assetPath = relative(input, source)
    const extension = extname(assetPath)
    const suffix = extension.toLowerCase() === '.webp' ? '-optimized' : ''
    const destination = join(output, `${assetPath.slice(0, -extension.length)}${suffix}.webp`)
    if (destinations.has(destination)) {
      throw new Error(`Output name collision: ${destinations.get(destination)} and ${source}`)
    }
    destinations.set(destination, source)
  }

  let converted = 0
  for (const [destination, source] of destinations) {
    if (await convert(source, destination, options)) converted += 1
  }
  console.log(`Ready: ${converted} converted, ${images.length - converted} skipped.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
