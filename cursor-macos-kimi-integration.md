# Подключение Kimi (Moonshot AI) к Cursor на macOS
## Полная инструкция по интеграции внешней AI-модели в редактор

---

## 1. Введение и контекст

**Cursor** — это форк VS Code с нативной AI-интеграцией (Chat, Tab-автодополнение, Composer). В отличие от стандартного VS Code, Cursor имеет глубоко встроенный AI-интерфейс, но при этом сохраняет совместимость с экосистемой расширений.

**Зачем подключать внешнюю модель?**
- Cursor поставляется с встроенными Claude/GPT-4, но требует подписки Cursor Pro.
- Внешние API (например, **Moonshot AI / Kimi**) часто дешевле, быстрее в определенных регионах и предоставляют доступ к специализированным моделям (Kimi K2).
- Работа с чувствительными проектами: вы контролируете, куда уходят данные.

**Цель этой инструкции**: настроить Kimi (или любую другую OpenAI-compatible модель) внутри Cursor для полноценной работы с проектами на macOS.

---

## 2. Подготовка окружения (macOS)

### 2.1 Установка Cursor

1. Скачайте Cursor с официального сайта: [cursor.com](https://www.cursor.com/)
2. Перенесите `Cursor.app` в папку `Applications`.
3. При первом запуске macOS может заблокировать приложение (неизвестный разработчик).
   - **Решение**: `System Settings` → `Privacy & Security` → прокрутите вниз и нажмите `Open Anyway`.

### 2.2 Получение API-ключа Moonshot AI

1. Зарегистрируйтесь на [platform.moonshot.cn](https://platform.moonshot.cn/)
2. Перейдите в раздел **API Keys**.
3. Создайте новый ключ: `Create API Key` → скопируйте `sk-...`.
4. **Важно**: ключ показывается только один раз. Сохраните его в безопасное место (Keychain, 1Password, или переменные окружения).

### 2.3 Настройка переменных окружения (опционально, но рекомендуется)

Откройте терминал и добавьте в `~/.zshrc`:

```bash
# Moonshot AI API Key
export MOONSHOT_API_KEY="sk-your-key-here"
```

Примените изменения:
```bash
source ~/.zshrc
```

---

## 3. Способ A: Нативная интеграция через Custom API (рекомендуемый)

Cursor поддерживает добавление кастомных моделей через OpenAI-compatible API. Moonshot AI предоставляет именно такой интерфейс.

### 3.1 Добавление кастомной модели

1. Откройте **Cursor Settings**:
   - `Cmd + ,` (или `Cursor` → `Settings`)
   - Перейдите на вкладку **`Models`** (или `Features` → `Model` в зависимости от версии)

2. Найдите секцию **`Custom API`** или **`OpenAI API Key`**:
   - Включите опцию `Use custom API endpoint`.
   - **Base URL**: `https://api.moonshot.cn/v1`
   - **API Key**: ваш `sk-...` ключ (или `${MOONSHOT_API_KEY}` если настроены env-переменные)
   - **Model Name**: `kimi-k2` (или актуальная версия, например `kimi-latest`)

3. **Нажмите `Verify`**, чтобы проверить подключение.

### 3.2 Настройка приоритетов модели

В тех же настройках назначьте Kimi для разных режимов:

| Режим | Рекомендация |
|-------|--------------|
| **Chat** (Cmd+L) | Kimi для общих вопросов и анализа |
| **Tab** (автодополнение) | Можно оставить встроенную модель Cursor или настроить быструю модель Kimi |
| **Composer** (Cmd+I) | Kimi для генерации многофайловых изменений |

### 3.3 Проверка работы

1. Откройте любой проект.
2. Нажмите `Cmd + L` (Chat).
3. Задайте вопрос: `"Объясни архитектуру этого проекта"`.
4. Если ответ пришел от Kimi — интеграция работает.

---

## 4. Способ B: MCP (Model Context Protocol) — продвинутый

Начиная с Cursor 0.40+, редактор поддерживает **MCP (Model Context Protocol)** — стандарт для подключения внешних инструментов и моделей с доступом к файловой системе.

### 4.1 Установка MCP-сервера

Создайте простой MCP-сервер-прокси для Moonshot API.

**Файл: `~/mcp-servers/kimi-mcp/server.js`**

```javascript
#!/usr/bin/env node
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

const API_KEY = process.env.MOONSHOT_API_KEY;
const API_BASE = 'https://api.moonshot.cn/v1';

const server = new Server({ name: 'kimi-bridge', version: '1.0.0' }, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'ask_kimi',
    description: 'Отправить запрос к Kimi AI',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'Вопрос или задача' },
        context: { type: 'string', description: 'Дополнительный контекст (код, файлы)' }
      },
      required: ['question']
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { question, context = '' } = request.params.arguments;

  const response = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'kimi-k2',
      messages: [
        { role: 'system', content: 'Вы — опытный инженер-программист. Помогайте с кодом.' },
        { role: 'user', content: context ? `Контекст:
${context}

Вопрос: ${question}` : question }
      ],
      stream: false
    })
  });

  const data = await response.json();
  return { content: [{ type: 'text', text: data.choices[0].message.content }] };
});

const transport = new StdioServerTransport();
server.connect(transport);
```

**Установка зависимостей:**
```bash
cd ~/mcp-servers/kimi-mcp
npm init -y
npm install @modelcontextprotocol/sdk
chmod +x server.js
```

### 4.2 Конфигурация в Cursor

Создайте или отредактируйте файл конфигурации MCP:

**Файл: `~/.cursor/mcp.json`**

```json
{
  "mcpServers": {
    "kimi-bridge": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/mcp-servers/kimi-mcp/server.js"],
      "env": {
        "MOONSHOT_API_KEY": "sk-your-key-here"
      }
    }
  }
}
```

> **Примечание**: замените `YOUR_USERNAME` на ваше имя пользователя macOS.

### 4.3 Использование в Cursor

1. Перезапустите Cursor.
2. Откройте Chat (`Cmd+L`).
3. Введите `@kimi-bridge` — появится подсказка инструмента.
4. Задайте вопрос: `@kimi-bridge проанализируй этот файл на баги`.

**Преимущества MCP:**
- AI имеет доступ к файловой системе через контекст Cursor.
- Можно создавать сложные цепочки инструментов (поиск + анализ + рефакторинг).

---

## 5. Способ C: Расширение Continue.dev

**Continue.dev** — универсальное расширение для VS Code/Cursor, поддерживающее десятки провайдеров AI.

### 5.1 Установка

1. В Cursor откройте **Extensions** (`Cmd+Shift+X`).
2. Найдите `Continue` → `Install`.
3. После установки появится боковая панель Continue (иконка в левом сайдбаре).

### 5.2 Настройка провайдера Moonshot

Откройте настройки Continue: нажмите на шестеренку в панели Continue.

**Файл конфигурации: `~/.continue/config.json`**

```json
{
  "models": [
    {
      "title": "Kimi K2",
      "provider": "openai",
      "model": "kimi-k2",
      "apiBase": "https://api.moonshot.cn/v1",
      "apiKey": "sk-your-key-here"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Kimi Fast",
    "provider": "openai",
    "model": "kimi-k2",
    "apiBase": "https://api.moonshot.cn/v1",
    "apiKey": "sk-your-key-here"
  }
}
```

### 5.3 Рабочий процесс

| Действие | Горячая клавиша |
|----------|----------------|
| Открыть чат Continue | `Cmd+L` (или настройте `Cmd+Shift+L`) |
| Задать вопрос о выделенном коде | Выделите код → `Cmd+L` → введите вопрос |
| Автодополнение (Tab) | Начните писать код → Continue предложит продолжение |
| Редактирование inline | Выделите код → `Cmd+Shift+L` → "рефактори это" |

### 5.4 Контекст проекта

Continue автоматически индексирует кодовую базу. Для точечного контекста:
- Используйте `@file path/to/file.js` — подключить конкретный файл.
- Используйте `@codebase` — использовать весь проект как контекст.

---

## 6. Способ D: CLI-интеграция через терминал Cursor

Для задач, не требующих графического интерфейса (batch-обработка, скрипты, git-hooks).

### 6.1 Создание CLI-утилиты

**Файл: `/usr/local/bin/ask-kimi`**

```bash
#!/bin/bash
# Kimi CLI для macOS

API_KEY="${MOONSHOT_API_KEY:-sk-your-key-here}"
API_URL="https://api.moonshot.cn/v1/chat/completions"

# Чтение вопроса из аргументов или stdin
if [ -t 0 ]; then
    QUESTION="$*"
else
    QUESTION=$(cat)
fi

if [ -z "$QUESTION" ]; then
    echo "Использование: ask-kimi 'вопрос' или echo 'вопрос' | ask-kimi"
    exit 1
fi

# Экранирование JSON
JSON_QUESTION=$(echo "$QUESTION" | sed 's/\/\\/g; s/"/\"/g; s/	/\t/g')

RESPONSE=$(curl -s -X POST "$API_URL"   -H "Content-Type: application/json"   -H "Authorization: Bearer $API_KEY"   -d "{
    "model": "kimi-k2",
    "messages": [{"role": "user", "content": "$JSON_QUESTION"}],
    "stream": false
  }")

echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```

**Установка:**
```bash
chmod +x /usr/local/bin/ask-kimi
```

### 6.2 Использование в терминале Cursor

Откройте терминал в Cursor (`` Ctrl+` `` или `Cmd+J`):

```bash
# Простой вопрос
ask-kimi "Объясни разницу между useEffect и useLayoutEffect"

# С контекстом файла
ask-kimi "$(cat src/App.tsx)" "Найди баги в этом компоненте"

# Интеграция с git
ask-kimi "$(git diff)" "Напиши сообщение коммита для этих изменений"
```

### 6.3 Интеграция с Makefile

Добавьте в `Makefile` проекта:

```makefile
ai-review:
	@echo "Анализ изменений..."
	@git diff | ask-kimi "Проведи code review этого diff. Найди потенциальные баги и стилистические проблемы."

ai-docs:
	@cat README.md | ask-kimi "Улучши документацию, добавь примеры использования"
```

---

## 7. Работа с проектами в Cursor + внешняя AI

### 7.1 Контекст проекта

Cursor имеет мощные механизмы контекста:

**Файл `.cursorrules`**
Создайте в корне проекта файл `.cursorrules` — это системный промпт для AI:

```markdown
# Правила проекта

## Стек технологий
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express
- База данных: PostgreSQL через Prisma

## Стиль кода
- Используем функциональные компоненты и хуки
- Типы именуем в PascalCase, интерфейсы с префиксом I
- Всегда используем strict TypeScript

## Архитектурные ограничения
- Никаких any в production-коде
- Все API-вызовы через централизованный api-client
- Обработка ошибок через глобальный ErrorBoundary
```

**@-mentions в чате:**
- `@file src/utils/api.ts` — подключить конкретный файл.
- `@folder src/components` — подключить всю папку.
- `@codebase` — использовать весь проект (требует индексации).
- `@web` — поиск в интернете (если включено).

### 7.2 Практический workflow

1. **Открытие проекта**: `File` → `Open Folder` → выберите проект.
2. **Индексация**: Cursor автоматически начнет индексировать код. Дождитесь завершения (индикатор в статус-баре).
3. **Настройка `.cursorrules`**: создайте файл с правилами вашего стека.
4. **Выбор модели**: в Chat убедитесь, что выбрана Kimi (Custom API).
5. **Генерация кода**:
   - `Cmd+I` (Composer) → "Создай CRUD-эндпоинты для User с валидацией Zod"
   - Cursor сгенерирует файлы, покажет diff.
   - Примените изменения (`Accept All`) или выберите частично.
6. **Рефакторинг**:
   - Выделите legacy-код → `Cmd+K` → "Рефактори на хуки и TypeScript"
7. **Документирование**:
   - Выделите функцию → "Сгенерируй JSDoc для этого метода"

### 7.3 Git-интеграция

Cursor имеет встроенный Git-интерфейс:
- **Source Control** панель (`Cmd+Shift+G`).
- AI-генерация сообщений коммитов: нажмите на кнопку AI в поле ввода коммита.
- С использованием Kimi через Custom API: сообщения коммитов будут генерироваться вашей моделью.

---

## 8. Безопасность и best practices

### 8.1 Хранение ключей

**Никогда не храните API-ключи в коде проекта.**

| Метод | Безопасность | Использование |
|-------|--------------|---------------|
| `.zshrc` env | Средняя | Локальная разработка |
| macOS Keychain | Высокая | Через скрипты `security find-generic-password` |
| 1Password CLI | Высокая | `op read op://vault/item/field` |
| Cursor Secrets | Высокая | Встроенное хранилище (если доступно) |

**Пример с 1Password:**
```bash
export MOONSHOT_API_KEY=$(op read op://Private/Moonshot/credential)
```

### 8.2 Rate Limiting и мониторинг

- Moonshot API имеет лимиты на количество токенов в минуту.
- Настройте `max_tokens` в запросах, чтобы избежать превышения.
- Мониторьте использование в [dashboard](https://platform.moonshot.cn/).

### 8.3 Локальные модели (оффлайн-альтернатива)

Если код проекта чувствителен (NDA, HIPAA):

```bash
# Установка Ollama
brew install ollama
ollama pull llama3.1
ollama serve
```

В Cursor Custom API:
- **Base URL**: `http://localhost:11434/v1`
- **Model**: `llama3.1`

### 8.4 Проверка AI-вывода

> **Важно**: AI может галлюцинировать (придумывать несуществующие API, путать версии библиотек).
>
> **Правило**: всегда review сгенерированный код перед коммитом. Используйте AI как ассистента, а не замену инженера.

---

## 9. Типичные проблемы и решения

| Проблема | Причина | Решение |
|----------|---------|---------|
| `401 Unauthorized` | Неверный API-ключ или истек срок | Проверьте ключ в [dashboard](https://platform.moonshot.cn/). Убедитесь, что нет лишних пробелов. |
| `404 Not Found` | Неправильный Base URL | Должно быть `https://api.moonshot.cn/v1` (с `/v1` на конце). |
| Медленные ответы | Большой контекст или нагрузка на API | Уменьшите `max_tokens`, используйте streaming, проверьте регион. |
| Cursor не видит кастомную модель | Устаревшая версия Cursor | Обновите до последней версии (`Cursor` → `Check for Updates`). |
| Нет контекста файлов | Не используются @-mentions | Явно укажите `@file` или убедитесь, что проект проиндексирован. |
| MCP сервер не запускается | Node.js не установлен или неверный путь | `node --version`, проверьте абсолютный путь в `mcp.json`. |
| Кодировка в терминале | macOS терминал и UTF-8 | Добавьте `export LANG=en_US.UTF-8` в `.zshrc`. |

---

## 10. Заключение

### Рекомендуемый стек

| Задача | Инструмент |
|--------|------------|
| Основной чат и генерация | **Cursor Custom API** (Способ A) |
| Сложные многошаговые операции | **MCP** (Способ B) |
| Быстрые inline-запросы | **Continue.dev** (Способ C) |
| Batch-обработка, git, скрипты | **CLI** (Способ D) |

### Итоговый чек-лист

- [ ] Cursor установлен и обновлен
- [ ] API-ключ Moonshot получен и сохранен безопасно
- [ ] Custom API настроен с корректным Base URL
- [ ] Тестовый запрос в Chat прошел успешно
- [ ] `.cursorrules` создан в проекте (при необходимости)
- [ ] Git-интеграция проверена
- [ ] Команда ознакомлена с правилами review AI-кода

---

**Автор**: AI-ассистент  
**Дата**: 2026-05-25  
**Версия**: 1.0
