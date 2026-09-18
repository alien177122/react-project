# План: Theory visual gold = весь блок «Объём за сессию»

**Дата:** 2026-08-26  
**Статус:** лекции 01/02 и `.ta-frac` — **LOCKED**; канон/промпт обновлены. Не переписывать 01/02.

## Цель

Зафиксировать эталоны, которые пользователь утвердил: виджет `.ta-frac`; лекция главы 02; лекция главы 01 (intro + 1.1–1.4) как есть. Шапка панели — title+lede слева, пилюля справа. Остальные главы наследуют этот язык только если ещё расходятся; **не** «улучшать» 01/02.

## Критерий готовности

1. `memory-bank/reference/theory-frac-volume-standard.md` есть и проиндексирован.
2. Shared lecture CSS совпадает с frac: left align, tokens, без 42em-колонки.
3. Глава 01 `.ta-frac` визуально не сломана.
4. Уникальные виджеты 02–10 на том же языке.
5. Три reading-статьи на том же языке.
6. Мета-копирайт в 10.1 / 03 / 06 / 09 переписан на факты.
7. Browser: desktop + 390px на gold (basics) и минимум ещё одна глава.
8. `npm run typecheck` + `npm test` по затронутым файлам.

## Порядок

1. **Сразу:** шапка `.ta-chapter-panel__title-wrap` — слева, пилюля справа (запрос пользователя 2026-08-26).
2. Shared lecture CSS → frac language (не трогать `.ta-frac` кроме багов).
3. Эталон + индекс канона.
4. Копирайт theory.ts — только мета в 03/06/09/10; **не** BASICS/MTOR lecture copy.
5. Уникальные виджеты 03–10 + reading, если расходятся. **01/02 lecture locked.**
6. Verify + typecheck/tests.

## Lock (2026-08-26, user)

- [x] Глава 01 `ta-chapter-stack` (Глава 01 / Базовые понятия / TOC 1–4 / 1.1–1.4) — approved, не трогать
- [x] Глава 02 mTOR lecture body — approved, не трогать
- [x] `.ta-frac` / `FractionalVolumeSection` — visual gold, не редизайнить
- [x] Промпт в `.cursor/skills/theory-content-structurer/SKILL.md`
- [x] Канон `theory-frac-volume-standard.md` + `theory-lecture-page-standard.md`
