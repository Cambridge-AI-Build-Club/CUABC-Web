import type { Metadata } from 'next'
import '../styles/globals.scss'

// Phase 0 placeholder metadata. The full <head> (title format, description, favicon,
// Google Fonts, OpenGraph) is ported from _layouts/default.html in Phase 1.
export const metadata: Metadata = {
  title: 'Cambridge AI Builder Club',
  description: 'A community for Cambridge students interested in building with AI.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Jekyll's default.html renders <body class='page {{layout.bodyClass}}'>.
  return (
    <html lang="en-GB">
      <body className="page">{children}</body>
    </html>
  )
}
