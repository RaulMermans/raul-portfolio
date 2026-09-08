import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const experience = readFileSync(join(root, 'data/portfolio-experience.ts'), 'utf8')
const editorial = readFileSync(join(root, 'data/case-study-editorial.ts'), 'utf8')
const failures = []

const orderBlock = editorial.match(/CASE_STUDY_ORDER\s*=\s*\[([\s\S]*?)\]\s+as const/)
if (!orderBlock) throw new Error('Could not read CASE_STUDY_ORDER.')

const caseStudySlugs = [...orderBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
const projectBlock = experience.match(/PROJECT_EXPERIENCE[^=]*=\s*\[([\s\S]*?)\]\s+as const/)
if (!projectBlock) throw new Error('Could not read PROJECT_EXPERIENCE.')

const projects = [...projectBlock[1].matchAll(/\{\s*slug:\s*'([^']+)'[\s\S]*?primaryDiscipline:\s*'([^']+)'[\s\S]*?relatedServices:\s*\[([^\]]*)\][\s\S]*?presentationFamily:\s*'([^']+)'/g)]
  .map((match) => ({ slug: match[1], discipline: match[2], services: match[3], presentationFamily: match[4] }))

const allowedDisciplines = new Set([
  'creative', 'data-research', 'business-intelligence', 'ai-automation', 'digital-product', 'photography',
])
const allowedPresentationFamilies = new Set(['creative-marketing', 'technical-product', 'hybrid'])
const projectSlugs = new Set(projects.map((project) => project.slug))

for (const slug of caseStudySlugs) {
  if (!projectSlugs.has(slug)) failures.push(`${slug} is missing from PROJECT_EXPERIENCE`)
}
for (const project of projects) {
  if (!allowedDisciplines.has(project.discipline)) failures.push(`${project.slug} has unsupported discipline ${project.discipline}`)
  if (!allowedPresentationFamilies.has(project.presentationFamily)) failures.push(`${project.slug} has unsupported presentation family ${project.presentationFamily}`)
  if (!project.services.trim()) failures.push(`${project.slug} has no related service`)
}
if (projects.length !== caseStudySlugs.length) {
  failures.push(`Project registry count (${projects.length}) does not match substantial case-study count (${caseStudySlugs.length})`)
}

if (failures.length) {
  console.error('Project taxonomy validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log(`Project taxonomy validation passed for ${projects.length} case studies.`)
}
