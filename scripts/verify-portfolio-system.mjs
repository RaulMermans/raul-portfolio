import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const failures = []

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

function requireText(relativePath, text) {
  if (!read(relativePath).includes(text)) {
    failures.push(`${relativePath} is missing required contract text: ${text}`)
  }
}

function forbidText(relativePath, text) {
  if (read(relativePath).includes(text)) {
    failures.push(`${relativePath} contains prohibited legacy text: ${text}`)
  }
}

const designSystem = 'styles/design-system.css'
const requiredTokens = [
  '--font-heading:',
  '--font-ui:',
  '--font-code:',
  '--font-prose:',
  '--text-hero:',
  '--prose-measure:',
  '--prose-line-height:',
  '--section-content-max:',
  '--section-inline-padding:',
  '--radius-button: 0;',
  '--touch-min: 44px;',
]

for (const token of requiredTokens) requireText(designSystem, token)
for (const selector of [
  '.ui-page-intro',
  '.ui-section',
  '.ui-section-heading',
  '.ui-prose',
  '.ui-media',
  '.ui-button',
]) {
  requireText(designSystem, selector)
}

const buttonRuleStart = read(designSystem).indexOf('.ui-button,')
const buttonRuleEnd = read(designSystem).indexOf('}\n\n.btn::before', buttonRuleStart)
const buttonRule = read(designSystem).slice(buttonRuleStart, buttonRuleEnd)
if (!buttonRule.includes('border-radius: var(--radius-button);')) {
  failures.push('Shared button rule must use the square --radius-button token.')
}

const router = '.codex/skills/portfolio-experience-system/SKILL.md'
requireText(router, 'name: portfolio-experience-system')
for (const skill of [
  '$portfolio-design-system',
  '$portfolio-page-architecture',
  '$portfolio-case-study-system',
  '$portfolio-art-direction',
  '$impeccable-interface',
  '$editorial-language',
  '$no-ai-slop',
  '$humanizer',
  '$verify-rendered-ui',
]) {
  requireText(router, skill)
}

for (const skillPath of [
  '.codex/skills/portfolio-page-architecture/SKILL.md',
  '.codex/skills/portfolio-case-study-system/SKILL.md',
  '.codex/skills/portfolio-art-direction/SKILL.md',
  '.codex/skills/impeccable-interface/SKILL.md',
]) {
  requireText(skillPath, 'description:')
}

const caseStudyIndex = 'app/(es)/case-studies/page.tsx'
requireText(caseStudyIndex, 'className="ui-page-intro"')
requireText(caseStudyIndex, '<h1 id="case-studies-heading">{heading}</h1>')
forbidText(caseStudyIndex, '<h1 id="case-studies-heading" className="visually-hidden">')

const caseStudyHero = 'components/case-studies/CaseStudyHero.tsx'
forbidText(caseStudyHero, "window.addEventListener('scroll'")
for (const contractAttribute of [
  'data-case-study-hero',
  'data-presentation-family={presentationFamily}',
  'data-case-study-hero-back',
  'data-case-study-hero-label',
  'data-case-study-hero-tagline',
]) {
  requireText(caseStudyHero, contractAttribute)
}

const fullCaseStudyPages = [
  'ai-sports',
  'remoria',
  'relay',
  'opstwin',
  'searchsignal',
  'campaign-pulse',
  'demandos',
  'campaign-sandbox',
  'data-brief-ai',
  'website-auditor',
  'benchmark-dashboard',
  'blogagent',
  'territoryops-spain',
  'raul-portfolio',
]

