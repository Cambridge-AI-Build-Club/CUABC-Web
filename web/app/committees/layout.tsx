import type { ReactNode } from 'react'
import '../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the Committees route group. committees.md uses layout: page,
// which renders with the default "page-basic" body class (same as About).
export default function CommitteesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-basic">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
