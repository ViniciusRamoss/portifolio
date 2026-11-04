import { useLanguage } from '../i18n/LanguageProvider'

export function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <p className="eyebrow">{t.hero.eyebrow}</p>
      <h1 id="hero-title" className="hero__title">{t.hero.title}</h1>
      <p className="hero__subtitle">{t.hero.subtitle}</p>
      <div className="hero__ctas">
        <a className="btn btn--primary" href="#work">{t.hero.ctaWork}</a>
        <a className="btn btn--ghost" href="#contact">{t.hero.ctaContact}</a>
      </div>
    </section>
  )
}
