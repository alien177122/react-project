# Auth triptych: кадровка фона как на Mac (эталон)

**Дата:** 2026-08-15 22:36  
**Приоритет:** высокий — обязательно к исполнению  
**Проект Venus:** `C:\Users\user\Desktop\React_Project_`  
**Mac = source of truth.** Не выдумывать новый layout — копировать Mac CSS и PNG буквально.

---

## Контекст

- **Triptych PNG (лево / центр / право)** на Venus уже загружены и выглядят OK как файлы.
- **Проблема:** на Windows ломается **фон и кадровка** — статуи «плавают», растягиваются, видны чёрные полосы, неправильный crop по краям.
- **На Mac** кадровка **эталонная** — ноги статуй у нижнего края экрана, чёрный canvas `#0a0a0b` без артефактов, боковые фигуры выходят за край с правильным `object-position`.
- Предыдущий INBOX (`2026-08-15-2215-auth-black-stripe-theme.md`) — чёрная полоса справа и theme toggle; **этот документ** — про **object-fit / slot layout / PNG sync**, не дублирует theme-логику, но **не ломай** её при правках.

---

## Эталон Mac — файлы и пути (на Venus)

| Назначение                               | Путь на Venus                                       |
| ---------------------------------------- | --------------------------------------------------- |
| CSS triptych + auth layout               | `src\styles\components\auth\auth.css`               |
| Canvas lock (последний в cascade)        | `src\styles\components\auth\auth-canvas-lock.css`   |
| Импорт lock (должен быть после main.css) | `index.tsx` строка ~9                               |
| Компонент triptych                       | `src\components\auth\AuthHeroDecor.tsx`             |
| Размеры PNG + src                        | `src\config\auth-image-phone.ts`                    |
| Экран auth                               | `src\screens\AuthScreen.tsx`                        |
| Vite sync plugin                         | `vite.config.ts` → plugin `sync-auth-triptych`      |
| Скрипт sync                              | `scripts\sync-auth-triptych-public.mjs`             |
| Исходники PNG                            | `imagePhone\` (корень репо)                         |
| Публичные PNG (real dir, не symlink!)    | `public\imagePhone\`                                |
| Резерв с Mac                             | `D:\Mac\public\imagePhone\` (если байты отличаются) |

---

## PNG — обязательные размеры (intrinsic)

**НЕ использовать** `_.png` (433×758) для центра — pixelates на Windows.

| Файл         | Слот                                 | Размер (px)     | URL                      |
| ------------ | ------------------------------------ | --------------- | ------------------------ |
| `one.png`    | left (молот)                         | **1446 × 2709** | `/imagePhone/one.png`    |
| `main.png`   | center (дискipline)                  | **1193 × 1918** | `/imagePhone/main.png`   |
| `jkhkjh.png` | right (manga-back, **alpha cutout**) | **1845 × 3072** | `/imagePhone/jkhkjh.png` |

**Проверка на Venus:**

```powershell
cd C:\Users\user\Desktop\React_Project_
npm run auth:triptych:sync
npm test -- tests/auth-triptych-assets.test.ts
```

`public\imagePhone` должен быть **реальной папкой**, не symlink (Windows не следует Unix symlink).

---

## Эталон Mac — ключевые CSS (копировать дословно)

### Canvas и overflow

```css
.auth-screen {
  --auth-bg: #0a0a0b;
  --auth-right-nudge: 100px;
  background: var(--auth-bg);
  min-height: 100vh;
  min-height: 100svh;
  overflow-x: hidden; /* НЕ 100vw — см. чёрную полосу */
  overflow-y: auto;
  width: 100%; /* НЕ width: 100vw */
}

#root:has(.auth-screen),
html.auth-open #root {
  padding: 0; /* full-bleed — статуи flush к низу viewport */
  min-height: 100vh;
  min-height: 100svh;
}
```

`auth-canvas-lock.css` — форсирует `#0a0a0b !important` даже при `html[data-theme='light']`.

### Triptych stage (`.auth-hero-decor`)

```css
.auth-hero-decor {
  position: absolute;
  inset-inline: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}
```

