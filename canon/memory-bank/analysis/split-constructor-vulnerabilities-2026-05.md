# Split Constructor — консolidированный анализ уязвимостей

**Дата:** 2026-05-28  
**Область:** вкладка «Конструктор сплита» (`main.app-tab-shell--split`)  
**Источники:** «Анализ 1» (структурный аудит), «Анализ 2» (UX/architecture audit), верификация по текущему коду  
**Статус:** документ-анализ, **без изменений в коде приложения**

---

## 1. Executive summary

Сведены два независимых аудита по единой шкале P0 / P1 / P2 с проверкой каждого пункта в репозитории (grep + чтение ключевых файлов).

| Приоритет | Кол-во (консенсус) | Суть                                                                                               |
| --------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| **P0**    | **3**              | Потеря/рассинхрон данных при сохранении; падение вкладки без изоляции ошибок                       |
| **P1**    | **12**             | Надёжность save-flow, a11y DnD, dirty/URL state, валидация legExercises, loading UX, app-wide auth |
| **P2**    | **14**             | Maintainability, perf-микрооптимизации, versioning, тесты edge cases, частично завышенные риски    |

**Консенсус P0 (все три подтверждены в коде):**

1. **Optimistic `setUserData` без отката** при ошибке API — `useSplitConstructor.saveSplit()`
2. **Race condition / двойной save** — нет `isSaving`, нет сериализации запросов
3. **Нет Error Boundary** в web-дереве `TabPanel` → `SplitConstructorTab`

**Уже частично или полностью закрыто недавними изменениями:** progression-only coercion, server-side `weightMode: 'progression'`, улучшенный `mergeToTwoDays`, `distributeSets` с `minPerDay=2`, константы `SPLIT_DAY_LIMITS`, лимит сплитов на сервере (`MAX_SPLITS: 50`), live `validationError` в UI, click-fallback в `MuscleDayGrid`, redesign shell/CSS (Theory-aligned).

**Завышено или устарело в исходных анализах:** «нет optimistic updates» (Анализ 2 — наоборот, optimistic есть, но без rollback); «validation только на save»; «8 недель в DOM без virtualization» (`SplitPreview` рендерит только активную неделю); «нет лимита сплитов» (есть `pruneSplits`); «0 подходов в distributeSets» (исправлено + `sets <= 0` отфильтровывается в preview).

---

## 2. Матрица: уязвимость → компонент / файл / слой

