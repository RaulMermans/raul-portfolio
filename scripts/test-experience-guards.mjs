import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const repository = process.cwd()
const lint = resolve(repository, 'scripts/lint-design-system.mjs')
const registry = resolve(repository, 'scripts/verify-route-registry.mjs')
const fixture = mkdtempSync(join(tmpdir(), 'portfolio-experience-'))

function write(path, content = '') {
  const target = join(fixture, path)
  mkdirSync(resolve(target, '..'), { recursive: true })
  writeFileSync(target, content)
}

function run(script) {
  return spawnSync(process.execPath, [script], {
    cwd: fixture,
    encoding: 'utf8',
  })
}

function expectRejected(name, source) {
  rmSync(join(fixture, 'app'), { recursive: true, force: true })
  write('app/page.tsx', source)
  const result = run(lint)
  if (result.status === 0) throw new Error(`${name} was accepted by design lint`)
}

function expectLintRejected(name) {
  const result = run(lint)
  if (result.status === 0) throw new Error(`${name} was accepted by design lint`)
}

try {
  mkdirSync(join(fixture, 'components'), { recursive: true })
  mkdirSync(join(fixture, 'styles'), { recursive: true })
  write('components/placeholder.tsx')
  write('styles/placeholder.css')

  expectRejected('raw foundation hex', 'export default () => <div className="bg-[#F5F0EB]" />')
  expectRejected('raw foundation RGBA in a shared component', 'export default () => <div style={{ color: "rgba(26, 23, 20, 0.7)" }} />')
  expectRejected('inline custom font', 'const view = { fontFamily: "Comic Sans MS" }')
  expectRejected('arbitrary CTA radius', 'export default () => <button className="rounded-[24px]" />')

  rmSync(join(fixture, 'app'), { recursive: true, force: true })
  write('app/page.tsx', 'export default () => <main />')
  write('components/Shared.module.css', '.cta { border-radius: 24px; }')
  expectLintRejected('shared portfolio control radius')
  rmSync(join(fixture, 'components/Shared.module.css'), { force: true })

  write('tailwind.config.js', "module.exports = { theme: { extend: { colors: { cream: '#F5F0EB' } } } }")
  expectLintRejected('Tailwind duplicate palette definition')
  rmSync(join(fixture, 'tailwind.config.js'), { force: true })

  rmSync(join(fixture, 'app'), { recursive: true, force: true })
  write('app/page.tsx', 'export default () => <main />')
  write('app/new-landing/page.tsx', 'export default () => <main />')
  const routeResult = run(registry)
  if (routeResult.status === 0) throw new Error('unregistered public landing was accepted')

  rmSync(join(fixture, 'app'), { recursive: true, force: true })
  write(
    'app/(es)/apps/overflow/OverflowLanding.tsx',
    '// @design-override reason: project-native evidence treatment\nconst view = { fontFamily: "Project evidence face" }'
  )
  const exceptionResult = run(lint)
  if (exceptionResult.status !== 0) throw new Error('registered project-evidence exception was rejected')

  rmSync(join(fixture, 'app'), { recursive: true, force: true })
  rmSync(join(fixture, 'components'), { recursive: true, force: true })
  write('app/page.tsx', 'export default () => <main />')
  write('components/Header.tsx', '// @design-override reason: project-native evidence treatment\nconst view = { color: "rgba(26, 23, 20, 0.7)" }')
  expectLintRejected('project route attempting to modify global navigation')

  rmSync(join(fixture, 'components'), { recursive: true, force: true })
  write('components/placeholder.tsx')
  write('styles/remoria-brand-system.css', "/* @design-override reason: project-native evidence treatment */\n.evidence { color: '#765432'; border-radius: 12px; font-family: 'Project proof face'; }")
  const projectEvidenceResult = run(lint)
  if (projectEvidenceResult.status !== 0) throw new Error('scoped project-native evidence was rejected')

  const serviceSource = readFileSync(join(repository, 'data/service-landings.ts'), 'utf8')
  if (/\brelatedCaseStudies\b/.test(serviceSource)) {
    throw new Error('service landings retain duplicate related case-study ownership')
  }

  console.log('Experience guard adversarial checks passed.')
} finally {
  rmSync(fixture, { recursive: true, force: true })
}
