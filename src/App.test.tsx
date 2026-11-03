import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { translations } from './i18n/translations'

const en = translations.en
const pt = translations.pt

function headingTexts(): string[] {
  return screen.getAllByRole('heading', { level: 1 }).concat(screen.getAllByRole('heading', { level: 2 })).map((h) => h.textContent ?? '')
}

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
  })

  it('has landmarks and the headline', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Python that solves real problems.' })).toBeInTheDocument()
  })

  it('renders contact links with correct hrefs and attributes', () => {
    render(<App />)
    const contact = document.getElementById('contact') as HTMLElement
    const links = within(contact).getAllByRole('link')
    expect(links).toHaveLength(4)
    const byHref = (h: string) => links.find((l) => l.getAttribute('href') === h)!
    const email = byHref('mailto:viniciussilvaramos1@gmail.com')
    const phone = byHref('tel:+5511961507151')
    const linkedin = byHref('https://www.linkedin.com/in/vinicius-silva-ramos-7a5139164/')
    const github = byHref('https://github.com/ViniciusRamoss')
    for (const l of [email, phone, linkedin, github]) expect(l).toBeDefined()
    for (const l of [linkedin, github]) {
      expect(l).toHaveAttribute('target', '_blank')
      expect(l).toHaveAttribute('rel', 'noopener noreferrer')
    }
    for (const l of [email, phone]) {
      expect(l).not.toHaveAttribute('target')
      expect(l).not.toHaveAttribute('rel')
    }
  })

  it('renders four grid cards plus the featured card', () => {
    render(<App />)
    const work = document.getElementById('work') as HTMLElement
    const cards = within(work).getAllByRole('article')
    expect(cards).toHaveLength(4)
    expect(screen.getByTestId('featured').tagName).toBe('ARTICLE')
    expect(work.contains(screen.getByTestId('featured'))).toBe(false)
    const tay = cards.find((c) => within(c).queryByText('taymodas'))!
    const demo = within(tay).getByRole('link', { name: /Live demo/ })
    expect(demo).toHaveAttribute('href', 'https://taymodas.onrender.com/')
    expect(demo).toHaveAttribute('target', '_blank')
    expect(demo).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the photo and survives an image error', () => {
    render(<App />)
    const img = screen.getByRole('img', { name: en.about.photoAlt })
    expect(img.getAttribute('src')).toMatch(/\/photo\.jpg$/)
    expect(img.getAttribute('alt')).toBeTruthy()
    fireEvent.error(img)
    expect(screen.getByAltText(en.about.photoAlt)).toBeInTheDocument()
    expect(screen.getByText(en.about.intro)).toBeVisible()
  })

  it('switches language to PT', async () => {
    render(<App />)
    const before = headingTexts()
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
    await userEvent.click(screen.getByRole('button', { name: 'PT' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(pt.hero.title)
    expect(screen.getByRole('link', { name: pt.nav.work })).toBeInTheDocument()
    const after = headingTexts()
    expect(after).toHaveLength(before.length)
    after.forEach((text, i) => expect(text).not.toBe(before[i]))
  })

  it('keeps a Contact nav link that stays visible on phones', () => {
    render(<App />)
    const link = within(screen.getByRole('navigation')).getByRole('link', { name: en.nav.contact })
    expect(link).toHaveAttribute('href', '#contact')
    expect(link.closest('li')).toHaveClass('nav-link--always')
  })

  it('uses a translated nav label and h1 > h2 > h3 heading order', async () => {
    render(<App />)
    expect(screen.getByRole('navigation', { name: en.nav.label })).toBeInTheDocument()
    const levels = screen.getAllByRole('heading').map((h) => Number(h.tagName[1]))
    const firstH3 = levels.indexOf(3)
    expect(levels.slice(0, firstH3)).toContain(2)
    await userEvent.click(screen.getByRole('button', { name: 'PT' }))
    expect(screen.getByRole('navigation', { name: pt.nav.label })).toBeInTheDocument()
  })

  it('renders no English-only stack tag in PT', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'PT' }))
    expect(within(screen.getByTestId('featured')).queryByText('AI agent')).toBeNull()
  })

  it('hides the arrow glyph from assistive tech', () => {
    render(<App />)
    const arrows = document.querySelectorAll('.project-links a [aria-hidden="true"]')
    expect(arrows.length).toBeGreaterThan(0)
  })
})