| #   | Уязвимость                                  | P      | UI                                           | Hook / utils                                                              | Server / API                                                | Тип              | Код                                                                       |
| --- | ------------------------------------------- | ------ | -------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| 1   | Optimistic update без rollback              | **P0** | SplitToolbar (кнопка «Сохранить»)            | `useSplitConstructor.ts` → `saveSplit`                                    | `api.ts` → `saveUser`                                       | logic            | **подтверждено**                                                          |
| 2   | Race condition при быстром save             | **P0** | SplitToolbar                                 | `useSplitConstructor.ts` → `saveSplit`                                    | `api.ts` → `saveUser`                                       | logic            | **подтверждено**                                                          |
| 3   | Нет Error Boundary                          | **P0** | page shell (`TabPanel`)                      | —                                                                         | —                                                           | logic            | **подтверждено** (web; mobile имеет `TrainingErrorBoundary`)              |
| 4   | Нет loading / disabled при save             | P1     | SplitToolbar                                 | `useSplitConstructor.ts`                                                  | —                                                           | logic + UI       | **подтверждено**                                                          |
| 5   | Нет dirty state / beforeunload              | P1     | SplitToolbar, page shell                     | `useSplitConstructor.ts`                                                  | —                                                           | logic            | **подтверждено**                                                          |
| 6   | URL `?split=` без валидации                 | P1     | page shell                                   | `SplitConstructorTab.tsx`, `useURLState.ts`, hook `initialSplitId` effect | —                                                           | logic            | **подтверждено** (silent ignore)                                          |
| 7   | Неполная `validateSplit` для legExercises   | P1     | LegExercisePicker, validation banner         | `split-constructor.ts` → `validateSplit`                                  | `schema.js` → `normalizeLegExercisesArray` (server coerces) | logic            | **подтверждено** (client save может пройти без legs check)                |
| 8   | DnD без клавиатурной a11y                   | P1     | MuscleDayGrid                                | —                                                                         | —                                                           | UI + logic       | **подтверждено** (есть click-fallback, нет keyboard DnD)                  |
| 9   | Touch DnD ненадёжен                         | P1     | MuscleDayGrid                                | —                                                                         | —                                                           | UI               | **частично** (click-to-move есть; native DnD на touch слаб)               |
| 10  | Inline validation UX слабый                 | P1     | SplitToolbar (name input), validation banner | `validateSplit`, `validationError` useMemo                                | —                                                           | UI + logic       | **частично** (ошибка live, но input без `aria-invalid`, save не disabled) |
| 11  | Пустой / мягкий catch в saveUser            | P1     | —                                            | —                                                                         | `api.ts` → `saveUser` `{ok:false}`                          | logic            | **подтверждено**                                                          |
| 12  | Токен через props                           | P1     | page shell (via AppShell)                    | `SplitConstructorTab` props                                               | Bearer header                                               | logic (app-wide) | **подтверждено**                                                          |
| 13  | Нет CSRF / SameSite hardening               | P1     | —                                            | —                                                                         | `api.ts` fetch                                              | logic (app-wide) | **требует проверки** infra (SameSite cookie vs Bearer)                    |
| 14  | Монолитный `useSplitConstructor` (~250 LOC) | P1     | —                                            | `useSplitConstructor.ts`                                                  | —                                                           | logic            | **подтверждено**                                                          |
| 15  | Debounce counter hack                       | P1     | SplitPreview (indirect)                      | `SplitConstructorTab.tsx` debouncedDraft                                  | —                                                           | logic            | **подтверждено**                                                          |
| 16  | Дублирование normalization coercion         | P1     | —                                            | hook, `api.ts`, `split-constructor.ts`                                    | `server/schema.js`                                          | logic            | **подтверждено** (4 точки)                                                |
| 17  | Нет live region при DnD                     | P2     | MuscleDayGrid                                | —                                                                         | —                                                           | a11y / UI        | **подтверждено**                                                          |
| 18  | Контраст validation error                   | P2     | validation banner                            | —                                                                         | —                                                           | CSS              | **требует проверки** (`--red: #ff4d4d` — вероятно AA на светлом фоне)     |
| 19  | Отсутствующий oneRM → weight 0 без hint     | P2     | SplitPreview → TrainingDayCard               | `buildDayPreview`                                                         | —                                                           | logic + UI       | **подтверждено**                                                          |
| 20  | `exerciseDayOverrides` слабая типизация     | P2     | —                                            | `types/index.ts`, `buildDayPreview`                                       | `schema.js` (runtime filter)                                | logic            | **подтверждено**                                                          |
| 21  | `SplitWeightMode` = один literal            | P2     | SplitToolbar (hint «1ПМ»)                    | types                                                                     | server coercion                                             | logic            | **подтверждено** (design debt)                                            |
| 22  | Branded types для split.id                  | P2     | SplitToolbar select                          | hook handlers                                                             | —                                                           | logic            | **не критично**                                                           |
| 23  | Props drilling userData/token               | P2     | page shell                                   | `SplitConstructorTab`                                                     | —                                                           | logic            | **подтверждено**                                                          |
| 24  | `buildDayPreview` без granular cache        | P2     | SplitPreview                                 | hook `dayPreviews` useMemo                                                | —                                                           | logic            | **частично** (debounce в tab, не в hook)                                  |
| 25  | Preview пересчёт при смене name             | P2     | SplitPreview                                 | hook `dayPreviews` deps `[draft]`                                         | —                                                           | logic            | **подтверждено** (minor perf)                                             |
| 26  | TabPanel unmount при смене вкладки          | P2     | TabPanel                                     | —                                                                         | —                                                           | logic            | **подтверждено** (by design AnimatePresence)                              |
| 27  | mergeToTwoDays теряет label дня 3           | P2     | MuscleDayGrid (косвенно)                     | `split-constructor.ts`                                                    | —                                                           | logic            | **частично исправлено** (day1/day2 label сохраняются)                     |
| 28  | UUID collision при create                   | P2     | SplitToolbar                                 | `createNewSplit`, `duplicateLast`                                         | —                                                           | logic            | **переоценено** (crypto.randomUUID достаточен)                            |
| 29  | XSS в split.name                            | P2     | SplitToolbar, select options                 | `validateSplit`                                                           | `schema.js` trim/slice                                      | logic            | **переоценено** (React text escape; server truncates)                     |
| 30  | Нет offline pre-check                       | P2     | —                                            | —                                                                         | `api.ts`                                                    | logic            | **частично** (catch → «Нет соединения» в auth)                            |
| 31  | intensityMultiplier не «календарный»        | P2     | SplitPreview                                 | `split-constructor.ts`                                                    | —                                                           | logic            | **by design** (varyIntensity semantics)                                   |
| 32  | Нет versioning / history сплитов            | P2     | —                                            | —                                                                         | DB schema                                                   | logic            | **подтверждено** (feature gap)                                            |
| 33  | Concurrent edits (2 вкладки)                | P2     | —                                            | `saveSplit` last-write-wins                                               | PUT user blob                                               | logic            | **подтверждено**                                                          |
| 34  | Edge-case тесты                             | P2     | —                                            | `tests/split-constructor.test.ts`                                         | —                                                           | logic            | **частично** (happy path + distributeSets)                                |
| 35  | Магические числа                            | P2     | MuscleDayGrid, LegExercisePicker             | `SPLIT_DAY_LIMITS`, tests                                                 | `SPLIT_LIMITS` server                                       | logic            | **частично исправлено**                                                   |
| 36  | Лимит количества сплитов                    | P2     | SplitToolbar                                 | hook create                                                               | `server/splitLimits.js` MAX_SPLITS=50                       | logic            | **исправлено на server**; client не предупреждает                         |

