# Product Context

## Пользователь

Силовой атлет / тренер: периодизация, объём, прогрессия, журнал сессий, конструктор сплита.

## Основные модули (web — `src/`)

| Модуль          | Описание                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Калькулятор** | Расчёт нагрузок, stepper inputs, result card, plate diagram, PeriodizationChart, program v3 |
| **Тренировка**  | Активный день, пирамиды, отдых, прогрессия; `TrainingStateRouter` (discriminated union)     |
| **Журнал**      | Сессии, метрики, графики (`useJournal`, journal limits)                                     |
| **Сплит**       | Конструктор дней/мышц (`useSplitConstructor`, split limits)                                 |
| **Теория**      | Главы (strength formula redesign), SEO/OG, URL state                                        |
| **Auth**        | Регистрация/вход, password validation (shared + server)                                     |

## Mobile (`apps/mobile/`)

- **Readiness screen** (WIP, untracked): сон, нагрузка, мобилити, coach note, week selector
- Expo Router, dark theme aligned с web tokens
- Mock data в `src/mocks/readiness.ts` до подключения API

## Desktop & deploy

- **Electron**: переиспользует web UI + local SQLite/workspace
- **PWA**: manifest, iOS meta; без service worker в текущей итерации
- **Vercel**: static `dist/`; `VITE_API_URL` обязателен at build time
- **Public tunnel**: Cloudflare (`npm run public*`) для временного доступ 'local stack

## Язык

UI — преимущественно русский; код и идентификаторы — English.

## Нефункциональные требования

- WCAG AA, `prefers-reduced-motion`, keyboard navigation
- Ошибки: что случилось + что делать (inline, не modal-block)
- Loading: skeleton matching content structure, не blank screen
