import type { ReactNode } from 'react'
import '../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the home route group. Mirrors _layouts/home.html front matter
// (layout: default, bodyClass: "page-home") -> <body class='page page-home'>.
export default function HomeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-home">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
