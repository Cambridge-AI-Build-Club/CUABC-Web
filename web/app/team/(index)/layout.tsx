import type { ReactNode } from 'react'
import '../../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the team listing (_layouts/teams.html bodyClass).
export default function TeamLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-teams">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
