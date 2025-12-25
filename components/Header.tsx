import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Portfolio
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-400 transition-colors">
              About
            </Link>
            <Link href="/projects" className="hover:text-gray-400 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

