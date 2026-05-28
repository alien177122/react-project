# System Patterns

## Архитектура

- **Thin UI** — бизнес-логика в `packages/shared` (hooks + pure utils)
- **Discriminated unions** для async/UI state (`status: 'idle' | 'loading' | 'ready' | 'error'`)
- **URL as state** — табы, модалки, theory chapter via `useURLState` + query params
- **Component size** — ≤150 lines; split into `*.parts.tsx` + dedicated hooks
- **App entry** — `App.tsx` delegates to `AppShell`; routing/state in shell layer

## Shared package highlights

- `useTrainingProgramV3`, `useCalculatorState`, `useAuthSession`
- `useJournal`, `useSplitConstructor` (newer hooks)
- `packages/shared/src/program/` — program v3 logic
- Limits: `journalLimits.ts`, `splitLimits.ts`, `passwordValidation.ts`
- API: `utils/api.ts`, `api/training-api.ts`

## Server

- `server/app.js` — Express routes
- `server/schema.js` — SQLite schema
- Security: rate limits, CORS for Vercel domains, normalized API errors

## Стили (web)

- CSS custom properties: `src/styles/base/variables.css`
- Modular CSS: `base/`, `layouts/`, `components/` (theory-apple.css for theory chapter)
- BEM-like classes; no styled-components
- Animations: `src/theme/animations.ts`; `useReducedMotion`, `useScrollReveal`

## Design standards workflow

**Индекс (точка входа):** `memory-bank/reference/README.md`

```
Новая UI-задача
  → README.md (матрица тип → эталон)
  → полный *-standard.md (или theory-design-reference.mdc)
  → style-guide.md + CLAUDE.md (общие tokens)
  → /build с наследованием паттерна
  → превью cursor-ide-browser
```

| Шаг                      | Обязательство                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| До `/build` новой секции | Прочитать matching reference; не начинать layout «с нуля»                                       |
| Implementation           | Hook + parts + co-located CSS; tokens/spacing/a11y из эталона                                   |
| Новый gold standard      | Новый `memory-bank/reference/<feature>-standard.md` + строка в README + sync `activeContext.md` |
| Исключение               | Точечный багфикс в эталонном файле — reference как контекст, без смены паттерна                 |

Правило Cursor (alwaysApply): `.cursor/rules/react-training-memory-bank.mdc` → **Design standards hook**.

## Reference implementations (канон UI)

| Компонент                | Документ                                                          | Назначение                                                                                                  |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Индекс эталонов**      | `memory-bank/reference/README.md`                                 | WHEN/HOW + матрица тип UI → reference                                                                       |
| **Calculator tab**       | `memory-bank/reference/calculator-tab-standard.md`                | Umbrella: picker, hero, Program 2.0/3.0 секции; partial standards внутри                                    |
| **Секция 02 Прогрессия** | `memory-bank/reference/calc-progression-result-standard.md`       | Composite после calculate: insight, ResultCard, plates?, chart, NoteBox                                     |
| Theory tab               | `.cursor/rules/theory-design-reference.mdc`, `useTheoryDesign.ts` | Визуальный язык `--ta-*`                                                                                    |
| **PeriodizationChart**   | `memory-bank/reference/periodization-chart-standard.md`           | **MAX** dual-axis SVG (Program 2.0): `.ta-period`, phase strip, listbox, keyboard, reduced motion           |
| **TestApproachSection**  | `memory-bank/reference/calc-test-approach-standard.md`            | Calculator input form (Program 2.0): `.calc-test-section`, stepper, CTA                                     |
| **ExercisePicker**       | `memory-bank/reference/calc-exercise-select-standard.md`          | Exercise dropdown (2.0 + 3.0): `.ew-*`, listbox, 1RM badge                                                  |
| **Saved exercises list** | `memory-bank/reference/calc-saved-exercises-standard.md`          | Sec 03: SectionBlock→`.ta-calc-saved-list`→card grid; 1RM `--ta-calc-accent`; delete 44px; `(N/M)` in title |

Новые чарты периодизации — наследовать паттерн `usePeriodization` + `PeriodizationChart`, не дублировать геометрию ad hoc. | Demo preset chart (`ProgressionPreviewChart`) — **горизонтальный sibling** etalon (`.ta-period`, ось кг), не дублировать геометрию ad hoc.

Новые формы калькулятора/тренировок — наследовать `TestApproachSection` + `calc-test-approach.css`, не legacy `.ta-calc-form` из `theory-apple.css`.

Новые exercise pickers — наследовать `ExercisePicker` + `calc-exercise-select-standard.md` (`.ew-*`), не native `<select>`.

Новые selectable lists (журнал, тренировка, файлы) — наследовать `.ta-calc-saved-card` pattern из `calc-saved-exercises-standard.md`: dark row, meta 12px, hero metric accent, delete 44px.

**Calculator tab (любой блок):** сначала `calculator-tab-standard.md` (Оптимальная ↔ Program 2.0, На силу ↔ Program 3.0), затем matching partial standard для конкретной секции.

**Секция 02 Program 2.0:** `calc-progression-result-standard.md` (полный блок); геометрия SVG — `periodization-chart-standard.md`.

**Журнал — график прогрессии:** только из `userData.journal` (фактические подходы). **Не** связывать с `getPrescription`, presets или таблицей `CalculatorTabV3`. Визуал — `journal-progress-chart-standard.md` (язык `.ta-period`, ось = сессии по дате, без фаз программы).

## Mobile patterns (`apps/mobile/`)

- Feature folders: `screens/`, `components/`, `hooks/`, `theme/`, `types/`
- Styles co-located: `*.styles.ts`
- Logic hooks: e.g. `useReadinessScreen`, `useReadinessCardLogic`
- Theme tokens mirror web (`Theme.ts`, navigation theme in `_layout.tsx`)

## Memory Bank integration

- Complexity L1–L4 drives workflow depth (see `.cursor/rules/isolation_rules/`)
- **Always** read `memory-bank/` before **any** agent task (not only `/van`…`/archive` phases)
- Update `tasks.md` + `progress.md` in build/reflect/archive
- Project-specific rule: `.cursor/rules/react-training-memory-bank.mdc` (alwaysApply)
- `cursor-memory-bank-main/` — upstream reference only; canonical files live in `memory-bank/` and `.cursor/`

## Browser preview (agent workflow)

- **Embedded Cursor browser only** — MCP server `cursor-ide-browser`
- Typical flow: `browser_tabs` (list) → `browser_navigate` (URL) → `browser_lock` → interact → `browser_unlock`
- Default dev preview URL: `http://localhost:5173` (`npm run dev`)
- **Forbidden for UI preview:** shell `open`, `xdg-open`, `start` with http/localhost URLs
- Optional enforcement: `.cursor/hooks/browser-preview-guard.mjs` (see `.cursor/hooks.json.example`)

## Security

- JWT server-side; no token/password logging
- SQLite access only through server layer
- Client password rules mirrored in shared utils
