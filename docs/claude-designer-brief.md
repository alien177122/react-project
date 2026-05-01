# Frontend brief — Periodization UI (Apple-style)

> Документ для Claude Designer / любого AI-дизайнера. Скопируй целиком в начало промпта, прежде чем просить макет. Брифф закодирует визуальный язык продукта так, чтобы новые экраны/компоненты приходили в одной системе с уже собранной Calculator-сценой.

---

## 0. Контекст проекта

**Продукт:** тренировочный калькулятор + 8-недельная периодизация (отказной подход → 1ПМ → рабочие веса по неделям с реальными сет/реп схемами).
**Платформа:** iOS-only (Android заморожен). Можно таргетировать WebKit.
**Сцены:** Calculator (готова), Theory (8 глав, существующий легаси), Volume Donut, Saved exercises, Plate Diagram, Periodization Chart.
**Аудитория:** атлеты-силовики и средний-продвинутый powerlifting/strength training. Тон — экспертный, без mass-market мотивашек.

---

## 1. Имя системы

`Periodization UI` — внутреннее имя дизайн-системы. Корневой CSS-неймспейс — `.ta-shell` («theory-apple», исторически), сабнеймспейс калькулятора — `ta-calc-*`.

При генерации новых компонентов **обязательно** оборачивать корень разметки в `<div class="ta-shell">…</div>`, иначе токены не наследуются.

---

## 2. Эстетический ориентир (одной фразой)

Apple Fitness × IKEA powerlifting manual. Тёмный, плотный, tabular numbers, спокойные акценты, никаких глянцевых градиентов и стеклянных эффектов в контентных компонентах. Декоративная глубина — только в shell background и hero glow.

---

## 3. Цветовые токены

```css
.ta-shell {
  /* Surfaces */
  --ta-bg:          #0a0c10;   /* shell base */
  --ta-surface:     #151a22;   /* cards */
  --ta-surface-2:   #1c222c;   /* nested / hover */
  --ta-border:      rgba(148, 163, 184, 0.14);
  --ta-border-strong: rgba(148, 163, 184, 0.28);

  /* Text */
  --ta-text:        #f3efe6;   /* off-white, тёплый */
  --ta-text-muted:  #99a1ad;
  --ta-text-dim:    #6a7383;

  /* Section accents (8 шт. — по одному на сцену) */
  --ta-sec-01: #ff9f40;   /* Calculator   — orange       */
  --ta-sec-02: #5ba4ff;   /* Theory ch.2  — blue         */
  --ta-sec-03: #3affb8;   /* mint                        */
  --ta-sec-04: #d946ef;   /* magenta                     */
  --ta-sec-05: #94a3b8;   /* graphite                    */
  --ta-sec-06: #ff6b6b;   /* coral                       */
  --ta-sec-07: #a78bfa;   /* lavender                    */
  --ta-sec-08: #fbbf24;   /* amber                       */

  /* Calculator alias */
  --ta-calc-accent: var(--ta-sec-01);
  --ta-calc-error:  #ff3b30;

  /* IPF plate colours (диаграмма блинов) */
  --plate-25:   #d93025;
  --plate-20:   #2563eb;
  --plate-15:   #facc15;
  --plate-10:   #22c55e;
  --plate-5:    #f8fafc;
  --plate-2_5:  #d93025;
  --plate-1_25: #94a3b8;
}
```

**Правила:**
- Не вводи новые цвета. Если палитры мало — используй `oklch()` производные от существующих токенов.
- Текст на тёмном фоне — только `--ta-text` / `--ta-text-muted` / `--ta-text-dim`. Чистый `#fff` запрещён.
- Акцент в компоненте всегда **один**, через `--ta-calc-accent` или своё `--scene-accent`. Никаких двух акцентов в одной карточке.

---

## 4. Радиусы (строгая шкала)

```
8px   chip, donut row, плита
12px  inputs, кнопки в карточке
16px  card, primary button, result card
20px  section block
32px  shell
999px pill
```

