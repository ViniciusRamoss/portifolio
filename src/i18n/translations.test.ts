import { describe, it, expect } from 'vitest'
import { translations } from './translations'

function flatten(value: unknown, prefix = ''): Record<string, unknown> {
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).reduce<Record<string, unknown>>(
      (acc, [k, v]) => ({ ...acc, ...flatten(v, prefix ? `${prefix}.${k}` : k) }),
      {},
    )
  }
  return { [prefix]: value }
}

describe('translations', () => {
  const pt = flatten(translations.pt)
  const en = flatten(translations.en)

  it('has identical keys in both languages', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort())
  })
  it('has no empty or non-string values', () => {
    for (const v of [...Object.values(pt), ...Object.values(en)]) {
      expect(typeof v).toBe('string')
      expect((v as string).trim()).not.toBe('')
    }
  })
  it('has four about chips', () => {
    expect(translations.en.about.chips).toHaveLength(4)
    expect(translations.pt.about.chips).toHaveLength(4)
  })
})
