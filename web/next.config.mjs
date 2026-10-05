import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const webDir = dirname(fileURLToPath(import.meta.url))

// The org site (repository Cambridge-AI-Build-Club.github.io) serves at the root
// domain, so the base path is empty. CI passes NEXT_PUBLIC_BASE_PATH from
// actions/configure-pages, which reports a /repo-name prefix for project pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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
