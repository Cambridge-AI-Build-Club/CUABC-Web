import type { ReactNode } from 'react'
import '../../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for single blog pages (_layouts/blog.html bodyClass). The
// page-blog class drives the grey lead-paragraph styling in _sass/pages/_page-blog.scss.
export default function BlogDetailLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-blog">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
