type CaseStudyMiniNavProps = {
  items: ReadonlyArray<readonly string[]>
  ariaLabel: string
  className?: string
}

export default function CaseStudyMiniNav({
  items,
  ariaLabel,
  className,
}: CaseStudyMiniNavProps) {
  return (
    <nav
      className={['data-brief-mini-nav', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      <ul>
        {items.map(([label, href], index) =>
          label && href ? (
            <li key={href}>
              <a href={href}>{label}</a>
              {index < items.length - 1 && (
                <span className="data-brief-mini-nav__separator" aria-hidden="true">
                  {' / '}
                </span>
              )}
            </li>
          ) : null
        )}
      </ul>
    </nav>
  )
}
