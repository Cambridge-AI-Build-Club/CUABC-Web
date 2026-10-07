import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './playground.css'

export const metadata: Metadata = {
  title: 'Cambridge AI Builder Club | Design playground',
  description: 'An interactive Claude-branded design concept for the Cambridge builder community.',
  robots: { index: false, follow: false },
}

export default function PlaygroundLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="builder-playground">{children}</body>
    </html>
  )
}
