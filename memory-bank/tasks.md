# Tasks

> Источник правды для активной задачи. Очищается после `/archive`; история — в `memory-bank/archive/`.

## Текущая задача

**Адаптация дизайна: Журнал + Сплит** — завершена в `/build`.

- **Complexity:** L3
- **Phase:** build complete — готово к `/reflect`

## Чеклист

- [x] Shared `tab-shell.css` (`.app-tab-shell`, `.app-tab-section`, `.app-tab-header`)
- [x] Journal: миграция на shared shell, cleanup legacy CSS (~870 → ~350 строк)
- [x] Journal: `useJournal` edit/delete + `JournalSessionList` с inline confirm
- [x] Journal: quiet chart empty state, orphan components удалены
- [x] Split: header + hint, секции (toolbar, muscles, legs, preview)
- [x] Split: `split-chip` base, toolbar responsive text, `TrainingDayCard variant="split-preview"`
- [x] Split: `FixedWeightsEditor` с human-readable names
- [x] TabPanel: `useReducedMotion()` для framer-motion
- [x] typecheck ✅, tests 108/108 ✅, browser preview journal + split ✅

## Theory design system (завершено)

- [x] Анализ эталона Theory tab (`theory-apple.css`, TheoryTab, TheoryChapterHub)
- [x] `src/hooks/useTheoryDesign.ts` — `TA_CSS_VARS`, `accentVars`, `taAccentStyle`, `useTheoryDesign`
- [x] `.cursor/rules/theory-design-reference.mdc` — rule для агентов (globs: `src/**/*.{tsx,ts,css}`)
- [x] Memory Bank: `activeContext.md` Design canon, `style-guide.md` ссылка
- [x] Эталон Theory **не изменён**; только новые артефакты

## Status

- **Next command:** `/reflect` (Journal+Split) или `/archive` после reflect Theory DS