### Карта по UI-секциям

```
main.app-tab-shell--split (SplitConstructorTab.tsx)
├── app-tab-header                    → URL hint, page title
├── SplitToolbar                      → #4, #5, #10, #12, save P0
├── .split-validation                 → #7, #10, #18
├── MuscleDayGrid (split-muscles)     → #8, #9, #17, #27
├── LegExercisePicker (conditional)   → #7
└── SplitPreview                      → #15, #19, #25; debounce wrapper in tab
```

### Карта по слоям

| Слой              | Файлы                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| **Page / shell**  | `src/screens/SplitConstructorTab.tsx`, `src/components/app/TabPanel.tsx`                        |
| **UI components** | `SplitToolbar.tsx`, `MuscleDayGrid.tsx`, `LegExercisePicker.tsx`, `SplitPreview.tsx`            |
| **Hook**          | `packages/shared/src/hooks/useSplitConstructor.ts`                                              |
| **Utils**         | `packages/shared/src/utils/split-constructor.ts`, `packages/shared/src/data/split-exercises.ts` |
| **API client**    | `packages/shared/src/utils/api.ts` (`normalizeLoadedSplit`, `saveUser`)                         |
| **Server**        | `server/schema.js`, `server/splitLimits.js`                                                     |
| **CSS**           | `src/styles/components/split/split-constructor.css`                                             |
| **Tests**         | `tests/split-constructor.test.ts`                                                               |

---

## 3. Статус после недавних изменений

### Закрыто / существенно улучшено

