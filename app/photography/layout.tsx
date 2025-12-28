import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photography — Raúl Mermans',
  description: 'Photography work by Raúl Mermans — Landscape and Architecture collections.',
}

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="photography-layout">
      {children}
    </div>
  )
}

