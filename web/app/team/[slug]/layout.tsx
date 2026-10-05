import type { ReactNode } from 'react'
import '../../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for single team member pages (_layouts/team.html bodyClass). There is
// no _page-team.scss, so unlike events/blogs there is no lead-paragraph styling.
export default function TeamDetailLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-team">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
