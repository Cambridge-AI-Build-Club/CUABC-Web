import type { ReactNode } from 'react'
import '../../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the blogs listing (_layouts/blogs.html bodyClass).
export default function BlogsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-blogs">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
