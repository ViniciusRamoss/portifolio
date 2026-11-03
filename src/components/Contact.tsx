import { contacts } from '../data/contacts'
import { useLanguage } from '../i18n/LanguageProvider'
import { LiquidGlass } from './LiquidGlass'

const KEYS = ['email', 'phone', 'linkedin', 'github'] as const

export function Contact() {
  const { t } = useLanguage()
  return (
    <section id="contact" className="container section" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title section-title--xl">{t.contact.title}</h2>
      <div className="contact-row">
        {KEYS.map((k) => {
          const c = contacts[k]
          const external = c.href.startsWith('https://')
          return (
            <LiquidGlass
              key={k}
              as="a"
              className="contact-card"
              href={c.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact-card__label">{t.contact[k]}</span>
              <span className="contact-card__value">{c.display}</span>
            </LiquidGlass>
          )
        })}
      </div>
    </section>
  )
}
