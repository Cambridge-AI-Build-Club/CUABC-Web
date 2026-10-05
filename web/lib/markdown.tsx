// Markdown rendering approximating Jekyll's kramdown: GitHub-style parsing plus
// heading ids (kramdown auto-generates them, e.g. <h1 id="cambridge-ai-builder-club">).
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'

export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown rehypePlugins={[rehypeSlug]}>{children}</ReactMarkdown>
}
