import { useLanguage } from '../i18n/LanguageProvider'

export function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="container section about" aria-labelledby="about-title">
      <div className="about__photo">
        <img src="/photo.jpg" alt={t.about.photoAlt} width={320} height={400} />
      </div>
      <div className="about__text">
        <h2 id="about-title" className="section-title">{t.about.title}</h2>
        <p className="about__intro">{t.about.intro}</p>
        <p className="about__p">{t.about.experience}</p>
        <p className="about__p">{t.about.focus}</p>
        <ul className="chips">
          {t.about.chips.map((c) => (
            <li key={c.title} className="chip">
              <span className="chip__title">{c.title}</span>
              <span className="chip__sub">{c.subtitle}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
