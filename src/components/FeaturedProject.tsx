import { featuredProject } from '../data/projects'
import { useLanguage } from '../i18n/LanguageProvider'
import { ProjectLinks } from './ProjectLinks'
import { Tag } from './Tag'

export function FeaturedProject() {
  const { t } = useLanguage()
  return (
    <div className="container featured-wrap">
      <article className="featured" data-testid="featured" aria-labelledby="featured-name">
        <div className="featured__preview" aria-hidden="true">
          <span className="featured__preview-name">{featuredProject.name}</span>
        </div>
        <div className="featured__body">
          <p className="eyebrow">{t.featured.label}</p>
          <h3 id="featured-name" className="featured__name">{featuredProject.name}</h3>
          <p className="featured__desc">{t.featured.description}</p>
          <ul className="tags">
            {featuredProject.stack.map((s) => <Tag key={s}>{s}</Tag>)}
          </ul>
          <ProjectLinks project={featuredProject} featured />
        </div>
      </article>
    </div>
  )
}