| Тема                   | Было в аудите                                      | Текущее состояние                                                                                                                      |
| ---------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Progression-only**   | Legacy `fixed` / `scheme_only`, coercion размазана | `normalizeSplitForProgressionOnly`, server `weightMode: 'progression'`, toolbar hint «Веса по 1ПМ»; `FixedWeightsEditor` убран из flow |
| **mergeToTwoDays**     | Потеря muscles и labels                            | Объединение unique muscles; `label` day1 и day2 сохраняются                                                                            |
| **distributeSets → 0** | Риск нулевых подходов                              | `minPerDay=2`, redistribution; preview skip `sets <= 0`                                                                                |
| **Магические числа**   | 4, 2, 6 разбросаны                                 | `SPLIT_DAY_LIMITS`, `SPLIT_LIMITS` на server, тесты на cap 4                                                                           |
| **Лимит сплитов**      | «Неограниченно»                                    | `pruneSplits` → max 50 на server                                                                                                       |
| **Live validation**    | «Только на save» (Анализ 2)                        | `validationError = useMemo(() => validateSplit(draft))` + `role="alert"` в tab                                                         |
| **Touch fallback**     | «Нет fallback»                                     | `onClick` на chip перемещает muscle (не полноценный touch DnD)                                                                         |
| **Design / CSS**       | —                                                  | `app-tab-shell--split`, theory-aligned tokens, `split-chip`, responsive toolbar (Journal+Split build)                                  |
| **Preview 8 недель**   | «Все недели в DOM»                                 | Stepper 8 кнопок + рендер **только** `previewWeek`                                                                                     |

### Открыто (без регресса)

- P0 save-flow (rollback, isSaving)
- Error Boundary
- dirty state, URL cleanup
- legExercises client validation
- keyboard a11y для DnD
- hook decomposition, debounce refactor

---

## 4. Анализ 1 — уникальные пункты (mapped)

| Пункт Анализа 1                                        | Маппинг                                          | Верификация                                              |
| ------------------------------------------------------ | ------------------------------------------------ | -------------------------------------------------------- |
| 1.1 Error Boundary                                     | `TabPanel.tsx`                                   | **Открыто** — нет в web                                  |
| 1.2 Props drilling                                     | `SplitConstructorTab` ← `TabPanel` ← tabs config | **Открыто** P2                                           |
| 1.3 Дублирование normalization                         | hook / api / utils / server                      | **Открыто** P1                                           |
| 2.1 Race save                                          | `saveSplit`                                      | **Открыто** P0                                           |
| 2.2 Optimistic без отката                              | `saveSplit` L178–188                             | **Открыто** P0                                           |
| 2.3 UUID collision                                     | `createNewSplit`                                 | **Переоценено** P2                                       |
| 2.4 legExercises validation                            | `validateSplit`                                  | **Открыто** P1                                           |
| 2.5 merge labels                                       | `mergeToTwoDays`                                 | **Частично** — day3 label теряется                       |
| 3.x TypeScript (overrides, weightMode, branded id)     | `types/index.ts`                                 | P2 design debt                                           |
| 4.x Perf (debounce, buildDayPreview, TabPanel unmount) | tab + hook                                       | P1/P2                                                    |
| 5.x Security (XSS name, token props, CSRF)             | app-wide + validate                              | P1/P2; XSS переоценён                                    |
| 6.x A11y (keyboard DnD, live region, contrast)         | MuscleDayGrid, CSS                               | P1/P2                                                    |
| 7.x Errors (empty catch, offline, oneRM)               | api, buildDayPreview                             | P1/P2                                                    |
| 8.x Business (distributeSets, intensity, split limit)  | utils, server                                    | distributeSets/limit **исправлены**; intensity by design |

---

## 5. Анализ 2 — уникальные пункты (mapped)

