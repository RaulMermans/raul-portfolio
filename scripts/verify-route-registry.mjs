import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.cwd()
const appRoot = join(root, 'app')
const failures = []

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return walk(path)
    return entry.name === 'page.tsx' ? [path] : []
  })
}

function routeForSource(source) {
  const parts = relative(appRoot, source).split(sep).slice(0, -1)
  const visibleParts = parts.filter((part) => !/^\(.+\)$/.test(part))
  if (visibleParts[0] === 'en' || visibleParts[0] === 'es') visibleParts.shift()
  return `/${visibleParts.join('/')}`.replace(/\/$/, '') || '/'
}

const registrySource = readFileSync(join(root, 'data/portfolio-experience.ts'), 'utf8')
const registryBlock = registrySource.split('export type ProjectExperience')[0]
const patterns = [...registryBlock.matchAll(/route:\s*'([^']+)'/g)].map((match) => match[1])

if (patterns.length === 0) {
  throw new Error('Public route registry has no route patterns.')
}

function matches(route, pattern) {
  if (route === pattern) return true
  const expected = pattern.split('/').filter(Boolean)
  const actual = route.split('/').filter(Boolean)
  return expected.length === actual.length && expected.every((part, index) => part === actual[index] || /^\[.+\]$/.test(part))
}

for (const source of walk(appRoot)) {
  const route = routeForSource(source)
  if (!patterns.some((pattern) => matches(route, pattern))) {
    failures.push(`${relative(root, source)} resolves to unregistered public route ${route}`)
  }
}

if (failures.length) {
  console.error('Route registry validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log('Route registry validation passed.')
}
