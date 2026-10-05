import type { ReactNode } from 'react'
import '../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the About route group. _layouts/page.html has bodyClass
// "page-basic"; note that about.md's own `bodyClass: page-about` is ignored by
// Jekyll (default.html reads layout.bodyClass, not page.bodyClass) - the rendered
// body class on the live site is `page page-basic`.
export default function AboutLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-basic">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
