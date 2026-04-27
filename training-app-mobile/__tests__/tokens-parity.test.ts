import { theme, WEB_TOKEN_PARITY } from '../src/theme/tokens'

const parityKeys = Object.keys(WEB_TOKEN_PARITY) as Array<keyof typeof WEB_TOKEN_PARITY>

describe('Token parity with web design system', () => {
  it.each(parityKeys)('%s should match web token value', (key) => {
    expect(theme.colors[key]).toBe(WEB_TOKEN_PARITY[key])
  })
})