Промежуточных значений нет. Если нужно «что-то между» — выбери ближайшее меньшее.

---

## 5. Типографика

- **Display/UI:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter Display', 'Inter', system-ui, sans-serif`
- **Mono:** `ui-monospace, 'SF Mono', Menlo, monospace` — для всех чисел, `font-variant-numeric: tabular-nums`.
- Заголовки сцены: `clamp(32px, 5vw, 48px)`, weight 700, letter-spacing −0.02em.
- Eyebrow (надзаголовок): 10–12px, uppercase, letter-spacing 0.18–0.22em, цвет `--ta-text-dim` или акцент.
- Основной текст: 14–16px, line-height 1.5.
- Минимум на iPhone — 13px (мелче только для caption metadata).

---

## 6. Моушн

```css
--ta-duration-micro:     200ms;   /* hover, press */
--ta-duration-component: 400ms;   /* enter/exit */
--ta-duration-section:   500ms;   /* hero stagger */
--ta-ease:        cubic-bezier(0.16, 1, 0.3, 1);   /* основной */
--ta-ease-micro:  cubic-bezier(0.22, 1, 0.36, 1);
--ta-ease-transition: cubic-bezier(0.4, 0, 0.2, 1);
```

**Правила:**
- Никакого spring (Framer `type: 'spring'` запрещён — только `tween` с кривыми выше).
- Hover/active — CSS-first. Framer Motion / `AnimatePresence` — только для появления/исчезновения сложных компонентов и list-stagger.
- Любая анимация **обязана** иметь ветку `prefers-reduced-motion: reduce` — с полным отключением, не ускорением.
- Stagger между элементами одного списка — 60–80 мс.

---

## 7. Layout

- Контентная ширина: max-width 920px (hero), 720px (карточные секции). Шире не нужно.
- Боковые отступы: 24px десктоп, 16px мобайл.
- Вертикальный rhythm секций: gap 28px внутри `.ta-stack`.
- Грид для инпутов: `grid-template-columns: 1fr 1fr` на десктопе, `1fr` на мобайле, gap 12px.

---

## 8. Компоненты-ядро (используй их, не изобретай)

| Класс / компонент | Когда использовать |
|---|---|
| `SceneHero` (`.ta-scene-hero`) | Любая сцена с заголовком 1-го уровня. Поля: eyebrow, title, subtitle, accentWord. |
| `SectionBlock` (`.ta-section`) | Нумерованный раздел внутри сцены (01, 02…). |
| `NoteBox` (`.ta-note`) | Подсказки и инструкции в полупрозрачной плашке. |
| `PremiumInput` (`.pi-input` / `.pi-stepper`) | Все инпуты. Варианты `default` и `stepper` (с ±44×44 кнопками). Никаких голых `<input>`. |
| `Button` (`.btn`) | Кнопки. Варианты `primary` / `ghost` / `danger`, размеры `sm` / `md`. |
| `ResultCard` (`.ta-result-card`) | Финальный результат расчёта. Большое число + meta-чипы. |
| `PlateDiagram` (`.ta-calc-plates`) | Декомпозиция веса на блины IPF. |
| `PeriodizationChart` (`.ta-period-chart`) | Двухосевой чарт неделя/вес/объём + phase strip. |

Если нужного компонента нет — собирай из примитивов выше. Не плодите новые карточки с нуля.

---

## 9. Чек-лист перед сабмитом дизайна

- [ ] Корень обёрнут в `.ta-shell`.
- [ ] Используются только токены из §3. Нет hardcoded hex-кодов в стилях.
- [ ] Радиусы — только из шкалы §4.
- [ ] Шрифты — SF Pro Display / SF Mono. Никакого Inter/Roboto/Arial напрямую.
- [ ] Числа — `font-variant-numeric: tabular-nums`.
- [ ] Все интерактивы ≥ 44×44 пикселей.
- [ ] Каждая анимация имеет `@media (prefers-reduced-motion: reduce)`.
- [ ] `focus-visible` ring задан (3px, акцент @ 24% alpha).
- [ ] Tab-order логичный, нет `outline: none` без замены.
- [ ] Один акцентный цвет на компонент.
- [ ] Нет градиентов в контенте; нет `backdrop-filter` нигде кроме sticky-nav.
- [ ] Нет emoji. Нет SVG-иллюстраций «от себя» — только иконки SF Symbols-стиля line-icon, или плейсхолдер.
- [ ] Текст — на русском (UI-копирайт). Английский — только в eyebrow и техжаргоне (1ПМ, IPF, kg).

