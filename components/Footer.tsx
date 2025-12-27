import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 py-6 flex justify-between items-center bg-cream border-t border-cream-dark font-mono text-xs tracking-[0.1em] uppercase text-ink-faint md:flex-row flex-col gap-3 text-center">
      <div className="flex gap-5 md:flex-row flex-col gap-2">
        <span>© {currentYear} Raúl Mermans</span>
        <Link href="/privacy" className="hover:text-ink transition-colors">
          Privacy
        </Link>
      </div>
      <span>All rights reserved</span>
    </footer>
  )
}
