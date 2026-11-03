import { useLanguage } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/translations'
import { LiquidGlass } from './LiquidGlass'

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: 'pt', label: 'PT' },
  { lang: 'en', label: 'EN' },
]

export function LangToggle() {
  const { lang, setLang, t } = useLanguage()
  return (
    <LiquidGlass className="lang-toggle" role="group" aria-label={t.toggle.label} data-active={lang}>
      <span className="lang-toggle__knob" aria-hidden="true" />
      {OPTIONS.map((o) => (
        <button
          key={o.lang}
          type="button"
          className={`lang-toggle__btn${lang === o.lang ? ' is-active' : ''}`}
          aria-pressed={lang === o.lang}
          onClick={() => setLang(o.lang)}
        >
          {o.label}
        </button>
      ))}
    </LiquidGlass>
  )
}
