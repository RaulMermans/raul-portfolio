import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
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

try {
  mkdirSync(join(fixture, 'components'), { recursive: true })
  mkdirSync(join(fixture, 'styles'), { recursive: true })
  write('components/placeholder.tsx')
  write('styles/placeholder.css')

  expectRejected('raw foundation hex', 'export default () => <div className="bg-[#F5F0EB]" />')
  expectRejected('inline custom font', 'const view = { fontFamily: "Comic Sans MS" }')
  expectRejected('arbitrary CTA radius', 'export default () => <button className="rounded-[24px]" />')

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

  console.log('Experience guard adversarial checks passed.')
} finally {
  rmSync(fixture, { recursive: true, force: true })
}
