declare module 'legendary-cursor' {
  interface LegendaryCursorOptions {
    lineSize?: number
    opacityDecrement?: number
    speedExpFactor?: number
    lineExpFactor?: number
    sparklesCount?: number
    maxOpacity?: number
    texture1?: string
    texture2?: string
    texture3?: string
  }

  interface LegendaryCursor {
    init(options?: LegendaryCursorOptions): void
  }

  const LegendaryCursor: LegendaryCursor
  export default LegendaryCursor
}

