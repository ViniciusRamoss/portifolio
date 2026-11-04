import { projects } from '../data/projects'
import { useLanguage } from '../i18n/LanguageProvider'
import type { Translations } from '../i18n/translations'
import { ProjectLinks } from './ProjectLinks'
import { Tag } from './Tag'

export function ProjectGrid() {
  const { t } = useLanguage()
  return (
    <section id="work" className="container section" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title section-title--sm">{t.projects.label}</h2>
      <div className="grid">
        {projects.map((p) => (
          <article key={p.id} className="card">
            <h3 className="card__name">{p.name}</h3>
            <p className="card__desc">{t.projects.items[p.id as keyof Translations['projects']['items']]}</p>
            <ul className="tags">
              {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
            </ul>
            <ProjectLinks project={p} />
          </article>
        ))}
      </div>
    </section>
  )
}
