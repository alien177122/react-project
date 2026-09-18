# План: этап 3 — CSS split по вкладкам

## Цель

Уменьшить initial CSS bundle, вынеся стили ленивых вкладок (Theory, Journal, Split, Training) из `main.css` в отдельные чанки, подгружаемые вместе с `React.lazy` компонентами. Критерий готовности: `index-*.css` gzip ≤ 45 KB (сейчас ~56 KB), gates зелёные, вкладки без FOUC-регрессий.

## Пункты

1. Создать `src/styles/tabs/{theory,journal,split,training}-tab.css` с `@import` tab-specific стилей.
2. Убрать эти импорты из `src/styles/main.css`.
3. Подключить tab CSS в lazy entry: `TheoryTab`, `JournalTab`, `SplitConstructorTab`, `TrainingTabContainer`.
4. `npm run typecheck && npm test && npm run lint && npm run build` — сравнить с `BASELINE.md`.
5. Browser: calculator (initial), переключение на theory/journal/split/training на 390px.

## Не трогаем

- Base tokens, app shell, auth, calculator, billing, shared UI — остаются в `main.css`.
- Tailwind pipeline — этап позже.
- Ionic CSS — этап 4.