### Слоты — rise from bottom (не stretch сверху)

```css
.auth-hero-decor__slot {
  position: absolute;
  bottom: 0;
  top: auto; /* критично — иначе «плавание» по центру */
  height: min(92%, 880px);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.auth-hero-decor__slot--left {
  inset-inline-start: 0;
  width: 36%;
  z-index: 1;
}
.auth-hero-decor__slot--center {
  inset-inline: 0;
  margin-inline: auto;
  width: min(52%, 280px);
  z-index: 3;
}
.auth-hero-decor__slot--right {
  inset-inline-end: var(--auth-right-nudge); /* 100px к центру */
  width: 36%;
  z-index: 2;
}
```

**Desktop ≥768px:**

```css
.auth-hero-decor__slot {
  height: min(94%, 960px);
}
.auth-hero-decor__slot--left,
.auth-hero-decor__slot--right {
  width: 38%;
}
.auth-hero-decor__slot--center {
  width: min(36%, 360px);
}
```

**Mobile ≤767px:**

```css
.auth-hero-decor__slot {
  height: min(88dvh, 760px);
}
.auth-hero-decor__slot--left {
  inset-inline-start: -8%;
  width: 26%;
}
.auth-hero-decor__slot--right {
  inset-inline-end: calc(-8% + var(--auth-right-nudge));
  width: 26%;
}
```

**≤480px:** left/right `visibility: hidden`; center `width: min(68%, 280px)`.

### Фигуры — object-fit / object-position (сердце эталона)

```css
.auth-hero-decor__figure {
  position: absolute;
  bottom: 0;
  display: block;
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain; /* НЕ cover — без растягивания */
  object-position: bottom center;
  opacity: var(--auth-figure-opacity); /* 0.92 */
}

/* LEFT — якорь к правому нижнему углу слота */
.auth-hero-decor__slot--left .auth-hero-decor__figure {
  inset-inline-end: 0;
  object-position: right bottom;
  min-width: 140%;
  max-width: none;
}

/* RIGHT — якорь к левому нижнему углу слота */
.auth-hero-decor__slot--right .auth-hero-decor__figure {
  inset-inline-start: 0;
  object-position: left bottom;
  min-width: 140%;
  max-width: none;
  background: transparent; /* jkhkjh.png с alpha — без чёрной пластины */
}

/* CENTER — intrinsic ratio, без stretch 100%×100% */
.auth-hero-decor__slot--center .auth-hero-decor__figure {
  left: 50%;
  transform: translateX(-50%);
  object-fit: contain;
  object-position: bottom center;
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
}
```

**Mobile ≤767px** (боковые): `min-width: 112%`, `opacity: 0.68`.

### React — width/height на `<img>` (AuthHeroDecor.tsx)

Mac передаёт intrinsic размеры из `auth-image-phone.ts`:

```tsx
<img
  className="auth-hero-decor__figure"
  src={src}
  width={width}
  height={height}
  sizes={isCenter ? '(min-width: 768px) 360px, 280px' : '(min-width: 768px) 38vw, 26vw'}
  loading="eager"
  decoding="async"
  fetchPriority={isCenter ? 'high' : 'low'}
/>
```

Без `width`/`height` Windows Chrome хуже считает aspect-ratio → stretch bugs.

---

## Что проверить на Venus (чеклист)

### 1. Сравнение с Mac diff

```powershell
# Если есть git — сравни auth.css и AuthHeroDecor.tsx с origin/main или Mac pack
git diff origin/main -- src/styles/components/auth/auth.css
git diff origin/main -- src/components/auth/AuthHeroDecor.tsx
git diff origin/main -- src/config/auth-image-phone.ts
```

Любые отличия в triptych-секции — **откатить к Mac**.

### 2. object-fit / object-position по панелям

| Панель | object-fit | object-position   | min-width          |
| ------ | ---------- | ----------------- | ------------------ |
| left   | contain    | **right bottom**  | 140% (112% mobile) |
| center | contain    | **bottom center** | —                  |
| right  | contain    | **left bottom**   | 140% (112% mobile) |

