# План: этап 2 — WebP триптиха auth

**Дата:** 2026-09-08
**Цель:** убрать ~8.5 МБ PNG из старта, не меняя кадры и раскладку auth.

## Как сейчас

- Оригиналы: `imagePhone/{one,main,jkhkjh}.png` (1.9 + 2.6 + 4.0 МБ).
- Рантайм: копия в `public/imagePhone/`, URL `/imagePhone/*.png` в `src/config/auth-image-phone.ts`.
- `jkhkjh.png` — вырезка с альфой. Чёрный фон возвращать нельзя.
- Синк: `scripts/sync-auth-triptych-public.mjs`.

## Что делаем

1. PNG в `imagePhone/` не удаляем — это исходники.
2. Рядом генерируем `.webp` (`cwebp -q 92 -alpha_q 100`).
3. В `public/imagePhone/` кладём только WebP. Старые PNG из public убираем, чтобы `dist/` их не копировал.
4. URL в конфиге и тесте: `/imagePhone/*.webp`. Размеры слотов те же.
5. Синк копирует WebP, не PNG.

## Не делаем

- Не трогаем вёрстку AuthHeroDecor.
- Не подключаем платёжный SDK.
- Не коммитим.