for (const slug of fullCaseStudyPages) {
  const page = `app/(es)/case-studies/${slug}/page.tsx`
  const source = read(page)

  if (!source.includes('CaseStudyMiniNav')) {
    failures.push(`${slug} must use CaseStudyMiniNav for its shared chapter path.`)
  }

  if (!source.includes('CaseStudySnapshot') && !source.includes('CommercialCaseStudyIntro')) {
    failures.push(`${slug} must include the shared five-part case-study snapshot.`)
  }

  if (
    !source.includes('CaseStudyHero') &&
    !source.includes('data-case-study-hero')
  ) {
    failures.push(`${slug} must expose the shared case-study hero contract.`)
  }

  if (
    !source.includes('CaseStudyHero') &&
    !source.includes('CaseStudyHeroLabel') &&
    !source.includes('data-case-study-hero-label')
  ) {
    failures.push(`${slug} must render the shared case-study label.`)
  }
}

const caseStudyEditorial = 'data/case-study-editorial.ts'
requireText(caseStudyEditorial, "'relay'")

const caseStudyStyles = 'styles/case-study-new.css'
for (const selector of [
  'CASE-STUDY FOUNDATION LOCK',
  '.case-study-hero-foundation__label',
  'nav.case-study-mini-nav[data-case-study-mini-nav]',
]) {
  requireText(caseStudyStyles, selector)
}

const photographyPage = 'app/(es)/photography/page.tsx'
requireText(photographyPage, 'className="gallery photography-page"')
requireText(photographyPage, 'className="ui-page-intro photography-intro"')
requireText(photographyPage, '<h1 id="photography-title">')
forbidText(photographyPage, '<h1 className="visually-hidden">')
forbidText(photographyPage, '<div className="grain" aria-hidden="true"></div>')

const appsIndex = 'app/(es)/apps/apps-page-shared.tsx'
requireText(appsIndex, "import styles from './AppsPages.module.css'")
requireText(appsIndex, 'className={`ui-page-intro ${styles.indexIntro}`}')
requireText(appsIndex, '<h1 id="apps-title">{copy.title}</h1>')
requireText(appsIndex, '<h2 className={styles.appCardTitle}>{app.name}</h2>')
forbidText(appsIndex, 'fontFamily:')
forbidText(appsIndex, 'rgba(')

const appDetail = 'app/(es)/apps/app-detail-shared.tsx'
requireText(appDetail, "import styles from './AppsPages.module.css'")
requireText(appDetail, '<h1 className={styles.detailTitle}>{app.name}</h1>')
requireText(appDetail, 'className={`ui-surface ${styles.metric}`}')
for (const legacyStyle of ['fontFamily:', 'rounded-[22px]', 'rounded-[28px]', 'rounded-[30px]', 'rounded-[32px]', 'rgba(']) {
  forbidText(appDetail, legacyStyle)
}

const appsStyles = 'app/(es)/apps/AppsPages.module.css'
for (const token of [
  '--surface-page',
  '--text-primary',
  '--font-heading',
  '--font-prose',
  '--text-hero',
  '--section-content-max',
  '--radius-md',
  '--touch-min',
  '--card-heading-block',
]) {
  requireText(appsStyles, token)
}

const appCard = 'components/apps/AppCard.tsx'
requireText(appCard, "import styles from './AppCard.module.css'")
requireText(appCard, 'className={styles.card}')
for (const legacyStyle of ['fontFamily:', 'rounded-[32px]', 'rgba(']) {
  forbidText(appCard, legacyStyle)
}

const appCardStyles = 'components/apps/AppCard.module.css'
for (const token of [
  '--surface-muted',
  '--font-heading',
  '--touch-min',
  '--card-heading-block',
  '--radius-md',
]) {
  requireText(appCardStyles, token)
}

const appVisual = 'components/apps/AppVisual.tsx'
for (const radius of ['rounded-[32px]', 'rounded-[28px]', 'rounded-[24px]', 'rounded-[22px]', 'rounded-[20px]', 'rounded-[18px]']) {
  forbidText(appVisual, radius)
}
requireText(appVisual, 'rounded-[var(--radius-md)]')

if (failures.length > 0) {
  console.error('Portfolio experience-system verification failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log('Portfolio experience-system verification passed.')
}
