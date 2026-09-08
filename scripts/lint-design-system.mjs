import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const roots = ['app', 'components', 'styles']
const permittedFontFamilies = new Set([
  'var(--font-heading)', 'var(--font-ui)', 'var(--font-code)', 'var(--font-prose)',
])
const foundationHex = /#(?:f5f0eb|1a1714|c41e3a|6b635a)\b/gi
const foundationRgb = /rgba?\(\s*(?:245\s*,\s*240\s*,\s*235|26\s*,\s*23\s*,\s*20|196\s*,\s*30\s*,\s*58|107\s*,\s*99\s*,\s*90)\b/gi
const arbitraryTailwindRadius = /\brounded-\[(?!var\(--radius-)[^\]]+\]/g
const arbitraryTailwindColor = /\b(?:bg|text|border|fill|stroke)-\[#[0-9a-f]{3,8}\]/gi
const overrides = new Map([
  ['app/(es)/apps/overflow/OverflowLanding.tsx', 'project-native evidence treatment'],
  ['app/global-error.tsx', 'global error fallback'],
  ['styles/case-study-new.css', 'project-specific case-study evidence migration'],
  ['styles/globals.css', 'legacy route foundation migration'],
  ['styles/remoria-brand-system.css', 'project-native evidence treatment'],
])
const legacyMigrationHashes = new Map([
  ['styles/case-study-new.css', 'd42c3ddfa29ca885ac8779c8b7969852d5324691cd39d6e226711627e6110612'],
  ['styles/globals.css', '7d598b26ad0bf7094552ef320b29cfab5766a67e9e1ba8cccee8580183b9594a'],
])
const failures = []

function files(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return files(path)
    return /\.(?:ts|tsx|css)$/.test(entry.name) ? [path] : []
  })
}

function allowed(relativePath, source) {
  const reason = overrides.get(relativePath)
  if (!reason || !source.includes(`@design-override reason: ${reason}`)) return false

  const expectedHash = legacyMigrationHashes.get(relativePath)
  if (!expectedHash) return true

  const actualHash = createHash('sha256').update(source).digest('hex')
  if (actualHash === expectedHash) return true

  failures.push(`${relativePath}: legacy migration boundary changed; migrate its foundation values instead of extending the exception`)
  return false
}

for (const relativePath of roots.flatMap(files)) {
  const source = readFileSync(join(root, relativePath), 'utf8')
  if (relativePath === 'styles/design-system.css' || allowed(relativePath, source)) continue

  for (const match of source.matchAll(foundationHex)) {
    failures.push(`${relativePath}:${match.index}: raw foundation color ${match[0]}`)
  }
  for (const match of source.matchAll(foundationRgb)) {
    failures.push(`${relativePath}:${match.index}: raw foundation RGB color ${match[0]}`)
  }
  for (const match of source.matchAll(/fontFamily\s*:\s*['\"]([^'\"]+)/g)) {
    if (![...permittedFontFamilies].some((font) => match[1].startsWith(font))) {
      failures.push(`${relativePath}:${match.index}: inline font family ${match[1]}`)
    }
  }
  for (const match of source.matchAll(arbitraryTailwindRadius)) {
    failures.push(`${relativePath}:${match.index}: arbitrary Tailwind radius ${match[0]}`)
  }
  for (const match of source.matchAll(arbitraryTailwindColor)) {
    failures.push(`${relativePath}:${match.index}: arbitrary Tailwind color ${match[0]}`)
  }
}

if (failures.length) {
  console.error('Design-system lint failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log('Design-system lint passed.')
}
