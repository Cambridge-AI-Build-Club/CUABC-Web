import type { ReactNode } from 'react'
import '../../styles/globals.scss'
import { HeadLinks } from '@/components/HeadLinks'

// Root layout for the Contact route group (_layouts/contact.html bodyClass).
export default function ContactLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="page page-contact">
        <HeadLinks />
        {children}
      </body>
    </html>
  )
}
