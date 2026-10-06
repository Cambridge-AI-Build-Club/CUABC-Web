import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './playground.css'

export const metadata: Metadata = {
  title: 'Builder Lab | Cambridge AI Builders Club design playground',
  description: 'An interactive design concept for the Cambridge AI Builders Club.',
  robots: { index: false, follow: false },
}

export default function PlaygroundLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="builder-playground">{children}</body>
    </html>
  )
}