| Пункт Анализа 2               | Маппинг                              | Верификация                                                                |
| ----------------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| 1.1 Монолитный hook           | `useSplitConstructor.ts`             | **Открыто** P1                                                             |
| 1.2 Debounce counter          | `SplitConstructorTab` L25–46         | **Открыто** P1                                                             |
| 1.3 «Нет optimistic»          | `saveSplit`                          | **Неверно** — optimistic **есть**, проблема в **отсутствии rollback** (P0) |
| 2.1 Dirty state               | hook + tab                           | **Открыто** P1                                                             |
| 2.2 URL без validation        | `useURLState('split')` + hook effect | **Открыто** P1                                                             |
| 2.3 Versioning                | —                                    | **Открыто** P2 feature                                                     |
| 3.1 Validation только на save | `validationError` useMemo            | **Устарело** — ошибка показывается live; inline field UX слаб              |
| 3.2 Touch DnD                 | MuscleDayGrid                        | **Частично** — click fallback                                              |
| 3.3 Loading states            | SplitToolbar                         | **Открыто** P1                                                             |
| 4.1 Preview частый пересчёт   | hook `dayPreviews`                   | P2                                                                         |
| 4.2 Virtualization 8 недель   | SplitPreview                         | **Не актуально** — одна неделя                                             |
| 5.1 Legacy coercion           | см. §3                               | **Улучшено**, централизация — P1                                           |
| 5.2 Error boundaries          | TabPanel / SplitPreview              | **Открыто** P0                                                             |
| 5.3 Магические числа          | constants                            | **Частично исправлено**                                                    |
| 6.1 Race save                 | = Анализ 1                           | P0                                                                         |
| 6.2 Stale closure debounce    | tab effect                           | **Низкий риск** (cleanup есть) P2                                          |
| 6.3 Concurrent tabs           | save last-write-wins                 | P2                                                                         |
| 7 Edge-case tests             | `split-constructor.test.ts`          | P2                                                                         |

---

## 6. Расхождения приоритетов

| Тема                             | Анализ 1               | Анализ 2                             | Консенсус после верификации                                 |
| -------------------------------- | ---------------------- | ------------------------------------ | ----------------------------------------------------------- |
| **Optimistic updates**           | P0: есть, нет rollback | Critical: «нет optimistic, добавить» | **P0 rollback + isSaving**; optimistic уже реализован       |
| **Error Boundary**               | P0                     | High (не Critical)                   | **P0** — падение child роняет всю вкладку                   |
| **Inline validation**            | —                      | Critical                             | **P1** — live banner есть; field-level / disable save — нет |
| **Touch DnD**                    | —                      | Critical                             | **P1** — click fallback снижает severity                    |
| **CSRF / token**                 | P1 security            | не акцентирован                      | **P1 app-wide**, не блокер split-only sprint                |
| **Hook split**                   | —                      | Medium                               | **P1 maintainability**, не sprint 0                         |
| **distributeSets / split limit** | P1 / Low               | —                                    | **Downgrade P2 / closed** на server                         |
| **8-week virtualization**        | —                      | perf risk                            | **Closed** — не рендерятся все недели                       |

---

## 7. Рекомендуемый порядок фиксов

### Sprint 0 — P0 (данные и стабильность)

| #   | Задача                                                            | Файлы                                                  | Примечание                                                                                   |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 1   | **Rollback при failed save** + сохранить `prevUserData`           | `packages/shared/src/hooks/useSplitConstructor.ts`     | Не убирать optimistic; добавить revert                                                       |
| 2   | **`isSaving` guard** — блокировать повторный save, disable кнопку | hook + `SplitToolbar.tsx`                              | Закрывает race + часть loading UX                                                            |
| 3   | **Error Boundary** вокруг split (или всех tab bodies)             | `TabPanel.tsx` или wrapper в `SplitConstructorTab.tsx` | Fallback + «Попробовать снова»; draft в state может пережить remount если boundary локальный |

### Sprint 1 — P1 (reliability + a11y)

