# Change Log

> Short append-only log for significant project changes. Update this file after each meaningful edit so the project memory has a rollback trail.

## 2026-06-30

- **Доработка карточки 1ПМ, калькулятора и сплита:**
  - Улучшили визуальный вид карточки 1ПМ для упражнений с собственным весом (брусья, подтягивания), выделив полный 1ПМ крупным шрифтом, а детали `(вес тела + доп. вес)` вынеся на вторую строку с выравниванием по базовой линии.
  - Исправили сброс значений полей ввода в калькуляторе при сохранении подхода/добавлении упражнения.
  - Перевели метод сохранения 1ПМ `setExerciseOneRM` на запись фактических результатов (`testWeight` и `testReps`), вводимых пользователем, сделав их опциональными параметрами для безопасного наката изменений.
  - Удалили валидационное ограничение «Назначьте все 6 групп мышц» и доработали превью недели в `buildDayPreview` для корректного отображения любых сплитов.

- **Защита архитектуры и фиксация состояния перед рефакторингом (Этап 1):**
  - Добавили правила о Едином источнике правды (Single Source of Truth) и запрете внешних компрессоров памяти в `AGENTS.md` и `memory-bank/techContext.md`.
  - Зафиксировали текущего активного агента в качестве основного источника правды для структуры Memory Bank.
  - Провели замеры/срез состояния проекта с помощью `react-doctor` в корне проекта (`48/100`) и оптимизировали инициализацию рефов в `apps/mobile/` (`useReadinessScreen.ts` и `useReadinessCardLogic.ts`), подняв оценку с `62/100` до `67/100` и уменьшив количество предупреждений.

## 2026-06-25

- **Исправление ошибок с помощью react-doctor:**
  - Устранили все 23 критические ошибки (Bugs), доведя их число до 0 во всем приложении.
  - Исправили краши React Native при импорте SafeAreaView и рендере сырого текста вне Text в `+not-found.tsx`.
  - Устранили предупреждения об использовании индексов массивов в качестве ключей `key` в списках, внедрив стабильный ID в черновики `DraftSet` и заменив ключи в `JournalSessionEditor.tsx`, а также в `WaveChart.tsx` (macOS/mobile).
  - Настроили доступность (a11y): добавили `tabIndex={0}` для интерактивных элементов с `role="listbox"`, заменили теги `<label>` на `<span>` для пикеров без явных инпутов и прописали `aria-label` для инпутов в `JournalSetForm.tsx` и `SplitPreview.tsx`.
  - Избавились от нежелательных `useEffect` для синхронизации пропсов в состояние (`useJournal.ts`, `useReadinessScreen.ts`, `ProgressionPreviewChart.tsx`), заменив их на inline-обновления состояния во время рендеринга согласно спецификации React 18/19.
  - Добавили новое постоянное правило верификации с помощью `react-doctor` в `AGENTS.md` и `memory-bank/activeContext.md`.

## 2026-06-23

- **Обновление дизайна Калькулятора:**
  - Сделали фон блока превью прогрессии (`.progression-preview`) полностью черным (`#000000`) для лучшего визуального контраста и глубины.

- **Разгрузка Конструктора Сплитов (Decoupling):**
  - Убраны жесткие ограничения по мышечным группам (Push/Pull/Legs). Теперь в любой день можно добавить любые упражнения.
  - Из `CustomSplit` убраны/устарели `legExercises`, `excludedExercisesByDay`, `exerciseDayOverrides`.
  - Добавлено свойство `customExercisesByDay` в `CustomSplit` как единый источник правды.
  - Реализована автомиграция старых сплитов на лету при их загрузке.
  - Создан компонент `GlobalExerciseAdder.tsx` сверху сплита для выбора упражнения, указания веса (1ПМ / Свой вес + доп. вес) и добавления в нужный день.
  - Удален локальный `ExercisePicker` из дней и `LegExercisePicker`.
  - Переименована структура кнопок и пересобран заголовок тулбара сплита.
