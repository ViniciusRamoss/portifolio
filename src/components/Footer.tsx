import { useLanguage } from '../i18n/LanguageProvider'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <p>{t.footer.rights}</p>
    </footer>
  )
}
