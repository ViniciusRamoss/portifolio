import { describe, expect, it } from 'vitest'
import { contacts } from './contacts'
import { featuredProject, projects } from './projects'
import { translations } from '../i18n/translations'

function resolve(obj: unknown, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>(
      (acc, part) => (acc as Record<string, unknown> | undefined)?.[part],
      obj,
    )
}

function validHref(href: string): boolean {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return true
  try {
    return new URL(href).protocol === 'https:'
  } catch {
    return false
  }
}

describe('data', () => {
  it('lists the four projects in order', () => {
    expect(projects.map((p) => p.id)).toEqual([
      'taymodas',
      'jobmatch',
      'fraud-detection',
      'sales-data-consolidation',
    ])
  })

  it('has valid hrefs everywhere', () => {
    const hrefs = [
      ...Object.values(contacts).map((c) => c.href),
      ...[featuredProject, ...projects].flatMap((p) => p.links.map((l) => l.href)),
    ]
    for (const href of hrefs) expect(validHref(href), href).toBe(true)
  })

  it('has the phone tel link', () => {
    expect(contacts.phone.href).toBe('tel:+5511961507151')
  })

  it('has translated descriptions for every project', () => {
    for (const p of [featuredProject, ...projects]) {
      for (const lang of ['en', 'pt'] as const) {
        const value = resolve(translations[lang], p.descriptionKey)
        expect(typeof value, `${lang}:${p.descriptionKey}`).toBe('string')
        expect((value as string).length).toBeGreaterThan(0)
      }
    }
  })
})
