import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const experience = readFileSync(join(root, 'data/portfolio-experience.ts'), 'utf8')
const editorial = readFileSync(join(root, 'data/case-study-editorial.ts'), 'utf8')
const services = readFileSync(join(root, 'data/service-landings.ts'), 'utf8')
const failures = []

const orderBlock = editorial.match(/CASE_STUDY_ORDER\s*=\s*\[([\s\S]*?)\]\s+as const/)
if (!orderBlock) throw new Error('Could not read CASE_STUDY_ORDER.')

const caseStudySlugs = [...orderBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
const projectBlock = experience.match(/PROJECT_EXPERIENCE[^=]*=\s*\[([\s\S]*?)\]\s+as const/)
if (!projectBlock) throw new Error('Could not read PROJECT_EXPERIENCE.')

const projects = [...projectBlock[1].matchAll(/\{\s*slug:\s*'([^']+)'[\s\S]*?primaryDiscipline:\s*'([^']+)'[\s\S]*?relatedServices:\s*\[([^\]]*)\]/g)]
  .map((match) => ({
    slug: match[1],
    discipline: match[2],
    services: [...match[3].matchAll(/'([^']+)'/g)].map((service) => service[1]),
  }))

const englishBlock = services.match(/const englishLandings[\s\S]*?=\s*\[([\s\S]*?)\]\n\nconst spanishLandings/)
if (!englishBlock) throw new Error('Could not read canonical service landings.')
const canonicalServices = new Set([...englishBlock[1].matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1]))
const allowedDisciplines = new Set([
  'creative', 'data-research', 'business-intelligence', 'ai-automation', 'digital-product', 'photography',
])
const projectSlugs = new Set(projects.map((project) => project.slug))

if (/\brelatedCaseStudies\b/.test(services)) {
  failures.push('service landings may not own relatedCaseStudies; derive them from PROJECT_EXPERIENCE')
}
for (const slug of caseStudySlugs) {
  if (!projectSlugs.has(slug)) failures.push(`${slug} is missing from PROJECT_EXPERIENCE`)
}
for (const project of projects) {
  if (!allowedDisciplines.has(project.discipline)) failures.push(`${project.slug} has unsupported discipline ${project.discipline}`)
  if (!project.services.length) failures.push(`${project.slug} has no related service`)
  for (const service of project.services) {
    if (!canonicalServices.has(service)) failures.push(`${project.slug} references unknown service ${service}`)
  }
}
for (const service of canonicalServices) {
  if (!projects.some((project) => project.services.includes(service))) {
    failures.push(`${service} cannot safely resolve related projects`)
  }
}
if (projects.length !== caseStudySlugs.length) {
  failures.push(`Project registry count (${projects.length}) does not match substantial case-study count (${caseStudySlugs.length})`)
}

if (failures.length) {
  console.error('Project taxonomy validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log(`Project taxonomy validation passed for ${projects.length} case studies and ${canonicalServices.size} canonical services.`)
}
