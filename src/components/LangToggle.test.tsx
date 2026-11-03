import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../i18n/LanguageProvider'
import { translations } from '../i18n/translations'
import { LangToggle } from './LangToggle'
import { supportsRefraction } from './LiquidGlass'

function setup() {
  return render(
    <LanguageProvider>
      <LangToggle />
    </LanguageProvider>,
  )
}

describe('LangToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
  })

  it('marks the active language with aria-pressed', () => {
    setup()
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'PT' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'EN' })).toHaveClass('is-active')
  })

  it('switches on click and renames the group', async () => {
    setup()
    expect(screen.getByRole('group', { name: translations.en.toggle.label })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'PT' }))
    expect(screen.getByRole('button', { name: 'PT' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('group', { name: translations.pt.toggle.label })).toBeInTheDocument()
  })

  it('switches with keyboard Tab then Enter', async () => {
    setup()
    await userEvent.tab()
    expect(screen.getByRole('button', { name: 'PT' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'PT' })).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('supportsRefraction', () => {
  it('accepts Chromium and rejects Firefox/Safari', () => {
    expect(supportsRefraction('Mozilla/5.0 Chrome/120 Safari/537')).toBe(true)
    expect(supportsRefraction('Mozilla/5.0 Chrome/120 Edg/120')).toBe(true)
    expect(supportsRefraction('Mozilla/5.0 Firefox/120')).toBe(false)
    expect(supportsRefraction('Mozilla/5.0 Version/17 Safari/605')).toBe(false)
  })
})