| #   | Задача                                                            | Файлы                                                   |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| 4   | `validateSplit`: legExercises при `splitUsesLegs`                 | `split-constructor.ts`, тест                            |
| 5   | **Dirty state** + optional `beforeunload`                         | hook, `SplitToolbar` (disabled save if !dirty)          |
| 6   | **URL `?split=`**: clear или fallback если id не найден           | `SplitConstructorTab.tsx`, hook effect                  |
| 7   | **Save button**: spinner, `aria-busy`, disabled states            | `SplitToolbar.tsx`                                      |
| 8   | **Keyboard DnD** или documented move pattern (arrow keys)         | `MuscleDayGrid.tsx`                                     |
| 9   | **Input a11y**: `aria-invalid`, inline name error                 | `SplitToolbar.tsx`                                      |
| 10  | Улучшить ошибку save: проброс message из API                      | `api.ts` saveUser, hook catch                           |
| 11  | Централизовать normalization на load (api) + trust server on save | `api.ts`, `schema.js`, убрать дубли в hook где возможно |
| 12  | Debounce → `useDeferredValue` / `useDebounce(draft)`              | `SplitConstructorTab.tsx`                               |

### Backlog — P2

- Live region для DnD (`MuscleDayGrid`)
- Hint «Укажите 1ПМ» в preview при `weight === 0` (`buildDayPreview` + `TrainingDayCard`)
- Разбиение hook: draft / validation / persistence / preview
- Edge-case tests: merge 3→2, empty exercises, legacy weightMode, long name server slice
- Versioning / conflict detection (2 browsers)
- Branded `SplitId`, stricter `exerciseDayOverrides` keys
- TabPanel keep-alive (если нужен state при tab switch — product decision)
- CSRF / httpOnly migration (отдельный security epic)

---

## 8. Что НЕ трогать сейчас

По запросу пользователя: **только анализ, без code changes.** При будущих спринтах сознательно **отложить**:

1. **Полная миграция auth** (httpOnly cookies, CSRF) — app-wide, не split-local
2. **@dnd-kit / pointer sensors** — большой UI refactor; пока достаточно keyboard + click
3. **Versioning / history сплитов** — новая модель данных + UI
4. **Разбиение `useSplitConstructor` на 4 hook** — refactor без user-visible value в sprint 0–1
5. **Property-based testing** — инфраструктура; сначала targeted edge tests
6. **TabPanel keep-all-tabs-mounted** — меняет поведение всего приложения
7. **Branded types / SplitWeightMode cleanup** — TypeScript hygiene, низкий ROI
8. **Virtualization 8 недель** — проблема снята текущей архитектурой preview
9. **intensityMultiplier semantics** — product decision, не bugfix
10. **Design/CSS polish** — недавний build Journal+Split **не регрессировать** при bugfix sprint

---

## Приложение: верификация P0 (фрагменты кода)

**Optimistic без rollback** — `setUserData(updated)` до `await saveUser`, catch без revert:

```178:188:packages/shared/src/hooks/useSplitConstructor.ts
    setUserData(updated);
    onSplitIdChange?.(draft.id);

    try {
      const result = await saveUser(updated, token);
      if (result && 'ok' in result && !result.ok) {
        throw new Error('Failed to save');
      }
    } catch {
      onSaveError?.('Не удалось сохранить сплит');
    }
```

**Нет isSaving** — кнопка «Сохранить» без guard:

```86:91:src/components/split/SplitToolbar.tsx
          <button
            type="button"
            className="split-toolbar__action split-toolbar__action--save"
            onClick={onSave}>
            Сохранить
          </button>
```

**Нет Error Boundary** — прямой render tab component:

```127:134:src/components/app/TabPanel.tsx
          {activeTab === 'split' && (
            <SplitConstructorTab
              userData={userData}
              setUserData={split.setUserData}
              token={split.token}
              onSaveError={split.onSaveError}
            />
          )}
```

---

_Документ подготовлен для Memory Bank. Следующий шаг по workflow: `/plan` или `/van` для sprint 0, если пользователь утвердит приоритеты._
