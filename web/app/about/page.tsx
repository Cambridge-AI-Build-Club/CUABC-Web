import { ArticlePage } from '@/components/ArticlePage'
import { loadPage } from '@/lib/content'

export default function AboutPage() {
  const page = loadPage('about.md')
  return <ArticlePage title="Curious minds. Real possibilities." path="/about/" eyebrow="ABOUT / CAMBRIDGE AI BUILDER CLUB" body={page.body} />
}
