// Replicates the <head> output of _layouts/default.html, quirks included: og:url is
// empty there (undefined Liquid `url` variable) and twitter:site/creator render empty
// (the template reads site.seo.* instead of site.data.seo.*). Kept verbatim until the
// Jekyll template is fixed.
export function PageMeta({
  title,
  description,
  metaTitle,
  image,
}: {
  title: string
  description?: string
  metaTitle?: string
  image?: string
}) {
  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:title" content={metaTitle ?? title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      {image ? <meta property="og:image" content={image} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:creator" content="" />
    </>
  )
}
