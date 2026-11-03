import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from './LanguageProvider'
import { translations } from './translations'

function Probe() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <p data-testid="lang">{lang}</p>
      <h1>{t.hero.title}</h1>
      <button onClick={() => setLang('pt')}>to-pt</button>
    </div>
  )
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
    vi.restoreAllMocks()
  })

  it('switches language, updates document and persists', async () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByRole('heading').textContent).toBe(translations.en.hero.title)
    await userEvent.click(screen.getByText('to-pt'))
    expect(screen.getByRole('heading').textContent).toBe('Python que resolve problemas reais.')
    expect(document.documentElement.lang).toBe('pt')
    expect(document.title).toBe(translations.pt.meta.title)
    expect(localStorage.getItem('lang')).toBe('pt')
  })

  it('still switches when storage write throws', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    await userEvent.click(screen.getByText('to-pt'))
    expect(screen.getByRole('heading').textContent).toBe('Python que resolve problemas reais.')
  })
})
