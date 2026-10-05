// Favicon and Google Fonts links from _layouts/default.html. React 19 hoists these
// into <head> at build time.
import { url } from '@/lib/content'

export function HeadLinks() {
  return (
    <>
      <link rel="icon" type="image/png" href={url('/images/favicon-32x32.png')} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
        precedence="default"
      />
    </>
  )
}
