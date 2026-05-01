import { PLATE_COLORS, theme, WEB_TOKEN_PARITY } from '../src/theme/tokens'

const parityKeys = Object.keys(WEB_TOKEN_PARITY) as Array<keyof typeof WEB_TOKEN_PARITY>

describe('Token parity with web design system', () => {
  it.each(parityKeys)('%s should match web token value', (key) => {
    expect(theme.colors[key]).toBe(WEB_TOKEN_PARITY[key])
  })
})

describe('IPF plate palette', () => {
  it('exposes the 7 standard plate weights from DEFAULT_PLATES', () => {
    // mirrors DEFAULT_PLATES from @training/shared/utils/plates: 25, 20, 15, 10, 5, 2.5, 1.25
    expect(Object.keys(PLATE_COLORS).sort()).toEqual(
      ['1_25', '10', '15', '2_5', '20', '25', '5'].sort(),
    )
  })

  it('is reachable through theme.plates', () => {
    expect(theme.plates).toBe(PLATE_COLORS)
  })
})
