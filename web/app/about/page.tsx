import { ArticlePage } from '@/components/ArticlePage'
import { ProjectPreview } from '@/components/ProjectPreview'
import { loadPage, loadProjects } from '@/lib/content'

export default function AboutPage() {
  const page = loadPage('about.md')
  const project = loadProjects().find((entry) => entry.slug === 'cbc-world')
  return <ArticlePage title="Curious minds. Real possibilities." description={String(page.description)} path="/about/" eyebrow="ABOUT / CAMBRIDGE AI BUILDER CLUB" body={page.body}>
    {project && <ProjectPreview project={project} compact heading={String(page.project_heading)} />}
  </ArticlePage>
}
