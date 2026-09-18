# Auth: чёрная полоса справа + переключение темы

**Дата:** 2026-08-15 22:15  
**Приоритет:** высокий  
**Проект:** `C:\Users\user\Desktop\React_Project_`

---

## Контекст

- Mac уже скинул триптих PNG (main 1193×1918) + auth CSS fixes в `C:\Users\user\Desktop\React_Project_`
- Фото центр/лево/право — **OK**
- Остаётся: **чёрная полоса справа** на входном экране (auth triptych layout)
- Остаётся: **переключение темы** (light/dark) — глюки при смене

Mac = source of truth. Не ломать Mac-синхронизацию.

---

## Задачи для Venus Cursor-агента

### 1. Чёрная полоса справа (auth triptych)

Найти и устранить причину чёрной полосы на правом краю экрана входа.

**Проверить:**
- overflow / horizontal scroll на body, html, auth wrapper
- viewport width vs actual content width
- flex/grid triptych layout (центр + левая/правая панели)
- `auth-canvas-lock.css` — lock размеров, min/max-width
- `100vw` vs `100%` (scrollbar gutter на Windows)
- Windows scrollbar gutter (`scrollbar-gutter`, overlay scrollbars)
- `object-fit` / `object-position` на правой панели триптиха
- gap между панелями, `background-color` fallback
- media queries при ширине окна ≈ 1920px

**Ожидаемый результат:** триптих заполняет экран без чёрной полосы справа на Windows login screen.

### 2. Переключение темы (light/dark)

Проверить и починить глюки при смене темы.

**Проверить:**
- `initTheme.ts` — порядок инициализации, чтение localStorage
- атрибут `data-theme` на `<html>` / root
- View Transitions API — flash, прерывание анимации
- FOUC при загрузке и при toggle
- sync localStorage ↔ DOM (ключ темы, default fallback)
- CSS variables переключение (`--color-*` tokens)
- конфликт с auth-canvas / triptych overlay при смене темы

**Ожидаемый результат:** плавное переключение light/dark без flash, без «залипания» и без поломки auth layout.

### 3. Ограничения

- **НЕ ломать Mac** — правки только локально на Venus или в **отдельной ветке**
- Mac = source of truth; перед merge — согласовать с Mac
- Не коммитить `.env`, секреты, `gym.db`
- Не трогать PNG триптиха без необходимости (они уже OK)

### 4. Отчёт после фикса

Положить отчёт в `D:\Mac\OUTBOX\` с именем:

`2026-08-15-XXXX-auth-black-stripe-theme-REPORT.md`

**Формат отчёта:**
- Что было причиной (root cause)
- Какие файлы изменены
- До/после (кратко)
- Статус theme toggle
- Рекомендации для Mac (если нужен merge)

---

## Команды (Venus)

```powershell
cd C:\Users\user\Desktop\React_Project_
npm run dev
# превью auth screen, проверить правый край и theme toggle
npm run typecheck
npm test
```

---

*INBOX от Mac Cursor · 2026-08-15 22:15*
