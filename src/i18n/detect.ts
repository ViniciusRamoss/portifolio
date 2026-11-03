import type { Lang } from './translations'

export function detectLanguage(
  storage?: Pick<Storage, 'getItem'>,
  navLang?: string,
): Lang {
  try {
    const stored = storage?.getItem('lang')
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    // storage unavailable: fall through to navigator language
  }
  return navLang?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}