**Запрещено:** `object-fit: cover` на статуях, `width: 100%; height: 100%` на center img, `background-size: cover` на слотах.

### 3. Stretch / black bars

- Нет растягивания PNG (aspect ratio сохранён).
- Нет чёрной «пластины» вокруг `jkhkjh.png` — только alpha cutout на `#0a0a0b`.
- Ноги всех трёх фигур на одной линии у **bottom: 0** viewport.
- Центр не upscaled из маленького `_.png`.

### 4. min-height / flex / slot geometry

- Слоты: `top: auto`, `bottom: 0` — **не** `top: 0; bottom: 0` со stretch.
- `.auth-hero-decor__figure-wrap`: `height: 100%`, `align-items: flex-end`.
- `.auth-screen`: `display: grid; place-items: center` — форма узкая, wallpaper full viewport.

### 5. Windows-specific overflow

См. INBOX `2026-08-15-2215-auth-black-stripe-theme.md`:

- **Чёрная полоса справа:** часто `100vw` + classic scrollbar; Mac использует `width: 100%` + `overflow-x: hidden` на `.auth-screen` и `body`.
- Проверить: `html`, `body`, `#root`, `.auth-hero-decor` — нет горизонтального scroll (DevTools → document width vs viewport).
- Не добавлять `100vw` на auth wrappers.
- `--auth-right-nudge: 100px` двигает **контейнер** right slot, не crop внутри img (комментарий в Mac CSS).

### 6. Theme toggle — не сломать

- `AuthScreen.tsx` добавляет `html.auth-open` + meta theme-color `#0a0a0b`.
- `auth-canvas-lock.css` должен оставаться **последним** импортом auth CSS.
- При `data-theme=light` auth canvas **остаётся чёрным** — не подменять на gunmetal logged-in shell.
- Не трогать `initTheme.ts` без необходимости; если трогаешь — проверь toggle до/после auth fix.

---

## Как кадрировать (алгоритм для агента)

1. `npm run auth:triptych:sync` — свежие PNG в `public\imagePhone\`.
2. Открыть Mac-эталон `auth.css` (секция «Triptych wallpaper» ~строки 96–272) — **скопировать блок целиком** поверх Venus версии.
3. Сверить `AuthHeroDecor.tsx` и `auth-image-phone.ts` с Mac (intrinsic width/height на img).
4. Убедиться `index.tsx` импортирует `auth-canvas-lock.css` после `main.css`.
5. `npm run dev` → auth screen, viewport **1920×1080** и **390×844**.
6. Сравнить с Mac screenshot: feet flush bottom, side statues peek correctly, no right black stripe.
7. `npm run typecheck && npm test`.

**Если PNG на Venus битые/старые:** скопировать из `D:\Mac\public\imagePhone\` или `D:\Mac\imagePhone\` поверх локальных, затем sync.

**Если после CSS всё ещё wrong:** не invent — запросить Mac diff или OUTBOX эскалацию.

---

## Ограничения

- Mac = source of truth; merge только после сверки.
- Не коммитить `.env`, секреты, `gym.db`.
- Не менять triptych PNG без проверки размеров (таблица выше).
- Правки локально на Venus или отдельная ветка.

---

## После фикса — отчёт в OUTBOX

Файл: `D:\Mac\OUTBOX\2026-08-15-XXXX-auth-background-crop-REPORT.md`

**Обязательно:**

1. Root cause (что именно ломало кадровку на Windows).
2. Список изменённых файлов.
3. **Скриншоты до/после** (1920px и 390px) — вложить PNG в OUTBOX или `D:\Mac\OUTBOX\screenshots\`.
4. Подтверждение: `object-fit: contain`, feet at bottom, no black stripe, theme toggle OK.
5. Результаты `npm test` / `npm run typecheck`.

---

## Команды

```powershell
cd C:\Users\user\Desktop\React_Project_
npm run auth:triptych:sync
npm run dev
npm run typecheck
npm test
npm test -- tests/auth-triptych-assets.test.ts
```

---

_INBOX от Mac Cursor · 2026-08-15 22:36 · auth background crop canonical_
