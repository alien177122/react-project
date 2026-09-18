# Цель

Следующий агент в новом чате **не начинает** перепись глав 01–10. Ориентир: очередь лекций закрыта; человек правит снимок текста; агент вносит правки обратно по одной главе или статье.

**Готово, когда:** handoff лежит в `memory-bank/plans/`, `activeContext.md` и agentmemory; playbook знает три статьи хаба; снимок `audit/theory-site-copy-2026-08-25.*` — база для правок человека (на 2026-08-25 21:59 ещё без его правок).

## Канон

- Playbook: `memory-bank/reference/theory-lecture-page-standard.md`
- UI: `src/components/theory/chapterContent.tsx`
- Данные: `packages/shared/src/data/theory.ts`
- Gold: 02 mTOR. macos / Expo mobile не переписывать в том же проходе.
- Slug: `react-training-journal-split`. `scripts/venus-inbox-pull.mjs` в репо нет.

## Закрытая очередь

| Единица | Данные                                         | Интерактив                                                  |
| ------- | ---------------------------------------------- | ----------------------------------------------------------- |
| 02, 01  | `MTOR_LESSON_GROUPS`, `BASICS_LESSON_GROUPS`   | день / fractional                                           |
| 03, 04  | `TIER_LESSON_GROUPS`, `TOP3_LESSON_GROUPS`     | пирамида / подиум                                           |
| 05, 06  | `SPECS_LESSON_GROUPS`, `TENDONS_LESSON_GROUPS` | таблицы / протокол                                          |
| 08      | `MECHANICS_LESSON_GROUPS`                      | 9 карт timeline                                             |
| 09      | `STRENGTH_LESSON_GROUPS`                       | `StrengthFormulaSection` (`strength-formula.ts` без правок) |
| 10      | `PROGRESSION_LESSON_GROUPS`                    | пирамида + 3 ленты                                          |
| 07      | `src/data/theory-cardio.ts`                    | только карты, без 7.1–7.4                                   |
| Статьи  | diabetes-habits, late-dinner, anabolic-vessels | хаб, не сетка 10                                            |

Метафоры не смешивать: 02 стройка · 01 метр · 03 фильтр · 04 слоты · 05 две шкалы · 06 окно · 08 рычаги · 09 порядок факторов · 10 этажи.

## Снимок и Venus

- Правки человека: `audit/theory-site-copy-2026-08-25.html` / `.md` (копии `D:\Mac\OUTBOX\`). Пересборка: `node --experimental-strip-types scripts/export-theory-site-copy.ts`.
- Venus: `C:\Users\user\Desktop\React_Project`. Инструкция: `C:\MacVenus_Bridge\02-ДЛЯ-VENUS-CURSOR.md`.

После правок в снимке: одна глава или одна статья → `theory.ts` / шапки `chapterContent.tsx` → `npm run typecheck` + `tests/*-lesson.test.ts` → 390–430.

## Не делать

Не начинать 01–10 заново. Не выдумывать проценты. Коммиты только по просьбе. `tests/ios-adaptation.test.ts` (`--space-1` vs `--space-2`) — не Theory.
