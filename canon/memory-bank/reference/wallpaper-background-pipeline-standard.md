# Wallpaper background pipeline (asset processing)

> **Когда читать:** подготовка фоновых изображений для `AppAmbientBackground`, hero-ambient слоёв, mobile shell. Не UI-компонент — **asset pipeline** (как `generate-pwa-icons.mjs`, Pipeline D для видео).

Связанные файлы: `scripts/process-wallpaper-backgrounds.mjs`, `scripts/README.md`, `audit/wallpaper-background-pipeline-report.md`, `~/.cursor/shared-knowledge/MEDIA-OPTIMIZE.md` (видео; изображения — этот doc).

---

## Цель

Превратить мотивационные обои (ч/б на чёрном фоне) в **тихие ambient-слои** приложения:

- изоляция силуэта от `#000` фона;
- подсветка **amber/peach** (`#ffb020`, не лимонный жёлтый);
- 4× upscale (Lanczos3) → delivery resize → WebP/PNG < 500 KB;
- интеграция в `AppAmbientBackground` с opacity **≤ 0.10** (mobile) и radial mask + hero top-fade;

---

## Быстрый запуск

```bash
npm run backgrounds:process
# или
node scripts/process-wallpaper-backgrounds.mjs
```

Кастомный файл:

```bash
node scripts/process-wallpaper-backgrounds.mjs --input path/to/source.png --slug my-wallpaper
```

---

## Toolchain

| Инструмент            | Роль                            | Установка                              |
| --------------------- | ------------------------------- | -------------------------------------- |
| **sharp**             | isolate, glow, 4× upscale, WebP | `npm i -D sharp` (в проекте)           |
| **pngquant**          | PNG fallback                    | `brew install pngquant`                |
| **cwebp**             | опционально ручной WebP         | `brew install webp`                    |
| **sips**              | macOS inspect                   | встроен                                |
| Real-ESRGAN / waifu2x | не в репо                       | sharp Lanczos3 достаточно для line-art |

Видео: `~/.cursor/shared-knowledge/scripts/compress-videos.sh` — **не** для статики.

---

## Выходные пути

| Путь                                             | Назначение                |
| ------------------------------------------------ | ------------------------- |
| `public/backgrounds/<slug>-ambient.webp`         | primary delivery (WebP)   |
| `public/backgrounds/<slug>-ambient.png`          | PNG fallback              |
| `public/backgrounds/manifest.json`               | размеры, байты, параметры |
| `public/backgrounds/intermediate/<slug>-4x.png`  | 4× upscale (не коммитить) |
| `public/backgrounds/originals/<slug>-source.jpg` | копия исходника           |

Добавьте в `.gitignore`: `public/backgrounds/intermediate/`

---

## Параметры обработки (на изображение)

| Параметр         | Назначение                        | Типичные значения |
| ---------------- | --------------------------------- | ----------------- |
| `luminanceFloor` | порог отделения чёрного фона      | 24–28             |
| `warmStrength`   | сила amber/peach на светлых тонах | 0.18–0.24         |
| `glowStrength`   | интенсивность подсветки силуэта   | 0.45–0.55         |
| `glowBlur`       | радиус blur glow (px)             | 44–48             |

Цвета канона: `--accent: #ffb020`, `--glow-orb-1-calc`, matte **прозрачный** (delivery WebP с alpha); solid fallback `#0a0a0b` (не `#0a0c10`).

---

## Интеграция в UI

`src/components/app/AppAmbientBackground.tsx` — стек из трёх `<picture>` (все slug из manifest), видимость по вкладке.

Конфиг: `src/config/ambient-wallpapers.ts` — `TAB_AMBIENT_WALLPAPERS`:

| Вкладка    | Wallpaper slug    |
| ---------- | ----------------- |
| calculator | discipline-statue |
| theory     | why-not-me        |
| training   | why-not-me-alt    |
| split      | why-not-me        |
| journal    | discipline-statue |

CSS: `src/styles/components/app/app-ambient-background.css`:

- `--ambient-photo-opacity`: **0.09** dark (0.10 mobile), **0.058** light (0.064 mobile);
- cross-fade между обоями **1.4s** при смене вкладки;
- `mask-image` с усиленным top-fade (`--ambient-hero-fade`) — hero не конкурирует с силуэтом;
- `.app-ambient-bg__tint` — wash от `--glow-orb-1/2` (per-tab через `html[data-active-tab]`);
- `aria-hidden`, пустой `alt`, lazy/eager по активности;
- `prefers-reduced-motion` — без cross-fade и drift-анимаций.

Смена маппинга: править `TAB_AMBIENT_WALLPAPERS`; новый slug — `npm run backgrounds:process` + добавить в `AMBIENT_WALLPAPER_SLUGS`.

---

## Чеклист перед merge

- [ ] `npm run backgrounds:process` — manifest обновлён
- [ ] WebP каждого asset < 500 KB
- [ ] Превью 390px — текст вкладок читаем
- [ ] `prefers-reduced-motion` — фото статично (без анимации)
- [ ] Отчёт в `audit/wallpaper-background-pipeline-report.md` при смене pipeline
