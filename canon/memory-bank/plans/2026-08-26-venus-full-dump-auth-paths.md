# План: повторный полный дамп на Venus + пути auth PNG

**Дата:** 2026-08-26  
**Статус:** готово — overlay v0.004, PNG sync, инструкция auth-путей

## Цель

На Venus заново лежит всё приложение с Mac (полный overlay). Страница входа показывает триптих PNG по веб-путям Vite (`/imagePhone/*.png` через `publicAsset`), а не по Mac/Windows filesystem. В OUTBOX — новая инструкция «с нуля»: куда лежат файлы на Venus, что запускать, чего не переписывать. Секреты и `gym.db` не затирать. Коммит не делать.

## Критерий готовности

- `AuthHeroDecor` резолвит PNG через `publicAsset` (BASE_URL).
- `tests/auth-triptych-assets.test.ts` зелёный; `public/imagePhone` — реальная папка.
- Новый tar overlay на `C:\Users\user\Desktop\React_Project` + `D:\Mac\REACT_LATEST`.
- PNG также в `D:\Mac\public\imagePhone`.
- Инструкция + PDF в OUTBOX: пути Mac vs Venus vs URL браузера, `npm run auth:triptych:sync`.
- Снимок v0.004 на дисках.

## Пункты

1. Код: publicAsset на auth img src; комментарий про Windows.
2. Тест triptych.
3. tar + scp + extract; копия PNG на D:\Mac\public.
4. Инструкция OUTBOX «как по новой».
5. Превью входа в браузере Cursor, если :5173 жив.

**Цель достигнута.** Overlay v0.004 на Desktop, PNG в `public\imagePhone` и `D:\Mac\public\imagePhone`, `publicAsset` в AuthHeroDecor, инструкция OUTBOX. Коммита нет. `.env*` / `gym.db` не затирались. `ios-adaptation.test.ts` — старый fail.
