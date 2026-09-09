import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
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
const legacyMigrationHashes = new Map([
  ['app/(es)/apps/overflow/OverflowLanding.tsx', '0f6441b11b0018f469dc71752e2d4838e278126d6db73a8e2f483ab408b2b802'],
  ['app/(es)/case-studies/category-page-shared.tsx', 'eb8f2a9987a19e693d26d6a1efd6ea10e56daaf020dc2f461efb716af4ead61a'],
  ['app/(es)/visuals/VisualsPage.module.css', '36825fb0ae2e91c86f2c7e5289c54af6f63a5577d8d1ff21edd76778e8393f48'],
  ['components/CreativeInfrastructure.module.css', '6595e4192f50caa3c9a7bd03252cdc5d24d407caff7f3f59abbd22b76670e412'],
  ['components/CustomCursor.tsx', 'd7c6a76835aafce539583b979b2c58515b28818a58b4589b4ab5552d6f2dc00c'],
  ['components/Header.module.css', 'a629417f4047dd5b057b47d51a6b799f85cee4ee460d7592e95349866a07c00c'],
  ['components/Hero.module.css', 'e1dbda27d23d2c017d5cc8ae22aaf621916bc44e789d7bb8c1a9366384d02028'],
  ['components/HomeNarrative.module.css', 'a3128db269c74a555545e820dcb8e90d56146522a118a44aa40f6312111362fb'],
  ['components/SectionCards.module.css', '6013f96a5b2937c1b4b7b551ade49eeb67fa876289ab18dcab9d054f8c95b7fc'],
  ['components/services/ServiceLandingPage.module.css', '8eaf663298cd7193451e2cc852c8904de953fdfd654700181c51aeaa966648b1'],
  ['styles/apps-coverflow.css', '625834d6c183f88759f95fd22cb6198d5d15ce98c96703b66412ec6477f7dfc3'],
  ['styles/case-study-new.css', 'd42c3ddfa29ca885ac8779c8b7969852d5324691cd39d6e226711627e6110612'],
  ['styles/demandos-case-study.css', '9b0b1c0de3862e8b933329311db045f3ea096ceeb825f4234af373f226aa3813'],
  ['styles/globals.css', '7d598b26ad0bf7094552ef320b29cfab5766a67e9e1ba8cccee8580183b9594a'],
  ['styles/remoria-brand-system.css', 'b40d3ca7f9bd293f2fa62c495d44afd124f37412018fac3bcb9e7b5d2992a927'],
  ['styles/searchsignal-case-study.css', '37ba6a7d03aeaac651df50b05507b60007cc82e3b5db1ecf420b87b47a9bbccb'],
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
  const expectedHash = legacyMigrationHashes.get(relativePath)
  if (expectedHash) {
    const actualHash = createHash('sha256').update(source).digest('hex')
    if (actualHash === expectedHash) return true

    failures.push(`${relativePath}: legacy migration boundary changed; migrate its foundation values instead of extending the exception`)
    return false
  }

  const isProjectEvidence = relativePath.startsWith('app/(es)/apps/')
  return isProjectEvidence && source.includes('@design-override reason: project-native evidence treatment')
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
