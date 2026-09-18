# Creative / Phase-plan: Store roadmap (без Telegram)

**Slug:** `react-training-journal-split`  
**Path:** `~/Desktop/01_React_Продукт/React_Project_Журнал_Сплит/`  
**Updated:** 2026-07-27  
**Scope note:** Telegram **отложен** (не в активном roadmap). Вернуть как отдельную фазу после Phase 2 / по запросу.

## Стратегия

| Контур                  | Роль                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| **Vite** `src/` `:5173` | Единственный продуктовый web                                          |
| **Expo** `apps/mobile`  | Основной iOS/Android → EAS → TestFlight → App Store                   |
| **Capacitor**           | Запасной/временный MVP, не финал                                      |
| **Expo web**            | Не продуктовый контур                                                 |
| **Оплаты**              | Web: Stripe/Kaspi · iOS: Apple IAP (RevenueCat) · Server: entitlement |
| **Telegram**            | **OUT OF SCOPE сейчас**                                               |

```text
Phase 0  local-dev
Phase 1  core-api + entitlements
Phase 2  mobile UX (Expo)
Phase 3  web-billing (was 4; Telegram skipped)
Phase 4  TestFlight / EAS (was 5)
Phase 5  App Store + IAP (was 6)
Phase 6  CI (was 7)
```

## Жёсткие запреты

1. Expo web ≠ продуктовый web
2. Kaspi/Stripe unlock Pro внутри iOS UI (Guideline 3.1.3(b))
3. Capacitor как финальный Store без нативных фич
4. IAP до полезного журнала
5. `localhost` в release / physical device config
6. Prod billing на ephemeral SQLite

## Phase 0 — local-dev

**Done when:** Vite в Cursor browser; Expo iOS simulator/Expo Go без чёрного экрана; API доступен с симулятора; один React для Metro.

| Действие         | Файлы                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Vite stable      | `package.json` `npm run dev` → `:5173`                                              |
| Expo native only | `apps/mobile` `start` / `ios` — не чинить web                                       |
| React pin        | Expo SDK 54 / mobile React 19.1; Metro `metro.config.js` resolve; root не выше Expo |
| API + device     | `server/`, CORS, `EXPO_PUBLIC_API_URL` = LAN/Tailscale/ngrok                        |
| Shared hygiene   | no `window`/`document` without adapter; ESLint ban DOM in shared                    |

**Не делать:** eas.json, IAP, Telegram, Postgres, Cap store submit.

## Phase 1 — core-api + entitlements

- Auth JWT: `server/app.js` (есть)
- Entitlement: `plan`, `source`, `expires_at`, `status` в schema/DB
- Dev SQLite OK; **gate before billing:** Postgres/Turso for prod
- Shared ESLint `no-restricted-globals`

## Phase 2 — mobile UX

- Expo Router screens: journal, workout, calculator, profile, paywall stub
- Offline: MMKV / Zustand persist + TanStack Query
- `ios.bundleIdentifier` = `com.stevegordiyenko.trainingcalculator`
- Paywall: **only** IAP placeholders — no Stripe/Kaspi links

## Phase 3 — web billing

- Stripe Checkout (+ Kaspi optional) → webhooks → entitlement
- Billing UI only in Vite
- Postgres prod required before webhooks

## Phase 4 — TestFlight (EAS)

- Create `apps/mobile/eas.json`
- `eas build --platform ios`, internal/external TestFlight, Sentry
- EAS = build + submit; Fastlane = screenshots/metadata only

## Phase 5 — App Store + IAP

- RevenueCat → server entitlement
- Restore, privacy labels, listing, demo account, `eas submit`
- Plan B reject: HealthKit/haptics/widgets
- Plan B Apple delay: ship Phase 3 web first

## Phase 6 — CI

- GitHub Actions + EAS Build/Update; Fastlane snapshot; version bump

## Shared DOM audit (Phase 0)

`packages/shared/src/hooks/useAuthSession.ts` uses `localStorage` behind `typeof localStorage !== 'undefined'` (offline cache). Comments in `calcValidators.ts` mention localStorage as a data source, not DOM calls.

**Phase 1:** extract storage adapter (DI) + ESLint `no-restricted-globals` for `window`/`document`/`localStorage` in `packages/shared`.

## Deferred: Telegram

Привязка `chat_id`, daily card, Universal Links, grammY — **после** явного запроса; не блокирует Store.
