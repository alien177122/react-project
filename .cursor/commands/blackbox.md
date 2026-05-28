# BLACKBOX Command — простые вопросы через Blackbox CLI

Делегирует **простые** задачи (синтаксис, документация, короткие фрагменты кода) в **Blackbox CLI** по подписке — без расхода токенов Cursor Agent.

Сложные многофайловые задачи остаются на **Cursor Agent** (`/van`, `/build`, обычный чат).

## Когда использовать `/blackbox`

| `/blackbox` (Blackbox CLI)      | Cursor Agent                          |
| ------------------------------- | ------------------------------------- |
| Синтаксис языка / API           | Рефакторинг нескольких файлов         |
| «Как работает X?» в 1–2 абзаца  | UI, Memory Bank, `/build` workflow    |
| Маленький snippet (< ~30 строк) | Отладка с запуском тестов и браузером |
| Сравнение подходов (кратко)     | Архитектура, creative, archive        |
| Regex, SQL, TypeScript типы     | Интеграция с server/SQLite/Electron   |

**Правило:** если задача требует чтения репозитория, правок файлов или прогона `npm test` — **не** `/blackbox`, а Cursor Agent.

## Progressive Rule Loading

```
Load: .cursor/rules/blackbox-routing.mdc
```

## Предварительная настройка (один раз)

1. **CLI установлен** (официально):
   ```bash
   curl -fsSL https://blackbox.ai/install.sh | bash
   ```
2. **API-ключ** из [Blackbox Dashboard](https://app.blackbox.ai/dashboard):
   ```bash
   blackbox configure
   ```
3. **Wrapper** (глобальный):
   ```bash
   chmod +x ~/.cursor/scripts/blackbox-cli.sh
   ```

Ключ хранится через `blackbox configure` — **не** в репозитории.

## Workflow

1. Пользователь вводит `/blackbox` + вопрос **или** агент предлагает Blackbox для простой подзадачи.
2. Агент выполняет wrapper в терминале:
   ```bash
   ~/.cursor/scripts/blackbox-cli.sh "Ваш вопрос"
   ```
3. Ответ Blackbox кратко пересказывается пользователю; при необходимости результат переносится в код через Cursor Agent.

### Флаги wrapper

```bash
# Модель (по умолчанию kimi-k2, или BLACKBOX_MODEL)
~/.cursor/scripts/blackbox-cli.sh -m minimax "Объясни difference type в TS"

# Показать расход токенов Blackbox
~/.cursor/scripts/blackbox-cli.sh --tokens "Что такое useMemo?"

# Промпт из stdin
echo "Разница между interface и type?" | ~/.cursor/scripts/blackbox-cli.sh
```

### Прямой вызов CLI (без wrapper)

```bash
blackbox --prompt "Кратко: зачем strict mode в React?" --model kimi-k2 --approval-mode plan --skip-update
```

JSON-вывод в текущей версии CLI **не документирован** — ответ plain text в stdout.

## Примеры (русский)

```
/blackbox Чем отличается useMemo от useCallback в React?
```

```
/blackbox Напиши regex для валидации email (кратко, без объяснения на 3 страницы)
```

```
/blackbox Какой тип возвращает Array.prototype.filter в TypeScript?
```

**Не для Blackbox:**

```
/blackbox Добавь ReadinessScreen в apps/mobile и подключи роут
→ Cursor Agent (/van → /build)
```

## Memory Bank

Для `/blackbox` **не** требуется обновлять `memory-bank/tasks.md` — это вспомогательный Q&A, не фаза workflow.

## Связанные команды

- `/van` — оценка сложности; L1 иногда можно уточнить через Blackbox, реализация — Agent
- `/build` — только Cursor Agent
- Правило маршрутизации: `.cursor/rules/blackbox-routing.mdc`
