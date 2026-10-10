import { Arrow } from '@/components/Icon'
import { type ProjectEntry, url } from '@/lib/content'

export function ProjectPreview({ project, compact = false, heading = project.title }: {
  project: ProjectEntry; compact?: boolean; heading?: string
}) {
  return <section className={`site-project${compact ? ' site-project-compact' : ''}`} aria-labelledby={`project-${project.slug}`}>
    <div className="site-project-heading">
      <p className="lab-kicker">{project.label}</p>
      <h2 id={`project-${project.slug}`}>{heading}</h2>
    </div>
    <img className="site-project-image" src={url(project.image)} alt={project.image_alt} width={project.image_width} height={project.image_height} loading="lazy" />
    <div className="site-project-body">
      <p className="site-project-description">{project.description}</p>
      {!compact && <ul className="site-project-features">{project.features.map((feature) => <li key={feature.title}>
        <h3>{feature.title}</h3><p>{feature.description}</p>
      </li>)}</ul>}
      <div className="site-project-actions">
        <a className="lab-button" href={project.live_url} target="_blank" rel="noopener noreferrer">{project.action_label}<Arrow /></a>
        {compact
          ? <a className="lab-text-link" href={url('/projects/')}>See our projects <Arrow /></a>
          : <a className="lab-text-link" href={project.source_url} target="_blank" rel="noopener noreferrer">View source <Arrow /></a>}
      </div>
    </div>
  </section>
}