- **Пирамидальная схема (Центрирование и Превью):**
  - Центрировали пирамиду: заложенный вес берется посередине, а не сверху на понижение ( offset = Math.floor((sets - 1) / 2) ).
  - В `SplitPreview` при расширении карточки упражнения показываются линейная и пирамидальная схемы бок о бок (`variant === 'split-preview'`).
  - Добавлены тесты и обновлен файл `tests/pyramid.test.ts`.

## 2026-06-21

- `src/components/split/SplitPreview.tsx`
  - Reframed Split preview around the week as the main progression unit.
  - Added week status cues: passed, current, upcoming.
  - Added copy explaining that working weight is constant inside a week.
- `src/screens/SplitConstructorTab.tsx`
  - Updated Split header copy to match the week-first model.
- `src/styles/components/split/split-constructor.css`
  - Added styling for week statuses, legend chips, and clearer weekly navigation.
- `packages/shared/src/data/exercises.ts`
  - Added `dips` and `deadlift` to the shared split exercise catalog.
  - Marked pull-ups as bodyweight-based and exposed both new keys in the wheel order.
- `packages/shared/src/data/split-exercises.ts`
  - Expanded chest/back pools so dips and deadlift can appear in split construction.
- `packages/shared/src/types/index.ts`
  - Added `usesBodyWeight` to exercise config types.
- `packages/shared/src/utils/split-constructor.ts`
  - Kept week weights constant across sessions inside the same week.
  - Added bodyweight-aware extra weight handling for split previews.
- `packages/shared/src/utils/training.ts`
  - Propagated bodyweight-aware handling into training rows.
- `packages/shared/src/hooks/useCalculatorState.ts`
  - Allowed weighted bodyweight lifts to be calculated with body weight + extra load.
- `src/components/calculator/TestApproachSection.tsx`
  - Unified bodyweight lift copy for pull-ups and dips.
- `src/components/calculator/TestApproachMetrics.tsx`
  - Switched the test form to a generic bodyweight-lift layout when needed.
- `src/components/TrainingDayCard.tsx`
  - Made training rows display bodyweight lifts as added weight.
- `src/components/PeriodizationChart.tsx`
  - Updated chart labels for bodyweight lifts.
- `src/hooks/usePeriodization.ts`
  - Updated chart weight display for bodyweight lifts.
- `tests/split-constructor.test.ts`
  - Updated preview expectations for non-split weekly volume and added coverage for dips/deadlift exposure.
- Validation
  - `npm run typecheck` passed.
  - `node --test --experimental-strip-types tests/split-constructor.test.ts tests/training.test.ts` passed.
  - `npm run build` passed.
- Preview verification
  - Opened the running app in the in-app browser at `http://127.0.0.1:5173/?tab=split`.
  - Confirmed the Split tab renders the week-first preview with fixed working weight inside the current week.
  - Captured a screenshot of the Split page for visual review.
- `src/components/ui/PremiumInput.tsx`, `src/styles/components/split/split-constructor.css`, `src/components/split/MuscleDayGrid.tsx` (2026-06-21 follow-up)
  - Fixed Split Constructor 1RM stepper showing only «— кг»: `PremiumInput` no longer applies wide unit padding inline on `variant="stepper"`; split CSS now uses compact padding and a wider RM column.
  - Verified saved 1RM values render in the stepper and +/- updates persist via Playwright on iPhone 390px viewport.
- `tests/exercise-slots.test.ts` (verification follow-up)
  - Updated expectations after catalog grew to 14 keys (`dips`, `deadlift`): 13 unlock slots (`deadlift` + `gluteBridge` share one slot).
  - Full `npm test` suite (147 tests) now passes.

## 2026-08-05

- Added per-user split calculation history (`splitCalculations`, `activeSplitCalculationId`).
- Every calculation stores a dated split + exercise-input snapshot; old forecasts remain stable when the current split or 1ПМ values change.
- Week/day completion now persists on the selected calculation and restores after reload.
- Added section 04 history cards and immediate forecast opening without recalculation.
- Added server/client normalization regression tests; full suite passes 167/167.
