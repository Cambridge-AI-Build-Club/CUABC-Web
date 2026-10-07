import type { ReactNode } from 'react'
import '@/styles/claude.css'
import '@/styles/site.css'
import { url } from '@/lib/content'

export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="icon" type="image/png" href={url('/images/favicon-32x32.png')} /></head>
      <body className="builder-site">{children}</body>
    </html>
  )
}
