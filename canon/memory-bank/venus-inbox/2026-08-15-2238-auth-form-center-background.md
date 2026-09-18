# Центрирование формы входа/регистрации — как на Mac (эталон)

**Дата:** 2026-08-15 22:38  
**Приоритет:** высокий  
**Проект Venus:** `C:\Users\user\Desktop\React_Project_`  
**Связанный INBOX:** `2026-08-15-2236-auth-background-crop-mac-canonical.md` (triptych/crop — **не ломать**)  
**Mac = source of truth.** Копировать CSS и DOM-структуру буквально.

---

## Задача

Форма **«Войти»** и **«Регистрация»** должна быть **по центру** экрана (горизонтально и вертикально) — как на Mac эталоне. Карточка не должна «уезжать» вверх, влево или прилипать к краю. Переключение login ↔ register **не смещает** карточку.

---

## Mac эталон — DOM (AuthScreen.tsx)

```
<main class="auth-screen">
  <AuthHeroDecor />          <!-- absolute, z-index 0 — фон triptych -->
  <div class="auth-stage">   <!-- relative, z-index 1 — узкая колонка формы -->
    <div class="auth-motion">…</div>   <!-- absolute НАД карточкой -->
    <div class="auth-card">            <!-- сама форма -->
      <div class="auth-tabs">…</div>
      <div class="auth-form">…</div>
    </div>
  </div>
</main>
```

**Важно:** triptych (`.auth-hero-decor`) — `position: absolute; inset: 0; z-index: 0`. Форма — отдельный grid-child `.auth-stage`, **не** внутри hero-decor.

---

## Mac эталон — ключевые CSS (копировать дословно)

### 1. Цепочка flex от #root (full viewport height)

```css
#root:has(.auth-screen),
html.auth-open #root {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  min-height: 100vh;
  min-height: 100svh;
  padding: 0;
  padding-top: env(safe-area-inset-top, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  padding-bottom: 0;
  padding-left: env(safe-area-inset-left, 0px);
}

html:has(.auth-screen) ion-app,
html.auth-open ion-app {
  align-items: stretch;
  flex: 1 1 auto;
  min-height: 100%;
  width: 100%;
}

ion-app > .auth-screen {
  flex: 1 1 auto;
  max-width: none;
  width: 100%;
}
```

### 2. Главное центрирование — `.auth-screen` (grid + place-items)

```css
.auth-screen {
  --auth-form-max: 398px;
  background: var(--auth-bg, #0a0a0b);
  display: grid;
  flex: 1 1 auto;
  isolation: isolate;
  min-height: 100vh;
  min-height: 100svh;
  overflow-x: hidden;
  overflow-y: auto;
  place-items: center;   /* ← горизонт + вертикаль по центру */
  position: relative;
  width: 100%;             /* НЕ 100vw */
}
```

### 3. Узкая колонка формы — `.auth-stage`

```css
.auth-stage {
  position: relative;
  width: min(100% - 32px, var(--auth-form-max, 398px));
  z-index: 1;
}

.auth-stage > .auth-card {
  width: 100%;
}
```

### 4. Motion-блок над карточкой (не ломает центрирование)

```css
.auth-motion {
  align-items: center;
  bottom: calc(100% + 40px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  inset-inline: 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
}
```

### 5. Сама форма — `.auth-form` (column flex, не position)

```css
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

### 6. Fallback `:has()` — класс `html.auth-open`

В `AuthScreen.tsx` `useEffect` добавляет `document.documentElement.classList.add('auth-open')` — **обязателен** на старых Edge/Chrome без `:has()`. Без него `#root` не получит flex/min-height и форма «прилипнет» к верху.

### 7. auth-canvas-lock.css

Только фон `#0a0a0b !important` — **не** добавлять сюда layout/centering.

---

## Register vs Login

- Обе вкладки рендерятся **в одной** `.auth-card` внутри `.auth-stage`.
- Register добавляет поля в `.auth-form`, но **не меняет** wrapper/layout.
- После переключения «Войти» ↔ «Регистрация» карточка остаётся **в том же grid-центре**; допустимо только вертикальное «дыхание» от большего числа полей (scroll внутри `.auth-screen`).

---

## Не ломать (из INBOX 2236)

- Triptych slots: `object-fit: contain`, `object-position: bottom`, ноги flush к низу.
- `--auth-right-nudge: 100px` на **контейнере** right slot, не на img.
- `overflow-x: hidden`, `width: 100%` (не `100vw`).
- PNG sync: `one.png` / `main.png` / `jkhkjh.png` из `public/imagePhone/`.

---

## Windows pitfalls

| Проблема | Решение |
| -------- | ------- |
| `:has()` не работает | Класс `html.auth-open` из useEffect + дублирующие селекторы `html.auth-open #root` |
| Форма у верхнего края | Проверить `#root`/`ion-app`/`auth-screen` — цепочка `flex: 1` + `min-height: 100svh` |
| Форма слева | У `.auth-screen` должно быть `place-items: center`, не `start`; у `.auth-stage` — `width: min(...)`, не `100%` без центрирования |
| Flex child сжимается | `.auth-stage { flex-shrink: 0 }` если родитель flex (не grid) — на Mac grid-child не сжимается |
| `100vh` vs `100dvh` | Использовать **оба**: `min-height: 100vh; min-height: 100svh;` (+ `100dvh` в mobile media если есть) |
| Scrollbar offset | Не использовать `100vw`; `overflow-y: auto` на `.auth-screen` |
| Короткий viewport (<840px) / landscape phone | Mac **намеренно** смещает вверх: `@media (max-height: 840px)` → `align-items: start; justify-items: center` — это OK, не «баг» |
| `position: fixed` на форме | **Запрещено** — ломает grid centering |
| Лишний padding на `#root` | При auth `padding: 0` (кроме safe-area) |

---

## Файлы для правки на Venus

| Файл | Что проверить |
| ---- | ------------- |
| `src\styles\components\auth\auth.css` | `.auth-screen`, `.auth-stage`, `.auth-motion`, `#root:has(.auth-screen)` |
| `src\styles\base\ionic-theme.css` | `ion-app > .auth-screen { flex: 1; max-width: none }` |
| `src\screens\AuthScreen.tsx` | `className="auth-screen"`, `auth-open` useEffect, структура stage/card |
| `src\styles\components\auth\auth-canvas-lock.css` | только background, без layout |

**Diff с Mac:** сравнить `auth.css` строки `.auth-screen`, `.auth-stage`, `#root:has(.auth-screen)` с Mac репо.

---

## Проверка (обязательно)

1. **1920×1080** — форма визуально по центру viewport; triptych на фоне; motion-блок над карточкой.
2. **~390px** (iPhone) — форма по центру, боковые статуи скрыты/урезаны per media, без горизонтального scroll.
3. Переключить **Войти → Регистрация → Войти** — горизонтальное положение карточки **не меняется**.
4. DevTools: `.auth-screen` computed → `display: grid`, `place-items: center`.

Скриншоты сохранить.

---

## После выполнения

Краткий отчёт в **`D:\Mac\OUTBOX\`** (Markdown):

- что изменено (файлы + строки CSS);
- скрины 1920×1080 и ~390px (login + register);
- подтверждение: triptych crop из INBOX 2236 не сломан.

---

## Команды

```powershell
cd C:\Users\user\Desktop\React_Project_
npm run dev
# браузер: auth screen, F12 → responsive 390px и 1920px
npm run typecheck
npm test -- tests/auth-triptych-assets.test.ts
```
