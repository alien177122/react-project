# Baseline — web build optimization

## Environment

- Branch: `refactor/bundle-optimization`
- Vite: 7.3.2
- Node: local (26.x)

## Metrics — before (этап 0)

| Metric         | Value                |
| -------------- | -------------------- |
| JS entry gzip  | 413.91 kB            |
| CSS entry gzip | 55.58 kB             |
| `dist/`        | 25 MB                |
| Tests          | 231                  |
| Lint           | fixed from 23 errors |

## Metrics — after (этапы 1–5 + quiet UI + Tailwind removal)

| Metric                   | Value                                                  | Target       | Status                                        |
| ------------------------ | ------------------------------------------------------ | ------------ | --------------------------------------------- |
| JS entry gzip            | **89.76 kB**                                           | ≤300 kB      | PASS                                          |
| CSS entry gzip           | **36.90 kB**                                           | ≤40–45 kB    | PASS                                          |
| Lazy Theory JS gzip      | 127 kB (includes framer-motion)                        | —            | OK                                            |
| Eruda                    | separate chunk; off unless `?eruda=1` / `VITE_ERUDA=1` | prod off     | PASS                                          |
| `framer-motion` in index | **absent**                                             | out of entry | PASS                                          |
| `dist/assets`            | 1.7 MB                                                 | —            | OK                                            |
| `dist/` total            | **11 MB**                                              | ≤3–5 MB      | PARTIAL — 9.2 MB = `imagePhone/` PNG triptych |
| `node_modules/`          | 381 MB (was ~1.1 GB)                                   | —            | improved                                      |
| Tests                    | **247/247**                                            | —            | PASS                                          |
| Lint                     | 0 errors                                               | —            | PASS                                          |
| `quality:quick`          | GATE PASS                                              | —            | PASS                                          |
| Playwright smoke         | **4/4**                                                | —            | PASS                                          |

## Completed waves

1. Baseline + ios/lint contracts
2. Asset cleanup (backgrounds, favicon, dead UI files)
3. Lazy tabs + TrainingTabContainer + preloadError
4. CSS feature chunks; Tailwind pipeline removed; `theory-apple` kept eager (shared `.ta-shell`)
5. Web-only root (no Ionic/Capacitor/Electron); `@training/shared` imports; Eruda opt-in
6. framer-motion trimmed from eager shell; AuthScreen lazy

## Remaining (next narrow plan)

- Compress/convert `public/imagePhone/*.png` → WebP/AVIF to hit `dist` ≤5 MB
- Optional: extract calculator-only slice from `theory-apple.css` to shrink eager CSS further
- `CalculatorTabV3.tsx` still unreachable — reconnect or archive deliberately

## Smoke checklist

- [x] App loads / auth or calculator shell
- [x] Lazy `?tab=theory|split|journal|training`
- [x] typecheck / test / lint / quality:quick / build
- [x] Browser calculator preview (390px)
