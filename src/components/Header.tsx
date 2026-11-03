import { useLanguage } from '../i18n/LanguageProvider'
import { LangToggle } from './LangToggle'

export function Header() {
  const { t } = useLanguage()
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a className="logo" href="#top" aria-label="Vinicius Silva Ramos">
          VR
        </a>
        <div className="site-header__right">
          <nav aria-label={t.nav.label}>
            <ul className="nav">
              <li><a href="#work">{t.nav.work}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li className="nav-link--always"><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </nav>
          <LangToggle />
        </div>
      </div>
    </header>
  )
}
