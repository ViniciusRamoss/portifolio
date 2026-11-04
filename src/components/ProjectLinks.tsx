import type { Project, ProjectLinkKind } from '../data/projects'
import { useLanguage } from '../i18n/LanguageProvider'

export function ProjectLinks({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { t } = useLanguage()
  const labels: Record<ProjectLinkKind, string> = {
    github: featured ? t.featured.github : t.projects.github,
    agent: t.featured.agentRepo,
    demo: t.projects.liveDemo,
  }
  return (
    <div className="project-links">
      {project.links.map((l) => (
        <a key={l.kind} href={l.href} target="_blank" rel="noopener noreferrer">
          {labels[l.kind]} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  )
}
