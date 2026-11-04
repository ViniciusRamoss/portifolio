import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { detectLanguage } from './detect'
import { translations, type Lang, type Translations } from './translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLang(): Lang {
  let storage: Storage | undefined
  try {
    storage = window.localStorage
  } catch {
    storage = undefined
  }
  return detectLanguage(storage, navigator.language)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem('lang', l)
    } catch {
      // persistence is best-effort
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