---

## 10. Антипаттерны (запрещено)

- Градиентные кнопки и hero-фоны (исключение: два радиальных glow в shell + один gradient-text для accent в Theory hero — это всё).
- Glass-morphism / backdrop-blur в карточках.
- Левый цветной border + rounded corners как «декоративный приём» (это AI-slop, кроме `ResultCard`, где это семантический акцент).
- Spring-анимации, bounce-overshoot.
- Слишком много чисел/иконок/статистики «для красоты». Принцип: 1000 «нет» на каждое «да».
- Светлая тема (продукт dark-only).
- Эмодзи как UI-элемент.
- Inter, Roboto, Arial, Fraunces, любые «дефолтные» шрифты вместо SF.

---

## 11. Reference snippet (можно копировать)

```html
<div class="ta-shell">
  <section class="ta-scene-hero">
    <span class="ta-scene-hero__eyebrow">Calculator</span>
    <h1 class="ta-scene-hero__title">
      <span class="ta-scene-hero__accent">1ПМ</span> и прогрессия
    </h1>
    <p class="ta-scene-hero__subtitle">Отказной подход → расчёт → 8 недель.</p>
  </section>

  <div class="ta-stack">
    <section class="ta-section">
      <header class="ta-section__head">
        <span class="ta-section__num">01</span>
        <h2 class="ta-section__title">Тестовый подход</h2>
      </header>

      <div class="pi-stepper pi-stepper--idle">
        <button class="pi-stepper__btn" aria-label="Уменьшить вес">−</button>
        <div class="pi-wrapper pi-wrapper--idle pi-wrapper--stepper">
          <input class="pi-input" value="82.5" />
          <span class="pi-unit">кг</span>
        </div>
        <button class="pi-stepper__btn" aria-label="Увеличить вес">+</button>
      </div>
    </section>

    <div class="ta-result-card" role="status" aria-live="polite">
      <div class="ta-result-card__label">Расчётный 1ПМ</div>
      <div class="ta-result-card__value">88<span class="ta-result-card__unit">кг</span></div>
      <ul class="ta-result-card__chips">
        <li class="ta-result-card__chip">Тест: 80 кг × 6 повт</li>
        <li class="ta-result-card__chip">Жим</li>
        <li class="ta-result-card__chip">Шаг: 2.5 кг</li>
      </ul>
    </div>
  </div>
</div>
```

---

## 12. Что попросить, если нужен новый компонент

Когда дизайнер сомневается — спросить пользователя:

1. К какой сцене относится (Calculator / Theory / Saved / новая)?
2. Какой `--ta-sec-NN` цвет назначить?
3. Это контентный блок (внутри `ta-stack`) или модал/overlay?
4. Нужна ли entrance-анимация и нужно ли её отключать в reduced-motion?
5. Есть ли числовые значения — нужен ли count-up?
6. Какие интеракции: hover-only, press, long-press, swipe?

Не додумывать копирайт. Если текст не дан — ставить `[label]` плейсхолдер и спрашивать.

---

## 13. Источники истины

- `src/styles/components/theory-apple.css` — все `.ta-*` токены и компоненты.
- `src/components/ui/SceneHero.tsx`, `PremiumInput.tsx`, `ResultCard.tsx` — каноничные реализации.
- `packages/shared/src/utils/calcValidators.ts` — валидаторы числовых полей.

Если правило в этом бриффе противоречит коду — побеждает код, бриф устарел, надо обновить.
