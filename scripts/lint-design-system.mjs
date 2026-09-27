import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const roots = ['app', 'components', 'styles']
const permittedFontFamilies = new Set([
  'var(--font-heading)', 'var(--font-ui)', 'var(--font-code)', 'var(--font-prose)',
])
const foundationHex = /#(?:f5f0eb|1a1714|c41e3a|6b635a)\b/gi
const foundationRgb = /rgba?\(\s*(?:245\s*,\s*240\s*,\s*235|26\s*,\s*23\s*,\s*20|196\s*,\s*30\s*,\s*58|107\s*,\s*99\s*,\s*90)\b/gi
const arbitraryTailwindRadius = /\brounded-\[(?!var\(--radius-)[^\]]+\]/g
const arbitraryTailwindColor = /\b(?:bg|text|border|fill|stroke)-\[#[0-9a-f]{3,8}\]/gi
const permittedCssFonts = /^(?:var\(--font-(?:heading|ui|code|prose)\)(?:\s*!important)?|inherit)$/
const permittedControlRadii = /^(?:0|inherit|var\(--radius-button\))$/
const projectEvidenceOverrides = new Map([
  ['app/(es)/apps/overflow/OverflowLanding.tsx', 'project-native evidence treatment'],
  ['app/global-error.tsx', 'global error fallback'],
  ['styles/remoria-brand-system.css', 'project-native evidence treatment'],
])
const tailwindAliases = new Map([
  ['cream', 'var(--cream)'],
  ['cream-warm', 'var(--cream-warm)'],
  ['cream-dark', 'var(--cream-dark)'],
  ['ink', 'var(--ink)'],
  ['ink-soft', 'var(--ink-soft)'],
  ['ink-muted', 'var(--ink-muted)'],
  ['ink-faint', 'var(--ink-faint)'],
  ['accent', 'var(--accent)'],
  ['gradient-warm', 'var(--warm)'],
  ['gradient-rose', 'var(--rose)'],
  ['gradient-soft', 'var(--gradient-soft)'],
])
const failures = []

function files(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return files(path)
    return /\.(?:ts|tsx|css)$/.test(entry.name) ? [path] : []
  })
}

function hasApprovedOverride(relativePath, source) {
  const reason = projectEvidenceOverrides.get(relativePath)
  return Boolean(reason && source.includes(`@design-override reason: ${reason}`))
}

function lintTailwindConfig() {
  const configPath = join(root, 'tailwind.config.js')
  if (!existsSync(configPath)) return

  const source = readFileSync(configPath, 'utf8')
  if (/#(?:[\da-f]{3,8})\b/i.test(source)) {
    failures.push('tailwind.config.js: Tailwind may not define portfolio color literals')
  }
  if (/--font-(?:display|body|mono|reading)\b/.test(source)) {
    failures.push('tailwind.config.js: Tailwind must reference canonical font variables')
  }
  for (const [alias, canonicalValue] of tailwindAliases) {
    const property = new RegExp(`(?:['\"]${alias}['\"]|\\b${alias}\\b)\\s*:\\s*['\"]([^'\"]+)['\"]`)
    const match = source.match(property)
    if (match && match[1] !== canonicalValue) {
      failures.push(`tailwind.config.js: ${alias} must reference ${canonicalValue}`)
    }
  }
}

function lintControlRadii(relativePath, source) {
  if (!relativePath.startsWith('components/') || !relativePath.endsWith('.css')) return

  for (const match of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/(?:button|cta|control|nav|link|menu)/i.test(match[1])) continue
    const radius = match[2].match(/border-radius:\s*([^;]+);/)
    if (radius && !permittedControlRadii.test(radius[1].trim())) {
      failures.push(`${relativePath}:${match.index}: shared control radius ${radius[1].trim()}`)
    }
  }
}

lintTailwindConfig()

for (const relativePath of roots.flatMap(files)) {
  const source = readFileSync(join(root, relativePath), 'utf8')
  if (relativePath === 'styles/design-system.css' || hasApprovedOverride(relativePath, source)) continue

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
  for (const match of source.matchAll(/font-family:\s*([^;]+);/g)) {
    if (!permittedCssFonts.test(match[1].trim())) {
      failures.push(`${relativePath}:${match.index}: unsupported font family ${match[1].trim()}`)
    }
  }
  for (const match of source.matchAll(arbitraryTailwindRadius)) {
    failures.push(`${relativePath}:${match.index}: arbitrary Tailwind radius ${match[0]}`)
  }
  for (const match of source.matchAll(arbitraryTailwindColor)) {
    failures.push(`${relativePath}:${match.index}: arbitrary Tailwind color ${match[0]}`)
  }
  lintControlRadii(relativePath, source)
}

if (failures.length) {
  console.error('Design-system lint failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log('Design-system lint passed.')
}
