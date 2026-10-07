// Page <head> metadata, mirroring the intent of _layouts/default.html. Two Jekyll
// template bugs were fixed here after the cutover: og:url now carries the real
// absolute page URL (Jekyll rendered it empty - undefined `url` variable) and the
// empty twitter:site/creator tags (the template read site.seo.* instead of
// site.data.seo.*, and the data values were the theme author's handle) are gone.
import { absoluteUrl } from '@/lib/content'

export function PageMeta({
  title,
  description,
  metaTitle,
  image,
  path,
}: {
  title: string
  description?: string
  metaTitle?: string
  image?: string
  path: string
}) {
  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={absoluteUrl(path)} />
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:title" content={metaTitle ?? title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={absoluteUrl(path)} />
      {image ? <meta property="og:image" content={image} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta name="twitter:card" content="summary" />
    </>
  )
}
