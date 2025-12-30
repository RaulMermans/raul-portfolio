import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visuals — Raúl Mermans',
  description: 'A curated collection of AI art, album covers, and digital experiments by Raúl Mermans.',
}

export default function VisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="visuals-layout">
      {children}
    </div>
  )
}

