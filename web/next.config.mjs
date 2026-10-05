import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const webDir = dirname(fileURLToPath(import.meta.url))

// GitHub Pages serves this repo as a project page under /CUABC-Web.
// When the site moves to a root domain, set NEXT_PUBLIC_BASE_PATH='' and everything
// (links, assets, canonical URLs) drops the prefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/CUABC-Web'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  sassOptions: {
    // Resolve the Jekyll theme's partials in place: the vendored Bootstrap copy and
    // the custom components under _sass/ stay the single source of styling truth.
    includePaths: [join(webDir, 'styles'), join(webDir, '..', '_sass')],
    silenceDeprecations: ['import', 'color-functions', 'global-builtin', 'mixed-decls'],
  },
}

export default nextConfig
