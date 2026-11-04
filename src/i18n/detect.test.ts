import { describe, it, expect } from 'vitest'
import { detectLanguage } from './detect'

const empty = { getItem: () => null }

describe('detectLanguage', () => {
  it('uses pt for pt-BR navigator', () => {
    expect(detectLanguage(empty, 'pt-BR')).toBe('pt')
  })
  it('falls back to en for other languages', () => {
    expect(detectLanguage(empty, 'fr-FR')).toBe('en')
  })
  it('prefers stored value', () => {
    expect(detectLanguage({ getItem: () => 'en' }, 'pt-BR')).toBe('en')
  })
  it('ignores invalid stored value', () => {
    expect(detectLanguage({ getItem: () => 'xx' }, 'pt-BR')).toBe('pt')
  })
  it('survives a throwing storage', () => {
    const storage = {
      getItem: () => {
        throw new Error('blocked')
      },
    }
    expect(detectLanguage(storage, 'pt-BR')).toBe('pt')
    expect(detectLanguage(storage, 'fr-FR')).toBe('en')
  })
})
