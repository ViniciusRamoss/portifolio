import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export function supportsRefraction(ua: string = navigator.userAgent): boolean {
  return /Chrome|Edg/.test(ua) && !/Firefox/.test(ua)
}

export function LiquidGlassDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="3" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="40" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

type LiquidGlassProps<T extends 'div' | 'button' | 'a'> = {
  as?: T
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'children'>

export function LiquidGlass<T extends 'div' | 'button' | 'a' = 'div'>({
  as,
  className,
  children,
  ...rest
}: LiquidGlassProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  const classes = ['glass', supportsRefraction() ? 'glass--refract' : '', className ?? '']
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
