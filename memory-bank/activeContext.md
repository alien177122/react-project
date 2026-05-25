# Active Context

## Текущий фокус

**Memory Bank v0.8 установлен и заполнен** — постоянное использование workflow для всех фазовых задач в этом репозитории.

Следующий шаг пользователя: запустить `/van` с описанием новой задачи (или продолжить WIP ниже).

## Постоянное правило для агентов

> **MUST** перед **любой** задачей (не только фазовой) читать:  
> `tasks.md`, `activeContext.md`, `projectbrief.md` (+ `techContext.md`, `style-guide.md` по необходимости).  
> Обновлять Memory Bank в `/build`, `/reflect`, `/archive`.

## Предпочтения пользователя (обязательно)

| Правило                                  | Детали                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Memory Bank first**                    | Не начинать работу без чтения `memory-bank/` — это источник правды, не `cursor-memory-bank-main/` |
| **Превью во встроенном браузере Cursor** | MCP `cursor-ide-browser`: `browser_navigate`, `browser_snapshot`, `browser_tabs`                  |
| **Не открывать системный браузер**       | Запрещено: macOS `open http…`, `xdg-open`, `start https…` для превью UI                           |
| **Dev URL**                              | Локальный превью: `http://localhost:5173` (Vite), API `:3001`                                     |

### Источник Memory Bank

- **Канон:** `memory-bank/` + `.cursor/rules/` + `.cursor/commands/`
- **Справочник (не канон):** `cursor-memory-bank-main/` — upstream-шаблон v0.8; паттерны уже интегрированы, не дублировать файлы оттуда в корень

## WIP в репозитории (не закоммичено)

1. **Mobile Readiness** (`apps/mobile/`) — новый экран, mock data, hooks, theme
2. **Android release** (`apps/macos/`) — gradle updates, release scripts, key.properties.example
3. **Web redesign** — calculator, theory, training tabs, CSS consolidation (61+ modified files)
4. **Shared expansion** — program v3, journal, split hooks/utils
5. **Infra** — Docker, Cloudflare public tunnel, GitHub Android APK workflow

## Состояние Memory Bank

| Элемент                          | Статус                              |
| -------------------------------- | ----------------------------------- |
| `.cursor/commands/`              | Синхронизировано из Projects source |
| `.cursor/rules/isolation_rules/` | Синхронизировано                    |
| `memory-bank/` core files        | Обновлены (2026-05-24)              |
| `react-training-memory-bank.mdc` | Усилено (alwaysApply)               |

## Режим workflow

- **Phase:** готов к `/van` для следующей задачи
- **Active task in tasks.md:** Memory Bank adoption + snapshot recent changes (L2 documentation)

## Напоминания

1. Не создавать Memory Bank файлы вне `memory-bank/`
2. Не коммитить без явной просьбы
3. UI changes — следовать `CLAUDE.md` / `style-guide.md`
4. Превью UI — только через MCP `cursor-ide-browser`, не системный браузер
5. Опционально удалить дубликат `cursor-memory-bank-main/` в корне (не нужен после merge в `.cursor/`)
